#!/usr/bin/env node

/**
 * Figma Design Analyzer
 * Fetches and analyzes Figma designs, extracts design tokens, and generates React components
 *
 * Usage:
 * FIGMA_ACCESS_TOKEN=your_token node analyze-figma-design.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Parse Figma URL and extract file ID and node ID
const FIGMA_URL = 'https://www.figma.com/design/WaoCgreuYOBNgxzDxGShaY/Tenet---Workflow-UI?node-id=5093-12674&t=gDYR4jjgTIUiBrBd-4';
const FILE_ID = 'WaoCgreuYOBNgxzDxGShaY';
const NODE_ID = '5093:12674'; // Figma API uses colons instead of hyphens

// Get Figma access token from environment
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;

if (!FIGMA_ACCESS_TOKEN) {
  console.error('Error: FIGMA_ACCESS_TOKEN environment variable is required');
  console.error('\nTo get your Figma access token:');
  console.error('1. Go to https://www.figma.com/settings');
  console.error('2. Scroll to "Personal access tokens"');
  console.error('3. Create a new token');
  console.error('4. Run: FIGMA_ACCESS_TOKEN=your_token node analyze-figma-design.js');
  process.exit(1);
}

// Helper function to make HTTPS requests
function httpsRequest(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Failed to parse JSON response'));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

// Fetch Figma file data
async function fetchFigmaFile() {
  console.log('Fetching Figma file...');
  const url = `https://api.figma.com/v1/files/${FILE_ID}`;
  const headers = {
    'X-Figma-Token': FIGMA_ACCESS_TOKEN
  };

  return await httpsRequest(url, headers);
}

// Find node by ID in the tree
function findNodeById(node, targetId) {
  if (node.id === targetId) {
    return node;
  }

  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, targetId);
      if (found) return found;
    }
  }

  return null;
}

// Extract colors from node styles
function extractColors(node, colors = new Set()) {
  if (node.fills) {
    node.fills.forEach(fill => {
      if (fill.type === 'SOLID' && fill.color) {
        const { r, g, b, a = 1 } = fill.color;
        colors.add(`rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`);
      }
    });
  }

  if (node.strokes) {
    node.strokes.forEach(stroke => {
      if (stroke.type === 'SOLID' && stroke.color) {
        const { r, g, b, a = 1 } = stroke.color;
        colors.add(`rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`);
      }
    });
  }

  if (node.children) {
    node.children.forEach(child => extractColors(child, colors));
  }

  return Array.from(colors);
}

// Extract typography from text nodes
function extractTypography(node, typography = []) {
  if (node.type === 'TEXT') {
    const style = {
      fontFamily: node.style?.fontFamily || 'Unknown',
      fontSize: node.style?.fontSize || 'Unknown',
      fontWeight: node.style?.fontWeight || 'Unknown',
      lineHeight: node.style?.lineHeightPx || 'Unknown',
      letterSpacing: node.style?.letterSpacing || 0,
      textAlign: node.style?.textAlignHorizontal || 'LEFT'
    };
    typography.push({ name: node.name, ...style });
  }

  if (node.children) {
    node.children.forEach(child => extractTypography(child, typography));
  }

  return typography;
}

// Extract spacing and layout information
function extractLayout(node) {
  const layout = {
    width: node.absoluteBoundingBox?.width || 0,
    height: node.absoluteBoundingBox?.height || 0,
    x: node.absoluteBoundingBox?.x || 0,
    y: node.absoluteBoundingBox?.y || 0
  };

  if (node.layoutMode) {
    layout.layoutMode = node.layoutMode; // HORIZONTAL, VERTICAL, or NONE
    layout.padding = {
      top: node.paddingTop || 0,
      right: node.paddingRight || 0,
      bottom: node.paddingBottom || 0,
      left: node.paddingLeft || 0
    };
    layout.itemSpacing = node.itemSpacing || 0;
    layout.primaryAxisAlignItems = node.primaryAxisAlignItems;
    layout.counterAxisAlignItems = node.counterAxisAlignItems;
  }

  return layout;
}

// Analyze component structure
function analyzeStructure(node, depth = 0) {
  const indent = '  '.repeat(depth);
  const info = {
    id: node.id,
    name: node.name,
    type: node.type,
    visible: node.visible !== false
  };

  console.log(`${indent}[${node.type}] ${node.name} (${node.id})`);

  if (node.type === 'TEXT') {
    console.log(`${indent}  Text: "${node.characters?.substring(0, 50)}${node.characters?.length > 50 ? '...' : ''}"`);
  }

  if (node.absoluteBoundingBox) {
    console.log(`${indent}  Size: ${Math.round(node.absoluteBoundingBox.width)}x${Math.round(node.absoluteBoundingBox.height)}px`);
  }

  const children = [];
  if (node.children) {
    node.children.forEach(child => {
      children.push(analyzeStructure(child, depth + 1));
    });
  }

  return { ...info, children };
}

// Generate React component code
function generateReactComponent(node, componentName = 'WorkflowUI') {
  const layout = extractLayout(node);
  const colors = extractColors(node);
  const typography = extractTypography(node);

  let component = `import React from 'react';\n\n`;

  // Generate styles
  component += `const styles = {\n`;
  component += `  container: {\n`;
  component += `    width: '${layout.width}px',\n`;
  component += `    height: '${layout.height}px',\n`;

  if (node.layoutMode) {
    component += `    display: 'flex',\n`;
    component += `    flexDirection: '${node.layoutMode === 'HORIZONTAL' ? 'row' : 'column'}',\n`;
    if (layout.padding) {
      component += `    padding: '${layout.padding.top}px ${layout.padding.right}px ${layout.padding.bottom}px ${layout.padding.left}px',\n`;
    }
    if (layout.itemSpacing) {
      component += `    gap: '${layout.itemSpacing}px',\n`;
    }
  }

  if (node.fills && node.fills[0]?.type === 'SOLID') {
    const fill = node.fills[0];
    const { r, g, b, a = 1 } = fill.color;
    component += `    backgroundColor: 'rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})',\n`;
  }

  if (node.cornerRadius) {
    component += `    borderRadius: '${node.cornerRadius}px',\n`;
  }

  component += `  }\n`;
  component += `};\n\n`;

  // Generate component
  component += `export const ${componentName} = () => {\n`;
  component += `  return (\n`;
  component += `    <div style={styles.container}>\n`;
  component += `      {/* Add your component content here */}\n`;

  // Add children placeholder
  if (node.children && node.children.length > 0) {
    component += `      {/* Component has ${node.children.length} children */}\n`;
    node.children.slice(0, 3).forEach((child, i) => {
      component += `      {/* ${child.type}: ${child.name} */}\n`;
    });
  }

  component += `    </div>\n`;
  component += `  );\n`;
  component += `};\n\n`;

  component += `export default ${componentName};\n`;

  return component;
}

// Main function
async function main() {
  try {
    console.log('='.repeat(60));
    console.log('Figma Design Analyzer');
    console.log('='.repeat(60));
    console.log();

    // Fetch file data
    const fileData = await fetchFigmaFile();
    console.log(`✓ Successfully fetched file: ${fileData.name}`);
    console.log();

    // Find the specific node
    console.log(`Searching for node: ${NODE_ID}`);
    const targetNode = findNodeById(fileData.document, NODE_ID);

    if (!targetNode) {
      console.error(`Error: Node ${NODE_ID} not found in the document`);
      process.exit(1);
    }

    console.log(`✓ Found node: ${targetNode.name} (${targetNode.type})`);
    console.log();

    // Create output directory
    const outputDir = path.join(process.cwd(), 'figma-analysis');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Analyze structure
    console.log('='.repeat(60));
    console.log('STRUCTURE ANALYSIS');
    console.log('='.repeat(60));
    const structure = analyzeStructure(targetNode);
    fs.writeFileSync(
      path.join(outputDir, 'structure.json'),
      JSON.stringify(structure, null, 2)
    );
    console.log();
    console.log(`✓ Structure saved to: ${outputDir}/structure.json`);
    console.log();

    // Extract colors
    console.log('='.repeat(60));
    console.log('COLOR TOKENS');
    console.log('='.repeat(60));
    const colors = extractColors(targetNode);
    colors.forEach((color, i) => {
      console.log(`Color ${i + 1}: ${color}`);
    });
    fs.writeFileSync(
      path.join(outputDir, 'colors.json'),
      JSON.stringify(colors, null, 2)
    );
    console.log();
    console.log(`✓ Colors saved to: ${outputDir}/colors.json`);
    console.log();

    // Extract typography
    console.log('='.repeat(60));
    console.log('TYPOGRAPHY TOKENS');
    console.log('='.repeat(60));
    const typography = extractTypography(targetNode);
    typography.forEach((style, i) => {
      console.log(`${i + 1}. ${style.name}`);
      console.log(`   Font: ${style.fontFamily} ${style.fontWeight}`);
      console.log(`   Size: ${style.fontSize}px`);
      console.log(`   Line Height: ${style.lineHeight}`);
      console.log();
    });
    fs.writeFileSync(
      path.join(outputDir, 'typography.json'),
      JSON.stringify(typography, null, 2)
    );
    console.log(`✓ Typography saved to: ${outputDir}/typography.json`);
    console.log();

    // Extract layout
    console.log('='.repeat(60));
    console.log('LAYOUT INFORMATION');
    console.log('='.repeat(60));
    const layout = extractLayout(targetNode);
    console.log(JSON.stringify(layout, null, 2));
    fs.writeFileSync(
      path.join(outputDir, 'layout.json'),
      JSON.stringify(layout, null, 2)
    );
    console.log();
    console.log(`✓ Layout saved to: ${outputDir}/layout.json`);
    console.log();

    // Generate React component
    console.log('='.repeat(60));
    console.log('GENERATING REACT COMPONENT');
    console.log('='.repeat(60));
    const componentName = targetNode.name.replace(/[^a-zA-Z0-9]/g, '');
    const reactComponent = generateReactComponent(targetNode, componentName);
    const componentPath = path.join(outputDir, `${componentName}.jsx`);
    fs.writeFileSync(componentPath, reactComponent);
    console.log(reactComponent);
    console.log();
    console.log(`✓ React component saved to: ${componentPath}`);
    console.log();

    // Save complete node data
    fs.writeFileSync(
      path.join(outputDir, 'node-data.json'),
      JSON.stringify(targetNode, null, 2)
    );
    console.log(`✓ Complete node data saved to: ${outputDir}/node-data.json`);
    console.log();

    console.log('='.repeat(60));
    console.log('ANALYSIS COMPLETE!');
    console.log('='.repeat(60));
    console.log(`\nAll files saved to: ${outputDir}/`);
    console.log('\nFiles created:');
    console.log('  - structure.json    (Component hierarchy)');
    console.log('  - colors.json       (Color palette)');
    console.log('  - typography.json   (Text styles)');
    console.log('  - layout.json       (Layout information)');
    console.log(`  - ${componentName}.jsx (React component)`);
    console.log('  - node-data.json    (Complete Figma node data)');

  } catch (error) {
    console.error('\nError:', error.message);
    process.exit(1);
  }
}

// Run the script
main();

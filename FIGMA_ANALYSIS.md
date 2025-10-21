# Figma Design Analysis Guide

This guide explains how to analyze your Figma design and generate React components.

## Quick Start

### 1. Get Your Figma Access Token

1. Go to https://www.figma.com/settings
2. Scroll to "Personal access tokens"
3. Click "Create a new personal access token"
4. Give it a name (e.g., "Design Analysis")
5. Copy the token

### 2. Run the Analysis

```bash
FIGMA_ACCESS_TOKEN=your_token_here node analyze-figma-design.js
```

## What This Script Does

The script will analyze the Figma design at:
- **File**: Tenet - Workflow UI
- **Node ID**: 5093-12674

It will:

1. **Fetch the design** from Figma using the REST API
2. **Analyze the structure** - Component hierarchy, layers, and organization
3. **Extract design tokens**:
   - Colors (fills and strokes)
   - Typography (fonts, sizes, weights, line heights)
   - Layout (spacing, padding, alignment)
4. **Generate React component** - A starter React component based on the design

## Output

All analysis results will be saved to the `figma-analysis/` directory:

```
figma-analysis/
├── structure.json      # Complete component hierarchy
├── colors.json         # All colors used in the design
├── typography.json     # Text styles and typography
├── layout.json         # Layout and spacing information
├── [ComponentName].jsx # Generated React component
└── node-data.json      # Complete raw Figma node data
```

## Using the Generated Component

The generated React component will include:
- Container styles (width, height, layout)
- Flexbox configuration (if auto-layout is used)
- Colors and backgrounds
- Border radius
- Placeholders for children

You can import and use it in your React app:

```jsx
import { WorkflowUI } from './figma-analysis/WorkflowUI';

function App() {
  return <WorkflowUI />;
}
```

## Next Steps

After running the analysis:

1. Review the generated files in `figma-analysis/`
2. Use the design tokens to create a design system
3. Customize the generated React component
4. Add interactivity and business logic

## Alternative: Using the MCP Server

If you prefer to use the full MCP setup with the Figma plugin:

1. Install Bun: `curl -fsSL https://bun.sh/install | bash`
2. Start the WebSocket server: `bun socket`
3. Install and run the Figma plugin in Figma
4. Use Cursor's MCP tools to interact with the design

See the main README.md for full MCP setup instructions.

# Add Category Modal - User Flow

## Overview
This document describes the user experience flow for adding new annotation categories in the Cursor Talk to Figma MCP plugin.

## Context
- **Feature**: Add new annotation categories through a modal dialog
- **Purpose**: Allow users to create custom categories for organizing Figma annotations
- **Integration**: Works within the existing Figma plugin UI panel (350x450px)

---

## User Flow Diagram

```
┌─────────────────────────────────────────────────┐
│  Main Plugin UI                                 │
│  ┌───────────────────────────────────────────┐  │
│  │ Connection Tab                            │  │
│  │                                           │  │
│  │ [Connected ✓]                            │  │
│  │                                           │  │
│  │ Categories Section                        │  │
│  │ ┌─────────────────────────────────────┐   │  │
│  │ │ Bug (red)     [×]                   │   │  │
│  │ │ Feature (blue) [×]                  │   │  │
│  │ │ Review (yellow) [×]                 │   │  │
│  │ └─────────────────────────────────────┘   │  │
│  │                                           │  │
│  │ [+ Add Category]  ◄── ENTRY POINT         │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                     │
                     │ User clicks "Add Category"
                     ▼
┌─────────────────────────────────────────────────┐
│  Modal Overlay (Semi-transparent backdrop)      │
│  ┌─────────────────────────────────────────┐   │
│  │ Add New Category               [×]      │   │
│  │ ─────────────────────────────────────── │   │
│  │                                         │   │
│  │ Category Name *                         │   │
│  │ ┌─────────────────────────────────────┐ │   │
│  │ │ [Enter category name]               │ │   │
│  │ └─────────────────────────────────────┘ │   │
│  │                                         │   │
│  │ Color *                                 │   │
│  │ ┌─────┬─────┬─────┬─────┬─────┬─────┐ │   │
│  │ │ ●   │ ●   │ ●   │ ●   │ ●   │ ●   │ │   │
│  │ │ Red │ Blue│Green│Yell │Purp │ ... │ │   │
│  │ └─────┴─────┴─────┴─────┴─────┴─────┘ │   │
│  │                                         │   │
│  │ Description (optional)                  │   │
│  │ ┌─────────────────────────────────────┐ │   │
│  │ │                                     │ │   │
│  │ │                                     │ │   │
│  │ └─────────────────────────────────────┘ │   │
│  │                                         │   │
│  │          [Cancel] [Create Category]     │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## Detailed Flow Steps

### 1. Entry Point

**Trigger**: User clicks the "+ Add Category" button in the main plugin UI

**Preconditions**:
- Plugin is connected to WebSocket server
- User has appropriate Figma permissions
- Figma file is open and active

**Actions**:
1. Disable main UI interactions (prevent multiple modals)
2. Display semi-transparent backdrop overlay
3. Render modal dialog centered in the plugin panel
4. Focus on the "Category Name" input field
5. Initialize form state with default values

---

### 2. Modal States

#### State 1: Initial/Empty Form

```
┌─────────────────────────────────────────┐
│ Add New Category               [×]      │
│ ─────────────────────────────────────── │
│                                         │
│ Category Name *                         │
│ ┌─────────────────────────────────────┐ │
│ │ [Cursor blinking]                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Color *                                 │
│ [○ Gray selected by default]            │
│                                         │
│ Description (optional)                  │
│ ┌─────────────────────────────────────┐ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│   [Cancel] [Create Category (disabled)] │
└─────────────────────────────────────────┘
```

**Characteristics**:
- "Create Category" button is disabled
- Name field is empty and focused
- Default color is pre-selected (gray)
- No validation errors shown
- Character counter shows "0 / 50" below name field

---

#### State 2: In Progress (Valid Input)

```
┌─────────────────────────────────────────┐
│ Add New Category               [×]      │
│ ─────────────────────────────────────── │
│                                         │
│ Category Name *                         │
│ ┌─────────────────────────────────────┐ │
│ │ Design Feedback                     │ │
│ └─────────────────────────────────────┘ │
│ 16 / 50 characters                      │
│                                         │
│ Color *                                 │
│ [● Blue selected]                       │
│                                         │
│ Description (optional)                  │
│ ┌─────────────────────────────────────┐ │
│ │ For gathering design feedback       │ │
│ └─────────────────────────────────────┘ │
│ 30 / 200 characters                     │
│                                         │
│      [Cancel] [Create Category (active)]│
└─────────────────────────────────────────┘
```

**Characteristics**:
- "Create Category" button is enabled (filled)
- Name field has valid input
- Color is selected
- Character counters are visible
- Real-time validation (green checkmark icon)

---

#### State 3: Validation Errors

```
┌─────────────────────────────────────────┐
│ Add New Category               [×]      │
│ ─────────────────────────────────────── │
│                                         │
│ Category Name *                         │
│ ┌─────────────────────────────────────┐ │
│ │ bug                                 │ │ ⚠️
│ └─────────────────────────────────────┘ │
│ ⚠️ Category "bug" already exists        │
│                                         │
│ Color *                                 │
│ [● Red selected]                        │
│                                         │
│ Description (optional)                  │
│ ┌─────────────────────────────────────┐ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│   [Cancel] [Create Category (disabled)] │
└─────────────────────────────────────────┘
```

**Error Types**:
1. **Empty name**: "Category name is required"
2. **Duplicate name**: "Category '{name}' already exists"
3. **Too short**: "Name must be at least 2 characters"
4. **Too long**: "Name must be 50 characters or less"
5. **Invalid characters**: "Name can only contain letters, numbers, spaces, and -_"
6. **No color selected**: "Please select a color"

---

#### State 4: Creating (Loading)

```
┌─────────────────────────────────────────┐
│ Add New Category               [×]      │
│ ─────────────────────────────────────── │
│                                         │
│        ⏳ Creating category...           │
│                                         │
│ Category Name *                         │
│ ┌─────────────────────────────────────┐ │
│ │ Design Feedback         [disabled]  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Color *                                 │
│ [● Blue selected - disabled]            │
│                                         │
│ Description (optional)                  │
│ ┌─────────────────────────────────────┐ │
│ │ For gathering design... [disabled]  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│              [Loading spinner]          │
└─────────────────────────────────────────┘
```

**Characteristics**:
- All form fields are disabled
- Loading spinner/progress indicator
- Close button (×) is disabled
- Cannot cancel or edit during creation
- Timeout after 10 seconds shows error

---

#### State 5: Success

```
┌─────────────────────────────────────────┐
│ Category Created!              [×]      │
│ ─────────────────────────────────────── │
│                                         │
│         ✓ Success!                      │
│                                         │
│  "Design Feedback" has been created     │
│  and is now available for annotations.  │
│                                         │
│                                         │
│                                         │
│                                         │
│                                         │
│                                         │
│                    [Done]               │
└─────────────────────────────────────────┘
```

**Actions**:
- Show success message for 2 seconds
- Automatically close modal OR show "Done" button
- Update category list in main UI
- Clear form state
- Show toast notification: "Category 'Design Feedback' created"

---

#### State 6: Error

```
┌─────────────────────────────────────────┐
│ Add New Category               [×]      │
│ ─────────────────────────────────────── │
│                                         │
│ ⚠️ Error Creating Category              │
│                                         │
│ Could not create category. Please check │
│ your connection and try again.          │
│                                         │
│ Error: Network timeout                  │
│                                         │
│                                         │
│                                         │
│           [Retry] [Cancel]              │
└─────────────────────────────────────────┘
```

**Error Scenarios**:
1. **Network error**: WebSocket disconnected
2. **Permission error**: User lacks Figma permissions
3. **Figma API error**: Figma service unavailable
4. **Timeout**: Operation took too long (>10s)
5. **Server error**: MCP server issue

---

## 3. Form Fields Specification

### Field 1: Category Name (Required)

| Property | Value |
|----------|-------|
| **Type** | Text input |
| **Required** | Yes |
| **Min Length** | 2 characters |
| **Max Length** | 50 characters |
| **Allowed Characters** | Letters, numbers, spaces, hyphens (-), underscores (_) |
| **Trim** | Yes (leading/trailing whitespace) |
| **Case Sensitivity** | Preserve user input, but check duplicates case-insensitively |
| **Placeholder** | "e.g., Design Review, Bug Report, Feature Request" |
| **Auto-focus** | Yes (on modal open) |
| **Character Counter** | Yes (show "X / 50") |

**Validation Rules**:
```javascript
const validateName = (name) => {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: "Category name is required" };
  }

  if (trimmed.length < 2) {
    return { valid: false, error: "Name must be at least 2 characters" };
  }

  if (trimmed.length > 50) {
    return { valid: false, error: "Name must be 50 characters or less" };
  }

  const validPattern = /^[a-zA-Z0-9\s\-_]+$/;
  if (!validPattern.test(trimmed)) {
    return { valid: false, error: "Name can only contain letters, numbers, spaces, and -_" };
  }

  // Check for duplicates (case-insensitive)
  const existingCategories = await getExistingCategories();
  const isDuplicate = existingCategories.some(
    cat => cat.label.toLowerCase() === trimmed.toLowerCase()
  );

  if (isDuplicate) {
    return { valid: false, error: `Category "${trimmed}" already exists` };
  }

  return { valid: true, error: null };
};
```

---

### Field 2: Color (Required)

| Property | Value |
|----------|-------|
| **Type** | Color picker (preset palette) |
| **Required** | Yes |
| **Default** | Gray (#808080) |
| **Options** | Figma standard annotation colors |
| **Display** | Circular color swatches with labels |
| **Selection** | Single selection (radio button behavior) |

**Color Palette** (Figma Annotation Standard Colors):

```javascript
const colorOptions = [
  { id: 'red', hex: '#F24822', label: 'Red', rgb: { r: 0.95, g: 0.28, b: 0.13 } },
  { id: 'orange', hex: '#FF6D00', label: 'Orange', rgb: { r: 1, g: 0.43, b: 0 } },
  { id: 'yellow', hex: '#FFD600', label: 'Yellow', rgb: { r: 1, g: 0.84, b: 0 } },
  { id: 'green', hex: '#00C853', label: 'Green', rgb: { r: 0, g: 0.78, b: 0.33 } },
  { id: 'blue', hex: '#2979FF', label: 'Blue', rgb: { r: 0.16, g: 0.47, b: 1 } },
  { id: 'purple', hex: '#9C27B0', label: 'Purple', rgb: { r: 0.61, g: 0.15, b: 0.69 } },
  { id: 'pink', hex: '#E91E63', label: 'Pink', rgb: { r: 0.91, g: 0.12, b: 0.39 } },
  { id: 'gray', hex: '#808080', label: 'Gray', rgb: { r: 0.5, g: 0.5, b: 0.5 } },
];
```

**Visual Design**:
```
┌───────────────────────────────────────────┐
│ Color *                                   │
│                                           │
│  ●      ●      ●      ●      ●      ●     │
│ Red   Orange Yellow Green  Blue  Purple   │
│  ○      ○                                 │
│ Pink   Gray                               │
│                                           │
│ Selected: Blue                            │
└───────────────────────────────────────────┘
```

**Accessibility**:
- Keyboard navigation (arrow keys)
- Color name announced by screen readers
- Visual selection indicator (border + checkmark)
- High contrast mode support

---

### Field 3: Description (Optional)

| Property | Value |
|----------|-------|
| **Type** | Textarea |
| **Required** | No |
| **Min Length** | 0 characters |
| **Max Length** | 200 characters |
| **Rows** | 3 |
| **Resize** | No (fixed height) |
| **Placeholder** | "Add a description to help others understand when to use this category..." |
| **Character Counter** | Yes (show "X / 200") |

**Note**: Description is for UI/UX purposes only. It will be stored locally in the plugin settings but not sent to Figma's annotation API (which doesn't support category descriptions natively).

---

## 4. Validation Strategy

### Real-time Validation (On Input)

**Trigger**: As user types in any field

**Actions**:
1. **Debounce validation** (300ms delay after last keystroke)
2. **Show inline errors** below each field
3. **Enable/disable submit button** based on overall form validity
4. **Update character counters** in real-time (no debounce)

**Visual Feedback**:
- ✅ Green checkmark icon for valid fields
- ⚠️ Warning icon + red border for invalid fields
- ⏳ Loading spinner for async validation (duplicate check)

---

### Submit Validation (On Create)

**Trigger**: User clicks "Create Category" button

**Steps**:
1. **Re-validate all fields** (prevent stale state issues)
2. **Trim whitespace** from text inputs
3. **Check Figma API availability** (WebSocket connection)
4. **Verify user permissions** (can create categories)
5. **Final duplicate check** (race condition prevention)
6. **Submit to Figma API**

**If validation fails**:
- Keep modal open
- Show specific error messages
- Focus on the first invalid field
- Enable editing

**If submission fails**:
- Show error state (State 6)
- Offer "Retry" option
- Preserve form data

---

## 5. Interaction Behaviors

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Submit form (if valid) |
| `Esc` | Close modal (with confirmation if data entered) |
| `Tab` | Navigate between fields |
| `Shift + Tab` | Navigate backwards |
| `Arrow Keys` | Navigate color options (when focused) |
| `Space` | Select color option (when focused) |

---

### Mouse/Touch Interactions

| Element | Action | Behavior |
|---------|--------|----------|
| **Backdrop overlay** | Click | Show "unsaved changes" confirmation, then close |
| **Close button (×)** | Click | Show confirmation if form has data, then close |
| **Cancel button** | Click | Show confirmation if form has data, then close |
| **Create button** | Click | Validate and submit |
| **Color swatch** | Click | Select color |
| **Input fields** | Click | Focus and show cursor |
| **Modal content** | Click | Prevent event bubbling (don't close) |

---

### Focus Management

**On modal open**:
1. Save current focus (to restore on close)
2. Trap focus within modal (prevent tabbing to main UI)
3. Focus on "Category Name" input field

**On modal close**:
1. Release focus trap
2. Restore focus to "+ Add Category" button
3. Clear modal state

**Focus trap**:
- Tab from last element → returns to first element
- Shift+Tab from first element → moves to last element
- Prevents keyboard users from accessing main UI

---

## 6. Integration with Existing System

### Communication Flow

```
┌──────────────────────────────────────────────────┐
│  UI Modal (ui.html)                              │
│  User clicks "Create Category"                   │
└──────────────────┬───────────────────────────────┘
                   │ postMessage({
                   │   type: 'create-category',
                   │   data: { name, color, description }
                   │ })
                   ▼
┌──────────────────────────────────────────────────┐
│  Plugin Code (code.js)                           │
│  Receives message via figma.ui.onmessage         │
└──────────────────┬───────────────────────────────┘
                   │
                   │ Call createCategory()
                   ▼
┌──────────────────────────────────────────────────┐
│  Figma API                                       │
│  figma.annotations.createAnnotationCategoryAsync()│
└──────────────────┬───────────────────────────────┘
                   │
                   │ Returns category object
                   ▼
┌──────────────────────────────────────────────────┐
│  Plugin Code (code.js)                           │
│  Send success response back to UI                │
└──────────────────┬───────────────────────────────┘
                   │ postMessage({
                   │   type: 'category-created',
                   │   category: { id, label, color }
                   │ })
                   ▼
┌──────────────────────────────────────────────────┐
│  UI Modal (ui.html)                              │
│  Show success state, update category list        │
└──────────────────────────────────────────────────┘
```

---

### Data Structure

**Request Payload** (UI → Plugin):
```javascript
{
  type: 'create-category',
  data: {
    name: 'Design Feedback',        // string, required, trimmed
    color: {                         // object, required
      id: 'blue',
      hex: '#2979FF',
      rgb: { r: 0.16, g: 0.47, b: 1 }
    },
    description: 'For gathering...' // string, optional, max 200 chars
  }
}
```

**Response Payload** (Plugin → UI):

**Success**:
```javascript
{
  type: 'category-created',
  success: true,
  category: {
    id: 'cat_abc123',              // Generated by Figma
    label: 'Design Feedback',
    color: { r: 0.16, g: 0.47, b: 1 },
    isPreset: false
  },
  timestamp: 1708560000000
}
```

**Error**:
```javascript
{
  type: 'category-error',
  success: false,
  error: {
    code: 'PERMISSION_DENIED',      // Error code
    message: 'User lacks permission to create categories',
    details: {}                     // Additional context
  },
  timestamp: 1708560000000
}
```

---

### Error Codes

| Code | Meaning | User Message |
|------|---------|--------------|
| `PERMISSION_DENIED` | User lacks Figma permissions | "You don't have permission to create categories" |
| `NETWORK_ERROR` | WebSocket disconnected | "Connection lost. Please reconnect and try again" |
| `DUPLICATE_NAME` | Category name already exists | "Category '{name}' already exists" |
| `INVALID_INPUT` | Validation failed | "Please check your input and try again" |
| `FIGMA_API_ERROR` | Figma service error | "Figma service unavailable. Please try again later" |
| `TIMEOUT` | Operation took >10s | "Request timed out. Please try again" |
| `UNKNOWN_ERROR` | Unexpected error | "Something went wrong. Please try again" |

---

## 7. Accessibility (a11y)

### ARIA Attributes

```html
<!-- Modal Container -->
<div
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  aria-modal="true"
>
  <!-- Modal Header -->
  <h2 id="modal-title">Add New Category</h2>

  <!-- Form -->
  <form aria-label="Create category form">

    <!-- Name Field -->
    <label for="category-name">
      Category Name
      <span aria-label="required">*</span>
    </label>
    <input
      id="category-name"
      type="text"
      required
      aria-required="true"
      aria-invalid="false"
      aria-describedby="name-error name-counter"
      maxlength="50"
    />
    <div id="name-counter" aria-live="polite">0 / 50 characters</div>
    <div id="name-error" role="alert" aria-live="assertive"></div>

    <!-- Color Field -->
    <fieldset>
      <legend>
        Color
        <span aria-label="required">*</span>
      </legend>
      <div role="radiogroup" aria-required="true">
        <label>
          <input type="radio" name="color" value="red" />
          <span class="color-swatch" style="background: #F24822"></span>
          Red
        </label>
        <!-- ... more colors ... -->
      </div>
    </fieldset>

    <!-- Description Field -->
    <label for="category-description">Description (optional)</label>
    <textarea
      id="category-description"
      aria-describedby="desc-counter"
      maxlength="200"
    ></textarea>
    <div id="desc-counter" aria-live="polite">0 / 200 characters</div>

    <!-- Buttons -->
    <button type="button" onclick="closeModal()">Cancel</button>
    <button
      type="submit"
      disabled
      aria-disabled="true"
      aria-describedby="submit-status"
    >
      Create Category
    </button>
    <div id="submit-status" aria-live="polite"></div>
  </form>
</div>
```

### Screen Reader Experience

**Modal Open**:
> "Dialog. Add New Category. Category Name, required, edit text, blank. 0 of 50 characters."

**Typing Name**:
> "Design Feedback. 16 of 50 characters."

**Validation Error**:
> "Alert. Category 'bug' already exists."

**Color Selection**:
> "Color, required. Radio group. Red, radio button, not checked. Blue, radio button, checked. Selected: Blue."

**Submit Enabled**:
> "Create Category button, enabled."

**Creating Category**:
> "Creating category. Please wait."

**Success**:
> "Success! Category 'Design Feedback' has been created."

---

## 8. Performance Considerations

### Optimization Strategies

1. **Debounced Validation**
   - Delay validation by 300ms after last keystroke
   - Prevents excessive API calls for duplicate checking
   - Improves perceived performance

2. **Lazy Loading**
   - Only load modal HTML when "+ Add Category" is clicked
   - Reduces initial plugin load time
   - Keeps main UI lightweight

3. **Local Caching**
   - Cache existing category list in memory
   - Refresh on modal open (async)
   - Reduces Figma API calls

4. **Optimistic UI Updates**
   - Show success state immediately
   - Update category list locally before API confirmation
   - Rollback if API call fails

5. **Request Timeout**
   - Set 10-second timeout for category creation
   - Show error state if exceeded
   - Prevents indefinite loading states

---

## 9. Edge Cases & Error Handling

### Edge Case 1: WebSocket Disconnected During Creation

**Scenario**: User is creating a category when connection drops

**Handling**:
1. Detect WebSocket disconnect event
2. Show error state: "Connection lost"
3. Offer "Reconnect" button
4. Preserve form data (don't clear inputs)
5. Once reconnected, allow retry

---

### Edge Case 2: Duplicate Category Created by Another User

**Scenario**: Two users create the same category name simultaneously

**Handling**:
1. Server-side duplicate check on Figma API
2. API returns error: "Category already exists"
3. Show inline error on name field
4. Suggest alternative name: "Design Feedback 2"
5. Allow user to edit and retry

---

### Edge Case 3: User Closes Figma File During Creation

**Scenario**: User switches files or closes Figma while modal is open

**Handling**:
1. Figma plugin automatically closes (Figma behavior)
2. No data is saved (expected behavior)
3. On next plugin launch, form is reset
4. No orphaned data or broken states

---

### Edge Case 4: Maximum Categories Reached

**Scenario**: Figma may have a limit on number of categories (hypothetical)

**Handling**:
1. Check category count before showing modal
2. If at limit, disable "+ Add Category" button
3. Show tooltip: "Maximum categories reached (limit: 50)"
4. Suggest deleting unused categories

---

### Edge Case 5: Special Characters in Name

**Scenario**: User enters emoji or special Unicode characters

**Handling**:
1. Validation regex blocks non-alphanumeric characters
2. Show error: "Name can only contain letters, numbers, spaces, and -_"
3. Provide examples of valid names
4. Auto-sanitize input (optional): remove invalid chars on blur

---

### Edge Case 6: Browser Autofill

**Scenario**: Browser tries to autofill form fields

**Handling**:
1. Add `autocomplete="off"` to form
2. Disable autofill on name field: `autocomplete="new-category"`
3. Prevent password managers from interfering
4. Ensure clean slate for each modal open

---

### Edge Case 7: User Spams Create Button

**Scenario**: User clicks "Create Category" multiple times rapidly

**Handling**:
1. Disable button immediately on first click
2. Show loading state
3. Prevent duplicate API calls with request deduplication
4. Only enable button after completion or error

---

## 10. Future Enhancements (Out of Scope for v1)

### Feature Ideas for v2+

1. **Category Templates**
   - Pre-defined category sets (e.g., "Bug Tracking", "Design System")
   - One-click import of common category structures
   - Shareable category configurations

2. **Category Management**
   - Edit existing categories
   - Delete unused categories
   - Reorder category display
   - Archive/hide categories

3. **Color Customization**
   - Custom color picker (HEX input)
   - Recent colors history
   - Color themes/palettes

4. **Bulk Operations**
   - Create multiple categories at once
   - Import from CSV/JSON
   - Export category configuration

5. **Analytics**
   - Usage statistics per category
   - Most-used categories dashboard
   - Unused category recommendations

6. **Collaboration**
   - Category permissions (who can use/edit)
   - Team-wide category libraries
   - Category usage notifications

---

## 11. Technical Implementation Notes

### File Structure (Proposed)

```
src/cursor_mcp_plugin/
├── code.js                 # Existing plugin logic
├── ui.html                 # Main UI (will be modified)
├── components/
│   └── add-category-modal.js   # New modal component
├── styles/
│   └── modal.css               # Modal-specific styles
└── utils/
    ├── validation.js           # Form validation logic
    └── category-helpers.js     # Category CRUD operations
```

### New Figma API Methods (to be implemented)

**In `code.js`**:
```javascript
// Create new annotation category
async function createAnnotationCategory(name, color) {
  try {
    const category = await figma.annotations.createAnnotationCategoryAsync({
      label: name,
      color: color // RGB object: { r, g, b }
    });
    return { success: true, category };
  } catch (error) {
    return { success: false, error };
  }
}

// Check if category name exists (case-insensitive)
async function categoryNameExists(name) {
  const categories = await figma.annotations.getAnnotationCategoriesAsync();
  return categories.some(
    cat => cat.label.toLowerCase() === name.toLowerCase()
  );
}

// Get all categories (cached)
let categoriesCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30000; // 30 seconds

async function getCategories(forceRefresh = false) {
  const now = Date.now();

  if (forceRefresh || !categoriesCache || (now - cacheTimestamp > CACHE_DURATION)) {
    categoriesCache = await figma.annotations.getAnnotationCategoriesAsync();
    cacheTimestamp = now;
  }

  return categoriesCache;
}
```

---

## 12. Success Metrics

### User Experience Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Time to Create Category** | < 30 seconds | From button click to success |
| **Validation Error Rate** | < 10% | Failed submissions / total attempts |
| **Successful Creation Rate** | > 95% | Successful creations / total attempts |
| **Modal Abandonment Rate** | < 20% | Closed without submitting / total opens |
| **User Satisfaction** | > 4.5/5 | Post-creation survey rating |

### Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **API Response Time** | < 2 seconds | Time to create category via Figma API |
| **Modal Load Time** | < 200ms | Time to render modal |
| **Validation Latency** | < 300ms | Debounce delay + validation time |
| **Error Rate** | < 2% | API errors / total requests |
| **Cache Hit Rate** | > 80% | Cached reads / total category fetches |

---

## Summary

This user flow creates a smooth, intuitive experience for adding annotation categories with:

✅ **Clear entry point** - "+ Add Category" button
✅ **Simple 3-field form** - Name, Color, Description
✅ **Real-time validation** - Immediate feedback on errors
✅ **Accessible design** - WCAG AA compliant, keyboard-friendly
✅ **Error handling** - Clear messages and recovery paths
✅ **Loading states** - Visual feedback during async operations
✅ **Success confirmation** - Clear indication of completion

The flow integrates seamlessly with the existing Figma plugin architecture while maintaining the clean, dark-themed UI aesthetic of the current design.

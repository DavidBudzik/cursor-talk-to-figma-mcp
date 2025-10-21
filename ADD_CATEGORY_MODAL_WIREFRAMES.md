# Add Category Modal - Visual Wireframes & Mockups

## Design System Reference

### Color Palette
```
Background Colors:
  Main:      #1e1e1e
  Secondary: #2d2d2d
  Tertiary:  #3d3d3d
  Overlay:   rgba(0, 0, 0, 0.6)

Text Colors:
  Primary:   #e0e0e0
  Heading:   #ffffff
  Label:     #cccccc
  Muted:     #999999
  Disabled:  #666666

Accent Colors:
  Primary:   #18a0fb (hover: #0d8ee0)
  Success:   #4ade80 (background: #1a472a)
  Error:     #ff9999 (background: #471a1a)
  Warning:   #fbbf24 (background: #4a3f1a)
  Info:      #66b3ff (background: #1a3147)

Borders:
  Default:   #444444
  Focus:     #18a0fb
  Error:     #ff9999
  Success:   #4ade80
```

### Typography
```
Font Family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto
Font Sizes:
  H1: 16px, weight 600
  H2: 14px, weight 600
  Body: 14px
  Label: 12px, weight 500
  Small: 11px
```

### Spacing
```
Padding:
  Modal: 24px
  Section: 20px
  Button: 8px 12px
  Input: 8px

Margins:
  Section: 16px
  Field: 12px
  Label: 4px

Border Radius:
  Modal: 8px
  Button: 6px
  Input: 4px
  Badge: 12px
```

---

## Wireframe 1: Modal in Context (Main UI View)

```
┌─────────────────────────────────────────────────────────┐
│  #1e1e1e                                                │
│  ┌─────────────────────────────────────────────────┐   │
│  │  [Logo]  Cursor Talk To Figma Plugin            │   │
│  │          Connect Figma to Cursor AI using MCP   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────┬─────────┐                             │
│  │ Connection  │ About   │  #444444 border-bottom      │
│  └─────────────┴─────────┘                             │
│   ▀▀▀▀▀▀▀▀▀▀▀  #18a0fb (active indicator)              │
│                                                         │
│  WebSocket Server Port                #cccccc          │
│  ┌──────────┬──────────────┐                           │
│  │  3055    │  [Connect]   │  #2d2d2d │ #18a0fb       │
│  └──────────┴──────────────┘                           │
│                                                         │
│  ┌───────────────────────────────────────────────┐     │
│  │ ✓ Connected to server on port 3055           │     │
│  │   in channel: abc12345            #1a472a    │     │
│  └───────────────────────────────────────────────┘     │
│                                                         │
│  Categories                           #ffffff          │
│  ┌─────────────────────────────────────────────┐       │
│  │  ● Bug           #F24822            [×]     │       │
│  │  ● Feature       #2979FF            [×]     │       │
│  │  ● Review        #FFD600            [×]     │       │
│  └─────────────────────────────────────────────┘       │
│                                                         │
│  ┌─────────────────────┐                               │
│  │  + Add Category     │  #3d3d3d (secondary button)   │
│  └─────────────────────┘                               │
│        ▲                                                │
│        │ User clicks here                              │
│        │                                                │
└────────┼────────────────────────────────────────────────┘
         │
         │
         ▼
    Modal Opens
```

---

## Wireframe 2: Modal - Initial/Empty State

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              rgba(0, 0, 0, 0.6) overlay                │
│                                                         │
│     ┌───────────────────────────────────────────┐      │
│     │  #2d2d2d                          [×]     │      │
│     │  Add New Category                 #999   │      │
│     │  ──────────────────────────────────────── │      │
│     │                                           │      │
│     │  Category Name *          #cccccc         │      │
│     │  ┌─────────────────────────────────────┐  │      │
│     │  │ │                   #2d2d2d         │  │      │
│     │  │ └─ cursor            #444 border    │  │      │
│     │  └─────────────────────────────────────┘  │      │
│     │  0 / 50 characters       #999999          │      │
│     │                                           │      │
│     │  Color *                 #cccccc          │      │
│     │  ┌─────────────────────────────────────┐  │      │
│     │  │ ◉   ○   ○   ○   ○   ○   ○   ○      │  │      │
│     │  │ Red Org Yel Grn Blu Pur Pin Gry    │  │      │
│     │  │ #F24822 is selected (default)       │  │      │
│     │  └─────────────────────────────────────┘  │      │
│     │                                           │      │
│     │  Description (optional)   #999999         │      │
│     │  ┌─────────────────────────────────────┐  │      │
│     │  │                       #2d2d2d       │  │      │
│     │  │                       3 rows        │  │      │
│     │  │                                     │  │      │
│     │  └─────────────────────────────────────┘  │      │
│     │  Add a description to help others...      │      │
│     │  0 / 200 characters      #999999          │      │
│     │                                           │      │
│     │  ┌──────────┐  ┌──────────────────────┐  │      │
│     │  │ Cancel   │  │ Create Category      │  │      │
│     │  │ #3d3d3d  │  │ #333 (disabled)      │  │      │
│     │  │ #e0e0e0  │  │ #666 text            │  │      │
│     │  └──────────┘  └──────────────────────┘  │      │
│     │                                           │      │
│     └───────────────────────────────────────────┘      │
│            ▲                                           │
│            │ 350px width                               │
│            │ Auto height                               │
│            │ 8px border-radius                         │
│            │ Box shadow: 0 10px 40px rgba(0,0,0,0.4)  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Component Breakdown:

**Modal Header**
```
┌─────────────────────────────────────────┐
│  Add New Category              [×]      │
│  #ffffff, 16px, 600         #999999     │
└─────────────────────────────────────────┘
```

**Color Picker Detail**
```
Color *
┌───────────────────────────────────────────┐
│  ●      ●      ●      ●      ●      ●     │
│  32px   32px   32px   32px   32px   32px  │
│  circle circle circle circle circle circle│
│                                           │
│  Red    Orange Yellow Green  Blue   Purple│
│  #F24822 #FF6D00 #FFD600 #00C853 #2979FF │
│                                           │
│  ●      ●                                 │
│  Pink   Gray                              │
│  #E91E63 #808080                          │
│                                           │
│  Border: 2px solid #18a0fb (selected)     │
│  Border: 2px solid transparent (default)  │
│  Hover: opacity 0.8                       │
└───────────────────────────────────────────┘
```

**Disabled Button State**
```
┌──────────────────────┐
│  Create Category     │
│  #333333 background  │
│  #666666 text        │
│  cursor: not-allowed │
│  No hover effect     │
└──────────────────────┘
```

---

## Wireframe 3: Valid Input State (Enabled Submit)

```
┌─────────────────────────────────────────────────────────┐
│              rgba(0, 0, 0, 0.6) overlay                │
│                                                         │
│     ┌───────────────────────────────────────────┐      │
│     │  #2d2d2d                          [×]     │      │
│     │  Add New Category                         │      │
│     │  ──────────────────────────────────────── │      │
│     │                                           │      │
│     │  Category Name *          #cccccc         │      │
│     │  ┌─────────────────────────────────────┐  │      │
│     │  │ Design Feedback      ✓  #4ade80    │  │      │
│     │  │                   #2d2d2d           │  │      │
│     │  │ Border: #18a0fb (focused)           │  │      │
│     │  └─────────────────────────────────────┘  │      │
│     │  16 / 50 characters      #999999          │      │
│     │                                           │      │
│     │  Color *                 #cccccc          │      │
│     │  ┌─────────────────────────────────────┐  │      │
│     │  │ ○   ○   ○   ○   ◉   ○   ○   ○      │  │      │
│     │  │ Red Org Yel Grn Blu Pur Pin Gry    │  │      │
│     │  │                 ▲                   │  │      │
│     │  │                 │                   │  │      │
│     │  │            Blue selected            │  │      │
│     │  │            #2979FF                  │  │      │
│     │  │            2px #18a0fb border       │  │      │
│     │  └─────────────────────────────────────┘  │      │
│     │                                           │      │
│     │  Description (optional)   #999999         │      │
│     │  ┌─────────────────────────────────────┐  │      │
│     │  │ For gathering design feedback and  │  │      │
│     │  │ review comments from stakeholders  │  │      │
│     │  │                                     │  │      │
│     │  └─────────────────────────────────────┘  │      │
│     │  89 / 200 characters     #999999          │      │
│     │                                           │      │
│     │  ┌──────────┐  ┌──────────────────────┐  │      │
│     │  │ Cancel   │  │ Create Category  ✓  │  │      │
│     │  │ #3d3d3d  │  │ #18a0fb (enabled)    │  │      │
│     │  │          │  │ Hover: #0d8ee0       │  │      │
│     │  └──────────┘  └──────────────────────┘  │      │
│     │                                           │      │
│     └───────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Interactive States:

**Input Focus State**
```
┌─────────────────────────────────────┐
│ Design Feedback               ✓    │
│ Border: 1px solid #18a0fb           │
│ Background: #2d2d2d                 │
│ Box-shadow: 0 0 0 3px rgba(24,160,  │
│             251, 0.1)               │
└─────────────────────────────────────┘
```

**Selected Color Indicator**
```
     ●
   32x32
  #2979FF
┌─────────┐
│         │
│    ✓    │  White checkmark
│         │  12px centered
└─────────┘
Border: 2px solid #18a0fb
Box-shadow: 0 0 8px rgba(24, 160, 251, 0.4)
```

**Enabled Primary Button**
```
┌──────────────────────┐
│  Create Category  ✓  │
│  #18a0fb background  │
│  #ffffff text        │
│  transition: 0.2s    │
│                      │
│  Hover State:        │
│  #0d8ee0 background  │
│  transform: scale    │
│  (1.02)              │
└──────────────────────┘
```

---

## Wireframe 4: Validation Error State

```
┌─────────────────────────────────────────────────────────┐
│              rgba(0, 0, 0, 0.6) overlay                │
│                                                         │
│     ┌───────────────────────────────────────────┐      │
│     │  #2d2d2d                          [×]     │      │
│     │  Add New Category                         │      │
│     │  ──────────────────────────────────────── │      │
│     │                                           │      │
│     │  Category Name *          #cccccc         │      │
│     │  ┌─────────────────────────────────────┐  │      │
│     │  │ bug                      ⚠️         │  │      │
│     │  │                                     │  │      │
│     │  │ Border: 1px solid #ff9999           │  │      │
│     │  │ Background: #2d2d2d                 │  │      │
│     │  └─────────────────────────────────────┘  │      │
│     │  ┌─────────────────────────────────────┐  │      │
│     │  │ ⚠️  Category "bug" already exists   │  │      │
│     │  │     #ff9999 text                    │  │      │
│     │  │     #471a1a background              │  │      │
│     │  │     6px border-radius               │  │      │
│     │  │     8px padding                     │  │      │
│     │  └─────────────────────────────────────┘  │      │
│     │  3 / 50 characters       #999999          │      │
│     │                                           │      │
│     │  Color *                 #cccccc          │      │
│     │  ┌─────────────────────────────────────┐  │      │
│     │  │ ◉   ○   ○   ○   ○   ○   ○   ○      │  │      │
│     │  │ Red Org Yel Grn Blu Pur Pin Gry    │  │      │
│     │  └─────────────────────────────────────┘  │      │
│     │                                           │      │
│     │  Description (optional)   #999999         │      │
│     │  ┌─────────────────────────────────────┐  │      │
│     │  │                                     │  │      │
│     │  │                                     │  │      │
│     │  │                                     │  │      │
│     │  └─────────────────────────────────────┘  │      │
│     │  0 / 200 characters      #999999          │      │
│     │                                           │      │
│     │  ┌──────────┐  ┌──────────────────────┐  │      │
│     │  │ Cancel   │  │ Create Category      │  │      │
│     │  │ #3d3d3d  │  │ #333 (disabled)      │  │      │
│     │  └──────────┘  └──────────────────────┘  │      │
│     │                                           │      │
│     └───────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Error Component Details:

**Error Input Field**
```
┌─────────────────────────────────────┐
│ bug                          ⚠️     │
│ Border: 1px solid #ff9999           │
│ Background: #2d2d2d                 │
│ Icon: #ff9999, 16px                 │
└─────────────────────────────────────┘
```

**Error Message Box**
```
┌─────────────────────────────────────┐
│ ⚠️  Category "bug" already exists   │
│                                     │
│ Background: #471a1a                 │
│ Color: #ff9999                      │
│ Padding: 8px 12px                   │
│ Border-radius: 6px                  │
│ Font-size: 12px                     │
│ Margin-top: 4px                     │
└─────────────────────────────────────┘
```

### All Validation Error Messages:

**Empty Name**
```
┌─────────────────────────────────────┐
│ ⚠️  Category name is required        │
└─────────────────────────────────────┘
```

**Too Short**
```
┌─────────────────────────────────────┐
│ ⚠️  Name must be at least 2 chars    │
└─────────────────────────────────────┘
```

**Too Long**
```
┌─────────────────────────────────────┐
│ ⚠️  Name must be 50 characters or    │
│     less                             │
└─────────────────────────────────────┘
```

**Invalid Characters**
```
┌─────────────────────────────────────┐
│ ⚠️  Name can only contain letters,   │
│     numbers, spaces, and -_          │
└─────────────────────────────────────┘
```

**Duplicate (case-insensitive)**
```
┌─────────────────────────────────────┐
│ ⚠️  Category "Design Review" already │
│     exists                           │
└─────────────────────────────────────┘
```

---

## Wireframe 5: Loading/Creating State

```
┌─────────────────────────────────────────────────────────┐
│              rgba(0, 0, 0, 0.7) overlay                │
│              (darker while loading)                     │
│                                                         │
│     ┌───────────────────────────────────────────┐      │
│     │  #2d2d2d                                  │      │
│     │  Add New Category                         │      │
│     │  ──────────────────────────────────────── │      │
│     │                                           │      │
│     │              ┌─────────┐                  │      │
│     │              │    ⏳    │                  │      │
│     │              │ spinner │  Animated        │      │
│     │              │ 48x48px │  rotation        │      │
│     │              └─────────┘                  │      │
│     │                                           │      │
│     │         Creating category...              │      │
│     │         #ffffff, 14px, centered           │      │
│     │                                           │      │
│     │  Category Name *          #cccccc         │      │
│     │  ┌─────────────────────────────────────┐  │      │
│     │  │ Design Feedback                     │  │      │
│     │  │ disabled, opacity: 0.5              │  │      │
│     │  └─────────────────────────────────────┘  │      │
│     │                                           │      │
│     │  Color *                                  │      │
│     │  ┌─────────────────────────────────────┐  │      │
│     │  │ ○   ○   ○   ○   ◉   ○   ○   ○      │  │      │
│     │  │ All disabled, opacity: 0.5          │  │      │
│     │  └─────────────────────────────────────┘  │      │
│     │                                           │      │
│     │  Description (optional)                   │      │
│     │  ┌─────────────────────────────────────┐  │      │
│     │  │ For gathering design...             │  │      │
│     │  │ disabled, opacity: 0.5              │  │      │
│     │  └─────────────────────────────────────┘  │      │
│     │                                           │      │
│     │  ┌────────────────────────────────────┐   │      │
│     │  │        ⏳ Creating...              │   │      │
│     │  │        #333 (disabled)             │   │      │
│     │  │        Full width button           │   │      │
│     │  │        Spinner animation           │   │      │
│     │  └────────────────────────────────────┘   │      │
│     │                                           │      │
│     └───────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Loading Spinner Design:

```
   ⏳ CSS Spinner Animation

   @keyframes spin {
     0% { transform: rotate(0deg); }
     100% { transform: rotate(360deg); }
   }

   ┌────────┐
   │ ◐      │  48x48px
   │        │  border: 4px solid #444
   │        │  border-top-color: #18a0fb
   └────────┘  border-radius: 50%
               animation: spin 1s linear infinite
```

**Alternative: Progress Bar**
```
Creating category...

┌─────────────────────────────────────┐
│████████████░░░░░░░░░░░░░░░░░░░░░  │
└─────────────────────────────────────┘
#18a0fb ─────┘           └───── #444

Indeterminate animation (sliding bar)
```

---

## Wireframe 6: Success State

```
┌─────────────────────────────────────────────────────────┐
│              rgba(0, 0, 0, 0.6) overlay                │
│                                                         │
│     ┌───────────────────────────────────────────┐      │
│     │  #2d2d2d                          [×]     │      │
│     │  Category Created!        #4ade80         │      │
│     │  ──────────────────────────────────────── │      │
│     │                                           │      │
│     │              ┌─────────┐                  │      │
│     │              │    ✓    │                  │      │
│     │              │  64x64  │  #4ade80         │      │
│     │              │  circle │  animated        │      │
│     │              └─────────┘  scale-in        │      │
│     │                                           │      │
│     │          Success!                         │      │
│     │          #ffffff, 18px, 600               │      │
│     │                                           │      │
│     │  ┌───────────────────────────────────┐    │      │
│     │  │  "Design Feedback" has been       │    │      │
│     │  │  created and is now available     │    │      │
│     │  │  for annotations.                 │    │      │
│     │  │                                   │    │      │
│     │  │  #e0e0e0, 14px, centered          │    │      │
│     │  │  #1a472a background (success)     │    │      │
│     │  │  8px padding, 6px radius          │    │      │
│     │  └───────────────────────────────────┘    │      │
│     │                                           │      │
│     │  ┌───────────────────────────────────┐    │      │
│     │  │  ● Design Feedback    #2979FF     │    │      │
│     │  │  Preview of new category          │    │      │
│     │  │  #2d2d2d background               │    │      │
│     │  │  8px padding                      │    │      │
│     │  └───────────────────────────────────┘    │      │
│     │                                           │      │
│     │         ┌──────────────────┐              │      │
│     │         │      Done        │              │      │
│     │         │   #18a0fb        │              │      │
│     │         │   Centered       │              │      │
│     │         └──────────────────┘              │      │
│     │                                           │      │
│     └───────────────────────────────────────────┘      │
│                                                         │
│  Auto-closes after 2 seconds or on "Done" click        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Success Checkmark Animation:

```
Frame 1 (0ms):
    ○      Scale: 0
           Opacity: 0

Frame 2 (100ms):
    ◐      Scale: 0.5
           Opacity: 0.5

Frame 3 (200ms):
    ●      Scale: 1.2
    ✓      Opacity: 1

Frame 4 (300ms):
    ●      Scale: 1.0
    ✓      Final state

CSS:
@keyframes success-scale {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}
```

**Alternative: Confetti Animation**
```
          *  .  *
       .     ✓     .
    *    ● Success!  *
       .           .
          *  .  *

Small colored particles (#18a0fb, #4ade80, #fbbf24)
animate outward from center
```

---

## Wireframe 7: Error State (API Failure)

```
┌─────────────────────────────────────────────────────────┐
│              rgba(0, 0, 0, 0.6) overlay                │
│                                                         │
│     ┌───────────────────────────────────────────┐      │
│     │  #2d2d2d                          [×]     │      │
│     │  Add New Category                         │      │
│     │  ──────────────────────────────────────── │      │
│     │                                           │      │
│     │              ┌─────────┐                  │      │
│     │              │    ✕    │                  │      │
│     │              │  48x48  │  #ff9999         │      │
│     │              │  circle │                  │      │
│     │              └─────────┘                  │      │
│     │                                           │      │
│     │       ⚠️ Error Creating Category          │      │
│     │       #ff9999, 16px, 600                  │      │
│     │                                           │      │
│     │  ┌───────────────────────────────────┐    │      │
│     │  │  Could not create category.       │    │      │
│     │  │  Please check your connection     │    │      │
│     │  │  and try again.                   │    │      │
│     │  │                                   │    │      │
│     │  │  #ff9999, 14px                    │    │      │
│     │  │  #471a1a background               │    │      │
│     │  │  8px padding, 6px radius          │    │      │
│     │  └───────────────────────────────────┘    │      │
│     │                                           │      │
│     │  ┌───────────────────────────────────┐    │      │
│     │  │  Error Details:                   │    │      │
│     │  │  Network timeout (10s exceeded)   │    │      │
│     │  │                                   │    │      │
│     │  │  #999999, 12px, monospace         │    │      │
│     │  │  #1e1e1e background               │    │      │
│     │  │  8px padding, 4px radius          │    │      │
│     │  └───────────────────────────────────┘    │      │
│     │                                           │      │
│     │  ┌──────────┐  ┌──────────────────────┐  │      │
│     │  │ Cancel   │  │  Retry               │  │      │
│     │  │ #3d3d3d  │  │  #18a0fb             │  │      │
│     │  └──────────┘  └──────────────────────┘  │      │
│     │                                           │      │
│     └───────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Error Types & Messages:

**Network Error**
```
┌─────────────────────────────────────┐
│ ⚠️ Connection Lost                  │
│                                     │
│ The connection to the server was    │
│ lost. Please reconnect and try      │
│ again.                              │
│                                     │
│ Error: WebSocket disconnected       │
└─────────────────────────────────────┘
```

**Permission Error**
```
┌─────────────────────────────────────┐
│ ⚠️ Permission Denied                │
│                                     │
│ You don't have permission to        │
│ create categories in this file.     │
│                                     │
│ Error: PERMISSION_DENIED            │
└─────────────────────────────────────┘
```

**Timeout Error**
```
┌─────────────────────────────────────┐
│ ⚠️ Request Timed Out                │
│                                     │
│ The request took too long to        │
│ complete. Please try again.         │
│                                     │
│ Error: Timeout (10s exceeded)       │
└─────────────────────────────────────┘
```

**Figma API Error**
```
┌─────────────────────────────────────┐
│ ⚠️ Figma Service Unavailable        │
│                                     │
│ Figma's annotation service is       │
│ currently unavailable. Please try   │
│ again later.                        │
│                                     │
│ Error: FIGMA_API_ERROR              │
└─────────────────────────────────────┘
```

---

## Wireframe 8: Mobile/Responsive View (Narrow Panel)

```
┌─────────────────────────────┐
│  rgba(0, 0, 0, 0.6)         │
│                             │
│  ┌─────────────────────┐    │
│  │ Add New Category [×]│    │
│  │ ─────────────────── │    │
│  │                     │    │
│  │ Category Name *     │    │
│  │ ┌─────────────────┐ │    │
│  │ │ Design Review   │ │    │
│  │ └─────────────────┘ │    │
│  │ 13 / 50             │    │
│  │                     │    │
│  │ Color *             │    │
│  │ ┌─────────────────┐ │    │
│  │ │ ● ● ● ●         │ │    │
│  │ │ ● ● ● ●         │ │    │
│  │ │ 2 rows          │ │    │
│  │ └─────────────────┘ │    │
│  │                     │    │
│  │ Description (opt.)  │    │
│  │ ┌─────────────────┐ │    │
│  │ │                 │ │    │
│  │ │                 │ │    │
│  │ └─────────────────┘ │    │
│  │ 0 / 200             │    │
│  │                     │    │
│  │ ┌─────────────────┐ │    │
│  │ │ Create          │ │    │
│  │ └─────────────────┘ │    │
│  │ ┌─────────────────┐ │    │
│  │ │ Cancel          │ │    │
│  │ └─────────────────┘ │    │
│  │                     │    │
│  └─────────────────────┘    │
│                             │
│  Stacked buttons on mobile  │
│                             │
└─────────────────────────────┘
```

---

## Component Library

### 1. Modal Container
```css
.category-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  max-width: calc(100vw - 40px);
  max-height: calc(100vh - 40px);
  background: #2d2d2d;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  overflow-y: auto;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  backdrop-filter: blur(2px);
}
```

### 2. Modal Header
```css
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-title {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.modal-close {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: #999999;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  transition: color 0.2s;
}

.modal-close:hover {
  color: #ffffff;
}
```

### 3. Form Field
```css
.form-field {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #cccccc;
  margin-bottom: 6px;
}

.form-label .required {
  color: #ff9999;
}

.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #444444;
  border-radius: 4px;
  background: #2d2d2d;
  color: #e0e0e0;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #18a0fb;
  box-shadow: 0 0 0 3px rgba(24, 160, 251, 0.1);
}

.form-input.error {
  border-color: #ff9999;
}

.form-input.success {
  border-color: #4ade80;
}
```

### 4. Character Counter
```css
.character-counter {
  font-size: 11px;
  color: #999999;
  margin-top: 4px;
  text-align: right;
}

.character-counter.warning {
  color: #fbbf24;
}

.character-counter.error {
  color: #ff9999;
}
```

### 5. Color Picker
```css
.color-picker {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 8px;
}

.color-option {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.color-option:hover {
  opacity: 0.8;
  transform: scale(1.05);
}

.color-option.selected {
  border-color: #18a0fb;
  box-shadow: 0 0 8px rgba(24, 160, 251, 0.4);
}

.color-option.selected::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
```

### 6. Error Message
```css
.error-message {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 12px;
  background: #471a1a;
  color: #ff9999;
  border-radius: 6px;
  font-size: 12px;
  margin-top: 4px;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-icon {
  flex-shrink: 0;
  font-size: 14px;
}
```

### 7. Success Message
```css
.success-message {
  text-align: center;
  padding: 20px;
}

.success-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: #1a472a;
  color: #4ade80;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  animation: success-scale 0.3s ease-out;
}

.success-text {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
}

.success-description {
  font-size: 14px;
  color: #e0e0e0;
  line-height: 1.5;
}
```

### 8. Loading Spinner
```css
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #444444;
  border-top-color: #18a0fb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  margin-top: 16px;
  font-size: 14px;
  color: #ffffff;
}
```

### 9. Button Group
```css
.button-group {
  display: flex;
  gap: 8px;
  margin-top: 20px;
}

.btn {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #18a0fb;
  color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
  background: #0d8ee0;
}

.btn-primary:disabled {
  background: #333333;
  color: #666666;
  cursor: not-allowed;
}

.btn-secondary {
  background: #3d3d3d;
  color: #e0e0e0;
}

.btn-secondary:hover {
  background: #4d4d4d;
}
```

---

## Animation Specifications

### 1. Modal Open Animation
```css
@keyframes modal-fade-in {
  from {
    opacity: 0;
    transform: translate(-50%, -45%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.category-modal {
  animation: modal-fade-in 0.2s ease-out;
}
```

### 2. Overlay Fade
```css
@keyframes overlay-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-overlay {
  animation: overlay-fade-in 0.2s ease-out;
}
```

### 3. Field Validation Success
```css
@keyframes success-pulse {
  0%, 100% {
    border-color: #4ade80;
  }
  50% {
    border-color: #22c55e;
    box-shadow: 0 0 8px rgba(74, 222, 128, 0.4);
  }
}

.form-input.success {
  animation: success-pulse 0.4s ease-out;
}
```

### 4. Error Shake
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.form-input.error {
  animation: shake 0.3s ease-out;
}
```

---

## Accessibility Features

### 1. Keyboard Navigation Flow
```
1. [Category Name input] ← Auto-focused on open
   ↓ Tab
2. [Color: Red]
   → Arrow keys to navigate colors
   ↓ Tab
3. [Description textarea]
   ↓ Tab
4. [Cancel button]
   ↓ Tab
5. [Create Category button]
   ↓ Tab (loops back to step 1)

Shift+Tab: Reverse direction
Enter: Submit (if valid)
Esc: Close modal (with confirmation if dirty)
```

### 2. ARIA Labels
```html
<!-- Full accessibility markup -->
<div
  class="modal-overlay"
  role="presentation"
  aria-hidden="false"
></div>

<div
  class="category-modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <div class="modal-header">
    <h2 id="modal-title">Add New Category</h2>
    <button
      class="modal-close"
      aria-label="Close dialog"
      title="Close (Esc)"
    >
      ×
    </button>
  </div>

  <form aria-label="Create category form">
    <div class="form-field">
      <label for="category-name">
        Category Name
        <span class="required" aria-label="required">*</span>
      </label>
      <input
        id="category-name"
        type="text"
        required
        aria-required="true"
        aria-invalid="false"
        aria-describedby="name-counter name-error"
        maxlength="50"
      />
      <div
        id="name-counter"
        class="character-counter"
        aria-live="polite"
      >
        0 / 50 characters
      </div>
      <div
        id="name-error"
        class="error-message"
        role="alert"
        aria-live="assertive"
        hidden
      ></div>
    </div>

    <fieldset class="form-field">
      <legend>
        Color
        <span class="required" aria-label="required">*</span>
      </legend>
      <div
        class="color-picker"
        role="radiogroup"
        aria-required="true"
        aria-label="Select category color"
      >
        <label>
          <input
            type="radio"
            name="color"
            value="red"
            aria-label="Red"
          />
          <span class="color-option" style="background: #F24822"></span>
        </label>
        <!-- ... more colors ... -->
      </div>
    </fieldset>

    <div class="button-group">
      <button
        type="button"
        class="btn btn-secondary"
        onclick="closeModal()"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="btn btn-primary"
        disabled
        aria-disabled="true"
        aria-describedby="submit-status"
      >
        Create Category
      </button>
    </div>
  </form>

  <div
    id="submit-status"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  ></div>
</div>
```

### 3. Screen Reader Announcements

**Modal Open:**
```
"Dialog. Add New Category. Category Name, required, edit text, blank."
```

**Typing in Name Field:**
```
"Design Feedback. 16 of 50 characters."
```

**Validation Error:**
```
"Alert. Category 'bug' already exists. Invalid."
```

**Color Selection:**
```
"Color, required. Radio group. Select category color.
Red, radio button, not checked.
Blue, radio button, checked."
```

**Submit Button State:**
```
"Create Category button, disabled."
→ (after valid input)
"Create Category button, enabled."
```

**Creating:**
```
"Creating category. Please wait."
```

**Success:**
```
"Success! Category 'Design Feedback' has been created."
```

---

## Responsive Breakpoints

### Desktop (Default: 350px width)
```css
@media (min-width: 400px) {
  .category-modal {
    width: 350px;
  }

  .color-picker {
    grid-template-columns: repeat(4, 1fr);
  }

  .button-group {
    flex-direction: row;
  }
}
```

### Narrow (< 400px)
```css
@media (max-width: 399px) {
  .category-modal {
    width: calc(100vw - 40px);
    padding: 20px;
  }

  .color-picker {
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }

  .button-group {
    flex-direction: column-reverse;
  }

  .btn {
    width: 100%;
  }
}
```

### Very Narrow (< 320px)
```css
@media (max-width: 319px) {
  .modal-title {
    font-size: 14px;
  }

  .color-picker {
    grid-template-columns: repeat(3, 1fr);
  }

  .form-input,
  .form-textarea {
    font-size: 16px; /* Prevent zoom on iOS */
  }
}
```

---

## Dark Mode (Current) vs Light Mode (Future)

### Current Dark Theme
```
Background: #1e1e1e, #2d2d2d, #3d3d3d
Text: #e0e0e0, #ffffff
Accent: #18a0fb
```

### Potential Light Theme (Not Implemented)
```css
/* For future reference */
.light-theme {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --bg-tertiary: #e5e5e5;
  --text-primary: #1e1e1e;
  --text-secondary: #666666;
  --text-muted: #999999;
  --accent: #0066cc;
  --border: #d4d4d4;
}
```

---

## Summary

This wireframe document provides:

✅ **7 Complete Modal States** - Initial, Valid, Error, Loading, Success, API Error, Responsive
✅ **Exact Color Specifications** - All colors from existing design system
✅ **Detailed Component Specs** - Every UI element with dimensions and styling
✅ **CSS Code Samples** - Ready-to-use styles for implementation
✅ **Animation Details** - Keyframes for smooth transitions
✅ **Accessibility Markup** - ARIA labels and keyboard navigation
✅ **Responsive Design** - Mobile-friendly adaptations
✅ **Screen Reader Flow** - Complete a11y experience

**Design Consistency:**
- Matches existing Figma plugin UI exactly
- Uses same color palette, typography, and spacing
- Follows Figma design patterns
- Dark theme optimized

**Next Steps for Implementation:**
1. Create HTML structure in `ui.html`
2. Add CSS styles (can reuse existing patterns)
3. Implement JavaScript for validation and state management
4. Add Figma API integration in `code.js`
5. Test accessibility and keyboard navigation

# Spacing & Layout Guide

## Overview

This guide documents the enhanced spacing system implemented for the SNK RealEstate application. The system follows an 8pt grid for consistency and scalability across all components.

## 8pt Grid System

All spacing values are multiples of 8px (0.5rem):

| Value | Pixels | Rem | Example Use |
|-------|--------|-----|-------------|
| 0.5   | 4px    | 0.25px | Icon spacing, borders |
| 1     | 8px    | 0.5rem  | Base unit, tight spaces |
| 1.5   | 12px   | 0.75rem | Form elements, line height |
| 2     | 16px   | 1rem    | Paragraph spacing, padding |
| 2.5   | 20px   | 1.25rem | Input fields, button padding |
| 3     | 24px   | 1.5rem  | Component margins, card padding |
| 3.5   | 28px   | 1.75rem | Larger margins |
| 4     | 32px   | 2rem    | Section spacing, large padding |
| 5     | 40px   | 2.5rem  | Hero sections, feature cards |
| 6     | 48px   | 3rem    | Main content areas |
| 8     | 64px   | 4rem    | Landing sections, grids |
| 10    | 80px   | 5rem    | Large sections |
| 12    | 96px   | 6rem    | Hero areas, main containers |
| 16    | 128px  | 8rem    | Full-width sections |

## Spacing Utilities

### Tailwind Config Extensions

The `tailwind.config.js` has been enhanced with:

- **Extended spacing scale**: Follows 8pt grid up to 192rem
- **Custom spacing utilities**: `section`, `card`, `form`, `btn` spacing
- **Responsive breakpoints**: Enhanced from 640px to 2560px
- **Container utilities**: Enhanced max-width and padding options

### CSS Custom Properties

Added to `styles.css`:

```css
/* Spacing Scale (8pt grid) */
--spacing-1: 0.5rem;    /* 8px */
--spacing-2: 1rem;      /* 16px */
--spacing-3: 1.5rem;    /* 24px */
--spacing-4: 2rem;     /* 32px */
--spacing-5: 2.5rem;   /* 40px */
--spacing-6: 3rem;     /* 48px */
--spacing-8: 4rem;     /* 64px */
--spacing-10: 5rem;    /* 80px */
--spacing-12: 6rem;    /* 96px */
--spacing-16: 8rem;    /* 128px */
```

## Component Updates

### Card Component
- Updated gap from `gap-6` to `gap-8`
- Updated header gap from `gap-1.5` to `gap-3`
- Added consistent padding to content area
- Enhanced footer padding for better alignment

### Button Component
- Updated default height from `h-9` to `h-10`
- Updated large height from `h-10` to `h-12`
- Updated icon size from `size-9` to `size-10`
- Improved gap consistency with `gap-2`

### Input Component
- Updated height from `h-9` to `h-10`
- Updated padding from `py-1` to `py-2.5`
- Enhanced touch target for better accessibility

### Tabs Component
- Updated gap from `gap-2` to `gap-3`
- Updated list height from `h-9` to `h-10`
- Added consistent `gap-2` to triggers

## Layout Components

### Container Components
- `Container`: Responsive container with size presets (sm, md, lg, xl)
- `ContainerInner`: Base container with responsive padding
- `Section`: Section wrapper with consistent padding
- `SectionContent`: Content wrapper with max-width limits

### Grid Components
- `Grid`: Flexible grid system with responsive columns
- `GridItem`: Grid items with span controls
- Responsive grid presets for common layouts

### Flex Components
- `Flex`: Flexible layout with direction, alignment, and gap controls
- `FlexItem`: Individual flex items with growth/shrink controls

## Usage Patterns

### Basic Spacing
```jsx
// Vertical spacing between elements
<div className="space-y-4">
  <div>Element 1</div>
  <div>Element 2</div>
</div>

// Horizontal spacing
<div className="space-x-4">
  <div>Element 1</div>
  <div>Element 2</div>
</div>
```

### Responsive Containers
```jsx
// Small container for dense content
<Container size="sm">
  <h1>Title</h1>
  <p>Content...</p>
</Container>

// Large container for main content
<Container size="xl">
  <h1>Hero Title</h1>
  <p>Hero content...</p>
</Container>
```

### Responsive Grids
```jsx
// Responsive grid (1 column on mobile, 2 on tablet, 3 on desktop)
<ResponsiveGrid cols={{ sm: 1, md: 2, lg: 3 }} gap={6}>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</ResponsiveGrid>

// Fixed grid
<Grid cols={3} gap={8}>
  <GridItem colSpan={1}>...</GridItem>
  <GridItem colSpan={2}>...</GridItem>
</Grid>
```

### Section Layout
```jsx
// Section with consistent padding
<Section padding="lg">
  <SectionContent size="lg">
    <h1>Section Title</h1>
    <p>Section content...</p>
  </SectionContent>
</Section>
```

## Responsive Design

### Breakpoints
- **Sm (640px)**: Mobile devices
- **Md (768px)**: Tablets
- **Lg (1024px)**: Small laptops
- **Xl (1280px)**: Desktops
- **2xl (1536px)**: Large desktops
- **3xl (1920px)**: Extra large displays
- **4xl (2560px)**: Ultra-wide displays

### Responsive Utilities
- `text-responsive-xs` to `text-responsive-2xl`: Responsive font sizes
- `safe-area-*`: Safe area padding for mobile devices
- `container-responsive`: Responsive container padding

## Best Practices

### 1. Follow the 8pt Grid
Always use spacing values from the defined scale. Avoid arbitrary spacing values.

### 2. Use Component Wrappers
 Prefer `Container`, `Section`, and `Grid` components over raw Tailwind classes for consistency.

### 3. Responsive First
 Design for mobile first, then enhance for larger screens with responsive utilities.

### 4. Consistent Gap Spacing
 Use consistent gap values within components. For example:
- Cards: `gap-8`
- Form elements: `gap-4`
- Button groups: `gap-2`

### 5. Touch Target Size
 Ensure interactive elements have minimum height of 40px (`h-10`) for better touch targets.

### 6. Maximum Content Width
 Limit line length to around 65 characters for readability using `max-w-65ch`.

## Implementation Checklist

- [ ] Use updated component spacing (cards, buttons, inputs, tabs)
- [ ] Implement responsive container patterns
- [ ] Follow 8pt grid for all spacing decisions
- [ ] Use new layout components for new pages
- [ ] Update existing pages with consistent spacing
- [ ] Test on all device sizes

## Migration Guide

### Updating Existing Components

1. **Buttons**: Change `h-9` to `h-10`, adjust padding if needed
2. **Inputs**: Change `h-9` to `h-10`, `py-1` to `py-2.5`
3. **Cards**: Change gap values to follow new scale
4. **Forms**: Update form field spacing to `gap-4`
5. **Layouts**: Replace container classes with new `Container` component

### Common Patterns to Update

```jsx
// Before
<div className="container mx-auto px-4 py-8">
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    // Cards
  </div>
</div>

// After
<Container size="lg" className="section-padding">
  <ResponsiveGrid cols={{ sm: 1, md: 2, lg: 3 }} gap={8}>
    // Cards
  </ResponsiveGrid>
</Container>
```
# Deep Ocean Glassmorphism Design System

A comprehensive design system for NeoCloud Platform featuring deep, immersive dark interfaces with frosted glass layers, ambient gradients, and emerald-cyan accents.

## Core Philosophy

The Deep Ocean Glassmorphism design system creates a sense of depth and immersion through:

- Multi-layered animated backgrounds ("The Ocean")
- Frosted glass UI surfaces that float above the background
- High contrast white text for readability
- Emerald-cyan accent gradients for brand identity

## Installation & Usage

### 1. Design System Utilities

Import design system utilities from `@/lib/designSystem`:

```typescript
import {
  createGlassCard,
  createButton,
  createText,
  glassStyles,
  buttonStyles,
  textStyles,
  badgeStyles,
} from "@/lib/designSystem";
```

### 2. Reusable Components

Import pre-built components from `@/components`:

```typescript
import { GlassCard, Button, Text, Badge, Input, Select, Modal } from "@/components";
```

## The Ocean Background

The background is a fixed, multi-layered system that creates depth:

```tsx
<div className="ocean-background">
  <div className="ambient-blob blob-1" />
  <div className="ambient-blob blob-2" />
  <div className="ambient-blob blob-3" />
</div>
```

This is already implemented in the root layout. You don't need to add it to individual pages.

## Glass Surfaces

### Using Utility Functions

```tsx
<div className={createGlassCard("standard", "p-6")}>Content</div>
```

### Using Components

```tsx
<GlassCard variant="accent" withReflection withHover>
  Content
</GlassCard>
```

### Glass Variants

- `standard`: Default glass with backdrop-blur-md
- `highBlur`: Extra strong blur (backdrop-blur-[40px]) for navigation
- `accent`: Emerald-cyan gradient glass for call-to-actions
- `card`: Rounded-2xl variant for nested content
- `modal`: High-blur glass for modal overlays
- `input`: Glass-style inputs with white/10 background

## Typography

### Text Variants

```tsx
<Text variant="eyebrow">SECTION LABEL</Text>
<Text variant="heading" as="h1">Main Heading</Text>
<Text variant="body">Regular body text</Text>
<Text variant="bodySecondary">Secondary text (80% opacity)</Text>
<Text variant="bodyMuted">Muted text (60% opacity)</Text>
```

### Eyebrow Labels

The signature style for section headers:

```tsx
<h3 className={createText("eyebrow")}>INFRASTRUCTURE</h3>
```

Characteristics:

- Small text (text-sm)
- Uppercase
- Wide letter spacing (tracking-[0.2em])
- 60% white opacity
- Medium font weight

## Buttons

### Using Components

```tsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="accent">Buy Now / Upgrade</Button>
```

### Button Variants

- **Primary**: White background, black text, high contrast
- **Secondary**: White/10 background with white/20 border, glassmorphic
- **Accent**: Emerald-cyan gradient, for premium actions

All buttons include:

- Rounded-2xl corners
- Smooth transitions
- Active scale animation (active:scale-95)
- Hover effects

## Badges

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="info">Info</Badge>
```

Badges use glassmorphic styling with appropriate accent colors.

## Form Controls

### Input Fields

```tsx
<Input
  label="Email Address"
  placeholder="you@example.com"
  helperText="We'll never share your email"
  error={errors.email}
/>
```

### Select Dropdowns

```tsx
<Select label="Provider" helperText="Choose your cloud provider">
  <option value="bedrock" className="bg-slate-800">
    AWS Bedrock
  </option>
  <option value="crusoe" className="bg-slate-800">
    Crusoe Cloud
  </option>
</Select>
```

Note: Always add `className="bg-slate-800"` to options for proper dark mode rendering.

## Modals

```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <Text variant="heading" as="h3" className="text-2xl mb-6">
    Modal Title
  </Text>
  {/* Modal content */}
</Modal>
```

Features:

- Click outside to close
- ESC key to close
- Backdrop blur
- Body scroll lock when open

## Navigation

### Top Navigation Bar

```tsx
<nav className={navStyles.glass}>{/* Nav content */}</nav>
```

### Floating Sidebar

```tsx
<aside className={navStyles.floating}>{/* Sidebar content */}</aside>
```

## Color Palette

### Primary Actions

- White (#FFFFFF) - High contrast buttons
- Black (#000000) - Button text

### Brand Accents

- Emerald: `#10b981` (emerald-500)
- Cyan: `#06b6d4` (cyan-500)
- Teal: `#14b8a6` (teal-500)

Used in gradients at 20-40% opacity or as text colors.

### Text Colors

- Primary: `text-white` (100%)
- Secondary: `text-white/80` (80%)
- Muted: `text-white/60` (60%)
- Very Muted: `text-white/40` (40%)

### Backgrounds

- Base gradient: `#1a2332` → `#2d3748` → `#1e2938`
- Standard glass: `bg-white/5`
- Input glass: `bg-white/10`
- Borders: `border-white/10` to `border-white/20`

## Special Effects

### Glass Reflection

Add a hover reflection effect:

```tsx
<GlassCard withReflection>Content</GlassCard>
```

Or manually:

```tsx
<div className="glass-reflection">Content</div>
```

### Scale on Hover

```tsx
<GlassCard withHover>Content</GlassCard>
```

Or manually:

```tsx
<div className="transition-all hover:scale-[1.02]">Content</div>
```

## Best Practices

1. **Never use pure gray**: Always use white with opacity (e.g., `text-white/60` instead of `text-gray-400`)

2. **Consistent borders**: Use `border-white/10` for subtle borders, `border-white/20` for more prominent ones

3. **Rounded corners**:

   - `rounded-3xl` for main containers
   - `rounded-2xl` for nested cards and buttons
   - `rounded-xl` for small elements

4. **Backdrop blur levels**:

   - `backdrop-blur-md` for standard cards
   - `backdrop-blur-[40px]` for navigation and modals
   - `backdrop-blur-sm` for inputs

5. **Gradients**: Use emerald-cyan gradients sparingly for emphasis

   - Start with emerald-500/30
   - Via emerald-400/20
   - To cyan-500/20

6. **Eyebrow labels**: Use for all section headers to maintain consistency

7. **Animations**: All interactive elements should have smooth transitions

## Accessibility

- High contrast text (white on dark) for readability
- Focus states included on all interactive elements
- Semantic HTML structure
- Keyboard navigation support (ESC to close modals)

## File Structure

```
src/
├── lib/
│   └── designSystem.ts       # Core utilities and style definitions
├── components/
│   ├── GlassCard.tsx         # Glass surface component
│   ├── Button.tsx            # Button component
│   ├── Text.tsx              # Typography component
│   ├── Badge.tsx             # Badge component
│   ├── Input.tsx             # Input field component
│   ├── Select.tsx            # Select dropdown component
│   ├── Modal.tsx             # Modal component
│   └── index.ts              # Component exports
└── app/
    └── globals.css           # Background animations and global styles
```

## Examples

See `src/app/page.tsx` (landing page) and `src/app/dashboard/page.tsx` for complete implementation examples.

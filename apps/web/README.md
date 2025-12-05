# NeoCloud Platform - Web Application

A Next.js web application featuring the **Deep Ocean Glassmorphism** design system - an immersive dark interface with frosted glass layers, ambient gradients, and emerald-cyan accents.

## Getting Started

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm run start
```

## Design System

This application implements the **Deep Ocean Glassmorphism** design system. For comprehensive documentation, see:

- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Complete design system documentation
- **[/design-system-demo](http://localhost:3000/design-system-demo)** - Live component showcase

### Quick Start

Import components and utilities:

```tsx
// Reusable components
import { GlassCard, Button, Text, Badge, Input, Select, Modal } from "@/components";

// Design system utilities
import { createGlassCard, createButton, createText } from "@/lib/designSystem";
```

### Key Features

- 🌊 **Animated Ocean Background** - Multi-layered gradients with floating ambient blobs
- 🪟 **Glassmorphism UI** - Frosted glass surfaces with backdrop blur
- 🎨 **Emerald-Cyan Accents** - Brand colors in gradients and highlights
- ♿ **Accessible** - High contrast text, keyboard navigation, ARIA support
- 📱 **Responsive** - Mobile-first design that scales beautifully
- 🎭 **Consistent** - Reusable components and utility functions

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── dashboard/
│   │   └── page.tsx               # Dashboard
│   ├── design-system-demo/
│   │   └── page.tsx               # Design system showcase
│   ├── layout.tsx                 # Root layout with ocean background
│   └── globals.css                # Global styles and animations
├── components/
│   ├── GlassCard.tsx              # Glass surface component
│   ├── Button.tsx                 # Button variants
│   ├── Text.tsx                   # Typography component
│   ├── Badge.tsx                  # Status badges
│   ├── Input.tsx                  # Form input
│   ├── Select.tsx                 # Form select
│   ├── Modal.tsx                  # Modal dialog
│   └── index.ts                   # Component exports
└── lib/
    ├── designSystem.ts            # Design system utilities
    ├── api.ts                     # API client
    └── utils.ts                   # Utility functions
```

## Design System Components

### GlassCard

Frosted glass containers with multiple variants:

```tsx
<GlassCard variant="standard" withReflection withHover>
  <Text variant="heading">Card Title</Text>
  <Text variant="bodyMuted">Card content</Text>
</GlassCard>
```

**Variants:** `standard`, `highBlur`, `accent`, `card`, `modal`

### Button

Consistent button styling with three variants:

```tsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="accent">Upgrade Now</Button>
```

### Text

Typography with semantic variants:

```tsx
<Text variant="eyebrow">SECTION LABEL</Text>
<Text variant="heading" as="h1">Page Title</Text>
<Text variant="body">Regular text</Text>
<Text variant="bodyMuted">Muted text</Text>
```

### Form Controls

```tsx
<Input
  label="Email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
/>

<Select label="Provider">
  <option value="aws" className="bg-slate-800">AWS</option>
  <option value="gcp" className="bg-slate-800">GCP</option>
</Select>
```

### Modal

```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <Text variant="heading">Modal Title</Text>
  {/* Modal content */}
</Modal>
```

### Badge

Status indicators with semantic colors:

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="info">New</Badge>
```

## Design Principles

### 1. The Ocean Background

A fixed multi-layered background creates depth:

- Base gradient: Deep slate tones (#1a2332 → #2d3748 → #1e2938)
- Three animated ambient blobs (blue, cyan, teal)
- Subtle noise texture overlay

### 2. Glass Surfaces

All UI elements float as frosted glass:

- `bg-white/5` base with `backdrop-blur`
- `border-white/10` subtle borders
- `rounded-3xl` for main containers, `rounded-2xl` for cards

### 3. Typography

High contrast for readability:

- White text at varying opacities (100%, 80%, 60%)
- Eyebrow labels: uppercase, wide tracking, 60% opacity
- Clean sans-serif font (Geist)

### 4. Color Palette

- **Primary Actions:** White backgrounds for maximum contrast
- **Brand Accents:** Emerald-cyan gradients at 20-40% opacity
- **Text:** White with opacity (never pure gray)
- **Borders:** White at 10-20% opacity

## Authentication

This app uses [Clerk](https://clerk.com) for authentication:

```tsx
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

<SignedOut>
  <SignInButton mode="modal">
    <Button>Sign In</Button>
  </SignInButton>
</SignedOut>

<SignedIn>
  <UserButton afterSignOutUrl="/" />
</SignedIn>
```

## API Integration

API client with Clerk authentication:

```tsx
import { useApi } from "@/lib/api";

const api = useApi();

const data = await api.get("/models");
const result = await api.post("/models", { name: "My Model" });
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Authentication:** Clerk
- **Charts:** Recharts
- **Icons:** Lucide React
- **Font:** Geist (Sans & Mono)

## Best Practices

1. **Never inline styles** - Use the design system utilities
2. **Use components** - Import from `@/components` for consistency
3. **Follow the color palette** - Use white with opacity, not gray
4. **Semantic HTML** - Use proper heading hierarchy
5. **Responsive design** - Mobile-first approach
6. **Accessibility** - High contrast, keyboard navigation, ARIA labels

## Development Guidelines

### Adding New Pages

1. Use the ocean background (already in root layout)
2. Import design system components
3. Use eyebrow labels for sections
4. Maintain glass styling consistency

Example:

```tsx
import { GlassCard, Button, Text } from "@/components";

export default function NewPage() {
  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto p-6">
        <Text variant="eyebrow" className="mb-4">
          SECTION
        </Text>
        <Text variant="heading" as="h1" className="text-4xl mb-8">
          Page Title
        </Text>
        <GlassCard variant="card" className="p-6">
          {/* Content */}
        </GlassCard>
      </div>
    </div>
  );
}
```

### Extending the Design System

To add new variants or components:

1. Update `src/lib/designSystem.ts` with new utilities
2. Create new component in `src/components/`
3. Export from `src/components/index.ts`
4. Document in `DESIGN_SYSTEM.md`
5. Add example to `/design-system-demo`

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Lucide Icons](https://lucide.dev)

## License

Proprietary - NeoCloud Platform

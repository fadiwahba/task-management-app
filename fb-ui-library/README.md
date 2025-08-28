# UI Component Library - Updated

A professional, enterprise-grade React component library built with Vite, TypeScript, and ShadCN/UI integration. Features prebuilt CSS, Storybook documentation, strict TypeScript types, and full Tailwind CSS v4 support.

## Features

- **ShadCN/UI Integration**: Professional components with Radix UI accessibility foundation
- **Prebuilt CSS**: Library ships precompiled Tailwind CSS, eliminating the need for `@source` scanning in consuming apps
- **Modern Tech Stack**: Vite, TypeScript, React 19, Tailwind CSS v4
- **Storybook Documentation**: Interactive component playground
- **Type Safety**: Strict TypeScript support with CVA variants
- **Dual Module Support**: ESM and CJS output
- **Self-Contained Theme**: OKLCH color system and `tailwindcss-animate` plugin included
- **Testing Suite**: Vitest for components, React Testing Library for behavior

## Project Structure

```
fb-ui-library/
├── src/
│   ├── components/ui/      # ShadCN/UI components
│   ├── lib/                # Utilities
│   ├── global.css          # Theme, animations, @source for library prebuild only
│   └── index.ts            # Barrel exports
├── dist/                   # Prebuilt library output
│   ├── index.js            # ESM bundle
│   ├── index.cjs           # CJS bundle
│   ├── index.d.ts          # Type definitions
│   └── style.css           # Compiled CSS
├── storybook-static/       # Built Storybook
├── package.json
└── vite.config.ts
```

## Installation

### Workspace Usage (when part of pnpm workspace)
```bash
# From workspace root (using workspace scripts - recommended)
pnpm install:all
pnpm build:ui

# Or using individual filter commands
pnpm install
pnpm --filter fb-ui-library build
```

### Standalone Usage (when extracted to separate repo)
```bash
# From package directory
pnpm install
pnpm build
```

## Development

### Workspace Usage (from workspace root)
```bash
# Using workspace scripts (recommended)
pnpm storybook        # Start Storybook server
pnpm build:ui         # Build library
pnpm dev:watch        # Watch mode
pnpm test:ui          # Run tests
pnpm lint:ui          # Lint code

# Or using individual filter commands
pnpm --filter fb-ui-library dev
pnpm --filter fb-ui-library build
pnpm --filter fb-ui-library build:watch
pnpm --filter fb-ui-library test
pnpm --filter fb-ui-library test:watch
```

### Standalone Usage (from package directory)
```bash
# Start Storybook server
pnpm dev

# Build library
pnpm build

# Watch mode
pnpm build:watch

# Run tests
pnpm test
pnpm test:watch
```

## Using in Applications

```typescript
import { Button, Card, Badge } from 'fb-ui-library';
import 'fb-ui-library/css';

function App() {
  return (
    <Card>
      <CardContent>
        <Button variant="default">Click me</Button>
        <Badge variant="secondary">Status</Badge>
      </CardContent>
    </Card>
  );
}
```

## Architecture Decisions

- **Prebuilt CSS**: No `@source` scanning in consuming apps, simplifies Tailwind setup
- **Vite Build**: Dual ESM/CJS output, CSS extraction, TypeScript declarations
- **Self-Contained Theme**: OKLCH color variables and tailwindcss-animate
- **ShadCN/UI Integration**: Accessible, enterprise-ready components
- **src/ folder**: Prevents conflicts with ShadCN `lib/`
- **Strict TypeScript**: Type-safe props and CVA variants

## Tailwind Integration

```css
@import 'tailwindcss';
@plugin 'tailwindcss-animate';
@source './src/**/*.{ts,tsx}'; /* Used for library prebuild */
@theme {
  --color-primary: oklch(0.15 0.02 264);
  --color-primary-foreground: oklch(0.98 0 0);
  /* Complete OKLCH theme */
}
```

## Adding New Components

```bash
cd fb-ui-library
pnpm dlx shadcn@latest add <component-name>
# Export in src/index.ts
export * from './components/ui/<component-name>';
# Create Storybook story: <component-name>.stories.tsx
```

## Build & Distribution

### Workspace Usage
```bash
# Using workspace scripts (recommended)
pnpm build:ui
pnpm build:storybook

# Or using individual filter commands
pnpm --filter fb-ui-library build
pnpm --filter fb-ui-library build:storybook
```

### Standalone Usage
```bash
pnpm build
pnpm build:storybook
```

**Outputs:**

- `dist/index.js` - ESM
- `dist/index.cjs` - CJS
- `dist/index.d.ts` - Type definitions
- `dist/style.css` - Compiled CSS

## Testing

- Vitest with jsdom for components
- React Testing Library for behavior  
- Storybook for interactive testing
- Note: Additional accessibility testing tooling needed for full WCAG compliance

## Troubleshooting

- **Component not found**: Rebuild library
- **Styling issues**: Check prebuilt CSS import
- **TypeScript errors**: Clear `dist/` and rebuild
- **Storybook issues**: Clear `storybook-static/` and restart

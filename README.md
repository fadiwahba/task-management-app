# Enterprise Frontend Workspace Guide

This guide documents a modern pnpm workspace setup for enterprise-grade frontend development, featuring a task management application and a professional UI component library.

## Project Structure

```
fb-workspace/
├── package.json                 # Workspace-wide scripts and metadata
├── pnpm-workspace.yaml          # Workspace configuration
├── fb-task-management/          # Next.js 15 app consuming UI library
│   ├── package.json            # App dependencies and workspace reference
│   ├── next.config.ts          # Next.js configuration
│   ├── postcss.config.mjs      # PostCSS with Tailwind v4 plugin
│   ├── app/globals.css         # Global styles with prebuilt library CSS
│   └── components/           # App components (TaskCard, TaskForm, etc.)
└── fb-ui-library/              # Vite-based React component library
    ├── package.json            # Library exports and build config
    ├── vite.config.ts          # Library build with TypeScript declarations
    ├── src/                    # Source directory
    │   ├── components/ui/      # ShadCN/UI components
    │   ├── lib/                # Utilities
    │   ├── global.css          # Theme colors and animations, includes @source './src'
    │   └── index.ts            # Library exports
    └── dist/                   # Compiled assets
```

## Installation and Setup

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Using workspace scripts (recommended)
pnpm install:all
pnpm build:ui

# Or using individual commands
pnpm install
pnpm --filter fb-ui-library build
```

## Development Workflow

### Option 1: Hot Reload (using workspace scripts)

**Terminal 1:**

```bash
pnpm dev:watch
```

**Terminal 2:**

```bash
pnpm dev:app
```

### Option 2: Quick Setup (using workspace scripts)

```bash
pnpm dev:setup  # Builds UI library then starts Next.js app
```

### Option 3: Manual Commands

```bash
pnpm --filter fb-ui-library build
pnpm --filter fb-task-management dev
```

### Workspace Scripts (Recommended)

```bash
# Development
pnpm storybook        # Start Storybook for component development
pnpm dev:ui           # Start UI library development server
pnpm dev:app          # Start Next.js development server
pnpm dev:setup        # Build UI library + start Next.js app
pnpm dev:watch        # Watch mode for UI library

# Building
pnpm build:all        # Build all packages
pnpm build:ui         # Build UI library only
pnpm build:app        # Build Next.js app only

# Testing
pnpm test:all         # Run all tests
pnpm test:ui          # UI library tests (Vitest)
pnpm test:app         # App tests (Jest)
pnpm test:e2e         # E2E tests (Playwright)

# Quality Checks
pnpm lint:all         # Lint all packages
pnpm lint:ui          # Lint UI library
pnpm lint:app         # Lint Next.js app
```

## Architectural Highlights

### Package Management

- pnpm workspace for local dependencies
- Exact React version alignment across packages

### CSS Architecture

- Tailwind v4 with `@source './src'` for prebuilding library CSS
- UI library provides complete OKLCH theme system
- Consuming app imports prebuilt CSS only

### Component Library

- Vite library mode with ESM & CJS output
- TypeScript declaration files
- CSS extraction and barrel exports

### Application Framework

- Next.js 15 with Turbopack
- App Router structure
- Prebuilt library reduces transpilation needs

### Type Safety

- Strict TypeScript across packages
- Type-safe component variants
- Path aliases for clean imports

### Design System & Theme

- Full ShadCN/UI integration
- Self-contained OKLCH theme
- Animation support via tailwindcss-animate

### State & Form Management

- Zustand for state management
- React Hook Form + Zod for forms

### Data Persistence Strategy

- **Tasks**: sessionStorage for clean demo experience and reliable E2E testing
- **Theme**: localStorage for persistent user preference across sessions

## Technical Configuration

### Workspace Linking

```json
"dependencies": {
  "fb-ui-library": "workspace:*"
}
```

### Tailwind Integration in Consuming App

```css
@import "tailwindcss";
@import "fb-ui-library/css"; /* Prebuilt CSS */
```

## Build & Deployment Order

1. Build UI library: `pnpm --filter fb-ui-library build`
2. Next.js app automatically uses workspace version via `"fb-ui-library": "workspace:*"`
3. Build or run Next.js app

## Common Issues & Solutions

- Ensure workspace dependency matches package name
- Import prebuilt CSS in globals.css
- Build UI library before consuming app

## Testing

- Vitest for component library (jsdom)
- Storybook for component library (live docs)
- Jest + React Testing Library for Next.js app
- Playwright E2E testing for Next.js app

## Production Considerations

- UI library ships prebuilt CSS and JS
- Proper peer dependency management for React
- Deploy UI library to NPM (public/private)
- Deploy Next.js app to preferred platform (Vercel, Netlify, etc.)
- Refer to the [DEPLOYMENT_GUIDE](DEPLOYMENT_GUIDE.md) for more info.

## Component Library Features

- **ShadCN/UI Components**: Badge, Button, Card, Dialog, Dropdown Menu, Form components
- **OKLCH Theme System**: Modern color space with dark/light mode support
- **Component Testing**: Comprehensive Vitest test suite with coverage reporting
- **Storybook Documentation**: Interactive component playground and documentation
- **Accessibility Foundation**: Radix UI primitives with basic ARIA support and focus management

## Learning Resources

- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Tailwind v4](https://tailwindcss.com/docs/v4-beta)
- [Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)
- [Next.js transpilePackages](https://nextjs.org/docs/app/api-reference/next-config-js/transpilePackages)
- [ShadCN/UI](https://ui.shadcn.com/)

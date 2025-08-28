# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a **pnpm monorepo workspace** containing:
- **`fb-ui-library`**: Vite-based React component library with ShadCN/UI components
- **`fb-task-management`**: Next.js 15 task management app consuming the UI library

The workspace uses local dependency linking (`"fb-ui-library": "workspace:*"`) for development.

## Essential Commands

### Development Setup
```bash
pnpm install
pnpm --filter fb-ui-library build
```

### Development Workflow (Hot Reload)
```bash
# Terminal 1: Watch library changes
pnpm --filter fb-ui-library build --watch

# Terminal 2: Run Next.js app
pnpm --filter fb-task-management dev
```

### Build & Quality Checks
```bash
# Build library (required before app build)
pnpm --filter fb-ui-library build

# Build Next.js app  
pnpm --filter fb-task-management build

# Run all tests
pnpm --filter fb-ui-library test
pnpm --filter fb-task-management test

# Lint all packages
pnpm --filter fb-ui-library lint
pnpm --filter fb-task-management lint
```

### Testing Commands
```bash
# UI Library tests (Vitest)
pnpm --filter fb-ui-library test
pnpm --filter fb-ui-library test:watch

# Next.js app tests (Jest)
pnpm --filter fb-task-management test
pnpm --filter fb-task-management test:watch

# E2E tests (Playwright)
pnpm --filter fb-task-management test:e2e
pnpm --filter fb-task-management test:e2e:ui
```

### Component Development
```bash
# Start Storybook for component development
pnpm --filter fb-ui-library dev
```

## CSS Architecture (Critical)

This project uses **Tailwind v4's `@source` directive** for CSS prebuilding:

- **UI Library**: `@source './src'` in `global.css` scans components and prebuilds classes
- **Next.js App**: Imports prebuilt CSS with `@import "fb-ui-library/css"`
- **No `transpilePackages`** needed in Next.js config due to prebuilt assets

**Build Dependency**: UI library must be built before the Next.js app can run.

## Key File Locations

### State Management
- **Task Store**: `fb-task-management/lib/stores/task-store.ts` (Zustand + sessionStorage)

### API Layer
- **Mock API**: `fb-task-management/app/api/tasks/route.ts`
- **API Client**: `fb-task-management/lib/api/client.ts`
- **Types**: `fb-task-management/types/task.ts`

### Component Structure
- **UI Library**: `fb-ui-library/src/components/ui/` (ShadCN/UI components)
- **App Components**: `fb-task-management/components/` (TaskCard, TaskForm, etc.)

### Configuration
- **Library Build**: `fb-ui-library/vite.config.ts` (dual ESM/CJS output)
- **App Config**: `fb-task-management/next.config.ts` (minimal, no transpilation)
- **Theme**: Both packages use OKLCH color system with dark mode support

## Development Patterns

### Adding UI Components
1. Add ShadCN components to `fb-ui-library/src/components/ui/`
2. Export in `fb-ui-library/src/index.ts`
3. Rebuild library: `pnpm --filter fb-ui-library build`
4. Import in Next.js app from `fb-ui-library`

### Adding Features
1. Define types in `fb-task-management/types/`
2. Update Zustand store if needed
3. Add API endpoints in `fb-task-management/app/api/`
4. Create components in `fb-task-management/components/`
5. Write tests for both unit and E2E scenarios

### Testing Strategy
- **UI Library**: Vitest for component unit tests
- **Next.js App**: Jest for components/utils, Playwright for E2E
- **Coverage**: Enabled for both packages with detailed reports

## Build Order Dependency

Always build the UI library before the Next.js app:
```bash
pnpm --filter fb-ui-library build  # Required first
pnpm --filter fb-task-management build  # Can run after
```

The Next.js app imports prebuilt CSS and JS from the library's `dist/` folder.
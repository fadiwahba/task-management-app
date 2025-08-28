# Task Management Application

A modern, responsive task management application built with **Next.js 15**, **React 19**, and **Tailwind CSS v4**. It integrates deeply with the `fb-ui-library` for a consistent design system and demonstrates enterprise-grade architecture patterns.

## Features

* **Task Management**: Create, update, delete tasks
* **Filtering & Sorting**: By status, priority, due date, creation date
* **Search**: Real-time across tasks
* **Responsive UI**: Mobile-first, adaptive layout
* **Validation**: Zod-powered type-safe validation
* **Accessibility Foundation**: Radix UI components with basic focus management and ARIA patterns
* **Type Safety**: Full TypeScript coverage

## Tech Stack

### Core

* **Next.js 15** (App Router, Turbopack)
* **React 19**
* **TypeScript**
* **Tailwind CSS v4**

### UI & Forms

* **fb-ui-library** (prebuilt CSS, ShadCN-based)
* **Lucide React**
* **React Hook Form** + **Zod**

### State & Data

* **Zustand** for lightweight state management
* **Mock API** for local development
* **Date-fns** utilities

### Testing & Quality

* **Unit Tests**: Jest + React Testing Library
* **E2E Tests**: Playwright
* **Linting**: ESLint + TypeScript strict mode

## Project Structure

```
fb-task-management/
├── app/                  # Next.js App Router
│   ├── api/tasks/        # API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # App-specific components
├── lib/                  # Utilities (API client, Zustand stores, helpers)
├── types/                # Shared types
└── tests/                # Unit & E2E tests
```

## Getting Started

### Prerequisites

* Node.js 18+
* pnpm (recommended)

### Installation

#### Workspace Usage (when part of pnpm workspace)
```bash
# From workspace root (using workspace scripts - recommended)
pnpm install:all

# Or using individual commands
pnpm install
```

#### Standalone Usage (when extracted to separate repo)
```bash
# From package directory
# Note: Update package.json to use published fb-ui-library version
# "fb-ui-library": "^1.0.0" instead of "workspace:*"
pnpm install
```

### Development

#### Workspace Usage (from workspace root)
```bash
# Using workspace scripts (recommended)
pnpm dev:setup        # Builds UI library + starts Next.js dev server
# Or separate commands:
pnpm build:ui         # Build UI library first
pnpm dev:app          # Start Next.js dev server

# Or using individual filter commands
pnpm --filter fb-ui-library build
pnpm --filter fb-task-management dev
```

#### Standalone Usage (from package directory)
```bash
# UI library comes from NPM - no build needed
# Start Next.js dev server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Scripts

### Workspace Usage (from workspace root)
```bash
# Using workspace scripts (recommended)
pnpm dev:app          # Development
pnpm build:app        # Build app
pnpm lint:app         # Lint
pnpm test:app         # Unit tests
pnpm test:e2e         # E2E tests

# Or using individual filter commands
pnpm --filter fb-task-management dev
pnpm --filter fb-task-management build
pnpm --filter fb-task-management start
pnpm --filter fb-task-management lint
pnpm --filter fb-task-management test
pnpm --filter fb-task-management test:watch
pnpm --filter fb-task-management test:e2e          # Run all tests
pnpm --filter fb-task-management test:e2e:ui       # Interactive UI mode
pnpm --filter fb-task-management test:e2e:chrome   # Run in Chromium
pnpm --filter fb-task-management test:e2e:debug    # Debug mode
pnpm --filter fb-task-management test:e2e:codegen  # Generate tests
```

### Standalone Usage (from package directory)
```bash
# Development
pnpm dev

# Build & Run
pnpm build
pnpm start

# Lint
pnpm lint

# Unit Tests
pnpm test
pnpm test:watch

# E2E Tests (Playwright)
pnpm test:e2e          # Run all tests
pnpm test:e2e:ui       # Interactive UI mode
pnpm test:e2e:chrome   # Run in Chromium
pnpm test:e2e:debug    # Debug mode
pnpm test:e2e:codegen  # Generate tests
```

## Testing Guidelines

* **Unit Tests**: Jest + React Testing Library for components and logic.
* **E2E Tests**: Playwright simulates real user workflows.


## Configuration

### Next.js

```typescript
// No transpilePackages needed - library ships prebuilt CSS/JS
const nextConfig: NextConfig = {};
```

### Tailwind CSS

```css
@import "tailwindcss";
@import "fb-ui-library/css"; /* Prebuilt CSS */
```

## Development Workflow

1. Build `fb-ui-library`
2. Start the Next.js dev server
3. Run Jest unit tests and Playwright E2E tests


## Troubleshooting

* **UI Library not found** → rebuild library
* **TypeScript errors** → clear cache, restart TS server
* **Styling issues** → ensure `fb-ui-library/css` is imported

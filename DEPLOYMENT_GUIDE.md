# UI Library NPM Publishing Guide

## Workspace vs NPM Published Setup

### Development (Workspace)

```json
// fb-task-management/package.json
{
  "dependencies": {
    "fb-ui-library": "workspace:*"  // Local symlink to library
  }
}
```

### Production (After NPM Publishing)

```json
// fb-task-management/package.json
{
  "dependencies": {
    "fb-ui-library": "^1.0.0"      // NPM registry version
  }
}
```

## Preparing the UI Library for Publishing

### 1. Update `package.json`

```json
{
  "name": "fb-ui-library",
  "private": false,
  "version": "1.0.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/ui-library"
  },
  "publishConfig": {
    "registry": "https://registry.npmjs.org"  // Public NPM, or GitHub Package Registry for private
  }
}
```

### 2. Tailwind CSS Setup

* Prebuild all Tailwind CSS classes used in the library by keeping `@source './src'` in the UI library `global.css`.
* Export the compiled CSS as `dist/style.css`.
* Consuming applications import only the prebuilt CSS:

```css
/* fb-task-management/app/globals.css */
@import "fb-ui-library/css";  /* Prebuilt CSS from library */
```

### 3. Next.js Configuration

* `transpilePackages` is optional since the library ships prebuilt JavaScript and CSS:

```ts
// fb-task-management/next.config.ts
const nextConfig: NextConfig = {};
export default nextConfig;
```

## Publishing Workflow

### 1. Version and Build

#### Workspace Usage (recommended)
```bash
# From workspace root
pnpm --filter fb-ui-library version patch|minor|major
pnpm --filter fb-ui-library build
```

#### Standalone Usage
```bash
cd fb-ui-library
npm version patch|minor|major
pnpm build
```

### 2. Publish to NPM

#### From UI Library Directory
```bash
cd fb-ui-library

# Public NPM
npm publish

# Private GitHub Package Registry
npm publish --registry=https://npm.pkg.github.com
```

#### Using pnpm from Workspace Root
```bash
# Public NPM
pnpm --filter fb-ui-library publish

# Private GitHub Package Registry
pnpm --filter fb-ui-library publish --registry=https://npm.pkg.github.com
```

### 3. Update Consuming App

#### For Separate Deployment
```bash
cd fb-task-management
# Update package.json dependency
# From: "fb-ui-library": "workspace:*"
# To: "fb-ui-library": "^1.0.0"
pnpm install
# Ensure globals.css imports the prebuilt CSS
```

#### For Workspace Development (keep workspace link)
```bash
# No changes needed - workspace continues using local version
# Production deployments can use published version
```

## Migration Checklist

* [ ] Remove `"private": true` from UI library `package.json`
* [ ] Set proper version in UI library
* [ ] Build and test UI library package
* [ ] Publish to NPM registry
* [ ] Update consuming app `package.json` to use published version
* [ ] Ensure consuming app imports prebuilt CSS (`@import "fb-ui-library/css";`)
* [ ] Test consuming app with published package
* [ ] Update CI/CD to handle NPM publishing  
* [ ] CI workflows now run from package directories for standalone compatibility

## Development vs Production Workflow

| Environment | Description | CI/CD Approach |
| ----------- | ----------- | --------------- |
| Development | Fast iteration with workspace symlinks; direct source access; no publishing required | CI runs from package directories with `working-directory` |
| Production  | Versioned releases; prebuilt packages; proper dependency management; usable outside workspace | Same CI workflows work for both workspace and standalone repos |

## CI/CD Compatibility

The GitHub Actions workflows are now designed to support both workspace and standalone deployment:

- **UI Library CI**: Runs from `./fb-ui-library` directory using `pnpm lint/test/build`
- **Task Management CI**: Runs from `./fb-task-management` directory, builds UI library dependency first
- **Artifact Naming**: Uses full package names (`fb-ui-library-dist`, `fb-task-management-build`)

This approach allows teams to extract packages to separate repositories while keeping the same CI configuration.

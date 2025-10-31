# Copilot Instructions for Linkclump

## Project Overview

Linkclump is a Chrome browser extension (Manifest V3) that allows users to open, copy, or bookmark multiple links at the same time by drawing a selection box over them. This is a fork of the original Linkclump extension, updated to work with Chrome's Manifest V3 requirements.

## Architecture

This extension consists of:
- **Background Service Worker** (`src/background.ts`): Handles extension lifecycle and manages messages between components
- **Content Script** (`src/linkclump.ts`): Injected into web pages to enable link selection functionality
- **Options Page** (`src/pages/options.ts`): User settings interface for configuring extension behavior
- **Type Definitions** (`src/types/`): TypeScript types for Settings and Messages

## Technology Stack

- **TypeScript**: Primary language for extension logic
- **Webpack**: Build tool for bundling TypeScript/JavaScript files
- **Babel**: Transpiler for TypeScript to JavaScript
- **jQuery**: Used for DOM manipulation and UI components (legacy dependency)
- **ESLint**: Linting tool for code quality

## Build & Development Commands

```bash
# Install dependencies
npm install

# Build the extension (creates production build in /build directory)
npm run build

# Run linting (checks code style)
npm run lint
```

## Project Structure

```
src/
├── background.ts          # Background service worker
├── linkclump.ts          # Main content script
├── manifest.json         # Chrome extension manifest (V3)
├── global.d.ts           # Global TypeScript definitions
├── types/
│   ├── Settings.ts       # Settings type definitions
│   └── Messages.ts       # Message type definitions
├── pages/
│   ├── options.ts        # Options page script
│   ├── options.html      # Options page template
│   └── *.css            # Styling files
├── images/               # Extension icons and assets
└── libs/                 # Third-party libraries (jQuery, colorpicker)

build/                    # Output directory (not in source control)
src-test/                # Test files
```

## Coding Standards

### TypeScript
- Use strict TypeScript mode (enabled in `tsconfig.json`)
- Target ES6 for compatibility
- Always define proper types; avoid `any` when possible
- Use ES6 modules (`import`/`export`)

### Code Style
- Follow ESLint configuration in `.eslintrc.json`
- Use camelCase for variable and function names
- Keep functions small and focused
- Add comments for complex logic only when necessary

### Chrome Extension Specifics
- Use Chrome Extension APIs via the `chrome` global object
- Follow Manifest V3 best practices
- Service worker should be stateless; use `chrome.storage` for persistence
- Content scripts should minimize DOM manipulation impact
- Use message passing for communication between components

## Dependencies

### Development Dependencies
- TypeScript compiler and type definitions
- Webpack and related plugins (CopyWebpackPlugin, HtmlWebpackPlugin)
- Babel for TypeScript transpilation
- ESLint for code quality

### Runtime Dependencies
- jQuery (included as library, not via npm)
- Chrome Extension APIs (available in browser)

## Testing

- Basic tests are located in `src-test/` directory
- Tests are not integrated into npm scripts currently
- When adding new features, ensure they work in Chrome browser by loading the extension from the `build/` directory

## Build Output

The `npm run build` command:
1. Compiles TypeScript to JavaScript using Babel
2. Bundles modules with Webpack
3. Copies static assets (manifest.json, images, CSS)
4. Generates HTML files for options page
5. Creates production-optimized output in `build/` directory
6. Generates source maps for debugging

## Common Tasks

### Adding New Features
1. Create TypeScript files in `src/` directory
2. Import and use in appropriate entry point (background, content script, or options)
3. Update types in `src/types/` if needed
4. Add new entry points to `webpack.config.js` if creating new pages
5. Build and test in Chrome

### Modifying Settings
1. Update `src/types/Settings.ts` with new setting types
2. Update `src/pages/options.ts` to add UI for new settings
3. Update relevant components that use the settings

### Adding Chrome Permissions
1. Update `src/manifest.json` with required permissions
2. Use the permission in your code with appropriate Chrome APIs
3. Rebuild the extension

## Important Notes

- **Never modify minified library files** in `src/libs/` (they have existing lint errors that should be ignored)
- **The build directory** is generated and should not be committed to source control
- **Source maps** are enabled for production builds to aid debugging
- **Manifest V3** requirements must be followed (no remote code execution, service workers instead of background pages)
- This extension needs to work with `<all_urls>` as it operates on any webpage

## Links & Resources

- [Chrome Extension Manifest V3 Documentation](https://developer.chrome.com/docs/extensions/mv3/)
- [Chrome Extension API Reference](https://developer.chrome.com/docs/extensions/reference/)
- [Webpack Documentation](https://webpack.js.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

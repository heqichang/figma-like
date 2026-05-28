# @mylib/components

A modern React component library built with TypeScript, featuring design tokens, Storybook documentation, and a complete build pipeline.

## Features

### 🎨 Design Tokens
- **Token types**: Colors, fonts, spacing, border radius, shadows, animations, breakpoints
- **Three-level hierarchy**: Global → Alias → Component tokens
- **Export formats**: CSS Variables, SCSS Variables, JSON, Tailwind Config

### 🧩 Component Development
- **CLI scaffolding**: Generate component templates with `npm run component:create`
- **File structure**: Component, styles, tests, docs, stories
- **Hot Module Replacement**: Real-time preview during development

### 📚 Documentation
- **Interactive Playground**: Modify props and see changes in real-time
- **Auto-generated docs**: Props, Events, Slots extracted from TypeScript types
- **Markdown support**: Write rich documentation with MDX

### 🎭 Storybook Integration
- **Canvas & Docs views**: Toggle between visual and documentation modes
- **Interactive controls**: Live prop editing
- **Addon ecosystem**: Actions, accessibility, interactions, and more

### 📦 Package Management
- **Changesets**: Manage version bumps and changelogs
- **Semantic Versioning**: Follow semver conventions
- **Tree-shakable**: Optimized bundle size
- **Dual export**: ESM + CommonJS

## Getting Started

### Installation

```bash
npm install @mylib/components
```

### Usage

```tsx
import { Button, Input, Card } from '@mylib/components'
import '@mylib/components/styles'

function App() {
  return (
    <Card header="Welcome">
      <Input label="Email" placeholder="your@email.com" />
      <Button>Submit</Button>
    </Card>
  )
}
```

## Development

```bash
# Install dependencies
npm install

# Start Storybook (development)
npm run storybook

# Run tests
npm run test

# Build the library
npm run build

# Export design tokens
npm run tokens:export

# Create a new component
npm run component:create MyComponent
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run storybook` | Start Storybook |
| `npm run build-storybook` | Build Storybook docs |
| `npm run test` | Run unit tests |
| `npm run test:ui` | Run tests with UI |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript check |
| `npm run tokens:export` | Export design tokens |
| `npm run component:create` | Create new component |
| `npm run changeset` | Create a changeset |
| `npm run version` | Apply changesets |
| `npm run release` | Build and publish |

## Project Structure

```
.
├── src/
│   ├── components/      # React components
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Card/
│   ├── styles/          # Global styles
│   ├── utils/           # Utility functions
│   ├── test/            # Test setup
│   └── index.ts         # Library entry
├── tokens/              # Design tokens
│   ├── types.ts         # Token type definitions
│   ├── global.ts        # Global tokens
│   ├── alias.ts         # Alias tokens
│   ├── component.ts     # Component-specific tokens
│   ├── utils.ts         # Token utilities
│   └── index.ts
├── scripts/             # Build and utility scripts
│   ├── export-tokens.js # Token export script
│   └── create-component.js # Component generator
├── .storybook/          # Storybook configuration
├── .changeset/          # Changesets configuration
├── dist/                # Build output
└── package.json
```

## Component Structure

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.module.css   # Component styles
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx     # Unit tests
├── types.ts                   # Type definitions
└── index.ts                   # Public API
```

## License

MIT
# @fiction/elements

Reusable Vue 3 UI components with TypeScript and Tailwind CSS.

## Features

- 🚀 Vue 3 + TypeScript
- 🎨 Tailwind CSS theming
- 📦 ESM only, tree-shakeable
- 🔒 Schema-driven with Zod
- 📚 Documented with Astro Starlight
- ✅ Tested with Vitest

## Installation

```bash
npm install @fiction/elements
```

## Usage

```vue
<script setup>
import { FButton } from '@fiction/elements'
import '@fiction/elements/styles'
</script>

<template>
  <FButton>Click me</FButton>
</template>
```

## Development

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Run tests
pnpm test

# Build library
pnpm build

# Start docs
pnpm docs:dev
```

## Requirements

- Node.js >= 22
- Vue 3.4+

## License

MIT
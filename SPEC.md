# @fiction/elements Specification

## Goals

- **Reusable** — Components work across multiple Vue 3 projects without modification
- **Modern** — ESM-only, Node 22+, leveraging latest web standards
- **Type-safe** — Full TypeScript support with exported types
- **Tree-shakeable** — Import only what you need
- **Themeable** — Tailwind v4 with CSS variables for customization
- **Documented** — Interactive examples with Astro Starlight
- **Tested** — Unit tests with Vitest, visual regression optional

## Requirements

### Runtime
- Node.js ≥ 22.0.0
- Vue 3.4+ (peer dependency)
- ESM-only (no CJS support)

### Development
- pnpm 9.x for workspace management
- TypeScript 5.6+ with strict mode
- Vite 5+ for building
- Vitest for testing
- @antfu/eslint-config for linting

## Technical Decisions

### Package Structure
```
@fiction/elements         # Main component library
@fiction/elements/styles  # Optional styles export
@fiction/elements/utils   # Standalone utilities
@fiction/elements/schemas # Zod schemas and types
@fiction/elements/themes  # Theme system and presets
```

### Build Output
- **Format**: ESM only with `.js` extensions
- **Types**: Generated `.d.ts` files via `vue-tsc`
- **Styles**: Separate CSS file, optional import
- **Externals**: Vue as peer dependency

### Component Architecture

#### Schema-Driven Design
- Zod schemas for prop validation and type generation
- Shared enums for sizes, themes, variants
- Runtime validation in development mode

#### Theme System
- Dynamic color generation vs. static theme maps
- CSS variables for runtime theming
- Tailwind safelist for dynamic classes
- Special cases only for non-standard themes (overlay, muted)

#### Naming Conventions
- Components: `F` prefix (FButton, FInput, FModal)
- Props: Schema-derived types from Zod
- Events: Standard Vue patterns (click, update:modelValue)
- Composables: `use*` pattern
- Exports: Named exports for tree-shaking

#### Component Categories

**Inputs**
- `FInput` — Text, number, password variants
- `FTextarea` — Auto-resize option
- `FSelect` — Native and custom variants
- `FCheckbox`, `FRadio`, `FSwitch`
- `FDatePicker`, `FTimePicker`

**Forms**
- `FForm` — Form wrapper with validation
- `FFormField` — Field wrapper with label/error
- `FFormGroup` — Field grouping
- Composables: `useForm()`, `useField()`, `useValidation()`

**Buttons & Actions**
- `FButton` — Primary, secondary, ghost, link
- `FButtonGroup` — Button collections
- `FDropdown` — Action menus
- `FIconButton` — Icon-only buttons

**Overlays**
- `FModal` — Dialog with backdrop
- `FDrawer` — Slide-out panels
- `FPopover` — Contextual overlays
- `FTooltip` — Hover hints
- `FToast` — Notifications

**Layout**
- `FCard` — Content containers
- `FTabs` — Tab navigation
- `FAccordion` — Collapsible sections
- `FSkeleton` — Loading states

**Effects**
- `FTransition` — Vue transition wrapper
- `FIntersect` — Intersection observer
- `FLazyLoad` — Lazy loading wrapper
- Directives: `v-tooltip`, `v-click-outside`

### Styling Strategy

**Tailwind v4 Integration**
```css
/* Base layer with CSS variables */
@layer base {
  :root {
    --f-primary: theme('colors.blue.500');
    --f-radius: theme('borderRadius.md');
  }
}

/* Component uses variables */
.f-button {
  background: var(--f-primary);
  border-radius: var(--f-radius);
}
```

**Customization**
- CSS variables for theming
- Tailwind utilities for composition
- `class` and `style` prop passthrough
- Minimal default styles

### Testing Strategy

**Unit Tests** (Required)
```typescript
// Component.test.ts
describe('FButton', () => {
  it('emits click event', async () => {
    const wrapper = mount(FButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

**Integration Tests** (Optional)
- Playwright for E2E in docs site
- Visual regression with Percy/Chromatic

### Documentation

**Astro Starlight Structure**
```
docs/
├── getting-started/
│   ├── installation.md
│   └── usage.md
├── components/
│   ├── inputs/
│   ├── buttons/
│   └── overlays/
├── composables/
└── examples/
    └── forms.md
```

**Component Docs Include**
- Props table with types
- Event documentation
- Slot descriptions
- Interactive examples
- Accessibility notes
- Keyboard shortcuts

### Build & Deployment

#### Build Pipeline
- **Vite Library Mode**: Parallel builds for different entry points
- **Type Generation**: `vue-tsc --declaration --emitDeclarationOnly`
- **Style Extraction**: PostCSS with Tailwind v4
- **Tree-shaking**: Preserve individual component exports
- **Bundle Analysis**: Size limits with size-limit/action

#### CI/CD (GitHub Actions)
```yaml
on: [push, pull_request]
jobs:
  quality:
    - pnpm install --frozen-lockfile
    - pnpm lint (with @antfu/eslint-config)
    - pnpm typecheck
    - pnpm test:unit (Vitest)
    - pnpm build
    
  release:
    - Changesets for version management
    - npm publish with provenance
    - GitHub release with changelog
    - Deploy docs to Vercel
```

#### Publishing Strategy
- **Scoped Package**: `@fiction/elements`
- **Version Tags**: `latest`, `next`, `canary`
- **npm Provenance**: Signed packages with `--provenance`
- **Package.json exports**: Multiple entry points for optimized imports

#### Performance Targets
- Core bundle < 30kb gzipped
- Individual components < 5kb
- Zero runtime dependencies (except Vue peer)
- CSS < 10kb gzipped with PurgeCSS

## Rationale

### Why ESM-only?
- Simpler build configuration
- Better tree-shaking
- Native browser support
- Node 22+ has stable ESM

### Why Tailwind v4?
- Native CSS with modern features
- Smaller bundle via CSS variables
- Better IDE support
- Works with any framework

### Why Astro Starlight?
- Fast static site generation
- MDX for rich documentation
- Built-in search and i18n
- Vue component preview support

### Why @antfu/eslint-config?
- Opinionated but sensible defaults
- Auto-fix on save
- TypeScript & Vue support
- No semicolons, clean code

### Why Composables > Mixins?
- Better TypeScript inference
- Tree-shakeable
- Explicit dependencies
- Composition API alignment

## Integration Examples

### With Nuxt
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['@fiction/elements/styles'],
  build: {
    transpile: ['@fiction/elements']
  }
})
```

### With Vite
```typescript
// main.ts
import { createApp } from 'vue'
import { FButton, FInput } from '@fiction/elements'
import '@fiction/elements/styles'

app.component('FButton', FButton)
app.component('FInput', FInput)
```

### With Inspira UI
```vue
<template>
  <FModal v-model="open">
    <InspiraCard>
      <FForm @submit="handleSubmit">
        <FInput v-model="email" />
        <FButton type="submit">Submit</FButton>
      </FForm>
    </InspiraCard>
  </FModal>
</template>
```

## Development Workflow

### Local Development
```bash
pnpm install          # Install dependencies
pnpm dev             # Run playground + docs
pnpm test            # Run tests in watch mode
pnpm build           # Build library
pnpm release         # Create changeset
```

### Component Development
1. Create component in `packages/elements/src/components/`
2. Export from `packages/elements/src/index.ts`
3. Add tests with Vitest
4. Document in Astro Starlight
5. Add to playground for testing

### Pre-commit Hooks
- Lint-staged with @antfu/eslint-config
- Type checking changed files
- Unit tests for changed components
- Commit message validation

## Success Metrics

- Bundle size < 30kb gzipped (core)
- Tree-shake to < 5kb per component
- 100% TypeScript coverage
- 90%+ test coverage
- Zero runtime errors
- Lighthouse 100 (docs site)
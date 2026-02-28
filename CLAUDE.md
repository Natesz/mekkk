# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in the MEKKK repository.

---

## Commands

```bash
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build
npm run preview    # Preview production build
npm run generate   # Static site generation
```

No test commands — tests are forbidden in this project (see Constraints).

## Stack

- **Nuxt 4** with file-based routing (`pages/`)
- **Tailwind CSS** — primary styling, minimal custom CSS
- **Pinia** — state management in `stores/`, localStorage only for persistence
- **Zod** — form and input validation
- **TypeScript** — strict mode, `lang="ts"` in all Vue SFCs

## Architecture

### Layers (strict separation)

| Layer | Location | Purpose |
|-------|----------|---------|
| Pages | `pages/` | Thin route files — compose page components, no logic |
| Page components | `components/pages/` | Page-level layout components |
| Feature components | `components/<feature>/` | e.g. `components/orders/`, `components/forms/` |
| Reusable components | `components/` | Generic UI primitives |
| Composables | `composables/` | Business logic + UI state (e.g. `useOrderForm.ts`) |
| Stores | `stores/` | Pinia stores with manual localStorage sync |
| Utils | `utils/` | Pure functions: formatting, mapping, Zod schemas/validators |
| Types | `types/` | Shared TypeScript interfaces and types |

### State & Persistence

Pinia stores (`stores/orders.ts`, `stores/app.ts`) manually sync to `localStorage` using `import.meta.client` guards. There is no SSR-safe persistence library — all localStorage access must be guarded with `import.meta.client` or `onMounted`. Use `<ClientOnly>` where needed.

### Validation Pattern

Zod schemas live in `utils/validators.ts`. The `validateField()` helper returns `{ success, data } | { success, error }`. The `validateOrderForm()` function returns flattened field-level errors. Form state and per-field setters (with inline error clearing) live in `composables/useOrderForm.ts`.

### Key Types

- `types/order.ts` — `Order` (persisted to store: `id`, `customerName`, `productName`, `price`)
- `types/order-form.ts` — `OrderFormData`, `OrderFormErrors` (form-only, not persisted directly)

### Routes

| Route | Page |
|-------|------|
| `/` | Dashboard — order list |
| `/orders/new` | New order multi-step form |
| `/products` | Product catalog |
| `/checkout` | Checkout page |


## UI / UX Guidelines

Mobile-first webapp — optimize for small screens first, swipeable product images

Fullscreen app style, browser-accessible (mekkk.vercel.app)

Branding: green primary color, rounded buttons, rounded input and dropdown edges

Logo: public/pictures/logo4.png, transparent, consistent size

Breadcrumbs: always under the logo, never in the top-right corner

Dropdowns: green borders, rounded edges; include a “v” indicator on the right side

Form validation: show errors inline

## Mandatory rules

Ask before coding if any decision point exists (auth strategy, data models, UI flows, etc.)

Before every task, list 3–7 bullet points of what will change (files, routes, components, stores, composables)

No tests — never generate Vitest/Jest/Playwright/Cypress files or configs; delete any that appear

Tailwind-first — minimal custom CSS only with justification

Environment variables: use NUXT_PUBLIC_* for public vars, access via useRuntimeConfig(); always update .env.example with placeholders

After implementation: verify folder structure, update README.md feature list, verify .env.example

“Create skeleton” means minimal Nuxt setup with one page and one route — no extra dependencies

## Notes

Start with localStorage persistence for rapid dev and mocking

Iteration 2–3: migrate to Supabase backend

Ensure mobile-first interactions: swipeable images, minimal inputs, clear CTAs

Logo and branding: use logo4.png and green color consistently across UI

Follow breadcrumb and layout rules: under logo

Validation rules: inline errors

Tailwind-first styling; avoid global CSS unless strictly necessary


## Backlog Updates

- After completing any iteration or feature implementation, **update the backlog file**: `docs/backlog.homepage.md`.
- The backlog should contain short, bullet-point summaries of the changes made in that iteration.
- For now, the backlog file is **empty**, as no MEKKK features have been implemented yet.
- Always keep this file up-to-date to track project progress and iterations.
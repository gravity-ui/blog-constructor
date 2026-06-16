# Project overview

## Project at a glance

- **Package:** `@gravity-ui/blog-constructor` (npm, MIT, currently 10.x).
- **Purpose:** React library built on top of `@gravity-ui/page-constructor` for assembling blog pages — feed, post, filters, pagination, content transformation, SSR helpers.
- **Consumers:** other Gravity UI–based products. Treat the public API as stable; breaking changes are documented in `MIGRATION.md`.

## Tech stack

- Node **20** (`.nvmrc`), TypeScript **5.7**.
- React peer **^16 || ^17 || ^18 || ^19** — code must work across all four.
- Gravity UI: `@gravity-ui/uikit`, `@gravity-ui/page-constructor`, `@gravity-ui/components`, `@gravity-ui/icons`, `@gravity-ui/i18n`.
- BEM class names via `@bem-react/classname`.
- Markdown via `@diplodoc/transform` (peer).
- Build: Gulp 5 + Sass (client ESM/CJS) and `tsc` (server bundle).
- Tests: Jest 29 (unit) + Playwright Component Testing (visual).
- Docs/dev: Storybook 8 on port **7010**.

# AGENTS.md

Guide for AI coding agents working in this repository. Human contributors should start with `README.md` and `CONTRIBUTING.md`.

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

## Repository layout

```
src/
  blocks/        page-constructor blocks (Form, Layout, CTA, Author, Suggest, …)
  components/    reusable UI primitives
  containers/    BlogPage, BlogPostPage
  contexts/      React contexts (FeedContext, …)
  hooks/         custom hooks
  i18n/          keysets (Keyset enum + en/ru)
  models/        public TS types
  schema/        data schema utilities
  utils/         helpers — cn.ts (BEM), date, common
  constructor/   BlogConstructorProvider
  index.ts       client public entry
  server.ts      server public entry
styles/          shared SCSS exposed via "./styles/*" subpath export
playwright/      visual/CT config and helpers
test-utils/      Jest custom env + setup
.storybook/      Storybook config and public assets
build/           generated (esm/, cjs/) — do not edit
server/          generated server bundle — do not edit
scripts/         maintenance scripts (e.g. playwright-docker.sh)
```

## Common commands

```bash
# dev & build
npm run dev              # Storybook on http://localhost:7010
npm run build            # build:client + build:server (parallel)
npm run build:client     # gulp — ESM/CJS + SCSS copy
npm run build:server     # tsc for src/server.ts → server/

# quality (run before declaring a code change done)
npm run lint             # js + styles + prettier + typecheck (parallel)
npm run lint:js          # ESLint, --max-warnings=0
npm run lint:styles      # Stylelint on src/**/*.scss + styles/**/*.scss
npm run lint:prettier    # Prettier check
npm run typecheck        # tsc --noEmit
# *:fix variants exist for js / styles / prettier

# tests
npm test                 # Jest, --maxWorkers=50%
npm run test:watch       # Jest watch
npm run test:coverage    # Jest with coverage
npm run playwright          # Playwright CT (uses playwright/playwright.config.ts)
npm run playwright:update   # refresh visual snapshots
npm run playwright:docker   # run inside Docker (matches CI baselines)

# misc
npm run storybook:build  # static Storybook
npm run svgo             # optimize SVGs
```

`prepublishOnly` runs lint + build automatically — do not invoke manually.

## Coding conventions

- **ESLint:** extends `@gravity-ui/eslint-config` (+ prettier, client, import-order, a11y). Zero warnings tolerated.
- **React import:** `import * as React from 'react'` — default-import is forbidden by config.
- **Component imports:** import directly from implementation files. Do not create or use `index.ts` re-export shims.
- **BEM (CSS):** use the `block()` helper from `src/utils/cn.ts`. Namespace prefix is `bc-`; element separator `__`, modifier separator `_`.
  ```ts
  import {block} from '../../utils/cn';
  const b = block('feed'); // → bc-feed, bc-feed__item, bc-feed_active
  ```
- **SCSS:** Stylelint extends `@gravity-ui/stylelint-config`. Use BEM structure (`&__elem`, `&_mod`) and Gravity UI design tokens — no hardcoded colors, spacing, or radii. No inline layout styles.
- **Prettier:** shared `@gravity-ui/prettier-config` — do not override locally.
- **i18n:** all user-facing strings go through `@gravity-ui/i18n` keysets in `src/i18n/` under namespace `'blog'`. Never inline literals.
- **TypeScript:** no `any`; prefer type guards and discriminated unions over casts. No nested ternaries.
- **React patterns:** use `useEffect` only for true side effects — not for things expressible via derived state, event handlers, or memoized values. Prefer named handlers over inline arrow callbacks in render.

## Testing

- **Unit (Jest):** files live next to source as `**/__tests__/*.test.ts(x)`. Custom env: `test-utils/custom-environment.ts`. CSS imports go through `jest-transform-css`. Coverage target: `src/blocks`, `src/components`, `src/containers`.
- **Visual / Component (Playwright CT):** files end with `*.visual.test.tsx` under `__tests__/`. Snapshots live in sibling `__snapshots__/`. CI uses Linux baselines — regenerate with `npm run playwright:docker` (preferred) so snapshots match CI; local non-Docker `:update` runs will diverge.
- Two browser projects: Chromium and WebKit. Test ID attribute is `data-qa`.

## Commits & release

- **Conventional Commits** enforced by `commitlint.config.js` (Husky `commit-msg`). Use `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, etc.
- **`pre-commit`** runs `lint-staged`: ESLint+Prettier on JS/TS, Stylelint+Prettier on SCSS/CSS, Prettier on JSON/MD/YAML.
- **Releases** are automated by `gravity-ui/release-action` on push to `main` (`.github/workflows/release.yml`). Do **not** bump `package.json` version or edit `CHANGELOG.md` by hand — both are managed by the release bot.
- Add new dependencies with `npm install <pkg>`, not by editing `package.json` manually.

## Public API surface

- **Client entry:** `src/index.ts` — exports `BlogConstructorProvider`, `BlogPage`, `BlogPostPage`, model types, schema utilities, `BREAKPOINTS`.
- **Server entry:** `src/server.ts` — exports `transformPost`, `sanitizeMeta`, `createReadableContent`, `transformPageContent`.
- Subpath exports include `./server` and `./styles/*` (raw SCSS). Any change to these contracts is a breaking change — update `MIGRATION.md` and use a `feat!:` / `BREAKING CHANGE:` commit.

## Working with this repo as an agent

- Present a plan and wait for explicit user approval before applying edits.
- Edit one file per step; keep diffs minimal and reversible; preserve existing behavior.
- Search all usages of any modified symbol (`grep -r` / IDE find-references) and trace the end-to-end flow before declaring a task done.
- Before reporting code changes complete, run `npm run lint` and `npm run typecheck`; run `npm test` for any logic you touched and `npm run playwright:docker` if visual output changed.
- Do not introduce `any`, nested ternaries, hardcoded colors/spacing, or `index.ts` re-export shims.
- Do not skip Husky hooks (`--no-verify`) and do not amend already-pushed commits.

## Pointers

- `README.md` / `README-ru.md` — public-facing usage docs.
- `CONTRIBUTING.md` — CLA requirement (Yandex LLC); read before opening a PR.
- `MIGRATION.md` — latest breaking changes (v10.0 reworked the filter API to `FiltersConfig`).
- `.storybook/` — Storybook config; demo content under `src/demo/`.
- `playwright/playwright.config.ts` — visual test setup and snapshot pathing.
- `.github/workflows/release.yml` — release automation.

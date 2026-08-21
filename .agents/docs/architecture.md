# Architecture

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
  index.ts       main public entry
  server.ts      server public entry
styles/          shared SCSS exposed via "./styles/*" subpath export
playwright/      visual/CT config and helpers
test-utils/      Jest custom env + setup
.storybook/      Storybook config and public assets
build/           generated (esm/, cjs/) — do not edit
server/          generated server bundle — do not edit
scripts/         maintenance scripts (e.g. playwright-docker.sh)
```

## Public API surface

- **Main entry:** `src/index.ts` — exports `BlogConstructorProvider`, `BlogPage`, `BlogPostPage`, model types, schema utilities, `BREAKPOINTS`.
- **Blocks:** `src/blocks/index.ts` — exposed as `./blocks`; direct top-level block imports are available through `./blocks/*`.
- **Components:** `src/components/index.ts` — exposed as `./components`; direct top-level component imports are available through `./components/*`.
- **Server Components:** `Banner`, `CTA`, `CompactMedia`, `Media`, `YFM`, `PostsEmpty`, and `Wrapper`; all other React entries are explicit client boundaries.
- **Server entry:** `src/server.ts` — exports `transformPost`, `sanitizeMeta`, `createReadableContent`, `transformPageContent`.
- Additional subpath exports include `./server` and `./styles/*` (raw SCSS). Any breaking change to these contracts requires updating `MIGRATION.md` and using a `feat!:` / `BREAKING CHANGE:` commit.

---
description: Extract non-obvious learnings from the current session into AGENTS.md files at the appropriate directory level
---

Analyze the current session and extract non-obvious learnings to add to `AGENTS.md` files in this repository.

`AGENTS.md` files can live at any directory level, not just the repo root. When an agent reads a file, any `AGENTS.md` in parent directories is automatically pulled into context. Place learnings as close to the relevant code as possible so they reach the agent without bloating the root file.

## Where to put a learning in this repo

- **Project-wide** (affects build, release, public API contract, repo-level conventions) → root `AGENTS.md` (which routes to `.agents/docs/*` for substantive content; prefer updating the matching `.agents/docs/*.md` instead of the navigation root).
- **Block-specific** (props contract, schema↔block↔i18n coupling, server-transform interplay) → `src/blocks/<BlockName>/AGENTS.md`.
- **Container-specific** (`BlogPage`, `BlogPostPage` assembly invariants) → `src/containers/<Container>/AGENTS.md`.
- **i18n** (keyset enum ordering, namespace `'blog'`, fallback rules) → `src/i18n/AGENTS.md`.
- **Visual / CT testing** (snapshot pathing, Docker-vs-local baselines, browser-project quirks) → `playwright/AGENTS.md`.
- **Styles / subpath export** (`./styles/*` contract, token resolution) → `styles/AGENTS.md`.
- **Cross-cutting topic** that doesn't fit a folder → the matching file under `.agents/docs/`, `.agents/validation/`, or `.agents/evaluation/`.

## What counts as a learning (non-obvious only)

- Hidden relationships between files — e.g. adding a new block requires touching the block dir + `src/i18n/<lang>/blog.json` + `src/schema/` + Storybook story + `__tests__/` + `__snapshots__/` together.
- Execution paths that don't match how the code reads — e.g. server-side transforms (`transformPost`, `sanitizeMeta`, `createReadableContent`, `transformPageContent` in `src/server.ts`) running before client render, or `BlogConstructorProvider` context propagation.
- React peer-range surprises (`^16 || ^17 || ^18 || ^19`) — APIs that exist in one major but not another, hydration differences, JSX runtime quirks.
- Gravity UI version coupling, design-token availability, `@gravity-ui/page-constructor` integration edges.
- Build pipeline quirks — Gulp 5 + Sass for client (ESM/CJS) vs `tsc` for server, SCSS copy ordering, `prepublishOnly` side effects.
- Playwright CT details — Linux baseline divergence between local runs and `npm run playwright:docker`, snapshot path resolution, Chromium-vs-WebKit-only failures, `data-qa` selector conventions.
- BEM helper (`block()` from `src/utils/cn.ts`) edge cases — the `bc-` namespace, separator usage (`__`, `_`), interaction with `@bem-react/classname`.
- Husky + `lint-staged` interaction — when hooks actually run vs not, what files trigger which linter.
- Files managed by the release bot that humans must NOT edit (`CHANGELOG.md`, `package.json` version field).
- Debugging breakthroughs where the error message was misleading.
- Architectural decisions and constraints — e.g. why a specific abstraction exists, what would break if removed.

## What NOT to include

- Anything already documented in `README.md`, `CONTRIBUTING.md`, `MIGRATION.md`, the root `AGENTS.md`, or any `.agents/docs/*`, `.agents/validation/*`, `.agents/evaluation/*` file.
- Standard React / TypeScript / Jest / Playwright / Gravity UI behavior covered by their own official docs.
- Conventional Commits / Husky / `lint-staged` defaults — those are in `.agents/validation/commits-and-release.md`.
- Verbose explanations or tutorial-style write-ups — keep it operational.
- Session-specific details (one PR's file list, transient debugging steps, ephemeral state).

## Process

1. Review the session for: discoveries, errors that required multiple attempts, unexpected connections between files, surprising tool/API behavior.
2. For each candidate learning, decide the narrowest scope it applies to (a single block, a folder, the whole repo) and pick the corresponding `AGENTS.md` path from the list above.
3. Read the existing `AGENTS.md` (and the related `.agents/docs|validation|evaluation/*.md` if relevant) at that level to avoid duplication.
4. Create or update the `AGENTS.md` at that level. Keep entries to **1–3 lines per insight**; prefer bullet points; lead with the actionable fact, not the backstory.
5. If a learning is substantive enough that it belongs in a topical doc instead of a sub-`AGENTS.md`, update the matching `.agents/docs|validation|evaluation/*.md` and leave a one-line pointer in the nearest `AGENTS.md`.

After updating, summarize which `AGENTS.md` (or `.agents/*`) files were created or updated and how many learnings each gained.

$ARGUMENTS

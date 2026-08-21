# Navigation — where to find things

Quick locator index. For the full directory tree see `.agents/docs/architecture.md`.

## Source code (`src/`)

| You need…                                                        | Look at                                        |
| ---------------------------------------------------------------- | ---------------------------------------------- |
| A page-constructor block (Form, Layout, CTA, Author, Suggest, …) | `src/blocks/`                                  |
| A reusable UI primitive                                          | `src/components/`                              |
| Top-level page assemblies                                        | `src/containers/` (`BlogPage`, `BlogPostPage`) |
| React contexts                                                   | `src/contexts/` (e.g. `FeedContext`)           |
| Custom hooks                                                     | `src/hooks/`                                   |
| i18n keysets / translations                                      | `src/i18n/` (`Keyset` enum + `en/`, `ru/`)     |
| Public TS types                                                  | `src/models/`                                  |
| Data schema utilities                                            | `src/schema/`                                  |
| BEM `cn` helper, date utils, common helpers                      | `src/utils/` (especially `src/utils/cn.ts`)    |
| `BlogConstructorProvider`                                        | `src/constructor/`                             |
| Client public entry                                              | `src/index.ts`                                 |
| Server public entry                                              | `src/server.ts`                                |

## Tests

| Test type                    | Location                                        |
| ---------------------------- | ----------------------------------------------- |
| Jest unit tests              | sibling `__tests__/*.test.ts(x)` next to source |
| Playwright visual / CT tests | sibling `__tests__/*.visual.test.tsx`           |
| Playwright snapshots         | sibling `__snapshots__/`                        |
| Jest custom env / setup      | `test-utils/`                                   |
| Playwright config            | `playwright/playwright.config.ts`               |

## Build / config / tooling

| Concern                                             | Location                                      |
| --------------------------------------------------- | --------------------------------------------- |
| Shared SCSS exposed via `./styles/*` subpath export | `styles/`                                     |
| Storybook config + demo assets                      | `.storybook/`, demo content under `src/demo/` |
| Generated client bundles (do not edit)              | `build/esm/`, `build/cjs/`                    |
| Generated server bundle (do not edit)               | `server/`                                     |
| Maintenance scripts                                 | `scripts/` (e.g. `playwright-docker.sh`)      |
| Release automation                                  | `.github/workflows/release.yml`               |

## Human-facing docs

| Topic                    | File                                               |
| ------------------------ | -------------------------------------------------- |
| Public usage docs        | `README.md`, `README-ru.md`                        |
| CLA + contribution rules | `CONTRIBUTING.md`                                  |
| Latest breaking changes  | `MIGRATION.md`                                     |
| Release history          | `CHANGELOG.md` (release-bot managed — do not edit) |

## Agent-facing docs (`.agents/`)

See the index at the bottom of `AGENTS.md` for the full map. Common starting points:

- Architecture & API surface → `.agents/docs/architecture.md`
- npm commands cheat sheet → `.agents/docs/commands.md`
- Coding conventions → `.agents/validation/coding-conventions.md`
- Agent workflow rules → `.agents/validation/agent-workflow.md`
- Testing & validation gate → `.agents/validation/testing.md`
- Agent evaluation framework → `.agents/evaluation/README.md`
- Custom agent commands → `.agents/commands/`

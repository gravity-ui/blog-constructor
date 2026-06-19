# Testing & validation

Checks the agent **must run before declaring a change complete**. Treat this as the gate, not a suggestion.

## When to run what

| Change scope                                                                               | Required commands           |
| ------------------------------------------------------------------------------------------ | --------------------------- |
| Any TS/TSX edit                                                                            | `npm run typecheck`         |
| Any source edit                                                                            | `npm run lint`              |
| Logic changes (blocks, sub-blocks, components, containers, contexts, hooks, utils, schema) | `npm test`                  |
| Visual changes (markup, SCSS, layout, design-token usage)                                  | `npm run playwright`        |
| Cross-platform visual baseline (CI parity)                                                 | `npm run playwright:docker` |
| i18n keyset change (`src/i18n/`)                                                           | `npm test`                  |

Run the narrowest applicable set, but **always include `typecheck` + `lint`** before reporting completion.

Note: `npm run lint` already runs `lint:js`, `lint:styles`, `lint:prettier`, and `typecheck` in parallel — so a standalone `npm run typecheck` is only useful when you want the fastest possible TS check in isolation.

## Unit (Jest)

- Config: `jest.config.js` + `tsconfig.test.json`
- Environment: `test-utils/custom-environment.ts`
- Setup: `test-utils/setup-tests.ts`, `test-utils/setup-tests-after.ts`
- Shared test helpers: `test-utils/shared/` (`common.tsx`, `content.tsx`)
- Test constants: `test-utils/constants.ts`
- CSS handling: `.css|less|scss|sass` imports routed through `jest-transform-css`; swiper CSS gets the same treatment via an explicit `moduleNameMapper` entry.
- Coverage: `src/blocks/**`, `src/components/**`, `src/containers/**` (excludes `__stories__/`, `*.stories.tsx`, and `src/demo/**`).
- Test match: `**/*.test.[jt]s?(x)`; `.visual.` files are excluded so Playwright CT specs don't get picked up by Jest.
- Run: `npm test` | watch: `npm run test:watch` | coverage: `npm run test:coverage`
- Jest runs with `--maxWorkers=50%`; expect parallel test ordering, not deterministic.

## Visual / Component (Playwright)

- Config: `playwright/playwright.config.ts`
- Framework: `@playwright/experimental-ct-react` (component testing, Vite-based — not a browser test runner).
- Tests live alongside components as `*.visual.test.tsx` under sibling `__tests__/` directories.
- Snapshots live in sibling `__snapshots__/`; they are committed.
- Fixtures: `playwright/core/` — `mountFixture.tsx`, `expectScreenshotFixture.ts`, `delays.ts`, `constants.ts`, `types.ts` (re-exported via `playwright/core/index.ts`).
- Two browser projects: **Chromium** and **WebKit**. Test ID attribute is `data-qa`.
- Updating snapshots: `npm run playwright:update` locally — but **prefer `npm run playwright:docker:update`** to match CI Linux baselines. Local non-Docker `:update` runs will diverge on CI.
- Clearing caches: `npm run playwright:clear-cache` (host) / `npm run playwright:docker:clear-cache` (Docker).
- First-time setup: `npm run playwright:install` to fetch the browser binaries.

## Reporting results

When summarising a completed change, state which commands were run and their result (pass / fail / not applicable). Do **not** claim "tests pass" without naming the command(s).

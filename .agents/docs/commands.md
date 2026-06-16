# Common commands

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

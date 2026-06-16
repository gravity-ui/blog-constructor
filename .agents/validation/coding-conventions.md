# Coding conventions

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

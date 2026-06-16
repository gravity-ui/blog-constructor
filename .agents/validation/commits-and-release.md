# Commits & release

- **Conventional Commits** enforced by `commitlint.config.js` (Husky `commit-msg`). Use `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, etc.
- **`pre-commit`** runs `lint-staged`: ESLint+Prettier on JS/TS, Stylelint+Prettier on SCSS/CSS, Prettier on JSON/MD/YAML.
- **Releases** are automated by `gravity-ui/release-action` on push to `main` (`.github/workflows/release.yml`). Do **not** bump `package.json` version or edit `CHANGELOG.md` by hand — both are managed by the release bot.
- Add new dependencies with `npm install <pkg>`, not by editing `package.json` manually.

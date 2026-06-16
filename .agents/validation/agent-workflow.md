# Working with this repo as an agent

- Present a plan and wait for explicit user approval before applying edits.
- Edit one file per step; keep diffs minimal and reversible; preserve existing behavior.
- Search all usages of any modified symbol (`grep -r` / IDE find-references) and trace the end-to-end flow before declaring a task done.
- Before reporting code changes complete, run `npm run lint` and `npm run typecheck`; run `npm test` for any logic you touched and `npm run playwright:docker` if visual output changed.
- Do not introduce `any`, nested ternaries, hardcoded colors/spacing, or `index.ts` re-export shims.
- Do not skip Husky hooks (`--no-verify`) and do not amend already-pushed commits.

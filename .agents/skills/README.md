# Agent skills

This directory holds **host-agnostic** agent skills for the blog-constructor project. It is the canonical location — host adapters (Claude Code, Cursor, Codex, …) point at this directory instead of holding skill content themselves.

## Layout

Each skill is its own subdirectory:

```
.agents/skills/
└── <skill-name>/
    ├── SKILL.md        # entry + when to use
    └── references/     # optional plain-markdown deep-dives
```

- `SKILL.md` is the entry point. It should answer: what the skill is, when an agent should invoke it, what inputs/outputs it expects, and any guardrails.
- `references/` is optional — use it for longer playbooks, examples, or background that would clutter `SKILL.md`.

Plain markdown only. No host-specific runtime requirements, no executable bundles — anything host-specific lives in the host's own directory (e.g. `.claude/skills/`) and points back here.

## Wiring into a host

See the **Agent skills** section in `AGENTS.md` for the standard symlink wiring (e.g. `.claude/skills` → `../.agents/skills`). Host paths are gitignored so each developer wires their own host locally.

## Adding a new skill

1. Decide on a short kebab-case directory name (e.g. `add-block`, `bump-i18n-key`).
2. Create `.agents/skills/<name>/SKILL.md` with: title, when-to-use, steps, and any guardrails.
3. If the skill needs background material, add files under `.agents/skills/<name>/references/`.
4. Before scaffolding a new skill, browse the existing ones to avoid duplication.

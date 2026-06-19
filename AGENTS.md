# AGENTS.md

Navigation root for AI coding agents working in this repository. Human contributors should start with `README.md` and `CONTRIBUTING.md`.

## Pre-response gate (READ FIRST)

Before answering questions or proposing changes about existing blocks, sub-blocks, components, or architectural patterns, the agent MUST first consult:

1. `.agents/docs/architecture.md` — for structural / invariant questions.
2. `.agents/docs/navigation.md` — when locating files or understanding directory layout.

Source-code exploration (grep, Read, Explore subagents) comes AFTER these docs, not instead of them. List the consulted docs in the response so the reader can verify the gate was honored.

Trivial cases (typos, one-line lookups) may skip the gate but must state so explicitly.

## Agent skills

Project-specific agent guides live in **`.agents/skills/`** — this is the canonical, host-agnostic location. Each skill is a directory with a `SKILL.md` (entry + when to use) and an optional `references/` folder of plain-markdown deep-dives. The bodies and references are plain markdown with no host-specific runtime requirements.

Before scaffolding new entities or running project workflows, browse `.agents/skills/` to see if a relevant guide exists.

### Wiring skills into your agent host

Hosts that auto-discover skills (Claude Code, Cursor, Codex, etc.) usually expect them under a host-specific path (e.g. `.claude/skills/`). Those paths are **gitignored** — each developer wires up their own host locally. The simplest wiring is a symlink from the host path to `.agents/skills/`.

Example for Claude Code (run from the repo root):

```sh
mkdir -p .claude
ln -s ../.agents/skills .claude/skills
```

Other hosts follow the same pattern — just point the host's expected path at `.agents/skills/`. If your host doesn't support symlinks, copy the directory instead and refresh on updates.

## Index of `.agents/` docs

- **Project overview & tech stack** — `.agents/docs/project-overview.md`
- **Architecture & public API surface** — `.agents/docs/architecture.md`
- **Navigation (where to find things)** — `.agents/docs/navigation.md`
- **External pointers** — `.agents/docs/pointers.md`
- **Common npm commands (dev / build / lint / test)** — `.agents/docs/commands.md`
- **Coding conventions** — `.agents/validation/coding-conventions.md`
- **Commits & release** — `.agents/validation/commits-and-release.md`
- **Agent workflow rules** — `.agents/validation/agent-workflow.md`
- **Testing & validation gate (commands to run before completion)** — `.agents/validation/testing.md`
- **Agent evaluation framework (manual evals of the agent itself)** — `.agents/evaluation/README.md`
- **Skills convention & how to add one** — `.agents/skills/README.md`
- **Custom agent commands** — `.agents/commands/` (e.g. `extract-learnings.md`)

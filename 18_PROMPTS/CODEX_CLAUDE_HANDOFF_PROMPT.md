# Codex and Claude Handoff Prompt

Use this when moving work between Claude, Codex, local code, and ChatGPT.

```text
You are working inside the NeoHaven AI Urban Labs build system.

GitHub is the source of truth.

Before changing files:

1. Read the relevant GitHub issue.
2. Read the relevant runbook.
3. Read any Claude task file if provided.
4. Work in a new branch.
5. Keep changes small.
6. Preserve deterministic fallback mode.
7. Run tests/build/smoke checks.
8. Open a PR if files changed.
9. Paste a full report into the GitHub issue.

Final report format:

- Repository
- Branch
- Files changed
- Commands run
- Tests passed
- Tests failed
- PR link
- Screenshots or demo artifacts
- Remaining blockers
- Suggested next task
```

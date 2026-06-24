# Claude Task 010 — NOVA Command Center Local Verification Support

## Goal

Prepare an implementation and verification package that Codex can run locally for NOVA Command Center.

## Access Boundary

Claude does not directly access the user's local files in this workflow.

Codex is the local-file executor. Claude should produce precise instructions, patch suggestions, and fallback fixes that Codex can apply locally and push to GitHub.

## Repository

`wisemaiarservices-debug/NeoHaven-repo-root`

## GitHub Issue

`NeoHaven-repo-root` Issue #4

## Codex local verification commands

```powershell
cd apps/command-center
npm install
npm run typecheck
npm run build
npm run dev
```

Open:

```text
http://localhost:8400
```

## Acceptance Criteria

- Typecheck passes.
- Build passes.
- App runs on port 8400.
- Home page renders.
- Cards appear for NOVA Core, NeoAgro, NeoGrid, NeoCell.
- Fallback mode is visible when services are not running.

## Claude Output Required

Claude should provide Codex with:

- exact commands to run
- expected successful output
- likely failure points
- small patch recommendations if errors occur
- exact files to inspect first

## If errors happen

Do not rewrite the app.

Provide the smallest possible fix package for Codex:

- exact file paths
- changed content
- commands Codex should run
- terminal output Codex should paste
- whether a PR should be opened

## Handoff report

Claude should tell Codex to paste the final report into GitHub Issue #4 in `NeoHaven-repo-root`.

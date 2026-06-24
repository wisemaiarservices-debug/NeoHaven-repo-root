# Claude Task 010 — NOVA Command Center Local Verification

## Goal

Help verify NOVA Command Center locally and prepare any fixes for Codex/GitHub.

## Repository

`wisemaiarservices-debug/NeoHaven-repo-root`

## Local path

Use the user's local clone if available. If not, clone fresh.

## Required commands

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

## If errors happen

Do not rewrite the app.

Fix the smallest files needed and provide:

- exact file paths
- changed content
- commands run
- terminal output summary
- whether a PR should be opened

## Handoff report

Paste the final report into GitHub Issue #4 in `NeoHaven-repo-root`.

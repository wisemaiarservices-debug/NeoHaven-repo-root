# NOVA OS Deployment Triage — 2026-11-13

## Incident summary

A recent Vercel build for the `nova-os` project failed during the TypeScript build step.

- Project: `nova-os`
- Repository reported by Vercel: `wisemaiarservices-debug/neohaven-nova-os-website`
- Branch: `feat/nova-operator-workspace-premium-ui`
- Failed deployment: `dpl_6nqiA8GHDLsyTD9cfX2Grj4LHJSM`
- Failed commit: `0ec65d6c65ed40d7eb4372d95690f1acfbe32368`
- Error: `src/routes/EngineeringConsole.tsx(52,40): error TS1109: Expression expected.`
- Build command: `tsc --noEmit && vite build`
- Dependency installation: completed successfully before the TypeScript failure.

A separate deployment for commit `6680fa32f8f885b1490e8dcbb10448711208d8e7` reached `READY`. This confirms that a successful deployment exists, but does not prove that the failed commit is safe to promote.

## Important evidence boundary

The GitHub file-content lookup for `src/routes/EngineeringConsole.tsx` returned 404, and the deployment's source file tree was not available through the connected deployment API. Therefore the exact malformed expression has not been inspected and no source-code fix is claimed.

## Safe recovery procedure

1. Check out the exact failed commit or its branch in a local working copy.
2. Inspect lines 45–58 of `src/routes/EngineeringConsole.tsx`, including the complete surrounding JSX/TypeScript expression.
3. Correct only the malformed syntax; avoid broad refactors during incident recovery.
4. Run the repository's package-manager install in frozen-lockfile mode.
5. Run `pnpm run build` locally and require a clean TypeScript check and Vite build.
6. Push the fix to a dedicated branch and open a pull request.
7. Verify the preview deployment and critical operator-console flows.
8. Promote only after review and explicit production-release approval.

## Regression checks

- TypeScript compilation completes without diagnostics.
- API base URLs are normalized consistently and reject insecure or malformed endpoints.
- Health-check effects handle invalid configuration without crashing the UI.
- Empty evidence states remain explicit; demo or illustrative values are never represented as live telemetry.
- Operator navigation, loading, error, and empty states render correctly.
- No secrets or customer data appear in client bundles or logs.

## Release rule

Do not retry or promote the known-bad commit as a substitute for fixing the source. Preserve the latest known-good deployment until the corrected commit passes build and preview verification.

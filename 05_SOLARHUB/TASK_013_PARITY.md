# Task 013 — Unified Pitch Demo Parity

## Goal

Align the NOVA OS demo across GitHub, Lovable, Figma, and the SolarHub pitch.

## Read

- `05_SOLARHUB/UNIFIED_PITCH_DEMO_SPEC.md`
- `05_SOLARHUB/SOLARHUB_DEMO_PACKAGE.md`
- `05_SOLARHUB/SOLARHUB_DEMO_SCRIPT.md`
- `20_DESIGN/LOVABLE_FIGMA_PRODUCT_VISION_TRACK.md`

## App Target

```text
apps/command-center
```

## Work

1. Review the current Command Center app.
2. Compare it against the unified pitch demo spec.
3. Create a parity report at:

```text
docs/CHATGPT_SYNC/UNIFIED_PITCH_DEMO_PARITY_REPORT.md
```

4. Add small UI improvements only when safe.
5. Keep fallback mode and deterministic demo data.
6. Keep the design aligned with Lovable and Figma.

## Suggested UI Items

- Pitch mode
- Demo script page
- Digital Twin panel
- Knowledge Graph panel
- Recommendation cards
- Impact metric cards
- Screenshot-friendly layout

## Verify

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

## Report

Paste results into the tracking issue:

- files changed
- commands run
- typecheck result
- build result
- browser result
- screenshots
- PR link
- blockers

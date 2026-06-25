# Codex Task 012 — Route Lovable and Figma Vision into GitHub

## Goal

Turn the Lovable and Figma product vision work into actionable GitHub implementation tasks without overwriting the working NOVA Command Center.

## Sources

Existing NOVA OS Lovable prototype:

```text
https://lovable.dev/projects/22575afb-70aa-417c-b434-2506de324158
```

New separate NOVA OS product vision Lovable prototype:

```text
https://lovable.dev/projects/eb7473fa-a61e-4c3e-b65b-9fb8748687ec
```

FigJam architecture diagram:

```text
https://www.figma.com/board/2AQ31yCswV87GT8JCHZl1T
```

## GitHub Target

Repository:

```text
wisemaiarservices-debug/NeoHaven-repo-root
```

Target app:

```text
apps/command-center
```

## Required Codex Work

1. Review `20_DESIGN/LOVABLE_FIGMA_PRODUCT_VISION_TRACK.md`.
2. Review `20_DESIGN/LOVABLE_EDIT_PROMPTS.md`.
3. Review `20_DESIGN/FIGMA_PRODUCT_VISION_PROMPTS.md`.
4. Compare current GitHub Command Center to the Lovable/Figma vision if screenshots or exported files are available.
5. Identify UI patterns worth porting.
6. Do not overwrite the current working app.
7. Create a small PR only if a clear improvement is ready.

## Candidate Implementation Areas

- Stronger sidebar navigation
- Better service status chips
- Better KPI cards
- Better recommendation card design
- Digital Twin panel
- Knowledge Graph panel
- Better demo script page
- Screenshot/export-friendly layout
- Consistent design tokens

## Non-Negotiable Constraints

- Keep deterministic fallback mode.
- App must render without external services.
- Do not imply autonomous control.
- Keep operator approval visible.
- Keep CI passing.
- Run typecheck and build before PR.

## Required Report

Paste into the relevant GitHub issue:

- Sources reviewed
- Screenshots/files available
- Patterns selected
- Patterns rejected
- Files changed
- Commands run
- Tests passed
- PR link if created
- Remaining blockers

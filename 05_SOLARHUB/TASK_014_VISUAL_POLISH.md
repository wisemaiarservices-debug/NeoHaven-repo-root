# Task 014 — Command Center Visual Polish

## Problem

The current Command Center at port 8400 is structurally correct but not polished enough for pitching.

The preferred visual direction is the NeoAgro audited dashboard style: dense, dark, operational, square-panel, compact, and professional.

## Goal

Make `apps/command-center` visually match the stronger NeoAgro dashboard experience while keeping NOVA OS as the parent multi-module dashboard.

## Reference

Use the current NeoAgro dashboard style as reference:

```text
wisemaiarservices-debug/neoagro-platform/apps/web/app/dashboard/page.tsx
wisemaiarservices-debug/neoagro-platform/apps/web/app/globals.css
```

## Requirements

- Keep fallback-safe services.
- Keep deterministic demo data.
- Keep NOVA Core, NeoAgro, NeoGrid, NeoCell cards.
- Keep Digital Twin.
- Keep Knowledge Graph.
- Keep operator-approved recommendations.
- Keep pitch/demo script.
- Improve visual density and dashboard polish.
- Do not make it a landing page.

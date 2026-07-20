# CRES / BRITE Agri-PV Demo Scope

This branch adds a parallel NOVA OS Command Center route for the Dr. Evangelos Rikos / CRES / BRITE introductory meeting.

## Route

`/cres-demo`

## Purpose

Show how NOVA OS could support a research and EU-funded collaboration discussion around:

- PV transparency decision support
- weak-grid agri-PV decision intelligence
- validation workflow design
- roles for NeoHaven, CRES, and BRITE
- future data integrations

## Important limitation

The route uses synthetic discussion data only. It is not a field-validated model, does not claim PV transparency optimization, and does not perform autonomous physical control.

## Data injected

Static fixtures are stored in:

`apps/command-center/data/cresDemoData.ts`

The demo references future integration candidates only:

- PVGIS / European Commission JRC
- NASA POWER
- Open-Meteo
- CRES / BRITE expert assumptions and validation criteria

## Vercel deployment

Use the existing NOVA Command Center Vercel setup, with root directory:

`apps/command-center`

Recommended settings:

- Framework: Next.js
- Install command: `npm install --legacy-peer-deps`
- Build command: `npm run build`
- Output: Next.js default

This branch should be deployed as a preview deployment first. Do not merge into production until the route is checked visually.

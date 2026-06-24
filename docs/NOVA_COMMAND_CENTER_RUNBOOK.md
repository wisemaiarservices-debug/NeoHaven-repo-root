# NOVA Command Center Runbook

## Purpose

NOVA Command Center is the unified SolarHub demo view for NeoHaven AI Urban Labs.

It brings together:

- NOVA Core AI v0
- NeoAgro
- NeoGrid
- NeoCell

## Run the command center

```powershell
cd apps/command-center
npm install
npm run dev
```

Open:

```text
http://localhost:8400
```

## Optional services

Run the module services if you want live connected mode:

- NeoAgro API: `http://localhost:8000`
- NOVA Core API: `http://localhost:8100`
- NeoGrid API: `http://localhost:8200`
- NeoCell API: `http://localhost:8300`

If services are offline, the command center still renders using deterministic fallback data.

## Demo sequence

1. NeoCell checks field readiness.
2. NeoAgro forecasts crop and water risk.
3. NeoGrid coordinates energy timing.
4. NOVA Core explains the recommendation.
5. NOVA displays expected impact.

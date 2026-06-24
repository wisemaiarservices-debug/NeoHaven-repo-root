# NOVA Command Center

GitHub-first SolarHub demo view for NOVA OS.

## Modules

- NOVA Core AI v0
- NOVA Agriculture / NeoAgro
- NOVA Energy / NeoGrid
- NOVA Infrastructure / NeoCell

## Run

```powershell
cd apps/command-center
npm install
npm run dev
```

Open:

```text
http://localhost:8400
```

## Optional local service URLs

```env
NEXT_PUBLIC_NEOAGRO_API_URL=http://localhost:8000
NEXT_PUBLIC_NOVA_CORE_API_URL=http://localhost:8100
NEXT_PUBLIC_NEOGRID_API_URL=http://localhost:8200
NEXT_PUBLIC_NEOCELL_API_URL=http://localhost:8300
```

The page renders with deterministic fallback data if services are offline.

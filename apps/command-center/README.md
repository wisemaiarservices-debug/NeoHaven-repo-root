# NOVA Command Center

Decision intelligence for sustainable infrastructure operations.

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

The page renders operational preview data when product services are offline.


## Preview navigation and frontend security baseline

The product cards in the Command Center preview point to the current labeled preview deployments of NeoAgro, NeoGrid and NeoCell. These are preview aliases for the respective draft branches, not production endpoints; the panel is navigation-only and does not imply Core connectivity, tenant authorization or live telemetry.

The frontend uses Next.js `16.4.6`, React and React DOM `19.3.1`, Node.js `>=20.9.0`, and a committed npm lockfile. Overrides pin `react-is` to the React 19 version and `source-map-js` to patched `1.2.4`. CI installs with `npm ci`, runs product-preview link tests, TypeScript, production and full dependency audits, and a production build. Both audits reported zero vulnerabilities on the lockfile-generation run; the final frozen-lockfile exact-head CI is the remaining check.

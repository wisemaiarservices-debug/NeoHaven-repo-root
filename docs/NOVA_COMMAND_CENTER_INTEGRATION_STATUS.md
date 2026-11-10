# NOVA Command Center — integration truth and rollout gates

## Deployment identity

- Vercel project: `nova-command-center`
- Production alias: `https://nova-command-center-peach.vercel.app`
- Source repository: `wisemaiarservices-debug/NeoHaven-repo-root`
- Production deployment inspected: commit `efd90880c3eb3a5cadb47ae652caadf02b185983`
- The separate Vercel project `nova-os` hosts the operator/engineering workspace. The command center and NOVA OS workspace are distinct deployables.

## Verified integration

- NOVA Core public Worker: `https://nova-core-api.neohaven.workers.dev`
- Health route: `GET /health`; the Worker health endpoint was verified by GitHub Actions on 2026-11-10.
- NASA POWER daily retrieval was verified through NOVA Core by the live smoke workflow on 2026-11-10. Its data is gridded/model-derived, not a local sensor reading.
- The Command Center server route `GET /api/system/status` checks NOVA Core health and probes `GET /api/v1/storage/status`. It reports the actual response state and does not treat a 404 as connected storage.

## Product navigation versus API integration

| Product | UI URL | API status |
|---|---|---|
| NeoAgro | `https://neoagro-six.vercel.app` | API not verified from this Command Center |
| NeoGrid | `https://neogrid-sigma.vercel.app` | No deployed API endpoint verified |
| NeoCell | `https://neocell-ebon.vercel.app` | No deployed API endpoint verified |
| Operator Workspace | `https://nova-os-pied.vercel.app/os` | Navigation link only |
| Engineering Console | `https://nova-os-pied.vercel.app/console` | Navigation link only |

A successful website navigation or API process health check is not proof of authenticated module-to-core ingestion, live field telemetry, or persistent observation storage.

## Current dashboard data classification

The existing Command Center charts, KPIs, field zones, energy profiles, digital-twin entities, recommendations and impact figures are scenario fixtures in `apps/command-center/data/mockData.ts`. They are not measurements from a selected site. The Command Center now labels this boundary and removes the stale Casablanca/SolarHub site identity until an operator configures a real pilot site.

## Required next implementation gates

1. Provision no database until free quotas, billing and retention are reviewed; apply the D1 schema only after approval.
2. Complete NOVA Core ingestion authentication, exact module/source grants, site/asset ownership validation, atomic observation + audit writes and idempotency.
3. Deploy and verify each module API independently; do not infer API health from its Vercel UI.
4. Connect NeoAgro, NeoGrid and NeoCell through server-to-server service identities; no browser-held service tokens.
5. Replace each scenario fixture with typed, provenance-bearing API data. Keep nulls for unavailable observations.
6. Implement operator review/approval persistence and an audit trail. Recommendations remain advisory; no autonomous infrastructure control.
7. Add end-to-end tests proving each screen renders live data with source identity, units, timestamps and quality flags.

## Scope of this change

This PR adds live NOVA Core process-health and storage-status visibility, product/workspace navigation, and honest data-trust messaging. It does not claim that all panels are live or that the whole ecosystem is already connected.

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
- The Command Center server route `GET /api/system/status` checks NOVA Core health and probes `GET /api/v1/storage/status`. It also performs bounded, no-store website reachability checks for the Operator Workspace, Engineering Console, NeoAgro, NeoGrid and NeoCell. HTTP 401/403 is reported as access-restricted (the site responded, but access is gated); other non-success responses and timeouts are reported separately. These checks do not test module API routes or device feeds.

## Product navigation versus API integration

| Product | UI URL | API status |
|---|---|---|
| NeoAgro | `https://neoagro-six.vercel.app` | API not verified from this Command Center |
| NeoGrid | `https://neogrid-sigma.vercel.app` | No deployed API endpoint verified |
| NeoCell | `https://neocell-ebon.vercel.app` | No deployed API endpoint verified |
| Operator Workspace | `https://nova-os-pied.vercel.app/os` | Navigation link only |
| Engineering Console | `https://nova-os-pied.vercel.app/console` | Navigation link only |

Website reachability is only an HTTP response check. A protected 401/403 response is classified as access-restricted, not as a failed host. A successful website response or API process health check is not proof of authenticated module-to-core ingestion, live field telemetry, or persistent observation storage.

## Current dashboard data classification

The Command Center overview now prioritizes live service checks, product workspace links and provider-backed data retrieval instead of hardcoded site KPIs and mock recommendation queues. The NeoAgro field-zone measurements and irrigation instructions have been removed; the screen now shows an unconfigured site state and the required data connections. The digital-twin page shows only the target asset domains, not a populated site topology. The knowledge graph no longer displays fictional asset IDs, capacities or a hardcoded reasoning chain. The NOVA Core panel no longer displays mock forecasts or scenario savings, and the reusable NeoGrid, NeoCell, impact and hero panels have been changed to evidence-gated states. The executive walkthrough now describes verified capabilities and limitations rather than claiming a live pilot. The NeoGrid and NeoCell screens show disconnected states instead of fabricated telemetry. Impact reporting is blocked until a baseline and verified observations exist. Settings shows unknown/unconfigured deployment values honestly.

The NeoAgro screen now provides a live NASA POWER daily retrieval workflow through a same-origin Command Center API route and the deployed NOVA Core Worker. It requires operator-entered coordinates and date range; no site is preselected. The UI shows returned provider values, units, nulls, requested location/period and NASA attribution, and allows CSV export. This is gridded model/satellite-derived data, not field sensor telemetry.

## Required next implementation gates

1. Provision no database until free quotas, billing and retention are reviewed; apply the D1 schema only after approval.
2. Complete NOVA Core ingestion authentication, exact module/source grants, site/asset ownership validation, atomic observation + audit writes and idempotency.
3. Deploy and verify each module API independently; do not infer API health from its Vercel UI.
4. Connect NeoAgro, NeoGrid and NeoCell through server-to-server service identities; no browser-held service tokens.
5. Replace the remaining scenario field-zone, digital-twin and asset graph fixtures with typed, provenance-bearing API data. Keep nulls for unavailable observations.
6. Implement operator review/approval persistence and an audit trail. Recommendations remain advisory; no autonomous infrastructure control.
7. Add end-to-end tests proving each screen renders live data with source identity, units, timestamps and quality flags.

## Scope of this change

This PR adds live NOVA Core process-health and storage-status visibility, bounded website reachability checks for all five operator/product destinations, product/workspace navigation, and honest data-trust messaging. It does not claim that module APIs, field telemetry, or all dashboard panels are live.

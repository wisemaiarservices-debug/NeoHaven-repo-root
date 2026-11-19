# NeoHaven ecosystem deployment boundaries and inventory

Checked: 2026-11-20
Purpose: distinguish the shared platform, product applications, consoles, public website and hosting responsibilities. This is an evidence snapshot, not a production-readiness certification.

## Architecture boundaries

| Layer | Repository / service | Responsibility | Hosting evidence |
|---|---|---|---|
| Shared intelligence and governance | `nova-core` | Shared multi-tenant foundation, data model, governed evidence workflows, APIs and intelligence used by all NOVA modules | Public Core API Worker at `https://nova-core-api.neohaven.workers.dev`; separate from Vercel frontends. Private tenant API and Access gateway have separate Cloudflare deployment prerequisites |
| NOVA OS application and operator/engineering surfaces | Private `NovaOS` repository plus reviewed workspace routes in `neohaven-nova-os-website` | Operator Workspace, Engineering Console, governed workflows and module navigation | Separate Vercel project named `nova-os` is linked to the website repository, not the private `NovaOS` repo. Current latest deployment is a preview branch; old production alias remains a separate revision |
| NeoAgro | `neoagro-platform` | Agriculture/agrivoltaics product UI and module | Separate Vercel project; latest observed deployment is READY but is a branch preview, not a production-target deployment |
| NeoGrid | `neogrid-platform` | Energy product UI and module | Separate Vercel project; latest observed deployment is READY but is a branch preview, not a production-target deployment |
| NeoCell | `neocell-platform` | Infrastructure/edge product UI and module | Separate Vercel project; latest observed deployment is READY but is a branch preview, not a production-target deployment |
| NOVA Command Center | `NeoHaven-repo-root` | Ecosystem/customer-facing command center | Separate Vercel project; latest observed deployment is READY but is a branch preview, not a production-target deployment |
| NOVA FieldOps | `nova-fieldops` | Field operations product surface | Separate Vercel project; latest observed deployment is READY and explicitly targets production |
| Public marketing/presentation website | `neohaven-nova-os-website` | Public-facing website and presentation/navigation surface; not the entire product ecosystem | Separate Vercel project. It is not the source of truth for Core or product runtime status |

NOVA Core is the shared platform foundation. NeoAgro, NeoGrid and NeoCell are connected product modules. NOVA OS is the application/operating layer that connects shared Core capabilities and module workflows. The website is only a presentation/application surface; it is not a substitute for Core or the product repositories.

## Vercel project inventory

Team: `NeoHavenUrbanLabs`. The connected Vercel team reports the Hobby plan. No upgrade or paid resource is authorized by this inventory.

The following rows come from read-only Vercel deployment queries on 2026-11-20. Production-target deployment history was queried separately from each project's latest overall deployment. This distinction matters: most projects have a READY production deployment on `main` and a newer READY feature/docs preview. The preview does not replace the production deployment.

| Vercel project | Linked Git repository | Latest production deployment | Latest overall deployment |
|---|---|---|---|
| `neoagro` | `neoagro-platform` | READY — [production](https://neoagro-1xo0l9yif-neo-haven-urban-labs.vercel.app), `main` / `d86a367fb364d16e45a0debe921fc0128183dd08` | READY preview — [feature branch](https://neoagro-git-fix-neoagro-core-ingest-876540-neo-haven-urban-labs.vercel.app), `fix/neoagro-core-ingestion-host-allowlist` / `8a376177026235c4d80aee7b619ae831c5effa8e` |
| `neogrid` | `neogrid-platform` | READY — [production](https://neogrid-k9now1nqc-neo-haven-urban-labs.vercel.app), `main` / `e829e7124b424ddf0028b37affcf50d6c48e41ef` | READY preview — [feature branch](https://neogrid-git-feat-neogrid-core-inges-f4b6b5-neo-haven-urban-labs.vercel.app), `feat/neogrid-core-ingestion-current-provenance` / `72bdd31e68dbd3a9c06c6ec2b7900eb5e8cab1c7` |
| `neocell` | `neocell-platform` | READY — [production](https://neocell-kc1bqu90c-neo-haven-urban-labs.vercel.app), `main` / `92803df9189e31418a326beedbd59a952b118181` | READY preview — [feature branch](https://neocell-git-feat-neocell-core-inges-6c05bd-neo-haven-urban-labs.vercel.app), `feat/neocell-core-ingestion-current-provenance` / `875abfc43240d872bcafd558fce464e78d5a1802` |
| `nova-command-center` | `NeoHaven-repo-root` | READY — [production](https://nova-command-center-4d3pi8wz7-neo-haven-urban-labs.vercel.app), `main` / `efd90880c3eb3a5cadb47ae652caadf02b185983` | READY preview — [ecosystem-map branch](https://nova-command-center-git-docs-ecosys-6e30c4-neo-haven-urban-labs.vercel.app), `docs/ecosystem-deployment-boundaries-v1` / `48264e84d096c2bff16cf7f517ba25b238e47e12` |
| `nova-fieldops` | `nova-fieldops` | READY — [production](https://nova-fieldops-o8d8wfuk5-neo-haven-urban-labs.vercel.app), `main` / `92e2bc25f621bc1b23a7399afaecd646596f2f6d` | Same as latest production deployment |
| `nova-os` | `neohaven-nova-os-website` | READY — [production](https://nova-ekeyzxn7g-neo-haven-urban-labs.vercel.app), `main` / `2951ef88be4a285e6076f629c71a8e4e20aec667` | READY preview — [website docs branch](https://nova-os-git-docs-nova-os-gateway-en-d178c7-neo-haven-urban-labs.vercel.app), `docs/nova-os-gateway-env-inventory-v1` / `13f2f030d2d936854a9ebc4401bcf86f4e84e97a` |
| `neohaven-nova-os-website` | `neohaven-nova-os-website` | READY — [production](https://neohaven-nova-os-website-g1vnbix4n-neo-haven-urban-labs.vercel.app), `main` / `f57df387359c36ee256f9b9f8c650e743ab1badc` | READY preview — [website docs branch](https://neohaven-nova-os-website-git-docs-n-c341db-neo-haven-urban-labs.vercel.app), `docs/nova-os-gateway-env-inventory-v1` / `13f2f030d2d936854a9ebc4401bcf86f4e84e97a` |

Important deployment interpretation:

- Each of the seven projects has at least one READY deployment explicitly targeting production in Vercel's production deployment history.
- Several also have newer READY previews on feature or documentation branches. Those previews do not become production automatically and must not be described as live production updates.
- The `nova-os` Vercel project is linked to the public website repository, not the private `NovaOS` repository. Its production deployment at the time of inspection is the older website `main` revision `2951ef88be4a285e6076f629c71a8e4e20aec667`; it does not prove that the private NOVA OS application repository is deployed.
- Project-level domain lists and deployment-specific aliases are different things. The production history above is based on deployment `target: production`; preview URLs are taken from the latest deployment's alias list.
- Project metadata reports `live: false` on these project objects. This field is not a replacement for the explicit production deployment target and alias history; do not infer product availability or failure from it alone.
- READY Vercel status proves only that Vercel completed a deployment. It does not prove Core connectivity, live data, tenant isolation, authorization, end-to-end workflows, or operational readiness.

## Environment metadata inventory

Read-only Vercel project environment-variable listings were queried with decryption disabled.

- `neoagro`: one plain variable is present across production, preview and development: `NEXT_PUBLIC_NOVA_CORE_API_URL=https://nova-core-api.neohaven.workers.dev`. Its comment describes the URL as a public Core API endpoint with no credentials.
- `neogrid`: no Vercel project variables were listed.
- `neocell`: no Vercel project variables were listed.
- `nova-command-center`: no Vercel project variables were listed.
- `nova-fieldops`: no Vercel project variables were listed.
- `nova-os` and `neohaven-nova-os-website`: no Vercel project variables were listed.

An empty Vercel variable list is not proof that an app is non-functional or has no backend: configuration may be supplied by defaults, build-time code, other hosting, or demo/fallback behavior. Each product's own source and runtime contract must be audited before classifying its integration. In particular, NeoGrid documents `VITE_NEOGRID_API_BASE` and deterministic demo fallback behavior; the empty Vercel variable inventory alone cannot determine which mode the deployed frontend is using.

## Core and private tenant gateway boundary

- Public Core API Worker: `https://nova-core-api.neohaven.workers.dev`.
- The private tenant API and Access-protected gateway are separate from the Vercel frontend projects.
- The reviewed Core source describes a gateway-to-private-API Service Binding and signed identity envelope, but source code and local integration tests do not establish live Cloudflare deployment, Access policy, secrets, D1 binding/migration state, hostname routing or production parity.
- The Core tenant-gateway deployment and staging evidence must be tracked in the Core/Cloudflare release record, not inferred from the website's Vercel variables.
- NeoAgro's public Core API URL is not a substitute for the private tenant gateway or authenticated tenant data plane.
- Do not replace the private gateway with the public Core API, expose the private API publicly, or infer that the entire ecosystem is blocked because the website has no gateway variable.

## NOVA OS consoles and preview

The reviewed website feature preview exposes `/os` (Operator Workspace) and `/console` (Engineering Console). Those route checks establish the presence of the preview UI only. The current Vercel project named `nova-os` is connected to the website repository; it is not a Vercel deployment of the private `NovaOS` repository. Keep these three artifacts distinct:

1. The public marketing/presentation website.
2. The website-hosted preview routes for Operator Workspace and Engineering Console.
3. The private NOVA OS application repository and its own CI/release evidence.

The older production `nova-os-pied.vercel.app` deployment was previously identified on an older `main` commit. The current deployment inspected for the `nova-os` Vercel project is a docs-branch preview and has not been proven to replace that production revision.

## Correct readiness model

Assess each layer independently and then test the complete chain:

1. **Core:** governed API, tenant boundaries, identity, source/calibration/policy governance, durable operations and private gateway deployment.
2. **Product modules:** each product's own build, deployed revision, configured API mode, data provenance, and Core contract compatibility.
3. **NOVA OS consoles:** Operator Workspace and Engineering Console routes, role-aware workflows, error/recovery states and cross-module navigation.
4. **Command Center and FieldOps:** their own deployed revisions and integration contracts.
5. **Website:** presentation/navigation and its own environment/configuration only.
6. **End-to-end staging:** two synthetic tenants, authorized Access identities, all required modules, revocation/recovery scenarios, independent review and evidence capture.

Do not promote a whole-system status from a single website or Vercel project check. Unknown remains unknown until verified at the owning layer.

## Release and cost guardrails

- No production deployment, live migration, customer-data test, Cloudflare policy/secret change or environment-variable write is authorized by this inventory.
- Use draft PRs and exact-SHA CI evidence for repository changes.
- Verify current free-tier limits and commercial-use terms separately for each hosting provider before production use; the team currently reports Vercel Hobby, which must not be assumed suitable for commercial production.
- No paid upgrades, add-ons, overages or unapproved spending.
- This inventory does not constitute an independent security review or staging acceptance.


## Product-to-Core integration status (source/PR evidence, 2026-11-20)

This matrix distinguishes a tested client adapter from an activated integration. The module repositories have server-side observation transport work, but the current PR descriptions explicitly keep producer activation disabled. A successful product frontend deployment or public API health response is not evidence of authenticated tenant telemetry.

| Product | Product responsibility | Core integration evidence | Current verified boundary | Next gate |
|---|---|---|---|---|
| NeoAgro / NOVA Agriculture | Field, crop, water, weather, satellite and agrivoltaic intelligence | Draft [NeoAgro #24](https://github.com/wisemaiarservices-debug/neoagro-platform/pull/24) carries provider mapper + strict server-side Core observation adapter; [#25](https://github.com/wisemaiarservices-debug/neoagro-platform/pull/25) restricts ingestion to approved custom hosts; [#26](https://github.com/wisemaiarservices-debug/neoagro-platform/pull/26) defines trusted provider/source registration | Adapter and contract tests exist; ingestion is disabled and not wired to a producer route. No provider credentials, live site/source/asset mapping, service grant or activated telemetry are evidenced | Approve provider identity profile, bind real provider account/resource to Core-owned site/source/asset, provision least-privilege service grant and private Access route, then synthetic two-tenant HTTP acceptance |
| NeoGrid / NOVA Energy | Solar generation, storage, consumption, grid exchange, carbon and energy optimization | Draft [NeoGrid #8](https://github.com/wisemaiarservices-debug/neogrid-platform/pull/8) carries server-only Core observation transport and shared v1 contract fixtures | Adapter is disabled by default and not wired to demo/API endpoints. README states the UI can fall back to deterministic demo data when its API is unavailable. No live telemetry or tenant service identity evidenced | Verify API mode and provenance labels in deployed UI; register exact site/source/asset and service identity; run private gateway ingestion and readback tests |
| NeoCell / NOVA Infrastructure | Sensors, gateways, edge, communications, power/water infrastructure and digital-twin synchronization | Draft [NeoCell #9](https://github.com/wisemaiarservices-debug/neocell-platform/pull/9) carries server-only Core observation transport and shared v1 contract fixtures; [#6](https://github.com/wisemaiarservices-debug/neocell-platform/pull/6) removes unsupported readiness claims and keeps missing inputs unknown | Adapter is disabled by default and not wired to demo runtime. API health is process reachability only; no live device telemetry or verified gateway/sensor state is evidenced | Verify real gateway/device identity, calibration and provenance; register Core source/mapping/grant; prove telemetry freshness and revocation behavior in isolated staging |
| NOVA FieldOps | Human-reviewed agricultural robot mission planning and structured safe outputs | Repository describes it as an extension of NOVA OS/NeoAgro; no verified Core telemetry/mission integration evidence was established in this audit | Product preview/PoC workflow; human approval required; no autonomous physical execution or partner field integration claimed | Define Core context contract and FieldOps mission/audit handoff; ensure no direct device execution, require operator approval and validate role/scope/replay controls |
| NOVA OS Operator Workspace / Engineering Console | Operating layer, governed workflows, role-aware operations and engineering administration | Private [NOVA OS #66](https://github.com/wisemaiarservices-debug/NovaOS/pull/66) and subsequent assessment transport/recovery PRs implement client workflows against simulated gateway contracts | Browser tests validate client behavior with simulated gateway; they do not prove live Access/private Worker connectivity or deployed private NOVA OS app | Verify private gateway origin, Access/CORS, deployed private application revision and real two-tenant staging E2E |
| NOVA Command Center | Ecosystem-level navigation and command view | Separate root repository and Vercel project; no Core tenant-operation contract was verified in this pass | Production deployment exists, but this audit did not establish authenticated live operational data | Audit its API calls, role/scope handling, data provenance and links to each product; label static/demo summaries honestly |
| Public website | Public presentation and navigation only | Website repository; not Core and not the authoritative NOVA OS runtime | Production and preview deployment identities are separate; website-hosted /os and /console preview routes do not certify private OS runtime | Keep website limited to public information and navigation; link to each separately released product and console |

### Cross-product integration rules

1. NOVA Core owns tenant, site, asset, source, mapping, calibration, policy, authorization, provenance, durable command and audit truth. Product modules must not create competing shadow registries or assign tenant ownership from browser input.
2. Product observation adapters are transport helpers until an authenticated producer is explicitly wired, enabled and authorized. NOVA_CORE_INGESTION_ENABLED=false remains the safe default; no demo/fallback fixture may be forwarded as real telemetry.
3. The public Core API URL is not a substitute for the private Access gateway. Do not expose the private tenant API or put service credentials in browser bundles or Vercel public variables.
4. Preserve per-field missing/unknown/unverified states. API health means process reachability; it does not prove device, gateway, sensor, calibration or telemetry health.
5. Cross-product workflows must carry exact tenant/site/asset scope and provenance. Recommendations remain advisory and require authorized human approval before physical or infrastructure actions.
6. A module's CI/build validates that repository only. Whole-ecosystem readiness requires exact-revision compatibility checks and controlled synthetic two-tenant staging across Core, gateway, NOVA OS consoles and all enabled modules.

### Immediate work order

- First: finish Core private gateway deployment evidence and independent security review; do not activate producers while Access, secrets, D1, routes and exact-origin CORS are unverified.
- Second: complete NeoAgro/NeoGrid/NeoCell source-registration and provider/device identity contracts; keep adapters disabled until real identities and grants exist.
- Third: audit FieldOps and Command Center integration contracts separately; do not assume they inherit NOVA OS authorization merely because they share product branding.
- Fourth: connect the private NOVA OS application and consoles to the verified gateway, then execute the 18-scenario two-tenant staging plan.
- Fifth: only after all gates pass, make a separately reviewed deployment decision for each product and for the ecosystem.

No live provider credentials, device telemetry, customer data, database changes, Cloudflare secrets/policies, environment writes, deployments or paid resources were used for this source/PR audit.

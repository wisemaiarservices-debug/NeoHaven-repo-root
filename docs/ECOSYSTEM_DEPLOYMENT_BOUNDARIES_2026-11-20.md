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

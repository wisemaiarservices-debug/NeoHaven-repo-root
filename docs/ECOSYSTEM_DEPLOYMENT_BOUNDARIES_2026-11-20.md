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

The following rows come from the current Vercel project and deployment metadata read on 2026-11-20. **READY** means Vercel finished building that revision. `target: null` means the deployment metadata does not identify it as a production deployment; its alias is a branch-specific preview URL. Project domains listed in project settings must not be mistaken for aliases assigned to the latest deployment.

| Vercel project | Linked Git repository | Latest observed deployment | Git ref / commit | Deployment target |
|---|---|---|---|---|
| `neoagro` | `neoagro-platform` | READY — [preview](https://neoagro-git-fix-neoagro-core-ingest-876540-neo-haven-urban-labs.vercel.app) | `fix/neoagro-core-ingestion-host-allowlist` / `8a376177026235c4d80aee7b619ae831c5effa8e` | Preview (`target: null`) |
| `neogrid` | `neogrid-platform` | READY — [preview](https://neogrid-git-feat-neogrid-core-inges-f4b6b5-neo-haven-urban-labs.vercel.app) | `feat/neogrid-core-ingestion-current-provenance` / `72bdd31e68dbd3a9c06c6ec2b7900eb5e8cab1c7` | Preview (`target: null`) |
| `neocell` | `neocell-platform` | READY — [preview](https://neocell-git-feat-neocell-core-inges-6c05bd-neo-haven-urban-labs.vercel.app) | `feat/neocell-core-ingestion-current-provenance` / `875abfc43240d872bcafd558fce464e78d5a1802` | Preview (`target: null`) |
| `nova-command-center` | `NeoHaven-repo-root` | READY — [preview](https://nova-command-center-git-docs-ecosys-6e30c4-neo-haven-urban-labs.vercel.app) | `docs/ecosystem-deployment-boundaries-v1` / `48264e84d096c2bff16cf7f517ba25b238e47e12` | Preview (`target: null`) |
| `nova-fieldops` | `nova-fieldops` | READY — [production deployment](https://nova-fieldops-o8d8wfuk5-neo-haven-urban-labs.vercel.app) | `main` / `92e2bc25f621bc1b23a7399afaecd646596f2f6d` | Production |
| `nova-os` | `neohaven-nova-os-website` | READY — [preview](https://nova-os-git-docs-nova-os-gateway-en-d178c7-neo-haven-urban-labs.vercel.app) | `docs/nova-os-gateway-env-inventory-v1` / `13f2f030d2d936854a9ebc4401bcf86f4e84e97a` | Preview (`target: null`) |
| `neohaven-nova-os-website` | `neohaven-nova-os-website` | READY — [preview](https://neohaven-nova-os-website-git-docs-n-c341db-neo-haven-urban-labs.vercel.app) | `docs/nova-os-gateway-env-inventory-v1` / `13f2f030d2d936854a9ebc4401bcf86f4e84e97a` | Preview (`target: null`) |

Important production/preview distinction:

- Vercel project metadata reports `live: false` for all seven projects in this inspection. Do not interpret that field alone as proof a deployment is broken; it is not a substitute for deployment target, domain alias and runtime checks.
- Six latest deployments above have `target: null` and only branch-preview aliases. Only FieldOps' latest deployment explicitly has `target: production` and the three listed aliases.
- The `nova-os` project has the domain `nova-os-pied.vercel.app` attached at project level, but the latest deployment inspected is a preview on the documentation branch. Prior audit evidence says the production alias was still on the older website-only `main` revision `2951ef88be4a285e6076f629c71a8e4e20aec667`. Do not infer that the current preview has replaced that production deployment.
- The `nova-os` Vercel project is linked to the public website repository, not the private `NovaOS` repository. The private repository's CI and source code are separate evidence.
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

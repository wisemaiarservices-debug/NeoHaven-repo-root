# NeoHaven ecosystem deployment boundaries and inventory

Checked: 2026-11-20
Purpose: distinguish the shared platform, product applications, consoles, public website and hosting responsibilities. This is an evidence snapshot, not a production-readiness certification.

## Architecture boundaries

| Layer | Repository / service | Responsibility | Hosting evidence |
|---|---|---|---|
| Shared intelligence and governance | `nova-core` | Shared multi-tenant foundation, data model, governed evidence workflows, APIs and intelligence used by all NOVA modules | Core API Worker at `https://nova-core-api.neohaven.workers.dev`; this is not a Vercel website project |
| NOVA OS application and operator/engineering surfaces | Private `NovaOS` repository; website repository currently also contains the reviewed `/os` and `/console` route implementation | Operator Workspace, Engineering Console, governed workflows and module navigation | A Vercel preview exists for the website feature branch. The production `nova-os` project is linked to the separate website repository, not the private `NovaOS` repository |
| NeoAgro | `neoagro-platform` | Agriculture/agrivoltaics product UI and module | Separate Vercel project and READY production deployment |
| NeoGrid | `neogrid-platform` | Energy product UI and module | Separate Vercel project and READY production deployment |
| NeoCell | `neocell-platform` | Infrastructure/edge product UI and module | Separate Vercel project and READY production deployment |
| NOVA Command Center | `NeoHaven-repo-root` | Ecosystem/customer-facing command center | Separate Vercel project and READY production deployment |
| NOVA FieldOps | `nova-fieldops` | Field operations product surface | Separate Vercel project and READY production deployment |
| Public marketing/presentation website | `neohaven-nova-os-website` | Public-facing website and presentation surface; not the entire product ecosystem | Separate Vercel project(s), including `nova-os` and `neohaven-nova-os-website` |

NOVA Core is the shared platform foundation. NeoAgro, NeoGrid and NeoCell are connected product modules. NOVA OS is the application/operating layer that connects shared Core capabilities and module workflows. The website is only a presentation/application surface; it is not a substitute for Core or the product repositories.

## Vercel project inventory

Team: `NeoHavenUrbanLabs`. The connected Vercel team reports the Hobby plan. No upgrade or paid resource is authorized by this inventory.

| Vercel project | Linked Git repository | Latest production deployment record | Commit |
|---|---|---|---|
| `neoagro` | `neoagro-platform` | READY — [deployment](https://neoagro-1xo0l9yif-neo-haven-urban-labs.vercel.app) | `d86a367fb364d16e45a0debe921fc0128183dd08` |
| `neogrid` | `neogrid-platform` | READY — [deployment](https://neogrid-k9now1nqc-neo-haven-urban-labs.vercel.app) | `e829e7124b424ddf0028b37affcf50d6c48e41ef` |
| `neocell` | `neocell-platform` | READY — [deployment](https://neocell-kc1bqu90c-neo-haven-urban-labs.vercel.app) | `92803df9189e31418a326beedbd59a952b118181` |
| `nova-command-center` | `NeoHaven-repo-root` | READY — [deployment](https://nova-command-center-4d3pi8wz7-neo-haven-urban-labs.vercel.app) | `efd90880c3eb3a5cadb47ae652caadf02b185983` |
| `nova-fieldops` | `nova-fieldops` | READY — [deployment](https://nova-fieldops-o8d8wfuk5-neo-haven-urban-labs.vercel.app) | `92e2bc25f621bc1b23a7399afaecd646596f2f6d` |
| `nova-os` | `neohaven-nova-os-website` | READY — [deployment](https://nova-ekeyzxn7g-neo-haven-urban-labs.vercel.app) | `2951ef88be4a285e6076f629c71a8e4e20aec667` |
| `neohaven-nova-os-website` | `neohaven-nova-os-website` | Project linked; separate from product projects | Deployment history should be reviewed independently |

A READY Vercel deployment proves the frontend deployment completed. It does not prove Core connectivity, live data, tenant isolation, authorization, end-to-end workflows, or operational readiness.

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
- Do not replace the private gateway with the public Core API, expose the private API publicly, or infer that the entire ecosystem is blocked because the website has no gateway variable.

## NOVA OS consoles and preview

The reviewed website feature preview exposes `/os` (Operator Workspace) and `/console` (Engineering Console). Those route checks establish the presence of the preview UI only. They do not make the public website the source of truth for the separate Core service or NeoAgro/NeoGrid/NeoCell product applications.

The older production `nova-os` deployment is linked to `neohaven-nova-os-website` at the commit listed above. It must not be confused with the newer feature-branch preview or the private `NovaOS` repository.

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

# NOVA Core Product Adapter Conformance Gates v1

**Status:** implementation and local-test evidence only; no product caller is authorized for live ingestion.

## Purpose and architecture boundary

NOVA Core owns shared identity, tenant/site/source ownership, source lifecycle, observation persistence, idempotency, audit, and verification state. NOVA OS owns the operating and governance layer that connects Core to product workflows. NeoAgro, NeoGrid, and NeoCell remain separate product experiences with separate module identities and domain-specific acquisition paths.

These adapters are server-side transport helpers. They are not the product itself, do not create a browser-facing ingestion route, and do not replace NOVA Core authorization. The public read-only Core API is not the private tenant-ingestion gateway.

## Shared observation contract

The canonical v1 fixture is maintained in the NOVA Core repository at:

- `apps/api/tests/fixtures/nova-core-observation-v1.json` (Core PR #296)
- NeoAgro: `apps/api/tests/fixtures/nova-core-observation-v1.json` (adapter PR #18)
- NeoGrid: `service/tests/fixtures/nova-core-observation-v1.json` (adapter PR #6)
- NeoCell: `runtime/tests/fixtures/nova-core-observation-v1.json` (adapter PR #7)

The four fixture copies were compared during this review and have the same v1 base payload and accepted/rejected case matrix. Each adapter test substitutes only its own expected `module` value before running the shared cases.

The envelope validates identifiers, module, metric, numeric value, unit, timestamp, provenance, and quality flags. Client-supplied verification, actor, or other server-owned trust fields are not part of the accepted envelope. Contract validation proves payload shape only; it does not prove that a tenant, site, asset, source, or caller is authorized.

## Product-specific adapter boundaries

| Product | Module identity | Server-side helper | Endpoint pin |
|---|---|---|---|
| NeoAgro | `neoagro` | `apps/api/services/nova_core_ingestion.py` | Comma-separated exact hostname allowlist; HTTPS, port 443, exact observation path; rejects public worker, Pages, and preview hosts |
| NeoGrid | `neogrid` | `service/nova_core_ingestion.py` | Exact configured lowercase hostname; HTTPS, port 443, exact observation path; rejects workers.dev, workers.dev.pub, vercel.app, and pages.dev suffixes |
| NeoCell | `neocell` | `runtime/nova_core_ingestion.py` | Exact configured DNS hostname; validates DNS syntax, exact URL-host match, HTTPS, port 443, exact observation path; rejects public worker, Vercel, and Pages hosts |

All three helpers require explicit `NOVA_CORE_INGESTION_ENABLED=true`, server-side Cloudflare Access service-token credentials, bounded request/response sizes, and fail-closed handling. Keep the opt-in false until every activation gate below has independent evidence. Never put service-token credentials in browser bundles, client-visible environment variables, logs, fixtures, or source control.

The different host configuration variable names and shapes are intentional implementation differences; do not assume one product's environment template can be copied unchanged into another.

## Source authorization and observation verification

The Core source registry is authoritative:

1. A newly registered source starts `unverified`.
2. An independently assigned reviewer must complete the governed source-verification lifecycle.
3. Only an active, verified source with the exact module and permitted global/site scope may submit.
4. Tenant, site, optional asset, source, service identity, and module ownership are resolved and checked by Core on the server.
5. The service-token grant alone never verifies a source.
6. Every newly persisted observation is assigned `verification_status='unverified'`. Source authorization is not scientific verification of each measurement.

A product adapter must not infer verification from a successful HTTP response, a configured secret, a device being online, a valid schema, or a successful fixture test. It must not add caller-controlled `verified`, actor, tenant authority, or trust fields to the observation envelope.

Core PR #305 corrects the design/runbook wording to require verified sources and the complete ordered D1 migration chain. Core PR #303 contains local disposable-D1 lifecycle tests for dual identity, source/site ownership, approvals, revocation and concurrency. These are local test results, not live Cloudflare, Supabase, or remote-D1 evidence.

## Acceptance matrix before any caller is enabled

| Gate | Required evidence | Current interpretation |
|---|---|---|
| Contract parity | Each product runs the canonical fixture matrix and rejects invalid payloads before network I/O | Local adapter test coverage exists in the adapter PRs; fixture copies were compared in this review |
| Product identity | Adapter fixes its own module identity and cannot submit as another product | Expected-module checks exist in the reviewed adapter implementations |
| Server-only credentials | Secrets are read only by trusted server processes; no browser route or client bundle exposure | Helper design is server-side; deployed environment exposure has not been independently audited |
| Destination pinning | Dedicated Access-protected hostname, exact host pin, HTTPS/443, exact path; public/preview hosts rejected | Host-hardening changes are represented in NeoAgro PR #28, NeoGrid PR #11, and NeoCell PR #11 |
| Source lifecycle | Unverified/rejected/revoked/disabled sources fail closed; only active verified and correctly scoped sources can ingest | Core local lifecycle tests exist; remote registry state is not verified |
| Tenant and asset ownership | Cross-tenant/site source or asset attempts are denied by Core | Local disposable-D1 coverage exists; no remote isolation evidence |
| Persistence and idempotency | One observation plus one audit event; identical retry returns original; changed payload under same key conflicts | Local disposable-D1 concurrency and rollback coverage exists in Core |
| Runtime deployment | Dedicated private Worker, Access policy, service binding, secrets, D1 schema and migration ledger match exact reviewed SHA | Not established by source tests or Vercel READY status |
| Product-to-Core E2E | Synthetic staging caller proves Access identity → Core ownership → persisted unverified observation → audit → retry/conflict | Not yet evidenced in a controlled remote staging environment |
| Operational controls | Rollback, monitoring, quota checks, rate limits and human review are verified | Not yet evidenced as a complete live operational control set |

## Current change/review references

- Core canonical contract and shared fixture: [PR #296](https://github.com/wisemaiarservices-debug/nova-core/pull/296)
- Core source-verification, migration and runbook correction: [PR #305](https://github.com/wisemaiarservices-debug/nova-core/pull/305)
- Core local dual-identity and lifecycle test path: [PR #303](https://github.com/wisemaiarservices-debug/nova-core/pull/303)
- NeoAgro transport helper / fixture tests: [PR #18](https://github.com/wisemaiarservices-debug/neoagro-platform/pull/18); endpoint pin hardening: [PR #28](https://github.com/wisemaiarservices-debug/neoagro-platform/pull/28)
- NeoGrid transport helper / fixture tests: [PR #6](https://github.com/wisemaiarservices-debug/neogrid-platform/pull/6); endpoint pin hardening: [PR #11](https://github.com/wisemaiarservices-debug/neogrid-platform/pull/11)
- NeoCell transport helper / fixture tests: [PR #7](https://github.com/wisemaiarservices-debug/neocell-platform/pull/7); endpoint pin hardening: [PR #11](https://github.com/wisemaiarservices-debug/neocell-platform/pull/11)

These references are draft implementation work and must be reviewed in dependency order. Do not merge a stacked PR independently of its required base.



## Product workflow call-site audit (2026-11-20)

The transport-helper PRs are not themselves proof that a product workflow invokes the helpers. The reviewed adapter PR changed-file inventories are:

- NeoAgro PR #18: helper, fixture, helper tests, environment example, CI and adapter documentation.
- NeoGrid PR #6: helper, fixture, helper tests, environment example and adapter documentation.
- NeoCell PR #7: helper, fixture, helper tests, environment example and adapter documentation.

None of these adapter PR diffs includes a product workflow, telemetry acquisition job, device/site registration flow, scheduler, or API route that calls `submit_observation`. This bounded finding means **call-site wiring is not established by these PRs**. It does not prove that no call site exists elsewhere in the full repositories; a complete repository-wide search and review of each current default branch and relevant feature branch is still required.

Until that review identifies and tests a real server-side producer:
- Treat each helper as an isolated, opt-in transport capability, not an active product integration.
- Do not set `NOVA_CORE_INGESTION_ENABLED=true` in any environment.
- Do not invent source IDs, tenant/site IDs, sensor identities, or calibration values to make a call succeed.
- A future call site must obtain source identity from the governed source registry, derive module identity from its product server configuration, validate the product-specific acquisition record, and invoke the helper only from a trusted server process.
- The call site must preserve the real measurement's timestamp, unit, method, quality flags and provenance; missing or uncertain fields remain explicitly unknown and must fail contract validation where required.
- Add call-site tests proving no network request occurs for disabled configuration, malformed/unknown provenance, or invalid contract data; prove that credentials and tenant authority are never accepted from browser input.
- Test that a Core 403 for an unverified, revoked, inactive, wrong-module or cross-tenant source is surfaced as a denied ingestion result, never converted into a successful local status or demo fallback.

The code-search connector returned no indexed matches for the helper symbol or opt-in variable during this review. Because repository code-search indexing may be incomplete and branch-scoped, that result is not treated as proof of absence. The changed-file inventory above is the concrete evidence for the bounded conclusion.


## Explicit non-claims and activation hold

This document does not establish that the adapters are deployed, that a live private gateway or Access policy exists, that credentials are provisioned, that remote D1 migrations have run, or that any real source has been verified. It does not authorize production or staging ingestion.

No live API calls, customer data, secrets, Cloudflare configuration, Supabase policies, D1 migrations, deployments, paid resources, or billing changes were used or changed for this review.
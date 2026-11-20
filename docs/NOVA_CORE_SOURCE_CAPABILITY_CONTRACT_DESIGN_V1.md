# NOVA Core Source Capability Contract and Enforcement Design v1

**Status:** design proposal only. Not implemented, not migrated, and not authorized for staging or production. It builds on the existing source registry lifecycle described in `NOVA_CORE_SOURCE_REGISTRY_PRODUCT_CONFORMANCE_REVIEW_V1.md`.

## 1. Problem and security invariant

The current ingestion path validates the shared observation envelope, authenticates the workload, resolves tenant/site/asset ownership, checks the source's verified lifecycle state and matching product module, and persists the observation as `unverified`.

The current source registration record does not provide a typed metric/unit capability allowlist. Therefore, a verified source could be structurally associated with a product module without the reviewed registry contract proving that the source is authorized to emit a particular metric and unit.

**Required invariant:** an observation may be persisted only when the registered source has an active, independently reviewed capability for the exact product module, metric identifier, unit and applicable scope, and the capability is valid at the persistence boundary.

A syntactically valid payload or a service grant alone must never confer measurement capability.

## 2. Capability record (proposed logical model)

A source may have multiple versioned capability records. Each capability is immutable after submission; changes create a successor version and an append-only lifecycle event.

| Field | Meaning |
|---|---|
| capability_id | Core-generated stable identifier |
| source_id | Existing Core source record |
| tenant_id / site_id | Server-resolved source ownership scope |
| asset_id | Optional exact asset scope; null only for genuinely site-scoped capability |
| module | Fixed product module inherited from the registered source |
| metric | Canonical metric key |
| measurement_kind | Explicit physical/derived measurement classification |
| unit | Exact canonical unit accepted at ingestion |
| quantity_semantics | Definition of what the number represents |
| allowed_min / allowed_max | Optional engineering bounds with documented rationale; not automatic clamping |
| sampling_contract | Expected interval/event model and maximum staleness policy |
| timestamp_contract | Source event-time, timezone and clock requirements |
| quality_contract | Allowed quality flags and missing/stale/offline interpretation |
| calibration_profile_ref | Controlled evidence reference and validity interval, where applicable |
| acquisition_protocol | Versioned protocol/API/connector type |
| provider_data_rights_ref | Controlled license/rights/privacy evidence reference |
| evidence_ref | Independent evidence package reference |
| version / supersedes | Immutable version chain |
| status | draft, in_review, active, rejected, suspended or revoked |
| reviewed_by / reviewed_at | Independent reviewer identity and decision timestamp |

The logical model is not a claim that these fields or statuses exist in the current Core database. Secrets and raw personal/customer data must never be stored in the registry or repository; references point to controlled evidence stores.

## 3. Review and lifecycle

1. A tenant owner/admin proposes a capability for an already registered source.
2. Core resolves tenant, site, source, module and optional asset from stored records; callers cannot assert authority by supplying identifiers.
3. An independently assigned reviewer, distinct from the proposer, reviews physical/provider evidence, metric definition, units, sampling, timestamps, calibration, data rights and scope.
4. Approval activates a specific immutable capability version. Rejection, suspension or revocation is append-only and audited.
5. A changed metric, unit, calibration basis, protocol, device identity, asset scope or rights grant creates a new version and review. It must not silently mutate an active capability.
6. A source revoked or disabled by the existing source lifecycle cannot ingest even if an old capability remains active.
7. A newly persisted observation remains `unverified`; capability approval authorizes the source/measurement form, not the truth of each reading.

Reviewer assignment and commit-time authorization must be rechecked in the same way as the existing source lifecycle. The source registrant must not approve their own capability.

## 4. Ingestion enforcement

The existing ingestion Worker should perform an early capability lookup for clear errors, but that lookup is not sufficient on its own. A database insert guard or atomic persistence operation must re-check, at commit time:

- source is still verified and enabled;
- tenant and site are active and match the source;
- source module equals the fixed server-side module;
- capability is active and belongs to that exact source, tenant, site and module;
- metric and unit match exactly;
- asset scope matches (or the capability is explicitly site-scoped);
- event time satisfies the capability's timestamp policy;
- measurement kind and quantity semantics are not caller-overridable;
- capability version has not been suspended, revoked or superseded for new ingestion;
- any applicable calibration profile is valid at the observation event time.

A concurrent revocation/suspension must win or cause the insert to fail closed. Do not trust a prior HTTP lookup if the registry can change before the D1 write.

The accepted observation envelope should include a server-assigned `capability_id` and `capability_version` for traceability, or store an immutable relation to them. The caller must not choose the capability identifier. Keep the original raw value/unit/time; do not clamp, smooth, interpolate or silently convert. If normalization is required, use a separately versioned deterministic conversion with both original and normalized values preserved.

## 5. Product-specific semantic examples

### NeoAgro

- Soil moisture volumetric water content (for example, `m3/m3`) is not interchangeable with soil water tension.
- Rainfall depth, instantaneous flow rate and cumulative irrigation volume are distinct metrics.
- Soil/field readings require a reviewed field/site/asset mapping and geometry version where spatial interpretation depends on geometry.
- Weather provider forecasts and crop/yield estimates are derived products, not raw sensor observations.

### NeoGrid

- Active power (`kW`) and energy (`kWh`) are different quantities.
- Import and export direction, phase, CT/PT scaling and interval/cumulative meter semantics must be explicit.
- Battery state-of-charge is not battery energy capacity or charge/discharge power.
- Carbon intensity requires an evidenced grid zone, provider, unit and effective interval; calculated avoided emissions are derived outputs.

### NeoCell

- Device telemetry must be bound to stable hardware identity, gateway ancestry, firmware and exact node/asset scope.
- Measurement event time, gateway receive time and Core ingest time remain distinct.
- Battery voltage, battery state-of-charge, gateway heartbeat and API health are not interchangeable.
- Composite readiness/health scores are derived assessments, not raw device measurements.

## 6. Required test matrix

Before implementation is considered complete, add unit, migration and local-D1 integration tests for:

- unregistered, unverified, rejected, revoked and disabled source;
- verified source with no capability;
- wrong source, tenant, site, asset, module, metric or unit;
- metric alias, case variation, whitespace and unsupported unit;
- capability draft, expired, suspended, revoked or superseded;
- calibration not yet valid, expired or missing when required;
- stale, future, timezone-free or malformed source timestamps;
- unauthorized quality flags and missing/offline semantics;
- concurrent capability revocation against observation insertion;
- concurrent identical retries and conflicting idempotency-key payloads;
- audit failure rollback;
- cross-tenant and cross-site capability references;
- proof that frontend fixtures, demo defaults, forecasts, recommendations and health probes cannot enter the ingestion path.

Tests must use synthetic local data and disposable local D1. A remote staging run requires separate authorization and all private gateway, Access, D1, migration and tenant-isolation prerequisites.

## 7. Migration and compatibility approach

- Preserve the existing source registry and source lifecycle as the identity/verification foundation.
- Introduce additive capability tables and append-only events; avoid overloading free-form `metadata_json` as an authorization policy.
- Add capability IDs/version to persisted observation provenance only through server-derived values.
- Make the persistence guard reject observations without an active matching capability. Do not silently grandfather arbitrary metrics.
- Existing source records remain non-ingestible until their capability evidence is reviewed and registered.
- Provide a read-only inventory/report to identify sources lacking capabilities before any migration is proposed.
- Require ordered migration tests, rollback analysis, backup/restore plan, exact-SHA CI and independent security review.

## 8. Release boundary

This document changes no runtime code, schema, migrations, source records, secrets, environment variables, Cloudflare/Supabase settings, databases, deployments, live devices, customer data or billing. It does not authorize source registration, capability activation, connector execution, staging or production ingestion.

**Decision:** retain current source lifecycle controls; treat typed capability registration and commit-time enforcement as a required design/implementation gate before any NeoAgro, NeoGrid or NeoCell producer can be enabled.

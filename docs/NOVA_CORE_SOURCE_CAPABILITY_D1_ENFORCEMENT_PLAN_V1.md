# NOVA Core Source Capability — D1 Enforcement and Migration Plan v1

**Status:** implementation planning only. This is not executable SQL and does not authorize a migration. It is grounded in the reviewed Core candidate migrations `0029_tenant_source_registry_lifecycle.sql` and `0035_observation_ingestion_requires_verified_source.sql`, and the current ingestion persistence helper.

## 1. Existing enforcement points

The current candidate implementation has three relevant layers:

1. The ingestion Worker resolves the active site, source tenant/module/verification state, optional asset ownership and site scope in `observation-ownership.mjs`.
2. `persistObservation` inserts the observation and audit event in one D1 batch, derives tenant ownership server-side, and persists verification as `unverified`.
3. Migration 0035 installs a `BEFORE INSERT` trigger on `observations` that re-checks active tenant/site and matching verified source at the database write boundary, closing the source-revocation race between the Worker lookup and insert.

Capability enforcement must extend this same final database boundary. A Worker-only capability lookup would reintroduce a time-of-check/time-of-use gap.

## 2. Proposed additive schema (conceptual, not SQL)

Use dedicated normalized tables rather than treating `sources.metadata_json` as an authorization policy.

### `source_capabilities`

- Core-generated `id`, `source_id`, `tenant_id`, `site_id`, nullable `asset_id`.
- `module`, canonical `metric`, exact canonical `unit`, `measurement_kind`, `quantity_semantics`.
- Sampling and timestamp policy fields with explicit units and bounded values.
- Quality policy reference or constrained JSON schema/version; avoid arbitrary executable expressions.
- Calibration profile reference and validity interval where required.
- Acquisition protocol identifier/version and controlled evidence references for hardware, provider and data rights.
- Immutable `version`, optional `supersedes_id`, lifecycle `status`, proposer and review metadata.
- Unique version identity per source and metric/unit/scope; foreign keys with `ON DELETE RESTRICT`.

### `source_capability_events`

- Append-only event ID, capability ID, tenant/site/source, actor, event type, evidence reference, reason, request ID and timestamp.
- Unique request/idempotency identity and immutable update/delete guards.
- Events for proposed, submitted, activated, rejected, suspended, revoked and superseded states.
- Database guards require an active tenant owner/admin for proposal and an independently assigned, active reviewer for decision; proposer cannot review own capability.

### Observation provenance

Persist server-derived `capability_id` and `capability_version` with each accepted observation (either additive observation columns or an immutable relation). Callers cannot choose these values. Existing observations must not be retroactively assigned capabilities.

## 3. Scope and relational integrity

- Resolve tenant from the existing source/site records; do not accept caller-provided tenant authority.
- Require capability tenant and source to match the source row.
- Require capability module to equal the source's fixed module.
- Require capability site to match the observation site. If source-wide/site-wide capabilities are needed, model that scope explicitly and test it; do not overload NULL ambiguously.
- Require optional capability asset scope to match the observation asset. A site-scoped capability may apply to assets only if the contract explicitly permits that behavior.
- Reject cross-tenant, cross-site, wrong-module, inactive-asset and disabled-source references.
- Avoid cascading deletes for identity, review and evidence history.

## 4. Commit-time observation guard

Extend the existing migration 0035 trigger (or replace it in a reviewed additive migration) so the observation insert succeeds only if there exists a capability satisfying all of the following at the instant of insertion:

- capability is active and not expired, suspended, revoked or superseded for new observations;
- source remains verified and enabled;
- tenant and site remain active and correctly related;
- source, capability and observation share exact tenant/site/module/source scope;
- exact metric and unit match;
- optional asset scope is compatible;
- observation event time satisfies timestamp and capability-validity policy;
- any mandatory calibration profile is valid at the observation event time;
- quality/sampling contract is met by values that can be deterministically validated at this layer.

Do not implement a generic JSON expression evaluator inside SQLite. Keep policy fields typed and validation bounded. Complex scientific validation remains a separate reviewed assessment workflow and does not change the initial `unverified` observation status.

A concurrent revoke/suspend/expire must prevent later inserts. Tests must execute the competing writes against disposable local D1 and prove deterministic outcomes.

## 5. Worker changes required after schema review

- Capability lookup returns the exact matching active capability and server-derived version.
- Validate payload semantics and policy before attempting persistence; return typed fail-closed errors for no capability, wrong unit/metric, stale timestamp or invalid calibration.
- Include the server-derived capability ID/version in the persistence operation.
- Keep the final D1 trigger authoritative; map trigger denials to safe, stable API errors without leaking cross-tenant record existence.
- Preserve idempotency behavior. Identical retries must return the original accepted observation; conflicting payload reuse must return conflict.
- Keep observation verification `unverified`; do not promote it merely because source/capability lifecycle passed.

## 6. Ordered migration and compatibility gates

1. Inventory current source rows, module values, site scope, and existing observations read-only in a disposable local database. Do not infer capability values from historic observations.
2. Define canonical metric/unit registries for NeoAgro, NeoGrid and NeoCell with product-owner sign-off. Keep unknown metrics out.
3. Review source-capability evidence and lifecycle state machine with an independent security reviewer.
4. Add capability schema and immutable lifecycle tests.
5. Extend observation persistence guard and provenance fields in an additive migration.
6. Add Worker validation and deterministic error mapping.
7. Run full ordered migration chain from the exact base SHA on disposable local D1, including existing migrations through 0041 where applicable to the selected Core candidate.
8. Run concurrency, tenant isolation, revocation race, idempotency, rollback, audit failure and malformed policy tests.
9. Run exact-head CI and production build. Require independent review and documented rollback.
10. Only after separate authority and infrastructure gates may controlled staging be considered. No production ingestion activation follows automatically.

No default capability should be created for existing sources. Until a source has independently approved capability evidence, ingestion for that source remains denied.

## 7. Required product-owner evidence before schema freeze

For every proposed metric, product owners must supply:
- real source/device/provider identity and accountable owner;
- exact tenant/site/asset/field mapping;
- canonical metric and physical quantity definition;
- unit, scaling, direction, interval/cumulative semantics;
- acquisition protocol and connector identity;
- event-time, timezone, sampling, stale/offline and quality rules;
- calibration method, evidence, validity and responsible party;
- provider data rights, privacy, retention and permitted processing;
- evidence reference and independent reviewer.

This intake is separate from Core's source registration. A registry source can exist and remain unverified; a verified source can still have no authorized capabilities.

## 8. Explicit non-actions

This plan does not add code, schema, migrations, registry entries, capability rows, secrets, environment variables, Cloudflare/Supabase configuration, D1 state, live device/provider connections, deployments or paid resources. It does not authorize staging or production tests. All product ingestion remains disabled until every preceding gate is evidenced.

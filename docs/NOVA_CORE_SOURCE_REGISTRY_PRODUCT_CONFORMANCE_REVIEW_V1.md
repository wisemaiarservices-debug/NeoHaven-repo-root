# NOVA Core Source Registry — Product Conformance Review v1

**Review status:** source-registry implementation found in the current Core candidate branch; this is a source-code and local-test review, not a live deployment or remote database verification.

## 1. Correction to the prior gap statement

The Core candidate does implement a governed tenant/site source registry. It is incorrect to describe the source-registration and independent-verification workflow as wholly absent.

Reviewed implementation at the Core candidate ancestry used by PR #266 (base PR #265 head `97dd69e1823be2012038d57bf7e5f3237f2b6741`):

- `apps/tenant-api/src/source-registry.mjs` implements tenant/site-scoped source registration, reviewer assignment, and independent verify/reject/revoke decisions.
- Migration `0029_tenant_source_registry_lifecycle.sql` adds the source reviewer assignments, append-only source lifecycle events, registration idempotency records, source identity immutability and lifecycle guards.
- Tenant gateway routes map source registration, reviewer assignment/revocation and source verification to private tenant API routes.
- Migration tests and `apps/tenant-api/test/source-registry.test.mjs` exercise the key lifecycle rules.
- Migration `0035_observation_ingestion_requires_verified_source.sql` enforces active tenant/site, matching tenant/module/site scope and verified source at the database insert boundary, closing the source-revocation race.
- The ingestion Worker also resolves tenant ownership from stored site/source/asset rows, requires source verification and module/site match, authorizes the service grant, and persists observations as `unverified`.

This corrects the earlier implication that the registry workflow itself was missing.

## 2. Implemented source lifecycle contract

1. An active tenant owner/admin registers a source against an active site.
2. The source is created as `unverified`; registration does not grant ingestion authority.
3. An active tenant member is assigned as a site-scoped source reviewer by an active owner/admin. The reviewer cannot be the source registrant.
4. The assigned reviewer independently verifies, rejects or revokes the source with an evidence reference. Reject/revoke require a reason.
5. Lifecycle events are append-only; source identity is immutable after lifecycle events exist.
6. Only a verified source with matching tenant, module and allowed site scope can pass the observation persistence guard.
7. Revocation changes source status to disabled and blocks subsequent observation insertion.
8. Successful ingestion still creates an observation with verification status `unverified`; source verification is not scientific verification of every measurement.

Registration uses an idempotency key scoped to tenant, site and actor, and conflicts if the same key is reused with a different request digest.

## 3. Product conformance boundary

The registry provides a shared identity and lifecycle foundation for NeoAgro, NeoGrid and NeoCell through the fixed product module values. It does **not** by itself prove that any real product device/provider is installed, reachable, licensed, calibrated, correctly mapped, or connected.

The current registration request accepts only:
- `module`
- `provider`
- `source_type`
- `display_name`
- optional `license_reference`
- `evidence_ref`

The reviewed registration implementation initializes `endpoint_reference` to NULL and `metadata_json` to an empty object. The registration request does not itself capture or validate a typed acquisition protocol, hardware model/serial, firmware, device capabilities, metric allowlist, unit semantics, sampling/clock behavior, calibration profile, data-rights terms, or a structured site/asset/field mapping.

Those details remain necessary acquisition-governance evidence and must not be silently treated as already enforced by the current source registry.

## 4. Required next conformance work

Before a real product connector is implemented, define and independently review a versioned source-capability contract that binds a registered source to:

- permitted metric identifiers and explicit unit/measurement semantics;
- permitted acquisition method/protocol and trusted connector identity;
- optional asset/field/node scope and parent gateway relationships;
- sampling interval, event-time and clock semantics;
- calibration/validation profile and validity interval where applicable;
- quality/stale/offline behavior;
- provider data rights, retention and privacy constraints;
- evidence references and review/version history.

Then define how the ingestion boundary enforces that contract. A generic `sources.metadata_json` field is not a typed capability guard. Until a capability contract and enforcement test exist, product connectors must not assume that any syntactically valid metric/unit pair is authorized for a given source.

Keep actual source inventory intake separate from Core registry implementation: a proposed inventory record is not a Core source registration, and a registered but unverified source is not ingestible.

## 5. Evidence and deployment boundary

The reviewed code and migration tests are candidate implementation evidence only. They do not prove that the migration chain has been applied to a remote D1 database, that the private Worker/gateway is deployed, or that Cloudflare Access, service grants, secrets, custom hostname and tenant isolation are configured in a live environment.

No remote D1, Cloudflare, Supabase, product device/provider, tenant/customer data, credentials, staging or production environment was accessed or changed during this review. No deployment, migration, paid resource or billing change is authorized by this document.

**Decision:** preserve the existing governed source lifecycle; correct the product integration plan to build on it; add typed per-source capability enforcement as a separate prerequisite; keep product ingestion disabled until actual inventory, rights, connector and release gates are evidenced.

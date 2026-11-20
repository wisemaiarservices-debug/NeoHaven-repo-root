# NOVA Product Source Inventory Register — Intake Template v1

**Status:** unpopulated intake template. No physical source, provider, tenant, site, asset, credential, or connection is asserted by this document.

**Purpose:** collect independently reviewable evidence for real acquisition sources before any NeoAgro, NeoGrid, or NeoCell producer is implemented. This register is an intake artifact, not a source registry and not authorization to connect or ingest.

## 1. Completion rules

- Create one record per physical device, metering point, gateway, authorized data feed, or other independently identifiable acquisition source.
- Do not enter secrets, access tokens, passwords, private keys, customer personal data, or sensitive raw telemetry in this repository.
- Use a controlled evidence location and record only its approved reference/identifier here. Confirm access rights and retention before linking evidence.
- Use `unknown` when a fact has not been established; never infer a value from a demo screen, fixture, schema, product mockup, API health check, or generated forecast.
- A proposed source is not registered, active, verified, calibrated, connected, or approved merely because this template is completed.
- Source registration, lifecycle, ownership, verification and persisted observation status remain NOVA Core responsibilities.
- Do not enable `NOVA_CORE_INGESTION_ENABLED`, provision credentials, connect live equipment, or run staging/production ingestion as part of inventory intake.

## 2. Source record (copy once per candidate source)

| Field | Value / evidence reference |
|---|---|
| Inventory record ID (non-secret) | unknown |
| Product | unknown — NeoAgro / NeoGrid / NeoCell |
| Source class | unknown |
| Source owner / accountable organization | unknown |
| Technical contact / responsible team | unknown |
| Manufacturer / provider | unknown |
| Device, meter, gateway, or feed model | unknown / not applicable |
| Stable physical/provider identity | unknown — do not invent |
| Firmware / API product version | unknown / not applicable |
| Acquisition protocol / API | unknown |
| Authentication method (type only; no secret) | unknown |
| Site and organization association | unknown — must be independently evidenced |
| Asset / field / meter / node association | unknown — must be independently evidenced |
| Parent gateway / upstream source | unknown / not applicable |
| Installation / commissioning status and date | unknown |
| Supported metric keys and definitions | unknown |
| Raw units and measurement semantics | unknown |
| Sampling / interval / heartbeat semantics | unknown |
| Source clock, timezone and timestamp semantics | unknown |
| Expected range and engineering bounds | unknown |
| Quality codes and stale/offline semantics | unknown |
| Calibration / validation method | unknown / not applicable with rationale |
| Calibration evidence reference and validity interval | unknown / not applicable with rationale |
| Raw record provenance and retention reference | unknown |
| Data rights, license, privacy and permitted use | unknown |
| Ownership / site-scope evidence reference | unknown |
| Independent source-verification reviewer | unassigned |
| Core source registry identifier / lifecycle state | not registered / unknown |
| Proposed connector runtime and operating owner | unknown |
| Retry / stable event identity / idempotency method | unknown |
| Failure, monitoring, rate-limit and rollback plan | unknown |
| Evidence links or controlled evidence IDs | none supplied |
| Review decision and date | not reviewed |

## 3. Product-specific evidence prompts

### NeoAgro

For soil probes, identify whether moisture means volumetric water content, tension, or another explicitly defined measurement. For weather sources, capture provider/station identity, location/coverage, sampling interval, publication time and data-use rights. For irrigation, distinguish instantaneous flow from accumulated volume and record meter direction/scaling. Field-level readings require an evidenced field/plot mapping and geometry version. Remote-sensing products must retain provider, collection, spatial/temporal resolution and processing level.

Do not list crop-health scores, recommendations, yield estimates, forecasts, dashboard defaults, or SolarHub demo values as raw sensor sources.

### NeoGrid

For meters, record measurement point, import/export convention, phase, CT/PT ratio or multiplier, interval/cumulative semantics, timezone and calibration evidence. Keep kW distinct from kWh. For PV inverters, identify the actual inverter and measurement channels. For batteries, record the BMS identity and exact meaning of state-of-charge, power and capacity fields. External tariff or carbon-intensity feeds need provider, grid zone, unit, effective interval, publication time and license.

Do not list generated savings, avoided-carbon estimates, forecasts, optimization results, EnergyState defaults, or UI fixtures as raw meter observations.

### NeoCell

For gateways and sensor nodes, record hardware identity, parent-child relationship, site/deployment/asset scope, firmware, device identity method, supported channels, clock source, sampling and heartbeat semantics. Separate measurement time, gateway receive time and Core ingest time. Record freshness thresholds and calibration per measurement channel where applicable.

An API `/health` response is not gateway telemetry. Do not list local readiness values, synthetic battery/latency values, static device cards, or composite health scores as measured device sources.

## 4. Evidence acceptance checklist

A reviewer must be able to verify each applicable item independently:

- [ ] Source physically exists or authorized provider feed is contractually available.
- [ ] Source owner and accountable organization are identified.
- [ ] Stable device/provider identity is evidenced.
- [ ] Organization, tenant, site, and asset scope are evidenced and consistent.
- [ ] Acquisition protocol, authentication model and trusted runtime are documented.
- [ ] Metric definitions, raw units, ranges and sampling semantics are documented.
- [ ] Source timestamp, clock and timezone behavior are documented.
- [ ] Quality, stale/offline and missing-data behavior are documented.
- [ ] Calibration/validation evidence and validity policy are documented, or not-applicable rationale is accepted.
- [ ] Data rights, privacy, retention and permitted use are approved.
- [ ] Independent Core source registration and verification path is defined.
- [ ] Stable event identity and idempotent retry behavior are defined.
- [ ] Connector failure handling, monitoring, rate limits and rollback are reviewed.
- [ ] Synthetic tests prove demo/fallback data cannot enter the acquisition path.
- [ ] Controlled staging evidence is separately authorized and completed before any live activation decision.

## 5. Readiness states

Use only these states in planning documents; they do not replace Core's authoritative source lifecycle:

| State | Meaning |
|---|---|
| `unknown` | Evidence has not been supplied or reviewed. |
| `candidate` | A source has been proposed; existence, rights or scope may still be unverified. |
| `evidence_in_review` | Evidence package is available and assigned for independent review. |
| `blocked` | A required fact, right, identity, scope, calibration or control is missing or failed. |
| `ready_for_connector_design` | Inventory evidence is accepted for design only; no connection or ingestion is authorized. |
| `connector_tested_synthetic` | Connector passes isolated synthetic tests; no live source is implied. |
| `staging_authorized` | Separate written authorization and all staging prerequisites exist. |
| `production_activation_review` | A separate release decision is required; this state is not approval to activate. |

## 6. Product inventory summary (intentionally unpopulated)

| Product | Candidate source records supplied | Evidence reviewed | Core registration verified | Connector producer evidenced | Current status |
|---|---:|---|---|---|---|
| NeoAgro | 0 | no | no | no | blocked — inventory required |
| NeoGrid | 0 | no | no | no | blocked — inventory required |
| NeoCell | 0 | no | no | no | blocked — inventory required |

These zero counts describe this repository review/intake package only. They do not assert that no devices or provider agreements exist outside the inspected project records.

## 7. Change and activation boundary

This register is documentation only. Completing it does not authorize repository runtime changes, credential provisioning, environment changes, source registration, database migrations, Cloudflare/Supabase changes, live API/device access, staging or production ingestion, deployments, paid resources, or billing changes. Those actions require their own verified prerequisites and explicit authorization.

**Next decision:** an accountable product/source owner supplies the actual inventory and controlled evidence references. If no source owner or real source can be evidenced, leave the product blocked and do not build a fabricated producer.


## 8. NOVA Core contract alignment (source-code review)

The reviewed authenticated ingestion handler resolves ownership from Core's database before persistence. Its source lookup is keyed by the submitted `source_id` but verifies the returned source record against Core-owned fields including source ID, tenant, site, product module, and source verification state. The reviewed asset lookup likewise checks asset ID, tenant, site, and asset status. The accepted observation contract carries `site_id`, optional `asset_id`, fixed product `module`, `source_id`, metric, value, unit, event timestamp, provenance, quality flags, and idempotency key. Persisted tenant ownership and observation verification are server-assigned; the worker test asserts the accepted observation is persisted as `unverified`.

Practical intake-to-contract mapping:

| Inventory evidence | Core ingestion role | Rule |
|---|---|---|
| Stable source identity | `source_id` lookup | Must refer to an existing Core source record; a device serial alone is not a Core registration |
| Organization / tenant ownership | Core-resolved `tenant_id` | Never accept tenant authority from browser or product payload |
| Site association | `site_id` plus source ownership check | Must match the registered source's allowed site scope |
| Asset association | optional `asset_id` plus tenant/site check | Omit only when the source/measurement is genuinely site-scoped and Core permits it |
| Product identity | fixed server-side `module` | Product caller cannot select another module |
| Metric and units | `metric`, `value`, `unit` | Must be supported by the source's independently reviewed capabilities and normalization contract |
| Event time | `observed_at` | Preserve source measurement time; do not replace with request time |
| Provenance / quality | `provenance`, `quality_flags` | Must describe acquisition, not generated UI or demo values |
| Retry identity | `idempotency_key` | Stable across retries for the same source event |
| Source trust | Core source verification state | Source must pass Core's active/verified and scope checks; new persisted observation remains `unverified` |

This review confirms the ingestion handler's source/asset ownership checks and observation envelope; it does **not** establish the complete source-registration administrative workflow, all registry columns, or a live registry state. Do not treat this mapping as a substitute for the ordered migration review or Core's authoritative schema. The inventory's owner, model, firmware, protocol, calibration, license, and evidence-reference fields are acquisition/governance metadata and are not asserted to be columns in the observation envelope.

**Implementation consequence:** source inventory review must produce a stable Core source record and independently approved metric/scope evidence before a producer can construct an observation. The product must not invent `source_id`, `tenant_id`, or `site_id` values to make the adapter accept a payload.

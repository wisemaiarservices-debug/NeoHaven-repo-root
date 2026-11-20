# Product Source-Acquisition Contracts v1

**Status:** design specification only. It approves no producer implementation or live source.

**Scope:** define the minimum evidence and data contract required before NeoAgro, NeoGrid, or NeoCell may submit a measurement to NOVA Core. This document does not invent devices, source IDs, tenants, sites, calibrations, vendor APIs, sampling intervals, or field values.

## 1. Architecture and trust boundaries

- A product-specific acquisition connector obtains records from an actually provisioned device, gateway, meter, sensor, or authorized upstream provider.
- The connector runs in a trusted server/edge process. Browser code, dashboard fixtures, demo APIs, user-entered tenant IDs, and UI health probes are not acquisition sources.
- The product adapter validates and normalizes the acquired record, resolves its source through the governed source registry, and submits through the product's server-side NOVA Core adapter.
- NOVA Core remains authoritative for caller identity, tenant/site/asset/source ownership, source lifecycle, persistence, idempotency, audit, and observation verification status.
- NOVA OS provides workflow and governance surfaces; it does not turn a demo dashboard into a source or bypass Core ownership.
- The public read-only Core API is not the private authenticated ingestion gateway.

No product ingestion opt-in may be enabled until the relevant source, connector, gateway, identity, remote deployment, and staging gates have independent evidence.

## 2. Common acquired-record contract

| Field | Requirement |
|---|---|
| Source identity | Stable source identifier obtained from the governed registry; never accepted as caller authority from browser input |
| Product/module | Fixed by trusted product server configuration (neoagro, neogrid, or neocell), not caller input |
| Site and asset scope | Resolved from Core ownership; optional asset only where the registered source scope permits it |
| Metric | Stable, documented metric key with an explicit definition |
| Value | Actual acquired numeric value; never a placeholder, dashboard default, interpolation without disclosure, or silently substituted zero |
| Unit | Explicit canonical unit with a documented conversion from the raw source unit |
| Event time | Original source measurement/event timestamp, including timezone/offset semantics; not request or ingestion time |
| Provenance | Source/vendor/device identity, acquisition method, connector version, and raw-record reference or digest under the applicable retention policy |
| Quality | Source quality/status plus normalization checks; missing, stale, out-of-range, estimated, or invalid data remain distinguishable |
| Calibration | Applicable calibration record/version and validity interval where required; otherwise explicitly not applicable with rationale |
| Idempotency | Stable key derived from source event identity, not a random key generated on each retry |
| Verification | No client trust fields; Core assigns persisted observation verification state |

The exact wire schema is the canonical NOVA Core v1 contract and its shared fixture. Product-specific metadata must not be smuggled into server-owned trust fields. Additional metadata needs a reviewed, versioned contract.

### Required normalization behavior

1. Preserve raw value, raw unit, source timestamp, and source quality in a controlled provenance record.
2. Convert to a canonical unit only through a versioned, tested conversion rule; retain original unit and conversion metadata.
3. Reject malformed timestamps, non-finite values, unsupported units, unknown metric keys, missing required provenance, and values failing documented engineering bounds.
4. Do not clamp, smooth, fill, average, or interpolate silently. A derived value needs a separately versioned derivation with inputs, method, window, and quality state.
5. Distinguish measured, estimated, calculated, forecast, simulated, and manually entered data. Forecasts and recommendations are not raw sensor observations.
6. Preserve stale/offline/gap conditions. Do not convert missing telemetry into zero, healthy, online, or nominal.
7. Retry the same event with the same idempotency key. A changed payload under that key is a conflict, not an overwrite.
8. A successful transport response does not prove scientific validity or mark an observation verified.

## 3. Product-specific acquisition contracts

The source classes below are candidate categories to confirm against actually installed equipment and authorized provider agreements. They are not claims that such sources currently exist or are connected.

### 3.1 NeoAgro — field and agricultural observations

**Candidate source classes**
- Soil probes: soil moisture, soil temperature, and other explicitly supported soil parameters.
- Weather stations or authorized weather feeds: air temperature, humidity, rainfall, wind, and solar radiation.
- Irrigation equipment: flow, pressure, valve/pump state, and water volume where a metering source exists.
- Crop/field observations: only measurements with an identified acquisition method, field/site geometry, time, and provenance. Satellite or remote-sensing products must be labelled as provider/derived observations, not in-situ sensor readings.

**Minimum per-source registration**
- Physical/provider source identity and model/firmware where available.
- Organization and site ownership; field/plot or asset scope where applicable.
- Sensor type, metric capabilities, raw unit, expected range, sampling semantics, and timestamp source.
- Installation location and applicable site/field geometry version.
- Calibration method, certificate/reference, effective dates, and responsible reviewer where calibration is relevant.
- For irrigation meters: meter identity, measurement direction, pulse/scaling configuration, and unit conversion evidence.
- For provider/remote-sensing data: provider, product/collection, spatial and temporal resolution, processing level, acquisition time, and license/data-use constraints.

**Metric-specific checks**
- Soil moisture must declare whether it is volumetric water content, tension, or another measure; these are not interchangeable.
- Rainfall, flow, and cumulative water volume must distinguish rate from accumulated quantity and preserve measurement interval.
- Temperature, humidity, and radiation must use explicit units and sensor method.
- Field/crop metrics must include field/plot scope and observation method. A site-level reading must not be silently assigned to every field.
- Irrigation recommendations, crop-health scores, yield estimates, and forecasts are derived outputs, not raw observations.

**Do not ingest:** SolarHub demo values, fixed fallback state, synthetic field data, UI chart points, or AI-generated estimates as measured observations.

### 3.2 NeoGrid — energy and grid observations

**Candidate source classes**
- Revenue or sub-metering devices: import/export energy and power, with meter direction and interval semantics.
- PV inverter or production meters: AC power/energy and supported irradiance or panel-temperature measurements.
- Battery management systems: state of charge, charge/discharge power, temperature, and health/capacity values only where the device defines them.
- Grid or tariff/carbon-intensity providers: externally sourced values with provider, region, effective interval, and license/provenance.

**Minimum per-source registration**
- Meter/inverter/BMS/provider identity, model, firmware or API product version where available.
- Organization/site/energy-asset ownership and exact asset type.
- Electrical measurement point, phase/connection semantics where relevant, direction convention, CT/PT ratio or meter multiplier where applicable.
- Raw unit, interval/cumulative semantics, timezone and clock source, expected range, and supported metric list.
- Calibration/verification evidence and validity interval for metering instruments where required.
- For external intensity/tariff feeds: provider, geography/grid zone, publication time, effective interval, and data license.

**Metric-specific checks**
- kW (instantaneous power) and kWh (energy over an interval) must not be conflated.
- Import and export remain separate; never infer direction from positive magnitude alone.
- Battery state of charge is a percentage with a declared BMS meaning; it is not energy capacity.
- Carbon intensity must identify provider, geography, unit (for example gCO2/kWh), and effective interval. It is not a site sensor reading unless the site actually measures it.
- Renewable share, avoided carbon, optimization savings, and forecasts are derived calculations. Record formula/model version and input lineage separately; do not submit them as raw meter observations.

**Do not ingest:** hard-coded EnergyState dashboard defaults, locally generated forecast/optimization outputs, demo site identifiers, or frontend fixtures as measured energy data.

### 3.3 NeoCell — edge, gateway, device and infrastructure observations

**Candidate source classes**
- Edge gateways: heartbeat, last-seen time, firmware, connection state, and measured link diagnostics.
- Sensor nodes: actual device measurements with node identity, metric capability, unit, and source timestamp.
- Battery/power nodes: measured voltage/current/state values with device-defined semantics.
- Infrastructure modules: only telemetry exposed by an identified module or authorized controller; a manually assigned health score is not sensor telemetry.

**Minimum per-source registration**
- Gateway/device/node hardware identity, manufacturer/model, firmware, and cryptographic/device identity method where supported.
- Organization/site/deployment/asset scope and parent gateway relationship.
- Metric capabilities, raw units, sampling/heartbeat semantics, clock source, and expected ranges.
- Installation/commissioning status and effective dates.
- Calibration or validation record for each calibrated measurement channel.
- Connectivity evidence freshness threshold and explicit last-seen semantics.

**Metric-specific checks**
- Gateway online percentage, sensor online percentage, latency, battery percentage, and health scores need defined denominators, windows, and computation methods. A successful /health request is API reachability, not a gateway or sensor measurement.
- Distinguish heartbeat time, measurement time, gateway receive time, and Core ingest time.
- Preserve missing heartbeat and disconnected intervals as stale/offline states; do not synthesize a current heartbeat.
- A node's reported battery percentage is not equivalent to measured voltage or estimated remaining capacity unless the device contract defines that relationship.
- Composite readiness, infrastructure health, and risk scores are derived outputs with versioned calculation inputs, not raw observations.

**Do not ingest:** fixed CellState defaults, locally authored readiness/device metrics, API-health status, or static dashboard fixtures as live device telemetry.

## 4. Source registry and lifecycle prerequisites

Before a source can submit:
1. Register it under the correct organization, tenant, site, optional asset, product module, and permitted scope.
2. Activate and independently verify it through the governed Core lifecycle.
3. Include the metric capabilities and source metadata required by its acquisition contract.
4. Ensure the assigned reviewer is independent of the source submitter where policy requires it; retain auditable evidence and decision.
5. Apply revocation/decommissioning, ownership-change, site-deactivation, expired-calibration, and compromised-credential controls.
6. Prevent a source from expanding scope by submitting a different tenant, site, asset, module, actor, or verification value.
7. Let Core assign persisted observation verification state; source verification is not measurement verification.

An Access service-token grant authenticates a workload. It does not register, activate, or scientifically verify a physical source.

## 5. Product adapter and failure contract

The trusted producer follows:

acquire → authenticate source → resolve registry scope → validate raw record → normalize → attach provenance/quality → build canonical observation → submit with stable idempotency key → record outcome

Fail closed and surface a typed denial/error for:
- ingestion disabled or missing configuration;
- unregistered, unverified, inactive, revoked, or wrong-module source;
- tenant/site/asset scope mismatch;
- missing, stale, malformed, or invalid measurement/provenance;
- unsupported metric or unit;
- endpoint host/path mismatch or non-HTTPS/non-443 destination;
- Core authorization denial, timeout, conflict, or unavailable service.

Do not convert ingestion failure into a local “connected”, “saved”, “healthy”, or successful demo result. Keep acquisition, transport, persistence, and verification statuses separate in operator UX.

## 6. Required test evidence before activation

Each product must provide synthetic local tests first, then controlled remote staging evidence only after the private gateway and tenant API are independently provisioned and authorized.

| Test | Expected result |
|---|---|
| Demo fixture or fallback presented to producer | Rejected; no network call |
| Ingestion disabled | No network call |
| Browser attempts to provide tenant/source/credentials/module | Ignored or rejected; no authority granted |
| Unknown/unverified/revoked source | Denied by Core; no observation persisted |
| Wrong tenant/site/asset/module | Denied; no cross-scope persistence |
| Missing timestamp/unit/provenance/calibration where required | Validation failure; no network call |
| Unsupported or non-finite value | Validation failure; no network call |
| Stale/offline source | Explicit stale/offline outcome; no fabricated measurement |
| Identical retry | Same persisted observation and one audit event |
| Changed payload with same idempotency key | Conflict; no overwrite |
| Core unavailable or returns 403 | Typed failure visible to operator; never masked by demo fallback |
| Source revoked during lifecycle | Subsequent submission denied |
| Calibration expires or is superseded | Policy-defined hold/review; no silent use of expired calibration |
| Remote E2E | Synthetic source proves Access identity → Core ownership → persisted unverified observation → audit → retry/conflict |

Test fixtures must be unmistakably synthetic and isolated from production source registries. Remote staging must use synthetic tenants/sites/sources, not customer data. No staging or production execution is authorized by this document.

## 7. Implementation readiness checklist

A product is not ready for producer implementation until all are supplied and reviewed:
- actual source/device/provider inventory and owner;
- source registration and lifecycle workflow;
- acquisition protocol/API and authentication model;
- supported metrics, units, timestamps, sampling semantics and quality codes;
- calibration/validation method and validity policy;
- site/asset mapping and scope proof;
- raw-record retention, privacy, data rights and licensing;
- trusted server/edge runtime and secret-handling design;
- connector failure, retry, idempotency, monitoring and rollback behavior;
- tests proving synthetic/demo data cannot enter the acquisition path.

Unknown values stay unknown. If no real source or owner is identified, record the integration as **not ready** rather than inventing an implementation.

## 8. Evidence boundary

This is a design contract based on current repository schemas, runtime implementations, and NOVA Core/product adapter architecture. It does not establish that any listed candidate source class is installed, licensed, connected, registered, calibrated, verified, or operational. It does not authorize live ingestion.

No runtime code, database, migrations, secrets, environment variables, Cloudflare/Supabase configuration, deployments, customer data, paid resources, or billing settings are changed by this specification.

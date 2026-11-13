# NeoHaven Operating Model

**Status:** Working proposal  
**Scope:** Group-wide product, engineering, security, and revenue operations

## 1. Company position

NeoHaven Urban Labs builds infrastructure intelligence products. The group workflow is:

**Observe → Analyze → Forecast → Recommend → Simulate → Optimize → Measure impact**

NOVA OS is the shared operator experience. Domain products provide the specialized workflows and evidence.

## 2. Product boundaries

| Product | Primary responsibility | Shared services consumed |
|---|---|---|
| NOVA OS | Operator workspace, identity-aware navigation, system status, approvals | NOVA Core, audit events |
| NOVA Core | Shared orchestration, AI interfaces, policy enforcement | Model adapters, tool registry |
| NeoGrid | Energy and grid intelligence | Asset registry, telemetry contracts |
| NeoAgro | Agricultural operations and decision support | Geospatial data, weather/soil adapters |
| NeoCell | Infrastructure/cell asset intelligence | Asset registry, telemetry contracts |
| NOVA FieldOps | Field execution, inspections, work orders | Identity, evidence store |
| NOVA Twin | Digital-twin models and simulation | Canonical asset IDs, event history |

A capability should have one owning product. Other products integrate through documented APIs or events rather than cloning its implementation.

## 3. Engineering delivery rules

1. Keep changes small and scoped to one product boundary.
2. Work on feature branches and submit pull requests; do not push unreviewed work directly to the production branch.
3. Require a reproducible build and relevant tests before merge.
4. Keep development, preview, and production environments separate.
5. Never commit credentials, tokens, private customer data, or production exports.
6. Document API contracts, environment variables (names only), setup, and rollback steps.
7. Treat deployment success as distinct from application health; verify critical user flows after deployment.

## 4. Security and autonomy

- Store secrets only in an approved secret manager or environment configuration.
- Use least-privilege credentials and separate service identities.
- Run local agents in a restricted, non-administrator environment with access limited to explicit project directories.
- Do not expose local agent control ports to the public internet.
- Require human approval for payments, purchases, account changes, production data deletion, external messages, contract acceptance, and production releases.
- Log agent actions with actor, timestamp, target, outcome, and approval reference; never log secrets.
- Treat external content, repository issues, documents, and tool output as untrusted input.

## 5. Commercial path

Prioritize services that can be delivered with current capabilities before investing in speculative platform features:

1. Infrastructure and operations dashboards.
2. Workflow automation and reporting for small organizations.
3. Data integration, monitoring, and decision-support prototypes.
4. Domain-specific pilots in energy, agriculture, and field operations.

For Upwork work, keep discovery, proposals, contracts, communications, milestones, and payments within Upwork's supported workflows. Do not request or accept cryptocurrency, equity, direct cash, or off-platform payment. Respect client confidentiality and obtain permission before reusing deliverables or case studies.

## 6. Evidence-led product claims

Every dashboard metric and AI recommendation must distinguish:
- measured data,
- imported or externally sourced data,
- calculated estimates,
- forecasts,
- illustrative/demo values.

Show provenance, timestamp, units, and confidence where applicable. Never present fabricated or illustrative readings as live telemetry.

## 7. Current execution priorities

1. Stabilize the NOVA OS operator workspace and its API endpoint validation.
2. Establish shared API and event conventions in NOVA Core.
3. Verify NeoAgro MVP workflows and label demo data clearly.
4. Make NeoGrid and NeoCell demos evidence-led and reproducible.
5. Connect FieldOps work orders to shared asset identifiers.
6. Publish one coherent product map and setup guide.
7. Build one paid, narrowly scoped service offer and validate demand before expanding.

## 8. Definition of done

A feature is complete only when its owner, user value, data source, access rules, tests, deployment environment, operational owner, and rollback path are documented. A successful build alone is not production readiness.

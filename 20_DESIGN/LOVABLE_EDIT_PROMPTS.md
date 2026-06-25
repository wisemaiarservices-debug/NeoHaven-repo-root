# Lovable Edit Prompts

## Prompt A — Existing NOVA OS Prototype Audit

Use this prompt inside the existing NOVA OS Lovable prototype:

```text
Audit this NOVA OS prototype as a product design reference for NeoHaven AI Urban Labs.

Do not rewrite the project yet.

Create an audit report inside the app or as a markdown section listing:

1. Best screens to keep
2. Best layout patterns
3. Best copy and positioning
4. Weak or generic parts to remove
5. Missing modules for final NOVA OS vision
6. Patterns that should be ported into GitHub Command Center
7. Screenshots needed for SolarHub pitch deck

Target final product:
NOVA OS — AI Operating System for Sustainable Infrastructure.

Modules:
- NOVA Core AI
- NeoAgro / NOVA Agriculture
- NeoGrid / NOVA Energy
- NeoCell / NOVA Infrastructure
- Digital Twin
- Knowledge Graph
- Recommendations
- Impact Reports

Design direction:
Premium dark enterprise command center, not a startup landing page.
```

## Prompt B — New Product Vision Prototype Refinement

Use this prompt inside the new separate Lovable product vision prototype:

```text
Refine this separate NOVA OS product vision prototype into a polished enterprise command center.

Keep it separate from the existing prototype.

Primary page: SolarHub Agrivoltaic Demo Command Center.

Add or improve:

1. Overview dashboard with service status for NOVA Core, NeoAgro, NeoGrid, and NeoCell
2. KPI strip: Site Health, Crop Health, Soil Moisture, Solar Production, Battery SOC, Water Use, Carbon Avoided, Resilience Score
3. NeoAgro panel: field zones, soil moisture, crop risk, irrigation recommendation
4. NeoGrid panel: solar production, battery reserve, grid import/export, carbon impact
5. NeoCell panel: gateway health, sensor coverage, edge battery reserve, latency, readiness score
6. NOVA Core AI panel: forecast, recommendation, simulation, assistant explanation
7. Digital Twin panel: simplified asset map
8. Knowledge Graph panel: solar array -> battery -> pump -> field zone -> crop output
9. Recommendation cards with priority, confidence, expected impact, and operator approval status
10. Impact report cards: water savings, carbon reduction, resilience gain, yield risk reduction

Use deterministic demo data.

Important guardrails:
- Do not imply autonomous physical control.
- Make operator approval visible.
- Keep fallback/offline mode visible.
- Avoid generic startup sections.
- Avoid crypto/neon/game aesthetics.

Design style:
Dark graphite, premium SaaS, compact command center, scientific, professional, enterprise-grade.
```

## Prompt C — Export / Handoff for Codex

Use this prompt after the Lovable prototype is visually good:

```text
Prepare this Lovable prototype for Codex handoff.

Create a clear implementation report with:

- Pages created
- Components used
- Data model and mock data
- Design tokens
- Important CSS classes
- Screenshots needed
- Which UI patterns should be ported to GitHub
- Which files Codex should create or update
- Known limitations

Target GitHub repo:
wisemaiarservices-debug/NeoHaven-repo-root

Target app:
apps/command-center

Preserve deterministic fallback mode and do not require external services for rendering.
```

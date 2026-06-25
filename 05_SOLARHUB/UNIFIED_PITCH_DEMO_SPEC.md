# NOVA OS Unified Pitch Demo Specification

## Objective

Make the NOVA OS pitch experience consistent, working, and adaptable across:

- GitHub implementation
- Lovable prototype
- Figma/FigJam design assets
- SolarHub pitch deck/screenshots
- Local Codex-run demo

The goal is one coherent demo experience that can be shown confidently during pitching.

## Demo Name

```text
NOVA OS — SolarHub Agrivoltaic Command Center
```

## One-Line Product Message

```text
NOVA OS turns fragmented agriculture, energy, and infrastructure data into operator-approved actions with measurable water, carbon, resilience, and yield impact.
```

## Non-Negotiable Pitch Requirements

1. The demo must render without external services.
2. The demo must also support connected mode when module APIs are running.
3. The user experience must be consistent across GitHub, Lovable, and Figma.
4. The interface must show NOVA OS as a decision intelligence layer, not only a dashboard.
5. The demo must show operator approval, not autonomous physical control.
6. The demo must use deterministic data so screenshots and pitch flow stay stable.
7. The UI must be premium enterprise, dark command center, and investor-ready.

## Required User Experience

### Global Layout

- Left sidebar navigation
- Topbar with site name, status, and demo mode
- KPI strip
- Main dashboard grid
- Recommendation and explanation panels
- Digital Twin and Knowledge Graph panels
- Impact summary
- Demo script / pitch mode page

### Navigation

```text
Overview
Agriculture / NeoAgro
Energy / NeoGrid
Infrastructure / NeoCell
NOVA Core AI
Digital Twin
Knowledge Graph
Recommendations
Impact Reports
Demo Script
Settings
```

## Required Data Scenario

Scenario:

```text
Heatwave agrivoltaic optimization
```

Site:

```text
SolarHub Agrivoltaic Demo Site
```

Narrative:

A heatwave is forecast. Crop stress and irrigation demand are rising. Solar production may derate. Battery reserve and infrastructure readiness matter. NOVA OS coordinates NeoAgro, NeoGrid, NeoCell, and NOVA Core AI to recommend an operator-approved action.

## Required Modules

### NOVA Core AI v0

Must show:

- Forecast
- Recommendation
- Scenario simulation
- Assistant explanation
- Confidence score
- Operator approval requirement

Must answer:

- What is happening?
- Why does it matter?
- What will happen next?
- What should the operator do?
- What impact will it have?

### NeoAgro / NOVA Agriculture

Must show:

- Field zone matrix
- Crop health
- Soil moisture
- Water demand forecast
- Irrigation timing recommendation
- Yield risk
- Water savings impact

### NeoGrid / NOVA Energy

Must show:

- Solar production curve
- Battery state of charge
- Grid import/export
- Energy optimization plan
- Carbon avoided
- Battery reserve recommendation

### NeoCell / NOVA Infrastructure

Must show:

- Gateway health
- Sensor coverage
- Edge battery reserve
- Data latency
- Pump/water node health
- Readiness score
- Site readiness recommendation

### Digital Twin

Must show simplified asset map:

```text
Solar Array -> Battery -> Pump -> Field Zone -> Crop Output
```

### Knowledge Graph

Must show entity relationships:

```text
Solar Array powers Battery
Battery powers Pump
Pump irrigates Field Zone
Field Zone produces Crop
NOVA calculates impact
```

### Recommendations

Must show at least three action cards:

1. Shift irrigation to evening window.
2. Preserve battery reserve before heat peak.
3. Run pre-heatwave infrastructure readiness check.

Each recommendation must show:

- Priority
- Confidence
- Expected water impact
- Expected carbon impact
- Expected resilience impact
- Operator approval status

### Impact Metrics

Required deterministic metrics:

```text
Expected water savings: 3.2 m3
Expected carbon reduction: 21.8 kg CO2e
Expected resilience gain: 12%
Expected yield risk reduction: 11%
```

## Visual Direction

Theme:

```text
Premium dark enterprise command center
```

Colors:

```text
Midnight: #07111F
Panel: #101827
Border: #2A3D55
Neo Green: #28C76F
Aurora Blue: #3AA7FF
Solar Gold: #F6C445
Alert Red: #FF5C5C
Text: #EEF6FF
```

Avoid:

- Generic startup landing page
- Crypto/neon/game aesthetics
- Cartoon AI icons
- Claims of autonomous control
- Overclaiming production readiness

## GitHub Implementation Target

Repository:

```text
wisemaiarservices-debug/NeoHaven-repo-root
```

App:

```text
apps/command-center
```

The current Command Center must remain fallback-safe and buildable.

## Lovable Target

Existing prototype:

```text
https://lovable.dev/projects/22575afb-70aa-417c-b434-2506de324158
```

New product vision prototype:

```text
https://lovable.dev/projects/eb7473fa-a61e-4c3e-b65b-9fb8748687ec
```

Lovable should visually match the GitHub Command Center structure and should be used for fast visual iteration and screenshots.

## Figma Target

FigJam architecture:

```text
https://www.figma.com/board/2AQ31yCswV87GT8JCHZl1T
```

Figma should contain:

- Architecture diagram
- Product screen mockup
- Pitch deck visual system
- Component references
- Screenshot planning board

## Pitch Demo Flow

1. Open NOVA OS Command Center.
2. Show SolarHub heatwave scenario.
3. Show connected/fallback service status.
4. Show site KPIs.
5. Explain NeoAgro crop/water risk.
6. Explain NeoGrid solar/battery/grid optimization.
7. Explain NeoCell infrastructure readiness.
8. Show NOVA Core AI recommendation and assistant explanation.
9. Show Digital Twin and Knowledge Graph relationship.
10. Show impact metrics.
11. Close with operator-approved action and measurable impact.

## Definition of Done

The unified pitch demo is done when:

- GitHub Command Center builds and runs.
- NeoAgro dashboard has the audited command-center UI merged.
- Lovable prototype follows the same UX and data scenario.
- Figma/FigJam contains matching architecture and screen direction.
- Codex has verified local demo routes.
- Screenshots are captured for deck usage.
- A 2-minute demo script exists.
- No module requires live services to render.

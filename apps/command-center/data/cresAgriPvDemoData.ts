// Synthetic discussion dataset for the NOVA OS agri-PV validation demo.
// Purpose: support a live conversation with CRES / BRITE about possible validation workflows.
// This is not field-validated data and must not be presented as scientific output.

export const cresDemoContext = {
  title: "NOVA OS Agri-PV Validation Demo",
  subtitle: "Synthetic collaboration sandbox for PV transparency and weak-grid agri-PV decision intelligence.",
  stage: "Product-preview / pilot-ready MVP discussion aid",
  disclaimer:
    "Synthetic sample data for collaboration discussion only. Not field-validated. No autonomous physical control.",
  workflow: ["Observe", "Analyze", "Forecast", "Recommend", "Simulate", "Approve", "Measure Impact"],
  sources: [
    "SolarHub Challenge 4: systematic, data-driven digital tool for optimal PV transparency based on climate zone, crop type, and local solar conditions.",
    "SolarHub Challenge 5: methodologies, software tools, and operational guidelines for agri-PV integration in weak grids/off-grid microgrids, including DER management, storage, flexibility, and sector coupling.",
    "CRES profile: renewable energy, energy efficiency, smart grids, microgrids, distributed energy systems, and energy-management optimisation.",
  ],
} as const;

export const transparencyReferenceCase = {
  site: {
    name: "Mediterranean Agri-PV Reference Case",
    region: "Southern Europe / Mediterranean climate",
    crop: "Tomato and pepper greenhouse-adjacent crop case",
    landAreaHa: 1.8,
    irrigation: "Drip irrigation available",
    structure: "Fixed-tilt semi-transparent PV canopy",
    validationStatus: "Assumptions need expert review",
  },
  inputVariables: [
    { group: "Crop", variable: "Crop type", sample: "Tomato / pepper", reason: "Drives shade tolerance and growth response." },
    { group: "Crop", variable: "PAR requirement", sample: "High", reason: "Core variable for light-management trade-off." },
    { group: "Climate", variable: "Climate zone", sample: "Mediterranean hot-summer", reason: "Affects heat stress, evapotranspiration, and irradiance profile." },
    { group: "Solar", variable: "Local solar radiation", sample: "High summer irradiance", reason: "Required for energy-yield and shading scenario comparison." },
    { group: "Water", variable: "Water stress index", sample: "0.61", reason: "Links shading, evapotranspiration, irrigation demand, and crop risk." },
    { group: "PV", variable: "Transparency options", sample: "20%, 40%, 60%, 80%", reason: "Primary design choice for scenario comparison." },
    { group: "PV", variable: "Tilt / row spacing", sample: "25° / 5.5 m", reason: "Controls shading pattern and plant-light exposure." },
    { group: "Validation", variable: "Expert baseline", sample: "Needed", reason: "CRES/BRITE judgement or simulation baseline required." },
  ],
  scenarios: [
    {
      transparency: "20%",
      cropSuitability: 54,
      energyYield: 92,
      waterStressReduction: 18,
      designConfidence: 58,
      note: "High energy capture, but excessive crop-light limitation risk for high-PAR crops.",
    },
    {
      transparency: "40%",
      cropSuitability: 73,
      energyYield: 81,
      waterStressReduction: 23,
      designConfidence: 74,
      note: "Balanced design candidate; needs crop-specific validation.",
    },
    {
      transparency: "60%",
      cropSuitability: 86,
      energyYield: 68,
      waterStressReduction: 17,
      designConfidence: 79,
      note: "Recommended discussion candidate for crop-energy balance.",
    },
    {
      transparency: "80%",
      cropSuitability: 91,
      energyYield: 44,
      waterStressReduction: 8,
      designConfidence: 66,
      note: "Strong crop-light access, but lower energy output and weaker PV business case.",
    },
  ],
  recommendation: {
    range: "40%–60% transparency",
    confidence: "Discussion confidence: medium",
    rationale:
      "The synthetic case indicates that 40%–60% transparency may be a useful first validation range for balancing crop-light needs, water-stress mitigation, and PV energy yield.",
    missingData: [
      "Crop-specific yield response curve",
      "Measured spectral transmittance",
      "Hourly irradiance and shading profile",
      "Temperature and evapotranspiration baseline",
      "CRES/BRITE expert validation criteria",
    ],
  },
} as const;

export const weakGridReferenceCase = {
  site: {
    name: "Rural Agri-PV Weak-Grid Reference Case",
    pvCapacityKw: 120,
    batteryKwh: 240,
    pumpLoadKw: 18,
    transformerLimitKw: 90,
    exportLimitKw: 35,
    operationMode: "Grid-connected with weak feeder constraint",
    validationStatus: "Synthetic operating case for discussion",
  },
  metrics: [
    { label: "Local renewable use", value: "78%", target: "Increase", note: "Prioritize onsite PV use before export." },
    { label: "Grid stress score", value: "62/100", target: "Reduce", note: "Driven by midday export and evening pump demand." },
    { label: "Battery SOC", value: "64%", target: "Maintain reserve", note: "Reserve needed for evening irrigation and outage resilience." },
    { label: "Curtailment risk", value: "Medium", target: "Reduce", note: "Shift flexible loads to solar surplus window." },
  ],
  operatingScenarios: [
    {
      name: "Baseline operation",
      gridStress: 76,
      renewableUse: 61,
      curtailmentRisk: "High",
      waterRisk: "Medium",
      decision: "No optimization applied.",
    },
    {
      name: "Solar-aligned irrigation",
      gridStress: 55,
      renewableUse: 78,
      curtailmentRisk: "Medium",
      waterRisk: "Low",
      decision: "Shift irrigation pump operation to 12:00–15:00 solar surplus window.",
    },
    {
      name: "Battery-supported evening cycle",
      gridStress: 48,
      renewableUse: 82,
      curtailmentRisk: "Low",
      waterRisk: "Low",
      decision: "Reserve 25% battery SOC for evening irrigation and critical loads.",
    },
  ],
  recommendation: {
    title: "Operator-approved DER coordination workflow",
    rationale:
      "Coordinate solar generation, battery reserve, irrigation flexibility, and export limits to reduce grid stress while preserving crop and water priorities.",
    checks: [
      "Power balance within transformer limit",
      "Export limit respected",
      "Battery reserve maintained",
      "Irrigation priority satisfied",
      "Operator approval required",
      "No autonomous grid control enabled",
    ],
  },
} as const;

export const validationPathway = [
  {
    phase: "1. Scope selection",
    owner: "CRES / BRITE + NeoHaven",
    output: "Choose PV transparency, weak-grid operation, or a connected roadmap.",
  },
  {
    phase: "2. Variable definition",
    owner: "CRES / BRITE technical guidance",
    output: "Define minimum variables, assumptions, baselines, and acceptable uncertainty.",
  },
  {
    phase: "3. NOVA OS workflow adaptation",
    owner: "NeoHaven",
    output: "Configure scenario inputs, recommendations, approvals, and impact-reporting screens.",
  },
  {
    phase: "4. Expert review",
    owner: "CRES / BRITE",
    output: "Compare outputs against expert judgement, simulations, datasets, or literature baselines.",
  },
  {
    phase: "5. EU-funded project concept",
    owner: "Joint",
    output: "Prepare a short concept note with roles, technical scope, validation plan, and exploitation path.",
  },
] as const;

export const collaborationRoles = [
  {
    partner: "NeoHaven AI Urban Labs",
    role: "Digital decision-intelligence layer, operator interface, scenario workflow, AI-supported recommendations, impact reporting, productization.",
  },
  {
    partner: "CRES",
    role: "Renewable energy, weak-grid, microgrid, DER, storage, power-balance, validation and EU-funded project expertise.",
  },
  {
    partner: "BRITE",
    role: "Agrivoltaic PV design, semi-transparent PV module context, crop-production PV scenarios, industrial demonstration requirements.",
  },
] as const;

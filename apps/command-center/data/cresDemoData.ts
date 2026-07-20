// Synthetic CRES / BRITE agri-PV collaboration data for the NOVA OS Command Center.
// These fixtures are discussion data only. They are not field-validated measurements.

export const cresDemoNotice = {
  title: "Synthetic discussion sandbox",
  body: "This page uses small static sample data to show how NOVA OS could organize agrivoltaic variables, scenario comparison, expert assumptions, recommendations, approvals, and impact reporting for a CRES / BRITE validation workflow.",
};

export const cresDemoKpis = [
  { label: "PV Transparency Range", value: "40-60", unit: "%", delta: "candidate", tone: "good" },
  { label: "Crop Suitability", value: "82", unit: "/100", delta: "+9", tone: "good" },
  { label: "Water Stress Index", value: "34", unit: "/100", delta: "watch", tone: "warn" },
  { label: "Energy Yield Index", value: "76", unit: "/100", delta: "+6", tone: "good" },
  { label: "Grid Stress", value: "61", unit: "/100", delta: "risk", tone: "warn" },
  { label: "Local RES Use", value: "84", unit: "%", delta: "+18", tone: "good" },
  { label: "Battery SOC", value: "63", unit: "%", delta: "reserve", tone: "warn" },
  { label: "Approval Status", value: "Human", unit: "review", delta: "required", tone: "good" },
] as const;

export const transparencyScenario = {
  title: "PV transparency decision support",
  context: "Challenge 4-style reference case for agrivoltaic PV glass transparency selection.",
  site: {
    name: "Mediterranean Agri-PV Reference Block",
    region: "Southern Europe / Mediterranean climate",
    crop: "Tomato and pepper rotation",
    system: "Semi-transparent elevated PV canopy",
    area: "1.2 ha synthetic reference plot",
  },
  variables: [
    { label: "Climate zone", value: "Mediterranean hot-summer", status: "sample" },
    { label: "Crop type", value: "Tomato / pepper", status: "sample" },
    { label: "Local solar condition", value: "High irradiance + heatwave risk", status: "sample" },
    { label: "PAR sensitivity", value: "Medium-high", status: "needs expert baseline" },
    { label: "Water stress", value: "Moderate", status: "sample" },
    { label: "PV glass options", value: "30%, 40%, 50%, 60%, 70%, 80%", status: "BRITE-aligned range" },
  ],
  options: [
    { transparency: "30%", cropScore: 64, energyScore: 90, waterScore: 73, risk: "Crop light deficit risk", recommendation: "Not preferred for light-sensitive crops" },
    { transparency: "40%", cropScore: 76, energyScore: 84, waterScore: 79, risk: "Balanced but needs crop validation", recommendation: "Candidate option" },
    { transparency: "50%", cropScore: 82, energyScore: 76, waterScore: 81, risk: "Best synthetic balance", recommendation: "Recommended for validation" },
    { transparency: "60%", cropScore: 86, energyScore: 68, waterScore: 77, risk: "Lower PV yield", recommendation: "Candidate for high light-demand crops" },
    { transparency: "70%", cropScore: 90, energyScore: 57, waterScore: 70, risk: "Reduced energy value", recommendation: "Use only if crop priority dominates" },
    { transparency: "80%", cropScore: 93, energyScore: 48, waterScore: 66, risk: "Weak PV productivity", recommendation: "Not preferred for energy objective" },
  ],
  recommendation: "Use 50% as the first validation point, with 40% and 60% as comparison cases. CRES / BRITE expert assumptions should define crop light thresholds, PAR weighting, module properties, and acceptable energy-crop trade-offs.",
  limitations: [
    "Synthetic data only: no claim of validated transparency optimization.",
    "PAR response, crop yield curves, module spectral properties, and local solar data need expert input.",
    "The output is a decision-support workflow, not a final engineering decision.",
  ],
};

export const weakGridScenario = {
  title: "Weak-grid agri-PV decision intelligence",
  context: "Challenge 5-style reference case for agri-PV operation in weak rural grids or off-grid microgrids.",
  site: {
    name: "Rural Agri-PV Microgrid Reference Site",
    pvCapacity: "180 kWp",
    battery: "320 kWh / 120 kW",
    irrigationLoad: "35 kW peak pump load",
    gridLimit: "90 kW export/import soft limit",
  },
  variables: [
    { label: "PV generation", value: "Midday surplus 42 kW", status: "sample" },
    { label: "Battery state", value: "63% SOC", status: "sample" },
    { label: "Irrigation demand", value: "High between 12:00-16:00", status: "sample" },
    { label: "Grid constraint", value: "Voltage and export risk", status: "needs grid baseline" },
    { label: "Flexibility window", value: "Pump load shiftable by 2 hours", status: "sample" },
    { label: "Water priority", value: "Crop stress zone Z-03", status: "sample" },
  ],
  actions: [
    { title: "Shift pump load to solar surplus window", module: "NeoGrid + NeoAgro", confidence: 86, effect: "Increase local renewable self-consumption and reduce grid import." },
    { title: "Reserve 20% battery for evening irrigation", module: "NeoGrid", confidence: 78, effect: "Protect pump cycle if grid voltage becomes unstable." },
    { title: "Limit export during voltage-risk interval", module: "NeoGrid", confidence: 74, effect: "Reduce weak-grid stress and curtailment exposure." },
    { title: "Prioritize water-stressed crop zone", module: "NeoAgro", confidence: 83, effect: "Coordinate water and energy decisions around crop risk." },
  ],
  recommendation: "Use NOVA OS as the operator-approved decision layer connecting PV generation, storage, irrigation demand, weak-grid constraints, and impact reporting. CRES guidance should define grid constraints, validation metrics, and DER-management assumptions.",
  limitations: [
    "Synthetic grid values only; no grid-code or feeder-specific validation is claimed.",
    "Voltage risk, transformer limits, load profiles, and battery rules need CRES / partner input.",
    "NOVA OS supports scenario recommendations and operator approval, not autonomous grid control.",
  ],
};

export const dataSourceCandidates = [
  {
    name: "PVGIS / European Commission JRC",
    use: "Solar irradiation, PV production, solar-position and PV performance calculations.",
    demoStatus: "Future API integration candidate",
  },
  {
    name: "NASA POWER",
    use: "Analysis-ready solar and meteorological time series for energy, agriculture, and infrastructure contexts.",
    demoStatus: "Future API integration candidate",
  },
  {
    name: "Open-Meteo",
    use: "Weather, solar radiation, evapotranspiration, and soil-moisture variables for scenario workflows.",
    demoStatus: "Future API integration candidate",
  },
  {
    name: "CRES / BRITE expert assumptions",
    use: "Crop/climate baselines, transparency choices, module properties, grid constraints, validation criteria, and EU project methodology.",
    demoStatus: "Essential for validation",
  },
];

export const validationPathway = [
  {
    step: "01",
    title: "Select scope",
    body: "Choose PV transparency validation, weak-grid agri-PV operation, or a staged roadmap connecting both.",
  },
  {
    step: "02",
    title: "Define variables",
    body: "Agree on minimum crop, climate, solar, module, water, storage, load, and grid variables for a credible first case.",
  },
  {
    step: "03",
    title: "Inject reference data",
    body: "Load a small CRES / BRITE-approved reference case into NOVA OS using static fixtures or API connectors.",
  },
  {
    step: "04",
    title: "Compare scenarios",
    body: "Run decision workflows and compare outputs against expert judgment, existing simulations, or literature baselines.",
  },
  {
    step: "05",
    title: "Prepare EU project concept",
    body: "Document roles, validation plan, technical outputs, demonstration pathway, exploitation value, and future funding fit.",
  },
];

export const collaborationRoles = [
  {
    partner: "NeoHaven AI Urban Labs",
    role: "AI decision-intelligence layer, product workflow, operator interface, scenario comparison, impact reporting, fast software iteration.",
  },
  {
    partner: "CRES",
    role: "Research expertise, energy systems validation, weak-grid methodology, EU-funded project experience, technical evaluation criteria.",
  },
  {
    partner: "BRITE",
    role: "PV glass technology context, transparency options, agrivoltaic use cases, industrial challenge definition, demonstration needs.",
  },
];

export const meetingQuestions = [
  "Which starting point is more useful for CRES / BRITE: PV transparency design support or weak-grid operational decision intelligence?",
  "What variables are essential before a transparency recommendation can be considered scientifically credible?",
  "For weak rural grids, should the first model focus on voltage risk, battery dispatch, local self-consumption, irrigation flexibility, or congestion reduction?",
  "Would a two-page concept note, a validation plan, or a small updated NOVA OS workflow be the best follow-up output?",
];

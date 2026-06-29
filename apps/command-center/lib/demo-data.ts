export type ViewKey = 'overview' | 'agriculture' | 'energy' | 'infrastructure' | 'ai' | 'demo';

export type NavItem = {
  label: string;
  href: string;
  key: ViewKey;
  eyebrow: string;
};

export type Kpi = {
  label: string;
  value: string;
  trend: string;
  tone: 'green' | 'blue' | 'gold' | 'red' | 'violet';
};

export type ServiceStatus = {
  id: string;
  name: string;
  label: string;
  status: 'Connected' | 'Standby';
  endpoint: string;
  health: string;
  description: string;
  tone: 'green' | 'blue' | 'gold' | 'red' | 'violet';
};

export type Recommendation = {
  title: string;
  priority: string;
  confidence: string;
  owner: string;
  water: string;
  carbon: string;
  resilience: string;
  status: string;
};

export const navItems: NavItem[] = [
  { label: 'Overview', href: '/', key: 'overview', eyebrow: 'Command' },
  { label: 'Agriculture / NeoAgro', href: '/agriculture', key: 'agriculture', eyebrow: 'Crop + Water' },
  { label: 'Energy / NeoGrid', href: '/energy', key: 'energy', eyebrow: 'Solar + Battery' },
  { label: 'Infrastructure / NeoCell', href: '/infrastructure', key: 'infrastructure', eyebrow: 'Edge + Sensors' },
  { label: 'NOVA Core AI', href: '/nova-core', key: 'ai', eyebrow: 'Decision Layer' },
  { label: 'Executive Walkthrough', href: '/walkthrough', key: 'demo', eyebrow: 'Executive Overview' },
];

export const serviceStatuses: ServiceStatus[] = [
  {
    id: 'nova-core',
    name: 'NOVA Core AI v0',
    label: 'Forecast / Recommend / Explain',
    status: 'Standby',
    endpoint: 'NOVA Core API',
    health: 'Operational preview',
    description: 'Turns site telemetry into forecasts, scenario simulations, operator-approved recommendations, and assistant explanations.',
    tone: 'violet',
  },
  {
    id: 'neoagro',
    name: 'NeoAgro',
    label: 'NOVA Agriculture',
    status: 'Standby',
    endpoint: 'NeoAgro API',
    health: '82% crop health',
    description: 'Monitors crop stress, soil moisture, irrigation timing, yield risk, and water-saving opportunities for agrivoltaic fields.',
    tone: 'green',
  },
  {
    id: 'neogrid',
    name: 'NeoGrid',
    label: 'NOVA Energy',
    status: 'Standby',
    endpoint: 'NeoGrid API',
    health: '67% battery reserve',
    description: 'Coordinates solar generation, battery state, grid import/export, load timing, and carbon reduction.',
    tone: 'gold',
  },
  {
    id: 'neocell',
    name: 'NeoCell',
    label: 'NOVA Infrastructure',
    status: 'Standby',
    endpoint: 'NeoCell API',
    health: '87% site readiness',
    description: 'Tracks gateway health, sensor coverage, edge battery reserve, data latency, pump readiness, and field infrastructure status.',
    tone: 'blue',
  },
];

export const topKpis: Kpi[] = [
  { label: 'Site Health', value: '91%', trend: '+4.2%', tone: 'green' },
  { label: 'Crop Health', value: '82%', trend: 'watch', tone: 'green' },
  { label: 'Soil Moisture', value: '31%', trend: '-7%', tone: 'gold' },
  { label: 'Solar Production', value: '42.6 kW', trend: 'nominal', tone: 'gold' },
  { label: 'Battery SOC', value: '67%', trend: 'reserve', tone: 'blue' },
  { label: 'Carbon Avoided', value: '21.8 kg', trend: 'CO2e', tone: 'violet' },
  { label: 'Water Saved', value: '3.2 m3', trend: 'expected', tone: 'blue' },
  { label: 'Resilience', value: '+12%', trend: 'gain', tone: 'green' },
];

export const fieldZones = [
  { id: 'Z1-A', crop: 'Lettuce', health: 94, moisture: 34, status: 'optimal' },
  { id: 'Z1-B', crop: 'Spinach', health: 91, moisture: 32, status: 'optimal' },
  { id: 'Z2-A', crop: 'Tomato', health: 88, moisture: 30, status: 'stable' },
  { id: 'Z2-B', crop: 'Pepper', health: 84, moisture: 28, status: 'stable' },
  { id: 'Z3-A', crop: 'Basil', health: 82, moisture: 25, status: 'watch' },
  { id: 'Z3-B', crop: 'Kale', health: 79, moisture: 24, status: 'watch' },
  { id: 'Z4-A', crop: 'Arugula', health: 76, moisture: 23, status: 'stress' },
  { id: 'Z4-B', crop: 'Herbs', health: 72, moisture: 21, status: 'stress' },
];

export const energySeries = [8, 42, 138, 245, 338, 418, 487, 462, 425, 364, 275, 158, 52, 6];

export const infrastructureStats = [
  { label: 'Gateway Online', value: '94%', note: 'edge link stable' },
  { label: 'Sensor Coverage', value: '89%', note: '11% degraded nodes' },
  { label: 'Data Latency', value: '180 ms', note: 'inside operating threshold' },
  { label: 'Pump Node', value: 'Ready', note: 'manual approval required' },
];

export const recommendations: Recommendation[] = [
  {
    title: 'Shift irrigation to evening window',
    priority: 'High',
    confidence: '87%',
    owner: 'NeoAgro + NOVA Core',
    water: '3.2 m3 saved',
    carbon: '7.5 kg CO2e avoided',
    resilience: '+5%',
    status: 'Operator approval required',
  },
  {
    title: 'Preserve battery reserve before heat peak',
    priority: 'High',
    confidence: '82%',
    owner: 'NeoGrid + NOVA Core',
    water: 'No direct change',
    carbon: '14.3 kg CO2e avoided',
    resilience: '+4%',
    status: 'Operator approval required',
  },
  {
    title: 'Run pre-heatwave readiness check',
    priority: 'Medium',
    confidence: '79%',
    owner: 'NeoCell + NOVA Core',
    water: 'Protects irrigation availability',
    carbon: 'Prevents inefficient fallback operation',
    resilience: '+3%',
    status: 'Operator approval required',
  },
];

export const twinChain = ['Solar Array', 'Battery', 'Pump', 'Field Zone', 'Crop Output'];

export const graphEdges = [
  'Solar Array powers Battery',
  'Battery powers Pump',
  'Pump irrigates Field Zone',
  'Field Zone produces Crop',
  'NOVA calculates impact',
];

export const assets = [
  { type: 'solar_panel', name: 'Panel Row 07', code: 'PV-R07', status: 'active', owner: 'NeoGrid' },
  { type: 'inverter', name: 'Inverter 07', code: 'INV-07', status: 'watch', owner: 'NeoGrid' },
  { type: 'field_zone', name: 'Zone 4-B', code: 'Z4-B', status: 'stress', owner: 'NeoAgro' },
  { type: 'reservoir', name: 'Reservoir South', code: 'RES-S', status: 'active', owner: 'NeoAgro' },
  { type: 'battery', name: 'Battery Bank 1', code: 'BATT-01', status: 'reserve', owner: 'NeoGrid' },
  { type: 'pump', name: 'Pump Station 1', code: 'PUMP-01', status: 'ready', owner: 'NeoCell' },
  { type: 'gateway', name: 'Edge Gateway A', code: 'GW-A', status: 'online', owner: 'NeoCell' },
  { type: 'sensor', name: 'Field Sensor Mesh', code: 'SNS-MESH', status: '89%', owner: 'NeoCell' },
];

export const pitchSteps = [
  'Open NOVA OS Command Center and confirm the Connected / Standby operating posture.',
  'Show the heatwave agrivoltaic scenario and service status chips.',
  'Explain NeoAgro crop stress, soil moisture, irrigation timing, and water savings.',
  'Explain NeoGrid solar production, battery reserve, grid import, and carbon impact.',
  'Explain NeoCell gateway, sensor, edge power, latency, and pump readiness.',
  'Show NOVA Core AI forecast, scenario simulation, recommendation, and assistant explanation.',
  'Show Digital Twin and Knowledge Graph linking solar, battery, pump, field zone, and crop output.',
  'Close with operator approval and impact: 3.2 m3 water, 21.8 kg CO2e, +12% resilience, 11% yield risk reduction.',
];

export const impactMetrics = [
  { label: 'Water Savings', value: '3.2 m3', note: 'expected from optimized irrigation timing' },
  { label: 'Carbon Reduction', value: '21.8 kg CO2e', note: 'expected from solar/battery coordination' },
  { label: 'Resilience Gain', value: '+12%', note: 'expected from site readiness checks' },
  { label: 'Yield Risk Reduction', value: '11%', note: 'expected from heatwave action plan' },
];

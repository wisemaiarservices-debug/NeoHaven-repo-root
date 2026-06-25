import { aggregateImpact, getServiceSnapshots } from '../lib/services';

function format(value: number | string, unit?: string) {
  return `${value}${unit ? ' ' + unit : ''}`;
}

const navigation = [
  'Overview',
  'Agriculture / NeoAgro',
  'Energy / NeoGrid',
  'Infrastructure / NeoCell',
  'NOVA Core AI',
  'Digital Twin',
  'Knowledge Graph',
  'Recommendations',
  'Impact Reports',
  'Demo Script',
  'Settings',
];

const recommendations = [
  {
    title: 'Shift irrigation to evening window',
    priority: 'High',
    confidence: 87,
    water: '3.2 m3 saved',
    carbon: '7.5 kg CO2e avoided',
    resilience: '+5%',
    status: 'Operator approval required',
  },
  {
    title: 'Preserve battery reserve before heat peak',
    priority: 'High',
    confidence: 82,
    water: 'No direct water change',
    carbon: '14.3 kg CO2e avoided',
    resilience: '+4%',
    status: 'Operator approval required',
  },
  {
    title: 'Run pre-heatwave infrastructure readiness check',
    priority: 'Medium',
    confidence: 79,
    water: 'Protects irrigation availability',
    carbon: 'Prevents inefficient fallback operation',
    resilience: '+3%',
    status: 'Operator approval required',
  },
];

const twinAssets = ['Solar Array', 'Battery', 'Pump', 'Field Zone', 'Crop Output'];
const graphEdges = [
  'Solar Array powers Battery',
  'Battery powers Pump',
  'Pump irrigates Field Zone',
  'Field Zone produces Crop',
  'NOVA calculates impact',
];

const pitchSteps = [
  'Open NOVA OS Command Center',
  'Show SolarHub heatwave scenario',
  'Show fallback or connected service status',
  'Explain NeoAgro crop and water risk',
  'Explain NeoGrid solar, battery, and grid plan',
  'Explain NeoCell infrastructure readiness',
  'Show NOVA Core recommendation and assistant explanation',
  'Show Digital Twin and Knowledge Graph',
  'Close with operator-approved action and measured impact',
];

export default async function HomePage() {
  const services = await getServiceSnapshots();
  const impact = aggregateImpact(services);

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brandMark">N</span>
          <div>
            <div className="logo">NOVA OS</div>
            <div className="subtle">SolarHub Command Center</div>
          </div>
        </div>
        <nav className="sideNav">
          {navigation.map((item) => (
            <a href={`#${item.toLowerCase().replaceAll(' ', '-').replaceAll('/', '')}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="kicker">SolarHub Agrivoltaic Demo Site</div>
            <strong>Heatwave agrivoltaic optimization</strong>
          </div>
          <div className="navlinks">
            <span className="badge">Demo mode</span>
            <span className="badge">Fallback safe</span>
            <span className="badge">{impact.connected}/{impact.total} services connected</span>
          </div>
        </header>

        <section className="card hero" id="overview">
          <div className="kicker">NeoHaven AI Urban Labs</div>
          <h1>NOVA OS turns fragmented agriculture, energy, and infrastructure data into operator-approved action.</h1>
          <p>
            The GitHub Command Center now follows the same pitch demo structure as the Lovable and Figma direction:
            observe the SolarHub site, explain the heatwave risk, recommend operator-approved actions, and show measured
            water, carbon, resilience, and yield impact.
          </p>
          <div className="module-line">
            <span>Decision intelligence layer</span>
            <strong>No autonomous physical control</strong>
          </div>
        </section>

        <section className="grid grid-4" id="impact-reports">
          <div className="card">
            <div className="kicker">Demo Readiness</div>
            <div className="value">{impact.demoReadiness}%</div>
            <p>Fallback mode keeps the demo reliable when local services are offline.</p>
          </div>
          <div className="card">
            <div className="kicker">Water Savings</div>
            <div className="value">{impact.waterSavingsM3} m3</div>
            <p>From irrigation timing and field intelligence.</p>
          </div>
          <div className="card">
            <div className="kicker">Carbon Reduction</div>
            <div className="value">{impact.carbonReductionKg} kg CO2e</div>
            <p>From solar, battery, and load coordination.</p>
          </div>
          <div className="card">
            <div className="kicker">Resilience / Yield</div>
            <div className="value">{impact.resilienceGainPct}% / 11%</div>
            <p>Resilience gain and expected yield risk reduction.</p>
          </div>
        </section>

        <section className="grid grid-2">
          {services.map((service) => (
            <div className="card moduleCard" id={service.id} key={service.id}>
              <div className="kicker">{service.name}</div>
              <h2>{service.scenario}</h2>
              <p>{service.role}</p>
              <span className={`badge ${service.status === 'connected' ? 'status-ok' : 'status-fallback'}`}>
                {service.status === 'connected' ? 'Connected' : 'Fallback mode'}
              </span>
              <span className="badge">{service.endpoint}</span>
              <div className="grid grid-3 compactGrid">
                {service.kpis.map((kpi) => (
                  <div className="card metricCard" key={kpi.label}>
                    <div className="kicker">{kpi.trend || 'metric'}</div>
                    <h3>{kpi.label}</h3>
                    <div className="value smallValue">{format(kpi.value, kpi.unit)}</div>
                  </div>
                ))}
              </div>
              <div className="card recommendation" style={{ marginTop: 16 }}>
                <div className="kicker">Recommended action</div>
                <h3>{service.recommendation}</h3>
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-3" id="recommendations">
          {recommendations.map((rec) => (
            <article className="card recommendation actionCard" key={rec.title}>
              <div className="kicker">{rec.priority} priority / {rec.confidence}% confidence</div>
              <h2>{rec.title}</h2>
              <p>{rec.status}</p>
              <div className="impactRows">
                <span>{rec.water}</span>
                <span>{rec.carbon}</span>
                <span>{rec.resilience} resilience</span>
              </div>
            </article>
          ))}
        </section>

        <section className="grid grid-2">
          <div className="card" id="digital-twin">
            <div className="kicker">Digital Twin</div>
            <h2>Simplified asset map</h2>
            <div className="chain">
              {twinAssets.map((asset) => <span key={asset}>{asset}</span>)}
            </div>
          </div>
          <div className="card" id="knowledge-graph">
            <div className="kicker">Knowledge Graph</div>
            <h2>Operational relationships</h2>
            <div className="timeline">
              {graphEdges.map((edge) => (
                <div className="timeline-item" key={edge}><strong>{edge}</strong></div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-2">
          <div className="card" id="demo-script">
            <div className="kicker">Demo Script</div>
            <h2>Two-minute pitch flow</h2>
            <div className="timeline">
              {pitchSteps.map((item, index) => (
                <div className="timeline-item" key={item}>
                  <strong>{index + 1}. {item}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="card" id="nova-core-ai">
            <div className="kicker">What NOVA answers</div>
            <h2>Decision loop</h2>
            <p>What is happening? Heat and water risk are rising.</p>
            <p>Why does it matter? Crop stress, derating, and readiness risk converge.</p>
            <p>What will happen next? Water demand rises 18% before the heat peak.</p>
            <p>What should the team do? Approve the recommended timing and readiness actions.</p>
            <p>What impact will it have? 3.2 m3 water, 21.8 kg CO2e, 12% resilience, 11% yield risk reduction.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

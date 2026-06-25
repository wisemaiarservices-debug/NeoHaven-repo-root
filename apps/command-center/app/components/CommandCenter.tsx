import {
  assets,
  energySeries,
  fieldZones,
  graphEdges,
  impactMetrics,
  infrastructureStats,
  navItems,
  pitchSteps,
  recommendations,
  serviceStatuses,
  topKpis,
  twinChain,
  type ViewKey,
} from '../../lib/demo-data';

function BarChart() {
  const max = Math.max(...energySeries);
  return (
    <div className="nova-bars" aria-label="Solar production chart">
      {energySeries.map((value, index) => (
        <span key={`${value}-${index}`} style={{ height: `${Math.max(8, (value / max) * 100)}%` }} />
      ))}
    </div>
  );
}

function Shell({ children, view }: { children: React.ReactNode; view: ViewKey }) {
  return (
    <div className="nova-shell">
      <aside className="nova-sidebar">
        <div className="nova-brand">
          <div className="nova-mark">N</div>
          <div>
            <div className="nova-title">NOVA OS</div>
            <div className="nova-subtitle">Command Center</div>
          </div>
        </div>
        <nav className="nova-nav" aria-label="NOVA OS sections">
          {navItems.map((item) => (
            <a className={view === item.key ? 'active' : ''} href={item.href} key={item.href}>
              <span>{item.label}</span>
              <small>{item.eyebrow}</small>
            </a>
          ))}
        </nav>
        <div className="nova-sidebar-card">
          <span className="micro">Demo Integrity</span>
          <strong>Fallback safe</strong>
          <p>Renders without external services. Live APIs can connect when available.</p>
        </div>
      </aside>

      <div className="nova-main">
        <header className="nova-topbar">
          <div>
            <span className="micro">SolarHub Agrivoltaic Demo Site</span>
            <strong>Heatwave agrivoltaic optimization</strong>
          </div>
          <div className="status-cluster">
            {serviceStatuses.map((service) => (
              <span className={`chip tone-${service.tone}`} key={service.id}>{service.name}: {service.status}</span>
            ))}
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-grid">
      <article className="hero-copy glass-panel">
        <div className="micro">NeoHaven AI Urban Labs</div>
        <h1>NOVA OS — AI Operating System for Sustainable Infrastructure</h1>
        <p>
          From fragmented infrastructure data to operator-approved action. NOVA OS unifies agriculture,
          renewable energy, infrastructure readiness, Digital Twin context, Knowledge Graph relationships,
          AI recommendations, scenario simulation, and impact reporting.
        </p>
        <div className="hero-actions">
          <span className="primary-pill">Pitch-ready command center</span>
          <span className="secondary-pill">No autonomous physical control</span>
        </div>
      </article>
      <article className="site-map glass-panel">
        <div className="micro">Live Demo Story</div>
        <div className="site-grid">
          <span className="node solar">Solar Array</span>
          <span className="node battery">Battery</span>
          <span className="node pump">Pump</span>
          <span className="node field">Field Zone</span>
          <span className="node crop">Crop Output</span>
        </div>
        <p>Digital Twin route: solar array → battery → pump → field zone → crop output.</p>
      </article>
    </section>
  );
}

function KpiStrip() {
  return (
    <section className="kpi-strip" aria-label="Key performance indicators">
      {topKpis.map((kpi) => (
        <article className={`kpi-card tone-${kpi.tone}`} key={kpi.label}>
          <span className="micro">{kpi.trend}</span>
          <strong>{kpi.value}</strong>
          <p>{kpi.label}</p>
        </article>
      ))}
    </section>
  );
}

function ServiceGrid() {
  return (
    <section className="service-grid">
      {serviceStatuses.map((service) => (
        <article className={`service-card glass-panel tone-${service.tone}`} key={service.id}>
          <div className="module-head">
            <span className="pulse-dot" />
            <span>{service.status}</span>
            <small>{service.endpoint}</small>
          </div>
          <h2>{service.name}</h2>
          <h3>{service.label}</h3>
          <p>{service.description}</p>
          <div className="module-footer">
            <span>{service.health}</span>
            <span>Demo data deterministic</span>
          </div>
        </article>
      ))}
    </section>
  );
}

function AgriculturePanel() {
  return (
    <section className="dashboard-grid two-one">
      <article className="glass-panel wide">
        <div className="section-heading">
          <span className="micro">NOVA Agriculture / NeoAgro</span>
          <h2>Field zones, crop stress, and irrigation timing</h2>
        </div>
        <div className="zone-grid">
          {fieldZones.map((zone) => (
            <div className={`zone-card zone-${zone.status}`} key={zone.id}>
              <strong>{zone.id}</strong>
              <span>{zone.crop}</span>
              <small>Health {zone.health}% / VWC {zone.moisture}%</small>
            </div>
          ))}
        </div>
      </article>
      <article className="glass-panel recommendation-panel">
        <span className="micro">AI Recommendation</span>
        <h2>Shift irrigation to evening window</h2>
        <p>Reduces midday evaporation, protects Zone 4-B, and lowers yield risk during the forecast heat peak.</p>
        <div className="approval-line">Operator approval required</div>
      </article>
    </section>
  );
}

function EnergyPanel() {
  return (
    <section className="dashboard-grid one-one">
      <article className="glass-panel">
        <div className="section-heading">
          <span className="micro">NOVA Energy / NeoGrid</span>
          <h2>Solar, battery, grid, and carbon coordination</h2>
        </div>
        <BarChart />
        <div className="energy-legend">
          <span>Peak 487 kW</span>
          <span>Battery SOC 67%</span>
          <span>Grid import 4.8 kW</span>
        </div>
      </article>
      <article className="glass-panel recommendation-panel gold-border">
        <span className="micro">Energy Plan</span>
        <h2>Preserve reserve before heat peak</h2>
        <p>Coordinate battery charging with irrigation timing to reduce grid dependency and protect pump availability.</p>
        <div className="impact-list">
          <span>14.3 kg CO2e avoided</span>
          <span>+4% resilience</span>
        </div>
      </article>
    </section>
  );
}

function InfrastructurePanel() {
  return (
    <section className="dashboard-grid four">
      {infrastructureStats.map((stat) => (
        <article className="glass-panel compact" key={stat.label}>
          <span className="micro">NeoCell</span>
          <strong>{stat.value}</strong>
          <p>{stat.label}</p>
          <small>{stat.note}</small>
        </article>
      ))}
    </section>
  );
}

function NovaCorePanel() {
  return (
    <section className="dashboard-grid four-cards">
      <article className="glass-panel ai-card">
        <span className="micro">Forecast</span>
        <h2>Heat and water risk rising</h2>
        <p>Water demand is projected to rise 18% before peak heat while soil moisture drops in Zone 4-B.</p>
      </article>
      <article className="glass-panel ai-card">
        <span className="micro">Recommend</span>
        <h2>Coordinate water and battery actions</h2>
        <p>NOVA recommends evening irrigation and battery reserve protection for operator approval.</p>
      </article>
      <article className="glass-panel ai-card">
        <span className="micro">Simulate</span>
        <h2>Baseline vs optimized</h2>
        <p>Optimized scenario saves 3.2 m3 water and reduces 21.8 kg CO2e with +12% resilience gain.</p>
      </article>
      <article className="glass-panel ai-card">
        <span className="micro">Explain</span>
        <h2>Why it matters</h2>
        <p>Crop stress, solar derating, pump readiness, and battery reserve converge during the same risk window.</p>
      </article>
    </section>
  );
}

function TwinAndGraph() {
  return (
    <section className="dashboard-grid one-one">
      <article className="glass-panel">
        <span className="micro">Digital Twin</span>
        <h2>Site relationship map</h2>
        <div className="chain-map">
          {twinChain.map((node) => <span key={node}>{node}</span>)}
        </div>
      </article>
      <article className="glass-panel">
        <span className="micro">Knowledge Graph</span>
        <h2>Operational relationships</h2>
        <div className="edge-list">
          {graphEdges.map((edge) => <span key={edge}>{edge}</span>)}
        </div>
      </article>
    </section>
  );
}

function AssetRegistry() {
  return (
    <section className="glass-panel asset-panel">
      <div className="section-heading">
        <span className="micro">Universal Asset Registry</span>
        <h2>Shared NOVA asset layer</h2>
      </div>
      <div className="asset-table">
        {assets.map((asset) => (
          <div className="asset-row" key={asset.code}>
            <span>{asset.type}</span>
            <strong>{asset.name}</strong>
            <span>{asset.code}</span>
            <span>{asset.status}</span>
            <span>{asset.owner}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Recommendations() {
  return (
    <section className="recommendation-grid">
      {recommendations.map((rec) => (
        <article className="glass-panel rec-card" key={rec.title}>
          <div className="module-head">
            <span className="pulse-dot gold" />
            <span>{rec.priority} priority</span>
            <small>{rec.confidence} confidence</small>
          </div>
          <h2>{rec.title}</h2>
          <p>{rec.owner}</p>
          <div className="impact-list">
            <span>{rec.water}</span>
            <span>{rec.carbon}</span>
            <span>{rec.resilience} resilience</span>
          </div>
          <div className="approval-line">{rec.status}</div>
        </article>
      ))}
    </section>
  );
}

function ImpactSummary() {
  return (
    <section className="impact-grid">
      {impactMetrics.map((metric) => (
        <article className="glass-panel impact-card" key={metric.label}>
          <span className="micro">Expected Impact</span>
          <strong>{metric.value}</strong>
          <h3>{metric.label}</h3>
          <p>{metric.note}</p>
        </article>
      ))}
    </section>
  );
}

function DemoScript() {
  return (
    <section className="glass-panel script-panel">
      <span className="micro">Presentation Walkthrough</span>
      <h2>Two-minute SolarHub pitch flow</h2>
      <div className="script-list">
        {pitchSteps.map((step, index) => (
          <div className="script-row" key={step}>
            <strong>{String(index + 1).padStart(2, '0')}</strong>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Overview() {
  return (
    <>
      <Hero />
      <KpiStrip />
      <ServiceGrid />
      <AgriculturePanel />
      <EnergyPanel />
      <InfrastructurePanel />
      <NovaCorePanel />
      <Recommendations />
      <TwinAndGraph />
      <AssetRegistry />
      <ImpactSummary />
      <DemoScript />
    </>
  );
}

function FocusPage({ view }: { view: ViewKey }) {
  if (view === 'agriculture') return <><Hero /><KpiStrip /><AgriculturePanel /><Recommendations /><TwinAndGraph /></>;
  if (view === 'energy') return <><Hero /><KpiStrip /><EnergyPanel /><Recommendations /><ImpactSummary /></>;
  if (view === 'infrastructure') return <><Hero /><KpiStrip /><InfrastructurePanel /><AssetRegistry /><Recommendations /></>;
  if (view === 'ai') return <><Hero /><KpiStrip /><NovaCorePanel /><Recommendations /><TwinAndGraph /><ImpactSummary /></>;
  if (view === 'demo') return <><Hero /><KpiStrip /><DemoScript /><ServiceGrid /><ImpactSummary /></>;
  return <Overview />;
}

export function CommandCenter({ view = 'overview' }: { view?: ViewKey }) {
  return (
    <Shell view={view}>
      <main className="nova-content">
        <FocusPage view={view} />
      </main>
    </Shell>
  );
}

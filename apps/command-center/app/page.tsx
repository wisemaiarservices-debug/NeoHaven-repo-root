import { aggregateImpact, getServiceSnapshots } from '../lib/services';

function format(value: number | string, unit?: string) {
  return `${value}${unit ? ' ' + unit : ''}`;
}

export default async function HomePage() {
  const services = await getServiceSnapshots();
  const impact = aggregateImpact(services);

  return (
    <main className="container">
      <nav className="nav">
        <div className="logo">NOVA COMMAND CENTER</div>
        <div className="navlinks">
          <span className="badge">SolarHub Demo</span>
          <span className="badge">NOVA OS</span>
          <span className="badge">GitHub-first build</span>
        </div>
      </nav>

      <section className="card hero">
        <div className="kicker">NeoHaven AI Urban Labs</div>
        <h1>One operating view for sustainable systems.</h1>
        <p>
          NOVA Command Center brings NOVA Core, NeoAgro, NeoGrid, and NeoCell into one SolarHub demo view.
        </p>
        <div className="module-line">
          <span>Connected services</span>
          <strong>{impact.connected}/{impact.total}</strong>
        </div>
      </section>

      <section className="grid grid-4">
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
          <div className="value">{impact.carbonReductionKg} kg</div>
          <p>From solar, battery, and load coordination.</p>
        </div>
        <div className="card">
          <div className="kicker">Resilience Gain</div>
          <div className="value">{impact.resilienceGainPct}%</div>
          <p>From readiness and field telemetry.</p>
        </div>
      </section>

      <section className="grid grid-2">
        {services.map((service) => (
          <div className="card" key={service.id}>
            <div className="kicker">{service.name}</div>
            <h2>{service.scenario}</h2>
            <p>{service.role}</p>
            <span className={`badge ${service.status === 'connected' ? 'status-ok' : 'status-fallback'}`}>
              {service.status === 'connected' ? 'Connected' : 'Fallback mode'}
            </span>
            <span className="badge">{service.endpoint}</span>
            <div className="grid grid-3">
              {service.kpis.map((kpi) => (
                <div className="card" key={kpi.label}>
                  <div className="kicker">{kpi.trend || 'metric'}</div>
                  <h3>{kpi.label}</h3>
                  <div className="value">{format(kpi.value, kpi.unit)}</div>
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

      <section className="grid grid-2">
        <div className="card">
          <div className="kicker">Demo Timeline</div>
          <h2>SolarHub story</h2>
          <div className="timeline">
            {['NeoCell checks field readiness', 'NeoAgro forecasts crop and water risk', 'NeoGrid coordinates energy timing', 'NOVA Core explains the recommendation', 'Measured impact is displayed'].map((item, index) => (
              <div className="timeline-item" key={item}>
                <strong>{index + 1}. {item}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="kicker">What NOVA answers</div>
          <h2>Decision loop</h2>
          <p>What is happening?</p>
          <p>Why does it matter?</p>
          <p>What will happen next?</p>
          <p>What should the team do?</p>
          <p>What impact will it have?</p>
        </div>
      </section>
    </main>
  );
}

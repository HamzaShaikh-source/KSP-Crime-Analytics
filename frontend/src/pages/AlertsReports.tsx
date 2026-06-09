import { alerts } from '../data/mockData'

const severityColors: Record<string, string> = {
  critical: '#ef4444',
  high: '#eab308',
  medium: '#3b82f6',
  low: '#94a3b8',
}

export default function AlertsReports() {
  const sortedAlerts = [...alerts].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 }
    return order[a.severity] - order[b.severity]
  })

  return (
    <div>
      <div className="mb-4">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Alerts & Reports</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Real-time anomaly alerts, trend notifications, and auto-generated reports</p>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div className="stat-card">
          <span className="stat-label">Total Alerts</span>
          <span className="stat-value" style={{ color: 'var(--accent-red)' }}>{alerts.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Critical</span>
          <span className="stat-value" style={{ color: 'var(--accent-red)' }}>{alerts.filter(a => a.severity === 'critical').length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">High</span>
          <span className="stat-value" style={{ color: 'var(--accent-yellow)' }}>{alerts.filter(a => a.severity === 'high').length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Resolved Today</span>
          <span className="stat-value" style={{ color: 'var(--accent-green)' }}>5</span>
        </div>
      </div>

      {/* Alert Timeline */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Alert Timeline</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {sortedAlerts.map(alert => (
            <div
              key={alert.id}
              style={{
                padding: '1rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '0.5rem',
                borderLeft: `3px solid ${severityColors[alert.severity]}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                <div style={{ textAlign: 'center', minWidth: '50px' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', color: severityColors[alert.severity] }}>
                    {alert.severity}
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: severityColors[alert.severity] }}>
                    {alert.type === 'Anomaly Spike' ? '⚡' :
                     alert.type === 'Hotspot Alert' ? '🔥' :
                     alert.type === 'Repeat Offender' ? '👤' :
                     alert.type === 'Trend Alert' ? '📈' : '🔔'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{alert.title}</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{alert.description}</p>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    <span>📍 {alert.district}</span>
                    <span>🆔 {alert.id}</span>
                    <span>🕐 {new Date(alert.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                <button style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--border-color)',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}>Acknowledge</button>
                <button style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--accent-blue)',
                  background: 'rgba(59,130,246,0.1)',
                  color: 'var(--accent-blue)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reports Section */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Auto-Generated Reports</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {[
            { title: 'Daily Crime Brief', period: 'Today', status: 'Available', size: '2.4 MB' },
            { title: 'Weekly Trend Report', period: 'Jun 2-8, 2026', status: 'Available', size: '4.1 MB' },
            { title: 'Monthly Crime Analysis', period: 'May 2026', status: 'Available', size: '8.7 MB' },
            { title: 'District Performance Report', period: 'Q2 2026', status: 'Generating...', size: '-' },
            { title: 'Cyber Crime Special Report', period: '2026 YTD', status: 'Available', size: '3.2 MB' },
            { title: 'Hotspot Analysis', period: 'Last 30 days', status: 'Available', size: '1.8 MB' },
          ].map((report, i) => (
            <div key={i} style={{
              padding: '1rem',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '0.5rem',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{report.title}</span>
                <span style={{ fontSize: '0.7rem', color: report.status === 'Available' ? 'var(--accent-green)' : 'var(--accent-yellow)' }}>
                  {report.status === 'Available' ? '✅' : '⏳'} {report.status}
                </span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                Period: {report.period} • Size: {report.size}
              </div>
              {report.status === 'Available' && (
                <button style={{
                  marginTop: '0.5rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--accent-blue)',
                  background: 'rgba(59,130,246,0.1)',
                  color: 'var(--accent-blue)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                }}>Download PDF</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Configuration */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>Alert Configuration</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { rule: 'Crime Spike Threshold', desc: 'Alert when category exceeds 2σ from 30-day rolling avg', enabled: true },
            { rule: 'Repeat Offender Activity', desc: 'Alert when known offender is linked to new case', enabled: true },
            { rule: 'Night Crime Concentration', desc: 'Alert when 5+ night crimes within 1km radius in 24h', enabled: true },
            { rule: 'Resource Gap Detection', desc: 'Alert when shift coverage falls below 70%', enabled: false },
            { rule: 'POCSO Case Clustering', desc: 'Alert when 3+ POCSO cases in same area within 7 days', enabled: true },
          ].map((rule, i) => (
            <div key={i} style={{
              padding: '0.75rem',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '0.5rem',
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{rule.rule}</span>
                <span style={{
                  width: 12, height: 12,
                  borderRadius: '50%',
                  background: rule.enabled ? 'var(--accent-green)' : 'var(--text-secondary)',
                  display: 'inline-block',
                }} />
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{rule.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

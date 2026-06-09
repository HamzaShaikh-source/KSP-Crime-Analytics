import { districtData2025, crimeTrends, alerts } from '../data/mockData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts'

export default function CommandCenter() {
  const totalIPCCrimes = districtData2025.reduce((sum, d) => sum + d.ipcCrimes, 0)
  const totalSLLCrimes = districtData2025.reduce((sum, d) => sum + d.sllCrimes, 0)
  const totalCyberCrime = districtData2025.reduce((sum, d) => sum + d.cyberCrime, 0)
  const topDistrict = [...districtData2025].sort((a, b) => b.ipcCrimes + b.sllCrimes - a.ipcCrimes - a.sllCrimes)[0]

  const districtRanking = [...districtData2025]
    .sort((a, b) => (b.ipcCrimes + b.sllCrimes) - (a.ipcCrimes + a.sllCrimes))
    .slice(0, 8)

  const recentAlerts = alerts.filter(a => a.severity === 'critical' || a.severity === 'high').slice(0, 4)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Command Center</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Karnataka State Police • Real-time Crime Intelligence Dashboard</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--accent-green)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block' }} />
            System Online
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Updated: {new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div className="stat-card">
          <span className="stat-label">Total IPC/BNS Crimes (2025)</span>
          <span className="stat-value" style={{ color: 'var(--accent-cyan)' }}>{totalIPCCrimes.toLocaleString()}</span>
          <span className="stat-change" style={{ color: 'var(--accent-green)' }}>↑ 4.2% YoY</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total SLL Crimes (2025)</span>
          <span className="stat-value" style={{ color: 'var(--accent-yellow)' }}>{totalSLLCrimes.toLocaleString()}</span>
          <span className="stat-change" style={{ color: 'var(--accent-red)' }}>↑ 6.8% YoY</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Cyber Crime Cases</span>
          <span className="stat-value" style={{ color: 'var(--accent-purple)' }}>{totalCyberCrime.toLocaleString()}</span>
          <span className="stat-change" style={{ color: 'var(--accent-red)' }}>↑ 28.3% YoY</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Highest Crime District</span>
          <span className="stat-value" style={{ fontSize: '1.2rem', color: 'var(--accent-red)' }}>{topDistrict.name}</span>
          <span className="stat-change" style={{ color: 'var(--text-secondary)' }}>{(topDistrict.ipcCrimes + topDistrict.sllCrimes).toLocaleString()} total cases</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active Hotspots</span>
          <span className="stat-value" style={{ color: 'var(--accent-orange)' }}>12</span>
          <span className="stat-change" style={{ color: 'var(--accent-yellow)' }}>3 new this week</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active Alerts</span>
          <span className="stat-value" style={{ color: 'var(--accent-red)' }}>{alerts.length}</span>
          <span className="stat-change" style={{ color: 'var(--accent-red)' }}>{alerts.filter(a => a.severity === 'critical').length} critical</span>
        </div>
      </div>

      {/* Charts Row */}
      <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr', marginTop: '1rem' }}>
        {/* Crime Trend */}
        <div className="card">
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Crime Trend (2024-2025)</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={crimeTrends}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3040" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#1a1f2e', border: '1px solid #2a3040', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Area type="monotone" dataKey="total" stroke="#3b82f6" fill="url(#colorTotal)" strokeWidth={2} />
              <Line type="monotone" dataKey="thefts" stroke="#eab308" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="cyberCrime" stroke="#a855f7" strokeWidth={1.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Districts */}
        <div className="card">
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Top Districts by Crime</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {districtRanking.map((d, i) => {
              const total = d.ipcCrimes + d.sllCrimes
              const maxTotal = districtRanking[0].ipcCrimes + districtRanking[0].sllCrimes
              const pct = (total / maxTotal) * 100
              return (
                <div key={d.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'var(--text-primary)' }}>{i + 1}. {d.name}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{total.toLocaleString()}</span>
                  </div>
                  <div className="district-bar">
                    <div className="district-bar-fill" style={{
                      width: `${pct}%`,
                      background: i === 0 ? 'var(--accent-red)' : i < 3 ? 'var(--accent-yellow)' : 'var(--accent-blue)'
                    }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Alerts Ticker */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-red)', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
          <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Active Alerts</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {recentAlerts.map(alert => (
            <div key={alert.id} className={`alert-${alert.severity}`} style={{
              padding: '0.75rem 1rem',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    padding: '0.15rem 0.4rem',
                    borderRadius: '0.25rem',
                    background: alert.severity === 'critical' ? 'rgba(239,68,68,0.2)' : 'rgba(234,179,8,0.2)',
                    color: alert.severity === 'critical' ? 'var(--accent-red)' : 'var(--accent-yellow)',
                    textTransform: 'uppercase'
                  }}>{alert.severity}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{alert.title}</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{alert.description}</p>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.7rem', color: 'var(--text-secondary)', flexShrink: 0 }}>
                <div>{alert.district}</div>
                <div>{new Date(alert.timestamp).toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}

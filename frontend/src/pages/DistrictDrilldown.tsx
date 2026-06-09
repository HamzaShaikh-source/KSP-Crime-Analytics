import { useState } from 'react'
import { districtData2025 } from '../data/mockData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const crimeTypeColors: Record<string, string> = {
  'Murder': '#ef4444',
  'Robbery': '#f97316',
  'Theft': '#eab308',
  'Cyber Crime': '#a855f7',
  'Assault': '#3b82f6',
  'Burglary': '#06b6d4',
  'POCSO': '#ec4899',
  'SC/ST': '#8b5cf6',
}

export default function DistrictDrilldown() {
  const [selectedId, setSelectedId] = useState(districtData2025[0].id)
  const district = districtData2025.find(d => d.id === selectedId) || districtData2025[0]
  const total = district.ipcCrimes + district.sllCrimes

  const crimeBreakdown = [
    { name: 'Murder', value: district.murder, color: crimeTypeColors['Murder'] },
    { name: 'Robbery', value: district.robbery, color: crimeTypeColors['Robbery'] },
    { name: 'Theft', value: district.theft, color: crimeTypeColors['Theft'] },
    { name: 'Cyber Crime', value: district.cyberCrime, color: crimeTypeColors['Cyber Crime'] },
    { name: 'Burglary', value: district.burglary, color: crimeTypeColors['Burglary'] },
    { name: 'POCSO', value: district.pocso, color: crimeTypeColors['POCSO'] },
    { name: 'SC/ST', value: district.scst, color: crimeTypeColors['SC/ST'] },
  ].filter(c => c.value > 0)

  const districtComparison = districtData2025
    .sort((a, b) => (b.ipcCrimes + b.sllCrimes) - (a.ipcCrimes + a.sllCrimes))
    .slice(0, 10)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>District Deep-Dive</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Detailed crime analysis by district</p>
        </div>
        <select
          value={selectedId}
          onChange={e => setSelectedId(Number(e.target.value))}
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
          }}
        >
          {districtData2025.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div className="stat-card">
          <span className="stat-label">Range</span>
          <span className="stat-value" style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)' }}>{district.range}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">IPC/BNS Crimes</span>
          <span className="stat-value" style={{ color: 'var(--accent-blue)' }}>{district.ipcCrimes.toLocaleString()}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">SLL Crimes</span>
          <span className="stat-value" style={{ color: 'var(--accent-yellow)' }}>{district.sllCrimes.toLocaleString()}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Cases</span>
          <span className="stat-value" style={{ color: 'var(--accent-red)' }}>{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr', marginTop: '1rem' }}>
        {/* Crime Breakdown Pie */}
        <div className="card">
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Crime Type Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={crimeBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {crimeBreakdown.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#1a1f2e', border: '1px solid #2a3040', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Comparison */}
        <div className="card">
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>District Comparison (Top 10)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={districtComparison} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3040" />
              <XAxis type="number" stroke="#94a3b8" fontSize={12} />
              <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={11} width={110} />
              <Tooltip
                contentStyle={{ background: '#1a1f2e', border: '1px solid #2a3040', borderRadius: '8px' }}
              />
              <Bar dataKey="ipcCrimes" fill="#3b82f6" name="IPC/BNS" stackId="a" />
              <Bar dataKey="sllCrimes" fill="#eab308" name="SLL" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* District Details Table */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>All Crime Types in {district.name}</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-secondary)' }}>Crime Type</th>
                <th style={{ textAlign: 'right', padding: '0.5rem', color: 'var(--text-secondary)' }}>Cases</th>
                <th style={{ textAlign: 'right', padding: '0.5rem', color: 'var(--text-secondary)' }}>% of Total</th>
                <th style={{ textAlign: 'right', padding: '0.5rem', color: 'var(--text-secondary)' }}>Severity</th>
              </tr>
            </thead>
            <tbody>
              {crimeBreakdown.map(c => (
                <tr key={c.name} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.5rem' }}>
                    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: c.color, marginRight: '0.5rem' }} />
                    {c.name}
                  </td>
                  <td style={{ textAlign: 'right', padding: '0.5rem', fontWeight: 600 }}>{c.value.toLocaleString()}</td>
                  <td style={{ textAlign: 'right', padding: '0.5rem', color: 'var(--text-secondary)' }}>
                    {((c.value / total) * 100).toFixed(1)}%
                  </td>
                  <td style={{ textAlign: 'right', padding: '0.5rem' }}>
                    <span style={{
                      padding: '0.15rem 0.4rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      background: c.value > 500 ? 'rgba(239,68,68,0.2)' : c.value > 100 ? 'rgba(234,179,8,0.2)' : 'rgba(34,197,94,0.2)',
                      color: c.value > 500 ? 'var(--accent-red)' : c.value > 100 ? 'var(--accent-yellow)' : 'var(--accent-green)',
                    }}>
                      {c.value > 500 ? 'Critical' : c.value > 100 ? 'High' : 'Moderate'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

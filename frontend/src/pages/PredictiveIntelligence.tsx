import { useState } from 'react'
import { districtData2025 } from '../data/mockData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function PredictiveIntelligence() {
  const [selectedDistrict, setSelectedDistrict] = useState(districtData2025[0].name)

  const district = districtData2025.find(d => d.name === selectedDistrict) || districtData2025[0]

  // Risk score calculation based on crime data
  const riskScore = Math.min(100, Math.round(
    ((district.ipcCrimes + district.sllCrimes) / 50000) * 40 +
    (district.murder / 200) * 20 +
    (district.cyberCrime / 20000) * 25 +
    (district.robbery / 800) * 15
  ))

  const nextWeekForecast = [
    { day: 'Mon', predicted: 45, upper: 58, lower: 32 },
    { day: 'Tue', predicted: 42, upper: 55, lower: 29 },
    { day: 'Wed', predicted: 48, upper: 62, lower: 34 },
    { day: 'Thu', predicted: 52, upper: 68, lower: 36 },
    { day: 'Fri', predicted: 58, upper: 75, lower: 41 },
    { day: 'Sat', predicted: 55, upper: 70, lower: 40 },
    { day: 'Sun', predicted: 50, upper: 64, lower: 36 },
  ]

  const districtRisks = districtData2025.map(d => {
    const score = Math.min(100, Math.round(
      ((d.ipcCrimes + d.sllCrimes) / 50000) * 40 +
      (d.murder / 200) * 20 +
      (d.cyberCrime / 20000) * 25 +
      (d.robbery / 800) * 15
    ))
    return { name: d.name, score, level: score > 70 ? 'Critical' : score > 45 ? 'High' : score > 25 ? 'Medium' : 'Low' }
  }).sort((a, b) => b.score - a.score)

  return (
    <div>
      <div className="mb-4">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Predictive Intelligence</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>AI/ML-powered crime forecasting and risk scoring</p>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div className="stat-card">
          <span className="stat-label">Risk Score</span>
          <span className="stat-value" style={{
            color: riskScore > 70 ? 'var(--accent-red)' : riskScore > 45 ? 'var(--accent-yellow)' : 'var(--accent-green)'
          }}>{riskScore}/100</span>
          <span className="stat-change" style={{ color: 'var(--text-secondary)' }}>{district.name}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Next Week Trend</span>
          <span className="stat-value" style={{ color: 'var(--accent-orange)', fontSize: '1.2rem' }}>↑ +8.2%</span>
          <span className="stat-change" style={{ color: 'var(--accent-red)' }}>Above seasonal baseline</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">High Risk Districts</span>
          <span className="stat-value" style={{ color: 'var(--accent-red)' }}>{districtRisks.filter(d => d.score > 70).length}</span>
          <span className="stat-change" style={{ color: 'var(--text-secondary)' }}>Need immediate attention</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Model Confidence</span>
          <span className="stat-value" style={{ color: 'var(--accent-cyan)' }}>86%</span>
          <span className="stat-change" style={{ color: 'var(--accent-green)' }}>↑ 2.1% from last week</span>
        </div>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr', marginTop: '1rem' }}>
        {/* 7-Day Forecast */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>7-Day Crime Forecast</h2>
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
              }}
            >
              {districtData2025.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={nextWeekForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3040" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#1a1f2e', border: '1px solid #2a3040', borderRadius: '8px' }}
              />
              <Line type="monotone" dataKey="upper" stroke="#ef4444" strokeWidth={1} strokeDasharray="5 5" dot={false} />
              <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="lower" stroke="#22c55e" strokeWidth={1} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            <span><span style={{ color: '#ef4444' }}>━━</span> Upper Bound</span>
            <span><span style={{ color: '#3b82f6' }}>━━</span> Predicted</span>
            <span><span style={{ color: '#22c55e' }}>━━</span> Lower Bound</span>
          </div>
        </div>

        {/* District Risk Ranking */}
        <div className="card">
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>District Risk Ranking</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {districtRisks.slice(0, 10).map((d, i) => (
              <div key={d.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                  <span>{i + 1}. {d.name}</span>
                  <span style={{
                    fontWeight: 600,
                    color: d.level === 'Critical' ? 'var(--accent-red)' : d.level === 'High' ? 'var(--accent-yellow)' : 'var(--accent-green)'
                  }}>{d.score}/100</span>
                </div>
                <div className="district-bar">
                  <div className="district-bar-fill" style={{
                    width: `${d.score}%`,
                    background: d.level === 'Critical' ? 'var(--accent-red)' : d.level === 'High' ? 'var(--accent-yellow)' : 'var(--accent-green)'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ML Model Info */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>ML Models Active</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {[
            { name: 'Crime Risk Predictor', type: 'AutoML (Regression)', accuracy: '87.3%', features: 'Location, time, historical density, socio-economics' },
            { name: 'Hotspot Detector', type: 'QuickML (K-Means)', accuracy: '92.1%', features: 'GPS coordinates, crime type, frequency' },
            { name: 'Repeat Offender Classifier', type: 'AutoML (Binary)', accuracy: '84.6%', features: 'Age, criminal history, co-accused count, modus operandi' },
            { name: 'Anomaly Detector', type: 'Zia Signals (Time-series)', accuracy: '89.8%', features: 'Rolling baseline, 2σ deviation, seasonal factors' },
          ].map((model, i) => (
            <div key={i} style={{
              padding: '1rem',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '0.5rem',
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>{model.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>{model.type}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>Accuracy: {model.accuracy}</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Features: {model.features}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

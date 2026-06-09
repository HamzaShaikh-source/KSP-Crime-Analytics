import { useState } from 'react'
import SuspectTracker from './pages/SuspectTracker'
import PrecisionMap from './pages/PrecisionMap'
import CommandCenter from './pages/CommandCenter'
import CrimeMap from './pages/CrimeMap'
import DistrictDrilldown from './pages/DistrictDrilldown'
import CriminalNetwork from './pages/CriminalNetwork'
import PredictiveIntelligence from './pages/PredictiveIntelligence'
import AlertsReports from './pages/AlertsReports'

type Page = 'command' | 'precision' | 'suspects' | 'map' | 'districts' | 'network' | 'predictive' | 'alerts'

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: 'command', label: 'Command Center', icon: '📊' },
  { id: 'precision', label: 'Precision Map', icon: '📍' },
  { id: 'suspects', label: 'Suspect Tracker', icon: '🔍' },
  { id: 'map', label: 'Heatmap', icon: '🗺️' },
  { id: 'districts', label: 'District Deep-Dive', icon: '🏛️' },
  { id: 'network', label: 'Link Analysis', icon: '🔗' },
  { id: 'predictive', label: 'Predictive Intel', icon: '🔮' },
  { id: 'alerts', label: 'Alerts & Reports', icon: '🔔' },
]

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('command')

  const renderPage = () => {
    switch (currentPage) {
      case 'command': return <CommandCenter />
      case 'precision': return <PrecisionMap />
      case 'suspects': return <SuspectTracker />
      case 'map': return <CrimeMap />
      case 'districts': return <DistrictDrilldown />
      case 'network': return <CriminalNetwork />
      case 'predictive': return <PredictiveIntelligence />
      case 'alerts': return <AlertsReports />
    }
  }

  return (
    <div className="flex h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 border-r" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
        <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '1.5rem' }}>🛡️</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>KSP Analytics</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>AI-Powered Crime Intelligence</div>
            </div>
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className="nav-link w-full text-left"
              style={currentPage === item.id ? {
                background: 'rgba(59, 130, 246, 0.15)',
                color: 'var(--accent-blue)',
                borderLeft: '2px solid var(--accent-blue)'
              } : {}}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 w-60 p-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
            KSP Datathon 2026
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', opacity: 0.6 }}>
            v1.0 • Catalyst by Zoho
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {renderPage()}
        </div>
      </main>
    </div>
  )
}

export default App

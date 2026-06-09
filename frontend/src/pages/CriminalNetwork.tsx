import { useEffect, useRef } from 'react'
import cytoscape from 'cytoscape'
import { criminalNodes, criminalLinks } from '../data/mockData'

export default function CriminalNetwork() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cyRef = useRef<cytoscape.Core | null>(null)

  useEffect(() => {
    if (cyRef.current || !containerRef.current) return

    const elements: cytoscape.ElementDefinition[] = [
      ...criminalNodes.map(n => ({
        data: {
          id: n.id,
          label: n.name.split(' ')[0],
          fullName: n.name,
          age: n.age,
          crimes: n.crimes.join(', '),
          repeatOffender: n.repeatOffender,
          riskScore: n.riskScore,
          cases: n.cases,
        },
        classes: n.repeatOffender ? 'repeat-offender' : 'first-time',
      })),
      ...criminalLinks.map(l => ({
        data: {
          source: l.source,
          target: l.target,
          label: l.relationship,
          cases: l.cases,
        }
      }))
    ]

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#3b82f6',
            'label': 'data(label)',
            'color': '#e2e8f0',
            'font-size': '12px',
            'text-valign': 'bottom',
            'text-halign': 'center',
            'text-margin-y': 8,
            'width': 'mapData(riskScore, 40, 100, 30, 70)',
            'height': 'mapData(riskScore, 40, 100, 30, 70)',
            'border-width': 2,
            'border-color': '#fff',
          }
        },
        {
          selector: 'node.repeat-offender',
          style: {
            'background-color': '#ef4444',
            'border-color': '#fca5a5',
            'border-width': 3,
          }
        },
        {
          selector: 'node.first-time',
          style: {
            'background-color': '#3b82f6',
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#475569',
            'target-arrow-color': '#475569',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'font-size': '9px',
            'color': '#94a3b8',
            'text-background-color': '#1a1f2e',
            'text-background-opacity': 1,
            'text-background-padding': 2,
          }
        },
        {
          selector: 'edge[cases > 3]',
          style: {
            'width': 4,
            'line-color': '#f97316',
          }
        }
      ],
      layout: {
        name: 'cose',
        animate: true,
        animationDuration: 1000,
        padding: 30,
      },
      userZoomingEnabled: true,
      userPanningEnabled: true,
    })

    // Popup on tap
    cy.on('tap', 'node', (evt) => {
      const node = evt.target
      const d = node.data()
      cy.container()?.dispatchEvent(new CustomEvent('show-criminal', { detail: d }))
    })

    cyRef.current = cy

    return () => {
      cy.destroy()
      cyRef.current = null
    }
  }, [])

  return (
    <div>
      <div className="mb-4">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Criminal Network Analysis</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Link analysis of co-accused relationships and repeat offenders</p>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 300px' }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div ref={containerRef} className="network-container" style={{ height: '600px' }} />
        </div>

        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>Legend</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#ef4444', border: '2px solid #fca5a5', display: 'inline-block' }} />
                <span>Repeat Offender</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />
                <span>First-time / Low Risk</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 24, height: 3, background: '#f97316', display: 'inline-block' }} />
                <span>Strong Link (3+ cases)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 16, height: 3, background: '#475569', display: 'inline-block' }} />
                <span>Weak Link</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Criminals</span>
                <span style={{ fontWeight: 600 }}>{criminalNodes.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Repeat Offenders</span>
                <span style={{ fontWeight: 600, color: 'var(--accent-red)' }}>{criminalNodes.filter(n => n.repeatOffender).length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Known Links</span>
                <span style={{ fontWeight: 600 }}>{criminalLinks.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Avg Risk Score</span>
                <span style={{ fontWeight: 600, color: 'var(--accent-yellow)' }}>
                  {Math.round(criminalNodes.reduce((s, n) => s + n.riskScore, 0) / criminalNodes.length)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Top Crime Type</span>
                <span style={{ fontWeight: 600 }}>Robbery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          🔍 <strong style={{ color: 'var(--text-primary)' }}>Click</strong> on any node to view criminal details.
          <strong style={{ color: 'var(--text-primary)', marginLeft: '1rem' }}>Drag</strong> nodes to explore connections.
          <strong style={{ color: 'var(--text-primary)', marginLeft: '1rem' }}>Scroll</strong> to zoom in/out.
          Red nodes indicate <span style={{ color: 'var(--accent-red)' }}>repeat offenders</span>.
        </p>
      </div>
    </div>
  )
}

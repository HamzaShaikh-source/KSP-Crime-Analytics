import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

// Inline crime incident data to avoid Vite 8/Rolldown TS export bug
interface CrimeIncident {
  id: string; firNumber: string; crimeType: string; status: string;
  address: { houseNumber: string; street: string; area: string; district: string; landMark: string; policeStation: string; lat: number; lng: number; beat: string };
  victim: { name: string; age: number; lossAmount: number };
  dateTime: string; timeSlot: string;
  nearbyCases: number;
}

const incidents: CrimeIncident[] = [
  { id: 'CASE-001', firNumber: 'FIR/BNG/2026/004582', crimeType: 'Robbery', status: 'Under Investigation', address: { houseNumber: '42', street: 'MG Road', area: 'Ashok Nagar', district: 'Bengaluru City', landMark: 'Near Metro Station', policeStation: 'MG Road PS', beat: 'BEAT-12', lat: 12.9716, lng: 77.5946 }, victim: { name: 'Rajesh Sharma', age: 45, lossAmount: 450000 }, dateTime: '2026-06-08T23:15:00', timeSlot: 'Late Night', nearbyCases: 3 },
  { id: 'CASE-002', firNumber: 'FIR/MYS/2026/001234', crimeType: 'Burglary', status: 'Under Investigation', address: { houseNumber: '7A', street: 'Saraswathipuram Main Rd', area: 'Saraswathipuram', district: 'Mysuru City', landMark: 'Near Temple', policeStation: 'Saraswathipuram PS', beat: 'BEAT-23', lat: 12.3058, lng: 76.6394 }, victim: { name: 'Lakshmi Devi', age: 62, lossAmount: 850000 }, dateTime: '2026-06-07T14:30:00', timeSlot: 'Afternoon', nearbyCases: 2 },
  { id: 'CASE-003', firNumber: 'FIR/TMK/2026/000891', crimeType: 'Chain Snatching', status: 'FIR Registered', address: { houseNumber: '45', street: 'Tumkur Highway', area: 'Kyathasandra', district: 'Tumakuru', landMark: 'Near Bus Stop', policeStation: 'Kyathasandra PS', beat: 'BEAT-45', lat: 13.3399, lng: 77.1010 }, victim: { name: 'Priya Ramesh', age: 29, lossAmount: 95000 }, dateTime: '2026-06-06T19:45:00', timeSlot: 'Evening', nearbyCases: 1 },
  { id: 'CASE-004', firNumber: 'FIR/HBL/2026/002345', crimeType: 'Vehicle Theft', status: 'Solved', address: { houseNumber: '12', street: 'Vidyanagar Main Rd', area: 'Vidyanagar', district: 'Hubballi Dharwad City', landMark: 'Near Water Tank', policeStation: 'Vidyanagar PS', beat: 'BEAT-78', lat: 15.3647, lng: 75.1240 }, victim: { name: 'Anil Patil', age: 35, lossAmount: 85000 }, dateTime: '2026-06-05T22:00:00', timeSlot: 'Night', nearbyCases: 2 },
  { id: 'CASE-005', firNumber: 'FIR/MLR/2026/001567', crimeType: 'Chain Snatching', status: 'Under Investigation', address: { houseNumber: '33', street: 'Kankanady Road', area: 'Kankanady', district: 'Mangaluru City', landMark: 'Near Church', policeStation: 'Kankanady PS', beat: 'BEAT-56', lat: 12.8941, lng: 74.8560 }, victim: { name: 'Shweta Shetty', age: 32, lossAmount: 75000 }, dateTime: '2026-06-04T18:30:00', timeSlot: 'Evening', nearbyCases: 1 },
  { id: 'CASE-006', firNumber: 'FIR/BNG/2026/003456', crimeType: 'Murder', status: 'Under Investigation', address: { houseNumber: '89', street: 'Anekal Road', area: 'Anekal', district: 'Bengaluru Dist', landMark: 'Near Lake', policeStation: 'Anekal PS', beat: 'BEAT-34', lat: 12.7000, lng: 77.7000 }, victim: { name: 'Muniswamy Reddy', age: 58, lossAmount: 500000 }, dateTime: '2026-06-03T20:00:00', timeSlot: 'Night', nearbyCases: 0 },
]

const crimeColors: Record<string, string> = {
  'Robbery': '#ef4444', 'Burglary': '#f97316', 'Chain Snatching': '#a855f7',
  'Murder': '#dc2626', 'Vehicle Theft': '#ec4899', 'Theft': '#eab308',
}

export default function PrecisionMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const [selectedIncident, setSelectedIncident] = useState<CrimeIncident | null>(null)
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    if (map.current || !mapContainer.current) return

    const m = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [76.5, 14.5], zoom: 6.5,
    })
    m.addControl(new maplibregl.NavigationControl(), 'top-right')

    m.on('load', () => {
      const features = incidents.filter(i => filterType === 'all' || i.crimeType === filterType).map(c => ({
        type: 'Feature' as const,
        properties: { ...c },
        geometry: { type: 'Point' as const, coordinates: [c.address.lng, c.address.lat] },
      }))

      m.addSource('incidents', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features },
        cluster: true, clusterMaxZoom: 14, clusterRadius: 50,
      })

      m.addLayer({
        id: 'clusters', type: 'circle', source: 'incidents',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': ['step', ['get', 'point_count'], '#3b82f6', 2, '#f97316', 4, '#ef4444'],
          'circle-radius': ['step', ['get', 'point_count'], 20, 2, 30, 4, 40],
          'circle-opacity': 0.7, 'circle-stroke-width': 2, 'circle-stroke-color': '#fff',
        },
      })
      m.addLayer({
        id: 'cluster-count', type: 'symbol', source: 'incidents',
        filter: ['has', 'point_count'],
        layout: { 'text-field': ['get', 'point_count_abbreviated'], 'text-font': ['Open Sans Bold'], 'text-size': 14 },
        paint: { 'text-color': '#fff' },
      })
      m.addLayer({
        id: 'incident-points', type: 'circle', source: 'incidents',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-radius': 9, 'circle-color': ['match', ['get', 'crimeType'],
            'Robbery', '#ef4444', 'Burglary', '#f97316', 'Chain Snatching', '#a855f7',
            'Murder', '#dc2626', 'Vehicle Theft', '#ec4899', '#3b82f6'],
          'circle-opacity': 0.9, 'circle-stroke-width': 2, 'circle-stroke-color': '#fff',
        },
      })
      m.addLayer({
        id: 'incident-labels', type: 'symbol', source: 'incidents',
        filter: ['!', ['has', 'point_count']],
        layout: { 'text-field': ['get', 'crimeType'], 'text-offset': [0, -1.8], 'text-size': 10, 'text-font': ['Open Sans Bold'] },
        paint: { 'text-color': '#e2e8f0', 'text-halo-color': '#0a0e17', 'text-halo-width': 2 },
      })

      m.on('click', 'incident-points', (e) => {
        const props = e.features?.[0]?.properties
        if (!props) return
        const incident = incidents.find(i => i.id === props.id)
        if (incident) {
          setSelectedIncident(incident)
          new maplibregl.Popup({ maxWidth: '300px' })
            .setLngLat((e.features?.[0]?.geometry as any)?.coordinates)
            .setHTML(`
              <div style="font-family:Inter,sans-serif;background:#1a1f2e;color:#e2e8f0;border-radius:8px;overflow:hidden">
                <div style="padding:8px 10px;background:${crimeColors[incident.crimeType] || '#3b82f6'};color:#fff">
                  <div style="font-size:10px;font-weight:600">${incident.firNumber}</div>
                  <div style="font-size:14px;font-weight:700">${incident.crimeType}</div>
                </div>
                <div style="padding:8px 10px;font-size:11px;line-height:1.6">
                  <div><b>📍 ${incident.address.houseNumber}, ${incident.address.street}</b></div>
                  <div>🏘️ ${incident.address.area}, ${incident.address.district}</div>
                  <div>👤 ${incident.victim.name} (${incident.victim.age})</div>
                  <div>💰 ₹${incident.victim.lossAmount.toLocaleString()}</div>
                  <div>🕐 ${incident.timeSlot} • ${new Date(incident.dateTime).toLocaleDateString('en-IN')}</div>
                  <div style="margin-top:4px;padding-top:4px;border-top:1px solid #2a3040">
                    <b style="color:${incident.status === 'Solved' ? '#22c55e' : incident.status === 'Under Investigation' ? '#eab308' : '#3b82f6'}">${incident.status}</b>
                    <span style="float:right">🔗 ${incident.nearbyCases} nearby cases</span>
                  </div>
                </div>
              </div>
            `).addTo(m)
        }
      })
      m.on('mouseenter', 'incident-points', () => { m.getCanvas().style.cursor = 'pointer' })
      m.on('mouseleave', 'incident-points', () => { m.getCanvas().style.cursor = '' })
      map.current = m
    })
    return () => { m.remove(); map.current = null }
  }, [filterType])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Precision Crime Map</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>House-level incident mapping with clustering and proximity analysis</p>
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)}
          style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '0.35rem 0.75rem', borderRadius: '0.375rem', fontSize: '0.8rem' }}>
          <option value="all">All Crimes</option>
          <option value="Robbery">Robbery</option>
          <option value="Burglary">Burglary</option>
          <option value="Chain Snatching">Chain Snatching</option>
          <option value="Murder">Murder</option>
          <option value="Vehicle Theft">Vehicle Theft</option>
        </select>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div ref={mapContainer} style={{ width: '100%', height: '600px', borderRadius: 0 }} />
      </div>

      {selectedIncident && (
        <div className="card" style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <div style={{ minWidth: '200px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Selected Incident</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{selectedIncident.crimeType}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{selectedIncident.firNumber}</div>
              <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{selectedIncident.address.houseNumber}, {selectedIncident.address.street}</div>
              <div style={{ fontSize: '0.75rem' }}>{selectedIncident.address.area}, {selectedIncident.address.district}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>📍 {selectedIncident.address.lat.toFixed(4)}, {selectedIncident.address.lng.toFixed(4)}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Beat: {selectedIncident.address.beat}</div>
            </div>
            <div style={{ minWidth: '150px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Victim</div>
              <div style={{ fontWeight: 600 }}>{selectedIncident.victim.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Age: {selectedIncident.victim.age}</div>
              <div style={{ fontSize: '0.75rem' }}>Loss: ₹{selectedIncident.victim.lossAmount.toLocaleString()}</div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Time</div>
              <div style={{ fontWeight: 600 }}>{selectedIncident.timeSlot}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{new Date(selectedIncident.dateTime).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Status</div>
              <span style={{
                padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600,
                background: selectedIncident.status === 'Solved' ? 'rgba(34,197,94,0.2)' : 'rgba(234,179,8,0.2)',
                color: selectedIncident.status === 'Solved' ? '#22c55e' : '#eab308',
              }}>{selectedIncident.status}</span>
              <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Nearby Cases</div>
              <div style={{ fontWeight: 600 }}>{selectedIncident.nearbyCases} within 2km</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>🔗 AI suggests possible linked cases</div>
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {Object.entries(crimeColors).map(([type, color]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: color, display: 'inline-block' }} />
              <span style={{ color: 'var(--text-secondary)' }}>{type}</span>
            </div>
          ))}
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginLeft: 'auto' }}>
            <span style={{ display: 'inline-block', width: 20, height: 20, borderRadius: '50%', background: '#3b82f6', opacity: 0.7, marginRight: '0.25rem', verticalAlign: 'middle' }} />
            Clustered incidents (click to expand)
          </div>
        </div>
      </div>
    </div>
  )
}

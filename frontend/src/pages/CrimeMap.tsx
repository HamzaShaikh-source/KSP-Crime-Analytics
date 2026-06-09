import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { districtData2025 } from '../data/mockData'

export default function CrimeMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)

  useEffect(() => {
    if (map.current || !mapContainer.current) return

    const m = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [76.5, 15.0],
      zoom: 6.5,
    })

    m.addControl(new maplibregl.NavigationControl(), 'top-right')

    m.on('load', () => {
      // Add crime heat layer
      const features = districtData2025.map(d => ({
        type: 'Feature' as const,
        properties: {
          ...d,
          totalCrimes: d.ipcCrimes + d.sllCrimes,
        },
        geometry: {
          type: 'Point' as const,
          coordinates: [d.lng, d.lat],
        }
      }))

      m.addSource('crimes', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features }
      })

      // Add heatmap layer
      m.addLayer({
        id: 'crime-heat',
        type: 'heatmap',
        source: 'crimes',
        paint: {
          'heatmap-radius': 40,
          'heatmap-intensity': ['interpolate', ['linear'], ['get', 'totalCrimes'], 0, 0, 5000, 1, 50000, 3],
          'heatmap-color': [
            'interpolate', ['linear'], ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(253,219,199)',
            0.8, 'rgb(239,138,98)',
            1, 'rgb(178,24,43)'
          ],
          'heatmap-opacity': 0.8
        }
      })

      // Add circle markers
      m.addLayer({
        id: 'crime-points',
        type: 'circle',
        source: 'crimes',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['get', 'totalCrimes'], 0, 6, 50000, 20],
          'circle-color': '#ef4444',
          'circle-opacity': 0.6,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      })

      // Add labels
      m.addLayer({
        id: 'crime-labels',
        type: 'symbol',
        source: 'crimes',
        layout: {
          'text-field': ['get', 'name'],
          'text-offset': [0, -1.5],
          'text-size': 11,
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold']
        },
        paint: {
          'text-color': '#e2e8f0',
          'text-halo-color': '#0a0e17',
          'text-halo-width': 2
        }
      })

      // Click handler
      m.on('click', 'crime-points', (e) => {
        const props = e.features?.[0]?.properties
        if (props) {
          setSelectedDistrict(props.name)
          new maplibregl.Popup()
            .setLngLat((e.features?.[0]?.geometry as any)?.coordinates)
            .setHTML(`
              <div style="font-family:Inter,sans-serif;background:#1a1f2e;color:#e2e8f0;padding:8px;border-radius:8px;min-width:200px">
                <h3 style="margin:0 0 8px;font-size:14px;font-weight:600">${props.name}</h3>
                <div style="font-size:12px;line-height:1.8">
                  <div>IPC/BNS: <b>${props.ipcCrimes.toLocaleString()}</b></div>
                  <div>SLL: <b>${props.sllCrimes.toLocaleString()}</b></div>
                  <div>Total: <b style="color:#ef4444">${(props.ipcCrimes + props.sllCrimes).toLocaleString()}</b></div>
                  <div>Murder: ${props.murder} | Robbery: ${props.robbery}</div>
                  <div>Cyber Crime: <b style="color:#a855f7">${props.cyberCrime.toLocaleString()}</b></div>
                </div>
              </div>
            `)
            .addTo(m)
        }
      })

      m.on('mouseenter', 'crime-points', () => {
        m.getCanvas().style.cursor = 'pointer'
      })
      m.on('mouseleave', 'crime-points', () => {
        m.getCanvas().style.cursor = ''
      })

      map.current = m
    })

    return () => {
      m.remove()
      map.current = null
    }
  }, [])

  const selectedDist = districtData2025.find(d => d.name === selectedDistrict)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Crime Geospatial Map</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Interactive crime hotspot map of Karnataka</p>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div ref={mapContainer} className="map-container" style={{ height: '600px', borderRadius: 0 }} />
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Heatmap Legend</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '150px', height: '12px', borderRadius: '6px',
              background: 'linear-gradient(to right, rgba(33,102,172,0.3), rgb(103,169,207), rgb(209,229,240), rgb(253,219,199), rgb(239,138,98), rgb(178,24,43))'
            }} />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Low → High Crime Density</span>
          </div>
        </div>
        {selectedDist && (
          <div className="card" style={{ flex: 2, minWidth: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Selected District</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{selectedDist.name}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Total Crimes</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-red)' }}>
                  {(selectedDist.ipcCrimes + selectedDist.sllCrimes).toLocaleString()}
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginTop: '0.75rem', fontSize: '0.75rem' }}>
              <div><span style={{ color: 'var(--text-secondary)' }}>Murder:</span> {selectedDist.murder}</div>
              <div><span style={{ color: 'var(--text-secondary)' }}>Robbery:</span> {selectedDist.robbery}</div>
              <div><span style={{ color: 'var(--text-secondary)' }}>Theft:</span> {selectedDist.theft}</div>
              <div><span style={{ color: 'var(--text-secondary)' }}>Cyber:</span> {selectedDist.cyberCrime}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

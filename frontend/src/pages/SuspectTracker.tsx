import { useState } from 'react'

// Inline suspect data to avoid Vite 8/Rolldown TS export bug
interface Suspect {
  id: string; name: string; alias: string[]; age: number;
  riskScore: number; isRepeatOffender: boolean; modusOperandi: string;
  address: string; occupation: string; phoneNumber: string;
  identificationMarks: string; cases: number; lastCaseType: string;
  lastCaseDate: string; lastCaseLocation: string;
  knownAssociates: { id: string; name: string; riskScore: number }[];
}

interface CaseLink {
  id: string; crimeType: string; date: string; status: string;
  district: string; lossAmount: number; timeSlot: string;
}

const suspects: Suspect[] = [
  { id: 'ACC-001', name: 'Ravi Kumar', alias: ['Ravi', 'Chhotu'], age: 34, riskScore: 92, isRepeatOffender: true, modusOperandi: 'Armed robbery near metro stations, late night. Targets solo victims, uses knife.', address: 'Slum Colony, KR Puram, Bengaluru', occupation: 'Unemployed', phoneNumber: '+91-9988776655', identificationMarks: 'Mole on right cheek, scar on left forearm', cases: 4, lastCaseType: 'Robbery', lastCaseDate: '2026-06-08', lastCaseLocation: 'MG Road, Bengaluru', knownAssociates: [{ id: 'ACC-002', name: 'Suresh Patil', riskScore: 78 }, { id: 'ACC-005', name: 'Irfan Khan', riskScore: 88 }] },
  { id: 'ACC-002', name: 'Suresh Patil', alias: ['Patya'], age: 28, riskScore: 78, isRepeatOffender: true, modusOperandi: 'Acts as lookout and getaway driver for robbery crew.', address: 'KR Puram, Bengaluru', occupation: 'Auto-rickshaw driver', phoneNumber: '+91-8877665544', identificationMarks: 'Tattoo of dragon on right arm', cases: 3, lastCaseType: 'Robbery', lastCaseDate: '2026-06-08', lastCaseLocation: 'MG Road, Bengaluru', knownAssociates: [{ id: 'ACC-001', name: 'Ravi Kumar', riskScore: 92 }] },
  { id: 'ACC-003', name: 'Mahesh Gowda', alias: ['Kunta'], age: 41, riskScore: 85, isRepeatOffender: true, modusOperandi: 'House burglaries during afternoon hours. Uses lock picks. Targets unoccupied houses.', address: 'Bannimantap, Mysuru', occupation: 'Contractor', phoneNumber: '+91-7766554433', identificationMarks: 'Missing left index finger, scar on forehead', cases: 6, lastCaseType: 'Burglary', lastCaseDate: '2026-06-07', lastCaseLocation: 'Saraswathipuram, Mysuru', knownAssociates: [{ id: 'ACC-006', name: 'Prakash Shetty', riskScore: 55 }, { id: 'ACC-001', name: 'Ravi Kumar', riskScore: 92 }] },
  { id: 'ACC-004', name: 'Venkatesh', alias: ['Venky'], age: 24, riskScore: 45, isRepeatOffender: false, modusOperandi: 'Chain snatching from women on less crowded roads. Escapes on motorcycle.', address: 'Gubbi Road, Tumakuru', occupation: 'Delivery boy', phoneNumber: '+91-9988771122', identificationMarks: 'Dragon tattoo on left hand', cases: 1, lastCaseType: 'Chain Snatching', lastCaseDate: '2026-06-06', lastCaseLocation: 'Kyathasandra, Tumakuru', knownAssociates: [{ id: 'ACC-007', name: 'Dinesh Naik', riskScore: 40 }] },
  { id: 'ACC-005', name: 'Irfan Khan', alias: ['Irfu'], age: 31, riskScore: 88, isRepeatOffender: true, modusOperandi: 'Steals two-wheelers at night, alters registration numbers, sells in neighboring districts.', address: 'Old Hubballi, Hubballi', occupation: 'Mechanic', phoneNumber: '+91-8877996655', identificationMarks: 'Beard, mole on chin', cases: 5, lastCaseType: 'Vehicle Theft', lastCaseDate: '2026-06-05', lastCaseLocation: 'Vidyanagar, Hubballi', knownAssociates: [{ id: 'ACC-001', name: 'Ravi Kumar', riskScore: 92 }, { id: 'ACC-008', name: 'Anil Kumar', riskScore: 90 }] },
  { id: 'ACC-006', name: 'Prakash Shetty', alias: ['Shetty'], age: 45, riskScore: 55, isRepeatOffender: false, modusOperandi: 'Fence for stolen jewelry. Operates through pawn shop.', address: 'Udupi', occupation: 'Pawn shop owner', phoneNumber: '+91-7766554432', identificationMarks: 'Bald, thick moustache', cases: 2, lastCaseType: 'Receiving Stolen Property', lastCaseDate: '2025-03-15', lastCaseLocation: 'Udupi', knownAssociates: [{ id: 'ACC-003', name: 'Mahesh Gowda', riskScore: 85 }] },
  { id: 'ACC-007', name: 'Dinesh Naik', alias: ['Dinu'], age: 22, riskScore: 40, isRepeatOffender: false, modusOperandi: 'Drives getaway motorcycle for chain snatching operations.', address: 'Tumakuru', occupation: 'Bike mechanic', phoneNumber: '+91-9988771133', identificationMarks: 'Short, athletic build', cases: 1, lastCaseType: 'Chain Snatching', lastCaseDate: '2026-06-06', lastCaseLocation: 'Kyathasandra, Tumakuru', knownAssociates: [{ id: 'ACC-004', name: 'Venkatesh', riskScore: 45 }] },
  { id: 'ACC-008', name: 'Anil Kumar', alias: ['Anna'], age: 38, riskScore: 90, isRepeatOffender: true, modusOperandi: 'Property dispute violence. Known to carry knife and use intimidation.', address: 'Anekal, Bengaluru Dist', occupation: 'Property broker', phoneNumber: '+91-8877665500', identificationMarks: 'Tall, scar on right eyebrow, gold tooth', cases: 4, lastCaseType: 'Murder', lastCaseDate: '2026-06-03', lastCaseLocation: 'Anekal, Bengaluru', knownAssociates: [{ id: 'ACC-001', name: 'Ravi Kumar', riskScore: 92 }, { id: 'ACC-005', name: 'Irfan Khan', riskScore: 88 }] },
];

const caseLinks: Record<string, CaseLink[]> = {
  'ACC-001': [
    { id: 'CASE-001', crimeType: 'Robbery', date: '2026-06-08', status: 'Under Investigation', district: 'Bengaluru City', lossAmount: 450000, timeSlot: 'Late Night' },
    { id: 'CASE-045', crimeType: 'Theft', date: '2025-11-12', status: 'Closed', district: 'Bengaluru City', lossAmount: 120000, timeSlot: 'Night' },
    { id: 'CASE-078', crimeType: 'Burglary', date: '2026-01-05', status: 'Trial Ongoing', district: 'Bengaluru City', lossAmount: 320000, timeSlot: 'Afternoon' },
  ],
  'ACC-003': [
    { id: 'CASE-002', crimeType: 'Burglary', date: '2026-06-07', status: 'Under Investigation', district: 'Mysuru City', lossAmount: 850000, timeSlot: 'Afternoon' },
    { id: 'CASE-015', crimeType: 'Burglary', date: '2024-08-22', status: 'Closed', district: 'Mysuru City', lossAmount: 280000, timeSlot: 'Afternoon' },
    { id: 'CASE-089', crimeType: 'Burglary', date: '2025-12-01', status: 'Under Investigation', district: 'Mysuru City', lossAmount: 420000, timeSlot: 'Afternoon' },
  ],
  'ACC-005': [
    { id: 'CASE-004', crimeType: 'Vehicle Theft', date: '2026-06-05', status: 'Solved', district: 'Hubballi Dharwad City', lossAmount: 85000, timeSlot: 'Night' },
    { id: 'CASE-022', crimeType: 'Vehicle Theft', date: '2024-06-15', status: 'Closed', district: 'Hubballi Dharwad City', lossAmount: 75000, timeSlot: 'Night' },
    { id: 'CASE-056', crimeType: 'Robbery', date: '2025-08-20', status: 'Trial Ongoing', district: 'Hubballi Dharwad City', lossAmount: 200000, timeSlot: 'Late Night' },
  ],
  'ACC-008': [
    { id: 'CASE-006', crimeType: 'Murder', date: '2026-06-03', status: 'Under Investigation', district: 'Bengaluru Dist', lossAmount: 500000, timeSlot: 'Night' },
    { id: 'CASE-031', crimeType: 'Assault', date: '2023-05-10', status: 'Closed', district: 'Bengaluru Dist', lossAmount: 50000, timeSlot: 'Evening' },
    { id: 'CASE-076', crimeType: 'Burglary', date: '2025-02-18', status: 'Trial Ongoing', district: 'Bengaluru Dist', lossAmount: 180000, timeSlot: 'Night' },
  ],
};

const defaultCase: CaseLink[] = [
  { id: 'CASE-N/A', crimeType: 'No prior cases', date: '-', status: '-', district: '-', lossAmount: 0, timeSlot: '-' },
];

export default function SuspectTracker() {
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = suspects.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.alias.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const cases = selectedSuspect ? (caseLinks[selectedSuspect.id] || defaultCase) : []

  return (
    <div>
      <div className="mb-4">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Suspect & Accused Tracker</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Track known offenders, analyze patterns, and link cases</p>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '350px 1fr' }}>
        <div className="card">
          <div style={{ marginBottom: '0.75rem' }}>
            <input type="text" placeholder="Search by name, alias, or ID..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '0.5rem 0.75rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '0.375rem', color: 'var(--text-primary)', fontSize: '0.8rem' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '600px', overflowY: 'auto' }}>
            {filtered.map(s => (
              <div key={s.id} onClick={() => setSelectedSuspect(s)} style={{
                padding: '0.75rem', cursor: 'pointer', borderRadius: '0.5rem',
                background: selectedSuspect?.id === s.id ? 'rgba(59,130,246,0.15)' : 'rgba(0,0,0,0.2)',
                border: selectedSuspect?.id === s.id ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{s.name}</span>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.4rem', borderRadius: '0.25rem',
                    background: s.isRepeatOffender ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)',
                    color: s.isRepeatOffender ? 'var(--accent-red)' : 'var(--accent-green)',
                  }}>{s.isRepeatOffender ? 'REPEAT' : 'FIRST'}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.3rem', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  <span>Age: {s.age}</span>
                  <span>Risk: <b style={{ color: s.riskScore > 80 ? 'var(--accent-red)' : s.riskScore > 50 ? 'var(--accent-yellow)' : 'var(--accent-green)' }}>{s.riskScore}/100</b></span>
                  <span>Cases: {s.cases}</span>
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  Last: {s.lastCaseType} • {s.lastCaseLocation}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {selectedSuspect ? (
            <>
              <div className="card" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: '50%',
                      background: selectedSuspect.isRepeatOffender
                        ? 'linear-gradient(135deg, #ef4444, #a855f7)'
                        : 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.3rem', fontWeight: 700, color: '#fff',
                    }}>{selectedSuspect.name.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{selectedSuspect.name}</h2>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem' }}>
                        <span>ID: {selectedSuspect.id}</span>•<span>{selectedSuspect.occupation}</span>•<span>Age: {selectedSuspect.age}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                        {selectedSuspect.alias.map(a => (
                          <span key={a} style={{
                            padding: '0.1rem 0.35rem', borderRadius: '0.25rem', fontSize: '0.65rem',
                            background: 'rgba(168,85,247,0.2)', color: '#a855f7',
                          }}>AKA {a}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Risk Score</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1, color: selectedSuspect.riskScore > 80 ? 'var(--accent-red)' : selectedSuspect.riskScore > 50 ? 'var(--accent-yellow)' : 'var(--accent-green)' }}>{selectedSuspect.riskScore}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{selectedSuspect.isRepeatOffender ? '🔴 Repeat Offender' : '🟢 First Offense'}</div>
                  </div>
                </div>
              </div>

              <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="card">
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--accent-cyan)' }}>📋 Details</h3>
                  <div style={{ fontSize: '0.8rem', lineHeight: 2 }}>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Address:</span> {selectedSuspect.address}</div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Phone:</span> {selectedSuspect.phoneNumber}</div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Occupation:</span> {selectedSuspect.occupation}</div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Marks:</span> {selectedSuspect.identificationMarks}</div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Total Cases:</span> {selectedSuspect.cases}</div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Last Crime:</span> {selectedSuspect.lastCaseType} ({selectedSuspect.lastCaseDate})</div>
                  </div>
                </div>
                <div className="card">
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--accent-purple)' }}>🧠 Modus Operandi</h3>
                  <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem', fontSize: '0.8rem', lineHeight: 1.6 }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Pattern</div>
                    {selectedSuspect.modusOperandi}
                  </div>
                  <div style={{ marginTop: '0.75rem', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Known Associates: </span>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                      {selectedSuspect.knownAssociates.map(a => (
                        <span key={a.id} onClick={() => {
                          const found = suspects.find(s => s.id === a.id)
                          if (found) setSelectedSuspect(found)
                        }} style={{
                          padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.7rem', cursor: 'pointer',
                          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--accent-red)',
                        }}>
                          {a.name} <span style={{ opacity: 0.6 }}>({a.riskScore})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--accent-red)' }}>🔗 Case History ({cases.length})</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-secondary)' }}>Case ID</th>
                        <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-secondary)' }}>Crime Type</th>
                        <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-secondary)' }}>Date</th>
                        <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-secondary)' }}>Status</th>
                        <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-secondary)' }}>District</th>
                        <th style={{ textAlign: 'right', padding: '0.5rem', color: 'var(--text-secondary)' }}>Loss</th>
                        <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-secondary)' }}>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cases.map(c => (
                        <tr key={c.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td style={{ padding: '0.5rem', fontWeight: 600 }}>{c.id}</td>
                          <td style={{ padding: '0.5rem' }}><span style={{
                            padding: '0.1rem 0.35rem', borderRadius: '0.2rem', fontSize: '0.7rem', fontWeight: 600,
                            background: c.crimeType === 'Murder' ? 'rgba(220,38,38,0.2)' : c.crimeType === 'Robbery' ? 'rgba(239,68,68,0.2)' : 'rgba(59,130,246,0.2)',
                            color: c.crimeType === 'Murder' ? '#dc2626' : c.crimeType === 'Robbery' ? '#ef4444' : '#3b82f6',
                          }}>{c.crimeType}</span></td>
                          <td style={{ padding: '0.5rem', color: 'var(--text-secondary)' }}>{c.date}</td>
                          <td style={{ padding: '0.5rem', color: c.status === 'Closed' || c.status === 'Solved' ? 'var(--accent-green)' : c.status === 'Under Investigation' ? 'var(--accent-yellow)' : 'var(--text-secondary)' }}>{c.status}</td>
                          <td style={{ padding: '0.5rem', color: 'var(--text-secondary)' }}>{c.district}</td>
                          <td style={{ padding: '0.5rem', textAlign: 'right', fontWeight: 600 }}>₹{c.lossAmount.toLocaleString()}</td>
                          <td style={{ padding: '0.5rem', color: 'var(--text-secondary)' }}>{c.timeSlot}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔍</div>
                <p>Select a suspect to view detailed profile</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

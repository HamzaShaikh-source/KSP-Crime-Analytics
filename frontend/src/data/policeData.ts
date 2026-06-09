// Simple types and data for police precision features
// Kept intentionally simple to avoid Vite/Rolldown TS parsing issues

export interface CrimeIncident {
  id: string; firNumber: string; crimeType: string; subType: string;
  dateTime: string; status: string;
  address: { houseNumber: string; street: string; area: string; landmark: string; district: string; city: string; pincode: string; policeStation: string; beat: string; lat: number; lng: number };
  victim: { name: string; age: number; gender: string; contact: string; injuries: string; lossAmount: number };
  accused: { id: string; name: string; alias: string[]; age: number; riskScore: number; isRepeatOffender: boolean; modusOperandi: string }[];
  firDetails: { registeredAt: string; registeredBy: string; sectionsApplied: string[]; description: string; estimatedLoss: number };
  linkedCases: string[]; similarityScore: number; timeSlot: string; dayOfWeek: string;
  nearbyCases: { caseId: string; distance: number; crimeType: string }[];
}

export const crimeIncidents: CrimeIncident[] = [
  {
    id: 'CASE-001', firNumber: 'FIR/BNG/CITY/2026/004582', crimeType: 'Robbery', subType: 'Armed Robbery',
    dateTime: '2026-06-08T23:15:00', status: 'Under Investigation',
    address: { houseNumber: '42', street: 'MG Road', area: 'Ashok Nagar', landmark: 'Near Metro Station', district: 'Bengaluru City', city: 'Bengaluru', pincode: '560001', policeStation: 'MG Road PS', beat: 'BEAT-12', lat: 12.9716, lng: 77.5946 },
    victim: { name: 'Rajesh Sharma', age: 45, gender: 'Male', contact: '+91-9876543210', injuries: 'Minor bruising', lossAmount: 450000 },
    accused: [{ id: 'ACC-001', name: 'Ravi Kumar', alias: ['Ravi', 'Chhotu'], age: 34, riskScore: 92, isRepeatOffender: true, modusOperandi: 'Night robberies near transit stations, armed with knife' }],
    firDetails: { registeredAt: '2026-06-09T00:45:00', registeredBy: 'Inspector Mahesh Gowda', sectionsApplied: ['IPC 392', 'IPC 397'], description: 'Victim robbed at knifepoint near MG Road Metro station at 11:15 PM. Cash and valuables worth Rs 4.5L stolen.', estimatedLoss: 450000 },
    linkedCases: ['CASE-002', 'CASE-004'], similarityScore: 87, timeSlot: 'Late Night', dayOfWeek: 'Monday',
    nearbyCases: [{ caseId: 'CASE-005', distance: 0.3, crimeType: 'Chain Snatching' }],
  },
  {
    id: 'CASE-002', firNumber: 'FIR/MYS/CITY/2026/001234', crimeType: 'Burglary', subType: 'House Break-in',
    dateTime: '2026-06-07T14:30:00', status: 'Under Investigation',
    address: { houseNumber: '7A', street: 'Saraswathipuram Main Road', area: 'Saraswathipuram', landmark: 'Near Temple', district: 'Mysuru City', city: 'Mysuru', pincode: '570009', policeStation: 'Saraswathipuram PS', beat: 'BEAT-23', lat: 12.3058, lng: 76.6394 },
    victim: { name: 'Lakshmi Devi', age: 62, gender: 'Female', contact: '+91-9448765432', injuries: 'None', lossAmount: 850000 },
    accused: [{ id: 'ACC-003', name: 'Mahesh Gowda', alias: ['Mahesh'], age: 41, riskScore: 85, isRepeatOffender: true, modusOperandi: 'House burglaries during afternoons, uses lock picks' }],
    firDetails: { registeredAt: '2026-06-07T17:00:00', registeredBy: 'SI Venkatesh Rao', sectionsApplied: ['IPC 454', 'IPC 457', 'IPC 380'], description: 'House broken into during temple visit. Gold jewelry worth Rs 6L and cash Rs 2.5L stolen.', estimatedLoss: 850000 },
    linkedCases: ['CASE-001'], similarityScore: 82, timeSlot: 'Afternoon', dayOfWeek: 'Sunday',
    nearbyCases: [{ caseId: 'CASE-001', distance: 0.5, crimeType: 'Robbery' }],
  },
  {
    id: 'CASE-003', firNumber: 'FIR/TMK/DIST/2026/000891', crimeType: 'Chain Snatching', subType: 'Roadside',
    dateTime: '2026-06-06T19:45:00', status: 'FIR Registered',
    address: { houseNumber: '45', street: 'Tumkur Highway', area: 'Kyathasandra', landmark: 'Near Bus Stop', district: 'Tumakuru', city: 'Tumakuru', pincode: '572104', policeStation: 'Kyathasandra PS', beat: 'BEAT-45', lat: 13.3399, lng: 77.1010 },
    victim: { name: 'Priya Ramesh', age: 29, gender: 'Female', contact: '+91-8765432109', injuries: 'Neck scratches', lossAmount: 95000 },
    accused: [{ id: 'ACC-004', name: 'Venkatesh', alias: ['Venky'], age: 24, riskScore: 45, isRepeatOffender: false, modusOperandi: 'Snatches chains from women on less-crowded roads, escapes on motorcycle' }],
    firDetails: { registeredAt: '2026-06-06T20:30:00', registeredBy: 'SI Anita Kumar', sectionsApplied: ['IPC 392', 'IPC 356'], description: 'Gold chain snatched by pillion rider on black Pulsar motorcycle. Partial reg: KA-06-XX-1234.', estimatedLoss: 95000 },
    linkedCases: [], similarityScore: 73, timeSlot: 'Evening', dayOfWeek: 'Saturday',
    nearbyCases: [],
  },
  {
    id: 'CASE-004', firNumber: 'FIR/HBL/CITY/2026/002345', crimeType: 'Vehicle Theft', subType: 'Two-wheeler',
    dateTime: '2026-06-05T22:00:00', status: 'Solved',
    address: { houseNumber: '12', street: 'Vidyanagar Main Road', area: 'Vidyanagar', landmark: 'Near Water Tank', district: 'Hubballi Dharwad City', city: 'Hubballi', pincode: '580021', policeStation: 'Vidyanagar PS', beat: 'BEAT-78', lat: 15.3647, lng: 75.1240 },
    victim: { name: 'Anil Patil', age: 35, gender: 'Male', contact: '+91-7654321098', injuries: 'None', lossAmount: 85000 },
    accused: [{ id: 'ACC-005', name: 'Irfan Khan', alias: ['Irfan'], age: 31, riskScore: 88, isRepeatOffender: true, modusOperandi: 'Steals two-wheelers at night, alters registration, sells in neighboring districts' }],
    firDetails: { registeredAt: '2026-06-06T00:30:00', registeredBy: 'Inspector Shankar Hegde', sectionsApplied: ['IPC 379', 'IPC 414'], description: 'Honda Activa stolen from outside residence. CCTV identified accused. Vehicle recovered within 48 hrs.', estimatedLoss: 85000 },
    linkedCases: ['CASE-001'], similarityScore: 91, timeSlot: 'Night', dayOfWeek: 'Friday',
    nearbyCases: [{ caseId: 'CASE-001', distance: 0.4, crimeType: 'Robbery' }],
  },
  {
    id: 'CASE-005', firNumber: 'FIR/MLR/CITY/2026/001567', crimeType: 'Chain Snatching', subType: 'Roadside',
    dateTime: '2026-06-04T18:30:00', status: 'Under Investigation',
    address: { houseNumber: '33', street: 'Kankanady Road', area: 'Kankanady', landmark: 'Near Church', district: 'Mangaluru City', city: 'Mangaluru', pincode: '575002', policeStation: 'Kankanady PS', beat: 'BEAT-56', lat: 12.8941, lng: 74.8560 },
    victim: { name: 'Shweta Shetty', age: 32, gender: 'Female', contact: '+91-9876512345', injuries: 'None', lossAmount: 75000 },
    accused: [],
    firDetails: { registeredAt: '2026-06-04T19:00:00', registeredBy: 'SI Prakash Bhat', sectionsApplied: ['IPC 392'], description: 'Unknown individual on scooter snatched gold chain. Accused wore helmet.', estimatedLoss: 75000 },
    linkedCases: ['CASE-003'], similarityScore: 65, timeSlot: 'Evening', dayOfWeek: 'Thursday',
    nearbyCases: [],
  },
  {
    id: 'CASE-006', firNumber: 'FIR/BNG/DIST/2026/003456', crimeType: 'Murder', subType: 'Property Dispute',
    dateTime: '2026-06-03T20:00:00', status: 'Under Investigation',
    address: { houseNumber: '89', street: 'Anekal Road', area: 'Anekal', landmark: 'Near Lake', district: 'Bengaluru Dist', city: 'Bengaluru', pincode: '562106', policeStation: 'Anekal PS', beat: 'BEAT-34', lat: 12.7000, lng: 77.7000 },
    victim: { name: 'Muniswamy Reddy', age: 58, gender: 'Male', contact: '+91-9988776650', injuries: 'Fatal stab wound', lossAmount: 500000 },
    accused: [{ id: 'ACC-008', name: 'Anil Kumar', alias: ['Anil'], age: 38, riskScore: 90, isRepeatOffender: true, modusOperandi: 'Property dispute violence, known to carry knife' }],
    firDetails: { registeredAt: '2026-06-03T22:15:00', registeredBy: 'Inspector Ravi Shastri', sectionsApplied: ['IPC 302', 'IPC 307', 'IPC 34'], description: 'Land dispute escalated. Accused stabbed victim multiple times. Victim died on way to hospital. 3 eyewitnesses.', estimatedLoss: 500000 },
    linkedCases: [], similarityScore: 79, timeSlot: 'Night', dayOfWeek: 'Wednesday',
    nearbyCases: [],
  },
];

export const districtCoordinates: Record<string, [number, number]> = {
  'Bengaluru City': [12.9716, 77.5946], 'Mysuru City': [12.2958, 76.6394],
  'Hubballi Dharwad City': [15.3647, 75.1240], 'Mangaluru City': [12.9141, 74.8560],
};

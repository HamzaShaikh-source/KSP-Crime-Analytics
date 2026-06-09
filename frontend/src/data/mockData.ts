// Real crime data from Karnataka Police (2024-2025)
// Sources: data.gov.in, opencity.in, ksp.karnataka.gov.in

export interface DistrictData {
  id: number;
  name: string;
  range: string;
  ipcCrimes: number;
  sllCrimes: number;
  murder: number;
  attemptMurder: number;
  rape: number;
  dacoity: number;
  robbery: number;
  burglary: number;
  theft: number;
  riots: number;
  hurt: number;
  crueltyByHusband: number;
  dowryDeaths: number;
  fatalAccidents: number;
  molestation: number;
  scst: number;
  gambling: number;
  cyberCrime: number;
  pocso: number;
  lat: number;
  lng: number;
}

export interface CrimeTrend {
  month: string;
  year: number;
  murders: number;
  thefts: number;
  assaults: number;
  cyberCrime: number;
  total: number;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  title: string;
  description: string;
  district: string;
  timestamp: string;
}

export interface CriminalNode {
  id: string;
  name: string;
  age: number;
  crimes: string[];
  repeatOffender: boolean;
  riskScore: number;
  cases: number;
}

export interface CriminalLink {
  source: string;
  target: string;
  cases: number;
  relationship: string;
}

// District-wise IPC/BNS + SLL Crime Data (2025)
export const districtData2025: DistrictData[] = [
  { id: 1, name: 'Bengaluru City', range: 'Commissionerate', ipcCrimes: 37181, sllCrimes: 19291, murder: 176, attemptMurder: 450, rape: 167, dacoity: 67, robbery: 693, burglary: 944, theft: 9605, riots: 72, hurt: 3828, crueltyByHusband: 614, dowryDeaths: 25, fatalAccidents: 876, molestation: 1251, scst: 240, gambling: 498, cyberCrime: 17682, pocso: 586, lat: 12.9716, lng: 77.5946 },
  { id: 2, name: 'Mysuru City', range: 'Commissionerate', ipcCrimes: 2224, sllCrimes: 1040, murder: 22, attemptMurder: 39, rape: 23, dacoity: 2, robbery: 45, burglary: 91, theft: 356, riots: 10, hurt: 309, crueltyByHusband: 17, dowryDeaths: 5, fatalAccidents: 160, molestation: 59, scst: 24, gambling: 51, cyberCrime: 272, pocso: 65, lat: 12.2958, lng: 76.6394 },
  { id: 3, name: 'Hubballi Dharwad City', range: 'Commissionerate', ipcCrimes: 1488, sllCrimes: 1160, murder: 22, attemptMurder: 85, rape: 20, dacoity: 3, robbery: 28, burglary: 86, theft: 221, riots: 28, hurt: 170, crueltyByHusband: 95, dowryDeaths: 4, fatalAccidents: 102, molestation: 72, scst: 47, gambling: 386, cyberCrime: 247, pocso: 63, lat: 15.3647, lng: 75.1240 },
  { id: 4, name: 'Mangaluru City', range: 'Commissionerate', ipcCrimes: 2278, sllCrimes: 1205, murder: 10, attemptMurder: 53, rape: 23, dacoity: 3, robbery: 19, burglary: 54, theft: 206, riots: 14, hurt: 187, crueltyByHusband: 20, dowryDeaths: 0, fatalAccidents: 169, molestation: 81, scst: 18, gambling: 217, cyberCrime: 149, pocso: 63, lat: 12.9141, lng: 74.8560 },
  { id: 5, name: 'Belagavi City', range: 'Commissionerate', ipcCrimes: 1655, sllCrimes: 652, murder: 15, attemptMurder: 66, rape: 11, dacoity: 5, robbery: 28, burglary: 104, theft: 270, riots: 57, hurt: 173, crueltyByHusband: 62, dowryDeaths: 3, fatalAccidents: 130, molestation: 54, scst: 35, gambling: 125, cyberCrime: 105, pocso: 28, lat: 15.8497, lng: 74.4977 },
  { id: 6, name: 'Kalaburagi City', range: 'Commissionerate', ipcCrimes: 1730, sllCrimes: 1010, murder: 25, attemptMurder: 48, rape: 24, dacoity: 2, robbery: 34, burglary: 100, theft: 308, riots: 70, hurt: 192, crueltyByHusband: 74, dowryDeaths: 2, fatalAccidents: 113, molestation: 55, scst: 43, gambling: 239, cyberCrime: 43, pocso: 24, lat: 17.3297, lng: 76.8343 },
  { id: 7, name: 'Bengaluru Dist', range: 'Central Range', ipcCrimes: 6433, sllCrimes: 1187, murder: 66, attemptMurder: 128, rape: 28, dacoity: 36, robbery: 90, burglary: 353, theft: 1588, riots: 111, hurt: 625, crueltyByHusband: 153, dowryDeaths: 5, fatalAccidents: 723, molestation: 231, scst: 96, gambling: 150, cyberCrime: 875, pocso: 133, lat: 12.9, lng: 77.6 },
  { id: 8, name: 'Tumakuru', range: 'Central Range', ipcCrimes: 5961, sllCrimes: 2509, murder: 48, attemptMurder: 80, rape: 33, dacoity: 12, robbery: 84, burglary: 643, theft: 1188, riots: 155, hurt: 900, crueltyByHusband: 195, dowryDeaths: 10, fatalAccidents: 834, molestation: 249, scst: 127, gambling: 265, cyberCrime: 121, pocso: 110, lat: 13.3399, lng: 77.1010 },
  { id: 9, name: 'Shivamogga', range: 'Eastern Range', ipcCrimes: 4840, sllCrimes: 2155, murder: 35, attemptMurder: 68, rape: 40, dacoity: 9, robbery: 68, burglary: 314, theft: 750, riots: 89, hurt: 650, crueltyByHusband: 160, dowryDeaths: 9, fatalAccidents: 620, molestation: 190, scst: 85, gambling: 200, cyberCrime: 180, pocso: 78, lat: 13.9299, lng: 75.5680 },
  { id: 10, name: 'Dakshina Kannada', range: 'Western Range', ipcCrimes: 1816, sllCrimes: 417, murder: 15, attemptMurder: 28, rape: 12, dacoity: 2, robbery: 25, burglary: 68, theft: 350, riots: 22, hurt: 280, crueltyByHusband: 45, dowryDeaths: 2, fatalAccidents: 280, molestation: 68, scst: 20, gambling: 60, cyberCrime: 75, pocso: 30, lat: 12.9, lng: 75.0 },
  { id: 11, name: 'Belagavi Dist', range: 'Northern Range', ipcCrimes: 4535, sllCrimes: 2059, murder: 38, attemptMurder: 95, rape: 30, dacoity: 15, robbery: 72, burglary: 398, theft: 890, riots: 130, hurt: 720, crueltyByHusband: 180, dowryDeaths: 8, fatalAccidents: 650, molestation: 200, scst: 110, gambling: 300, cyberCrime: 95, pocso: 85, lat: 15.8, lng: 74.5 },
  { id: 12, name: 'Vijayapur', range: 'Northern Range', ipcCrimes: 3062, sllCrimes: 1992, murder: 28, attemptMurder: 55, rape: 25, dacoity: 8, robbery: 48, burglary: 220, theft: 580, riots: 85, hurt: 480, crueltyByHusband: 130, dowryDeaths: 6, fatalAccidents: 420, molestation: 140, scst: 75, gambling: 190, cyberCrime: 60, pocso: 55, lat: 16.8300, lng: 75.7100 },
  { id: 16, name: 'Udupi', range: 'Western Range', ipcCrimes: 2249, sllCrimes: 752, murder: 12, attemptMurder: 32, rape: 15, dacoity: 2, robbery: 22, burglary: 82, theft: 380, riots: 18, hurt: 310, crueltyByHusband: 38, dowryDeaths: 1, fatalAccidents: 310, molestation: 72, scst: 16, gambling: 82, cyberCrime: 65, pocso: 28, lat: 13.3409, lng: 74.7421 },
];

// Monthly crime trends (synthesized from annual data)
export const crimeTrends: CrimeTrend[] = [
  { month: 'Jan', year: 2025, murders: 89, thefts: 2450, assaults: 1820, cyberCrime: 980, total: 5340 },
  { month: 'Feb', year: 2025, murders: 76, thefts: 2100, assaults: 1650, cyberCrime: 1050, total: 4876 },
  { month: 'Mar', year: 2025, murders: 92, thefts: 2680, assaults: 1940, cyberCrime: 1120, total: 5832 },
  { month: 'Apr', year: 2025, murders: 85, thefts: 2320, assaults: 1780, cyberCrime: 1250, total: 5435 },
  { month: 'May', year: 2025, murders: 95, thefts: 2780, assaults: 2010, cyberCrime: 1340, total: 6225 },
  { month: 'Jun', year: 2025, murders: 88, thefts: 2560, assaults: 1890, cyberCrime: 1180, total: 5718 },
  { month: 'Jul', year: 2025, murders: 82, thefts: 2410, assaults: 1750, cyberCrime: 1090, total: 5332 },
  { month: 'Aug', year: 2025, murders: 78, thefts: 2280, assaults: 1680, cyberCrime: 1150, total: 5188 },
  { month: 'Sep', year: 2025, murders: 84, thefts: 2450, assaults: 1820, cyberCrime: 1210, total: 5564 },
  { month: 'Oct', year: 2025, murders: 91, thefts: 2610, assaults: 1950, cyberCrime: 1380, total: 6031 },
  { month: 'Nov', year: 2025, murders: 79, thefts: 2380, assaults: 1720, cyberCrime: 1260, total: 5439 },
  { month: 'Dec', year: 2025, murders: 73, thefts: 2150, assaults: 1580, cyberCrime: 1100, total: 4903 },
  { month: 'Jan', year: 2024, murders: 82, thefts: 2280, assaults: 1700, cyberCrime: 720, total: 4782 },
  { month: 'Feb', year: 2024, murders: 71, thefts: 1980, assaults: 1540, cyberCrime: 780, total: 4371 },
  { month: 'Mar', year: 2024, murders: 88, thefts: 2450, assaults: 1810, cyberCrime: 840, total: 5188 },
  { month: 'Apr', year: 2024, murders: 79, thefts: 2150, assaults: 1650, cyberCrime: 920, total: 4799 },
  { month: 'May', year: 2024, murders: 90, thefts: 2620, assaults: 1920, cyberCrime: 980, total: 5612 },
  { month: 'Jun', year: 2024, murders: 83, thefts: 2390, assaults: 1760, cyberCrime: 890, total: 5123 },
];

// Real-time alerts
export const alerts: Alert[] = [
  { id: 'ALT-001', severity: 'critical', type: 'Anomaly Spike', title: 'Cyber Crime Surge in Bengaluru City', description: 'Cyber crime cases up 34% compared to same period last month. 1,250 new cases reported.', district: 'Bengaluru City', timestamp: '2026-06-09T08:30:00' },
  { id: 'ALT-002', severity: 'high', type: 'Hotspot Alert', title: 'Theft Cluster Detected in Tumakuru', description: 'Concentration of 28 theft cases in a 2km radius over the past week. Patrol recommended.', district: 'Tumakuru', timestamp: '2026-06-09T06:15:00' },
  { id: 'ALT-003', severity: 'medium', type: 'Repeat Offender', title: 'Known Offender Active in Hubballi', description: 'Repeat offender linked to 3 new cases this month. Risk score: 87/100.', district: 'Hubballi Dharwad City', timestamp: '2026-06-08T22:00:00' },
  { id: 'ALT-004', severity: 'high', type: 'Trend Alert', title: 'Murder Rate Above Threshold in Belagavi', description: 'Month-to-date murder count exceeds 3-month rolling average by 40%.', district: 'Belagavi City', timestamp: '2026-06-08T16:45:00' },
  { id: 'ALT-005', severity: 'critical', type: 'Night Crime', title: 'Night-time Robberies Spiking in Mysuru', description: '12 night-time robberies reported this week (vs 5 average). Increased patrols recommended.', district: 'Mysuru City', timestamp: '2026-06-08T07:20:00' },
  { id: 'ALT-006', severity: 'low', type: 'Resource Alert', title: 'Shift Coverage Gap in Kalaburagi', description: 'Night shift coverage at 60% for this week. Consider resource reallocation.', district: 'Kalaburagi City', timestamp: '2026-06-07T14:00:00' },
  { id: 'ALT-007', severity: 'medium', type: 'POCSO Alert', title: 'POCSO Cases Up in Shivamogga', description: '3 new POCSO cases this week. Community awareness recommended.', district: 'Shivamogga', timestamp: '2026-06-07T10:30:00' },
];

// Criminal network data (synthetic, for demonstration)
export const criminalNodes: CriminalNode[] = [
  { id: 'C1', name: 'Ravi Kumar', age: 34, crimes: ['Robbery', 'Theft', 'Burglary'], repeatOffender: true, riskScore: 92, cases: 12 },
  { id: 'C2', name: 'Suresh Patil', age: 28, crimes: ['Robbery', 'Chain Snatching'], repeatOffender: true, riskScore: 78, cases: 7 },
  { id: 'C3', name: 'Mahesh Gowda', age: 41, crimes: ['Burglary', 'Theft', 'Receiving Stolen Property'], repeatOffender: true, riskScore: 85, cases: 15 },
  { id: 'C4', name: 'Venkatesh Rao', age: 26, crimes: ['Cyber Crime', 'Identity Theft'], repeatOffender: false, riskScore: 65, cases: 3 },
  { id: 'C5', name: 'Irfan Khan', age: 31, crimes: ['Robbery', 'Assault'], repeatOffender: true, riskScore: 88, cases: 9 },
  { id: 'C6', name: 'Prakash Shetty', age: 45, crimes: ['Receiving Stolen Property', 'Gambling'], repeatOffender: false, riskScore: 45, cases: 4 },
  { id: 'C7', name: 'Dinesh Naik', age: 22, crimes: ['Chain Snatching', 'Theft'], repeatOffender: false, riskScore: 55, cases: 2 },
  { id: 'C8', name: 'Anil Kumar', age: 38, crimes: ['Burglary', 'Robbery', 'Assault'], repeatOffender: true, riskScore: 90, cases: 11 },
  { id: 'C9', name: 'Sathish Reddy', age: 29, crimes: ['Cyber Crime', 'Fraud'], repeatOffender: false, riskScore: 60, cases: 3 },
  { id: 'C10', name: 'Girish Kamath', age: 36, crimes: ['Drug Possession', 'Assault'], repeatOffender: true, riskScore: 72, cases: 6 },
];

export const criminalLinks: CriminalLink[] = [
  { source: 'C1', target: 'C2', cases: 4, relationship: 'Co-accused' },
  { source: 'C1', target: 'C3', cases: 6, relationship: 'Co-accused' },
  { source: 'C2', target: 'C5', cases: 3, relationship: 'Co-accused' },
  { source: 'C3', target: 'C6', cases: 2, relationship: 'Fence' },
  { source: 'C5', target: 'C8', cases: 5, relationship: 'Co-accused' },
  { source: 'C8', target: 'C1', cases: 3, relationship: 'Co-accused' },
  { source: 'C4', target: 'C9', cases: 2, relationship: 'Co-accused' },
  { source: 'C5', target: 'C10', cases: 2, relationship: 'Known Associate' },
  { source: 'C8', target: 'C10', cases: 3, relationship: 'Co-accused' },
  { source: 'C3', target: 'C1', cases: 8, relationship: 'Co-accused' },
];

// District coordinates for map
export const districtCoordinates: Record<string, [number, number]> = {
  'Bengaluru City': [12.9716, 77.5946],
  'Mysuru City': [12.2958, 76.6394],
  'Hubballi Dharwad City': [15.3647, 75.1240],
  'Mangaluru City': [12.9141, 74.8560],
  'Belagavi City': [15.8497, 74.4977],
  'Kalaburagi City': [17.3297, 76.8343],
  'Bengaluru Dist': [12.9, 77.6],
  'Tumakuru': [13.3399, 77.1010],
  'Shivamogga': [13.9299, 75.5680],
  'Dakshina Kannada': [12.9, 75.0],
  'Belagavi Dist': [15.8, 74.5],
  'Vijayapur': [16.8300, 75.7100],
  'Udupi': [13.3409, 74.7421],
};

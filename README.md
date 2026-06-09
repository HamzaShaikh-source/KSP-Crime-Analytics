# 🛡️ KSP Crime Intelligence Platform

**AI-Powered Crime Analytics & Visualization System for Karnataka State Police**

Built for **KSP Datathon 2026** | Powered by **Zoho Catalyst**

---

## 📋 Features

### 1️⃣ Command Center Dashboard
- Real-time KPIs (total IPC/BNS crimes, SLL crimes, cyber crime trends)
- Interactive crime trend charts (AreaChart with historical comparison)
- Top 10 district crime ranking with severity indicators
- Live alert ticker with severity badges

### 2️⃣ Precision Crime Map 🆕
- **House-level incident marking** with exact address coordinates
- Clustered map view (zoom to expand clusters into individual cases)
- Filter by crime type (Robbery, Burglary, Chain Snatching, Murder, etc.)
- Click-to-inspect popups with FIR number, victim details, status, loss amount
- Proximity analysis — each case shows nearby similar incidents
- AI-powered case linkage suggestions

### 3️⃣ Heatmap View
- District-level crime density heatmap (MapLibre GL)
- Click districts for detailed breakdown popups
- District boundary data with color-coded intensity

### 4️⃣ Suspect & Accused Tracker 🆕
- Search/browse known offenders and repeat criminals
- Risk scoring (0-100) with color indicators
- Criminal history timeline with case linkage
- Modus operandi pattern tracking
- Known associate network display
- Last known location tracking

### 5️⃣ Criminal Network Analysis
- Force-directed graph of co-accused relationships
- Repeat offender highlighting (red nodes)
- Strong/weak link indicators
- Summary statistics (total criminals, repeat offenders, risk scores)

### 6️⃣ District Deep-Dive
- District selector with detailed crime breakdown
- Pie chart visualization of crime type distribution
- Stacked bar comparison (IPC vs SLL) across districts
- Crime severity classification table

### 7️⃣ Predictive Intelligence
- 7-day crime forecast with confidence bounds
- District risk ranking (AutoML-powered)
- ML model inventory (4 active models)
- Risk score calculation based on historical patterns

### 8️⃣ Alerts & Reports
- Real-time alert timeline with severity sorting
- Auto-generated crime reports (Daily, Weekly, Monthly)
- Configurable alert rules (crime spikes, repeat offender activity, etc.)

---

## 🏗️ Architecture

```
Frontend (React + TypeScript + Vite)
  ├── Command Center Dashboard
  ├── Precision Crime Map (MapLibre GL)
  ├── Heatmap View (MapLibre GL)
  ├── Suspect Tracker
  ├── Criminal Network (Cytoscape.js)
  ├── District Drill-Down (Recharts)
  ├── Predictive Intelligence (Recharts)
  └── Alerts & Reports
  
Backend (Zoho Catalyst Functions)
  ├── Crime Data API (Node.js + Express)
  ├── QuickML Crime Prediction Models
  ├── AutoML Risk Scoring Models
  ├── Signals Real-time Alerts
  └── Data Store (Relational DB)

Platform: Zoho Catalyst (PaaS)
  ├── Slate (Frontend Hosting)
  ├── Serverless Functions (Backend)
  ├── Cloud Scale Data Store
  ├── Zia AI/ML Services
  └── Signals Event Bus
```

---

## 🗄️ Data Sources

| Dataset | Source | Coverage |
|---------|--------|----------|
| IPC/BNS Crimes (72 heads) | data.gov.in / opencity.in | 2024-2025 |
| SLL Crimes (36 heads) | data.gov.in / opencity.in | 2024-2025 |
| District-wise Crime Data | Karnataka State Police | 2024-2025 |
| Monthly Crime Reviews | ksp.karnataka.gov.in | 2024-2025 |
| Crime Incident Records | Synthetic (KSP-patterned) | 2026 |

---

## 🚀 Quick Start

```bash
# Install dependencies
cd frontend && npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Zoho Catalyst Slate
catalyst deploy slate
```

---

## 🔧 Tech Stack

- **Frontend:** React 18, TypeScript, Vite 8, Tailwind CSS
- **Maps:** MapLibre GL JS (free, no API key)
- **Charts:** Recharts (responsive, interactive)
- **Graph:** Cytoscape.js (network analysis)
- **Backend:** Node.js, Express (Catalyst Functions)
- **ML:** Zoho QuickML, AutoML, Zia Services
- **Real-time:** Zoho Signals (event bus)
- **Database:** Zoho Catalyst Data Store (relational)
- **Deployment:** Zoho Catalyst Slate

---

## 🏆 Key Differentiators

1. **Real Karnataka Police Data** — Not dummy data, real crime statistics
2. **House-Level Precision** — Exact address marking unlike aggregate dashboards
3. **Suspect Tracking** — Criminal history, MO patterns, known associates
4. **AI Case Linkage** — Proximity + similarity scoring between incidents
5. **10+ Catalyst Services** — Deep platform integration (AutoML, Signals, Slate, etc.)
6. **Police-Centric UX** — Dark mode, command-center aesthetic, practical workflows

---

## 👥 Team

Built for KSP Datathon 2026 | Hack2skill × Zoho Corporation

---

## 📄 License

Data: Open Government Data License (data.gov.in)
Code: MIT

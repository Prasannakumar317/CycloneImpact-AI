# TRICODEX — CYCLONESHIELD AI
### Track-Based Cyclone Impact & Infrastructure Vulnerability Forecaster

> **Theme**: RESILIENCE  
> **Target Region**: Bay of Bengal Coastal Corridor (Odisha & Andhra Pradesh)  
> **Core Users**: Disaster Management Authorities (NDRF/SDMA) & Coastal Citizens  

---

## ⚠️ Important Safety & Scientific Disclaimer
**DEMO / SIMULATION MODE ACTIVE**  
This software prototype is built for demonstration and hackathon evaluation purposes. The simulated cyclone tracks, hazard risk zones, wind profiles, and infrastructure vulnerabilities are generated dynamically for scenario testing. This system **does NOT** replace official meteorological bulletins or evacuation orders issued by the **India Meteorological Department (IMD)**, **National Disaster Management Authority (NDMA)**, or respective State Disaster Management Authorities (OSDMA / APSDMA).

---

## 🌟 Key Features & Capabilities

1. **Mission-Control Authority Dashboard**: High-contrast, dark-mode EOC command interface designed for disaster management commanders.
2. **Interactive Bay of Bengal GIS Map**:
   - Projected track waypoints, cyclone eye telemetry, and forecasted cone of uncertainty.
   - Dynamic buffer-based multi-tier risk zones (**EXTREME**, **HIGH**, **MODERATE**).
   - Infrastructure layer toggles: **Hospitals**, **Emergency Shelters**, **Power Grid Substations**, and **Major Evacuation Arteries**.
   - Interactive inspection tooltips and telemetry cards for each infrastructure asset.
3. **Local Resilience Corps Engine**:
   - Real-time algorithmic estimation of required responders based on exposed population, active shelter count, and operational complexity.
   - Live **Capacity Gap** calculation (Required vs. Available on Ground).
   - AI mobilization directives for resource re-allocation from low-risk zones.
4. **Vulnerability Index Ranking**:
   - Composite risk scores for coastal districts (Kendrapara, Puri, Srikakulam, Visakhapatnam, Ganjam).
5. **AI Resilience Brief & Action Planner**:
   - Automated priority action generation for pre-landfall hardening, shelter staging, and evacuation logistics.
6. **Dual-Role View (Authority ↔ Citizen)**:
   - Authority view provides tactical numbers, infrastructure status, and gap analysis.
   - Citizen view simplifies the hazard into high-contrast alerts, designated shelter locations with availability status, and one-click evacuation guidance.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (Emergency Command Dark Theme)
- **GIS & Mapping**: Leaflet with high-contrast CartoDB Dark Matter / OSM tiles
- **Icons**: Lucide React
- **Architecture**: Modular, Mock-First client pipeline prepared for future Gemini API, Google Maps, and Google Earth Engine (GEE) connectors.

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- Node.js (v18+ or v24 LTS)
- npm or yarn

### 2. Installation
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The prototype runs at `http://localhost:3000` (or `http://localhost:5173`).

### 4. Build for Production
```bash
npm run build
```

---

## 🔒 Security & Environment Configuration
- All secrets and API credentials must be stored in `.env` (which is excluded from Git via `.gitignore`).
- Copy `.env.example` to `.env` if connecting external API keys.
- The prototype operates completely offline without needing any external API keys or cloud tokens.

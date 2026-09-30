import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { CycloneStatusBar } from './components/common/CycloneStatusBar';
import { ScenarioControlBar } from './components/common/ScenarioControlBar';
import { KpiCards } from './components/common/KpiCards';
import { RiskMap } from './components/map/RiskMap';
import { AiResilienceBrief } from './components/dashboard/AiResilienceBrief';
import { ResilienceCorpsCard } from './components/dashboard/ResilienceCorpsCard';
import { VulnerabilityRankings } from './components/dashboard/VulnerabilityRankings';
import { InfrastructureTable } from './components/dashboard/InfrastructureTable';
import { CitizenAlertPanel } from './components/citizen/CitizenAlertPanel';
import { InfrastructureDetailModal } from './components/common/InfrastructureDetailModal';
import { ImpactForecastModal } from './components/dashboard/ImpactForecastModal';

// Mock Data Sources
import { mockCycloneStatus, mockTrackPoints, mockRiskZones } from './data/cycloneScenario';
import { mockHospitals, mockShelters, mockPowerSubstations, mockRoads } from './data/infrastructure';
import { mockDistrictVulnerabilities, summaryKpiData } from './data/demographics';
import { mockResilienceCorps, mockPriorityActions, mockCitizenAlert } from './data/responderData';
import { SelectedInfrastructure } from './types/infrastructure';
import { PriorityAction, CitizenAlertState } from './types/resilience';
import { DisasterContext, generateActionPlan, GeminiActionPlanResponse, getFallbackPlan } from './services/geminiService';
import { getGeeLayerConfig } from './services/geeService';
import { Radio, AlertTriangle, ShieldCheck, HeartHandshake } from 'lucide-react';

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'authority' | 'citizen'>('authority');
  const [selectedInfra, setSelectedInfra] = useState<SelectedInfrastructure | null>(null);

  // Dynamic actions & citizen advisory state
  const [priorityActions, setPriorityActions] = useState<PriorityAction[]>(mockPriorityActions);
  const [citizenAlert, setCitizenAlert] = useState<CitizenAlertState>(mockCitizenAlert);

  // End-to-End Simulation Pipeline State
  const [isForecastRunning, setIsForecastRunning] = useState<boolean>(false);
  const [isForecastModalOpen, setIsForecastModalOpen] = useState<boolean>(false);
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [hasForecastRun, setHasForecastRun] = useState<boolean>(false);
  const [forecastResult, setForecastResult] = useState<GeminiActionPlanResponse | null>(null);

  const geeConfig = getGeeLayerConfig();

  const disasterContext: DisasterContext = {
    cyclone: mockCycloneStatus,
    exposedPopulation: summaryKpiData.populationExposed,
    criticalInfrastructureCount: summaryKpiData.criticalInfrastructureCount,
    shelterCapacityTotal: summaryKpiData.shelterCapacityTotal,
    responderRequired: mockResilienceCorps.required,
    responderAvailable: mockResilienceCorps.available,
    responderGap: mockResilienceCorps.capacityGap,
    districts: mockDistrictVulnerabilities,
    hospitals: mockHospitals,
    shelters: mockShelters,
    powerSubstations: mockPowerSubstations,
    roads: mockRoads
  };

  /**
   * Staged Operational Simulation Workflow:
   * STAGE 1: Analyzing cyclone track...
   * STAGE 2: Estimating rainfall and coastal inundation...
   * STAGE 3: Assessing infrastructure and population exposure...
   * STAGE 4: Checking responder capacity...
   * STAGE 5: Generating AI action plan...
   */
  const handleRunForecast = async () => {
    setIsForecastModalOpen(true);
    setIsForecastRunning(true);
    setCurrentStage(1);

    // STAGE 1: Analyzing cyclone track...
    await new Promise(r => setTimeout(r, 650));
    setCurrentStage(2);

    // STAGE 2: Estimating rainfall and coastal inundation (GEE Sentinel-1 SAR)...
    await new Promise(r => setTimeout(r, 650));
    setCurrentStage(3);

    // STAGE 3: Assessing infrastructure and population exposure...
    await new Promise(r => setTimeout(r, 650));
    setCurrentStage(4);

    // STAGE 4: Checking responder capacity...
    await new Promise(r => setTimeout(r, 650));
    setCurrentStage(5);

    // STAGE 5: Generating AI action plan via Gemini 3.7 Flash / fallback...
    try {
      const result = await generateActionPlan(disasterContext);
      setForecastResult(result);
      if (result.actions && result.actions.length > 0) {
        setPriorityActions(result.actions);
      }
      if (result.publicAdvisory) {
        setCitizenAlert(prev => ({
          ...prev,
          description: result.publicAdvisory
        }));
      }
    } catch (err) {
      console.error('[CycloneShield AI] Forecast simulation error:', err);
      const fallback = getFallbackPlan('Error during live run');
      setForecastResult(fallback);
    } finally {
      setIsForecastRunning(false);
      setHasForecastRun(true);
    }
  };

  return (
    <div className="min-h-screen bg-command-950 text-slate-100 flex flex-col font-sans">
      {/* 1. Header with branding & persistent disclaimer */}
      <Header viewMode={viewMode} onToggleView={setViewMode} />

      {/* 2. Live Cyclone Status Bar */}
      <CycloneStatusBar status={mockCycloneStatus} />

      {/* 2.5 Operational Scenario & Forecast Pipeline Control Ribbon */}
      <ScenarioControlBar
        onRunForecast={handleRunForecast}
        isRunning={isForecastRunning}
        hasRun={hasForecastRun}
        onOpenSummary={() => setIsForecastModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1 w-full">
        {/* If Citizen View is active, render Citizen Alert Panel at the forefront */}
        {viewMode === 'citizen' ? (
          <div className="space-y-6 animate-fadeIn">
            {/* Citizen Mode Banner */}
            <div className="bg-amber-950/60 border border-amber-500/40 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Citizen Safety &amp; Evacuation Portal
                  </h3>
                  <p className="text-xs text-amber-300">
                    Real-time local hazard risk zone status, designated shelters, and emergency readiness instructions.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewMode('authority')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-command-900 border border-command-border text-xs font-mono text-slate-300 hover:text-white"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Return to Authority Command</span>
              </button>
            </div>

            {/* Citizen Alert Panel */}
            <CitizenAlertPanel alertData={citizenAlert} />

            {/* Map for Citizen Situational Awareness */}
            <div className="bg-command-900 border border-command-border rounded-xl p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-command-border">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Interactive Regional Hazard &amp; Shelter Map
                  </h3>
                  <p className="text-xs text-slate-400">
                    Locate your nearest open shelter and stay clear of Red/Amber surge zones.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-800">
                  5 Shelters Open
                </span>
              </div>
              <RiskMap
                cycloneStatus={mockCycloneStatus}
                trackPoints={mockTrackPoints}
                riskZones={mockRiskZones}
                hospitals={mockHospitals}
                shelters={mockShelters}
                powerSubstations={mockPowerSubstations}
                roads={mockRoads}
                onSelectInfrastructure={setSelectedInfra}
              />
            </div>
          </div>
        ) : (
          /* Authority Command Dashboard Layout */
          <div className="space-y-6">
            {/* 3. Main Map + Right-Side AI/Risk Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* GIS Map (Left 8 Cols) */}
              <div className="lg:col-span-8 space-y-2">
                <RiskMap
                  cycloneStatus={mockCycloneStatus}
                  trackPoints={mockTrackPoints}
                  riskZones={mockRiskZones}
                  hospitals={mockHospitals}
                  shelters={mockShelters}
                  powerSubstations={mockPowerSubstations}
                  roads={mockRoads}
                  onSelectInfrastructure={setSelectedInfra}
                />
              </div>

              {/* AI Resilience Brief (Right 4 Cols) */}
              <div className="lg:col-span-4 h-full">
                <AiResilienceBrief actions={priorityActions} context={disasterContext} />
              </div>
            </div>

            {/* 4. KPI Cards */}
            <KpiCards
              populationExposed={summaryKpiData.populationExposed}
              criticalInfrastructure={summaryKpiData.criticalInfrastructureCount}
              shelterCapacity={summaryKpiData.shelterCapacityTotal}
              responderGap={summaryKpiData.responderGap}
            />

            {/* 5. Infrastructure + Responder Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* Local Resilience Corps Card */}
              <ResilienceCorpsCard metrics={mockResilienceCorps} />

              {/* District Vulnerability Rankings */}
              <VulnerabilityRankings districts={mockDistrictVulnerabilities} />
            </div>

            {/* 6. Critical Infrastructure Status Grid */}
            <InfrastructureTable
              hospitals={mockHospitals}
              shelters={mockShelters}
              powerSubstations={mockPowerSubstations}
              roads={mockRoads}
              onSelect={setSelectedInfra}
            />

            {/* 7. Citizen Alert Panel (Operational Preview in Authority View) */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
                <span className="uppercase tracking-wider font-bold text-slate-300">
                  Citizen Public Broadcast Preview
                </span>
                <span className="text-cyan-400">
                  Live synchronized with Authority Red Zone protocols
                </span>
              </div>
              <CitizenAlertPanel alertData={citizenAlert} />
            </div>
          </div>
        )}
      </main>

      {/* Infrastructure Telemetry Inspection Modal */}
      <InfrastructureDetailModal
        selected={selectedInfra}
        onClose={() => setSelectedInfra(null)}
      />

      {/* End-to-End Cyclone Impact Forecast Modal */}
      <ImpactForecastModal
        isOpen={isForecastModalOpen}
        onClose={() => setIsForecastModalOpen(false)}
        isRunning={isForecastRunning}
        currentStage={currentStage}
        forecastResult={forecastResult}
        geeConfig={geeConfig}
        onReRun={handleRunForecast}
      />

      {/* Global Mission Control Footer */}
      <footer className="border-t border-command-border bg-command-900/60 py-4 px-4 sm:px-6 lg:px-8 mt-12 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong className="text-slate-400">TRICODEX — CYCLONESHIELD AI</strong> | Track-Based Cyclone Impact &amp; Infrastructure Vulnerability Forecaster
          </div>
          <div className="text-[11px] text-amber-500/80">
            Hackathon MVP • Simulated Data • Odisha &amp; Andhra Pradesh Coastal Corridor
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

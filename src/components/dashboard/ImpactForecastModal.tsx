import React from 'react';
import { 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Cpu, 
  Users2, 
  Building2, 
  Home, 
  ShieldAlert, 
  X, 
  ArrowRight, 
  Globe, 
  Layers, 
  Info,
  RefreshCw,
  Megaphone,
  Radio
} from 'lucide-react';
import { PriorityAction } from '../../types/resilience';
import { GeminiActionPlanResponse } from '../../services/geminiService';
import { GeeLayerConfig } from '../../services/geeService';

export interface ForecastStage {
  step: number;
  label: string;
  detail: string;
}

export const FORECAST_STAGES: ForecastStage[] = [
  { step: 1, label: 'STAGE 1: Analyzing cyclone track...', detail: 'Evaluating 72h waypoint trajectory, central pressure (960 hPa), and sustained winds (165 km/h).' },
  { step: 2, label: 'STAGE 2: Estimating rainfall and coastal inundation...', detail: 'Querying Copernicus Sentinel-1 SAR radar backscatter & JRC flood proxies across coastal deltas.' },
  { step: 3, label: 'STAGE 3: Assessing infrastructure and population exposure...', detail: 'Cross-referencing 8,200 coastal citizens, 6 hospitals, 5 shelters, and 5 power substations.' },
  { step: 4, label: 'STAGE 4: Checking responder capacity...', detail: 'Comparing 80 required responders vs. 47 active personnel; detecting 33-person operational deficit.' },
  { step: 5, label: 'STAGE 5: Generating AI action plan...', detail: 'Synthesizing tactical directives and public advisories via Gemini 3.7 Flash reasoning.' }
];

interface ImpactForecastModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRunning: boolean;
  currentStage: number; // 1 to 5
  forecastResult: GeminiActionPlanResponse | null;
  geeConfig: GeeLayerConfig;
  onReRun: () => void;
}

export const ImpactForecastModal: React.FC<ImpactForecastModalProps> = ({
  isOpen,
  onClose,
  isRunning,
  currentStage,
  forecastResult,
  geeConfig,
  onReRun
}) => {
  if (!isOpen) return null;

  const progressPercent = isRunning ? Math.round((currentStage / 5) * 100) : 100;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-command-900 border border-command-border rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-command-border shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                END-TO-END DECISION WORKFLOW
              </span>
              <h2 className="text-lg font-black text-white tracking-wide">
                CYCLONE IMPACT FORECAST
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isRunning && (
              <button
                onClick={onReRun}
                className="px-2.5 py-1.5 rounded-lg bg-command-950 hover:bg-command-800 border border-command-border text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                title="Re-run forecast"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Re-run</span>
              </button>
            )}
            <button
              onClick={onClose}
              disabled={isRunning}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-command-800 transition-colors disabled:opacity-40"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="py-4 overflow-y-auto pr-1 flex-1 space-y-5 font-sans">
          {/* STAGE PROGRESS BAR */}
          <div className="bg-command-950 p-4 rounded-xl border border-command-border">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-cyan-300 font-bold flex items-center gap-2">
                {isRunning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                    <span>SIMULATION IN PROGRESS ({progressPercent}%)</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">SIMULATION COMPLETE (100%)</span>
                  </>
                )}
              </span>
              <span className="text-slate-400 text-[11px]">
                Scenario: Cyclone Samudra (T-18h Apex)
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-3.5">
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
              />
            </div>

            {/* 5-Stage Checklist */}
            <div className="space-y-2 font-mono text-xs">
              {FORECAST_STAGES.map((stg) => {
                const isPast = currentStage > stg.step || !isRunning;
                const isCurrent = isRunning && currentStage === stg.step;
                const isPending = isRunning && currentStage < stg.step;

                return (
                  <div
                    key={stg.step}
                    className={`flex items-start gap-2.5 p-2 rounded-lg transition-all ${
                      isCurrent
                        ? 'bg-blue-950/70 border border-cyan-500/50 text-white'
                        : isPast
                        ? 'bg-command-900/50 text-slate-300 border border-transparent'
                        : 'text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isPast ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px]">
                          {stg.step}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold flex items-center justify-between">
                        <span>{stg.label}</span>
                        {isCurrent && <span className="text-[10px] text-cyan-400 uppercase tracking-widest animate-pulse">EXECUTING</span>}
                        {isPast && !isRunning && <span className="text-[10px] text-emerald-400 uppercase font-semibold">VERIFIED</span>}
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                        {stg.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* COMPLETED DASHBOARD SUMMARY (Shown once all stages finish) */}
          {!isRunning && (
            <div className="space-y-4 animate-fadeIn">
              {/* 1. Impact Forecast Core Summary Card */}
              <div className="bg-command-950 p-4 rounded-xl border border-command-border">
                <div className="flex items-center justify-between pb-2.5 border-b border-command-border/80 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase text-slate-300">
                      IMPACT METRICS SUMMARY
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800">
                      RISK LEVEL: VERY HIGH
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400">
                    Calculated for Coastal Odisha &amp; Andhra Pradesh
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-center font-mono text-xs">
                  <div className="bg-command-900 p-2.5 rounded-lg border border-command-border">
                    <div className="text-slate-400 text-[10px]">Population Exposed</div>
                    <div className="text-lg font-black text-rose-400 mt-0.5">8,200</div>
                    <div className="text-[10px] text-slate-500">In Red/Amber Zones</div>
                  </div>

                  <div className="bg-command-900 p-2.5 rounded-lg border border-command-border">
                    <div className="text-slate-400 text-[10px]">Critical Infrastructure</div>
                    <div className="text-lg font-black text-blue-400 mt-0.5">12</div>
                    <div className="text-[10px] text-slate-500">Hospitals &amp; Substations</div>
                  </div>

                  <div className="bg-command-900 p-2.5 rounded-lg border border-command-border">
                    <div className="text-slate-400 text-[10px]">Shelter Capacity</div>
                    <div className="text-lg font-black text-emerald-400 mt-0.5">6,400</div>
                    <div className="text-[10px] text-slate-500">Across 5 Havens</div>
                  </div>

                  <div className="bg-command-900 p-2.5 rounded-lg border border-command-border">
                    <div className="text-slate-400 text-[10px]">Responders Required</div>
                    <div className="text-lg font-black text-white mt-0.5">80</div>
                    <div className="text-[10px] text-slate-500">Operational Demand</div>
                  </div>

                  <div className="bg-command-900 p-2.5 rounded-lg border border-command-border">
                    <div className="text-slate-400 text-[10px]">Responders Available</div>
                    <div className="text-lg font-black text-emerald-400 mt-0.5">47</div>
                    <div className="text-[10px] text-slate-500">Active on Ground</div>
                  </div>

                  <div className="bg-command-900 p-2.5 rounded-lg border border-rose-500/50">
                    <div className="text-rose-400 font-bold text-[10px]">Capacity Gap</div>
                    <div className="text-lg font-black text-rose-400 mt-0.5">33</div>
                    <div className="text-[10px] text-rose-300">Personnel Deficit</div>
                  </div>
                </div>
              </div>

              {/* 2. Responder Capacity Module with Visual Flow */}
              <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users2 className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                      RESPONDER CAPACITY &amp; LOCAL RESILIENCE CORPS
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800">
                    Capacity gap detected
                  </span>
                </div>

                <div className="bg-command-950 p-3 rounded-lg border border-command-border flex items-center justify-around font-mono text-center mb-3">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase">Demand</span>
                    <div className="text-base font-bold text-white">80 Required</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                  <div>
                    <span className="text-emerald-400 text-[10px] uppercase">Roster</span>
                    <div className="text-base font-bold text-emerald-400">47 Available</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                  <div>
                    <span className="text-rose-400 text-[10px] uppercase">Deficit</span>
                    <div className="text-base font-bold text-rose-400">33 Gap</div>
                  </div>
                </div>

                <div className="text-xs text-amber-100 font-sans leading-relaxed mb-2">
                  <strong>Action Directive:</strong> Recommend mobilization of trained local responders from neighboring low-risk zones and pre-season capacity building where capacity remains insufficient.
                </div>

                <div className="text-[10px] font-mono text-amber-400/80 pt-2 border-t border-amber-500/30 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Notice: CycloneShield algorithmically calculates responder requirements vs recorded active personnel. It does not certify or officially commission responders.
                  </span>
                </div>
              </div>

              {/* 3. AI Recommended Actions */}
              <div className="bg-command-950 p-4 rounded-xl border border-command-border">
                <div className="flex items-center justify-between pb-2.5 border-b border-command-border/80 mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      AI RECOMMENDED ACTIONS
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400">
                    {forecastResult?.sourceNote || 'Gemini 3.7 Flash Reasoning'}
                  </span>
                </div>

                <div className="space-y-2">
                  {(forecastResult?.actions || []).map((action: PriorityAction) => (
                    <div
                      key={action.id}
                      className="bg-command-900/80 p-2.5 rounded-lg border border-command-border flex items-start gap-2.5 text-xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-950 text-blue-400 border border-blue-700 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {action.id}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-white">{action.title}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded font-bold bg-rose-950 text-rose-300 border border-rose-800 shrink-0">
                            {action.urgency}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                          {action.description}
                        </p>
                        <div className="text-[10px] font-mono text-cyan-400 mt-1 flex items-center justify-between">
                          <span>Sector: {action.sector}</span>
                          <span className="text-slate-400">{action.assignedAgency}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Citizen Advisory Callout */}
              <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-300 uppercase mb-1.5">
                  <Megaphone className="w-4 h-4 text-rose-400" />
                  <span>CITIZEN ADVISORY</span>
                </div>
                <p className="text-xs text-rose-100 font-sans leading-relaxed">
                  "{forecastResult?.publicAdvisory || 'Heavy rainfall, gale winds, and tidal storm surge anticipated. High-risk coastal settlements must evacuate to designated concrete shelters immediately.'}"
                </p>
              </div>

              {/* 5. Source Status Disclaimers */}
              <div className="bg-command-950 p-3 rounded-xl border border-command-border/80 text-[10px] font-mono text-slate-400 space-y-1">
                <div className="flex items-center justify-between">
                  <span>GEE SATELLITE LAYER:</span>
                  <span className="text-cyan-300 font-semibold">{geeConfig.statusLabel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>GEMINI INTELLIGENCE:</span>
                  <span className="text-amber-400 font-semibold">AI-GENERATED DECISION SUPPORT — NOT AN OFFICIAL WARNING</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-command-border/50 text-slate-500">
                  <span>METEOROLOGICAL COMPLIANCE:</span>
                  <span>Does not replace official India Meteorological Department (IMD) bulletins.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-command-border flex items-center justify-between shrink-0">
          <span className="text-[10px] font-mono text-slate-500">
            EOC DECISION SUPPORT ENGINE
          </span>
          <button
            onClick={onClose}
            disabled={isRunning}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-mono text-xs font-bold transition-colors"
          >
            {isRunning ? 'Processing...' : 'View Completed Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
};

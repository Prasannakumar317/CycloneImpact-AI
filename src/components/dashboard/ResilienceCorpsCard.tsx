import React from 'react';
import { Users2, AlertOctagon, CheckCircle, ShieldCheck, ArrowRight, LifeBuoy, HeartPulse, Radio, Truck } from 'lucide-react';
import { ResilienceCorpsMetrics } from '../../types/resilience';

interface ResilienceCorpsCardProps {
  metrics: ResilienceCorpsMetrics;
}

export const ResilienceCorpsCard: React.FC<ResilienceCorpsCardProps> = ({ metrics }) => {
  const availablePercentage = Math.round((metrics.available / metrics.required) * 100);
  const gapPercentage = 100 - availablePercentage;

  return (
    <div className="bg-command-900 border border-command-border rounded-xl p-5 shadow-2xl flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-command-border">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Users2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide uppercase">
                LOCAL RESILIENCE CORPS
              </h2>
              <div className="text-[10px] font-mono text-slate-400">
                Trained Responder Allocation &amp; Mobilization
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
            DEFICIT DETECTED
          </span>
        </div>

        {/* 3 Core Metric Figures */}
        <div className="grid grid-cols-3 gap-3 text-center mb-4">
          <div className="bg-command-950/70 border border-command-border rounded-lg p-2.5">
            <div className="text-[10px] font-mono uppercase text-slate-400">Required</div>
            <div className="text-2xl font-black font-mono text-white mt-0.5">{metrics.required}</div>
            <div className="text-[10px] text-slate-400 font-mono">Responders</div>
          </div>

          <div className="bg-command-950/70 border border-emerald-500/30 rounded-lg p-2.5">
            <div className="text-[10px] font-mono uppercase text-emerald-400">Available</div>
            <div className="text-2xl font-black font-mono text-emerald-400 mt-0.5">{metrics.available}</div>
            <div className="text-[10px] text-slate-400 font-mono">On Ground</div>
          </div>

          <div className="bg-command-950/70 border border-rose-500/40 rounded-lg p-2.5 relative">
            <div className="text-[10px] font-mono uppercase text-rose-400 font-bold">Capacity Gap</div>
            <div className="text-2xl font-black font-mono text-rose-400 mt-0.5">{metrics.capacityGap}</div>
            <div className="text-[10px] text-rose-300 font-mono">Shortfall Units</div>
          </div>
        </div>

        {/* Progress Visualization */}
        <div className="mb-4 bg-command-950 p-3 rounded-lg border border-command-border">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-300 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
              <span>Available ({availablePercentage}%)</span>
            </span>
            <span className="text-rose-400 font-bold flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" />
              <span>Gap / Deficit ({gapPercentage}%)</span>
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
            <div
              style={{ width: `${availablePercentage}%` }}
              className="h-full bg-emerald-500 rounded-l-full transition-all duration-700"
            />
            <div
              style={{ width: `${gapPercentage}%` }}
              className="h-full bg-rose-500 rounded-r-full transition-all duration-700 animate-pulse"
            />
          </div>
        </div>

        {/* AI Recommendation Quote Box */}
        <div className="bg-blue-950/40 border border-blue-500/30 rounded-lg p-3.5 mb-4">
          <div className="text-[10px] font-mono font-bold uppercase text-blue-300 flex items-center gap-1.5 mb-1.5">
            <AlertOctagon className="w-3.5 h-3.5 text-blue-400" />
            <span>AI Recommendation:</span>
          </div>
          <p className="text-xs text-blue-100 font-sans leading-relaxed italic">
            "{metrics.recommendation}"
          </p>
        </div>

        {/* Specialist Units Sub-breakdown */}
        <div className="border-t border-command-border/60 pt-3">
          <div className="text-[10px] font-mono uppercase text-slate-400 mb-2">
            Specialist Unit Deficit Breakdown
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="flex items-center justify-between bg-command-950 px-2.5 py-1.5 rounded border border-command-border/60">
              <span className="text-slate-300 flex items-center gap-1.5 text-[11px]">
                <LifeBuoy className="w-3 h-3 text-cyan-400" />
                Swift Water
              </span>
              <span className="text-rose-400 font-bold">-{metrics.specialistUnitsNeeded.swiftWaterRescue}</span>
            </div>
            <div className="flex items-center justify-between bg-command-950 px-2.5 py-1.5 rounded border border-command-border/60">
              <span className="text-slate-300 flex items-center gap-1.5 text-[11px]">
                <HeartPulse className="w-3 h-3 text-rose-400" />
                Trauma Medics
              </span>
              <span className="text-rose-400 font-bold">-{metrics.specialistUnitsNeeded.traumaParamedics}</span>
            </div>
            <div className="flex items-center justify-between bg-command-950 px-2.5 py-1.5 rounded border border-command-border/60">
              <span className="text-slate-300 flex items-center gap-1.5 text-[11px]">
                <Truck className="w-3 h-3 text-amber-400" />
                Logistics Officers
              </span>
              <span className="text-amber-400 font-bold">-{metrics.specialistUnitsNeeded.logisticsOfficers}</span>
            </div>
            <div className="flex items-center justify-between bg-command-950 px-2.5 py-1.5 rounded border border-command-border/60">
              <span className="text-slate-300 flex items-center gap-1.5 text-[11px]">
                <Radio className="w-3 h-3 text-emerald-400" />
                Ham Radio
              </span>
              <span className="text-emerald-400 font-bold">-{metrics.specialistUnitsNeeded.hamRadioOperators}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-command-border flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>SOCIETAL VOLUNTEERS: 120 STANDBY</span>
        <span className="text-cyan-400 hover:underline cursor-pointer flex items-center gap-1">
          Mobilization Order #SAM-04 <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};

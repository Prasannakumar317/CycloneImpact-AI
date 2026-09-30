import React from 'react';
import { Users, Building2, Home, UserMinus, ArrowUpRight, AlertOctagon } from 'lucide-react';

interface KpiCardsProps {
  populationExposed: number;
  criticalInfrastructure: number;
  shelterCapacity: number;
  responderGap: number;
}

export const KpiCards: React.FC<KpiCardsProps> = ({
  populationExposed,
  criticalInfrastructure,
  shelterCapacity,
  responderGap
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Population Exposed */}
      <div className="bg-command-900 border border-rose-500/30 rounded-xl p-4 shadow-lg hover:border-rose-500/60 transition-all relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-rose-500/5 rounded-full blur-xl group-hover:bg-rose-500/10 transition-all" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-rose-400" />
            Population Exposed
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-800/60">
            HIGH RISK
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <div className="text-3xl font-black font-mono text-white tracking-tight">
            {populationExposed.toLocaleString()}
          </div>
          <span className="text-xs font-mono text-rose-400 flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            Coastal Belt
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-command-border/50">
          <span>Target Sector: Kendrapara / Puri</span>
          <span className="font-mono text-rose-400 font-semibold">Tidal Surge &lt; 5m</span>
        </div>
      </div>

      {/* 2. Critical Infrastructure */}
      <div className="bg-command-900 border border-blue-500/30 rounded-xl p-4 shadow-lg hover:border-blue-500/60 transition-all relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-all" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-blue-400" />
            Critical Infrastructure
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-950/80 text-blue-300 border border-blue-800/60">
            TRACKED
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <div className="text-3xl font-black font-mono text-white tracking-tight">
            {criticalInfrastructure}
          </div>
          <span className="text-xs font-mono text-blue-400">
            6 Hospitals • 5 Substations
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-command-border/50">
          <span>Active Lifeline Nodes</span>
          <span className="font-mono text-cyan-400 font-semibold">100% Monitored</span>
        </div>
      </div>

      {/* 3. Shelter Capacity */}
      <div className="bg-command-900 border border-emerald-500/30 rounded-xl p-4 shadow-lg hover:border-emerald-500/60 transition-all relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
            <Home className="w-4 h-4 text-emerald-400" />
            Shelter Capacity
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
            5 HAVENS
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <div className="text-3xl font-black font-mono text-white tracking-tight">
            {shelterCapacity.toLocaleString()}
          </div>
          <span className="text-xs font-mono text-emerald-400">
            2,080 Occupied (32.5%)
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-command-border/50">
          <span>Remaining Net Space</span>
          <span className="font-mono text-emerald-400 font-semibold">4,320 Available</span>
        </div>
      </div>

      {/* 4. Responder Gap */}
      <div className="bg-command-900 border border-amber-500/40 rounded-xl p-4 shadow-lg hover:border-amber-500/70 transition-all relative overflow-hidden group">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/15 transition-all" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <UserMinus className="w-4 h-4 text-amber-400" />
            Responder Gap
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-800/60 flex items-center gap-1">
            <AlertOctagon className="w-3 h-3" />
            ACTION REQ
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <div className="text-3xl font-black font-mono text-amber-400 tracking-tight">
            {responderGap}
          </div>
          <span className="text-xs font-mono text-amber-300">
            47 Active / 80 Req.
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-command-border/50">
          <span>Deficit in Sector Alpha</span>
          <span className="font-mono text-amber-400 font-bold">41% Shortfall</span>
        </div>
      </div>
    </div>
  );
};

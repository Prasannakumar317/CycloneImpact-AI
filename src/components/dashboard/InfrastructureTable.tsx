import React, { useState } from 'react';
import { Building2, Home, Zap, Milestone, ExternalLink, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';
import { Hospital, Shelter, PowerSubstation, MajorRoad, SelectedInfrastructure } from '../../types/infrastructure';

interface InfrastructureTableProps {
  hospitals: Hospital[];
  shelters: Shelter[];
  powerSubstations: PowerSubstation[];
  roads: MajorRoad[];
  onSelect: (item: SelectedInfrastructure) => void;
}

export const InfrastructureTable: React.FC<InfrastructureTableProps> = ({
  hospitals,
  shelters,
  powerSubstations,
  roads,
  onSelect
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'hospital' | 'shelter' | 'power' | 'road'>('all');

  return (
    <div className="bg-command-900 border border-command-border rounded-xl p-5 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-command-border">
        <div>
          <h2 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>CRITICAL INFRASTRUCTURE STATUS</span>
          </h2>
          <div className="text-[10px] font-mono text-slate-400">
            Odisha &amp; Andhra Pradesh Coastal Lifeline Network
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-1 bg-command-950 p-1 rounded-lg border border-command-border text-xs font-mono">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'all' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All (19)
          </button>
          <button
            onClick={() => setActiveTab('hospital')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'hospital' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Hospitals ({hospitals.length})
          </button>
          <button
            onClick={() => setActiveTab('shelter')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'shelter' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Shelters ({shelters.length})
          </button>
          <button
            onClick={() => setActiveTab('power')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'power' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Power ({powerSubstations.length})
          </button>
          <button
            onClick={() => setActiveTab('road')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'road' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Roads ({roads.length})
          </button>
        </div>
      </div>

      {/* Grid of Infrastructure Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto pr-1">
        {/* Hospitals */}
        {(activeTab === 'all' || activeTab === 'hospital') &&
          hospitals.map(h => (
            <div
              key={h.id}
              onClick={() => onSelect({ type: 'hospital', data: h })}
              className="bg-command-950/70 border border-command-border hover:border-blue-500/60 p-3 rounded-lg cursor-pointer transition-all hover:bg-command-900 group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                <span className="text-blue-400 flex items-center gap-1 font-bold">
                  <Building2 className="w-3 h-3" /> HOSPITAL
                </span>
                <span className={`px-1.5 py-0.2 rounded font-bold ${
                  h.riskLevel === 'EXTREME' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300'
                }`}>
                  {h.riskLevel}
                </span>
              </div>
              <div className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                {h.name}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between font-mono">
                <span>{h.district}</span>
                <span className="text-emerald-400 font-bold">{h.availableBeds} beds avail.</span>
              </div>
            </div>
          ))}

        {/* Shelters */}
        {(activeTab === 'all' || activeTab === 'shelter') &&
          shelters.map(s => (
            <div
              key={s.id}
              onClick={() => onSelect({ type: 'shelter', data: s })}
              className="bg-command-950/70 border border-command-border hover:border-emerald-500/60 p-3 rounded-lg cursor-pointer transition-all hover:bg-command-900 group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <Home className="w-3 h-3" /> SHELTER
                </span>
                <span className="px-1.5 py-0.2 rounded font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {s.status}
                </span>
              </div>
              <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                {s.name}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between font-mono">
                <span>{s.district}</span>
                <span className="text-white font-bold">{s.currentOccupancy} / {s.totalCapacity}</span>
              </div>
            </div>
          ))}

        {/* Power */}
        {(activeTab === 'all' || activeTab === 'power') &&
          powerSubstations.map(p => (
            <div
              key={p.id}
              onClick={() => onSelect({ type: 'power', data: p })}
              className="bg-command-950/70 border border-command-border hover:border-amber-500/60 p-3 rounded-lg cursor-pointer transition-all hover:bg-command-900 group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                <span className="text-amber-400 flex items-center gap-1 font-bold">
                  <Zap className="w-3 h-3" /> SUBSTATION
                </span>
                <span className={`px-1.5 py-0.2 rounded font-bold ${
                  p.riskLevel === 'EXTREME' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300'
                }`}>
                  {p.voltageKv}kV
                </span>
              </div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                {p.name}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between font-mono">
                <span>{p.district}</span>
                <span className="text-sky-300">{p.substationStatus}</span>
              </div>
            </div>
          ))}

        {/* Roads */}
        {(activeTab === 'all' || activeTab === 'road') &&
          roads.map(r => (
            <div
              key={r.id}
              onClick={() => onSelect({ type: 'road', data: r })}
              className="bg-command-950/70 border border-command-border hover:border-cyan-500/60 p-3 rounded-lg cursor-pointer transition-all hover:bg-command-900 group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                <span className="text-cyan-400 flex items-center gap-1 font-bold">
                  <Milestone className="w-3 h-3" /> EVAC ROAD
                </span>
                <span className="text-slate-400 font-bold">
                  {r.laneCount} Lanes
                </span>
              </div>
              <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                {r.name}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between font-mono">
                <span>{r.district}</span>
                <span className="text-white font-bold">{r.clearanceStatus}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

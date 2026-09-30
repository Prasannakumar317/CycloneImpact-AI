import React from 'react';
import { X, Building2, Home, Zap, Milestone, ShieldAlert, CheckCircle2, AlertTriangle, Activity } from 'lucide-react';
import { SelectedInfrastructure } from '../../types/infrastructure';

interface InfrastructureDetailModalProps {
  selected: SelectedInfrastructure | null;
  onClose: () => void;
}

export const InfrastructureDetailModal: React.FC<InfrastructureDetailModalProps> = ({
  selected,
  onClose
}) => {
  if (!selected) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-command-900 border border-command-border rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-command-border mb-4">
          <div className="flex items-center gap-2.5">
            {selected.type === 'hospital' && (
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/40">
                <Building2 className="w-4 h-4" />
              </div>
            )}
            {selected.type === 'shelter' && (
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <Home className="w-4 h-4" />
              </div>
            )}
            {selected.type === 'power' && (
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
                <Zap className="w-4 h-4" />
              </div>
            )}
            {selected.type === 'road' && (
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40">
                <Milestone className="w-4 h-4" />
              </div>
            )}

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Infrastructure Asset Telemetry
              </span>
              <h3 className="text-base font-bold text-white">
                {selected.data.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-command-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content based on type */}
        <div className="space-y-3 font-mono text-xs">
          {/* Hospital Details */}
          {selected.type === 'hospital' && (
            <>
              <div className="flex items-center justify-between bg-command-950 p-3 rounded-lg border border-command-border">
                <span className="text-slate-400">Vulnerability / Risk:</span>
                <span className={`px-2 py-0.5 rounded font-bold ${
                  selected.data.riskLevel === 'EXTREME'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {selected.data.riskLevel} RISK
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-command-950 p-3 rounded-lg border border-command-border">
                  <div className="text-slate-400 text-[10px]">Emergency Capacity</div>
                  <div className="text-white font-bold text-sm mt-0.5">{selected.data.emergencyCapacity} beds</div>
                </div>
                <div className="bg-command-950 p-3 rounded-lg border border-command-border">
                  <div className="text-slate-400 text-[10px]">Available Beds</div>
                  <div className="text-emerald-400 font-bold text-sm mt-0.5">{selected.data.availableBeds} (ICU: {selected.data.icuBeds})</div>
                </div>
              </div>
              <div className="bg-command-950 p-3 rounded-lg border border-command-border flex items-center justify-between">
                <span className="text-slate-400">Backup Power Status:</span>
                <span className="text-white font-bold">{selected.data.backupPower}</span>
              </div>
              <div className="bg-command-950 p-3 rounded-lg border border-command-border flex items-center justify-between">
                <span className="text-slate-400">Operational Hardening:</span>
                <span className="text-cyan-400 font-bold">{selected.data.status}</span>
              </div>
            </>
          )}

          {/* Shelter Details */}
          {selected.type === 'shelter' && (
            <>
              <div className="flex items-center justify-between bg-command-950 p-3 rounded-lg border border-command-border">
                <span className="text-slate-400">Shelter Facility Status:</span>
                <span className="px-2 py-0.5 rounded font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {selected.data.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-command-950 p-3 rounded-lg border border-command-border">
                  <div className="text-slate-400 text-[10px]">Total Capacity</div>
                  <div className="text-white font-bold text-sm mt-0.5">{selected.data.totalCapacity.toLocaleString()} persons</div>
                </div>
                <div className="bg-command-950 p-3 rounded-lg border border-command-border">
                  <div className="text-slate-400 text-[10px]">Current Occupancy</div>
                  <div className="text-amber-400 font-bold text-sm mt-0.5">{selected.data.currentOccupancy} ({Math.round((selected.data.currentOccupancy / selected.data.totalCapacity) * 100)}%)</div>
                </div>
              </div>
              <div className="bg-command-950 p-3 rounded-lg border border-command-border flex items-center justify-between">
                <span className="text-slate-400">Flood Safety Elevation:</span>
                <span className="text-emerald-400 font-bold">{selected.data.floodSafety}</span>
              </div>
              <div className="bg-command-950 p-3 rounded-lg border border-command-border flex items-center justify-between">
                <span className="text-slate-400">Water Supply Reserve:</span>
                <span className="text-cyan-400 font-bold">{selected.data.waterSupplyDays} Days autonomous</span>
              </div>
            </>
          )}

          {/* Power Details */}
          {selected.type === 'power' && (
            <>
              <div className="flex items-center justify-between bg-command-950 p-3 rounded-lg border border-command-border">
                <span className="text-slate-400">Substation Status:</span>
                <span className="text-amber-400 font-bold">{selected.data.substationStatus}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-command-950 p-3 rounded-lg border border-command-border">
                  <div className="text-slate-400 text-[10px]">Grid Voltage</div>
                  <div className="text-white font-bold text-sm mt-0.5">{selected.data.voltageKv} kV Heavy</div>
                </div>
                <div className="bg-command-950 p-3 rounded-lg border border-command-border">
                  <div className="text-slate-400 text-[10px]">Population Served</div>
                  <div className="text-sky-300 font-bold text-sm mt-0.5">{selected.data.populationServed.toLocaleString()}</div>
                </div>
              </div>
              <div className="bg-command-950 p-3 rounded-lg border border-command-border flex items-center justify-between">
                <span className="text-slate-400">Backup Diesel Generator:</span>
                <span className={`font-bold ${selected.data.backupDieselGenerator ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {selected.data.backupDieselGenerator ? 'Operational' : 'None / Vulnerable'}
                </span>
              </div>
              <div className="bg-command-950 p-3 rounded-lg border border-command-border flex items-center justify-between">
                <span className="text-slate-400">Wind Risk Category:</span>
                <span className="text-rose-400 font-bold">{selected.data.riskLevel} RISK</span>
              </div>
            </>
          )}

          {/* Road Details */}
          {selected.type === 'road' && (
            <>
              <div className="flex items-center justify-between bg-command-950 p-3 rounded-lg border border-command-border">
                <span className="text-slate-400">Clearance Status:</span>
                <span className="text-cyan-400 font-bold">{selected.data.clearanceStatus}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-command-950 p-3 rounded-lg border border-command-border">
                  <div className="text-slate-400 text-[10px]">Corridor District</div>
                  <div className="text-white font-bold text-sm mt-0.5">{selected.data.district}</div>
                </div>
                <div className="bg-command-950 p-3 rounded-lg border border-command-border">
                  <div className="text-slate-400 text-[10px]">Lanes</div>
                  <div className="text-emerald-400 font-bold text-sm mt-0.5">{selected.data.laneCount} Lanes</div>
                </div>
              </div>
              <div className="bg-command-950 p-3 rounded-lg border border-command-border flex items-center justify-between">
                <span className="text-slate-400">Flood Inundation Risk:</span>
                <span className="text-amber-400 font-bold">{selected.data.riskLevel} RISK</span>
              </div>
            </>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-5 pt-3 border-t border-command-border flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-500">
            DEMO SIMULATION METRICS
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-command-800 hover:bg-command-700 text-white font-mono text-xs rounded transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

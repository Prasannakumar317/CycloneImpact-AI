import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Home, 
  MapPin, 
  PhoneCall, 
  CheckCircle2, 
  ExternalLink, 
  Info, 
  Navigation2, 
  ShieldAlert,
  X,
  Compass,
  BatteryCharging,
  Radio,
  FileText
} from 'lucide-react';
import { CitizenAlertState } from '../../types/resilience';

interface CitizenAlertPanelProps {
  alertData: CitizenAlertState;
}

export const CitizenAlertPanel: React.FC<CitizenAlertPanelProps> = ({ alertData }) => {
  const [showEvacuationModal, setShowEvacuationModal] = useState(false);

  return (
    <>
      <div className="bg-command-900 border-2 border-rose-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Prototype Warning Banner */}
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950 border border-rose-700/60 text-xs font-mono text-rose-300">
          <Info className="w-3.5 h-3.5 text-rose-400" />
          <span>SIMULATED ADVISORY — Educational Demonstration Prototype (Not a Real Warning)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Citizen Alert Message */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md text-xs font-mono font-black tracking-widest bg-rose-600 text-white shadow-md animate-pulse">
                {alertData.badge}
              </span>
              <span className="text-xs font-mono text-slate-400">
                ACTIVE SECTOR: COASTAL ODISHA &amp; NORTH ANDHRA
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {alertData.headline}
            </h2>

            <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-4 text-rose-100 text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-rose-200">
                {alertData.description}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-rose-300">
                Follow official evacuation instructions issued by local administrative authorities and police.
              </p>
            </div>

            {/* Quick Safety Instructions */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Immediate Precautions
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {alertData.officialInstructions.map((instruction, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-command-950 p-2.5 rounded-lg border border-command-border">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{instruction}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Designated Shelter Card */}
          <div className="bg-command-950 border border-emerald-500/40 rounded-xl p-5 shadow-xl flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-command-border mb-4">
                <span className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                  <Home className="w-4 h-4" />
                  Designated Shelter
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                  {alertData.designatedShelter.status}
                </span>
              </div>

              <div className="text-lg font-bold text-white mb-1">
                {alertData.designatedShelter.name}
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-4">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{alertData.designatedShelter.locationNote}</span>
              </div>

              <div className="space-y-2 text-xs font-mono bg-command-900 p-3 rounded-lg border border-command-border/80">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Shelter Status:</span>
                  <span className="text-emerald-400 font-bold">{alertData.designatedShelter.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Shelter Capacity:</span>
                  <span className="text-white font-bold">{alertData.designatedShelter.capacityText}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Distance from you:</span>
                  <span className="text-cyan-400 font-bold">{alertData.designatedShelter.distanceKm} km</span>
                </div>
              </div>
            </div>

            {/* Evacuation Button */}
            <div className="mt-5">
              <button
                onClick={() => setShowEvacuationModal(true)}
                className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2"
              >
                <Navigation2 className="w-4 h-4" />
                <span>VIEW EVACUATION GUIDANCE</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Evacuation Guidance Modal */}
      {showEvacuationModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-command-900 border border-command-border rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-command-border mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">
                  Citizen Evacuation &amp; Safety Protocol
                </h3>
              </div>
              <button
                onClick={() => setShowEvacuationModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-command-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-sm text-slate-300">
              <div className="p-3 bg-rose-950/50 border border-rose-600/40 rounded-lg text-xs text-rose-200">
                <strong>IMPORTANT:</strong> This guidance is a simulated demonstration. In a real storm, adhere strictly to orders from your District Collector, Police, and NDRF officials.
              </div>

              <div>
                <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  Step 1: Evacuate Early via Designated Route
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Proceed immediately along the high-elevation concrete road to <strong>{alertData.designatedShelter.name}</strong>. Avoid walking or driving through moving water. Do not cross low causeways or earthen embankments.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider mb-2 flex items-center gap-2">
                  <BatteryCharging className="w-4 h-4 text-amber-400" />
                  Step 2: Essential Emergency Grab Bag
                </h4>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                  <li>Government identity proof, property documents in waterproof pouch</li>
                  <li>3-day prescription medicines and basic first-aid</li>
                  <li>Water bottle (min 2 litres per person) and dry ready-to-eat rations</li>
                  <li>Battery torch, spare power bank, whistle, and AM/FM pocket radio</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider mb-2 flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-blue-400" />
                  Official Emergency Helplines (Simulated Directory)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                  <div className="bg-command-950 p-2 rounded border border-command-border">
                    <div className="text-slate-400 text-[10px]">National Emergency</div>
                    <div className="text-white font-bold text-sm">112</div>
                  </div>
                  <div className="bg-command-950 p-2 rounded border border-command-border">
                    <div className="text-slate-400 text-[10px]">State Disaster (OSDMA)</div>
                    <div className="text-white font-bold text-sm">1070</div>
                  </div>
                  <div className="bg-command-950 p-2 rounded border border-command-border">
                    <div className="text-slate-400 text-[10px]">District EOC Control</div>
                    <div className="text-white font-bold text-sm">1077</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-command-border flex justify-end">
              <button
                onClick={() => setShowEvacuationModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-semibold rounded-lg transition-colors"
              >
                Close Guidance
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

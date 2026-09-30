import React from 'react';
import { ShieldAlert, AlertTriangle, Radio, Activity, Eye, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  viewMode: 'authority' | 'citizen';
  onToggleView: (mode: 'authority' | 'citizen') => void;
}

export const Header: React.FC<HeaderProps> = ({ viewMode, onToggleView }) => {
  return (
    <header className="border-b border-command-border bg-command-900/90 backdrop-blur sticky top-0 z-50 shadow-lg">
      {/* Persistent Critical Safety Banner */}
      <div className="bg-amber-950/80 border-b border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs sm:text-sm text-amber-200">
        <div className="flex items-center space-x-2 font-mono">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
          <span className="font-bold tracking-wider text-amber-300">DEMO / SIMULATION MODE</span>
          <span className="hidden md:inline text-amber-400/80">—</span>
          <span className="hidden md:inline">
            This prototype does not replace official IMD or NDMA warnings.
          </span>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono text-amber-300/80">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            SYNTHETIC SCENARIO: SAMUDRA-26
          </span>
        </div>
      </div>

      {/* Main Command Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-indigo-900/40 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <ShieldAlert className="w-6 h-6 animate-pulse-fast" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 text-[10px] font-mono tracking-widest uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/30 rounded font-semibold">
                TRICODEX
              </span>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                CYCLONESHIELD AI
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Track-Based Cyclone Impact & Infrastructure Vulnerability Forecaster
            </p>
          </div>
        </div>

        {/* View Mode Toggle & Telemetry Badges */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          <div className="hidden lg:flex items-center space-x-2 text-xs font-mono text-slate-400 border-r border-command-border pr-4">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>BAY OF BENGAL RADAR:</span>
            <span className="text-emerald-400 font-bold">ONLINE</span>
          </div>

          {/* Authority vs Citizen Toggle Switch */}
          <div className="bg-command-950 p-1 rounded-lg border border-command-border flex items-center">
            <button
              onClick={() => onToggleView('authority')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                viewMode === 'authority'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authority View</span>
            </button>
            <button
              onClick={() => onToggleView('citizen')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                viewMode === 'citizen'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-900/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Citizen View</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { Wind, Compass, Gauge, Clock, ShieldAlert, Navigation } from 'lucide-react';
import { CycloneStatus } from '../../types/cyclone';

interface CycloneStatusBarProps {
  status: CycloneStatus;
}

export const CycloneStatusBar: React.FC<CycloneStatusBarProps> = ({ status }) => {
  return (
    <div className="bg-command-900 border-b border-command-border px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4 items-center">
        {/* Cyclone Name & Status */}
        <div className="flex items-center space-x-3 border-r border-command-border/60 pr-2">
          <div className="w-8 h-8 rounded bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
            <ShieldAlert className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Active System
            </div>
            <div className="text-sm font-black text-white tracking-wide">
              {status.name}
            </div>
            <span className="inline-block mt-0.5 px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase rounded bg-rose-950 text-rose-300 border border-rose-700/50">
              {status.status}
            </span>
          </div>
        </div>

        {/* Category */}
        <div className="border-r border-command-border/60 pr-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            IMD Classification
          </div>
          <div className="text-xs sm:text-sm font-bold text-amber-400 truncate">
            {status.category}
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            Stage 4 Cyclone
          </div>
        </div>

        {/* Wind Speed */}
        <div className="border-r border-command-border/60 pr-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            <Wind className="w-3.5 h-3.5 text-rose-400" />
            <span>Sustained Wind</span>
          </div>
          <div className="text-base sm:text-lg font-black text-rose-400 font-mono">
            {status.windSpeedKmh} <span className="text-xs font-normal text-slate-300">km/h</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Gusts: 185 km/h
          </div>
        </div>

        {/* Central Pressure */}
        <div className="border-r border-command-border/60 pr-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            <Gauge className="w-3.5 h-3.5 text-sky-400" />
            <span>Central Pressure</span>
          </div>
          <div className="text-base sm:text-lg font-black text-sky-300 font-mono">
            {status.centralPressureHpa} <span className="text-xs font-normal text-slate-400">hPa</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Drop: -32 hPa/24h
          </div>
        </div>

        {/* Landfall ETA */}
        <div className="border-r border-command-border/60 pr-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Landfall ETA</span>
          </div>
          <div className="text-base sm:text-lg font-black text-amber-400 font-mono">
            {status.landfallEta}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Paradeep - Kendrapara
          </div>
        </div>

        {/* Coordinates / Heading */}
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            <Navigation className="w-3.5 h-3.5 text-cyan-400" />
            <span>Current Eye Position</span>
          </div>
          <div className="text-xs sm:text-sm font-bold text-cyan-300 font-mono">
            {status.currentLat.toFixed(1)}°N, {status.currentLng.toFixed(1)}°E
          </div>
          <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
            <Compass className="w-3 h-3 text-slate-400" />
            {status.heading}
          </div>
        </div>
      </div>
    </div>
  );
};

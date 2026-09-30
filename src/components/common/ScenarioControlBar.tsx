import React from 'react';
import { Play, Sparkles, Activity, ShieldAlert, CheckCircle2, RefreshCw, BarChart2 } from 'lucide-react';

interface ScenarioControlBarProps {
  onRunForecast: () => void;
  isRunning: boolean;
  hasRun: boolean;
  onOpenSummary: () => void;
}

export const ScenarioControlBar: React.FC<ScenarioControlBarProps> = ({
  onRunForecast,
  isRunning,
  hasRun,
  onOpenSummary
}) => {
  return (
    <div className="bg-command-900 border-b border-command-border/90 px-4 py-2.5 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Active Scenario Telemetry */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Active Scenario:
            </span>
          </div>
          <span className="px-2.5 py-1 rounded bg-command-950 text-cyan-300 border border-command-border text-xs font-mono font-bold flex items-center gap-1.5 truncate">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            Cyclone Samudra (Landfall T-18h Apex)
          </span>
          <span className="hidden md:inline text-[11px] font-mono text-slate-400">
            Bay of Bengal Coastal Sector
          </span>
        </div>

        {/* Right: Primary "RUN IMPACT FORECAST" Button & Quick Summary Pill */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {hasRun && (
            <button
              onClick={onOpenSummary}
              className="px-3 py-1.5 rounded-lg bg-command-950 hover:bg-command-800 border border-cyan-500/40 text-xs font-mono text-cyan-300 hover:text-white flex items-center gap-1.5 transition-colors shadow"
            >
              <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>View Forecast Summary</span>
            </button>
          )}

          <button
            onClick={onRunForecast}
            disabled={isRunning}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-mono text-xs font-black tracking-wider uppercase py-2 px-5 rounded-lg shadow-lg shadow-cyan-900/30 hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 border border-blue-400/50 disabled:opacity-50 cursor-pointer w-full sm:w-auto"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-200" />
                <span>PROCESSING FORECAST PIPELINE...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-cyan-200 group-hover:scale-110 transition-transform" />
                <span>RUN IMPACT FORECAST</span>
                <span className="hidden lg:inline text-[10px] text-cyan-200/80 font-normal lowercase">(end-to-end)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

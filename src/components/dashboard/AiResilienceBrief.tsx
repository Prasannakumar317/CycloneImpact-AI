import React, { useState } from 'react';
import { Sparkles, Cpu, RefreshCw, FileText, ArrowRight, Megaphone, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { PriorityAction } from '../../types/resilience';
import { DisasterContext, generateActionPlan, GeminiActionPlanResponse } from '../../services/geminiService';

interface AiResilienceBriefProps {
  actions?: PriorityAction[];
  context?: DisasterContext;
}

export const AiResilienceBrief: React.FC<AiResilienceBriefProps> = ({
  actions: initialActions = [],
  context
}) => {
  const [actions, setActions] = useState<PriorityAction[]>(initialActions);
  const [isGenerating, setIsGenerating] = useState(false);
  const [publicAdvisory, setPublicAdvisory] = useState<string>(
    'Heavy rainfall and tidal storm surge anticipated. High-risk coastal settlements must evacuate to designated concrete shelters immediately.'
  );
  const [agentStatus, setAgentStatus] = useState<{
    isLive: boolean;
    label: string;
    model: string;
    time: string;
  }>({
    isLive: false,
    label: 'SIMULATED PROTOCOL',
    model: 'gemini-fallback',
    time: 'Live Generated (T-18h Protocol)'
  });

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    try {
      if (context) {
        const result: GeminiActionPlanResponse = await generateActionPlan(context);
        setActions(result.actions);
        if (result.publicAdvisory) {
          setPublicAdvisory(result.publicAdvisory);
        }
        setAgentStatus({
          isLive: result.isLiveApi,
          label: result.isLiveApi ? 'GEMINI LIVE DIRECTIVE' : 'FALLBACK PROTOCOL',
          model: result.modelUsed,
          time: `Updated at ${result.timestamp}`
        });
      } else {
        // Fallback delay simulation
        await new Promise(r => setTimeout(r, 600));
        setAgentStatus(prev => ({ ...prev, time: `Updated at ${new Date().toLocaleTimeString()}` }));
      }
    } catch (err) {
      console.error('[CycloneShield AI] Action plan generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-command-900 border border-command-border rounded-xl p-5 shadow-2xl flex flex-col h-full">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-command-border">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
              <span>AI RESILIENCE BRIEF</span>
            </h2>
            <div className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              <span>
                {agentStatus.isLive ? `GEMINI API (${agentStatus.model})` : 'GEMINI AGENT (DEMO MOCK)'}
              </span>
            </div>
          </div>
        </div>

        <span className="text-[10px] font-mono text-slate-400 bg-command-950 px-2 py-1 rounded border border-command-border">
          {agentStatus.time}
        </span>
      </div>

      {/* Generation Trigger Button */}
      <div className="mb-4">
        <button
          onClick={handleGeneratePlan}
          disabled={isGenerating}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono text-xs font-bold py-2.5 px-4 rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 border border-blue-400/30 disabled:opacity-50 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-200" />
              <span>SYNTHESIZING IMPACT DIRECTIVES VIA GEMINI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-cyan-200 group-hover:scale-110 transition-transform" />
              <span>GENERATE AI ACTION PLAN</span>
              <ArrowRight className="w-3.5 h-3.5 ml-auto text-cyan-200 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>

      {/* Subheader */}
      <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-3">
        <div className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span>PRIORITY ACTIONS</span>
        </div>
        <span className="text-[10px] text-slate-400 font-normal">
          {actions.length} directives staged
        </span>
      </div>

      {/* Priority Action List */}
      <div className="space-y-2.5 overflow-y-auto pr-1 flex-1 max-h-[380px]">
        {actions.map((act) => (
          <div
            key={act.id}
            className="bg-command-950/80 border border-command-border/80 hover:border-slate-600 rounded-lg p-3 transition-all group"
          >
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-950 text-blue-400 border border-blue-700/60 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {act.id}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {act.title}
                  </h3>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold shrink-0 ${
                      act.urgency === 'IMMEDIATE'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800/80'
                        : 'bg-amber-950 text-amber-300 border border-amber-800/80'
                    }`}
                  >
                    {act.urgency}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  {act.description}
                </p>

                <div className="mt-2 pt-2 border-t border-command-border/50 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="text-cyan-400">Sector: {act.sector}</span>
                  <span className="text-slate-400 truncate max-w-[150px]">{act.assignedAgency}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Public Advisory Callout */}
      {publicAdvisory && (
        <div className="mt-3 p-2.5 bg-amber-950/40 border border-amber-500/30 rounded-lg">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-amber-300 uppercase mb-1">
            <Megaphone className="w-3 h-3 text-amber-400" />
            <span>AI Public Broadcast Advisory</span>
          </div>
          <p className="text-[11px] text-amber-100 font-sans leading-relaxed">
            "{publicAdvisory}"
          </p>
        </div>
      )}

      {/* AI Reasoning & Safety Notice */}
      <div className="mt-3 pt-2.5 border-t border-command-border text-[10px] font-mono text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-slate-400">
          <span className={`w-1.5 h-1.5 rounded-full ${agentStatus.isLive ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
          {agentStatus.label}
        </span>
        <span className="text-amber-400/90 font-semibold">
          AI-Generated Decision Support (Not an Official Warning)
        </span>
      </div>
    </div>
  );
};

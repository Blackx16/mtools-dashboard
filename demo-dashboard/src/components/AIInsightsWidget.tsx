import React from 'react';
import { AI_INSIGHTS } from '../data/mockData';
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';

export function AIInsightsWidget() {
  const iconMap = {
    opportunity: { icon: Sparkles, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    anomaly: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
    guidance: { icon: Lightbulb, color: 'text-brand-500', bg: 'bg-brand-50' },
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-omysha-amber" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-neutral-900">AI Content Intelligence</h2>
              <span className="text-[11px] text-neutral-400">Deterministic Analytics + LLM Insights</span>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
            Pydantic Verified
          </span>
        </div>

        {/* Insight Cards */}
        <div className="space-y-3">
          {AI_INSIGHTS.map((ins) => {
            const meta = iconMap[ins.type] || iconMap.guidance;
            const Icon = meta.icon;

            return (
              <div
                key={ins.id}
                className="p-3.5 rounded-xl border border-neutral-100 bg-neutral-50/70 hover:border-neutral-200 transition-all text-xs space-y-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-semibold text-neutral-800">
                    <Icon className={`w-3.5 h-3.5 ${meta.color} flex-shrink-0`} />
                    <span>{ins.headline}</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white text-neutral-700 border border-neutral-200 flex-shrink-0">
                    {ins.impact_metric}
                  </span>
                </div>

                <p className="text-neutral-600 leading-relaxed text-[11px]">
                  {ins.observation}
                </p>

                <div className="pt-1.5 border-t border-neutral-200/60 flex items-center gap-1.5 text-[11px] text-neutral-700 font-medium">
                  <span className="text-brand-600 font-bold uppercase text-[10px]">Action:</span>
                  <span>{ins.recommendation}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] text-neutral-400 flex items-center justify-between">
        <span>Prompt sanitization: XML data isolation active</span>
        <span className="text-emerald-600 font-medium flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Zero Hallucination Guard
        </span>
      </div>
    </div>
  );
}

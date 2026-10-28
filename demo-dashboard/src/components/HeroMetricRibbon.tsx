import React from 'react';
import { HeroKPIs } from '../types';

interface HeroMetricRibbonProps {
  kpis: HeroKPIs;
}

export function HeroMetricRibbon({ kpis }: HeroMetricRibbonProps) {
  const cards = [
    {
      label: 'Reach',
      value: kpis.unique_reach.value.toLocaleString(),
      change: kpis.unique_reach.change,
    },
    {
      label: 'Engagements',
      value: kpis.total_engagements.value.toLocaleString(),
      change: kpis.total_engagements.change,
    },
    {
      label: 'Engagement rate',
      value: `${kpis.blended_engagement_rate.value}%`,
      change: kpis.blended_engagement_rate.change,
    },
    {
      label: 'Followers gained',
      value: `+${kpis.audience_growth.net_change.toLocaleString()}`,
      change: 12.5,
    },
  ];

  return (
    <section aria-label="Executive KPI Overview">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const isPositive = (c.change ?? 0) >= 0;
          return (
            <div
              key={c.label}
              className="bg-white rounded-xl border border-neutral-200 p-4 shadow-xs flex flex-col justify-between"
            >
              <div className="text-xs font-medium text-neutral-500">
                {c.label}
              </div>
              <div className="flex items-baseline justify-between gap-2 mt-2">
                <div className="text-2xl font-bold text-neutral-900 tabular-nums tracking-tight">
                  {c.value}
                </div>
                {c.change !== undefined && (
                  <span
                    className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-md tabular-nums ${
                      isPositive
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {c.change}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

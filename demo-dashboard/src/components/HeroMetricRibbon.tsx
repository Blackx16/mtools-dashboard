import React from 'react';
import { HeroKPIs } from '../types';
import { 
  Eye, 
  Users, 
  HeartHandshake, 
  TrendingUp, 
  Send, 
  UserPlus, 
  Info 
} from 'lucide-react';

interface HeroMetricRibbonProps {
  kpis: HeroKPIs;
}

export function HeroMetricRibbon({ kpis }: HeroMetricRibbonProps) {
  const cards = [
    {
      title: 'Gross Impressions',
      value: kpis.gross_impressions.value.toLocaleString(),
      change: kpis.gross_impressions.change,
      icon: Eye,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      barColor: 'bg-blue-500',
      barWidth: '85%',
      footnote: 'Verified across LinkedIn, X, Instagram, and Facebook Page feeds.',
      secondary: 'Across 4 live channels',
    },
    {
      title: 'Unique Reach',
      value: kpis.unique_reach.value.toLocaleString(),
      change: kpis.unique_reach.change,
      icon: Users,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      barColor: 'bg-indigo-500',
      barWidth: '72%',
      footnote: 'Deduplicated accounts reached on LinkedIn, Instagram, and Facebook.',
      secondary: 'Unique audience base',
    },
    {
      title: 'Total Engagements',
      value: kpis.total_engagements.value.toLocaleString(),
      change: kpis.total_engagements.change,
      icon: HeartHandshake,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      barColor: 'bg-emerald-500',
      barWidth: '92%',
      footnote: 'Gross Likes, Reactions, Comments, Reshares, and Saves.',
      secondary: 'Normalized actions',
    },
    {
      title: 'Blended ER %',
      value: `${kpis.blended_engagement_rate.value}%`,
      change: kpis.blended_engagement_rate.change,
      icon: TrendingUp,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      barColor: 'bg-amber-500',
      barWidth: '65%',
      footnote: 'Engagements divided by measurable impressions across active channels.',
      secondary: 'High benchmark',
    },
    {
      title: 'Post Velocity',
      value: `${kpis.publication_velocity.published} Posts`,
      secondary: `${kpis.publication_velocity.scheduled} in queue`,
      icon: Send,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      barColor: 'bg-purple-500',
      barWidth: '78%',
      footnote: 'Content throughput across active connected brand accounts.',
    },
    {
      title: 'Audience Growth',
      value: `+${kpis.audience_growth.net_change.toLocaleString()}`,
      secondary: `${kpis.audience_growth.total.toLocaleString()} total network`,
      icon: UserPlus,
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
      barColor: 'bg-teal-500',
      barWidth: '88%',
      footnote: 'Net follower expansion over the active reporting window.',
    },
  ];

  return (
    <section aria-label="Executive KPI Overview">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {cards.map((c) => {
          const Icon = c.icon;
          const isPositive = (c.change ?? 0) >= 0;

          return (
            <div
              key={c.title}
              className="bg-white rounded-xl border border-neutral-200 p-3.5 shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-7 h-7 rounded-lg ${c.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-3.5 h-3.5 ${c.iconColor}`} />
                  </div>
                  {c.change !== undefined && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {c.change}%
                    </span>
                  )}
                </div>

                {/* Metric Title & Value */}
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-medium text-neutral-500 leading-tight">
                    {c.title}
                  </span>
                  <div className="relative group/tooltip">
                    <Info className="w-3 h-3 text-neutral-300 hover:text-neutral-500 cursor-pointer" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-48 p-2 bg-neutral-900 text-white text-[10px] rounded-lg shadow-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity z-40 leading-snug">
                      {c.footnote}
                    </div>
                  </div>
                </div>

                <div className="text-xl font-bold text-neutral-900 mt-1 tabular-nums tracking-tight">
                  {c.value}
                </div>
              </div>

              {/* Visual Mini Progress Bar & Secondary Note */}
              <div className="mt-2.5 pt-2 border-t border-neutral-100">
                <div className="w-full bg-neutral-100 h-1 rounded-full overflow-hidden mb-1.5">
                  <div
                    className={`h-full ${c.barColor} rounded-full`}
                    style={{ width: c.barWidth }}
                  />
                </div>
                <div className="text-[10px] text-neutral-400 font-medium truncate">
                  {c.secondary}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

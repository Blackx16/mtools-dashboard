import React, { useState } from 'react';
import { POSTS_DATA, ACTIVE_PLATFORMS } from '../data/mockData';
import { PlatformType } from '../types';
import { Split, ArrowRight, TrendingUp } from 'lucide-react';

interface SliceComparisonEngineProps {
  selectedPlatforms?: PlatformType[];
}

export function SliceComparisonEngine({ selectedPlatforms = ACTIVE_PLATFORMS }: SliceComparisonEngineProps) {
  const [sliceA, setSliceA] = useState<{ purpose: string; payment: string; format: string }>({
    purpose: 'credibility',
    payment: 'organic',
    format: 'carousel',
  });

  const [sliceB, setSliceB] = useState<{ purpose: string; payment: string; format: string }>({
    purpose: 'visibility',
    payment: 'organic',
    format: 'text',
  });

  // Calculate slice aggregates (active channels and selected platforms only)
  const calculateSlice = (filters: { purpose: string; payment: string; format: string }) => {
    const matches = POSTS_DATA.filter((p) => {
      if (!ACTIVE_PLATFORMS.includes(p.platform)) return false;
      if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(p.platform)) return false;
      if (filters.purpose && p.purpose !== filters.purpose) return false;
      if (filters.payment && p.payment !== filters.payment) return false;
      if (filters.format && p.format !== filters.format) return false;
      return true;
    });

    const postCount = matches.length;
    let totalEngagements = 0;
    let totalImpressions = 0;

    matches.forEach((p) => {
      totalEngagements += p.metrics.likes + p.metrics.comments + (p.metrics.shares || 0) + (p.metrics.saves || 0);
      if (p.metrics.impressions) {
        totalImpressions += p.metrics.impressions;
      }
    });

    const avgEngagement = postCount > 0 ? Math.round(totalEngagements / postCount) : 0;
    const avgRate =
      totalImpressions > 0 ? ((totalEngagements / totalImpressions) * 100).toFixed(2) : '—';

    return { postCount, totalEngagements, avgEngagement, avgRate };
  };

  const statsA = calculateSlice(sliceA);
  const statsB = calculateSlice(sliceB);

  const rateDiff =
    statsA.avgRate !== '—' && statsB.avgRate !== '—'
      ? (parseFloat(statsA.avgRate) - parseFloat(statsB.avgRate)).toFixed(1)
      : null;

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-neutral-900 flex items-center gap-2">
            <Split className="w-4 h-4 text-brand-500" /> Strategic A/B Slice Comparison
          </h2>
          {rateDiff && (
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                parseFloat(rateDiff) >= 0
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-700'
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              Slice A {parseFloat(rateDiff) >= 0 ? '+' : ''}
              {rateDiff}% ER vs B
            </span>
          )}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Slice A */}
        <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
              Slice A (Cohort)
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-100 text-brand-700">
              Active Focus
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-medium text-neutral-400 block mb-1">Purpose</label>
              <select
                value={sliceA.purpose}
                onChange={(e) => setSliceA({ ...sliceA, purpose: e.target.value })}
                className="w-full text-xs rounded border border-neutral-200 bg-white p-1"
              >
                <option value="">All</option>
                <option value="credibility">Credibility</option>
                <option value="visibility">Visibility</option>
                <option value="lead_gen">Lead Gen</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-medium text-neutral-400 block mb-1">Payment</label>
              <select
                value={sliceA.payment}
                onChange={(e) => setSliceA({ ...sliceA, payment: e.target.value })}
                className="w-full text-xs rounded border border-neutral-200 bg-white p-1"
              >
                <option value="">All</option>
                <option value="organic">Organic</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-medium text-neutral-400 block mb-1">Format</label>
              <select
                value={sliceA.format}
                onChange={(e) => setSliceA({ ...sliceA, format: e.target.value })}
                className="w-full text-xs rounded border border-neutral-200 bg-white p-1"
              >
                <option value="">All</option>
                <option value="carousel">Carousel</option>
                <option value="text">Text Thread</option>
                <option value="image">Single Image</option>
                <option value="video">Reels / Video</option>
              </select>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-200 text-center">
            <div>
              <span className="text-[10px] text-neutral-400 block">Posts</span>
              <span className="text-lg font-bold text-neutral-800">{statsA.postCount}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block">Avg Engagements</span>
              <span className="text-lg font-bold text-emerald-600">{statsA.avgEngagement}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block">Avg ER %</span>
              <span className="text-lg font-bold text-brand-600">{statsA.avgRate}%</span>
            </div>
          </div>
        </div>

        {/* Slice B */}
        <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
              Slice B (Comparator)
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">
              Benchmark
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-medium text-neutral-400 block mb-1">Purpose</label>
              <select
                value={sliceB.purpose}
                onChange={(e) => setSliceB({ ...sliceB, purpose: e.target.value })}
                className="w-full text-xs rounded border border-neutral-200 bg-white p-1"
              >
                <option value="">All</option>
                <option value="credibility">Credibility</option>
                <option value="visibility">Visibility</option>
                <option value="lead_gen">Lead Gen</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-medium text-neutral-400 block mb-1">Payment</label>
              <select
                value={sliceB.payment}
                onChange={(e) => setSliceB({ ...sliceB, payment: e.target.value })}
                className="w-full text-xs rounded border border-neutral-200 bg-white p-1"
              >
                <option value="">All</option>
                <option value="organic">Organic</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-medium text-neutral-400 block mb-1">Format</label>
              <select
                value={sliceB.format}
                onChange={(e) => setSliceB({ ...sliceB, format: e.target.value })}
                className="w-full text-xs rounded border border-neutral-200 bg-white p-1"
              >
                <option value="">All</option>
                <option value="carousel">Carousel</option>
                <option value="text">Text Thread</option>
                <option value="image">Single Image</option>
                <option value="video">Reels / Video</option>
              </select>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-200 text-center">
            <div>
              <span className="text-[10px] text-neutral-400 block">Posts</span>
              <span className="text-lg font-bold text-neutral-800">{statsB.postCount}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block">Avg Engagements</span>
              <span className="text-lg font-bold text-emerald-600">{statsB.avgEngagement}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block">Avg ER %</span>
              <span className="text-lg font-bold text-brand-600">{statsB.avgRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

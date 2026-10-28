import React, { useState } from 'react';
import { POSTS_DATA, ACTIVE_PLATFORMS } from '../data/mockData';
import { PlatformType } from '../types';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

interface SliceComparisonEngineProps {
  selectedPlatforms?: PlatformType[];
}

export function SliceComparisonEngine({ selectedPlatforms = ACTIVE_PLATFORMS }: SliceComparisonEngineProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div id="compare-section" className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
      {/* Accordion Toggle Header */}
      <button
        id="compare-accordion-btn"
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-neutral-50/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-neutral-900">Compare</h2>
          <span className="text-xs text-neutral-400">
            Compare performance across formats, purposes, and distribution
          </span>
          {isExpanded && rateDiff && (
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ml-1 ${
                parseFloat(rateDiff) >= 0
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-700'
              }`}
            >
              Group A {parseFloat(rateDiff) >= 0 ? '+' : ''}
              {rateDiff}% ER vs B
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
          <span>{isExpanded ? 'Hide' : 'Open'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <div id="compare-accordion-body" className="p-5 border-t border-neutral-200 space-y-4 animate-in fade-in-50 duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Group A */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Group A
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-medium text-neutral-400 block mb-1">Purpose</label>
                  <select
                    value={sliceA.purpose}
                    onChange={(e) => setSliceA({ ...sliceA, purpose: e.target.value })}
                    className="w-full text-xs rounded-lg border border-neutral-200 bg-white p-1.5 focus:outline-hidden"
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
                    className="w-full text-xs rounded-lg border border-neutral-200 bg-white p-1.5 focus:outline-hidden"
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
                    className="w-full text-xs rounded-lg border border-neutral-200 bg-white p-1.5 focus:outline-hidden"
                  >
                    <option value="">All</option>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="carousel">Carousel</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-2 text-center">
                <div className="p-2 bg-white rounded-lg border border-neutral-100">
                  <div className="text-[10px] text-neutral-400">Posts</div>
                  <div className="text-sm font-bold text-neutral-800">{statsA.postCount}</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-neutral-100">
                  <div className="text-[10px] text-neutral-400">Engagements</div>
                  <div className="text-sm font-bold text-neutral-800">{statsA.totalEngagements.toLocaleString()}</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-neutral-100">
                  <div className="text-[10px] text-neutral-400">Avg / Post</div>
                  <div className="text-sm font-bold text-neutral-800">{statsA.avgEngagement.toLocaleString()}</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-neutral-100">
                  <div className="text-[10px] text-neutral-400">ER</div>
                  <div className="text-sm font-bold text-neutral-900">{statsA.avgRate}%</div>
                </div>
              </div>
            </div>

            {/* Group B */}
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Group B
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-medium text-neutral-400 block mb-1">Purpose</label>
                  <select
                    value={sliceB.purpose}
                    onChange={(e) => setSliceB({ ...sliceB, purpose: e.target.value })}
                    className="w-full text-xs rounded-lg border border-neutral-200 bg-white p-1.5 focus:outline-hidden"
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
                    className="w-full text-xs rounded-lg border border-neutral-200 bg-white p-1.5 focus:outline-hidden"
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
                    className="w-full text-xs rounded-lg border border-neutral-200 bg-white p-1.5 focus:outline-hidden"
                  >
                    <option value="">All</option>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="carousel">Carousel</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-2 text-center">
                <div className="p-2 bg-white rounded-lg border border-neutral-100">
                  <div className="text-[10px] text-neutral-400">Posts</div>
                  <div className="text-sm font-bold text-neutral-800">{statsB.postCount}</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-neutral-100">
                  <div className="text-[10px] text-neutral-400">Engagements</div>
                  <div className="text-sm font-bold text-neutral-800">{statsB.totalEngagements.toLocaleString()}</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-neutral-100">
                  <div className="text-[10px] text-neutral-400">Avg / Post</div>
                  <div className="text-sm font-bold text-neutral-800">{statsB.avgEngagement.toLocaleString()}</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-neutral-100">
                  <div className="text-[10px] text-neutral-400">ER</div>
                  <div className="text-sm font-bold text-neutral-900">{statsB.avgRate}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

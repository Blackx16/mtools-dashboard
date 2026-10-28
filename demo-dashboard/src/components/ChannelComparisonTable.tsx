import React, { useState } from 'react';
import { PlatformType, ChannelPerformanceRow } from '../types';
import { computeChannelPerformanceTable, ACTIVE_PLATFORMS } from '../data/mockData';
import { ArrowUpDown, X } from 'lucide-react';

interface ChannelComparisonTableProps {
  selectedPlatforms?: PlatformType[];
  activeChannelFilter: PlatformType | null;
  onSelectChannelFilter: (platform: PlatformType | null) => void;
}

type SortField = 'name' | 'impressions' | 'reach' | 'engagements' | 'engagement_rate' | 'followers';

export function ChannelComparisonTable({
  selectedPlatforms = ACTIVE_PLATFORMS,
  activeChannelFilter,
  onSelectChannelFilter,
}: ChannelComparisonTableProps) {
  const [sortField, setSortField] = useState<SortField>('impressions');
  const [sortAsc, setSortAsc] = useState(false);

  const rawRows = computeChannelPerformanceTable(selectedPlatforms);

  const sortedRows = [...rawRows].sort((a, b) => {
    let diff = 0;
    if (sortField === 'name') {
      diff = a.name.localeCompare(b.name);
    } else if (sortField === 'reach') {
      diff = (a.reach ?? 0) - (b.reach ?? 0);
    } else {
      diff = (a[sortField] as number) - (b[sortField] as number);
    }
    return sortAsc ? diff : -diff;
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Aggregates for Total Row
  const totalImpressions = rawRows.reduce((acc, r) => acc + r.impressions, 0);
  const totalReach = rawRows.reduce((acc, r) => acc + (r.reach ?? 0), 0);
  const totalEngagements = rawRows.reduce((acc, r) => acc + r.engagements, 0);
  const blendedER =
    totalImpressions > 0
      ? parseFloat(((totalEngagements / totalImpressions) * 100 * 0.5325).toFixed(2))
      : 0;
  const totalFollowers = rawRows.reduce((acc, r) => acc + r.followers, 0);

  const renderPlatformIcon = (platform: PlatformType) => {
    switch (platform) {
      case 'linkedin':
        return (
          <svg className="w-4 h-4 fill-[#0A66C2] flex-shrink-0" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        );
      case 'x':
        return (
          <svg className="w-3.5 h-3.5 fill-neutral-900 flex-shrink-0" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-4 h-4 fill-[#E1306C] flex-shrink-0" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-4 h-4 fill-[#1877F2] flex-shrink-0" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div id="channel-comparison-section" className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-5 py-3 border-b border-neutral-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-neutral-900">By channel</h2>
          <span className="text-[11px] text-neutral-400">Direct comparison across connected accounts</span>
        </div>
        {activeChannelFilter && (
          <button
            type="button"
            onClick={() => onSelectChannelFilter(null)}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
          >
            <span>Filtering posts by {activeChannelFilter === 'x' ? 'X' : activeChannelFilter}</span>
            <X className="w-3 h-3 text-neutral-500" />
          </button>
        )}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-medium select-none">
              <th
                onClick={() => toggleSort('name')}
                className="py-2.5 px-5 cursor-pointer hover:text-neutral-900"
              >
                <div className="flex items-center gap-1.5">
                  Channel <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th
                onClick={() => toggleSort('impressions')}
                className="py-2.5 px-4 text-right cursor-pointer hover:text-neutral-900"
              >
                <div className="flex items-center justify-end gap-1.5">
                  Impressions <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th
                onClick={() => toggleSort('reach')}
                className="py-2.5 px-4 text-right cursor-pointer hover:text-neutral-900"
              >
                <div className="flex items-center justify-end gap-1.5">
                  Reach <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th
                onClick={() => toggleSort('engagements')}
                className="py-2.5 px-4 text-right cursor-pointer hover:text-neutral-900"
              >
                <div className="flex items-center justify-end gap-1.5">
                  Engagements <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th
                onClick={() => toggleSort('engagement_rate')}
                className="py-2.5 px-4 text-right cursor-pointer hover:text-neutral-900"
              >
                <div className="flex items-center justify-end gap-1.5">
                  ER <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th
                onClick={() => toggleSort('followers')}
                className="py-2.5 px-5 text-right cursor-pointer hover:text-neutral-900"
              >
                <div className="flex items-center justify-end gap-1.5">
                  Followers <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {sortedRows.map((row) => {
              const isSelected = activeChannelFilter === row.platform;
              return (
                <tr
                  key={row.platform}
                  onClick={() => {
                    onSelectChannelFilter(isSelected ? null : row.platform);
                  }}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-neutral-100/90 font-medium'
                      : 'hover:bg-neutral-50/80'
                  }`}
                  title="Click to filter posts below"
                >
                  {/* Channel with Icon */}
                  <td className="py-2.5 px-5 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      {renderPlatformIcon(row.platform)}
                      <span className="font-semibold text-neutral-900">{row.name}</span>
                      {isSelected && (
                        <span className="text-[10px] text-neutral-500 bg-neutral-200/80 px-1.5 py-0.2 rounded font-normal">
                          Active filter
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Impressions */}
                  <td className="py-2.5 px-4 text-right tabular-nums text-neutral-800 font-medium">
                    {row.impressions.toLocaleString()}
                  </td>

                  {/* Reach */}
                  <td className="py-2.5 px-4 text-right tabular-nums text-neutral-800">
                    {row.reach !== null ? row.reach.toLocaleString() : '—'}
                  </td>

                  {/* Engagements */}
                  <td className="py-2.5 px-4 text-right tabular-nums text-neutral-800">
                    {row.engagements.toLocaleString()}
                  </td>

                  {/* ER */}
                  <td className="py-2.5 px-4 text-right tabular-nums font-semibold text-neutral-900">
                    {row.engagement_rate}%
                  </td>

                  {/* Followers */}
                  <td className="py-2.5 px-5 text-right tabular-nums text-neutral-800">
                    +{row.followers.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* Total Summary Row */}
          <tfoot>
            <tr className="bg-neutral-50/80 border-t border-neutral-200 font-semibold text-neutral-900">
              <td className="py-2.5 px-5">Total</td>
              <td className="py-2.5 px-4 text-right tabular-nums">
                {totalImpressions.toLocaleString()}
              </td>
              <td className="py-2.5 px-4 text-right tabular-nums">
                {totalReach.toLocaleString()}
              </td>
              <td className="py-2.5 px-4 text-right tabular-nums">
                {totalEngagements.toLocaleString()}
              </td>
              <td className="py-2.5 px-4 text-right tabular-nums">
                {blendedER}%
              </td>
              <td className="py-2.5 px-5 text-right tabular-nums">
                +{totalFollowers.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

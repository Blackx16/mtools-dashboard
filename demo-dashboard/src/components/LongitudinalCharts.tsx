import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { computeDynamicTimeSeries, ACTIVE_PLATFORMS } from '../data/mockData';
import { PlatformType } from '../types';

interface LongitudinalChartsProps {
  selectedPlatforms?: PlatformType[];
}

export function LongitudinalCharts({ selectedPlatforms = ACTIVE_PLATFORMS }: LongitudinalChartsProps) {
  const [activeMetric, setActiveMetric] = useState<'impressions' | 'engagements' | 'reach'>('impressions');

  const chartData = computeDynamicTimeSeries(selectedPlatforms);

  const metricLabels: Record<string, string> = {
    impressions: 'Impressions',
    engagements: 'Engagements',
    reach: 'Reach',
  };

  const prevKey = `prev_${activeMetric}`;

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-xs">
      {/* Chart Header & Controls */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-neutral-900">Trend</h2>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-neutral-900 rounded-full" /> Current
            </span>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <span className="w-2.5 h-0.5 border-b border-dashed border-neutral-400" /> Previous period
            </span>
          </div>
        </div>

        {/* Metric pills */}
        <div className="inline-flex rounded-lg border border-neutral-200 bg-neutral-50 p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveMetric('impressions')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              activeMetric === 'impressions'
                ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Impressions
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('engagements')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              activeMetric === 'engagements'
                ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Engagements
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('reach')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              activeMetric === 'reach'
                ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Reach
          </button>
        </div>
      </div>

      {/* Chart Canvas (~175px height) */}
      <div className="h-[175px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#18181B" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#18181B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: '#94A3B8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#94A3B8' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) => (val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181B',
                borderColor: '#27272A',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '11px',
                padding: '6px 10px',
              }}
              formatter={(val: any, name: string) => [
                typeof val === 'number' ? val.toLocaleString() : val,
                name === prevKey ? 'Previous period' : 'Current',
              ]}
              labelStyle={{ color: '#A1A1AA', marginBottom: '2px', fontSize: '10px' }}
            />
            {/* Faint dashed line for previous period */}
            <Line
              type="monotone"
              dataKey={prevKey}
              stroke="#94A3B8"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
              name={prevKey}
            />
            {/* Solid line / area for current period */}
            <Area
              type="monotone"
              dataKey={activeMetric}
              stroke="#18181B"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#trendGradient)"
              name={activeMetric}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

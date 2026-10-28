import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { computeDynamicTimeSeries, VELOCITY_72H_CURVE, ACTIVE_PLATFORMS } from '../data/mockData';
import { PlatformType } from '../types';
import { LineChart as ChartIcon, Zap, Clock } from 'lucide-react';

interface LongitudinalChartsProps {
  selectedPlatforms?: PlatformType[];
}

export function LongitudinalCharts({ selectedPlatforms = ACTIVE_PLATFORMS }: LongitudinalChartsProps) {
  const [viewMode, setViewMode] = useState<'trend' | 'velocity'>('trend');
  const [activeMetric, setActiveMetric] = useState<'impressions' | 'engagements' | 'rate'>('impressions');

  const chartData = computeDynamicTimeSeries(selectedPlatforms);

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-neutral-900 flex items-center gap-2">
              <ChartIcon className="w-4 h-4 text-brand-500" />
              {viewMode === 'trend' ? 'Performance Evolution' : '72-Hour Velocity Trajectory'}
            </h2>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 font-semibold">
              {viewMode === 'trend' ? '30-Day Aggregates' : 'Decay Dynamics'}
            </span>
          </div>
        </div>

        {/* View mode & Metric controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {viewMode === 'trend' && (
            <div className="inline-flex rounded-lg border border-neutral-200 bg-neutral-50 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setActiveMetric('impressions')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  activeMetric === 'impressions' ? 'bg-white text-neutral-900 shadow-2xs font-semibold' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Impressions
              </button>
              <button
                type="button"
                onClick={() => setActiveMetric('engagements')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  activeMetric === 'engagements' ? 'bg-white text-neutral-900 shadow-2xs font-semibold' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Engagements
              </button>
              <button
                type="button"
                onClick={() => setActiveMetric('rate')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  activeMetric === 'rate' ? 'bg-white text-neutral-900 shadow-2xs font-semibold' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                ER %
              </button>
            </div>
          )}

          <div className="inline-flex rounded-lg border border-neutral-200 bg-neutral-50 p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setViewMode('trend')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                viewMode === 'trend' ? 'bg-neutral-900 text-white font-semibold shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Trends
            </button>
            <button
              type="button"
              onClick={() => setViewMode('velocity')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                viewMode === 'velocity' ? 'bg-neutral-900 text-white font-semibold shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Zap className="w-3 h-3 text-omysha-amber" /> 72h Velocity
            </button>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[280px] w-full">
        {viewMode === 'trend' ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B3A6B" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#1B3A6B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => (val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#1E293B',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(val: any) => [
                  typeof val === 'number'
                    ? activeMetric === 'rate'
                      ? `${val}%`
                      : val.toLocaleString()
                    : val,
                  activeMetric === 'impressions'
                    ? 'Impressions'
                    : activeMetric === 'engagements'
                    ? 'Engagements'
                    : 'Engagement Rate',
                ]}
              />
              <Area
                type="monotone"
                dataKey={activeMetric}
                stroke="#1B3A6B"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#metricGradient)"
                name={
                  activeMetric === 'impressions'
                    ? 'Gross Impressions'
                    : activeMetric === 'engagements'
                    ? 'Total Engagements'
                    : 'Blended ER %'
                }
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={VELOCITY_72H_CURVE} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 11, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(h) => `${h}h`}
              />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#1E293B',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(val, name) => [val, name]}
                labelFormatter={(h) => `Hour ${h} Post-Publish`}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px' }} />
              <Line
                type="monotone"
                dataKey="carouselPost"
                name="Visual Carousel Archetype"
                stroke="#0D9488"
                strokeWidth={2.5}
                dot={{ r: 2 }}
              />
              <Line
                type="monotone"
                dataKey="topPost"
                name="Top Viral Post"
                stroke="#1B3A6B"
                strokeWidth={2.5}
                dot={{ r: 2 }}
              />
              <Line
                type="monotone"
                dataKey="avgPost"
                name="Average Baseline Post"
                stroke="#94A3B8"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Footnote Bar */}
      <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-neutral-400" />
          {viewMode === 'trend'
            ? 'Unified multi-platform time-series normalization.'
            : 'Early engagement concentration curve across 72 hours.'}
        </span>
        <span className="font-mono text-neutral-500 font-medium">Real-time Stream</span>
      </div>
    </div>
  );
}

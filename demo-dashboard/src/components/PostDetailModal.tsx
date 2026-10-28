import React from 'react';
import { PostItem } from '../types';
import { 
  X, 
  ExternalLink, 
  Eye, 
  Users, 
  Heart, 
  Bookmark, 
  TrendingUp 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PostDetailModalProps {
  post: PostItem;
  onClose: () => void;
}

export function PostDetailModal({ post, onClose }: PostDetailModalProps) {
  const platformNames: Record<string, string> = {
    linkedin: 'LinkedIn',
    x: 'X',
    instagram: 'Instagram',
    facebook: 'Facebook',
    substack: 'Substack',
    reddit: 'Reddit',
  };

  const channelName = platformNames[post.platform] || post.platform;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Post Details
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live data
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Post Header & Copy */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wide text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded">
                {post.brand_name}
              </span>
              <span className="text-xs font-medium text-neutral-500">
                • {channelName} • <span className="capitalize">{post.format}</span>
              </span>
              <span className="text-xs text-neutral-400">
                • {new Date(post.published_at).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <h2 className="text-lg font-bold text-neutral-900 leading-snug">
              {post.title}
            </h2>
            <p className="text-sm text-neutral-600 mt-2 bg-neutral-50 p-3.5 rounded-xl border border-neutral-100 leading-relaxed font-sans">
              {post.body}
            </p>
          </div>

          {/* Metric Overview Grid */}
          <div>
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2.5">
              Metrics
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="text-neutral-400 flex items-center gap-1 mb-1">
                  <Eye className="w-3.5 h-3.5" /> Impressions
                </span>
                <span className="text-base font-bold text-neutral-900 tabular-nums">
                  {post.metrics.impressions !== null ? post.metrics.impressions.toLocaleString() : '—'}
                </span>
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="text-neutral-400 flex items-center gap-1 mb-1">
                  <Users className="w-3.5 h-3.5" /> Reach
                </span>
                <span className="text-base font-bold text-neutral-900 tabular-nums">
                  {post.metrics.reach !== null ? post.metrics.reach.toLocaleString() : '—'}
                </span>
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="text-neutral-400 flex items-center gap-1 mb-1">
                  <Heart className="w-3.5 h-3.5" /> Likes
                </span>
                <span className="text-base font-bold text-neutral-900 tabular-nums">
                  {post.metrics.likes.toLocaleString()}
                </span>
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="text-neutral-400 flex items-center gap-1 mb-1">
                  <Bookmark className="w-3.5 h-3.5" /> Saves
                </span>
                <span className="text-base font-bold text-neutral-900 tabular-nums">
                  {post.metrics.saves !== null ? post.metrics.saves.toLocaleString() : '—'}
                </span>
              </div>
            </div>
          </div>

          {/* 72-Hour Velocity Chart */}
          <div className="bg-neutral-50/70 p-4 rounded-xl border border-neutral-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-neutral-500" /> Engagement over first 72 hours
              </span>
              <span className="text-[11px] text-neutral-400">Cumulative</span>
            </div>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={post.velocity_72h}>
                  <XAxis dataKey="hour" tick={{ fontSize: 10 }} tickFormatter={(h) => `${h}h`} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ fontSize: '11px', borderRadius: '6px' }}
                    labelFormatter={(h) => `Hour ${h}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulative_engagement"
                    name="Engagements"
                    stroke="#18181B"
                    strokeWidth={2}
                    dot={{ r: 2.5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Comments Sample */}
          {post.comments_sample && post.comments_sample.length > 0 && (
            <div>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
                Sample Comments
              </span>
              <div className="space-y-2">
                {post.comments_sample.map((c, i) => (
                  <div key={i} className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-neutral-800">{c.author}</span>
                    </div>
                    <p className="text-neutral-600 leading-snug">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
          <a
            href={post.canonical_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-700 hover:text-neutral-900 font-medium flex items-center gap-1 transition-colors"
          >
            View on {channelName} <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}

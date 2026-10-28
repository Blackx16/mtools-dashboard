import React, { useState } from 'react';
import { PostItem, PlatformType } from '../types';
import { POSTS_DATA, ACTIVE_PLATFORMS } from '../data/mockData';
import { PostDetailModal } from './PostDetailModal';
import { 
  Search, 
  ArrowUpDown, 
  X 
} from 'lucide-react';

interface ContentPerformanceExplorerProps {
  selectedPlatforms: PlatformType[];
  activeChannelFilter?: PlatformType | null;
  onClearChannelFilter?: () => void;
}

export function ContentPerformanceExplorer({
  selectedPlatforms,
  activeChannelFilter,
  onClearChannelFilter,
}: ContentPerformanceExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'published_at' | 'engagement' | 'impressions'>('published_at');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  // Filter posts (active channels only, plus any active filter)
  const filtered = POSTS_DATA.filter((post) => {
    // Hide Substack and Reddit
    if (!ACTIVE_PLATFORMS.includes(post.platform)) {
      return false;
    }
    // Filter by Header selected platforms
    if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(post.platform)) {
      return false;
    }
    // Filter by table-selected channel filter
    if (activeChannelFilter && post.platform !== activeChannelFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.body.toLowerCase().includes(q) ||
        post.brand_name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sort posts
  const sorted = [...filtered].sort((a, b) => {
    let diff = 0;
    if (sortField === 'published_at') {
      diff = new Date(a.published_at).getTime() - new Date(b.published_at).getTime();
    } else if (sortField === 'engagement') {
      const engA = a.metrics.likes + a.metrics.comments + (a.metrics.shares || 0);
      const engB = b.metrics.likes + b.metrics.comments + (b.metrics.shares || 0);
      diff = engA - engB;
    } else if (sortField === 'impressions') {
      diff = (a.metrics.impressions || 0) - (b.metrics.impressions || 0);
    }
    return sortAsc ? diff : -diff;
  });

  const toggleSort = (field: 'published_at' | 'engagement' | 'impressions') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const renderPlatformIcon = (platform: PlatformType) => {
    switch (platform) {
      case 'linkedin':
        return (
          <svg className="w-3.5 h-3.5 fill-[#0A66C2] flex-shrink-0" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        );
      case 'x':
        return (
          <svg className="w-3 h-3 fill-neutral-900 flex-shrink-0" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-3.5 h-3.5 fill-[#E1306C] flex-shrink-0" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-3.5 h-3.5 fill-[#1877F2] flex-shrink-0" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div id="content-performance-section" className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
      
      {/* Table Header & Search Bar */}
      <div className="px-5 py-3.5 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-sm font-semibold text-neutral-900">Content Performance</h2>
          <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
            {sorted.length} {sorted.length === 1 ? 'post' : 'posts'}
          </span>
          {activeChannelFilter && (
            <button
              type="button"
              onClick={onClearChannelFilter}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <span>{activeChannelFilter === 'x' ? 'X' : activeChannelFilter}</span>
              <X className="w-3 h-3 text-neutral-500" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search posts or topics…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 rounded-lg border border-neutral-200 focus:outline-hidden focus:border-brand-500 w-52"
            />
          </div>
        </div>
      </div>

      {/* Table Canvas */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-medium">
              <th className="py-2.5 px-4">Content</th>
              <th className="py-2.5 px-3">Channel</th>
              <th className="py-2.5 px-3">Format</th>
              <th
                onClick={() => toggleSort('published_at')}
                className="py-2.5 px-3 cursor-pointer hover:text-neutral-900"
              >
                <div className="flex items-center gap-1">
                  Published <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th
                onClick={() => toggleSort('impressions')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-neutral-900"
              >
                <div className="flex items-center justify-end gap-1">
                  Impressions <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th className="py-2.5 px-3 text-right">Reach</th>
              <th className="py-2.5 px-3 text-right">Likes</th>
              <th className="py-2.5 px-3 text-right">Comments</th>
              <th
                onClick={() => toggleSort('engagement')}
                className="py-2.5 px-4 text-right cursor-pointer hover:text-neutral-900 font-semibold"
              >
                <div className="flex items-center justify-end gap-1">
                  ER % <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {sorted.map((post) => {
              const er = post.metrics.engagement_rate;
              const erBadgeClass =
                er && er >= 5.0
                  ? 'bg-emerald-50 text-emerald-700 font-bold border-emerald-200'
                  : er && er >= 2.5
                  ? 'bg-amber-50 text-amber-700 font-semibold border-amber-200'
                  : 'bg-neutral-50 text-neutral-600 border-neutral-200';

              return (
                <tr
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="hover:bg-neutral-50/80 cursor-pointer transition-colors group"
                >
                  {/* Content title */}
                  <td className="py-2.5 px-4 max-w-xs">
                    <div className="flex items-center gap-2.5">
                      {post.thumbnail_url && (
                        <img
                          src={post.thumbnail_url}
                          alt=""
                          className="w-7 h-7 rounded-md object-cover flex-shrink-0 border border-neutral-200"
                        />
                      )}
                      <div className="truncate">
                        <span className="font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors block truncate">
                          {post.title}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Channel */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 font-medium text-neutral-800 capitalize">
                      {renderPlatformIcon(post.platform)}
                      {post.platform === 'x' ? 'X' : post.platform}
                    </span>
                  </td>

                  {/* Format */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 text-neutral-600 capitalize">
                      {post.format}
                    </span>
                  </td>

                  {/* Published */}
                  <td className="py-2.5 px-3 whitespace-nowrap text-neutral-500 tabular-nums">
                    {new Date(post.published_at).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>

                  {/* Impressions */}
                  <td className="py-2.5 px-3 text-right tabular-nums text-neutral-800 font-medium">
                    {post.metrics.impressions ? post.metrics.impressions.toLocaleString() : '—'}
                  </td>

                  {/* Reach */}
                  <td className="py-2.5 px-3 text-right tabular-nums text-neutral-600">
                    {post.metrics.reach ? post.metrics.reach.toLocaleString() : '—'}
                  </td>

                  {/* Likes */}
                  <td className="py-2.5 px-3 text-right tabular-nums text-neutral-600">
                    {post.metrics.likes.toLocaleString()}
                  </td>

                  {/* Comments */}
                  <td className="py-2.5 px-3 text-right tabular-nums text-neutral-600">
                    {post.metrics.comments.toLocaleString()}
                  </td>

                  {/* ER % */}
                  <td className="py-2.5 px-4 text-right whitespace-nowrap tabular-nums">
                    {post.metrics.engagement_rate ? (
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[11px] border ${erBadgeClass}`}
                      >
                        {post.metrics.engagement_rate}%
                      </span>
                    ) : (
                      <span className="text-neutral-300">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Render Modal if a post is clicked */}
      {selectedPost && (
        <PostDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}

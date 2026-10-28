import React, { useState } from 'react';
import { PostItem, PlatformType } from '../types';
import { POSTS_DATA, ACTIVE_PLATFORMS } from '../data/mockData';
import { PostDetailModal } from './PostDetailModal';
import { 
  Search, 
  ArrowUpDown, 
  ChevronRight
} from 'lucide-react';

const PLATFORM_COLORS: Record<PlatformType, string> = {
  linkedin: '#0A66C2',
  x: '#000000',
  instagram: '#E1306C',
  facebook: '#1877F2',
  substack: '#FF6719',
  reddit: '#FF4500',
};

interface ContentPerformanceExplorerProps {
  selectedPlatforms: PlatformType[];
}

export function ContentPerformanceExplorer({ selectedPlatforms }: ContentPerformanceExplorerProps) {
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
    if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(post.platform)) {
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

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
      
      {/* Table Header & Search Bar */}
      <div className="px-5 py-3.5 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-neutral-900">Content Performance</h2>
          <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
            {sorted.length} {sorted.length === 1 ? 'post' : 'posts'}
          </span>
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
              <th className="py-2.5 px-3 text-center">Detail</th>
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
                  className="hover:bg-neutral-50/70 cursor-pointer transition-colors group"
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

                  {/* Platform */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 font-medium text-neutral-800 capitalize">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: PLATFORM_COLORS[post.platform] }}
                      />
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

                  {/* Inspect action */}
                  <td className="py-2.5 px-3 text-center">
                    <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-600 mx-auto transition-colors" />
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

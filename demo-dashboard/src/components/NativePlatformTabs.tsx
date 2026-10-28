import React, { useState, useEffect } from 'react';
import { PlatformType } from '../types';
import { ACTIVE_PLATFORMS } from '../data/mockData';
import { 
  Bookmark, 
  Share2, 
  Heart, 
  MessageSquare, 
  MousePointerClick, 
  UserCheck, 
  DollarSign, 
  Mail, 
  ArrowUpRight, 
  HelpCircle,
  Play
} from 'lucide-react';

const ALL_TABS: { id: PlatformType; label: string; badge: string; color: string }[] = [
  { id: 'linkedin', label: 'LinkedIn', badge: 'Creator Analytics', color: '#0A66C2' },
  { id: 'x', label: 'X (Twitter)', badge: 'Basic v2 ($100/mo)', color: '#000000' },
  { id: 'instagram', label: 'Instagram', badge: 'Professional Graph v26', color: '#E1306C' },
  { id: 'facebook', label: 'Facebook', badge: 'Page Insights', color: '#1877F2' },
];

interface NativePlatformTabsProps {
  selectedPlatforms?: PlatformType[];
}

export function NativePlatformTabs({ selectedPlatforms = ACTIVE_PLATFORMS }: NativePlatformTabsProps) {
  // Filter tabs strictly to the selected platforms
  const visibleTabs = ALL_TABS.filter((t) => selectedPlatforms.includes(t.id));

  const [activeTab, setActiveTab] = useState<PlatformType>(() => {
    return visibleTabs.length > 0 ? visibleTabs[0].id : 'linkedin';
  });

  // Ensure activeTab is always one of the visible platforms
  useEffect(() => {
    if (visibleTabs.length > 0 && !visibleTabs.some((t) => t.id === activeTab)) {
      setActiveTab(visibleTabs[0].id);
    }
  }, [visibleTabs, activeTab]);

  const effectiveTab = visibleTabs.length === 1 ? visibleTabs[0].id : activeTab;

  return (
    <div id="platform-telemetry" className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-neutral-900">Platform-Specific Native Telemetry</h2>
          <span className="text-[11px] font-medium text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-md">
            Direct API Feeds
          </span>
          {visibleTabs.length === 1 && (
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded-md text-white"
              style={{ backgroundColor: visibleTabs[0].color }}
            >
              {visibleTabs[0].label}
            </span>
          )}
        </div>
      </div>

      {/* Tabs navigation - CUT OFF completely when only 1 platform is selected */}
      {visibleTabs.length > 1 && (
        <div id="telemetry-tabs-container" className="flex items-center gap-1.5 border-b border-neutral-200 pb-2 overflow-x-auto">
          {visibleTabs.map((tab) => {
            const isActive = effectiveTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`telemetry-tab-${tab.id}`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: tab.color }}
                />
                {tab.label}
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                    isActive ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Tab Panels */}
      <div className="mt-4">
        {effectiveTab === 'linkedin' && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-3.5">
              <MetricCard label="Member Impressions" value="648,200" sub="memberCreatorPostAnalytics" highlight />
              <MetricCard label="Members Reached" value="382,900" sub="Unique verified professionals" icon={UserCheck} />
              <MetricCard label="Total Reactions" value="12,450" sub="Like, Celebrate, Support, Insight" icon={Heart} />
              <MetricCard label="Comment Threads" value="3,120" sub="Top-level + Nested replies" icon={MessageSquare} />
              <MetricCard label="Post Reshares" value="1,840" sub="Feed shares across networks" icon={Share2} />
              <MetricCard label="Post Saves" value="4,210" sub="High intentionality bookmarking" icon={Bookmark} highlight />
              <MetricCard label="Link Clicks" value="9,340" sub="Referral traffic outbound" icon={MousePointerClick} />
              <MetricCard label="Followers Attributed" value="+1,120" sub="New follows from content" icon={UserCheck} />
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
              <span>🔒 <strong>Community Management API:</strong> Live verified telemetry. Standard 60-day token rotation schedule active.</span>
              <span className="font-mono text-[11px] font-semibold">Tier 1 Provenance</span>
            </div>
          </div>
        )}

        {effectiveTab === 'x' && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-3.5">
              <MetricCard label="Gross Tweet Views" value="421,800" sub="non_public_metrics.impression_count" />
              <MetricCard label="Retweets / Reposts" value="3,420" sub="organic_metrics.retweet_count" icon={Share2} />
              <MetricCard label="Tweet Replies" value="1,890" sub="organic_metrics.reply_count" icon={MessageSquare} />
              <MetricCard label="Tweet Likes" value="8,920" sub="organic_metrics.like_count" icon={Heart} />
              <MetricCard label="Bookmarks / Saves" value="2,140" sub="organic_metrics.bookmark_count" icon={Bookmark} />
              <MetricCard label="URL Link Clicks" value="4,810" sub="organic_metrics.url_link_clicks" icon={MousePointerClick} />
              <MetricCard label="Monthly Quota Used" value="9,420 / 10k" sub="Basic tier 10,000 monthly cap" alert />
              <MetricCard label="Unique Reach Metric" value="—" sub="Not provided by X API v2" alert />
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
              <span>⚠️ <strong>X Basic API ($100/mo):</strong> 94% of 10,000 monthly read limit consumed. Throttling active on secondary polls.</span>
              <span className="font-mono text-[11px] font-semibold">Rate Limited</span>
            </div>
          </div>
        )}

        {effectiveTab === 'instagram' && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-3.5">
              <MetricCard label="Accounts Reached" value="284,000" sub="insights/reach (Professional)" icon={UserCheck} highlight />
              <MetricCard label="Total Impressions" value="512,000" sub="insights/impressions" />
              <MetricCard label="Likes & Hearts" value="18,920" sub="like_count" icon={Heart} />
              <MetricCard label="Comments Received" value="2,840" sub="comments_count" icon={MessageSquare} />
              <MetricCard label="Post Saves" value="6,890" sub="insights/saved" icon={Bookmark} highlight />
              <MetricCard label="Direct Shares" value="4,120" sub="insights/shares" icon={Share2} />
              <MetricCard label="Profile Visits" value="3,210" sub="insights/profile_visits" icon={MousePointerClick} />
              <MetricCard label="Reels Plays" value="89,400" sub="insights/plays" icon={Play} />
            </div>
            <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-xs text-rose-900 flex items-center justify-between">
              <span>📸 <strong>Meta Graph API v26.0:</strong> Native reach and saved posts telemetry verified for Instagram Professional account.</span>
              <span className="font-mono text-[11px] font-semibold">Direct Graph Ingestion</span>
            </div>
          </div>
        )}

        {effectiveTab === 'facebook' && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-3.5">
              <MetricCard label="Page Post Reach" value="312,400" sub="post_impressions_unique" icon={UserCheck} highlight />
              <MetricCard label="Gross Impressions" value="489,100" sub="post_impressions" />
              <MetricCard label="Page Engaged Users" value="24,900" sub="post_engaged_users" icon={Heart} />
              <MetricCard label="Post Reactions" value="14,100" sub="Like, Love, Wow, Care" />
              <MetricCard label="Post Comments" value="2,140" sub="Total thread comments" icon={MessageSquare} />
              <MetricCard label="Post Shares" value="2,890" sub="Timeline and group shares" icon={Share2} />
              <MetricCard label="Link Clicks" value="7,420" sub="post_clicks" icon={MousePointerClick} />
              <MetricCard label="Negative Feedback" value="12" sub="Hides / Unfollows (Extremely Low)" />
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200 text-xs text-indigo-900 flex items-center justify-between">
              <span>📘 <strong>Facebook Page API:</strong> Long-lived Page Access Token active. Real-time webhooks delivering comment streams.</span>
              <span className="font-mono text-[11px] font-semibold">Long-Lived Ingestion</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
  icon: Icon,
  highlight,
  alert,
}: {
  label: string;
  value: string;
  sub: string;
  icon?: React.ElementType;
  highlight?: boolean;
  alert?: boolean;
}) {
  return (
    <div
      className={`p-3 rounded-xl border transition-all ${
        alert
          ? 'bg-rose-50/50 border-rose-200'
          : highlight
          ? 'bg-emerald-50/50 border-emerald-200'
          : 'bg-neutral-50/70 border-neutral-200 hover:border-neutral-300'
      }`}
    >
      <div className="flex items-center justify-between text-neutral-500 mb-1">
        <span className="text-[11px] font-medium leading-tight">{label}</span>
        {Icon && <Icon className="w-3.5 h-3.5 text-neutral-400" />}
      </div>
      <div className="text-lg font-bold text-neutral-900 tabular-nums tracking-tight">{value}</div>
      <div className="text-[10px] text-neutral-400 mt-1 truncate">{sub}</div>
    </div>
  );
}

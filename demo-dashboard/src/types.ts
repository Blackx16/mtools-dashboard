export type PlatformType = 'linkedin' | 'x' | 'instagram' | 'facebook' | 'substack' | 'reddit';

export type ConnectionStatus =
  | 'connected'
  | 'connecting'
  | 'expiring'
  | 'needs_reauth'
  | 'rate_limited'
  | 'not_connected'
  | 'error';

export interface BrandConnection {
  platform: PlatformType;
  status: ConnectionStatus;
  account_name: string;
  account_id: string;
  avatar_url?: string;
  last_synced_at?: string;
  token_expires_at?: string;
  rate_limit_reset?: string;
  error_detail?: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  color: string;
  connections: BrandConnection[];
}

export type ContentPurpose = 'visibility' | 'credibility' | 'lead_gen';
export type PaymentType = 'organic' | 'paid';
export type ContentFormat = 'text' | 'image' | 'carousel' | 'video' | 'newsletter';
export type MetricProvenance = 'platform_direct' | 'calculated' | 'manual_import' | 'ai_inferred';

export interface PostMetrics {
  impressions: number | null; // null if platform doesn't provide (e.g. Reddit)
  reach: number | null; // null if platform doesn't provide (e.g. X, Reddit)
  views: number | null;
  likes: number; // likes / net score / reactions
  comments: number;
  shares: number | null; // shares / retweets / reshares
  saves: number | null; // bookmarks / saves (null for FB, Substack, Reddit)
  clicks: number | null; // link clicks
  engagement_rate: number | null; // derived
  extended?: Record<string, any>; // platform specific (e.g. upvote_ratio, open_rate)
}

export interface PostItem {
  id: string;
  brand_id: string;
  brand_name: string;
  title: string;
  body: string;
  platform: PlatformType;
  format: ContentFormat;
  purpose: ContentPurpose;
  payment: PaymentType;
  published_at: string;
  canonical_url: string;
  thumbnail_url?: string;
  provenance: MetricProvenance;
  metrics: PostMetrics;
  velocity_72h: { hour: number; cumulative_engagement: number }[];
  comments_sample?: { author: string; text: string; sentiment: 'positive' | 'neutral' | 'question' }[];
}

export interface HeroKPIs {
  gross_impressions: { value: number; change: number; excluded: string[] };
  unique_reach: { value: number; change: number; excluded: string[] };
  total_engagements: { value: number; change: number };
  blended_engagement_rate: { value: number; change: number };
  publication_velocity: { published: number; scheduled: number };
  audience_growth: { total: number; net_change: number };
}

export interface TimeSeriesDataPoint {
  date: string;
  impressions: number;
  engagements: number;
  rate: number;
  by_platform: Record<PlatformType, number>;
}

export interface AIInsight {
  id: string;
  type: 'opportunity' | 'anomaly' | 'guidance';
  headline: string;
  observation: string;
  recommendation: string;
  confidence: 'high' | 'medium';
  impact_metric: string;
}

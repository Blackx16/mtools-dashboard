import { Brand, PostItem, HeroKPIs, MarketerHeroKPIs, ChannelPerformanceRow, TimeSeriesDataPoint, AIInsight, PlatformType } from '../types';

export const ACTIVE_PLATFORMS: PlatformType[] = ['linkedin', 'x', 'instagram', 'facebook'];
export const ALPHA_PLATFORMS: PlatformType[] = ['substack', 'reddit'];
export const isPlatformActive = (p: PlatformType): boolean => ACTIVE_PLATFORMS.includes(p);

export const BRANDS: Brand[] = [
  {
    id: '88177210-3131-4bb8-b639-1147ea497c74',
    slug: 'a4g',
    name: 'A4G (Action for Growth)',
    tagline: 'Building the grassroots movement — one story at a time',
    color: '#1B3A6B',
    connections: [
      {
        platform: 'linkedin',
        status: 'connected',
        account_name: 'A4G Foundation',
        account_id: 'urn:li:organization:1029384',
        last_synced_at: '2026-10-26T11:45:00Z',
        token_expires_at: '2026-12-15T00:00:00Z',
      },
      {
        platform: 'x',
        status: 'rate_limited',
        account_name: '@A4G_Initiative',
        account_id: '16839201948',
        last_synced_at: '2026-10-26T10:00:00Z',
        rate_limit_reset: '2026-10-26T13:00:00Z',
        error_detail: 'Monthly read quota at 9,420 / 10,000 tweets. Cooldown active.',
      },
      {
        platform: 'instagram',
        status: 'connected',
        account_name: '@a4g_growth',
        account_id: 'ig_178414002938',
        last_synced_at: '2026-10-26T12:10:00Z',
        token_expires_at: '2026-11-20T00:00:00Z',
      },
      {
        platform: 'facebook',
        status: 'connected',
        account_name: 'A4G Official Page',
        account_id: 'page_992837461',
        last_synced_at: '2026-10-26T12:05:00Z',
        token_expires_at: 'Never (Long-Lived Page Token)',
      },
      {
        platform: 'substack',
        status: 'connected',
        account_name: 'A4G Dispatch (a4g.substack.com)',
        account_id: 'sub_a4g_dispatch',
        last_synced_at: '2026-10-25T18:30:00Z',
        error_detail: 'RSS automated sync live; Last CSV uploaded 2 days ago.',
      },
      {
        platform: 'reddit',
        status: 'connecting',
        account_name: 'u/A4G_Community',
        account_id: 't2_938k2l',
        last_synced_at: undefined,
        error_detail: 'Runner waiting patiently for authorization callback…',
      },
    ],
  },
  {
    id: 'b1274819-4829-4112-990a-1147ea497c01',
    slug: 'a4g-intelex',
    name: 'A4G Intelex',
    tagline: 'Research, policy intelligence, and sustainable innovation briefs',
    color: '#0D9488',
    connections: [
      {
        platform: 'linkedin',
        status: 'connected',
        account_name: 'A4G Intelex Research',
        account_id: 'urn:li:organization:998124',
        last_synced_at: '2026-10-26T09:15:00Z',
      },
      {
        platform: 'x',
        status: 'connected',
        account_name: '@IntelexPolicy',
        account_id: '201948271',
        last_synced_at: '2026-10-26T11:00:00Z',
      },
      {
        platform: 'substack',
        status: 'expiring',
        account_name: 'The Intelex Review',
        account_id: 'sub_intelex_review',
        last_synced_at: '2026-10-24T14:00:00Z',
        error_detail: 'CSV data is older than 7 days. Drop updated export.',
      },
      {
        platform: 'instagram',
        status: 'not_connected',
        account_name: 'Not connected',
        account_id: '',
      },
      {
        platform: 'facebook',
        status: 'not_connected',
        account_name: 'Not connected',
        account_id: '',
      },
      {
        platform: 'reddit',
        status: 'needs_reauth',
        account_name: 'u/IntelexPolicy',
        account_id: 't2_5548aa',
        last_synced_at: '2026-10-20T08:00:00Z',
        error_detail: 'OAuth token expired. Re-authentication required.',
      },
    ],
  },
  {
    id: 'c8812749-3321-4192-881a-2299fa481b99',
    slug: 'gmfer',
    name: 'GMFER',
    tagline: 'Global Movement for Farmer Empowerment and Rural Resilience',
    color: '#E8A838',
    connections: [
      {
        platform: 'linkedin',
        status: 'connected',
        account_name: 'GMFER Alliance',
        account_id: 'urn:li:organization:449120',
        last_synced_at: '2026-10-26T10:30:00Z',
      },
      {
        platform: 'x',
        status: 'connected',
        account_name: '@GMFER_Global',
        account_id: '88127491',
        last_synced_at: '2026-10-26T10:45:00Z',
      },
      {
        platform: 'facebook',
        status: 'connected',
        account_name: 'GMFER Community',
        account_id: 'page_481920',
        last_synced_at: '2026-10-26T11:00:00Z',
      },
      {
        platform: 'instagram',
        status: 'connected',
        account_name: '@gmfer_stories',
        account_id: 'ig_991823',
        last_synced_at: '2026-10-26T11:05:00Z',
      },
      {
        platform: 'substack',
        status: 'not_connected',
        account_name: 'Not connected',
        account_id: '',
      },
      {
        platform: 'reddit',
        status: 'not_connected',
        account_name: 'Not connected',
        account_id: '',
      },
    ],
  },
  {
    id: 'd9918234-5512-4881-772b-3388ca112c33',
    slug: 'muralidhar',
    name: 'Muralidhar Heritage',
    tagline: 'Preserving civilizational wisdom, regenerative art & grassroots culture',
    color: '#7C3AED',
    connections: [
      {
        platform: 'linkedin',
        status: 'connected',
        account_name: 'Muralidhar Foundation',
        account_id: 'urn:li:organization:771239',
        last_synced_at: '2026-10-26T08:00:00Z',
      },
      {
        platform: 'instagram',
        status: 'connected',
        account_name: '@muralidhar_heritage',
        account_id: 'ig_441290',
        last_synced_at: '2026-10-26T12:00:00Z',
      },
      {
        platform: 'x',
        status: 'connected',
        account_name: '@MuralidharVichaar',
        account_id: '9912830',
        last_synced_at: '2026-10-26T11:15:00Z',
      },
      {
        platform: 'facebook',
        status: 'connected',
        account_name: 'Muralidhar Cultural Space',
        account_id: 'page_102938',
        last_synced_at: '2026-10-26T11:30:00Z',
      },
      {
        platform: 'substack',
        status: 'connected',
        account_name: 'The Muralidhar Scroll',
        account_id: 'sub_muralidhar',
        last_synced_at: '2026-10-25T16:00:00Z',
      },
      {
        platform: 'reddit',
        status: 'connected',
        account_name: 'u/Muralidhar_Archives',
        account_id: 't2_88192a',
        last_synced_at: '2026-10-26T07:30:00Z',
      },
    ],
  },
];

export const HERO_KPIS: HeroKPIs = {
  gross_impressions: {
    value: 184520,
    change: 14.8,
    excluded: ['Reddit (REST API does not track views)', 'Substack (RSS-only mode)'],
  },
  unique_reach: {
    value: 121400,
    change: 9.3,
    excluded: ['X / Twitter (reports gross views only)', 'Reddit', 'Substack'],
  },
  total_engagements: {
    value: 16840,
    change: 22.4,
  },
  blended_engagement_rate: {
    value: 4.86,
    change: 0.62,
  },
  publication_velocity: {
    published: 38,
    scheduled: 12,
  },
  audience_growth: {
    total: 28410,
    net_change: 685,
  },
};

export interface PlatformKPIContribution {
  gross_impressions: number;
  unique_reach: number | null;
  total_engagements: number;
  publication_velocity: { published: number; scheduled: number };
  audience_growth: { total: number; net_change: number };
}

export const PLATFORM_KPIS: Record<PlatformType, PlatformKPIContribution> = {
  linkedin: {
    gross_impressions: 68200,
    unique_reach: 48500,
    total_engagements: 6450,
    publication_velocity: { published: 14, scheduled: 4 },
    audience_growth: { total: 10800, net_change: 280 },
  },
  x: {
    gross_impressions: 45100,
    unique_reach: null,
    total_engagements: 3240,
    publication_velocity: { published: 12, scheduled: 3 },
    audience_growth: { total: 7420, net_change: 145 },
  },
  instagram: {
    gross_impressions: 42320,
    unique_reach: 41200,
    total_engagements: 4520,
    publication_velocity: { published: 8, scheduled: 3 },
    audience_growth: { total: 6240, net_change: 160 },
  },
  facebook: {
    gross_impressions: 28900,
    unique_reach: 31700,
    total_engagements: 2630,
    publication_velocity: { published: 4, scheduled: 2 },
    audience_growth: { total: 3950, net_change: 100 },
  },
  substack: {
    gross_impressions: 0,
    unique_reach: null,
    total_engagements: 0,
    publication_velocity: { published: 0, scheduled: 0 },
    audience_growth: { total: 0, net_change: 0 },
  },
  reddit: {
    gross_impressions: 0,
    unique_reach: null,
    total_engagements: 0,
    publication_velocity: { published: 0, scheduled: 0 },
    audience_growth: { total: 0, net_change: 0 },
  },
};

export function computeDynamicHeroKPIs(selectedPlatforms: PlatformType[]): HeroKPIs {
  const activePlats = selectedPlatforms.filter((p) => ACTIVE_PLATFORMS.includes(p));
  const effective = activePlats.length > 0 ? activePlats : ACTIVE_PLATFORMS;

  let totalImpressions = 0;
  let totalReach = 0;
  let totalEngagements = 0;
  let published = 0;
  let scheduled = 0;
  let audienceTotal = 0;
  let audienceNet = 0;
  let reachExclusions: string[] = [];

  effective.forEach((p) => {
    const kpi = PLATFORM_KPIS[p];
    if (kpi) {
      totalImpressions += kpi.gross_impressions;
      if (kpi.unique_reach !== null) {
        totalReach += kpi.unique_reach;
      }
      totalEngagements += kpi.total_engagements;
      published += kpi.publication_velocity.published;
      scheduled += kpi.publication_velocity.scheduled;
      audienceTotal += kpi.audience_growth.total;
      audienceNet += kpi.audience_growth.net_change;
    }
  });

  if (effective.includes('x')) {
    reachExclusions.push('X / Twitter (reports gross views only)');
  }
  reachExclusions.push('Reddit', 'Substack');

  const blendedER =
    totalImpressions > 0
      ? parseFloat(((totalEngagements / totalImpressions) * 100 * 0.5325).toFixed(2))
      : 0;

  return {
    gross_impressions: {
      value: totalImpressions,
      change: 14.8,
      excluded: ['Reddit (REST API does not track views)', 'Substack (RSS-only mode)'],
    },
    unique_reach: {
      value: totalReach,
      change: 9.3,
      excluded: reachExclusions,
    },
    total_engagements: {
      value: totalEngagements,
      change: 22.4,
    },
    blended_engagement_rate: {
      value: blendedER,
      change: 0.62,
    },
    publication_velocity: {
      published,
      scheduled,
    },
    audience_growth: {
      total: audienceTotal,
      net_change: audienceNet,
    },
  };
}

export function computeMarketerHeroKPIs(selectedPlatforms: PlatformType[]): MarketerHeroKPIs {
  const activePlats = selectedPlatforms.filter((p) => ACTIVE_PLATFORMS.includes(p));
  const effective = activePlats.length > 0 ? activePlats : ACTIVE_PLATFORMS;

  let totalReach = 0;
  let totalEngagements = 0;
  let totalImpressions = 0;
  let audienceNet = 0;

  effective.forEach((p) => {
    const kpi = PLATFORM_KPIS[p];
    if (kpi) {
      totalImpressions += kpi.gross_impressions;
      if (kpi.unique_reach !== null) {
        totalReach += kpi.unique_reach;
      }
      totalEngagements += kpi.total_engagements;
      audienceNet += kpi.audience_growth.net_change;
    }
  });

  const blendedER =
    totalImpressions > 0
      ? parseFloat(((totalEngagements / totalImpressions) * 100 * 0.5325).toFixed(2))
      : 0;

  return {
    reach: { value: totalReach, change: 8.7 },
    engagements: { value: totalEngagements, change: 22.4 },
    engagement_rate: { value: blendedER, change: 0.8 },
    followers_gained: { value: audienceNet, change: 12.5 },
  };
}

export function computeChannelPerformanceTable(selectedPlatforms: PlatformType[]): ChannelPerformanceRow[] {
  const channelMeta: Record<PlatformType, { name: string }> = {
    linkedin: { name: 'LinkedIn' },
    x: { name: 'X' },
    instagram: { name: 'Instagram' },
    facebook: { name: 'Facebook' },
    substack: { name: 'Substack' },
    reddit: { name: 'Reddit' },
  };

  const activePlats = selectedPlatforms.filter((p) => ACTIVE_PLATFORMS.includes(p));
  const effective = activePlats.length > 0 ? activePlats : ACTIVE_PLATFORMS;

  return effective.map((platform) => {
    const kpi = PLATFORM_KPIS[platform];
    const er =
      kpi.gross_impressions > 0
        ? parseFloat(((kpi.total_engagements / kpi.gross_impressions) * 100).toFixed(2))
        : 0;
    return {
      platform,
      name: channelMeta[platform].name,
      impressions: kpi.gross_impressions,
      reach: kpi.unique_reach,
      engagements: kpi.total_engagements,
      engagement_rate: er,
      followers: kpi.audience_growth.net_change,
    };
  });
}

export function computeDynamicTimeSeries(selectedPlatforms: PlatformType[]): TimeSeriesDataPoint[] {
  const activePlats = selectedPlatforms.filter((p) => ACTIVE_PLATFORMS.includes(p));
  if (activePlats.length === 0 || activePlats.length === ACTIVE_PLATFORMS.length) {
    return TIME_SERIES_DATA;
  }
  return TIME_SERIES_DATA.map((pt) => {
    let filteredImpressions = 0;
    activePlats.forEach((p) => {
      filteredImpressions += pt.by_platform[p] || 0;
    });
    const ratio = pt.impressions > 0 ? filteredImpressions / pt.impressions : 0;
    const filteredEngagements = Math.round(pt.engagements * ratio);
    const filteredReach = Math.round((pt.reach ?? Math.round(pt.impressions * 0.68)) * ratio);
    const rate =
      filteredImpressions > 0
        ? parseFloat(((filteredEngagements / filteredImpressions) * 100).toFixed(1))
        : 0;
    const prevImpressions = Math.round(filteredImpressions * 0.86);
    const prevEngagements = Math.round(filteredEngagements * 0.82);
    const prevReach = Math.round(filteredReach * 0.88);
    const prevRate = parseFloat((rate * 0.94).toFixed(1));

    return {
      ...pt,
      impressions: filteredImpressions,
      engagements: filteredEngagements,
      reach: filteredReach,
      rate,
      prev_impressions: prevImpressions,
      prev_engagements: prevEngagements,
      prev_reach: prevReach,
      prev_rate: prevRate,
    };
  });
}

export const TIME_SERIES_DATA: TimeSeriesDataPoint[] = [
  { date: 'Oct 01', impressions: 4200, engagements: 340, reach: 2850, rate: 4.6, prev_impressions: 3600, prev_engagements: 280, prev_reach: 2500, prev_rate: 4.3, by_platform: { linkedin: 1800, x: 1200, instagram: 700, facebook: 500, substack: 0, reddit: 0 } },
  { date: 'Oct 03', impressions: 5100, engagements: 410, reach: 3450, rate: 4.8, prev_impressions: 4300, prev_engagements: 335, prev_reach: 3000, prev_rate: 4.5, by_platform: { linkedin: 2200, x: 1400, instagram: 900, facebook: 600, substack: 0, reddit: 0 } },
  { date: 'Oct 05', impressions: 6800, engagements: 590, reach: 4600, rate: 5.2, prev_impressions: 5800, prev_engagements: 480, prev_reach: 4000, prev_rate: 4.8, by_platform: { linkedin: 3100, x: 1600, instagram: 1200, facebook: 900, substack: 0, reddit: 0 } },
  { date: 'Oct 07', impressions: 4900, engagements: 380, reach: 3300, rate: 4.5, prev_impressions: 4200, prev_engagements: 310, prev_reach: 2900, prev_rate: 4.2, by_platform: { linkedin: 2000, x: 1500, instagram: 800, facebook: 600, substack: 0, reddit: 0 } },
  { date: 'Oct 09', impressions: 7400, engagements: 680, reach: 5000, rate: 5.4, prev_impressions: 6300, prev_engagements: 550, prev_reach: 4400, prev_rate: 5.0, by_platform: { linkedin: 3400, x: 1900, instagram: 1300, facebook: 800, substack: 0, reddit: 0 } },
  { date: 'Oct 11', impressions: 8900, engagements: 810, reach: 6050, rate: 5.6, prev_impressions: 7600, prev_engagements: 660, prev_reach: 5300, prev_rate: 5.2, by_platform: { linkedin: 4100, x: 2100, instagram: 1600, facebook: 1100, substack: 0, reddit: 0 } },
  { date: 'Oct 13', impressions: 6200, engagements: 490, reach: 4200, rate: 4.7, prev_impressions: 5300, prev_engagements: 400, prev_reach: 3700, prev_rate: 4.4, by_platform: { linkedin: 2800, x: 1700, instagram: 1000, facebook: 700, substack: 0, reddit: 0 } },
  { date: 'Oct 15', impressions: 9800, engagements: 920, reach: 6650, rate: 5.8, prev_impressions: 8400, prev_engagements: 750, prev_reach: 5800, prev_rate: 5.4, by_platform: { linkedin: 4500, x: 2400, instagram: 1800, facebook: 1100, substack: 0, reddit: 0 } },
  { date: 'Oct 17', impressions: 7100, engagements: 560, reach: 4800, rate: 4.9, prev_impressions: 6100, prev_engagements: 460, prev_reach: 4200, prev_rate: 4.6, by_platform: { linkedin: 3200, x: 1800, instagram: 1200, facebook: 900, substack: 0, reddit: 0 } },
  { date: 'Oct 19', impressions: 8400, engagements: 730, reach: 5700, rate: 5.1, prev_impressions: 7200, prev_engagements: 600, prev_reach: 5000, prev_rate: 4.8, by_platform: { linkedin: 3800, x: 2100, instagram: 1500, facebook: 1000, substack: 0, reddit: 0 } },
  { date: 'Oct 21', impressions: 11200, engagements: 1050, reach: 7600, rate: 6.1, prev_impressions: 9600, prev_engagements: 860, prev_reach: 6700, prev_rate: 5.7, by_platform: { linkedin: 5200, x: 2700, instagram: 2100, facebook: 1200, substack: 0, reddit: 0 } },
  { date: 'Oct 23', impressions: 9600, engagements: 860, reach: 6500, rate: 5.4, prev_impressions: 8250, prev_engagements: 700, prev_reach: 5700, prev_rate: 5.0, by_platform: { linkedin: 4400, x: 2300, instagram: 1700, facebook: 1200, substack: 0, reddit: 0 } },
  { date: 'Oct 25', impressions: 12400, engagements: 1180, reach: 8400, rate: 6.3, prev_impressions: 10600, prev_engagements: 970, prev_reach: 7400, prev_rate: 5.9, by_platform: { linkedin: 5800, x: 2900, instagram: 2300, facebook: 1400, substack: 0, reddit: 0 } },
  { date: 'Oct 26', impressions: 10800, engagements: 990, reach: 7350, rate: 5.7, prev_impressions: 9300, prev_engagements: 810, prev_reach: 6450, prev_rate: 5.3, by_platform: { linkedin: 4900, x: 2600, instagram: 2000, facebook: 1300, substack: 0, reddit: 0 } },
];

export const VELOCITY_72H_CURVE = [
  { hour: 0, topPost: 15, avgPost: 5, carouselPost: 22 },
  { hour: 2, topPost: 85, avgPost: 28, carouselPost: 110 },
  { hour: 4, topPost: 220, avgPost: 64, carouselPost: 290 },
  { hour: 8, topPost: 480, avgPost: 130, carouselPost: 640 },
  { hour: 12, topPost: 740, avgPost: 195, carouselPost: 980 },
  { hour: 24, topPost: 1250, avgPost: 310, carouselPost: 1620 },
  { hour: 36, topPost: 1580, avgPost: 380, carouselPost: 1980 },
  { hour: 48, topPost: 1820, avgPost: 420, carouselPost: 2250 },
  { hour: 72, topPost: 2090, avgPost: 460, carouselPost: 2540 },
];

export const POSTS_DATA: PostItem[] = [
  {
    id: 'post-001',
    brand_id: '88177210-3131-4bb8-b639-1147ea497c74',
    brand_name: 'A4G',
    title: 'The Flow of Four: Why Modern Agrarian Movements Need Inclusive Leadership',
    body: "Grassroots mobilization isn't built on slogans; it's grounded in shared purpose. Here are the 4 institutional pillars every sustainable initiative must anchor in...",
    platform: 'linkedin',
    format: 'carousel',
    purpose: 'credibility',
    payment: 'organic',
    published_at: '2026-10-24T14:30:00Z',
    canonical_url: 'https://linkedin.com/feed/update/urn:li:activity:72518290192',
    thumbnail_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80',
    provenance: 'platform_direct',
    metrics: {
      impressions: 16420,
      reach: 12850,
      views: null,
      likes: 482,
      comments: 64,
      shares: 91,
      saves: 148,
      clicks: 312,
      engagement_rate: 6.61,
      extended: {
        followers_gained: 28,
        profile_views_driven: 84,
      },
    },
    velocity_72h: [
      { hour: 0, cumulative_engagement: 22 },
      { hour: 4, cumulative_engagement: 185 },
      { hour: 12, cumulative_engagement: 490 },
      { hour: 24, cumulative_engagement: 820 },
      { hour: 48, cumulative_engagement: 1040 },
      { hour: 72, cumulative_engagement: 1147 },
    ],
    comments_sample: [
      { author: 'Vikram Joshi (Agri-Policy lead)', text: 'Pillar 3 on decentralized dispute resolution is spot-on. We observed this exact friction in Bundelkhand.', sentiment: 'positive' },
      { author: 'Meera Deshmukh', text: 'How do you recommend bridging the digital divide for smallholder farmers?', sentiment: 'question' },
    ],
  },
  {
    id: 'post-002',
    brand_id: '88177210-3131-4bb8-b639-1147ea497c74',
    brand_name: 'A4G',
    title: 'Groundwater depletion rates in northern agricultural belts hit 12-year anomaly',
    body: 'New satellite telemetry reveals alarming drops across 14 districts. Without regenerative recharge basins, summer crop rotations face severe stress. Thread 🧵👇',
    platform: 'x',
    format: 'text',
    purpose: 'visibility',
    payment: 'organic',
    published_at: '2026-10-25T08:15:00Z',
    canonical_url: 'https://x.com/A4G_Initiative/status/189201928471',
    provenance: 'platform_direct',
    metrics: {
      impressions: 24800,
      reach: null, // X DOES NOT report unique reach
      views: 24800,
      likes: 890,
      comments: 112,
      shares: 340, // retweets + quotes
      saves: 215, // bookmarks
      clicks: 540,
      engagement_rate: 6.27,
      extended: {
        retweets: 280,
        quotes: 60,
        bookmarks: 215,
        url_clicks: 540,
      },
    },
    velocity_72h: [
      { hour: 0, cumulative_engagement: 45 },
      { hour: 4, cumulative_engagement: 410 },
      { hour: 12, cumulative_engagement: 980 },
      { hour: 24, cumulative_engagement: 1680 },
      { hour: 48, cumulative_engagement: 1950 },
      { hour: 72, cumulative_engagement: 2097 },
    ],
    comments_sample: [
      { author: '@AgriTech_Now', text: 'Has anyone factored in micro-drip subsidies in Punjab for this dataset?', sentiment: 'question' },
      { author: '@SanjayEco', text: 'Invaluable chart. Retweeted to our irrigation working group.', sentiment: 'positive' },
    ],
  },
  {
    id: 'post-003',
    brand_id: '88177210-3131-4bb8-b639-1147ea497c74',
    brand_name: 'A4G',
    title: 'Reels: Inside the Community Seed Bank of Dungarpur',
    body: 'Preserving 84 heirloom millet varieties with indigenous women seed-keepers. Watch how seed sovereignty protects against erratic monsoon patterns.',
    platform: 'instagram',
    format: 'video',
    purpose: 'visibility',
    payment: 'organic',
    published_at: '2026-10-23T16:00:00Z',
    canonical_url: 'https://instagram.com/reel/DC9192kxa/',
    thumbnail_url: 'https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=300&q=80',
    provenance: 'platform_direct',
    metrics: {
      impressions: 38200,
      reach: 29400,
      views: 34100, // plays
      likes: 1840,
      comments: 98,
      shares: 420,
      saves: 380,
      clicks: 145, // bio link clicks
      engagement_rate: 7.15,
      extended: {
        reels_plays: 34100,
        bio_link_clicks: 145,
      },
    },
    velocity_72h: [
      { hour: 0, cumulative_engagement: 80 },
      { hour: 4, cumulative_engagement: 620 },
      { hour: 12, cumulative_engagement: 1400 },
      { hour: 24, cumulative_engagement: 2200 },
      { hour: 48, cumulative_engagement: 2650 },
      { hour: 72, cumulative_engagement: 2883 },
    ],
  },
  {
    id: 'post-004',
    brand_id: '88177210-3131-4bb8-b639-1147ea497c74',
    brand_name: 'A4G',
    title: 'A4G Dispatch #28: Regenerative Bio-fertilizers vs Chemical Input Price Volatility',
    body: 'In this monthly edition, we analyze farm-gate profitability margins across 3,000 farmers transitioning to fermented cow-dung slurries (Jeevamrut). Read full issue...',
    platform: 'substack',
    format: 'newsletter',
    purpose: 'lead_gen',
    payment: 'organic',
    published_at: '2026-10-22T06:00:00Z',
    canonical_url: 'https://a4g.substack.com/p/regenerative-bio-fertilizers-28',
    provenance: 'manual_import', // Combined RSS & CSV
    metrics: {
      impressions: null, // Substack doesn't have open web impression count on API
      reach: null,
      views: 4800, // web views from CSV
      likes: 184,
      comments: 32,
      shares: null,
      saves: null,
      clicks: 290,
      engagement_rate: 4.5,
      extended: {
        delivered_emails: 3850,
        open_rate: 0.442, // 44.2%
        click_through_rate: 0.075, // 7.5%
        active_subscribers: 4120,
        paid_subscribers: 280,
        annualized_revenue_inr: 840000,
      },
    },
    velocity_72h: [
      { hour: 0, cumulative_engagement: 110 },
      { hour: 4, cumulative_engagement: 280 },
      { hour: 12, cumulative_engagement: 390 },
      { hour: 24, cumulative_engagement: 450 },
      { hour: 48, cumulative_engagement: 490 },
      { hour: 72, cumulative_engagement: 506 },
    ],
  },
  {
    id: 'post-005',
    brand_id: '88177210-3131-4bb8-b639-1147ea497c74',
    brand_name: 'A4G',
    title: 'Discussion: Why do FPO aggregation models collapse after donor funding dries up?',
    body: "We've reviewed 120 Farmer Producer Organizations formed between 2019-2024. 64% cease active trading within 18 months of project exit. Here is what we found...",
    platform: 'reddit',
    format: 'text',
    purpose: 'credibility',
    payment: 'organic',
    published_at: '2026-10-21T17:20:00Z',
    canonical_url: 'https://reddit.com/r/agriculture/comments/1gk8291/why_do_fpo_models_collapse/',
    provenance: 'platform_direct',
    metrics: {
      impressions: null, // REDDIT REST API DOES NOT EXPOSE IMPRESSIONS
      reach: null,
      views: null,
      likes: 342, // Net karma score
      comments: 188,
      shares: null,
      saves: null,
      clicks: null,
      engagement_rate: null, // Undefined without impressions/reach denominator
      extended: {
        upvote_ratio: 0.94, // 94% upvoted
        net_score: 342,
        estimated_gross_upvotes: 382,
        comment_replies: 188,
      },
    },
    velocity_72h: [
      { hour: 0, cumulative_engagement: 18 },
      { hour: 4, cumulative_engagement: 140 },
      { hour: 12, cumulative_engagement: 320 },
      { hour: 24, cumulative_engagement: 480 },
      { hour: 48, cumulative_engagement: 520 },
      { hour: 72, cumulative_engagement: 530 },
    ],
    comments_sample: [
      { author: 'u/RuralDevConsultant', text: 'Working capital financing is the silent killer. Banks refuse cash credit limits without real estate collateral.', sentiment: 'positive' },
      { author: 'u/Agronomist_99', text: 'Did you evaluate dairy cooperatives vs grain FPOs in Maharashtra?', sentiment: 'question' },
    ],
  },
  {
    id: 'post-006',
    brand_id: '88177210-3131-4bb8-b639-1147ea497c74',
    brand_name: 'A4G',
    title: 'Field Update: Direct Seeded Rice (DSR) demonstration plots harvest yields',
    body: 'Zero-tillage DSR delivered parity yields with 32% lower diesel and labor consumption in Kota district trials. Photographic evidence and soil moisture data attached.',
    platform: 'facebook',
    format: 'image',
    purpose: 'visibility',
    payment: 'paid',
    published_at: '2026-10-20T11:00:00Z',
    canonical_url: 'https://facebook.com/A4GOfficial/posts/1029381029',
    thumbnail_url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=300&q=80',
    provenance: 'platform_direct',
    metrics: {
      impressions: 42100,
      reach: 34800,
      views: null,
      likes: 1240, // Reactions summary
      comments: 142,
      shares: 310,
      saves: null,
      clicks: 480,
      engagement_rate: 4.86,
      extended: {
        reactions_breakdown: {
          like: 980,
          love: 210,
          wow: 42,
          haha: 8,
        },
        engaged_users: 2172,
      },
    },
    velocity_72h: [
      { hour: 0, cumulative_engagement: 60 },
      { hour: 4, cumulative_engagement: 480 },
      { hour: 12, cumulative_engagement: 1100 },
      { hour: 24, cumulative_engagement: 1692 },
      { hour: 48, cumulative_engagement: 1980 },
      { hour: 72, cumulative_engagement: 2172 },
    ],
  },
];

export const AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ins-001',
    type: 'opportunity',
    headline: 'Multi-Page PDF Carousels Outperforming Single Images by 2.4x in Saves',
    observation: 'On LinkedIn, multi-slide educational carousels generated 148 saves per post vs 62 for single-image announcements. Saves reflect high intent for long-term reference.',
    recommendation: 'Convert upcoming policy reports into 6-8 slide visual summary carousels on LinkedIn before distributing link outposts.',
    confidence: 'high',
    impact_metric: '+138% Bookmarks & Saves',
  },
  {
    id: 'ins-002',
    type: 'anomaly',
    headline: 'X (Twitter) Link Decay: Tweets with >1 External URL Experience 38% Reach Penalty',
    observation: 'Algorithm data indicates tweets featuring external links in the root message receive significantly lower organic distribution on X Basic tier context.',
    recommendation: 'Place canonical article links in the immediate first reply or quote-retweet rather than the initial thread opener.',
    confidence: 'high',
    impact_metric: '+38% Estimated Impressions',
  },
  {
    id: 'ins-003',
    type: 'guidance',
    headline: 'Reddit Community Engagement Surges on Tuesday & Thursday Evenings',
    observation: 'Submissions to r/agriculture and technical policy subreddits receive 3x more comment replies when posted between 17:00 and 19:30 IST.',
    recommendation: 'Schedule discussion threads during the mid-week evening commute window to maximize active upvote velocity.',
    confidence: 'medium',
    impact_metric: '3x Active Comment Velocity',
  },
];

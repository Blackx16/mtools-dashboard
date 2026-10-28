import React, { useState, useRef, useEffect } from 'react';
import { BRANDS, ACTIVE_PLATFORMS, HERO_KPIS, POSTS_DATA } from '../data/mockData';
import { Brand, PlatformType } from '../types';
import { 
  Layers, 
  Calendar, 
  Filter, 
  Download, 
  CheckCircle2, 
  ChevronDown, 
  FileText, 
  FileCode,
  Check,
  Sparkles,
  HelpCircle,
  Compass
} from 'lucide-react';

interface HeaderProps {
  selectedBrand: Brand;
  onSelectBrand: (brand: Brand) => void;
  datePreset: string;
  onSelectDatePreset: (preset: string) => void;
  selectedPlatforms: PlatformType[];
  onTogglePlatform: (platform: PlatformType) => void;
  onResetPlatforms?: () => void;
  onRunQuickSetup: () => void;
  onOpenTour: () => void;
  onOpenGuide: () => void;
}

const ACTIVE_PLATFORM_CONFIG: { id: PlatformType; label: string; color: string }[] = [
  { id: 'linkedin', label: 'LinkedIn', color: '#0A66C2' },
  { id: 'x', label: 'X (Twitter)', color: '#000000' },
  { id: 'instagram', label: 'Instagram', color: '#E1306C' },
  { id: 'facebook', label: 'Facebook', color: '#1877F2' },
];

const DATE_OPTIONS: { id: string; label: string }[] = [
  { id: 'last7d', label: 'Last 7 Days' },
  { id: 'last30d', label: 'Last 30 Days' },
  { id: 'last90d', label: 'Last 90 Days' },
  { id: 'ytd', label: 'Year to Date' },
];

export function Header({
  selectedBrand,
  onSelectBrand,
  datePreset,
  onSelectDatePreset,
  selectedPlatforms,
  onTogglePlatform,
  onResetPlatforms,
  onRunQuickSetup,
  onOpenTour,
  onOpenGuide,
}: HeaderProps) {
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);

  const dateRef = useRef<HTMLDivElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setDateDropdownOpen(false);
      }
      if (platformRef.current && !platformRef.current.contains(event.target as Node)) {
        setPlatformDropdownOpen(false);
      }
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setExportDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeDateLabel = DATE_OPTIONS.find((d) => d.id === datePreset)?.label || '30 Days';

  // Platform selection summary
  const effectiveSelected = selectedPlatforms.filter((p) => ACTIVE_PLATFORMS.includes(p));
  const platformSummaryText =
    effectiveSelected.length === ACTIVE_PLATFORMS.length
      ? 'All 4 Platforms'
      : effectiveSelected.length === 1
      ? `${ACTIVE_PLATFORM_CONFIG.find((c) => c.id === effectiveSelected[0])?.label.split(' ')[0] || '1 Platform'} Only`
      : `${effectiveSelected.length} Platforms`;

  // Export handlers
  const handleExportPDF = () => {
    setExportDropdownOpen(false);
    window.print();
  };

  const handleExportMarkdown = () => {
    setExportDropdownOpen(false);
    const now = new Date().toISOString().split('T')[0];

    const activeConnections = selectedBrand.connections.filter((c) =>
      ACTIVE_PLATFORMS.includes(c.platform)
    );

    const relevantPosts = POSTS_DATA.filter((p) =>
      ACTIVE_PLATFORMS.includes(p.platform) &&
      (effectiveSelected.length === 0 || effectiveSelected.includes(p.platform))
    );

    const md = `# mTools Social Analytics Executive Report: ${selectedBrand.name}

> **Report Generated:** ${new Date().toLocaleString()}  
> **Date Scope:** ${activeDateLabel}  
> **Brand Persona:** ${selectedBrand.tagline}  
> **Authentication:** Authentik OIDC Protected  

---

## 1. Executive Performance Rollup

| Metric Key | Aggregate Value | 30-Day Velocity Delta | Data Provenance |
| :--- | :--- | :--- | :--- |
| **Gross Impressions** | ${HERO_KPIS.gross_impressions.value.toLocaleString()} | +${HERO_KPIS.gross_impressions.change}% | platform_direct |
| **Unique Reach** | ${HERO_KPIS.unique_reach.value.toLocaleString()} | +${HERO_KPIS.unique_reach.change}% | platform_direct |
| **Total Engagements** | ${HERO_KPIS.total_engagements.value.toLocaleString()} | +${HERO_KPIS.total_engagements.change}% | platform_direct |
| **Blended Engagement Rate** | ${HERO_KPIS.blended_engagement_rate.value}% | +${HERO_KPIS.blended_engagement_rate.change}% | calculated |
| **Publication Velocity** | ${HERO_KPIS.publication_velocity.published} Live (${HERO_KPIS.publication_velocity.scheduled} In Queue) | Steady | system_worker |
| **Audience Reach Base** | ${HERO_KPIS.audience_growth.total.toLocaleString()} Followers | +${HERO_KPIS.audience_growth.net_change.toLocaleString()} Net | platform_direct |

---

## 2. Active Channel Health & Telemetry Connections

| Platform | Channel Account | System Status | Last Sync Timestamp |
| :--- | :--- | :--- | :--- |
${activeConnections
  .map(
    (c) =>
      `| **${c.platform.toUpperCase()}** | ${c.account_name} | \`${c.status.toUpperCase()}\` | ${c.last_synced_at || 'Syncing'} |`
  )
  .join('\n')}

---

## 3. High-Velocity Content Performance

| Post Title | Channel | Format | Impressions | Engagements | ER % |
| :--- | :--- | :--- | :--- | :--- | :--- |
${relevantPosts
  .slice(0, 10)
  .map(
    (p) =>
      `| ${p.title} | ${p.platform.toUpperCase()} | \`${p.format}\` | ${p.metrics.impressions ? p.metrics.impressions.toLocaleString() : '—'} | ${(p.metrics.likes + p.metrics.comments + (p.metrics.shares || 0)).toLocaleString()} | ${p.metrics.engagement_rate ? `${p.metrics.engagement_rate}%` : '—'} |`
  )
  .join('\n')}

---
*Report exported from mTools Command Center (omysha.org)*
`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mtools-report-${selectedBrand.slug}-${datePreset}-${now}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Brand & Platform Identity */}
          <div className="flex items-center gap-3" id="brand-selector">
            <div className="w-9 h-9 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold shadow-xs ring-2 ring-brand-100 flex-shrink-0">
              <Layers className="w-5 h-5 text-omysha-amber" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">mTools</span>
                <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-2.5 h-2.5 mr-1 text-emerald-600" /> Authentik SSO
                </span>
              </div>
              
              {/* Brand Selector Dropdown */}
              <div className="flex items-center gap-2 mt-0.5">
                <select
                  value={selectedBrand.slug}
                  onChange={(e) => {
                    const found = BRANDS.find((b) => b.slug === e.target.value);
                    if (found) onSelectBrand(found);
                  }}
                  className="text-base sm:text-lg font-bold text-neutral-900 bg-transparent border-none cursor-pointer focus:outline-hidden hover:text-brand-600 transition-colors pr-6"
                >
                  {BRANDS.map((brand) => (
                    <option key={brand.slug} value={brand.slug}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Controls: Date, Platforms, Quick Setup, Tour, Guide, Export */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            
            {/* Filter Container for Spotlight */}
            <div className="flex items-center gap-2" id="header-filters">
              {/* 1. Date Range Dropdown */}
              <div className="relative" ref={dateRef}>
                <button
                  type="button"
                  onClick={() => setDateDropdownOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-2xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{activeDateLabel}</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                {dateDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white border border-neutral-200 shadow-lg py-1 z-40 animate-in fade-in-50 zoom-in-95">
                    <div className="px-3 py-1 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                      Date Range
                    </div>
                    {DATE_OPTIONS.map((opt) => {
                      const isSelected = datePreset === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            onSelectDatePreset(opt.id);
                            setDateDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors ${
                            isSelected
                              ? 'bg-neutral-100 font-semibold text-neutral-900'
                              : 'text-neutral-700 hover:bg-neutral-50'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-neutral-900" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 2. Platform Filter Dropdown (Active Platforms Only) */}
              <div className="relative" ref={platformRef}>
                <button
                  id="platform-dropdown-btn"
                  type="button"
                  onClick={() => setPlatformDropdownOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-2xs"
                >
                  <Filter className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{platformSummaryText}</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                {platformDropdownOpen && (
                  <div
                    id="platform-dropdown-menu"
                    className="absolute right-0 mt-1.5 w-52 rounded-xl bg-white border border-neutral-200 shadow-lg py-1.5 z-40 animate-in fade-in-50 zoom-in-95"
                  >
                    <div className="px-3 py-1 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Platforms</span>
                      <button
                        id="platform-reset-btn"
                        type="button"
                        onClick={() => {
                          if (onResetPlatforms) {
                            onResetPlatforms();
                          } else {
                            ACTIVE_PLATFORMS.forEach((p) => {
                              if (!effectiveSelected.includes(p)) onTogglePlatform(p);
                            });
                          }
                        }}
                        className="text-[10px] text-brand-600 hover:underline normal-case font-medium cursor-pointer"
                      >
                        Reset All
                      </button>
                    </div>
                    
                    {ACTIVE_PLATFORM_CONFIG.map((plat) => {
                      const isChecked = effectiveSelected.includes(plat.id);
                      const isOnlySelected = isChecked && effectiveSelected.length === 1;
                      return (
                        <button
                          key={plat.id}
                          id={`platform-toggle-${plat.id}`}
                          type="button"
                          onClick={() => {
                            if (!isOnlySelected) {
                              onTogglePlatform(plat.id);
                            }
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-left transition-colors ${
                            isOnlySelected
                              ? 'text-neutral-500 cursor-not-allowed bg-neutral-50/50'
                              : 'text-neutral-700 hover:bg-neutral-50 cursor-pointer'
                          }`}
                          title={isOnlySelected ? 'At least one platform must remain active' : undefined}
                        >
                          <span
                            className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-all ${
                              isChecked
                                ? 'bg-neutral-900 border-neutral-900 text-white'
                                : 'border-neutral-300 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-2.5 h-2.5" />}
                          </span>
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: plat.color }}
                          />
                          <span className="font-medium flex-1">{plat.label}</span>
                          {isOnlySelected && (
                            <span className="text-[10px] font-normal text-neutral-400">
                              (Required)
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* 3. 1-Click Quick Setup Button */}
            <button
              id="quick-setup-btn"
              type="button"
              onClick={onRunQuickSetup}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title="1-Click Simulated Setup: Connect all 4 channels instantly"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Quick Setup</span>
            </button>

            {/* 4. Interactive Tour Button */}
            <button
              type="button"
              onClick={onOpenTour}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-700 transition-all shadow-2xs cursor-pointer"
              title="Take the Interactive Walkthrough Tour"
            >
              <Compass className="w-3.5 h-3.5 text-brand-600" />
              <span className="hidden sm:inline">Tour</span>
            </button>

            {/* 5. Beginner Guide Modal Button */}
            <button
              type="button"
              onClick={onOpenGuide}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-700 transition-all shadow-2xs cursor-pointer"
              title="Beginner Guide: What every button does"
            >
              <HelpCircle className="w-3.5 h-3.5 text-neutral-500" />
              <span className="hidden sm:inline">Guide</span>
            </button>

            {/* 6. Export Dropdown */}
            <div className="relative" ref={exportRef} id="export-btn">
              <button
                type="button"
                onClick={() => setExportDropdownOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-all shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-omysha-amber" />
                <span>Export</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {exportDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-white border border-neutral-200 shadow-xl py-1.5 z-40 animate-in fade-in-50 zoom-in-95">
                  <div className="px-3 py-1 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                    Export Format
                  </div>
                  <button
                    type="button"
                    onClick={handleExportPDF}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left text-neutral-700 hover:bg-neutral-50 transition-colors font-medium"
                  >
                    <FileText className="w-4 h-4 text-rose-500" />
                    <div className="flex flex-col">
                      <span>Export as PDF</span>
                      <span className="text-[10px] text-neutral-400 font-normal">Executive print view</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={handleExportMarkdown}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left text-neutral-700 hover:bg-neutral-50 transition-colors font-medium"
                  >
                    <FileCode className="w-4 h-4 text-sky-500" />
                    <div className="flex flex-col">
                      <span>Export as Markdown</span>
                      <span className="text-[10px] text-neutral-400 font-normal">Formatted .md summary</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}

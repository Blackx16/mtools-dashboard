import React, { useState, useEffect, useMemo } from 'react';
import { BRANDS, HERO_KPIS, ACTIVE_PLATFORMS, computeDynamicHeroKPIs } from './data/mockData';
import { Brand, PlatformType, BrandConnection } from './types';
import { Header } from './components/Header';
import { PlatformHealthRibbon } from './components/PlatformHealthRibbon';
import { HeroMetricRibbon } from './components/HeroMetricRibbon';
import { LongitudinalCharts } from './components/LongitudinalCharts';
import { NativePlatformTabs } from './components/NativePlatformTabs';
import { ContentPerformanceExplorer } from './components/ContentPerformanceExplorer';
import { SliceComparisonEngine } from './components/SliceComparisonEngine';
import { WalkthroughTour } from './components/WalkthroughTour';
import { DashboardGuideModal } from './components/DashboardGuideModal';
import { ShieldCheck, CheckCircle2, Sparkles, X } from 'lucide-react';

export function App() {
  const [selectedBrand, setSelectedBrand] = useState<Brand>(BRANDS[0]);
  const [datePreset, setDatePreset] = useState<string>('last30d');
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>(ACTIVE_PLATFORMS);

  // Tour and Guide Modal State
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic KPIs calculated strictly from checked platforms
  const dynamicKPIs = useMemo(() => {
    return computeDynamicHeroKPIs(selectedPlatforms);
  }, [selectedPlatforms]);

  // Auto-launch walkthrough tour for first-time visitors
  useEffect(() => {
    try {
      const tourCompleted = localStorage.getItem('mtools_tour_completed');
      if (!tourCompleted) {
        setIsTourOpen(true);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleTogglePlatform = (platform: PlatformType) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(platform)) {
        if (prev.length <= 1) return prev; // Keep at least one platform selected at all times
        return prev.filter((p) => p !== platform);
      } else {
        return [...prev, platform];
      }
    });
  };

  const handleResetPlatforms = () => {
    setSelectedPlatforms(ACTIVE_PLATFORMS);
  };

  const handleUpdateConnectionStatus = (
    platform: PlatformType,
    newStatus: BrandConnection['status']
  ) => {
    setSelectedBrand((prev) => ({
      ...prev,
      connections: prev.connections.map((c) =>
        c.platform === platform ? { ...c, status: newStatus } : c
      ),
    }));
  };

  // 1-Click Simulated Quick Setup
  const handleRunQuickSetup = () => {
    setSelectedBrand((prev) => ({
      ...prev,
      connections: prev.connections.map((c) => {
        if (ACTIVE_PLATFORMS.includes(c.platform)) {
          return {
            ...c,
            status: 'connected',
            last_synced_at: new Date().toISOString(),
            error_detail: undefined,
          };
        }
        return c;
      }),
    }));

    setToastMessage(
      '✨ All Channels Connected! 4 social networks are live and synchronized with fresh demo metrics.'
    );

    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 font-sans relative">
      
      {/* 1. Header with Controls, Tour, Guide, and Quick Setup */}
      <Header
        selectedBrand={selectedBrand}
        onSelectBrand={setSelectedBrand}
        datePreset={datePreset}
        onSelectDatePreset={setDatePreset}
        selectedPlatforms={selectedPlatforms}
        onTogglePlatform={handleTogglePlatform}
        onResetPlatforms={handleResetPlatforms}
        onRunQuickSetup={handleRunQuickSetup}
        onOpenTour={() => setIsTourOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Celebratory Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-neutral-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-neutral-700 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-emerald-300" />
            </div>
            <p className="text-xs font-medium leading-snug">{toastMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-neutral-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Content Canvas */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        
        {/* PDF Executive Print Header (Only visible during print/export) */}
        <div className="hidden print:block mb-4 pb-3 border-b border-neutral-300">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">mTools Executive Social Analytics</h1>
              <p className="text-xs text-neutral-600 mt-1">
                Brand: <strong>{selectedBrand.name}</strong> • Range: <strong>{datePreset}</strong> • Scope: 4 Live Channels (LinkedIn, X, Instagram, Facebook)
              </p>
            </div>
            <span className="text-xs text-neutral-500 font-mono">
              Generated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* 2. Platform Health Status Strip */}
        <div id="platform-health-ribbon">
          <PlatformHealthRibbon
            connections={selectedBrand.connections}
            brandName={selectedBrand.name}
            onUpdateConnectionStatus={handleUpdateConnectionStatus}
          />
        </div>

        {/* 3. Executive Hero KPI Ribbon */}
        <div id="hero-kpis">
          <HeroMetricRibbon kpis={dynamicKPIs} />
        </div>

        {/* 4. Full-Width Performance Evolution & 72h Velocity Chart */}
        <div id="longitudinal-charts">
          <LongitudinalCharts selectedPlatforms={selectedPlatforms} />
        </div>

        {/* 5. Platform-by-Platform Native Telemetry Tabs */}
        <NativePlatformTabs selectedPlatforms={selectedPlatforms} />

        {/* 6 & 7. Content Performance Explorer & Slice Comparison */}
        <div id="content-explorer-and-slice" className="space-y-5">
          <ContentPerformanceExplorer selectedPlatforms={selectedPlatforms} />
          <SliceComparisonEngine selectedPlatforms={selectedPlatforms} />
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-10 py-5 text-xs text-neutral-500 no-print">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-800">mTools • MarketingSupport</span>
            <span>• Omysha Organizations (A4G, A4G Intelex, GMFER, Muralidhar)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" /> Authentik SSO Protected
            </span>
          </div>
        </div>
      </footer>

      {/* Interactive Spotlight Tour */}
      <WalkthroughTour
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onRunQuickSetup={handleRunQuickSetup}
      />

      {/* Persistent Dashboard Guide Modal */}
      <DashboardGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onStartTour={() => setIsTourOpen(true)}
        onRunQuickSetup={handleRunQuickSetup}
      />

    </div>
  );
}

export default App;

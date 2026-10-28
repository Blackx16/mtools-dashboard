import React, { useState, useEffect, useMemo } from 'react';
import { BRANDS, ACTIVE_PLATFORMS, computeDynamicHeroKPIs } from './data/mockData';
import { Brand, PlatformType, BrandConnection } from './types';
import { Header } from './components/Header';
import { HeroMetricRibbon } from './components/HeroMetricRibbon';
import { LongitudinalCharts } from './components/LongitudinalCharts';
import { ChannelComparisonTable } from './components/ChannelComparisonTable';
import { ContentPerformanceExplorer } from './components/ContentPerformanceExplorer';
import { SliceComparisonEngine } from './components/SliceComparisonEngine';
import { ConnectionModal } from './components/ConnectionModal';
import { WalkthroughTour } from './components/WalkthroughTour';
import { AlertTriangle, X } from 'lucide-react';

export function App() {
  const [selectedBrand, setSelectedBrand] = useState<Brand>(BRANDS[0]);
  const [datePreset, setDatePreset] = useState<string>('last30d');
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>(ACTIVE_PLATFORMS);
  const [activeChannelFilter, setActiveChannelFilter] = useState<PlatformType | null>(null);

  // Modal and Alert State
  const [selectedConnectionForModal, setSelectedConnectionForModal] = useState<BrandConnection | null>(null);
  const [isDismissedAlert, setIsDismissedAlert] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Reset alert dismissed state on brand change
  useEffect(() => {
    setIsDismissedAlert(false);
  }, [selectedBrand.slug]);

  // Dynamic KPIs calculated strictly from checked platforms
  const dynamicKPIs = useMemo(() => {
    return computeDynamicHeroKPIs(selectedPlatforms);
  }, [selectedPlatforms]);

  // Find first degraded channel among active platforms
  const degradedConnection = useMemo(() => {
    return selectedBrand.connections.find(
      (c) => ACTIVE_PLATFORMS.includes(c.platform) && c.status !== 'connected'
    );
  }, [selectedBrand.connections]);

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

  const handleOpenIntegrations = () => {
    const firstActive = selectedBrand.connections.find((c) => ACTIVE_PLATFORMS.includes(c.platform)) || selectedBrand.connections[0];
    setSelectedConnectionForModal(firstActive);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 font-sans relative">
      
      {/* 1. Clean Top Bar */}
      <Header
        selectedBrand={selectedBrand}
        onSelectBrand={setSelectedBrand}
        datePreset={datePreset}
        onSelectDatePreset={setDatePreset}
        selectedPlatforms={selectedPlatforms}
        onTogglePlatform={handleTogglePlatform}
        onResetPlatforms={handleResetPlatforms}
        onOpenIntegrations={handleOpenIntegrations}
        onOpenTour={() => setIsTourOpen(true)}
      />

      {/* Main Content Canvas */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        
        {/* PDF Executive Print Header (Only visible during print/export) */}
        <div className="hidden print:block mb-4 pb-3 border-b border-neutral-300">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">mTools Executive Social Analytics</h1>
              <p className="text-xs text-neutral-600 mt-1">
                Brand: <strong>{selectedBrand.name}</strong> • Range: <strong>{datePreset}</strong>
              </p>
            </div>
            <span className="text-xs text-neutral-500 font-mono">
              Generated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* 2. Degraded Channel Alert Line (Shown only when broken/rate-limited) */}
        {degradedConnection && !isDismissedAlert && (
          <div
            id="channel-alert-banner"
            className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2.5 rounded-xl flex items-center justify-between text-xs shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                <strong>{degradedConnection.platform === 'x' ? 'X' : degradedConnection.platform.charAt(0).toUpperCase() + degradedConnection.platform.slice(1)}</strong> is {degradedConnection.status === 'rate_limited' ? 'rate-limited' : degradedConnection.status.replace('_', ' ')}, data may be delayed.
              </span>
              <button
                type="button"
                onClick={() => setSelectedConnectionForModal(degradedConnection)}
                className="ml-2 font-semibold underline text-amber-900 hover:text-black cursor-pointer"
              >
                Fix connection
              </button>
            </div>
            <button
              type="button"
              onClick={() => setIsDismissedAlert(true)}
              className="text-amber-700 hover:text-amber-950 p-1 cursor-pointer"
              title="Dismiss alert"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 3. 4 Clean KPIs */}
        <div id="hero-kpis">
          <HeroMetricRibbon kpis={dynamicKPIs} />
        </div>

        {/* 4. Streamlined Trend Chart */}
        <div id="longitudinal-charts">
          <LongitudinalCharts selectedPlatforms={selectedPlatforms} />
        </div>

        {/* 5. By Channel Comparison Table */}
        <ChannelComparisonTable
          selectedPlatforms={selectedPlatforms}
          activeChannelFilter={activeChannelFilter}
          onSelectChannelFilter={setActiveChannelFilter}
        />

        {/* 6. Content Performance Table */}
        <div id="content-explorer-and-slice" className="space-y-5">
          <ContentPerformanceExplorer
            selectedPlatforms={selectedPlatforms}
            activeChannelFilter={activeChannelFilter}
            onClearChannelFilter={() => setActiveChannelFilter(null)}
          />

          {/* 7. Compare Engine (Collapsed by default) */}
          <SliceComparisonEngine selectedPlatforms={selectedPlatforms} />
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-10 py-5 text-xs text-neutral-500 no-print">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-800">mTools</span>
            <span>• Omysha Organizations</span>
          </div>
          <div className="text-neutral-400">
            Social Performance Command Center
          </div>
        </div>
      </footer>

      {/* Connection / Integrations Modal */}
      {selectedConnectionForModal && (
        <ConnectionModal
          connection={selectedConnectionForModal}
          brandName={selectedBrand.name}
          onClose={() => setSelectedConnectionForModal(null)}
          onUpdateConnectionStatus={(platform, newStatus) => {
            handleUpdateConnectionStatus(platform, newStatus);
            setSelectedConnectionForModal(null);
          }}
        />
      )}

      {/* Walkthrough Tour (On demand via Help icon) */}
      <WalkthroughTour
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
      />

    </div>
  );
}

export default App;

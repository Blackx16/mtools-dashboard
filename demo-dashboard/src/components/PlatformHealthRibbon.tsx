import React, { useState } from 'react';
import { BrandConnection, PlatformType } from '../types';
import { ACTIVE_PLATFORMS } from '../data/mockData';
import { ConnectionModal } from './ConnectionModal';
import { Radio } from 'lucide-react';

interface PlatformHealthRibbonProps {
  connections: BrandConnection[];
  brandName: string;
  onUpdateConnectionStatus: (platform: PlatformType, newStatus: BrandConnection['status']) => void;
}

const PLATFORM_COLORS: Record<PlatformType, string> = {
  linkedin: '#0A66C2',
  x: '#000000',
  instagram: '#E1306C',
  facebook: '#1877F2',
  substack: '#FF6719',
  reddit: '#FF4500',
};

export function PlatformHealthRibbon({
  connections,
  brandName,
  onUpdateConnectionStatus,
}: PlatformHealthRibbonProps) {
  const [selectedConnection, setSelectedConnection] = useState<BrandConnection | null>(null);

  // Filter to active platforms only (hide Substack and Reddit alpha channels)
  const activeConnections = connections.filter((c) => ACTIVE_PLATFORMS.includes(c.platform));

  const statusConfig: Record<
    BrandConnection['status'],
    { label: string; dot: string; text: string; bg: string }
  > = {
    connected: {
      label: 'Live',
      dot: 'bg-emerald-500',
      text: 'text-emerald-700',
      bg: 'hover:bg-emerald-50/50',
    },
    connecting: {
      label: 'Connecting…',
      dot: 'bg-sky-500 animate-pulse',
      text: 'text-sky-700',
      bg: 'hover:bg-sky-50/50',
    },
    expiring: {
      label: 'Expiring Soon',
      dot: 'bg-amber-500',
      text: 'text-amber-700',
      bg: 'hover:bg-amber-50/50',
    },
    needs_reauth: {
      label: 'Reauth Required',
      dot: 'bg-rose-500',
      text: 'text-rose-700',
      bg: 'hover:bg-rose-50/50',
    },
    rate_limited: {
      label: 'Rate Limited',
      dot: 'bg-orange-500',
      text: 'text-orange-700',
      bg: 'hover:bg-orange-50/50',
    },
    not_connected: {
      label: 'Disconnected',
      dot: 'bg-neutral-400',
      text: 'text-neutral-500',
      bg: 'hover:bg-neutral-50',
    },
    error: {
      label: 'Error',
      dot: 'bg-rose-500',
      text: 'text-rose-700',
      bg: 'hover:bg-rose-50/50',
    },
  };

  return (
    <section className="bg-white rounded-xl border border-neutral-200 px-4 py-2.5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        
        {/* Title */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-neutral-500" /> Channels Health:
          </span>
        </div>

        {/* Integration Status Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          {activeConnections.map((c) => {
            const cfg = statusConfig[c.status] || statusConfig.not_connected;
            return (
              <button
                key={c.platform}
                onClick={() => setSelectedConnection(c)}
                className={`group flex items-center gap-2 px-2.5 py-1 rounded-lg border border-neutral-200 text-xs transition-all ${cfg.bg} cursor-pointer hover:border-neutral-300 shadow-2xs`}
                title={c.error_detail || `${c.platform}: ${cfg.label} (Click to diagnose)`}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: PLATFORM_COLORS[c.platform] }}
                />
                <span className="font-semibold capitalize text-neutral-800 text-xs">
                  {c.platform === 'x' ? 'X' : c.platform}
                </span>
                <span className="flex items-center gap-1 text-[11px]">
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  <span className={`${cfg.text} font-medium`}>{cfg.label}</span>
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Render Modal if platform clicked */}
      {selectedConnection && (
        <ConnectionModal
          connection={selectedConnection}
          brandName={brandName}
          onClose={() => setSelectedConnection(null)}
          onUpdateConnectionStatus={(platform, newStatus) => {
            onUpdateConnectionStatus(platform, newStatus);
            setSelectedConnection((prev) => (prev ? { ...prev, status: newStatus } : null));
          }}
        />
      )}
    </section>
  );
}

import React, { useState } from 'react';
import { BrandConnection, PlatformType } from '../types';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ShieldCheck, 
  ExternalLink, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

interface ConnectionModalProps {
  connection: BrandConnection;
  brandName: string;
  onClose: () => void;
  onUpdateConnectionStatus: (platform: PlatformType, newStatus: BrandConnection['status']) => void;
}

export function ConnectionModal({
  connection,
  brandName,
  onClose,
  onUpdateConnectionStatus,
}: ConnectionModalProps) {
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulateOAuth = () => {
    setIsSimulating(true);
    onUpdateConnectionStatus(connection.platform, 'connecting');
    setTimeout(() => {
      setIsSimulating(false);
      onUpdateConnectionStatus(connection.platform, 'connected');
    }, 2000);
  };

  const platformInfo: Record<
    PlatformType,
    { title: string; color: string; scopes: string[]; docs: string }
  > = {
    linkedin: {
      title: 'LinkedIn Community Management API',
      color: '#0A66C2',
      scopes: ['r_organization_social', 'w_member_social', 'r_member_postAnalytics'],
      docs: 'Requires vetted Company Page & 60-day token rotation.',
    },
    x: {
      title: 'X (Twitter) Developer API v2',
      color: '#000000',
      scopes: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
      docs: 'Basic Tier ($100/mo) active. Monthly 10,000 read ceiling monitored.',
    },
    instagram: {
      title: 'Meta Graph API v26.0 (Instagram Professional)',
      color: '#E1306C',
      scopes: ['instagram_basic', 'instagram_manage_insights', 'instagram_content_publish'],
      docs: 'Requires Professional / Creator account. Long-lived 60d exchange tokens.',
    },
    facebook: {
      title: 'Meta Graph API v26.0 (Facebook Pages)',
      color: '#1877F2',
      scopes: ['pages_show_list', 'pages_read_engagement', 'pages_manage_posts', 'read_insights'],
      docs: 'Non-expiring Page Access Token derived from verified admin.',
    },
    substack: {
      title: 'Substack Dual-Track Ingestion',
      color: '#FF6719',
      scopes: ['Public RSS 2.0 Polling', 'Native Creator CSV Ingestion'],
      docs: 'No public REST API. Automated RSS indexing + drag-and-drop CSV metrics.',
    },
    reddit: {
      title: 'Reddit Data API OAuth 2.0',
      color: '#FF4500',
      scopes: ['identity', 'read', 'submit', 'history'],
      docs: 'Non-commercial tier (100 req/min). Post impressions unavailable via REST.',
    },
  };

  const info = platformInfo[connection.platform];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="w-3.5 h-3.5 rounded-full inline-block"
              style={{ backgroundColor: info.color }}
            />
            <h3 className="text-base font-semibold text-neutral-900 capitalize">
              {connection.platform} Integration Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Status Alert Banner */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
            <div className="mt-0.5">
              {connection.status === 'connected' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              {connection.status === 'connecting' && <RefreshCw className="w-4 h-4 text-sky-600 animate-spin" />}
              {connection.status === 'rate_limited' && <Clock className="w-4 h-4 text-orange-600" />}
              {connection.status === 'expiring' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
              {connection.status === 'needs_reauth' && <AlertCircle className="w-4 h-4 text-rose-600" />}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-neutral-800 capitalize">
                Connection Status: {connection.status.replace('_', ' ')}
              </div>
              <p className="text-neutral-600 mt-0.5">
                {connection.error_detail || `Account '${connection.account_name}' is actively reporting telemetry.`}
              </p>
            </div>
          </div>

          {/* Account Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-neutral-100 bg-neutral-50/50">
              <span className="text-neutral-400 block font-medium">Bound Brand</span>
              <span className="text-neutral-800 font-semibold mt-0.5 block">{brandName}</span>
            </div>
            <div className="p-3 rounded-lg border border-neutral-100 bg-neutral-50/50">
              <span className="text-neutral-400 block font-medium">Remote Account</span>
              <span className="text-neutral-800 font-semibold mt-0.5 block truncate">
                {connection.account_name || 'None'}
              </span>
            </div>
            <div className="p-3 rounded-lg border border-neutral-100 bg-neutral-50/50">
              <span className="text-neutral-400 block font-medium">Last Polled</span>
              <span className="text-neutral-800 font-semibold mt-0.5 block">
                {connection.last_synced_at ? new Date(connection.last_synced_at).toLocaleTimeString() : 'Never'}
              </span>
            </div>
            <div className="p-3 rounded-lg border border-neutral-100 bg-neutral-50/50">
              <span className="text-neutral-400 block font-medium">Token Lifespan</span>
              <span className="text-neutral-800 font-semibold mt-0.5 block">
                {connection.token_expires_at || 'Auto-Refreshed'}
              </span>
            </div>
          </div>

          {/* Runner-Engineered Resiliency Feature Callout */}
          <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-3.5 text-xs text-sky-900">
            <div className="flex items-center gap-1.5 font-semibold text-sky-950 mb-1">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              Runner Connection Resiliency Active
            </div>
            <p className="text-sky-800 leading-relaxed text-[11px]">
              {info.docs} Runner watches token challenges transparently, performs background PKCE refreshes, and prevents premature timeout stalls.
            </p>
          </div>

          {/* Scopes List */}
          <div>
            <span className="text-xs font-semibold text-neutral-500 block mb-2">Granted OAuth Scopes:</span>
            <div className="flex flex-wrap gap-1.5">
              {info.scopes.map((scope) => (
                <span
                  key={scope}
                  className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 rounded text-[11px] font-mono text-neutral-700"
                >
                  {scope}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
          <button
            onClick={() => onUpdateConnectionStatus(connection.platform, 'not_connected')}
            className="text-xs text-rose-600 hover:text-rose-800 font-medium transition-colors"
          >
            Disconnect Account
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-neutral-200 bg-white text-neutral-700 text-xs font-medium hover:bg-neutral-50 transition-colors"
            >
              Close
            </button>
            <button
              disabled={isSimulating}
              onClick={handleSimulateOAuth}
              className="px-4 py-1.5 rounded-lg bg-brand-500 text-white text-xs font-medium hover:bg-brand-600 transition-colors shadow-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Handshaking OAuth…
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" /> Reconnect / Sync Now
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

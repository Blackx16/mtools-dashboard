import React from 'react';
import { 
  X, 
  HelpCircle, 
  Compass, 
  Sparkles, 
  Layers, 
  Calendar, 
  Filter, 
  Download, 
  Radio, 
  TrendingUp, 
  Eye, 
  Users, 
  Heart, 
  Split, 
  FileText, 
  FileCode,
  ShieldCheck 
} from 'lucide-react';

interface DashboardGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTour: () => void;
  onRunQuickSetup: () => void;
}

export function DashboardGuideModal({
  isOpen,
  onClose,
  onStartTour,
  onRunQuickSetup,
}: DashboardGuideModalProps) {
  if (!isOpen) return null;

  const buttonGuide = [
    {
      icon: Layers,
      name: 'Brand Switcher (Top Left)',
      why: 'Omysha manages multiple brands (A4G, A4G Intelex, GMFER, Muralidhar).',
      what: 'Select an organization from the dropdown to instantly switch the entire dashboard to that brand’s channels and metrics.',
    },
    {
      icon: Calendar,
      name: 'Date Range Selector',
      why: 'Helps you analyze custom reporting periods (7 Days, 30 Days, 90 Days, YTD).',
      what: 'Filters all charts and numbers to the selected date window.',
    },
    {
      icon: Filter,
      name: 'Platform Filter Dropdown',
      why: 'Acts as the central filter for all statistics across the entire dashboard.',
      what: 'Select or deselect channels with the checkboxes. By default, all 4 channels are selected, and at least one must always remain active. The whole dashboard (KPIs, charts, telemetry, and content tables) dynamically updates to your selection.',
    },
    {
      icon: Eye,
      name: 'Adaptive Platform-Specific Telemetry',
      why: 'Direct native metrics from each social platform’s APIs (e.g. LinkedIn Creator Analytics, X Views).',
      what: 'When multiple channels are selected, tab buttons allow quick switching between them. When a single channel is selected, the tabs bar is cut off to display native metrics directly.',
    },
    {
      icon: Sparkles,
      name: 'Quick Setup (1-Click)',
      why: 'Simulates a complete enterprise setup in one click without waiting for authorization.',
      what: 'Turns all 4 active channels to "Live", synchronizes mock metrics, and shows a confirmation toast.',
    },
    {
      icon: Download,
      name: 'Export Dropdown',
      why: 'Enables sharing executive summaries with team members or leadership.',
      what: 'Choose "Export as PDF" for a landscape printable summary, or "Export as Markdown" for a formatted document file.',
    },
    {
      icon: Radio,
      name: 'Channel Health Chips',
      why: 'Monitors the health and token status of each social account.',
      what: 'Click any platform chip (e.g. LinkedIn, X) to open a diagnostic modal showing token expiry and rate-limit details.',
    },
    {
      icon: TrendingUp,
      name: 'Trends vs. 72h Velocity Switcher',
      why: 'Different questions require different views (long-term growth vs. early post buzz).',
      what: 'Toggle "Trends" for 30-day performance curves, or "72h Velocity" to see how quickly content catches fire.',
    },
    {
      icon: Split,
      name: 'A/B Slice Comparison Engine',
      why: 'Helps content teams test which formats and goals generate the highest returns.',
      what: 'Set Slice A (e.g. Carousel / Organic) and Slice B (e.g. Text Thread) to see direct performance deltas.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans no-print">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in-50 zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-200">
              <HelpCircle className="w-4 h-4 text-brand-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 tracking-tight">
                mTools Beginner’s Guide & Control Directory
              </h2>
              <p className="text-xs text-neutral-500">
                Simple, non-technical instructions on how to use every button and feature.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-neutral-700">
          
          {/* Quick Intro Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-brand-50 to-amber-50/40 border border-brand-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-neutral-900 text-sm">Welcome to mTools!</h3>
              <p className="text-neutral-600 text-xs mt-0.5">
                This command center brings together your organization’s social media publishing and analytics into one clean view.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartTour();
                }}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 text-white font-bold hover:bg-neutral-800 transition-all shadow-xs flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-omysha-amber" />
                Start Interactive Tour
              </button>
              <button
                type="button"
                onClick={() => {
                  onRunQuickSetup();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                1-Click Setup
              </button>
            </div>
          </div>

          {/* Section 1: Button-by-Button Breakdown */}
          <div>
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3">
              🔘 Every Single Button & Control
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {buttonGuide.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 hover:bg-white hover:border-neutral-300 transition-all space-y-1"
                  >
                    <div className="flex items-center gap-2 font-bold text-neutral-900 text-xs">
                      <div className="w-5 h-5 rounded-md bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-3 h-3 text-neutral-700" />
                      </div>
                      <span>{item.name}</span>
                    </div>
                    <p className="text-neutral-500 text-[11px] leading-relaxed">
                      <strong className="text-neutral-700 font-semibold">Why it's here:</strong> {item.why}
                    </p>
                    <p className="text-neutral-600 text-[11px] leading-relaxed">
                      <strong className="text-neutral-700 font-semibold">What it does:</strong> {item.what}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Demystifying the Numbers */}
          <div>
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3">
              📊 Understanding the Big Numbers (No Jargon)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <div className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/40 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-blue-900">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span>Gross Impressions</span>
                </div>
                <p className="text-blue-800 text-[11px] leading-relaxed">
                  <strong>The Billboard Metaphor:</strong> Total number of times your post appeared on someone’s screen. If 1 person scrolls past your tweet 3 times, that counts as 3 impressions.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/40 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>Unique Reach</span>
                </div>
                <p className="text-indigo-800 text-[11px] leading-relaxed">
                  <strong>The Pedestrian Metaphor:</strong> Total number of individual, unique people who saw your post. If 1 person sees it 3 times, it is counted as 1 reach.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/40 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <Heart className="w-4 h-4 text-emerald-600" />
                  <span>Total Engagements</span>
                </div>
                <p className="text-emerald-800 text-[11px] leading-relaxed">
                  <strong>Taking Action:</strong> The sum of all active responses: Likes, Reactions, Comments, Reshares, and Bookmarks. Shows people stopped to interact.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-amber-100 bg-amber-50/40 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  <span>Blended ER % (Engagement Rate)</span>
                </div>
                <p className="text-amber-800 text-[11px] leading-relaxed">
                  <strong>The Response Ratio:</strong> (Engagements ÷ Impressions) × 100. A higher percentage means your audience finds your content compelling.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs">
          <span className="text-neutral-400 font-medium">
            mTools • MarketingSupport Command Center
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-900 text-white font-bold hover:bg-neutral-800 transition-colors shadow-2xs"
          >
            Close Guide
          </button>
        </div>

      </div>

    </div>
  );
}

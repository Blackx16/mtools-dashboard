import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  CheckCircle2, 
  Layers, 
  Calendar, 
  Filter, 
  Download, 
  Radio, 
  TrendingUp, 
  Split, 
  Check 
} from 'lucide-react';

interface TourStep {
  targetId: string;
  title: string;
  badge: string;
  description: string;
  whyItsHere: string;
  whatItDoes: string;
  actionPrompt?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: 'brand-selector',
    title: 'Brand Switcher',
    badge: 'Step 1 of 9 • Identity',
    description: 'Manage multiple organization identities from a single command center.',
    whyItsHere: 'Omysha runs several distinct initiatives (A4G, A4G Intelex, GMFER, and Muralidhar). Each has its own audience and social voice.',
    whatItDoes: 'Clicking here lets you seamlessly switch between organizations. All numbers, channels, and posts instantly update to match that brand.',
  },
  {
    targetId: 'header-filters',
    title: 'Date & Multi-Platform Checkbox Filters',
    badge: 'Step 2 of 9 • Unified Scope',
    description: 'Customize your reporting timeframe and selectively toggle social networks.',
    whyItsHere: 'The top-right platform dropdown controls the entire dashboard. By default, all 4 channels (LinkedIn, X, Instagram, Facebook) are active, and at least one channel always remains selected.',
    whatItDoes: 'Check or uncheck platforms to instantly recalculate Hero KPIs, filter longitudinal trend charts, narrow content tables, and adapt native telemetry.',
  },
  {
    targetId: 'quick-setup-btn',
    title: '1-Click Quick Setup',
    badge: 'Step 3 of 9 • Instant Simulation',
    description: 'One tap connects all your social channels and generates fresh demo data.',
    whyItsHere: 'In this prototype, we simulate a complete enterprise onboarding with zero technical setup or waiting.',
    whatItDoes: 'Instantly turns all 4 active channels to "Live", populates synchronized post metrics, and triggers a confirmation alert.',
    actionPrompt: 'Try it now: Click the button below to simulate connecting all accounts right away!',
  },
  {
    targetId: 'export-btn',
    title: 'PDF & Markdown Export',
    badge: 'Step 4 of 9 • Reporting',
    description: 'Download ready-to-share executive reports in seconds.',
    whyItsHere: 'Stakeholders and leadership need quick updates without logging into a complex software dashboard.',
    whatItDoes: 'Generate a clean landscape PDF brief (ready to print or save) or an instant Markdown summary for docs and meetings.',
  },
  {
    targetId: 'platform-health-ribbon',
    title: 'Channels Health Status',
    badge: 'Step 5 of 9 • Connections',
    description: 'Your real-time heartbeat for all connected social media accounts.',
    whyItsHere: 'Social networks periodically expire security tokens or encounter API rate limits that require attention.',
    whatItDoes: 'Shows live status chips for LinkedIn, X, Instagram, and Facebook. Click any channel chip to inspect connection details or test re-authentication.',
  },
  {
    targetId: 'hero-kpis',
    title: 'Executive Key Numbers',
    badge: 'Step 6 of 9 • At-a-Glance KPIs',
    description: 'The big 6 numbers that tell you how your organization is performing.',
    whyItsHere: 'Leaders need a fast, 5-second pulse check on total audience reach and response without digging through raw tables.',
    whatItDoes: 'Displays Impressions (screen views), Unique Reach (individuals reached), Engagements (actions taken), ER % (response rate), Post Velocity, and Audience Growth.',
  },
  {
    targetId: 'longitudinal-charts',
    title: 'Performance Evolution & Velocity',
    badge: 'Step 7 of 9 • Visual Trends',
    description: 'Track audience growth over 30 days and discover early 72-hour viral momentum.',
    whyItsHere: 'Understanding which days and hours generate the highest response helps your team publish smarter.',
    whatItDoes: 'Switch between "Trends" to see 30-day aggregate curves, and "72h Velocity" to see how quickly posts accumulate engagement after going live.',
  },
  {
    targetId: 'platform-telemetry',
    title: 'Adaptive Platform-Specific Telemetry',
    badge: 'Step 8 of 9 • Native Direct Telemetry',
    description: 'Direct API metrics that dynamically adapt to your selected channels.',
    whyItsHere: 'Deep native metrics like LinkedIn Creator Analytics, X Tweet Views, or Instagram Reach require platform-specific schemas.',
    whatItDoes: 'When multiple channels are selected, clean switcher buttons let you toggle between them. If a single channel is selected, the switcher buttons are automatically cut off so you see that channel’s native data immediately.',
  },
  {
    targetId: 'content-explorer-and-slice',
    title: 'Content Performance & A/B Slicing',
    badge: 'Step 9 of 9 • Deep Dive',
    description: 'Inspect individual post performance and discover what content works best.',
    whyItsHere: 'Content creators need to see what specific posts drove the numbers, read real comments, and compare formats.',
    whatItDoes: 'Browse your posts, sort by top performers, click any post to see comments & 72h decay curves, and use the A/B Slice engine to test formats (Carousels vs. Text).',
  },
];

interface WalkthroughTourProps {
  isOpen: boolean;
  onClose: () => void;
  onRunQuickSetup: () => void;
}

export function WalkthroughTour({ isOpen, onClose, onRunQuickSetup }: WalkthroughTourProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const currentStep = TOUR_STEPS[currentStepIndex];

  // Dynamically elevate active target element & header stacking context
  useEffect(() => {
    if (!isOpen) return;

    const targetEl = document.getElementById(currentStep.targetId);
    const header = document.querySelector('header');
    const isInsideHeader = header && targetEl ? header.contains(targetEl) : false;

    if (isInsideHeader && header) {
      header.style.zIndex = '45';
    } else if (header) {
      header.style.zIndex = '';
    }

    if (targetEl) {
      targetEl.style.position = 'relative';
      targetEl.style.zIndex = '46';
      targetEl.style.pointerEvents = 'auto';
    }

    return () => {
      if (header) {
        header.style.zIndex = '';
      }
      if (targetEl) {
        targetEl.style.position = '';
        targetEl.style.zIndex = '';
        targetEl.style.pointerEvents = '';
      }
    };
  }, [isOpen, currentStepIndex, currentStep.targetId]);

  // Update target element positioning
  useEffect(() => {
    if (!isOpen) return;

    function updateRect() {
      const el = document.getElementById(currentStep.targetId);
      if (el) {
        // Scroll into view if needed
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const rect = el.getBoundingClientRect();
        setTargetRect(rect);
      } else {
        setTargetRect(null);
      }
    }

    // Give a brief delay for layout/scroll
    const timer = setTimeout(updateRect, 150);
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [isOpen, currentStepIndex, currentStep.targetId]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    try {
      localStorage.setItem('mtools_tour_completed', 'true');
    } catch (e) {
      // ignore
    }
    onClose();
  };

  // Determine card placement (floating relative to target)
  const isTopHalf = targetRect ? targetRect.top > window.innerHeight / 2 : false;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans no-print pointer-events-none">
      
      {/* Dark Backdrop Scrim with True Aperture Cutout (absorbs background clicks without closing tour) */}
      <div
        className="fixed inset-0 z-40 bg-neutral-950/75 pointer-events-auto transition-all duration-300"
        style={{
          clipPath: targetRect
            ? `polygon(
                0% 0%, 0% 100%,
                ${Math.max(0, targetRect.left - 6)}px 100%,
                ${Math.max(0, targetRect.left - 6)}px ${Math.max(0, targetRect.top - 6)}px,
                ${targetRect.right + 6}px ${Math.max(0, targetRect.top - 6)}px,
                ${targetRect.right + 6}px ${targetRect.bottom + 6}px,
                ${Math.max(0, targetRect.left - 6)}px ${targetRect.bottom + 6}px,
                ${Math.max(0, targetRect.left - 6)}px 100%,
                100% 100%, 100% 0%
              )`
            : undefined,
        }}
        onClick={(e) => {
          // Absorbs clicks on the dark background so clicks don't hit underlying elements or close tour
          e.stopPropagation();
        }}
      />

      {/* True Crystal-Clear Cutout Glowing Frame (purely visual halo, passes all pointer events) */}
      {targetRect && (
        <div
          className="fixed rounded-xl transition-all duration-300 pointer-events-none z-[47]"
          style={{
            top: `${Math.max(4, targetRect.top - 6)}px`,
            left: `${Math.max(4, targetRect.left - 6)}px`,
            width: `${targetRect.width + 12}px`,
            height: `${targetRect.height + 12}px`,
            backgroundColor: 'transparent',
            border: '2px solid rgba(255, 255, 255, 0.95)',
            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.6), 0 0 25px rgba(255, 255, 255, 0.4)',
          }}
        />
      )}

      {/* Floating Tour Guide Card (at z-[60] so it floats comfortably above everything) */}
      <div 
        className="fixed z-[60] w-[92vw] max-w-lg left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-auto"
        style={{
          zIndex: 60,
          top: targetRect
            ? isTopHalf
              ? `${Math.max(20, targetRect.top - 280)}px`
              : `${Math.min(window.innerHeight - 340, targetRect.bottom + 20)}px`
            : '50%',
          transform: targetRect ? 'translateX(-50%)' : 'translate(-50%, -50%)',
        }}
      >
        <div id="tour-modal" className="bg-white rounded-2xl border border-neutral-200 shadow-2xl p-5 sm:p-6 space-y-4">
          
          {/* Top Bar: Badge, Step counter, Close */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
              <Sparkles className="w-3.5 h-3.5 text-omysha-amber" />
              {currentStep.badge}
            </span>
            <button
              type="button"
              onClick={handleFinish}
              className="text-neutral-400 hover:text-neutral-600 p-1 rounded-lg hover:bg-neutral-100 transition-colors"
              title="Close Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
              {currentStep.title}
            </h3>
            <p className="text-xs text-neutral-500 mt-1 font-medium leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          {/* Non-Technical Explanations */}
          <div className="space-y-2.5 bg-neutral-50 p-3.5 rounded-xl border border-neutral-100 text-xs">
            <div>
              <span className="font-bold text-neutral-700 block text-[11px] uppercase tracking-wider mb-0.5">
                Why is it here?
              </span>
              <p className="text-neutral-600 leading-normal">
                {currentStep.whyItsHere}
              </p>
            </div>
            <div>
              <span className="font-bold text-neutral-700 block text-[11px] uppercase tracking-wider mb-0.5">
                What does it do?
              </span>
              <p className="text-neutral-600 leading-normal">
                {currentStep.whatItDoes}
              </p>
            </div>

            {/* Optional Step-specific Action (e.g. Quick Setup) */}
            {currentStep.actionPrompt && (
              <div className="pt-2 border-t border-neutral-200">
                <p className="text-emerald-700 font-semibold mb-2 text-[11px]">
                  {currentStep.actionPrompt}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onRunQuickSetup();
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Run 1-Click Setup Now
                </button>
              </div>
            )}
          </div>

          {/* Stepper Navigation Footer */}
          <div className="flex items-center justify-between pt-2">
            
            {/* Step Dots */}
            <div className="flex items-center gap-1.5">
              {TOUR_STEPS.map((s, idx) => (
                <button
                  key={s.targetId}
                  type="button"
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentStepIndex
                      ? 'w-6 bg-brand-600'
                      : 'w-2 bg-neutral-200 hover:bg-neutral-300'
                  }`}
                  title={s.title}
                />
              ))}
            </div>

            {/* Skip / Back / Next / Finish buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleFinish}
                className="px-2.5 py-1.5 text-xs font-semibold text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                title="Skip the rest of the tour"
              >
                Skip Tour
              </button>

              {currentStepIndex > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-1.5 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm transition-all flex items-center gap-1 cursor-pointer"
              >
                {currentStepIndex === TOUR_STEPS.length - 1 ? (
                  <>Got It, Explore! <Check className="w-3.5 h-3.5" /></>
                ) : (
                  <>Next <ChevronRight className="w-3.5 h-3.5" /></>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

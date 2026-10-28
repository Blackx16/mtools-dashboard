import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Check 
} from 'lucide-react';

interface TourStep {
  targetId: string;
  title: string;
  badge: string;
  description: string;
  tip: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: 'header-filters',
    title: 'Date Range & Channels',
    badge: 'Step 1 of 3 • Filters',
    description: 'Filter your reporting timeframe (Last 7 Days to Year to Date) and toggle specific channels on or off.',
    tip: 'Your key metrics and trends automatically recalculate when changing selections.',
  },
  {
    targetId: 'hero-kpis',
    title: 'Executive KPIs & Trends',
    badge: 'Step 2 of 3 • Overview',
    description: 'Track your 4 core numbers (Reach, Engagements, ER, and Followers gained) with clean comparison against the previous period.',
    tip: 'The Trend chart below displays your growth alongside a faint benchmark of the prior period.',
  },
  {
    targetId: 'channel-comparison-section',
    title: 'By Channel & Content',
    badge: 'Step 3 of 3 • Deep Dive',
    description: 'Directly compare channel performance side-by-side in one unified table.',
    tip: 'Click any channel row to instantly filter the Content Performance table below to that channel.',
  },
];

interface WalkthroughTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalkthroughTour({ isOpen, onClose }: WalkthroughTourProps) {
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
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const rect = el.getBoundingClientRect();
        setTargetRect(rect);
      } else {
        setTargetRect(null);
      }
    }

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

  // Card Positioning
  let cardStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 60,
  };

  if (targetRect) {
    const isHeaderElement = currentStep.targetId === 'header-filters';
    const top = isHeaderElement
      ? Math.min(targetRect.bottom + 16, window.innerHeight - 300)
      : Math.max(20, targetRect.top - 200);

    cardStyle = {
      position: 'fixed',
      top: `${top}px`,
      left: `${Math.max(20, Math.min(window.innerWidth - 380, targetRect.left))}px`,
      zIndex: 60,
    };
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-auto">
      {/* Darkened backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/50 backdrop-blur-2xs transition-opacity duration-300"
        onClick={handleFinish}
      />

      {/* Target highlight cutout border */}
      {targetRect && (
        <div
          className="fixed rounded-xl pointer-events-none transition-all duration-300 ring-4 ring-neutral-900 ring-offset-2 ring-offset-white"
          style={{
            top: `${targetRect.top - 4}px`,
            left: `${targetRect.left - 4}px`,
            width: `${targetRect.width + 8}px`,
            height: `${targetRect.height + 8}px`,
            zIndex: 55,
          }}
        />
      )}

      {/* Tour popover card */}
      <div
        style={cardStyle}
        className="w-[360px] bg-white rounded-2xl shadow-2xl border border-neutral-200 p-5 flex flex-col gap-3 animate-in fade-in-50 zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
            {currentStep.badge}
          </span>
          <button
            type="button"
            onClick={handleFinish}
            className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-base font-bold text-neutral-900">{currentStep.title}</h3>
          <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">{currentStep.description}</p>
        </div>

        {/* Tip Box */}
        <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-600">
          <span className="font-semibold text-neutral-800">Quick tip: </span>
          {currentStep.tip}
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
          <button
            type="button"
            onClick={handleFinish}
            className="text-xs text-neutral-400 hover:text-neutral-700 font-medium cursor-pointer"
          >
            Skip
          </button>

          <div className="flex items-center gap-2">
            {currentStepIndex > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-2.5 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-xs text-neutral-600 font-medium flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs text-white font-medium flex items-center gap-1 shadow-xs cursor-pointer"
            >
              {currentStepIndex === TOUR_STEPS.length - 1 ? (
                <>Done <Check className="w-3.5 h-3.5" /></>
              ) : (
                <>Next <ChevronRight className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

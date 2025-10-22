"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, GraduationCap, ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";

interface TimelineEvent {
  year: string;
  title: string;
  company: string;
  description: string;
  type: "work" | "education";
}

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sparkle component with fixed positions
const Sparkle = ({ delay = 0, style }: { delay?: number; style?: React.CSSProperties }) => (
  <motion.div
    initial={{ scale: 0, rotate: 0 }}
    animate={{
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      opacity: [0, 1, 0]
    }}
    transition={{
      duration: 1.5,
      delay,
      repeat: Infinity,
      repeatDelay: 2
    }}
    className="absolute w-2 h-2"
    style={{
      background: 'radial-gradient(circle, #FF5722 0%, transparent 70%)',
      ...style
    }}
  />
);

// Timeline Card Component - Simple version
interface TimelineCardProps {
  event: TimelineEvent;
  index: number;
  isActive: boolean;
}

const TimelineCard = ({ event, index, isActive }: TimelineCardProps) => {
  const Icon = event.type === "work" ? Briefcase : GraduationCap;

  return (
    <motion.div
      data-card-index={index}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }}
      transition={{
        delay: 0.6 + (index * 0.15),
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="flex-shrink-0 relative z-10 w-full max-w-5xl px-6 md:px-12"
    >
      {/* Sparkles when active */}
      {isActive && (
        <>
          <Sparkle delay={0} style={{ top: '10%', left: '10%' }} />
          <Sparkle delay={0.3} style={{ top: '10%', right: '10%' }} />
          <Sparkle delay={0.6} style={{ bottom: '10%', left: '10%' }} />
          <Sparkle delay={0.9} style={{ bottom: '10%', right: '10%' }} />
        </>
      )}

      <motion.div
        animate={{
          scale: isActive ? 1 : 0.95,
          y: isActive ? 0 : 10
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`bg-white-pure border-2 p-8 md:p-12 transition-all duration-500 relative overflow-hidden ${
          isActive
            ? 'border-orange-pantone shadow-2xl'
            : 'border-black-deep/10 opacity-60'
        }`}
      >
        {/* Active glow effect */}
        {isActive && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255, 87, 34, 0.2) 0%, transparent 70%)'
            }}
          />
        )}

        <div className="flex items-center justify-between mb-6">
          <motion.div
            animate={{
              scale: isActive ? 1 : 0.9,
              rotate: isActive ? [0, 5, -5, 0] : 0
            }}
            transition={{
              rotate: { duration: 0.6, ease: "easeInOut" }
            }}
            className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center border-2 transition-all duration-500 ${
              isActive
                ? 'border-orange-pantone bg-orange-pantone'
                : 'border-black-deep/10 bg-white-pure'
            }`}
          >
            <Icon className={`w-6 h-6 md:w-7 md:h-7 transition-colors duration-500 ${
              isActive ? 'text-white-pure' : 'text-gray-secondary'
            }`} />
          </motion.div>

          <span className={`text-xl md:text-2xl font-bold px-4 py-2 md:px-5 md:py-2 border-2 transition-all duration-500 ${
            isActive
              ? 'text-orange-pantone border-orange-pantone bg-white-pure'
              : 'text-gray-secondary border-black-deep/10 bg-white-pure'
          }`}>
            {event.year}
          </span>
        </div>

        <h3 className={`text-3xl md:text-4xl font-medium mb-4 transition-colors duration-500 ${
          isActive ? 'text-orange-pantone' : 'text-black-deep'
        }`}>
          {event.title}
        </h3>
        <p className="text-lg md:text-xl text-gray-secondary font-medium mb-6">
          {event.company}
        </p>
        <p className="text-gray-secondary leading-relaxed text-lg md:text-xl">
          {event.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export function TimelineModal({ isOpen, onClose }: TimelineModalProps) {
  const t = useTranslations('timeline');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'up' | 'down' | null>(null);
  const [activeButton, setActiveButton] = useState<'up' | 'down' | null>(null);

  // Get timeline events from translations
  interface RawTimelineEvent {
    year: string;
    title: string;
    company: string;
    description: string;
    type: "work" | "education";
  }

  const timelineEvents: TimelineEvent[] = (t.raw('events') as RawTimelineEvent[]).map((event) => ({
    year: event.year,
    title: event.title,
    company: event.company,
    description: event.description,
    type: event.type
  }));

  // Reset to first card when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open and hide header
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      scrollPositionRef.current = window.scrollY;

      // Disable Lenis smooth scroll
      const html = document.documentElement;
      html.classList.add('lenis-stopped');

      // Lock body scroll only (NOT html to allow wheel events)
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = "100%";

      // Hide the header when modal is open
      const header = document.querySelector('header');
      const progressBar = document.querySelector('.fixed.top-0.h-1');
      if (header) (header as HTMLElement).style.display = 'none';
      if (progressBar) (progressBar as HTMLElement).style.display = 'none';
    } else {
      // Re-enable Lenis smooth scroll
      const html = document.documentElement;
      html.classList.remove('lenis-stopped');

      // Restore scroll position
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollPositionRef.current);

      // Show the header when modal is closed
      const header = document.querySelector('header');
      const progressBar = document.querySelector('.fixed.top-0.h-1');
      if (header) (header as HTMLElement).style.display = '';
      if (progressBar) (progressBar as HTMLElement).style.display = '';
    }
    return () => {
      const html = document.documentElement;
      html.classList.remove('lenis-stopped');
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      const header = document.querySelector('header');
      const progressBar = document.querySelector('.fixed.top-0.h-1');
      if (header) (header as HTMLElement).style.display = '';
      if (progressBar) (progressBar as HTMLElement).style.display = '';
    };
  }, [isOpen]);

  // Handle scroll to calculate active event
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;

    // Each card has variable height, use IntersectionObserver alternative
    // Simple approach: find which card is most visible in viewport
    const viewportCenter = scrollTop + containerHeight / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    const cards = container.querySelectorAll('[data-card-index]');
    cards.forEach((card, index) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const cardCenter = rect.top - containerRect.top + scrollTop + rect.height / 2;
      const distance = Math.abs(viewportCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(prev => prev !== closestIndex ? closestIndex : prev);
  }, []);

  // Scroll snap to card
  const scrollToCard = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;

    const card = scrollContainerRef.current.querySelector(`[data-card-index="${index}"]`) as HTMLElement;
    if (!card) return;

    const container = scrollContainerRef.current;
    const containerHeight = container.clientHeight;

    // Calculate scroll position to center the card
    const cardTop = card.offsetTop;
    const cardHeight = card.offsetHeight;
    const scrollPosition = cardTop - (containerHeight / 2) + (cardHeight / 2);

    container.scrollTo({
      top: Math.max(0, scrollPosition),
      behavior: 'smooth'
    });
  }, []);

  // Wheel scroll works natively for vertical scroll, no need to override

  // Touch handlers for swipe (vertical)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
    setSwipeDirection(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);

    const diff = touchStart - e.targetTouches[0].clientY;
    if (Math.abs(diff) > 10) {
      setSwipeDirection(diff > 0 ? 'down' : 'up');
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isDownSwipe = distance > 50;
    const isUpSwipe = distance < -50;

    if (isDownSwipe && activeIndex < timelineEvents.length - 1) {
      scrollToCard(activeIndex + 1);
    }
    if (isUpSwipe && activeIndex > 0) {
      scrollToCard(activeIndex - 1);
    }

    setSwipeDirection(null);
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation (Escape to close, Arrow Up/Down to navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown' && activeIndex < timelineEvents.length - 1) {
        e.preventDefault();
        setActiveButton('down');
        scrollToCard(activeIndex + 1);
        setTimeout(() => setActiveButton(null), 300);
      } else if (e.key === 'ArrowUp' && activeIndex > 0) {
        e.preventDefault();
        setActiveButton('up');
        scrollToCard(activeIndex - 1);
        setTimeout(() => setActiveButton(null), 300);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, activeIndex, scrollToCard]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop to hide everything behind */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99998] bg-black-deep"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99999] bg-cream"
            data-lenis-prevent
          >
            {/* Fixed Header */}
            <div className="sticky top-0 z-[100000] bg-cream backdrop-blur-md border-b-2 border-black-deep/10">
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 md:py-8 flex items-center justify-between">
                {/* Title */}
                <div className="flex-1">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-3xl md:text-4xl font-medium text-black-deep"
                  >
                    {t('title')}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-sm text-gray-secondary mt-2"
                  >
                    {t('subtitle')}
                  </motion.p>
                </div>

                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
                  onClick={onClose}
                  className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-black-deep hover:bg-orange-pantone text-white-pure transition-all duration-300 flex-shrink-0 group"
                  aria-label={t('close')}
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
                </motion.button>
              </div>
            </div>

            {/* Full content wrapper */}
            <div className="w-full h-full relative overflow-hidden flex flex-col bg-cream">
              {/* Swipe Indicator */}
              <AnimatePresence>
                {swipeDirection && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                  >
                    <motion.div
                      animate={{
                        y: swipeDirection === 'down' ? 20 : -20
                      }}
                      className="bg-orange-pantone/90 px-6 py-4 rounded-full flex items-center gap-3 shadow-2xl"
                    >
                      {swipeDirection === 'down' ? (
                        <ChevronDown className="w-8 h-8 text-white-pure" />
                      ) : (
                        <ChevronUp className="w-8 h-8 text-white-pure" />
                      )}
                      <span className="text-white-pure font-medium text-lg">
                        {swipeDirection === 'down' ? t('next') : t('previous')}
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons - Bottom Right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="fixed bottom-8 right-8 z-40 flex flex-col gap-3"
              >
                {/* Bouton Monter */}
                <motion.button
                  onClick={() => {
                    if (activeIndex > 0) {
                      setActiveButton('up');
                      scrollToCard(activeIndex - 1);
                      setTimeout(() => setActiveButton(null), 300);
                    }
                  }}
                  disabled={activeIndex === 0}
                  animate={{
                    scale: activeButton === 'up' ? 1.1 : 1,
                    backgroundColor: activeButton === 'up' ? '#FF5722' : '#FFFFFF',
                    borderColor: activeButton === 'up' ? '#FF5722' : 'rgba(0, 0, 0, 0.1)'
                  }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center gap-2 px-4 py-3 border-2 transition-all duration-300 ${
                    activeIndex === 0
                      ? 'opacity-40 cursor-not-allowed'
                      : 'hover:border-orange-pantone hover:bg-orange-pantone/10 cursor-pointer'
                  }`}
                >
                  <ChevronUp className={`w-5 h-5 transition-colors duration-300 ${
                    activeButton === 'up' ? 'text-white-pure' : 'text-black-deep'
                  }`} />
                  <span className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                    activeButton === 'up' ? 'text-white-pure' : 'text-black-deep'
                  }`}>
                    {t('up')}
                  </span>
                </motion.button>

                {/* Bouton Descendre */}
                <motion.button
                  onClick={() => {
                    if (activeIndex < timelineEvents.length - 1) {
                      setActiveButton('down');
                      scrollToCard(activeIndex + 1);
                      setTimeout(() => setActiveButton(null), 300);
                    }
                  }}
                  disabled={activeIndex === timelineEvents.length - 1}
                  animate={{
                    scale: activeButton === 'down' ? 1.1 : 1,
                    backgroundColor: activeButton === 'down' ? '#FF5722' : '#FFFFFF',
                    borderColor: activeButton === 'down' ? '#FF5722' : 'rgba(0, 0, 0, 0.1)'
                  }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center gap-2 px-4 py-3 border-2 transition-all duration-300 ${
                    activeIndex === timelineEvents.length - 1
                      ? 'opacity-40 cursor-not-allowed'
                      : 'hover:border-orange-pantone hover:bg-orange-pantone/10 cursor-pointer'
                  }`}
                >
                  <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${
                    activeButton === 'down' ? 'text-white-pure' : 'text-black-deep'
                  }`} />
                  <span className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                    activeButton === 'down' ? 'text-white-pure' : 'text-black-deep'
                  }`}>
                    {t('down')}
                  </span>
                </motion.button>
              </motion.div>

              {/* Vertical Scroll Container */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="flex-1 overflow-y-auto overflow-x-hidden relative"
                style={{
                  scrollbarWidth: 'thin',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {/* Cards container vertical */}
                <div
                  className="w-full flex flex-col items-center gap-16 md:gap-24 relative pt-16 md:pt-24 pb-32 md:pb-48"
                >
                  {/* Vertical connecting line SVG */}
                  <svg className="absolute left-1/2 top-0 w-1 h-full pointer-events-none z-0" style={{ transform: 'translateX(-50%)' }}>
                    <line
                      x1="50%"
                      y1="0"
                      x2="50%"
                      y2="100%"
                      stroke="#E0E0E0"
                      strokeWidth="2"
                      strokeDasharray="10 5"
                    />
                    <motion.line
                      x1="50%"
                      y1="0"
                      x2="50%"
                      y2={`${(activeIndex + 1) * (100 / timelineEvents.length)}%`}
                      stroke="#FF5722"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      style={{
                        filter: 'drop-shadow(0 0 6px rgba(255, 87, 34, 0.8))'
                      }}
                    />
                  </svg>

                  {/* Cards */}
                  {timelineEvents.map((event, index) => (
                    <TimelineCard
                      key={index}
                      event={event}
                      index={index}
                      isActive={index === activeIndex}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

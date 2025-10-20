"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { PriceSimulator } from "@/components/simulator/PriceSimulator";

interface PriceSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PriceSimulatorModal({
  isOpen,
  onClose,
}: PriceSimulatorModalProps) {
  const t = useTranslations("simulator");
  const scrollPositionRef = useRef(0);

  // Prevent body scroll when modal is open and hide header
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      scrollPositionRef.current = window.scrollY;

      // Disable Lenis smooth scroll
      const html = document.documentElement;
      html.classList.add('lenis-stopped');

      // Lock body and html scroll completely
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = "100%";

      html.style.overflow = "hidden";
      html.style.position = "fixed";
      html.style.width = "100%";
      html.style.height = "100%";

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

      html.style.overflow = "";
      html.style.position = "";
      html.style.width = "";
      html.style.height = "";

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
      html.style.overflow = "";
      html.style.position = "";
      html.style.width = "";
      html.style.height = "";
      const header = document.querySelector('header');
      const progressBar = document.querySelector('.fixed.top-0.h-1');
      if (header) (header as HTMLElement).style.display = '';
      if (progressBar) (progressBar as HTMLElement).style.display = '';
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
            className="fixed inset-0 z-[99999] bg-cream overflow-y-scroll overflow-x-hidden"
            style={{
              overflowY: 'scroll',
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain'
            }}
            data-lenis-prevent
          >
            {/* Fixed Header */}
            <div className="sticky top-0 z-[100000] bg-cream backdrop-blur-md border-b border-black-deep/10">
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
                {/* Title */}
                <div className="flex-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-gray-secondary block mb-1">
                    {t("modalTitle")}
                  </span>
                  <h2 className="text-xl md:text-2xl font-medium text-black-deep">
                    {t("modalSubtitle")}
                  </h2>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="w-12 h-12 flex items-center justify-center bg-black-deep hover:bg-orange-pantone text-white-pure transition-all duration-300 group"
                  aria-label="Fermer le simulateur"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                {/* Introduction */}
                <div className="mb-12 text-center max-w-3xl mx-auto">
                  <h3 className="text-3xl font-medium text-black-deep mb-4">
                    {t("intro.title")}
                  </h3>
                  <p className="text-gray-secondary text-lg">
                    {t("intro.description")}
                  </p>
                </div>

                {/* Simulateur */}
                <PriceSimulator />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

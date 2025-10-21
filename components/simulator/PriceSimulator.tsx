"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ProjectTypeSelector } from "./ProjectTypeSelector";
import { DesignOptions } from "./DesignOptions";
import { SectionOptions } from "./SectionOptions";
import { TechnicalFeatures } from "./TechnicalFeatures";
import { PriceSummary } from "./PriceSummary";
import { ChevronDown, ChevronUp } from "lucide-react";

type Section = 'design' | 'structure' | 'technical' | 'performance' | 'content';

interface PriceSimulatorProps {
  onCloseModal?: () => void;
}

export function PriceSimulator({ onCloseModal }: PriceSimulatorProps = {}) {
  const t = useTranslations("simulator");
  const [expandedSections, setExpandedSections] = useState<Section[]>(['design']);

  const toggleSection = (section: Section, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const CollapsibleSection = ({
    id,
    title,
    description,
    children,
  }: {
    id: Section;
    title: string;
    description: string;
    children: React.ReactNode;
  }) => {
    const isExpanded = expandedSections.includes(id);

    return (
      <div className="border border-black-deep/10 bg-white-pure">
        <button
          type="button"
          onClick={(e) => toggleSection(id, e)}
          className="w-full p-6 flex items-center justify-between hover:bg-cream/50 transition-colors"
        >
          <div className="text-left">
            <h3 className="text-xl font-medium text-black-deep mb-1">{title}</h3>
            <p className="text-sm text-gray-secondary">{description}</p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-6 h-6 text-orange-pantone" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 pt-0 border-t border-black-deep/10">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main content - Left side */}
      <div className="lg:col-span-2 space-y-6">
        {/* Type de projet - toujours visible */}
        <div className="bg-white-pure border border-black-deep/10 p-6">
          <ProjectTypeSelector />
        </div>

        {/* Sections repliables */}
        <CollapsibleSection
          id="design"
          title={t("design.title")}
          description={t("design.description")}
        >
          <DesignOptions />
        </CollapsibleSection>

        <CollapsibleSection
          id="structure"
          title={t("structure.title")}
          description={t("structure.description")}
        >
          <SectionOptions />
        </CollapsibleSection>

        <CollapsibleSection
          id="technical"
          title={t("technical.title")}
          description={t("technical.description")}
        >
          <TechnicalFeatures />
        </CollapsibleSection>

        {/* Simplified sections for MVP - can be expanded later */}
        <div className="bg-cream/50 border border-black-deep/5 p-6 text-center">
          <p className="text-gray-secondary text-sm">
            {t("otherOptions.text")}
            <br />
            {t("otherOptions.contact")}
          </p>
        </div>
      </div>

      {/* Summary - Right sticky sidebar */}
      <div className="lg:col-span-1">
        <PriceSummary onCloseModal={onCloseModal} />
      </div>
    </div>
  );
}

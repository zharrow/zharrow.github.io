"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSimulatorStore } from "@/lib/simulator/store";
import { getTTC, getTax, getMonthlyMaintenanceCost } from "@/lib/simulator/store";
import { Calculator, Clock, TrendingUp, Download, Mail } from "lucide-react";
import { useState } from "react";
import { QuoteData } from "@/lib/simulator/types";

interface PriceSummaryProps {
  onCloseModal?: () => void;
}

export function PriceSummary({ onCloseModal }: PriceSummaryProps = {}) {
  const t = useTranslations("simulator");
  const {
    projectType,
    totalPrice,
    estimatedDuration,
    complexity,
    maintenanceOptions,
    designOptions,
    sections,
    technicalFeatures,
    performanceOptions,
    contentOptions,
    reset,
  } = useSimulatorStore();

  const taxAmount = getTax(totalPrice);
  const ttcPrice = getTTC(totalPrice);
  const monthlyMaintenance = getMonthlyMaintenanceCost(maintenanceOptions);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // Convertir les jours en semaines
  const estimatedWeeks = Math.ceil(estimatedDuration / 5);

  // Normaliser la complexité pour la barre de progression (0-200 points → 0-100%)
  // Valeurs de référence : <50 = simple, 50-150 = standard, >150 = complexe
  const complexityPercentage = Math.min((complexity / 200) * 100, 100);

  const hasSelections = projectType !== null;

  // Préparer les données du devis
  const prepareQuoteData = (): QuoteData => {
    return {
      projectType: projectType || '',
      selections: {
        design: designOptions,
        sections,
        technical: technicalFeatures,
        maintenance: maintenanceOptions,
        performance: performanceOptions,
        content: contentOptions,
      },
      pricing: {
        subtotal: totalPrice,
        tax: taxAmount,
        total: ttcPrice,
      },
      estimation: {
        duration: estimatedDuration,
        complexity,
      },
      generatedAt: new Date(),
    };
  };

  // Télécharger le PDF
  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      const quoteData = prepareQuoteData();

      const response = await fetch('/api/generate-quote-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quoteData }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Télécharger le PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `devis_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setDownloadError('Erreur lors du téléchargement du PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  // Envoyer le devis par email (redirige vers le formulaire de contact)
  const handleSendByEmail = () => {
    const quoteData = prepareQuoteData();

    // Stocker les données du devis dans sessionStorage pour les récupérer dans le formulaire
    sessionStorage.setItem('pendingQuote', JSON.stringify(quoteData));

    // Fermer la modale si la fonction est disponible
    if (onCloseModal) {
      onCloseModal();
    }

    // Attendre que la modale se ferme avant de scroller
    setTimeout(() => {
      // Scroll vers la section contact
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300); // Délai pour permettre à la modale de se fermer
  };

  if (!hasSelections) {
    return (
      <div className="sticky top-6 bg-white-pure border border-black-deep/10 p-6">
        <div className="text-center py-8">
          <Calculator className="w-12 h-12 text-gray-secondary/30 mx-auto mb-4" />
          <p className="text-gray-secondary text-sm">
            {t("summary.empty")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-6 bg-white-pure border-2 border-black-deep/10"
    >
      {/* Header */}
      <div className="bg-black-deep text-white-pure p-6">
        <h3 className="text-xl font-medium mb-2">{t("summary.title")}</h3>
        <p className="text-white-pure/70 text-sm">
          {t("summary.subtitle")}
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Prix */}
        <div>
          <div className="flex items-center gap-2 text-orange-pantone mb-3">
            <Calculator size={18} />
            <span className="text-sm uppercase tracking-wider">{t("summary.pricing.label")}</span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-secondary">{t("summary.pricing.ht")}</span>
              <span className="font-medium text-black-deep">{totalPrice.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-secondary">{t("summary.pricing.vat")}</span>
              <span className="font-medium text-black-deep">{taxAmount.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="border-t border-black-deep/10 pt-2 mt-2">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-secondary">{t("summary.pricing.ttc")}</span>
                <span className="text-2xl font-medium text-orange-pantone">
                  {ttcPrice.toLocaleString('fr-FR')} €
                </span>
              </div>
            </div>
          </div>

          {monthlyMaintenance > 0 && (
            <div className="mt-4 p-3 bg-orange-pantone/5 border border-orange-pantone/20">
              <div className="text-xs text-gray-secondary mb-1">{t("summary.pricing.maintenanceLabel")}</div>
              <div className="text-lg font-medium text-orange-pantone">
                {monthlyMaintenance} € {t("summary.pricing.perMonth")}
              </div>
            </div>
          )}
        </div>

        {/* Durée estimée */}
        <div>
          <div className="flex items-center gap-2 text-orange-pantone mb-3">
            <Clock size={18} />
            <span className="text-sm uppercase tracking-wider">{t("summary.duration.label")}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-medium text-black-deep">
                {estimatedWeeks}
              </span>
              <span className="text-gray-secondary">
                {estimatedWeeks > 1 ? t("summary.duration.weeks") : t("summary.duration.week")}
              </span>
            </div>
            <div className="text-xs text-gray-secondary">
              ({estimatedDuration} {t("summary.duration.workingDays")})
            </div>
          </div>
        </div>

        {/* Complexité */}
        <div>
          <div className="flex items-center gap-2 text-orange-pantone mb-3">
            <TrendingUp size={18} />
            <span className="text-sm uppercase tracking-wider">{t("summary.complexity.label")}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-light overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${complexityPercentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{
                    backgroundColor: complexity < 50 ? '#10b981' :
                                   complexity < 150 ? '#FF7A00' :
                                   '#ef4444'
                  }}
                  className="h-full"
                />
              </div>
              <span className="text-sm font-medium text-black-deep w-12 text-right">
                {complexity}
              </span>
            </div>
            <div className="text-xs text-gray-secondary">
              {complexity < 50 && t("summary.complexity.simple")}
              {complexity >= 50 && complexity < 150 && t("summary.complexity.standard")}
              {complexity >= 150 && t("summary.complexity.complex")}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4 border-t border-black-deep/10">
          {downloadError && (
            <div className="text-xs text-red-500 text-center p-2 bg-red-50 border border-red-200">
              {downloadError}
            </div>
          )}

          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="w-full bg-orange-pantone text-white-pure py-4 px-6 hover:bg-black-deep transition-all font-medium uppercase tracking-wide text-sm flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            <span>{isDownloading ? 'Génération...' : t("summary.actions.download")}</span>
          </button>

          <button
            type="button"
            onClick={handleSendByEmail}
            className="w-full bg-black-deep text-white-pure py-4 px-6 hover:bg-orange-pantone transition-all font-medium uppercase tracking-wide text-sm flex items-center justify-center gap-3 group"
          >
            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Envoyer par email</span>
          </button>

          <button
            type="button"
            onClick={reset}
            className="w-full border-2 border-black-deep/20 text-black-deep py-3 px-6 hover:border-orange-pantone hover:text-orange-pantone transition-all font-medium uppercase tracking-wide text-xs"
          >
            {t("summary.actions.reset")}
          </button>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-secondary/70 pt-4 border-t border-black-deep/10">
          {t("summary.disclaimer")}
        </div>
      </div>
    </motion.div>
  );
}

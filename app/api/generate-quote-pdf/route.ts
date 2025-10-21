import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { generateQuotePDF } from '@/components/pdf/QuotePDFTemplate';
import { QuoteData } from '@/lib/simulator/types';
import { simulatorConfig } from '@/lib/simulator/config';

// Configuration de sécurité
const MAX_SELECTIONS = 100; // Limite le nombre total de sélections
const MAX_CONTENT_QUANTITY = 50; // Limite la quantité pour chaque option de contenu
const MAX_PRICE = 100000; // Prix maximum acceptable (100k€)

/**
 * Valide et sanitize les données du devis pour prévenir les injections malveillantes
 */
function validateAndSanitizeQuoteData(data: unknown): QuoteData | null {
  try {
    // Vérification de la structure de base
    if (!data || typeof data !== 'object') {
      return null;
    }

    const quoteData = data as Record<string, unknown>;

    // Validation du type de projet
    if (typeof quoteData.projectType !== 'string') {
      return null;
    }

    const validProjectTypes = simulatorConfig.projectTypes.map(pt => pt.id);
    if (!validProjectTypes.includes(quoteData.projectType)) {
      return null;
    }

    // Validation des sélections
    if (!quoteData.selections || typeof quoteData.selections !== 'object') {
      return null;
    }

    const selections = quoteData.selections as Record<string, unknown>;

    // Validation des options de design
    if (!Array.isArray(selections.design)) {
      return null;
    }
    const validDesignIds = simulatorConfig.designOptions.map(opt => opt.id);
    const sanitizedDesign = selections.design.filter(
      (id: unknown) => typeof id === 'string' && validDesignIds.includes(id)
    );

    // Validation des sections
    if (!Array.isArray(selections.sections)) {
      return null;
    }
    const validSectionIds = simulatorConfig.sectionOptions.map(sec => sec.id);
    const validLevels = ['basic', 'advanced', 'premium'];
    const sanitizedSections = selections.sections.filter((sec: unknown) => {
      const section = sec as Record<string, unknown>;
      return (
        sec &&
        typeof sec === 'object' &&
        typeof section.sectionId === 'string' &&
        validSectionIds.includes(section.sectionId) &&
        typeof section.level === 'string' &&
        validLevels.includes(section.level)
      );
    });

    // Validation des fonctionnalités techniques
    if (!Array.isArray(selections.technical)) {
      return null;
    }
    const validTechnicalIds = simulatorConfig.technicalFeatures.map(feat => feat.id);
    const sanitizedTechnical = selections.technical.filter(
      (id: unknown) => typeof id === 'string' && validTechnicalIds.includes(id)
    );

    // Validation des options de maintenance
    if (!Array.isArray(selections.maintenance)) {
      return null;
    }
    const validMaintenanceIds = simulatorConfig.maintenanceOptions.map(opt => opt.id);
    const sanitizedMaintenance = selections.maintenance.filter(
      (id: unknown) => typeof id === 'string' && validMaintenanceIds.includes(id)
    );

    // Validation des options de performance
    if (!Array.isArray(selections.performance)) {
      return null;
    }
    const validPerformanceIds = simulatorConfig.performanceOptions.map(opt => opt.id);
    const sanitizedPerformance = selections.performance.filter(
      (id: unknown) => typeof id === 'string' && validPerformanceIds.includes(id)
    );

    // Validation des options de contenu
    if (typeof selections.content !== 'object' || Array.isArray(selections.content) || selections.content === null) {
      return null;
    }
    const validContentIds = simulatorConfig.contentOptions.map(opt => opt.id);
    const sanitizedContent: { [key: string]: number } = {};

    for (const [id, quantity] of Object.entries(selections.content as Record<string, unknown>)) {
      if (
        typeof id === 'string' &&
        validContentIds.includes(id) &&
        typeof quantity === 'number' &&
        Number.isInteger(quantity) &&
        quantity > 0 &&
        quantity <= MAX_CONTENT_QUANTITY
      ) {
        sanitizedContent[id] = quantity;
      }
    }

    // Vérification du nombre total de sélections
    const totalSelections =
      sanitizedDesign.length +
      sanitizedSections.length +
      sanitizedTechnical.length +
      sanitizedMaintenance.length +
      sanitizedPerformance.length +
      Object.keys(sanitizedContent).length;

    if (totalSelections > MAX_SELECTIONS) {
      return null;
    }

    // Validation du pricing
    if (!quoteData.pricing || typeof quoteData.pricing !== 'object') {
      return null;
    }

    const pricing = quoteData.pricing as Record<string, unknown>;
    if (
      typeof pricing.subtotal !== 'number' ||
      typeof pricing.tax !== 'number' ||
      typeof pricing.total !== 'number' ||
      pricing.subtotal < 0 ||
      pricing.tax < 0 ||
      pricing.total < 0 ||
      pricing.total > MAX_PRICE
    ) {
      return null;
    }

    // Validation de l'estimation
    if (!quoteData.estimation || typeof quoteData.estimation !== 'object') {
      return null;
    }

    const estimation = quoteData.estimation as Record<string, unknown>;
    if (
      typeof estimation.duration !== 'number' ||
      typeof estimation.complexity !== 'number' ||
      estimation.duration < 0 ||
      estimation.complexity < 0 ||
      estimation.duration > 365 || // Max 1 an
      estimation.complexity > 1000 // Max 1000 points
    ) {
      return null;
    }

    // Validation de la date
    const generatedAt = quoteData.generatedAt ? new Date(quoteData.generatedAt as string) : new Date();
    if (isNaN(generatedAt.getTime())) {
      return null;
    }

    // Retourner les données validées et sanitizées
    return {
      projectType: quoteData.projectType,
      selections: {
        design: sanitizedDesign,
        sections: sanitizedSections,
        technical: sanitizedTechnical,
        maintenance: sanitizedMaintenance,
        performance: sanitizedPerformance,
        content: sanitizedContent,
      },
      pricing: {
        subtotal: pricing.subtotal,
        tax: pricing.tax,
        total: pricing.total,
      },
      estimation: {
        duration: estimation.duration,
        complexity: estimation.complexity,
      },
      generatedAt,
    };
  } catch (error) {
    console.error('Error validating quote data:', error);
    return null;
  }
}

/**
 * Sanitize les données client (nom, numéro de devis)
 */
function sanitizeString(str: string | undefined, maxLength: number = 100): string | undefined {
  if (!str || typeof str !== 'string') {
    return undefined;
  }

  // Supprime les caractères dangereux et limite la longueur
  return str
    .replace(/[<>{}()[\]]/g, '') // Supprime les caractères potentiellement dangereux
    .trim()
    .substring(0, maxLength);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation et sanitization des données du devis
    const validatedQuoteData = validateAndSanitizeQuoteData(body.quoteData);

    if (!validatedQuoteData) {
      return NextResponse.json(
        { error: 'Invalid quote data provided' },
        { status: 400 }
      );
    }

    // Sanitization des données optionnelles
    const clientName = sanitizeString(body.clientName, 100);
    const quoteNumber = sanitizeString(body.quoteNumber, 50);

    // Génération du PDF
    const pdfBuffer = await renderToBuffer(
      generateQuotePDF({
        quoteData: validatedQuoteData,
        clientName,
        quoteNumber,
      })
    );

    // Génération d'un nom de fichier unique et sécurisé
    const now = new Date();
    const timestamp = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeString = now.toTimeString().split(' ')[0].replace(/:/g, ''); // HHMMSS
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase(); // ID aléatoire de 6 caractères

    // Si un nom de client est fourni, l'utiliser dans le nom du fichier
    const safeClientName = clientName?.replace(/[^a-zA-Z0-9-]/g, '_') || '';
    const clientPart = safeClientName ? `${safeClientName}_` : '';

    const filename = `devis_${clientPart}${timestamp}_${timeString}_${randomId}.pdf`;

    // Retourner le PDF
    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

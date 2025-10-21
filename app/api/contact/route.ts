import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { ContactEmailTemplate } from '@/components/emails/ContactEmailTemplate';
import { QuoteEmailTemplate } from '@/components/emails/QuoteEmailTemplate';
import { QuotePDFTemplate } from '@/components/pdf/QuotePDFTemplate';
import { QuoteData } from '@/lib/simulator/types';
import { simulatorConfig } from '@/lib/simulator/config';

// Fonction de validation et sanitization du devis (identique à generate-quote-pdf)
function validateQuoteData(data: unknown): QuoteData | null {
  try {
    if (!data || typeof data !== 'object') return null;

    const quoteData = data as Record<string, unknown>;

    if (typeof quoteData.projectType !== 'string') return null;

    const validProjectTypes = simulatorConfig.projectTypes.map(pt => pt.id);
    if (!validProjectTypes.includes(quoteData.projectType)) return null;

    if (!quoteData.selections || typeof quoteData.selections !== 'object') return null;
    if (!quoteData.pricing || typeof quoteData.pricing !== 'object') return null;
    if (!quoteData.estimation || typeof quoteData.estimation !== 'object') return null;

    const pricing = quoteData.pricing as Record<string, unknown>;

    // Validation basique des prix
    if (typeof pricing.subtotal !== 'number' || pricing.subtotal < 0) return null;
    if (typeof pricing.tax !== 'number' || pricing.tax < 0) return null;
    if (typeof pricing.total !== 'number' || pricing.total < 0) return null;

    return quoteData as unknown as QuoteData;
  } catch (error) {
    console.error('Error validating quote data:', error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, budget, message, quoteData } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nom, email et message sont requis' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Valider le devis s'il est présent
    let validatedQuote: QuoteData | null = null;
    if (quoteData) {
      validatedQuote = validateQuoteData(quoteData);
      if (!validatedQuote) {
        return NextResponse.json(
          { error: 'Données de devis invalides' },
          { status: 400 }
        );
      }
    }

    // Générer le PDF du devis si présent
    let pdfAttachment = null;
    if (validatedQuote) {
      try {
        const pdfBuffer = await renderToBuffer(
          React.createElement(QuotePDFTemplate, {
            quoteData: validatedQuote,
            clientName: name,
          })
        );

        // Convertir le buffer en base64 pour Resend
        const base64Pdf = pdfBuffer.toString('base64');
        const timestamp = new Date().toISOString().split('T')[0];

        pdfAttachment = {
          filename: `devis_${timestamp}.pdf`,
          content: base64Pdf,
        };
      } catch (pdfError) {
        console.error('Error generating PDF:', pdfError);
        // Ne pas bloquer l'envoi si la génération du PDF échoue
        // L'email sera envoyé sans pièce jointe
      }
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');

      // Log the form data for development
      console.log('📧 Contact Form Submission:', {
        name,
        email,
        phone,
        company,
        budget,
        message,
        hasQuote: !!validatedQuote,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        {
          message: 'Message reçu (mode développement - email non envoyé)',
          warning: 'Resend API key not configured'
        },
        { status: 200 }
      );
    }

    // Initialize Resend only if API key is available
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Préparer les options d'email
    interface EmailOptions {
      from: string;
      to: string[];
      replyTo: string;
      subject: string;
      react: React.ReactElement;
      attachments?: Array<{ filename: string; content: string }>;
    }

    const emailOptions: EmailOptions = {
      from: 'Portfolio Contact <contact@florentd.com>', // Changez avec votre domaine vérifié
      to: ['florent.detres@protonmail.com'], // Votre email
      replyTo: email,
      subject: validatedQuote
        ? `Nouveau devis de ${name}${company ? ` - ${company}` : ''} - ${validatedQuote.pricing.total.toLocaleString('fr-FR')} €`
        : `Nouveau message de ${name}${company ? ` - ${company}` : ''}`,
      react: validatedQuote
        ? React.createElement(QuoteEmailTemplate, {
            name,
            email,
            phone,
            company,
            budget,
            message,
            quoteData: validatedQuote,
          })
        : React.createElement(ContactEmailTemplate, {
            name,
            email,
            phone,
            company,
            budget,
            message,
          }),
    };

    // Ajouter la pièce jointe si elle existe
    if (pdfAttachment) {
      emailOptions.attachments = [pdfAttachment];
    }

    // Send email using Resend
    const data = await resend.emails.send(emailOptions);

    return NextResponse.json(
      { message: 'Email envoyé avec succès', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);

    // Return more detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';

    return NextResponse.json(
      {
        error: 'Erreur lors de l\'envoi du message',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

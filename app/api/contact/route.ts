import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmailTemplate } from '@/components/emails/ContactEmailTemplate';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, budget, message } = body;

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

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Portfolio Contact <contact.florentd.com>', // Changez avec votre domaine vérifié
      to: ['florent.detres@protonmail.com'], // Votre email
      replyTo: email,
      subject: `Nouveau message de ${name}${company ? ` - ${company}` : ''}`,
      react: ContactEmailTemplate({
        name,
        email,
        phone,
        company,
        budget,
        message,
      }),
    });

    return NextResponse.json(
      { message: 'Email envoyé avec succès', id: data.id },
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

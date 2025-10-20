import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmailTemplate } from '@/components/emails/ContactEmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Changez avec votre domaine vérifié
      to: ['florent.detres@protonmail.com'], // Votre email
      replyTo: email,
      subject: `Nouveau message de ${name} de la société ${company || 'Unknown'}`,
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
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}

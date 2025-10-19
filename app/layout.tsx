import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Florent Detres | Développeur Full Stack",
  description: "Portfolio de Florent Detres - Développeur web full stack passionné, spécialisé dans la création d'expériences digitales modernes et performantes.",
  keywords: ["développeur", "full stack", "web", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Florent Detres" }],
  openGraph: {
    title: "Florent Detres | Développeur Full Stack",
    description: "Portfolio de Florent Detres - Développeur web full stack",
    type: "website",
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale || 'fr'} className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

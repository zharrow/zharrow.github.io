import ContactPremium from "@/components/sections/ContactPremium";
import SmoothScroll from "@/components/SmoothScroll";
import BackButton from "@/components/ui/back-button";
import MenuGrid from "@/components/ui/menu-grid";
import FooterPremium from "@/components/layout/FooterPremium";
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ContactPage() {
  return (
    <>
      <SmoothScroll />
      <BackButton />
      <MenuGrid />
      <main className="overflow-x-hidden bg-black min-h-screen flex items-center justify-center pt-20">
        <ContactPremium />
      </main>
      <FooterPremium />
    </>
  );
}

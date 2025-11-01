import HeroPremium from "@/components/sections/HeroPremium";
import AboutPremium from "@/components/sections/AboutPremium";
import SmoothScroll from "@/components/SmoothScroll";
import BackButton from "@/components/ui/back-button";
import MenuGrid from "@/components/ui/menu-grid";
import FooterPremium from "@/components/layout/FooterPremium";
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function AboutHeroPage() {
  return (
    <>
      <SmoothScroll />
      <BackButton />
      <MenuGrid />
      <main className="overflow-x-hidden bg-black">
        <HeroPremium />
        <AboutPremium />
      </main>
      <FooterPremium />
    </>
  );
}

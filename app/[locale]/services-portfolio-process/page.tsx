import ServicesPremium from "@/components/sections/ServicesPremium";
import PortfolioPremium from "@/components/sections/PortfolioPremium";
import ProcessPremium from "@/components/sections/ProcessPremium";
import SmoothScroll from "@/components/SmoothScroll";
import BackButton from "@/components/ui/back-button";
import MenuGrid from "@/components/ui/menu-grid";
import FooterPremium from "@/components/layout/FooterPremium";
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ServicesPortfolioProcessPage() {
  return (
    <>
      <SmoothScroll />
      <BackButton />
      <MenuGrid />
      <main className="overflow-x-hidden bg-black pt-20">
        <ServicesPremium />
        <PortfolioPremium />
        <ProcessPremium />
      </main>
      <FooterPremium />
    </>
  );
}

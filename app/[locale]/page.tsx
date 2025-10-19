import HeaderPremium from "@/components/layout/HeaderPremium";
import FooterPremium from "@/components/layout/FooterPremium";
import HeroPremium from "@/components/sections/HeroPremium";
import ServicesPremium from "@/components/sections/ServicesPremium";
import PortfolioPremium from "@/components/sections/PortfolioPremium";
import ProcessPremium from "@/components/sections/ProcessPremium";
import AboutPremium from "@/components/sections/AboutPremium";
import ContactPremium from "@/components/sections/ContactPremium";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <HeaderPremium />
      <main className="overflow-x-hidden">
        <HeroPremium />
        <ServicesPremium />
        <PortfolioPremium />
        <ProcessPremium />
        <AboutPremium />
        <ContactPremium />
      </main>
      <FooterPremium />
    </>
  );
}

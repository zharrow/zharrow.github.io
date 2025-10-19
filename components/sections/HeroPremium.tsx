"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function HeroPremium() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-cream px-6 md:px-12 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0A0A0A 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-container mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[1.1] tracking-[-0.02em] text-black-deep">
            {t("title")}{" "}
            <span className="text-orange-pantone inline-block">
              {t("titleHighlight")}
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(1.125rem,2vw,1.5rem)] text-gray-secondary max-w-3xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button
              asChild
              size="lg"
              className="bg-black-deep text-white-pure hover:bg-gray-secondary transition-all duration-500 px-8 py-6 text-base font-medium rounded-none group"
            >
              <a href="#portfolio" className="relative overflow-hidden">
                <span className="relative z-10">{t("viewProjects")}</span>
                <span className="absolute inset-0 bg-orange-pantone transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-black-deep text-black-deep hover:bg-black-deep hover:text-white-pure transition-all duration-500 px-8 py-6 text-base font-medium rounded-none"
            >
              <a href="#contact" className="link-underline">
                {t("contactMe")}
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <a
            href="#services"
            className="flex flex-col items-center gap-2 text-gray-secondary hover:text-black-deep transition-colors duration-500"
          >
            <span className="text-sm tracking-wide uppercase">{t("scrollDown")}</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-16 bg-gray-secondary"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

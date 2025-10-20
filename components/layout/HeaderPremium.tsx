"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function HeaderPremium() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { href: "#accueil", label: t("home"), id: "accueil" },
    { href: "#services", label: t("services"), id: "services" },
    { href: "#portfolio", label: t("portfolio"), id: "portfolio" },
    { href: "#apropos", label: t("about"), id: "apropos" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);

      // Detect active section
      const sections = navItems.map(item => item.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-pantone via-black-deep to-orange-pantone z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          isScrolled
            ? "bg-cream/95 backdrop-blur-sm border-b border-black-deep/8 mt-1"
            : "bg-transparent mt-1"
        )}
      >
      <nav className="max-w-[1280px] mx-auto px-6 md:px-12 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#accueil"
            className="text-xl font-medium text-black-deep tracking-tight hover:text-orange-pantone transition-colors duration-500"
            whileHover={{ x: 2 }}
          >
            Florent Detres
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-12">
            {navItems.map((item, index) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <a
                  href={item.href}
                  className={cn(
                    "text-sm text-gray-secondary hover:text-black-deep transition-colors duration-500 link-underline uppercase tracking-[0.1em]",
                    activeSection === item.id && "text-orange-pantone"
                  )}
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center gap-6"
            >
              <LanguageSwitcher />
              <a
                href="#contact"
                className="px-6 py-3 bg-black-deep text-white-pure hover:bg-orange-pantone transition-all duration-500 text-sm font-medium tracking-wide uppercase group relative overflow-hidden"
              >
                <span className="relative z-10">{t("contactMe")}</span>
                <span className="absolute inset-0 bg-orange-pantone transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </a>
            </motion.li>
          </ul>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <a
              href="#contact"
              className="px-4 py-2 bg-black-deep text-white-pure text-sm font-medium"
            >
              {t("contactMe")}
            </a>
          </div>
        </div>
      </nav>
    </motion.header>
    </>
  );
}

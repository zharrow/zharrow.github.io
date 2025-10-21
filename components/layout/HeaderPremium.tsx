"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function HeaderPremium() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  // Use spring animations for ultra-smooth transitions
  const indicatorLeft = useSpring(0, { stiffness: 200, damping: 25, mass: 0.5 });
  const indicatorWidth = useSpring(0, { stiffness: 200, damping: 25, mass: 0.5 });

  const navItems = [
    { href: "#accueil", label: t("home"), id: "accueil" },
    { href: "#services", label: t("services"), id: "services" },
    { href: "#portfolio", label: t("portfolio"), id: "portfolio" },
    { href: "#process", label: t("process"), id: "process" },
    { href: "#apropos", label: t("about"), id: "apropos" },
    { href: "#contact", label: t("contactMe"), id: "contact" },
  ];

  // Update active indicator position with spring physics
  useEffect(() => {
    const activeLink = navRefs.current[activeSection];

    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink;
      indicatorLeft.set(offsetLeft);
      indicatorWidth.set(offsetWidth);
    }
  }, [activeSection, indicatorLeft, indicatorWidth]);

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
  }, [navItems]);

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
      <nav className="max-w-[1290px] mx-auto px-6 md:px-12 py-6">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <motion.a
            href="#accueil"
            className="text-xl font-medium text-black-deep tracking-tight hover:text-orange-pantone transition-colors duration-500"
            whileHover={{ scale: 1.05 }}
          >
            Florent Detres
          </motion.a>

          {/* Desktop Navigation and Language Switcher */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-12 relative">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                >
                  <a
                    ref={(el) => { navRefs.current[item.id] = el; }}
                    href={item.href}
                    className={cn(
                      "text-sm text-gray-secondary hover:text-black-deep transition-colors duration-500 uppercase tracking-[0.1em] relative pb-1",
                      activeSection === item.id && "text-orange-pantone"
                    )}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}

              {/* Animated Active Indicator */}
              <motion.div
                className="absolute bottom-0 h-0.5 bg-orange-pantone"
                style={{
                  left: indicatorLeft,
                  width: indicatorWidth,
                  boxShadow: "0 0 8px rgba(255, 87, 34, 0.6)"
                }}
              />
            </ul>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="#contact"
              className="relative px-5 py-2.5 bg-orange-pantone text-white-pure text-xs font-medium tracking-wide uppercase group overflow-hidden border border-orange-pantone"
            >
              <span className="absolute inset-0 bg-black-deep transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t("contactMe")}
              </span>
            </a>
          </div>
        </div>
      </nav>
    </motion.header>
    </>
  );
}

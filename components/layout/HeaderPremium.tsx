"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function HeaderPremium() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { href: "#accueil", label: t("home") },
    { href: "#services", label: t("services") },
    { href: "#portfolio", label: t("portfolio") },
    { href: "#apropos", label: t("about") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        isScrolled
          ? "bg-cream/95 backdrop-blur-sm border-b border-black-deep/8"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-container mx-auto px-6 md:px-12 py-6">
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
                  className="text-sm text-gray-secondary hover:text-black-deep transition-colors duration-500 link-underline uppercase tracking-[0.1em]"
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
  );
}

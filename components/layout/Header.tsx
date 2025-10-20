"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { href: "#accueil", label: t("home"), id: "accueil" },
    { href: "#services", label: t("services"), id: "services" },
    { href: "#portfolio", label: t("portfolio"), id: "portfolio" },
    { href: "#apropos", label: t("about"), id: "apropos" },
    { href: "#contact", label: t("contact"), id: "contact" },
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
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-gold via-accent-copper to-accent-gold z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-dark-900/80 backdrop-blur-lg shadow-lg mt-1"
            : "bg-transparent mt-1"
        )}
      >
        <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#accueil"
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            FD
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  className={cn(
                    "text-primary-100 hover:text-accent-gold transition-colors duration-300 relative group",
                    activeSection === item.id && "text-accent-gold"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-accent-gold transition-all duration-300",
                      activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  ></span>
                </a>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.1 }}
              className="flex items-center gap-2"
            >
              <LanguageSwitcher />
              <Button
                asChild
                className="bg-accent-gold hover:bg-accent-copper text-dark-900 rounded-full font-medium transition-all duration-300"
              >
                <a href="#contact">{t("contactMe")}</a>
              </Button>
            </motion.li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <ul className="flex flex-col gap-4 py-6">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-primary-100 hover:text-accent-gold transition-colors duration-300 text-lg"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <Button
                    asChild
                    className="w-full bg-accent-gold hover:bg-accent-copper text-dark-900 rounded-full font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <a href="#contact">{t("contactMe")}</a>
                  </Button>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
    </>
  );
}

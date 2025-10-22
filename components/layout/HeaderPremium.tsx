"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function HeaderPremium() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on navigation
  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center border border-black-deep/20 hover:border-orange-pantone hover:bg-orange-pantone hover:text-white-pure text-black-deep transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>
    </motion.header>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black-deep/50 backdrop-blur-sm md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-sm bg-cream border-l border-black-deep/10 md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black-deep/10">
                <span className="text-lg font-medium text-black-deep">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center border border-black-deep/20 hover:border-orange-pantone hover:bg-orange-pantone hover:text-white-pure text-black-deep transition-all duration-300"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-8 px-6">
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index, duration: 0.3 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "block px-4 py-4 text-base font-medium transition-all duration-300 border-l-2",
                          activeSection === item.id
                            ? "border-orange-pantone text-orange-pantone bg-orange-pantone/5"
                            : "border-transparent text-gray-secondary hover:text-black-deep hover:border-black-deep/20 hover:bg-black-deep/5"
                        )}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer CTA */}
              <div className="p-6 border-t border-black-deep/10">
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-6 py-4 bg-orange-pantone text-white-pure text-center text-sm font-medium tracking-wide uppercase hover:bg-black-deep transition-colors duration-300"
                >
                  {t("contactMe")}
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}

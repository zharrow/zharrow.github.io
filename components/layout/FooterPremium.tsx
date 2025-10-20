"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";

const socialLinks = [
  { icon: Github, href: "https://github.com/zharrow", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:florent.detres@protonmail.com", label: "Email" },
];

export default function FooterPremium() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black-deep text-white-pure py-16">
      <div className="section-container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-medium mb-4 tracking-tight">
              {t("brand.name")}
            </h3>
            <p className="text-gray-secondary text-sm leading-relaxed max-w-xs">
              {t("brand.description")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-gray-secondary mb-6">
              {t("navigation.title")}
            </h4>
            <ul className="space-y-3">
              {(["home", "services", "portfolio", "about", "contact"] as const).map((item) => (
                <li key={item}>
                  <a
                    href={`#${item === "home" ? "" : item === "about" ? "apropos" : item}`}
                    className="text-white-pure/70 hover:text-orange-pantone transition-colors duration-500 text-sm link-underline inline-block"
                  >
                    {t(`navigation.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-gray-secondary mb-6">
              {t("social.title")}
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -2 }}
                    className="w-10 h-10 flex items-center justify-center border border-white-pure/20 hover:border-orange-pantone hover:bg-orange-pantone text-white-pure transition-all duration-500"
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white-pure/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-secondary">
          <p>
            © {currentYear} {t("brand.name")}. {t("copyright")}
          </p>
          <p className="flex items-center gap-2">
            {t("madeIn")}
          </p>
        </div>
      </div>
    </footer>
  );
}

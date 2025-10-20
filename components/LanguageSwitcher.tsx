"use client";

import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Globe, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "@/i18n/routing";

const languages = [
  { code: "fr", name: "Français", nativeName: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = (params.locale as string) || "fr";
  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-auto px-3 py-2 hover:bg-cream/50 transition-colors border border-black-deep/10"
          disabled={isPending}
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-orange-pantone" />
            <span className="text-sm font-medium text-black-deep">
              {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
            </span>
          </div>
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 bg-white-pure border-2 border-black-deep/10 p-3"
      >
        {languages.map((language) => {
          const isActive = currentLocale === language.code;

          return (
            <DropdownMenuItem
              key={language.code}
              onClick={() => onSelectChange(language.code)}
              className={`
                cursor-pointer px-4 py-3 mb-1 last:mb-0 transition-all rounded-sm
                hover:bg-orange-pantone/10
                ${isActive ? "bg-orange-pantone/5" : ""}
              `}
            >
              <motion.div
                className="flex items-center justify-between w-full"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div className="flex flex-col">
                    <span className={`text-sm font-medium ${isActive ? "text-orange-pantone" : "text-black-deep"}`}>
                      {language.nativeName}
                    </span>
                    <span className="text-xs text-gray-secondary">
                      {language.name}
                    </span>
                  </div>
                </div>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-4 h-4 text-orange-pantone" />
                  </motion.div>
                )}
              </motion.div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

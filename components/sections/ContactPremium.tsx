"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Confetti } from "@/components/ui/confetti";

export default function ContactPremium() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("form.error"));
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", budget: "", message: "" });

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : t("form.error"));

      setTimeout(() => {
        setSubmitStatus("idle");
        setErrorMessage("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 md:py-40 bg-gray-light">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-gray-secondary mb-4 block">
            {t("label")}
          </span>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-tight tracking-[-0.02em] text-black-deep">
            {t("title")}{" "}
            <span className="text-orange-pantone">{t("titleHighlight")}</span>
          </h2>
          <p className="text-gray-secondary mt-6 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            {/* Email */}
            <div className="group bg-white-pure border border-black-deep/10 p-8 hover:border-orange-pantone transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 flex-shrink-0 border border-black-deep/20 flex items-center justify-center group-hover:border-orange-pantone group-hover:bg-orange-pantone transition-all duration-500">
                  <Mail className="w-6 h-6 text-black-deep group-hover:text-white-pure transition-colors duration-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gray-secondary mb-3">
                    {t("info.email")}
                  </h3>
                  <a
                    href="mailto:florent.detres@protonmail.com"
                    className="text-base text-black-deep hover:text-orange-pantone transition-colors duration-500 link-underline inline-block font-medium"
                  >
                    florent.detres@protonmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="group bg-white-pure border border-black-deep/10 p-8 hover:border-orange-pantone transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 flex-shrink-0 border border-black-deep/20 flex items-center justify-center group-hover:border-orange-pantone group-hover:bg-orange-pantone transition-all duration-500">
                  <MapPin className="w-6 h-6 text-black-deep group-hover:text-white-pure transition-colors duration-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gray-secondary mb-3">
                    {t("info.location")}
                  </h3>
                  <p className="text-base text-black-deep font-medium mb-2">{t("info.locationCountry")}</p>
                  <p className="text-sm text-gray-secondary">
                    {t("info.locationDetails")}
                  </p>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-black-deep p-8 border border-black-deep">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-orange-pantone rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white-pure uppercase tracking-[0.2em]">
                  {t("info.availability.status")}
                </span>
              </div>
              <p className="text-base text-white-pure/80 leading-relaxed">
                {t("info.availability.description")}
              </p>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="relative bg-cream border-2 border-black-deep/10 p-12 md:p-16 group hover:border-black-deep/20 transition-all duration-500">
              {/* Decorative Corner Element */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-orange-pantone opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-orange-pantone opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="space-y-8">
                {/* Name & Email on same row for desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="block text-xs uppercase tracking-[0.2em] text-gray-secondary mb-4 font-medium"
                    >
                      {t("form.name")}
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white-pure border-2 border-black-deep/10 focus:border-orange-pantone rounded-none h-14 text-base px-4 transition-all duration-300 hover:border-black-deep/20"
                      placeholder={t("form.namePlaceholder")}
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-xs uppercase tracking-[0.2em] text-gray-secondary mb-4 font-medium"
                    >
                      {t("form.email")}
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white-pure border-2 border-black-deep/10 focus:border-orange-pantone rounded-none h-14 text-base px-4 transition-all duration-300 hover:border-black-deep/20"
                      placeholder={t("form.emailPlaceholder")}
                    />
                  </div>
                </div>

                {/* Phone & Company on same row for desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Phone */}
                  <div className="relative">
                    <label
                      htmlFor="phone"
                      className="block text-xs uppercase tracking-[0.2em] text-gray-secondary mb-4 font-medium"
                    >
                      {t("form.phone")} <span className="text-gray-secondary/50">{t("form.phoneOptional")}</span>
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white-pure border-2 border-black-deep/10 focus:border-orange-pantone rounded-none h-14 text-base px-4 transition-all duration-300 hover:border-black-deep/20"
                      placeholder={t("form.phonePlaceholder")}
                    />
                  </div>

                  {/* Company */}
                  <div className="relative">
                    <label
                      htmlFor="company"
                      className="block text-xs uppercase tracking-[0.2em] text-gray-secondary mb-4 font-medium"
                    >
                      {t("form.company")} <span className="text-gray-secondary/50">{t("form.companyOptional")}</span>
                    </label>
                    <Input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-white-pure border-2 border-black-deep/10 focus:border-orange-pantone rounded-none h-14 text-base px-4 transition-all duration-300 hover:border-black-deep/20"
                      placeholder={t("form.companyPlaceholder")}
                    />
                  </div>
                </div>

                {/* Budget */}
                <div className="relative">
                  <label
                    htmlFor="budget"
                    className="block text-xs uppercase tracking-[0.2em] text-gray-secondary mb-4 font-medium"
                  >
                    {t("form.budget")} <span className="text-gray-secondary/50">{t("form.budgetOptional")}</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange as any}
                    className="w-full bg-white-pure border-2 border-black-deep/10 focus:border-orange-pantone rounded-none h-14 text-base px-4 transition-all duration-300 hover:border-black-deep/20 cursor-pointer"
                  >
                    <option value="">{t("form.budgetPlaceholder")}</option>
                    <option value="< 5k">{t("form.budgetOptions.lessThan5k")}</option>
                    <option value="5k-10k">{t("form.budgetOptions.5kTo10k")}</option>
                    <option value="10k-20k">{t("form.budgetOptions.10kTo20k")}</option>
                    <option value="20k-50k">{t("form.budgetOptions.20kTo50k")}</option>
                    <option value="> 50k">{t("form.budgetOptions.moreThan50k")}</option>
                  </select>
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-[0.2em] text-gray-secondary mb-4 font-medium"
                  >
                    {t("form.message")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    className="w-full bg-white-pure border-2 border-black-deep/10 focus:border-orange-pantone rounded-none resize-none text-base px-4 py-4 transition-all duration-300 hover:border-black-deep/20 leading-relaxed"
                    placeholder={t("form.messagePlaceholder")}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-secondary/50">
                    {formData.message.length} {t("form.characterCount")}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto md:min-w-[300px] h-16 bg-black-deep text-white-pure hover:bg-orange-pantone transition-all duration-500 text-sm font-medium tracking-[0.15em] uppercase disabled:opacity-50 group/btn relative overflow-hidden px-12"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white-pure/30 border-t-white-pure rounded-full animate-spin" />
                          {t("form.sending")}
                        </>
                      ) : submitStatus === "success" ? (
                        <>
                          ✓ {t("form.success")}
                        </>
                      ) : (
                        <>
                          {t("form.submit")}
                          <Send size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </>
                      )}
                    </span>
                    {!isSubmitting && submitStatus === "idle" && (
                      <span className="absolute inset-0 bg-orange-pantone transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left" />
                    )}
                  </button>

                  <p className="text-xs text-gray-secondary mt-4 flex items-center gap-2">
                    <span className="w-1 h-1 bg-orange-pantone rounded-full" />
                    {t("form.responseGuarantee")}
                  </p>
                </div>

                {/* Confetti Animation */}
                <Confetti trigger={submitStatus === "success"} />

                {/* Success Message */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-orange-pantone/10 border-l-4 border-orange-pantone"
                  >
                    <p className="text-sm text-black-deep font-medium">
                      {t("form.successMessage")}
                    </p>
                  </motion.div>
                )}

                {/* Error Message */}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-red-500/10 border-l-4 border-red-500"
                  >
                    <p className="text-sm text-black-deep font-medium">
                      ✗ {errorMessage || t("form.error")}
                    </p>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

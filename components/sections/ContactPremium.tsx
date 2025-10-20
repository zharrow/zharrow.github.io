"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Confetti } from "@/components/ui/confetti";

export default function ContactPremium() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", budget: "", message: "" });

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }, 2000);
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
            Contact
          </span>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-tight tracking-[-0.02em] text-black-deep">
            Travaillons{" "}
            <span className="text-orange-pantone">ensemble</span>
          </h2>
          <p className="text-gray-secondary mt-6 max-w-2xl mx-auto">
            Une idée, un projet ? Parlons-en autour d'un café virtuel
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
                    Email
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
                    Localisation
                  </h3>
                  <p className="text-base text-black-deep font-medium mb-2">France</p>
                  <p className="text-sm text-gray-secondary">
                    Remote & disponible pour déplacements
                  </p>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-black-deep p-8 border border-black-deep">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-orange-pantone rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white-pure uppercase tracking-[0.2em]">
                  Disponible
                </span>
              </div>
              <p className="text-base text-white-pure/80 leading-relaxed">
                Actuellement disponible pour de nouveaux projets. Réponse sous 24h garantie.
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
              <div className="absolute top-corner w-20 h-20 border-t-2 border-r-2 border-orange-pantone opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-corner w-20 h-20 border-b-2 border-l-2 border-orange-pantone opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="space-y-8">
                {/* Name & Email on same row for desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="block text-xs uppercase tracking-[0.2em] text-gray-secondary mb-4 font-medium"
                    >
                      Nom complet
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white-pure border-2 border-black-deep/10 focus:border-orange-pantone rounded-none h-14 text-base px-4 transition-all duration-300 hover:border-black-deep/20"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-xs uppercase tracking-[0.2em] text-gray-secondary mb-4 font-medium"
                    >
                      Adresse email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white-pure border-2 border-black-deep/10 focus:border-orange-pantone rounded-none h-14 text-base px-4 transition-all duration-300 hover:border-black-deep/20"
                      placeholder="jean.dupont@email.com"
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
                      Téléphone <span className="text-gray-secondary/50">(Optionnel)</span>
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white-pure border-2 border-black-deep/10 focus:border-orange-pantone rounded-none h-14 text-base px-4 transition-all duration-300 hover:border-black-deep/20"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>

                  {/* Company */}
                  <div className="relative">
                    <label
                      htmlFor="company"
                      className="block text-xs uppercase tracking-[0.2em] text-gray-secondary mb-4 font-medium"
                    >
                      Entreprise <span className="text-gray-secondary/50">(Optionnel)</span>
                    </label>
                    <Input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-white-pure border-2 border-black-deep/10 focus:border-orange-pantone rounded-none h-14 text-base px-4 transition-all duration-300 hover:border-black-deep/20"
                      placeholder="Votre entreprise"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div className="relative">
                  <label
                    htmlFor="budget"
                    className="block text-xs uppercase tracking-[0.2em] text-gray-secondary mb-4 font-medium"
                  >
                    Budget estimé <span className="text-gray-secondary/50">(Optionnel)</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange as any}
                    className="w-full bg-white-pure border-2 border-black-deep/10 focus:border-orange-pantone rounded-none h-14 text-base px-4 transition-all duration-300 hover:border-black-deep/20 cursor-pointer"
                  >
                    <option value="">Sélectionnez une fourchette</option>
                    <option value="< 5k">Moins de 5 000 €</option>
                    <option value="5k-10k">5 000 € - 10 000 €</option>
                    <option value="10k-20k">10 000 € - 20 000 €</option>
                    <option value="20k-50k">20 000 € - 50 000 €</option>
                    <option value="> 50k">Plus de 50 000 €</option>
                  </select>
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-[0.2em] text-gray-secondary mb-4 font-medium"
                  >
                    Votre message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    className="w-full bg-white-pure border-2 border-black-deep/10 focus:border-orange-pantone rounded-none resize-none text-base px-4 py-4 transition-all duration-300 hover:border-black-deep/20 leading-relaxed"
                    placeholder="Parlez-moi de votre projet, vos objectifs et vos besoins..."
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-secondary/50">
                    {formData.message.length} caractères
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
                          Envoi en cours...
                        </>
                      ) : submitStatus === "success" ? (
                        <>
                          ✓ Message envoyé !
                        </>
                      ) : (
                        <>
                          Envoyer le message
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
                    Réponse garantie sous 24h
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
                      ✓ Merci pour votre message ! Je vous répondrai dans les plus brefs délais.
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

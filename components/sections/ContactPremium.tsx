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
      setFormData({ name: "", email: "", message: "" });

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
            <form onSubmit={handleSubmit} className="space-y-8 bg-white-pure border border-black-deep/10 p-12 md:p-16">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm uppercase tracking-[0.15em] text-gray-secondary mb-3"
                >
                  Nom
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-black-deep/10 focus:border-orange-pantone rounded-none h-14 text-base"
                  placeholder="Votre nom"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm uppercase tracking-[0.15em] text-gray-secondary mb-3"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-black-deep/10 focus:border-orange-pantone rounded-none h-14 text-base"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm uppercase tracking-[0.15em] text-gray-secondary mb-3"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="w-full border-black-deep/10 focus:border-orange-pantone rounded-none resize-none text-base"
                  placeholder="Parlez-moi de votre projet..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 bg-black-deep text-white-pure hover:bg-orange-pantone transition-all duration-500 text-base font-medium tracking-wide uppercase disabled:opacity-50 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : submitStatus === "success" ? (
                    "Message envoyé !"
                  ) : (
                    <>
                      <Send size={18} />
                      Envoyer le message
                    </>
                  )}
                </span>
                {!isSubmitting && submitStatus === "idle" && (
                  <span className="absolute inset-0 bg-orange-pantone transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                )}
              </button>

              {/* Confetti Animation */}
              <Confetti trigger={submitStatus === "success"} />

              {/* Success Message */}
              {submitStatus === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-orange-pantone text-center"
                >
                  Merci ! Je vous répondrai dans les plus brefs délais.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

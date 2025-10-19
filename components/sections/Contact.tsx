"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "florent.detres@protonmail.com",
    href: "mailto:florent.detres@protonmail.com",
  },
  {
    icon: Phone,
    title: "Téléphone",
    value: "+33 6 XX XX XX XX",
    href: "tel:+33600000000",
  },
  {
    icon: MapPin,
    title: "Localisation",
    value: "France",
    href: null,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

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

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-dark-950 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-accent-gold rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-accent-gold text-sm font-semibold tracking-wider uppercase mb-4"
          >
            Contact
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-50 mb-6">
            Travaillons{" "}
            <span className="gradient-text">ensemble</span>
          </h2>
          <p className="text-xl text-primary-300 max-w-2xl mx-auto">
            Une idée, un projet ? N'hésitez pas à me contacter, je serais ravi
            d'en discuter avec vous.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
              <h3 className="text-2xl font-bold text-primary-50 mb-6">
                Informations de contact
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-gold to-accent-copper p-0.5 flex-shrink-0">
                      <div className="w-full h-full bg-dark-800 rounded-lg flex items-center justify-center">
                        <info.icon className="text-primary-50" size={20} />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-primary-400 mb-1">
                        {info.title}
                      </div>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-primary-100 hover:text-accent-gold transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-primary-100">{info.value}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Availability Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 p-4 rounded-lg bg-accent-sage/10 border border-accent-sage/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-accent-sage animate-pulse"></div>
                  <span className="text-accent-sage font-semibold">
                    Disponible pour des missions
                  </span>
                </div>
                <p className="text-sm text-primary-400">
                  Je suis actuellement disponible pour de nouveaux projets.
                  Réponse sous 24h garantie.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-primary-300 mb-2"
                  >
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-primary-100 placeholder-primary-500 focus:outline-none focus:border-accent-gold transition-colors"
                    placeholder="Votre nom"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-primary-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-primary-100 placeholder-primary-500 focus:outline-none focus:border-accent-gold transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-primary-300 mb-2"
                >
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-primary-100 placeholder-primary-500 focus:outline-none focus:border-accent-gold transition-colors"
                  placeholder="De quoi souhaitez-vous parler ?"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-primary-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-primary-100 placeholder-primary-500 focus:outline-none focus:border-accent-gold transition-colors resize-none"
                  placeholder="Décrivez votre projet ou votre besoin..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  isSubmitting
                    ? "bg-dark-700 text-primary-500 cursor-not-allowed"
                    : submitStatus === "success"
                    ? "bg-accent-sage text-dark-900"
                    : "bg-accent-gold text-dark-900 hover:bg-accent-copper shadow-lg hover:shadow-accent-gold/50"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    Envoi en cours...
                  </>
                ) : submitStatus === "success" ? (
                  <>
                    Message envoyé !
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Envoyer le message
                  </>
                )}
              </motion.button>

              {/* Success Message */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-accent-sage/10 border border-accent-sage/30 rounded-lg text-accent-sage text-center"
                >
                  Merci pour votre message ! Je vous répondrai dans les plus brefs délais.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

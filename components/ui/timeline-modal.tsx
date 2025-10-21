"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, GraduationCap } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  company: string;
  description: string;
  type: "work" | "education";
}

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2024",
    title: "Développeur Full Stack Senior",
    company: "Freelance",
    description: "Développement d'applications web premium pour clients internationaux",
    type: "work"
  },
  {
    year: "2022",
    title: "Lead Developer",
    company: "Agence Digitale",
    description: "Direction technique et développement de solutions e-commerce Shopify Plus",
    type: "work"
  },
  {
    year: "2020",
    title: "Développeur Full Stack",
    company: "Startup Tech",
    description: "Développement de SaaS et applications React/Node.js",
    type: "work"
  },
  {
    year: "2019",
    title: "Master Développement Web",
    company: "Université",
    description: "Spécialisation en développement web moderne et architecture logicielle",
    type: "education"
  },
];

export function TimelineModal({ isOpen, onClose }: TimelineModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black-deep/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-cream max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-cream border-b border-black-deep/10 p-8 flex items-center justify-between z-10">
                <h2 className="text-3xl font-medium text-black-deep">Mon Parcours</h2>
                <button
                  onClick={onClose}
                  className="w-12 h-12 flex items-center justify-center border border-black-deep/10 hover:border-orange-pantone hover:bg-orange-pantone text-black-deep hover:text-white-pure transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Timeline */}
              <div className="p-8 md:p-12">
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-black-deep/10" />

                  {timelineEvents.map((event, index) => {
                    const Icon = event.type === "work" ? Briefcase : GraduationCap;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className="relative pl-20 pb-12 last:pb-0"
                      >
                        {/* Icon */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: index * 0.1 + 0.2,
                            duration: 0.3,
                            ease: "backOut"
                          }}
                          className="absolute left-0 w-16 h-16 flex items-center justify-center border-2 border-orange-pantone bg-cream group hover:bg-orange-pantone transition-colors duration-300"
                        >
                          <Icon className="w-7 h-7 text-orange-pantone group-hover:text-white-pure transition-colors duration-300" />
                        </motion.div>

                        {/* Content */}
                        <div className="bg-white-pure border border-black-deep/10 p-6 hover:border-orange-pantone transition-all duration-300 group">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-medium text-black-deep mb-1 group-hover:text-orange-pantone transition-colors duration-300">
                                {event.title}
                              </h3>
                              <p className="text-sm text-gray-secondary">{event.company}</p>
                            </div>
                            <span className="text-sm font-medium text-orange-pantone px-3 py-1 border border-orange-pantone/20 bg-orange-pantone/5">
                              {event.year}
                            </span>
                          </div>
                          <p className="text-gray-secondary leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion } from "framer-motion";
import { Code, Palette, Server, Wrench } from "lucide-react";

interface ExpertiseItem {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: Array<{
    name: string;
    years: string;
  }>;
}

interface ExpertiseTimelineProps {
  expertise: ExpertiseItem[];
}

const iconComponents = {
  Code,
  Palette,
  Server,
  Wrench,
};

export function ExpertiseTimeline({ expertise }: ExpertiseTimelineProps) {
  return (
    <div className="space-y-8">
      {expertise.map((category, categoryIndex) => {
        const Icon = category.icon;

        return (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: categoryIndex * 0.15,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center border border-black-deep/20 group-hover:border-orange-pantone group-hover:bg-orange-pantone transition-all duration-500">
                <Icon className="w-5 h-5 text-black-deep group-hover:text-white-pure transition-colors duration-500" />
              </div>
              <h4 className="text-lg font-medium text-black-deep group-hover:text-orange-pantone transition-colors duration-500">
                {category.category}
              </h4>
            </div>

            {/* Skills List */}
            <div className="pl-6 border-l-2 border-black-deep/10 group-hover:border-orange-pantone/30 transition-colors duration-500 space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: categoryIndex * 0.15 + skillIndex * 0.08,
                    duration: 0.4,
                  }}
                  className="flex items-center justify-between py-2 px-4 bg-gray-light/50 hover:bg-orange-pantone/5 border border-transparent hover:border-orange-pantone/20 transition-all duration-300"
                >
                  <span className="text-sm text-gray-secondary font-medium">
                    {skill.name}
                  </span>
                  <span className="text-xs text-orange-pantone font-medium px-3 py-1 bg-orange-pantone/10 border border-orange-pantone/20">
                    {skill.years}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

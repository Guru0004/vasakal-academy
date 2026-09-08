import React from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Trophy, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import { PROGRAMS, ENROLLMENT_FORM_URL } from "../../data/academyData";

const iconMap = {
  BookOpen: BookOpen,
  GraduationCap: GraduationCap,
  Trophy: Trophy
};

// Real Unsplash images matching each program type
const programImages = [
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80&fit=crop", // Foundation - young students at desk
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80&fit=crop", // Advanced - high school students studying
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80&fit=crop"  // Competitive - focused student studying
];

export const ProgramsSection = () => {
  return (
    <section id="programs" className="py-24 relative bg-[#F7F9FC] dark:bg-[#0B2552]/40 border-y border-[#DCE3EC] dark:border-[#29446D]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#12366B] dark:text-blue-300">
            Pathways to Excellence
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#071A3D] dark:text-white mt-2 mb-3 sm:mb-4">
            Our Structured Programs
          </h2>
          <p className="text-sm sm:text-base text-[#475569] dark:text-slate-100 font-medium">
            Meticulously engineered learning pathways covering foundation, higher secondary, and high-stakes competitive examinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PROGRAMS.map((prog, index) => {
            const Icon = iconMap[prog.icon] || BookOpen;
            return (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="glass-card overflow-hidden flex flex-col justify-between group"
              >
                {/* Program Image Header */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={programImages[index]}
                    alt={prog.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Dark overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/90 via-[#071A3D]/30 to-transparent" />

                  {/* Badge top-left */}
                  <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 dark:bg-[#071A3D]/90 text-[#12366B] dark:text-blue-100 border border-white/40 backdrop-blur-sm shadow-sm">
                    {prog.badge}
                  </span>

                  {/* Icon bottom-right on image */}
                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title overlaid on image bottom */}
                  <h3 className="absolute bottom-3 left-4 text-base font-bold text-white drop-shadow-lg leading-tight pr-14">
                    {prog.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 leading-relaxed mb-5">
                      {prog.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {prog.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#071A3D] dark:text-white font-medium">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={ENROLLMENT_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#071A3D] text-white hover:bg-[#12366B] dark:bg-white dark:text-[#071A3D] dark:hover:bg-blue-50 shadow-md hover:shadow-lg transition-all active:scale-95"
                  >
                    <span>Enroll Now in {prog.badge}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

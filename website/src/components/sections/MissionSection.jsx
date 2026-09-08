import React from "react";
import { motion } from "framer-motion";
import { Compass, Target, Lightbulb, CheckCircle, Award, Users, BookOpen } from "lucide-react";
import { ACADEMY_INFO } from "../../data/academyData";

export const MissionSection = () => {
  return (
    <section id="about" className="py-24 relative bg-[#F7F9FC] dark:bg-[#0B2552]/40 border-y border-[#DCE3EC] dark:border-[#29446D]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#12366B] dark:text-blue-300">
            About Vasakal Academy
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#071A3D] dark:text-white mt-2 mb-3 sm:mb-4">
            Shaping the Real Professionals
          </h2>
          <p className="text-sm sm:text-base text-[#475569] dark:text-slate-100 font-medium">
            {ACADEMY_INFO.motto}
          </p>
        </div>

        {/* Mission Banner — 2-col on lg: image + text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[22px] overflow-hidden mb-12 sm:mb-16 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Image */}
            <div className="relative h-56 sm:h-72 lg:h-auto min-h-[220px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900&q=85&fit=crop"
                alt="Students in a collaborative learning environment"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#071A3D] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/70 to-transparent lg:hidden" />
              {/* Floating stat on image */}
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-[#071A3D]/90 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-lg border border-white/20">
                <div className="flex items-center gap-2.5">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-xs font-bold text-[#071A3D] dark:text-white">Bodinayakanur Campus</p>
                    <p className="text-[11px] text-[#475569] dark:text-slate-200">Offline Academic Centre</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text */}
            <div className="relative bg-gradient-to-br from-[#071A3D] via-[#0B2552] to-[#12366B] text-white p-7 sm:p-10 flex flex-col justify-center">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-200 mb-4">
                  <Award className="w-3.5 h-3.5" />
                  <span>Core Institutional Mission</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold leading-snug mb-4 text-white">
                  "{ACADEMY_INFO.mission}"
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-6">
                  {ACADEMY_INFO.subMission}
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 bg-white text-[#071A3D] px-3 py-1.5 rounded-xl text-xs font-bold shadow-md">
                    <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                    {ACADEMY_INFO.learningApproach}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="glass-card p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-navy-800 border border-blue-200 dark:border-blue-600/40 flex items-center justify-center text-[#12366B] dark:text-blue-200 mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#071A3D] dark:text-white mb-2 sm:mb-3">
                Who We Are
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 leading-relaxed">
                Vasakal Academy is a premier academic institution founded in Bodinayakanur. We specialize in personalized learning, continuous engagement, and systematic foundation preparation tailored to every student's calibre.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-navy-700/60 text-xs font-bold text-[#12366B] dark:text-blue-300 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Dedicated Offline Academy Campus</span>
            </div>
          </div>

          <div className="glass-card p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-navy-800 border border-blue-200 dark:border-blue-600/40 flex items-center justify-center text-[#12366B] dark:text-blue-200 mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#071A3D] dark:text-white mb-2 sm:mb-3">
                Our Strategic Purpose
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 leading-relaxed">
                To eliminate the daunting bandwidth chasm between standard school exams and fierce national competitive arenas like NEET and IIT-JEE, by embedding foundational mastery right from Class 6th.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-navy-700/60 text-xs font-bold text-[#12366B] dark:text-blue-300 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Multi-Board &amp; Olympiad Integration</span>
            </div>
          </div>

          <div className="glass-card p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-navy-800 border border-blue-200 dark:border-blue-600/40 flex items-center justify-center text-[#12366B] dark:text-blue-200 mb-5">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#071A3D] dark:text-white mb-2 sm:mb-3">
                Our Philosophy
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 leading-relaxed">
                {ACADEMY_INFO.philosophy} We champion experiential learning by doing, ensuring subjective depth and objective accuracy receive equal, harmonious priority.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-navy-700/60 text-xs font-bold text-[#12366B] dark:text-blue-300 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Subjective + Objective Equality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, ShieldCheck, Layers, BookOpenCheck, Award, PhoneCall, TrendingDown, TrendingUp } from "lucide-react";
import { CHALLENGES_VS_SOLUTION } from "../../data/academyData";

const solutionIcons = {
  ShieldCheck,
  Layers,
  BookOpenCheck,
  Award,
  CheckCircle2,
  PhoneCall
};

export const ChallengesVsSolutionSection = () => {
  const [activeTab, setActiveTab] = useState("solution");

  return (
    <section id="challenges" className="py-24 relative bg-[#F7F9FC] dark:bg-[#0B2552]/40 border-y border-[#DCE3EC] dark:border-[#29446D]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#12366B] dark:text-blue-300">
            Strategic Academic Transformation
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#071A3D] dark:text-white mt-2 mb-3 sm:mb-4">
            Today's Challenges vs Vasakal Solution
          </h2>
          <p className="text-sm sm:text-base text-[#475569] dark:text-slate-100 font-medium">
            Traditional schooling leaves a severe curriculum bandwidth bottleneck. Vasakal Academy resolves this with systematic multi-board integration and early foundation.
          </p>

          {/* Interactive Toggle */}
          <div className="inline-flex p-1 rounded-2xl bg-white dark:bg-[#071A3D] border border-[#DCE3EC] dark:border-blue-500/30 shadow-xs mt-6">
            <button
              onClick={() => setActiveTab("solution")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "solution"
                  ? "bg-[#071A3D] text-white dark:bg-white dark:text-[#071A3D] shadow-md"
                  : "text-[#475569] dark:text-slate-100 hover:text-[#071A3D] dark:hover:text-white"
              }`}
            >
              Vasakal Solution (6 Pillars)
            </button>
            <button
              onClick={() => setActiveTab("challenges")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "challenges"
                  ? "bg-rose-700 text-white shadow-md"
                  : "text-[#475569] dark:text-slate-100 hover:text-rose-600 dark:hover:text-rose-300"
              }`}
            >
              Current Education Pitfalls
            </button>
          </div>
        </div>

        {/* Visual Diagram: Curriculum Bandwidth Bottleneck */}
        <div className="glass-card p-5 sm:p-8 mb-10 sm:mb-12 border-l-4 border-l-blue-600">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-300">
                The Bandwidth Gap Dilemma
              </span>
              <h3 className="text-lg sm:text-2xl font-bold text-[#071A3D] dark:text-white mt-1 mb-2">
                Why Students Struggle After Class 10th
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 leading-relaxed">
                In standard schooling, Class 4th to 10th curricula operate with minimal competitive rigor. When students abruptly hit Class 11th and 12th, syllabus breadth triples, resulting in plummeting confidence, low test scores, and career uncertainty.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-center w-full sm:w-44">
                <TrendingDown className="w-6 h-6 text-rose-600 dark:text-rose-400 mx-auto mb-1" />
                <div className="text-xs font-bold text-rose-700 dark:text-rose-200">Without Foundation</div>
                <div className="text-[11px] text-rose-700/80 dark:text-rose-300">Sudden shock in 11th & 12th</div>
              </div>

              <div className="text-2xl text-gray-400 dark:text-blue-300 font-light hidden sm:block">➔</div>

              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center w-full sm:w-44">
                <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-200">With Vasakal</div>
                <div className="text-[11px] text-emerald-700/80 dark:text-emerald-300">Smooth 7-year curve</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Cards */}
        <AnimatePresence mode="wait">
          {activeTab === "solution" ? (
            <motion.div
              key="solutions-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {CHALLENGES_VS_SOLUTION.solution.map((item) => {
                const Icon = solutionIcons[item.icon] || CheckCircle2;
                return (
                  <div
                    key={item.title}
                    className="glass-card p-5 sm:p-6 hover:-translate-y-1 transition-transform border-t-2 border-t-blue-600"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-navy-800 text-[#12366B] dark:text-blue-300 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#071A3D] dark:text-white mb-2 font-heading">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="challenges-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {CHALLENGES_VS_SOLUTION.challenges.map((item) => (
                <div
                  key={item.title}
                  className="glass-card p-5 sm:p-6 border-t-2 border-t-rose-500 hover:-translate-y-1 transition-transform"
                >
                  <div className="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#071A3D] dark:text-white mb-2 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Search, Puzzle, FlaskConical, HeartHandshake, CalendarSync, FileSpreadsheet, Users, BarChart3, Headphones, CheckCircle2 } from "lucide-react";
import { LEARNING_APPROACH } from "../../data/academyData";

const pillarIcons = {
  Lightbulb,
  Search,
  Puzzle,
  FlaskConical
};

const capIcons = {
  HeartHandshake,
  CalendarSync,
  FileSpreadsheet,
  Users,
  BarChart3,
  Headphones
};

export const ApproachCapabilitiesSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="approach" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#12366B] dark:text-blue-300">
            Integrated Learning System
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#071A3D] dark:text-white mt-2 mb-3 sm:mb-4">
            Our Learning Approach & Capabilities
          </h2>
          <p className="text-sm sm:text-base text-[#475569] dark:text-slate-100 font-medium">
            Vasakal Academy synthesizes four progressive pillars to nurture holistic cognitive readiness.
          </p>

          <div className="inline-block mt-4 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-500/30 text-xs sm:text-sm font-bold text-[#12366B] dark:text-blue-100">
            ⚖️ {LEARNING_APPROACH.corePrinciple}
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {LEARNING_APPROACH.pillars.map((pillar, i) => {
            const Icon = pillarIcons[pillar.icon] || Lightbulb;
            return (
              <motion.div
                key={pillar.title}
                whileHover={{ y: -6 }}
                className="glass-card p-5 sm:p-6 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-navy-800 dark:to-navy-900 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-[#12366B] dark:text-blue-200 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#071A3D] dark:text-white mb-2 font-heading">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-navy-700/60 text-[11px] font-bold text-blue-600 dark:text-blue-300">
                  Pillar 0{i + 1}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Course Design Triangle / Cycle */}
        <div className="glass-card p-6 sm:p-12 mb-16 sm:mb-20 bg-gradient-to-br from-white via-blue-50/20 to-white dark:from-[#0d2857] dark:to-[#071A3D]">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-300">
              Curricular Alignment
            </span>
            <h3 className="text-xl sm:text-3xl font-bold text-[#071A3D] dark:text-white mt-1">
              Course Design Architecture
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 font-medium mt-2">
              Every lesson at Vasakal Academy is built upon an interconnected triangle of Objective, Activities, and Assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {LEARNING_APPROACH.courseDesign.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                    isActive
                      ? "bg-[#071A3D] text-white dark:bg-blue-600 dark:text-white shadow-xl md:scale-105"
                      : "glass-card hover:bg-blue-50/50 dark:hover:bg-blue-900/30 text-[#071A3D] dark:text-white"
                  }`}
                >
                  <div className={`text-2xl font-extrabold font-mono mb-2 ${
                    isActive ? "text-blue-300 dark:text-blue-200" : "text-blue-600 dark:text-blue-400"
                  }`}>
                    {step.number}
                  </div>
                  <h4 className={`text-base sm:text-lg font-bold mb-1 font-heading ${
                    isActive ? "text-white" : "text-[#071A3D] dark:text-white"
                  }`}>
                    {step.title}
                  </h4>
                  <p className={`text-xs font-bold mb-3 ${
                    isActive ? "text-blue-200 dark:text-blue-100" : "text-[#12366B] dark:text-blue-300"
                  }`}>
                    {step.question}
                  </p>
                  <p className={`text-xs leading-relaxed ${
                    isActive ? "text-slate-200 dark:text-slate-100" : "text-[#475569] dark:text-slate-300"
                  }`}>
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6 Academy Capabilities Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-300">
              Institutional Delivery
            </span>
            <h3 className="text-xl sm:text-3xl font-bold text-[#071A3D] dark:text-white mt-1">
              What Are Our Capabilities?
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 font-medium mt-2">
              Our academic infrastructure guarantees structured guidance and active problem-resolution every single week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {LEARNING_APPROACH.capabilities.map((cap) => {
              const CapIcon = capIcons[cap.icon] || CheckCircle2;
              return (
                <div
                  key={cap.title}
                  className="glass-card p-5 sm:p-6 flex items-start gap-4 hover:-translate-y-1 transition-transform"
                >
                  <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-2xl bg-blue-50 dark:bg-navy-800 text-[#12366B] dark:text-blue-200 flex items-center justify-center shrink-0">
                    <CapIcon className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#071A3D] dark:text-white mb-1 font-heading">
                      {cap.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

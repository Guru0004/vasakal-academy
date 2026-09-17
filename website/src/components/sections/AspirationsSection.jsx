import React from "react";
import { motion } from "framer-motion";
import { Cpu, Stethoscope, Calculator, Landmark, ArrowUpRight } from "lucide-react";
import { ASPIRATIONS, ENROLLMENT_FORM_URL } from "../../data/academyData";

const iconMap = {
  Cpu: Cpu,
  Stethoscope: Stethoscope,
  Calculator: Calculator,
  Landmark: Landmark
};

export const AspirationsSection = () => {
  return (
    <section id="aspirations" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#12366B] dark:text-blue-300">
            Target Career Goals
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#071A3D] dark:text-white mt-2 mb-3 sm:mb-4">
            What Do You Want To Become?
          </h2>
          <p className="text-sm sm:text-base text-[#475569] dark:text-slate-100 font-medium">
            Whether your dream is engineering, medicine, chartered accountancy, or administrative leadership, Vasakal Academy builds the unshakeable foundation you need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6">
          {ASPIRATIONS.map((aspiration, index) => {
            const IconComponent = iconMap[aspiration.icon] || Cpu;
            return (
              <motion.div
                key={aspiration.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative glass-card p-5 sm:p-6 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${aspiration.gradient}`} />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-navy-800 dark:to-navy-900 border border-blue-200/60 dark:border-blue-500/30 flex items-center justify-center text-[#071A3D] dark:text-blue-200 shadow-sm group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#12366B] dark:text-blue-200 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-500/30">
                      Target
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#071A3D] dark:text-white mb-1.5 font-heading">
                    {aspiration.title}
                  </h3>

                  <p className="text-xs font-bold text-[#12366B] dark:text-blue-200 mb-3">
                    {aspiration.tag}
                  </p>

                  <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 leading-relaxed mb-6">
                    {aspiration.description}
                  </p>
                </div>

                <div>
                  <div className="border-t border-gray-100 dark:border-navy-700/60 pt-4 mb-4">
                    <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-blue-200 tracking-wider block mb-2">
                      Primary Competitive Gateways
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {aspiration.exams.map((exam) => (
                        <span
                          key={exam}
                          className="text-[11px] font-semibold bg-[#F7F9FC] dark:bg-[#071A3D] text-[#071A3D] dark:text-white px-2.5 py-1 rounded-md border border-[#DCE3EC] dark:border-blue-500/30"
                        >
                          {exam}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={ENROLLMENT_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#071A3D] dark:text-white bg-blue-50 dark:bg-blue-900/40 hover:bg-[#071A3D] hover:text-white dark:hover:bg-white dark:hover:text-[#071A3D] border border-blue-100 dark:border-blue-500/30 transition-colors"
                  >
                    <span>Start Preparation</span>
                    <ArrowUpRight className="w-4 h-4" />
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

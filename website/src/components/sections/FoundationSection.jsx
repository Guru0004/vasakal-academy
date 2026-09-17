import React, { useState } from "react";

import { CheckCircle2, XCircle } from "lucide-react";
import { FOUNDATION_DATA } from "../../data/academyData";

export const FoundationSection = () => {
  const [activeStakeholder, setActiveStakeholder] = useState(0);

  return (
    <section id="foundation" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#12366B] dark:text-blue-300">
            Early Academic Fortification
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] dark:text-white mt-2 mb-4">
            Why Foundation Course?
          </h2>
          <p className="text-base text-[#64748B] dark:text-slate-100">
            {FOUNDATION_DATA.intro}
          </p>
        </div>

        {/* Timeline Comparison: Starting after 10th vs Starting from VI Standard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Starting After 10th */}
          <div className="glass-card p-7 sm:p-8 border-t-4 border-t-rose-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900">
                  Orientation After 10th Standard
                </span>
                <span className="text-xs font-semibold text-[#64748B] dark:text-slate-300">Traditional Track</span>
              </div>
              <h3 className="text-xl font-bold text-[#071A3D] dark:text-white mb-4">
                Short Tenure: High Pressure & Lower Success
              </h3>
              <ul className="space-y-3 text-sm text-[#64748B] dark:text-slate-100">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Time duration is 2 years only</strong> — inadequate for deep syllabus mastery.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Subject coverage is less</strong> — concepts must be hurried for board schedules.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Exposure to talent exams is minimal</strong> — unfamiliar with competitive formats.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Confidence levels are low</strong> — panic and anxiety during exam transitions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Success rate is less</strong> — severe difficulty competing with prepared peers.</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-rose-100 dark:border-navy-800 text-xs font-semibold text-rose-600 dark:text-rose-400">
              ⚠️ High stress and low preparation runway
            </div>
          </div>

          {/* Starting From VI Standard */}
          <div className="glass-card p-7 sm:p-8 border-t-4 border-t-emerald-600 bg-gradient-to-b from-emerald-50/20 to-transparent flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
                  Starting From VI Standard
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Vasakal Pathway</span>
              </div>
              <h3 className="text-xl font-bold text-[#071A3D] dark:text-white mb-4">
                7-Year Tenure: Optimum Mind Maturity & Peak Calibre
              </h3>
              <ul className="space-y-3 text-sm text-[#071A3D] dark:text-gray-200">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Subjects bifurcated with definite syllabus</strong> — clear gradual milestones.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Long tenure of 7 years</strong> — continuous, unhurried conceptual deepening.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Better understanding levels</strong> — learning through experiential practice.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Optimum levels of mind maturity</strong> — analytical problem solving becomes second nature.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Success rate increases remarkably</strong> — high national ranks and admission certainty.</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-100 dark:border-navy-800 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              🌟 The gold standard for national medical and engineering admissions
            </div>
          </div>
        </div>

        {/* Interactive Comparison Table / Cards */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#071A3D] dark:text-white font-heading">
              Head-to-Head: Student Comparison
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 font-medium mt-1">
              How the foundation advantage transforms student capabilities across core dimensions.
            </p>
          </div>

          {/* Desktop & Tablet Table */}
          <div className="hidden md:block glass-card overflow-hidden shadow-lg border border-[#DCE3EC] dark:border-blue-500/30">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#071A3D] dark:bg-[#061530] text-white">
                    <th className="py-4 px-6 font-semibold">Evaluation Dimension</th>
                    <th className="py-4 px-6 font-semibold text-rose-300 dark:text-rose-200">A Student Without Foundation</th>
                    <th className="py-4 px-6 font-semibold text-emerald-300 dark:text-emerald-200">A Student With Foundation (Vasakal)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE3EC] dark:divide-blue-900/40">
                  {FOUNDATION_DATA.comparisonMatrix.map((row, i) => (
                    <tr
                      key={row.parameter}
                      className={i % 2 === 0 ? "bg-white dark:bg-[#0d2857]" : "bg-[#F7F9FC] dark:bg-[#092046]"}
                    >
                      <td className="py-4 px-6 font-bold text-[#071A3D] dark:text-white">
                        {row.parameter}
                      </td>
                      <td className="py-4 px-6 text-rose-700 dark:text-rose-200">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
                          <span>{row.withoutFoundation}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-emerald-700 dark:text-emerald-200 font-semibold">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
                          <span>{row.withFoundation}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Comparison Cards (perfect fit on 320px - 767px) */}
          <div className="md:hidden space-y-4">
            {FOUNDATION_DATA.comparisonMatrix.map((row) => (
              <div key={row.parameter} className="glass-card p-4 border-l-4 border-l-blue-600">
                <h4 className="text-sm font-bold text-[#071A3D] dark:text-white mb-2.5 font-heading">
                  {row.parameter}
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200 flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[10px] uppercase text-rose-600 dark:text-rose-300">Without Foundation</strong>
                      <span>{row.withoutFoundation}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[10px] uppercase text-emerald-700 dark:text-emerald-300">With Vasakal Foundation</strong>
                      <span>{row.withFoundation}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spiral Foundation Architecture Diagram */}
        <div className="glass-card p-6 sm:p-10 mb-16 bg-gradient-to-br from-blue-50/40 via-white to-indigo-50/30 dark:from-[#0d2857] dark:to-[#071A3D]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-300">
              Curricular Pedagogy
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#071A3D] dark:text-white mt-1">
              Vasakal Spiral Foundation Design
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 font-medium mt-2">
              Every topic is engineered in a 3-tier bridge: reinforcing prerequisites, mastering present depth, and pre-viewing upcoming advanced applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="glass-card p-6 border-t-4 border-t-rose-500 text-center relative hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-full bg-rose-600 text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-4 shadow-md font-heading">
                7th
              </div>
              <div className="text-sm font-bold text-[#071A3D] dark:text-white mb-2 font-heading">
                Revision of Earlier Class
              </div>
              <p className="text-xs text-[#475569] dark:text-slate-100 leading-relaxed">
                Diagnosing and filling foundational concept gaps so students never build on shaky ground.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card p-6 border-t-4 border-t-blue-600 text-center relative md:scale-105 shadow-xl hover:-translate-y-1 transition-transform z-10">
              <div className="w-20 h-20 rounded-full bg-[#12366B] dark:bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg font-heading">
                8th
              </div>
              <div className="text-sm font-bold text-[#071A3D] dark:text-white mb-2 font-heading">
                Core Topic Immersion
              </div>
              <p className="text-xs text-[#475569] dark:text-slate-100 leading-relaxed">
                In-depth conceptual theory, objective problem sets, and multi-format question exposure.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card p-6 border-t-4 border-t-amber-500 text-center relative hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-full bg-amber-500 text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-4 shadow-md font-heading">
                9th
              </div>
              <div className="text-sm font-bold text-[#071A3D] dark:text-white mb-2 font-heading">
                Basics of Next Class
              </div>
              <p className="text-xs text-[#475569] dark:text-slate-100 leading-relaxed">
                Early preview into upcoming higher-level concepts, ensuring effortless syllabus progression.
              </p>
            </div>
          </div>
        </div>

        {/* Stakeholder Benefits Tabs */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#071A3D] dark:text-white font-heading">
              A Decisive Advantage For Everyone
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 font-medium mt-1">
              How the Vasakal foundation ecosystem delivers tangible outcomes across the academic community.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {FOUNDATION_DATA.stakeholderBenefits.map((stakeholder, idx) => (
              <button
                key={stakeholder.forWhom}
                onClick={() => setActiveStakeholder(idx)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeStakeholder === idx
                    ? "bg-[#071A3D] text-white dark:bg-white dark:text-[#071A3D] shadow-md"
                    : "glass-card text-[#475569] dark:text-slate-100 hover:text-[#071A3D] dark:hover:text-white"
                }`}
              >
                {stakeholder.forWhom}
              </button>
            ))}
          </div>

          <div className="glass-card p-6 sm:p-8 max-w-3xl mx-auto border-l-4 border-l-blue-600">
            <h4 className="text-base sm:text-lg font-bold text-[#071A3D] dark:text-white mb-4 font-heading">
              {FOUNDATION_DATA.stakeholderBenefits[activeStakeholder].forWhom}
            </h4>
            <ul className="space-y-3">
              {FOUNDATION_DATA.stakeholderBenefits[activeStakeholder].points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#475569] dark:text-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-300 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};


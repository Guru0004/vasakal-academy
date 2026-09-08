import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, ExternalLink } from "lucide-react";
import { FACULTY, ENROLLMENT_FORM_URL } from "../../data/academyData";

const subjectColorMap = {
  Mathematics: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-600",
  Chemistry: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 border-purple-200 dark:border-purple-600",
  Biology: "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 border-emerald-200 dark:border-emerald-600",
  Physics: "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 border-amber-200 dark:border-amber-600"
};

export const FacultySection = () => {
  return (
    <section id="faculty" className="py-24 relative bg-[#F7F9FC] dark:bg-[#0B2552]/40 border-y border-[#DCE3EC] dark:border-[#29446D]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#12366B] dark:text-blue-300">
            Core Academic Panel
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#071A3D] dark:text-white mt-2 mb-3 sm:mb-4">
            Learn From Experienced Academic Experts
          </h2>
          <p className="text-sm sm:text-base text-[#475569] dark:text-slate-100 font-medium">
            Our seasoned faculty members bring decades of combined mastery in coaching students for NEET, IIT-JEE, and board distinctions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
          {FACULTY.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="glass-card overflow-hidden group flex flex-col justify-between"
            >
              {/* Portrait Container */}
              <div className="relative pt-6 px-6 flex justify-center bg-gradient-to-b from-gray-50/50 to-transparent dark:from-navy-900/40">
                <div className="w-36 sm:w-44 h-36 sm:h-44 rounded-2xl overflow-hidden border-2 border-[#DCE3EC] dark:border-blue-500/40 bg-white shadow-md relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Faculty Info */}
              <div className="p-5 sm:p-6 text-center flex-1 flex flex-col justify-between">
                <div>
                  <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border mb-3 ${
                    subjectColorMap[member.subject] || "bg-blue-100 text-blue-700"
                  }`}>
                    {member.subject}
                  </span>

                  <h3 className="text-lg font-bold text-[#071A3D] dark:text-white mb-1 font-heading">
                    {member.name}
                  </h3>

                  <p className="text-xs font-bold text-[#12366B] dark:text-blue-200 mb-3">
                    {member.role}
                  </p>

                  <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-navy-700/60">
                  <a
                    href={ENROLLMENT_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-[#071A3D] dark:text-white bg-blue-50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-500/30 hover:bg-[#071A3D] hover:text-white dark:hover:bg-white dark:hover:text-[#071A3D] transition-colors"
                  >
                    <span>Request Faculty Mentorship</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

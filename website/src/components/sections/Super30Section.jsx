import React from "react";
import { motion } from "framer-motion";
import { Target, Users, Sparkles, CheckCircle2, TrendingUp, BookOpen } from "lucide-react";

const features = [
  {
    title: "Exclusive Batch Size",
    description: "Strictly limited to 30 students to ensure 100% personalized attention and mentorship.",
    icon: Users,
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Dedicated Mentorship",
    description: "One-on-one doubt resolution and daily performance tracking by expert faculty.",
    icon: Target,
    color: "from-amber-500 to-orange-600"
  },
  {
    title: "Rigorous Practice",
    description: "Intensive daily mock tests, OMR analysis, and focus on weak areas for NEET/JEE.",
    icon: TrendingUp,
    color: "from-teal-500 to-emerald-600"
  }
];

export const Super30Section = () => {
  return (
    <section id="super30" className="py-20 lg:py-32 relative overflow-hidden bg-white dark:bg-[#071A3D]">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 dark:bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold text-sm mb-6 border border-indigo-200 dark:border-indigo-700/50">
              <Sparkles className="w-4 h-4" />
              <span>For NEET & JEE Repeaters</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#071A3D] dark:text-white leading-tight mb-6">
              Vasakal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Super 30</span> Program
            </h2>
            
            <p className="text-gray-600 dark:text-slate-300 text-lg mb-8 leading-relaxed">
              Designed exclusively for dedicated NEET and JEE repeaters. We focus on just 30 students to provide unmatched personalized attention, rigorously tracking progress to make your dream of entering premier medical and engineering institutions a reality.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.color} text-white shadow-lg shrink-0 transform transition-transform group-hover:scale-110 group-hover:-rotate-3`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#071A3D] dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-slate-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-navy-700 bg-white dark:bg-[#0B2552] p-2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-gradient-to-br from-indigo-900 to-[#071A3D] flex items-center justify-center">
                {/* Abstract graphic representing 30 students */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 to-transparent blur-xl" />
                </div>
                
                <div className="text-center relative z-10 p-8">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="text-8xl md:text-9xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-2xl">
                      30
                    </span>
                  </motion.div>
                  <p className="text-xl md:text-2xl font-bold text-blue-200 mt-4 tracking-wider uppercase">
                    Seats Only
                  </p>
                  <div className="mt-8 flex justify-center gap-3">
                    <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> NEET
                    </span>
                    <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> JEE
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -left-6 top-1/4 bg-white dark:bg-[#0d2857] p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-blue-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Success Rate</p>
                    <p className="text-sm font-bold text-[#071A3D] dark:text-white">Maximized</p>
                  </div>
                </div>
              </div>
              
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

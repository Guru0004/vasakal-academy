import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles, CheckCircle2, Award, BookOpen, GraduationCap, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { ACADEMY_INFO, ENROLLMENT_FORM_URL, STATS } from "../../data/academyData";

export const HeroSection = () => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#071A3D", "#12366B", "#60A5FA", "#FFFFFF"]
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const highlights = [
    "Foundation from Class 6th",
    "Expert Academic Panel",
    "NEET & IIT-JEE Ready"
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden academy-grid-pattern"
    >
      {/* Dynamic ambient gradients */}
      <div className="absolute top-1/4 -left-20 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-blue-400/10 dark:bg-blue-600/15 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-indigo-400/10 dark:bg-indigo-600/15 blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT — Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Institutional Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white dark:bg-[#0d2857] border border-[#DCE3EC] dark:border-blue-400/40 shadow-xs mb-5 hover:shadow-md transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping shrink-0" />
              <span className="text-[11px] sm:text-sm font-semibold tracking-wide text-[#071A3D] dark:text-white">
                Vasakal Academy • Bodinayakanur
              </span>
              <span className="text-[10px] sm:text-xs bg-[#DCE8FF] dark:bg-blue-600 text-[#071A3D] dark:text-white font-bold px-2 py-0.5 rounded-full shrink-0">
                Admissions Open
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#071A3D] dark:text-white leading-[1.15] mb-4 break-words"
            >
              TURNING ASPIRANTS INTO{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-500 dark:from-blue-200 dark:via-blue-100 dark:to-white">
                ACHIEVERS
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-2.5 text-blue-500/30 dark:text-blue-300/70"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-[#475569] dark:text-slate-100 max-w-xl mb-5 leading-relaxed"
            >
              High-quality personalized learning, expert guidance, and a 7-year integrated approach to give every student a decisive competitive edge.
            </motion.p>

            {/* Key Highlights */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-7 justify-center lg:justify-start">
              {highlights.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-500/30 text-[#12366B] dark:text-blue-100"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  {h}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-10"
            >
              <a
                href={ENROLLMENT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={triggerConfetti}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm sm:text-base font-bold bg-[#071A3D] text-white hover:bg-[#12366B] dark:bg-white dark:text-[#071A3D] dark:hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 group"
              >
                <span>Enroll Now</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#programs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm sm:text-base font-semibold border-2 border-[#DCE3EC] dark:border-blue-400/40 bg-white/80 dark:bg-[#0d2857] text-[#071A3D] dark:text-white hover:bg-white dark:hover:bg-blue-900 transition-all duration-200 active:scale-95"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 w-full max-w-md lg:max-w-full"
            >
              {STATS.slice(0, 3).map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-3 sm:p-4 text-center hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="text-lg sm:text-2xl font-extrabold text-[#071A3D] dark:text-white font-heading">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-[#12366B] dark:text-blue-200 mt-0.5 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col items-center gap-4 relative"
          >
            {/* Main Image */}
            <div className="relative w-full max-w-[480px] rounded-[28px] overflow-hidden shadow-2xl border-4 border-white dark:border-navy-700 group">
              <img
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&q=85&fit=crop"
                alt="Students learning together at Vasakal Academy"
                className="w-full h-80 object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/70 via-transparent to-transparent" />
              {/* Caption bubble */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-[#071A3D]/90 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-white/30 dark:border-blue-400/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#071A3D] dark:bg-blue-600 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#071A3D] dark:text-white">Personalized Learning</p>
                    <p className="text-[11px] text-[#475569] dark:text-slate-200">Expert faculty • Small batches</p>
                  </div>
                  <div className="ml-auto flex items-center gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Two smaller images side by side */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-[480px]">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-navy-700 group h-36">
                <img
                  src="/assets/images/Smart_room.jpeg"
                  alt="Smart Classroom at Vasakal Academy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/60 to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-blue-600/80 px-2 py-0.5 rounded-full">Smart Classroom</span>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-navy-700 group h-36">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80&fit=crop"
                  alt="Mathematics class at Vasakal Academy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/60 to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-indigo-600/80 px-2 py-0.5 rounded-full">Mathematics</span>
              </div>
            </div>

            {/* Floating achievement badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white dark:bg-[#0d2857] rounded-2xl p-3 shadow-xl border border-[#DCE3EC] dark:border-blue-400/30"
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#071A3D] dark:text-white">100+</p>
                  <p className="text-[10px] text-[#475569] dark:text-slate-200">Students</p>
                </div>
              </div>
            </motion.div>

            {/* Floating badge bottom-left */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-36 -left-6 bg-white dark:bg-[#0d2857] rounded-2xl px-3 py-2 shadow-xl border border-[#DCE3EC] dark:border-blue-400/30 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-[10px] font-bold text-[#071A3D] dark:text-white">NEET · JEE · Olympiad</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

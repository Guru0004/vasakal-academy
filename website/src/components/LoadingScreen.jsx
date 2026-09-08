import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            if (onFinished) onFinished();
          }, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#071A3D] text-white px-4"
        >
          {/* Subtle background glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[#12366B] blur-3xl opacity-30 pointer-events-none animate-pulse-glow" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col items-center text-center z-10"
          >
            <div className="relative mb-6">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-indigo-300 rounded-full blur-md opacity-30 animate-pulse" />
              <div className="w-24 h-24 rounded-2xl bg-white p-3 shadow-2xl flex items-center justify-center">
                <img src="/logo.png" alt="Vasakal Academy Logo" className="w-full h-full object-contain" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-wider mb-2 font-heading text-white">
              VASAKAL ACADEMY
            </h1>
            <p className="text-xs sm:text-sm tracking-widest text-blue-200 uppercase font-medium mb-8">
              Turning Aspirants into Achievers
            </p>

            {/* Progress Bar */}
            <div className="w-48 sm:w-64 h-1.5 bg-blue-950/80 rounded-full overflow-hidden border border-blue-800/40">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 via-indigo-200 to-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <span className="text-[11px] text-blue-300/70 mt-2 font-mono">{progress}%</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

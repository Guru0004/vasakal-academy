import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#F7F9FC] dark:bg-[#071A3D]">
      <div className="w-20 h-20 rounded-2xl bg-white p-3 shadow-xl mb-6 border border-[#DCE3EC] dark:border-[#29446D]">
        <img src="/logo.png" alt="Vasakal Academy" className="w-full h-full object-contain" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-[#12366B] dark:text-blue-300 mb-2">
        Page Not Found
      </span>

      <h1 className="text-4xl sm:text-6xl font-extrabold text-[#071A3D] dark:text-white mb-4 font-heading">
        404
      </h1>

      <p className="text-sm sm:text-base text-[#64748B] dark:text-[#B7C4D9] max-w-md mb-8">
        The academic page or resource you are looking for has been moved or does not exist.
      </p>

      <a
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#071A3D] text-white dark:bg-white dark:text-[#071A3D] shadow-md hover:scale-105 transition-transform"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </a>
    </div>
  );
};

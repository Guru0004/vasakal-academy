import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ArrowRight, ExternalLink } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { NAV_LINKS, ENROLLMENT_FORM_URL } from "../data/academyData";

export const Navbar = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "glass-nav py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo & Brand */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
        >
          <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-white p-1 shadow-md flex items-center justify-center border border-gray-100 dark:border-navy-800 transition-transform duration-300 group-hover:scale-105 shrink-0">
            <img src="/logo.png" alt="Vasakal Academy" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-base sm:text-xl tracking-wider text-[#071A3D] dark:text-white leading-tight">
              VASAKAL ACADEMY
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-2.5 py-1.5 rounded-lg text-xs 2xl:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-[#071A3D] dark:text-white bg-blue-100/70 dark:bg-blue-600/30 dark:border dark:border-blue-500/40 shadow-xs"
                    : "text-[#475569] dark:text-slate-100 hover:text-[#071A3D] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Section: Actions & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop/Tablet Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle light and dark theme"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border border-[#DCE3EC] dark:border-blue-500/30 bg-white/80 dark:bg-[#0B2552] text-[#071A3D] dark:text-yellow-300 hover:scale-105 transition-all shadow-xs cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href={ENROLLMENT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs xl:text-sm font-bold bg-[#071A3D] text-white hover:bg-[#12366B] dark:bg-white dark:text-[#071A3D] dark:hover:bg-blue-50 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>Enroll Now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Specific Controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="sm:hidden w-9 h-9 rounded-lg flex items-center justify-center border border-[#DCE3EC] dark:border-blue-500/30 bg-white/80 dark:bg-[#0B2552] text-[#071A3D] dark:text-yellow-300 cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-[#071A3D] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden border-b border-gray-200 dark:border-blue-500/30 bg-white/95 dark:bg-[#071A3D]/95 backdrop-blur-xl px-4 pt-3 pb-6 shadow-2xl"
          >
            <div className="flex flex-col gap-1.5 max-h-[70vh] overflow-y-auto pr-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#071A3D] dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-3 mt-2 border-t border-gray-200 dark:border-navy-700/80">
                <a
                  href={ENROLLMENT_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-[#071A3D] text-white dark:bg-white dark:text-[#071A3D] shadow-md active:scale-95"
                >
                  <span>Enroll Now via Google Form</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

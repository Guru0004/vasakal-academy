import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, GraduationCap, Star, ArrowRight, Bell, BellRing, ExternalLink } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";

const SHOW_DELAY_MS = 5000;
const ROTATION_INTERVAL_MS = 14000;
const AUTO_HIDE_MS = 8500;

const ICON_MAP = {
  GraduationCap,
  Star,
  Sparkles,
  Bell
};

export const PopupNotifications = () => {
  const { notifications, isCenterOpen, openCenter, markAsRead } = useNotifications();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [, setLocalDismissed] = useState(new Set());
  const [allDone, setAllDone] = useState(false);

  const findNext = useCallback((fromIndex, dismissedSet) => {
    if (!notifications.length) return -1;
    for (let i = 1; i <= notifications.length; i++) {
      const idx = (fromIndex + i) % notifications.length;
      if (!dismissedSet.has(notifications[idx].id)) return idx;
    }
    return -1;
  }, [notifications]);

  // Initial delay then show first popup
  useEffect(() => {
    if (allDone || !notifications.length) return;
    const t = setTimeout(() => {
      if (!isCenterOpen) setIsVisible(true);
    }, SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, [allDone, notifications.length, isCenterOpen]);

  // Auto-hide and rotate
  useEffect(() => {
    if (!isVisible) return;
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      const rotateTimer = setTimeout(() => {
        setLocalDismissed((prev) => {
          const next = findNext(currentIndex, prev);
          if (next === -1) {
            setAllDone(true);
          } else {
            setCurrentIndex(next);
            if (!isCenterOpen) setIsVisible(true);
          }
          return prev;
        });
      }, ROTATION_INTERVAL_MS);
      return () => clearTimeout(rotateTimer);
    }, AUTO_HIDE_MS);
    return () => clearTimeout(hideTimer);
  }, [isVisible, currentIndex, findNext, isCenterOpen]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (!notifications[currentIndex]) return;
    const currentId = notifications[currentIndex].id;
    setLocalDismissed((prev) => {
      const updated = new Set(prev);
      updated.add(currentId);
      const next = findNext(currentIndex, updated);
      if (next === -1) {
        setAllDone(true);
      } else {
        setTimeout(() => {
          setCurrentIndex(next);
          if (!isCenterOpen) setIsVisible(true);
        }, 4000);
      }
      return updated;
    });
  };

  const handleActionClick = (e, notif) => {
    markAsRead(notif.id);
    handleDismiss();
    if (!notif.ctaExternal && notif.ctaHref.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(notif.ctaHref);
      if (target) {
        const navOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  if (allDone || isCenterOpen || !notifications.length) return null;

  const notif = notifications[currentIndex];
  if (!notif) return null;

  const Icon = ICON_MAP[notif.iconName] || Bell;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={notif.id}
          /*
            Responsive Placement for Optimal Mobile UX:
            - Mobile (< sm): Top-floating push banner (top-18, left-3, right-3)
              * Never obstructs MobileBottomCTA at the bottom of the screen
              * Keeps thumb-tap actions free
            - Desktop (>= sm): Bottom-left toast (bottom-6, left-6)
          */
          initial={{
            opacity: 0,
            y: typeof window !== "undefined" && window.innerWidth < 640 ? -40 : 40,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          exit={{
            opacity: 0,
            y: typeof window !== "undefined" && window.innerWidth < 640 ? -30 : 30,
            scale: 0.95
          }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className={`
            fixed z-35
            top-18 left-3.5 right-3.5 sm:top-auto sm:bottom-6 sm:left-6 sm:right-auto sm:w-[370px]
            rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-blue-500/30
            ${notif.glow}
          `}
          role="alert"
          aria-live="polite"
        >
          {/* Gradient header strip */}
          <div className={`bg-gradient-to-r ${notif.accent} px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <span className="relative flex items-center justify-center">
                <span className="absolute w-5 h-5 rounded-full bg-white/30 animate-ping" />
                <BellRing className="w-3.5 h-3.5 text-white relative z-10" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-white px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs border border-white/25">
                {notif.badge}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setIsVisible(false);
                  openCenter();
                }}
                className="text-[10px] font-bold text-white/90 hover:text-white px-2 py-0.5 rounded-md bg-white/15 hover:bg-white/25 transition-colors cursor-pointer"
                title="View all notifications"
              >
                All ({notifications.length})
              </button>
              <button
                onClick={handleDismiss}
                className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close notification"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="bg-white/95 dark:bg-[#071A3D]/95 backdrop-blur-md px-3.5 py-3 sm:px-4 sm:py-3.5">
            {/* Icon + Title */}
            <div className="flex items-center gap-2.5 mb-2">
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${notif.accent} flex items-center justify-center shrink-0 shadow-xs text-white`}>
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#071A3D] dark:text-white leading-tight">
                {notif.title}
              </h3>
            </div>

            {/* Quote */}
            {notif.quote && (
              <blockquote className="relative pl-2.5 mb-2 hidden sm:block">
                <span className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-blue-500 to-indigo-400" />
                <p className="text-[11px] italic text-[#475569] dark:text-slate-300 leading-snug">
                  {notif.quote}
                </p>
              </blockquote>
            )}

            {/* Body text */}
            <p className="text-[11px] sm:text-xs text-[#334155] dark:text-slate-200 mb-3 leading-relaxed line-clamp-2">
              {notif.body}
            </p>

            {/* CTA + Branding */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-100 dark:border-blue-900/40">
              {notif.ctaExternal ? (
                <a
                  href={notif.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleActionClick(e, notif)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${notif.accent} shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all`}
                >
                  <span>{notif.cta}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <a
                  href={notif.ctaHref}
                  onClick={(e) => handleActionClick(e, notif)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${notif.accent} shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all`}
                >
                  <span>{notif.cta}</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              )}

              <div className="flex items-center gap-1 text-[10px] text-[#94a3b8] dark:text-slate-400">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Vasakal</span>
              </div>
            </div>
          </div>

          {/* Auto-hide countdown progress bar */}
          <motion.div
            key={`progress-${notif.id}`}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: AUTO_HIDE_MS / 1000, ease: "linear" }}
            style={{ transformOrigin: "left" }}
            className={`h-0.5 sm:h-1 bg-gradient-to-r ${notif.accent}`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

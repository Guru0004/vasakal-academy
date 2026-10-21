import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  GraduationCap,
  Star,
  Sparkles,
  Calendar,
  Award,
  CheckCheck,
  X,
  ExternalLink,
  ArrowRight,
  Clock,
  Inbox,
  RotateCcw
} from "lucide-react";
import { useNotifications } from "../context/NotificationContext";

// Icon mapper
const ICON_MAP = {
  GraduationCap,
  Star,
  Sparkles,
  Calendar,
  Award,
  Bell
};

export const NotificationCenter = () => {
  const {
    notifications,
    unreadCount,
    isCenterOpen,
    closeCenter,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    resetAllNotifications,
    activeFilter,
    setActiveFilter
  } = useNotifications();

  const modalRef = useRef(null);

  // Close when clicking outside on desktop
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        // Check if the click was on the trigger bell button
        if (!e.target.closest("[data-notification-trigger]")) {
          closeCenter();
        }
      }
    };

    if (isCenterOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isCenterOpen, closeCenter]);

  // Lock background scroll on mobile when sheet is open
  useEffect(() => {
    if (isCenterOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCenterOpen]);

  // Filter items
  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === "unread") return !item.isRead;
    return true;
  });

  const handleActionClick = (e, item) => {
    markAsRead(item.id);
    if (!item.ctaExternal && item.ctaHref.startsWith("#")) {
      e.preventDefault();
      closeCenter();
      const target = document.querySelector(item.ctaHref);
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

  return (
    <AnimatePresence>
      {isCenterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end md:justify-start pointer-events-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCenter}
            className="fixed inset-0 bg-navy-950/60 dark:bg-black/70 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Responsive Container:
              - Mobile (< md): Bottom Sheet sliding up from bottom
              - Desktop (>= md): Floating Dropdown anchored below navbar top-right
          */}
          <motion.div
            ref={modalRef}
            initial={{
              opacity: 0,
              y: window.innerWidth < 768 ? "100%" : -10,
              scale: window.innerWidth < 768 ? 1 : 0.95
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: window.innerWidth < 768 ? "100%" : -10,
              scale: window.innerWidth < 768 ? 1 : 0.95
            }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className={`
              relative z-10 w-full overflow-hidden flex flex-col
              bg-white dark:bg-[#071A3D]
              border-t md:border border-gray-200 dark:border-blue-500/30
              shadow-[0_-10px_40px_rgba(0,0,0,0.25)] md:shadow-2xl
              rounded-t-3xl md:rounded-2xl
              max-h-[82vh] md:max-h-[600px]
              md:w-[420px] md:top-20 md:right-6 md:self-end md:mr-4 lg:mr-8
            `}
          >
            {/* Mobile Sheet Drag Handle Indicator */}
            <div className="md:hidden pt-3 pb-1 flex justify-center items-center">
              <span className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-blue-800/80" />
            </div>

            {/* Header */}
            <div className="px-4 py-3.5 border-b border-gray-100 dark:border-blue-900/40 bg-gray-50/70 dark:bg-[#0B2552]/60 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-extrabold text-[#071A3D] dark:text-white font-heading">
                        Notifications
                      </h3>
                      {unreadCount > 0 ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white shadow-xs">
                          {unreadCount} new
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                          All caught up
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-slate-400">
                      Vasakal Academy Admissions & News
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      title="Mark all as read"
                      className="p-1.5 rounded-lg text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-100/50 dark:hover:bg-blue-900/40 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[11px]">Mark read</span>
                    </button>
                  )}
                  <button
                    onClick={closeCenter}
                    className="w-8 h-8 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-blue-900/40 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close notification drawer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeFilter === "all"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white dark:bg-[#071A3D] text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-blue-900/60 hover:bg-gray-100"
                  }`}
                >
                  All ({notifications.length})
                </button>
                <button
                  onClick={() => setActiveFilter("unread")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeFilter === "unread"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white dark:bg-[#071A3D] text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-blue-900/60 hover:bg-gray-100"
                  }`}
                >
                  <span>Unread</span>
                  {unreadCount > 0 && (
                    <span
                      className={`w-2 h-2 rounded-full ${
                        activeFilter === "unread" ? "bg-white" : "bg-blue-600"
                      }`}
                    />
                  )}
                  <span className="text-[11px] opacity-80">({unreadCount})</span>
                </button>
              </div>
            </div>

            {/* Notification Items List */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-blue-950/60 p-2 sm:p-2.5 max-h-[58vh] md:max-h-[380px] overscroll-contain">
              {filteredNotifications.length === 0 ? (
                <div className="py-12 px-4 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-500 mb-3">
                    <Inbox className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 dark:text-white">
                    {activeFilter === "unread"
                      ? "No unread notifications"
                      : "No notifications right now"}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400 max-w-xs mt-1">
                    {activeFilter === "unread"
                      ? "You have reviewed all recent updates from Vasakal Academy."
                      : "Check back later for fresh admission updates and announcements."}
                  </p>
                  {notifications.length === 0 && (
                    <button
                      onClick={resetAllNotifications}
                      className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore Default Notifications</span>
                    </button>
                  )}
                </div>
              ) : (
                filteredNotifications.map((item) => {
                  const Icon = ICON_MAP[item.iconName] || Bell;
                  return (
                    <div
                      key={item.id}
                      onClick={() => markAsRead(item.id)}
                      className={`
                        group relative p-3 sm:p-3.5 rounded-xl transition-all duration-200 cursor-pointer mb-1.5
                        ${
                          !item.isRead
                            ? "bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-500/30 shadow-2xs"
                            : "hover:bg-gray-50 dark:hover:bg-blue-950/20 bg-transparent border border-transparent"
                        }
                      `}
                    >
                      {/* Unread indicator dot */}
                      {!item.isRead && (
                        <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 ring-4 ring-blue-100 dark:ring-blue-900/40 animate-pulse" />
                      )}

                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center shrink-0 shadow-xs text-white`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}
                            >
                              {item.badge}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-slate-400">
                              <Clock className="w-3 h-3" />
                              <span>{item.timestamp}</span>
                            </span>
                          </div>

                          <h4 className="text-xs sm:text-sm font-bold text-[#071A3D] dark:text-white leading-snug line-clamp-2">
                            {item.title}
                          </h4>

                          <p className="text-[11px] sm:text-xs text-gray-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                            {item.body}
                          </p>

                          {/* CTA Link / Button */}
                          <div className="mt-2.5 flex items-center gap-2">
                            {item.ctaExternal ? (
                              <a
                                href={item.ctaHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => handleActionClick(e, item)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${item.accent} shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all`}
                              >
                                <span>{item.cta}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <a
                                href={item.ctaHref}
                                onClick={(e) => handleActionClick(e, item)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${item.accent} shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all`}
                              >
                                <span>{item.cta}</span>
                                <ArrowRight className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Footer Actions */}
            <div className="px-4 py-2.5 bg-gray-50 dark:bg-[#061737] border-t border-gray-100 dark:border-blue-900/50 flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
              <span className="text-[11px] font-medium">
                Vasakal Academy • Bodinayakanur
              </span>
              <div className="flex items-center gap-3">
                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-[11px] text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

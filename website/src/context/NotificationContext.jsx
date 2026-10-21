import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_NOTIFICATIONS } from "../data/notificationData";

const NotificationContext = createContext(null);

const STORAGE_KEY_READ_IDS = "vasakal_read_notifications";
const STORAGE_KEY_DISMISSED_IDS = "vasakal_dismissed_notifications";

export const NotificationProvider = ({ children }) => {
  const [readIds, setReadIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_READ_IDS);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [dismissedIds, setDismissedIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DISMISSED_IDS);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [isCenterOpen, setIsCenterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // Save read IDs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_READ_IDS, JSON.stringify(Array.from(readIds)));
    } catch (e) {
      console.error("Failed to save read notifications:", e);
    }
  }, [readIds]);

  // Save dismissed IDs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DISMISSED_IDS, JSON.stringify(Array.from(dismissedIds)));
    } catch (e) {
      console.error("Failed to save dismissed notifications:", e);
    }
  }, [dismissedIds]);

  // Active notifications list (dismissed filtered out of the list or marked)
  const notifications = INITIAL_NOTIFICATIONS.map((n) => ({
    ...n,
    isRead: readIds.has(n.id),
    isDismissed: dismissedIds.has(n.id)
  }));

  const visibleNotifications = notifications.filter((n) => !n.isDismissed);

  const unreadCount = visibleNotifications.filter((n) => !n.isRead).length;

  const markAsRead = (id) => {
    setReadIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const markAllAsRead = () => {
    setReadIds((prev) => {
      const next = new Set(prev);
      visibleNotifications.forEach((n) => next.add(n.id));
      return next;
    });
  };

  const dismissNotification = (id) => {
    setDismissedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const clearAllNotifications = () => {
    setDismissedIds((prev) => {
      const next = new Set(prev);
      INITIAL_NOTIFICATIONS.forEach((n) => next.add(n.id));
      return next;
    });
  };

  const resetAllNotifications = () => {
    setReadIds(new Set());
    setDismissedIds(new Set());
    try {
      localStorage.removeItem(STORAGE_KEY_READ_IDS);
      localStorage.removeItem(STORAGE_KEY_DISMISSED_IDS);
    } catch (e) {
      console.error(e);
    }
  };

  const openCenter = () => setIsCenterOpen(true);
  const closeCenter = () => setIsCenterOpen(false);
  const toggleCenter = () => setIsCenterOpen((prev) => !prev);

  return (
    <NotificationContext.Provider
      value={{
        notifications: visibleNotifications,
        allNotifications: notifications,
        unreadCount,
        isCenterOpen,
        openCenter,
        closeCenter,
        toggleCenter,
        markAsRead,
        markAllAsRead,
        dismissNotification,
        clearAllNotifications,
        resetAllNotifications,
        activeFilter,
        setActiveFilter
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

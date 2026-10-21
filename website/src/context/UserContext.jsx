import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

const STORAGE_KEY_VISITS = "vasakal_visit_count";
const STORAGE_KEY_FIRST_VISIT = "vasakal_first_visit_date";

export const UserProvider = ({ children }) => {
  // Track visit count (for new vs returning visitor detection)
  const [visitCount, setVisitCount] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VISITS);
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  // First visit timestamp
  const [firstVisitDate] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FIRST_VISIT);
      if (!saved) {
        const now = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY_FIRST_VISIT, now);
        return now;
      }
      return saved;
    } catch {
      return new Date().toISOString();
    }
  });

  useEffect(() => {
    try {
      // Increment session visit count if not already incremented in this tab session
      const sessionMark = sessionStorage.getItem("vasakal_session_counted");
      if (!sessionMark) {
        sessionStorage.setItem("vasakal_session_counted", "true");
        const currentVisits = parseInt(localStorage.getItem(STORAGE_KEY_VISITS) || "0", 10) + 1;
        localStorage.setItem(STORAGE_KEY_VISITS, currentVisits.toString());
        setVisitCount(currentVisits);
      }
    } catch (e) {
      console.error("Error tracking visit count:", e);
    }
  }, []);

  // Reset visitor history to simulate a new visitor
  const resetToNewVisitor = () => {
    try {
      localStorage.setItem(STORAGE_KEY_VISITS, "1");
      sessionStorage.removeItem("vasakal_session_counted");
    } catch (e) {
      console.error(e);
    }
    setVisitCount(1);
  };

  // Get current time greeting (Good morning / afternoon / evening / night)
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return {
        greeting: "Good Morning",
        period: "Morning",
        icon: "Sun",
        emoji: "🌅",
        description: "Start your day with high-energy learning!"
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        greeting: "Good Afternoon",
        period: "Afternoon",
        icon: "SunMedium",
        emoji: "☀️",
        description: "Hope your day of learning and problem-solving is productive!"
      };
    } else if (hour >= 17 && hour < 21) {
      return {
        greeting: "Good Evening",
        period: "Evening",
        icon: "Sunset",
        emoji: "🌆",
        description: "A great time for concept revision and doubt clearance!"
      };
    } else {
      return {
        greeting: "Good Night",
        period: "Night",
        icon: "Moon",
        emoji: "🌙",
        description: "Dedicated night owl study session? We're right here to guide you."
      };
    }
  };

  const isNewVisitor = visitCount <= 1;

  return (
    <UserContext.Provider
      value={{
        visitCount,
        firstVisitDate,
        isNewVisitor,
        resetToNewVisitor,
        getTimeGreeting
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

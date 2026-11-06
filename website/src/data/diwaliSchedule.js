// Official Diwali (Lakshmi Puja / Deepavali) festival dates
export const DIWALI_MAIN_DATES = {
  2024: ["2024-10-31", "2024-11-01"], // Tithi spanned across both dates
  2025: ["2025-10-20"],
  2026: ["2026-11-08"], // Day before: Nov 7, Diwali: Nov 8
  2027: ["2027-10-29"],
  2028: ["2028-10-17"],
  2029: ["2029-11-05"],
  2030: ["2030-10-26"],
  2031: ["2031-11-14"],
  2032: ["2032-11-02"],
  2033: ["2033-10-22"],
  2034: ["2034-11-10"],
  2035: ["2035-10-30"]
};

/**
 * Returns true if the given date falls on Diwali or the day before Diwali.
 * Supports manual testing override via ?diwali=true query parameter or localStorage.
 */
export const isDiwaliSeason = (customDate = null) => {
  if (typeof window !== "undefined") {
    // 1. Check URL query parameter (e.g. ?diwali=true or ?preview=diwali) for manual testing anytime
    const params = new URLSearchParams(window.location.search);
    if (params.get("diwali") === "true" || params.get("diwali") === "1" || params.get("preview") === "diwali") {
      return true;
    }
    // 2. Check localStorage override for developer testing
    if (localStorage.getItem("force_diwali") === "true") {
      return true;
    }
  }

  const targetDate = customDate || new Date();

  // Helper to format date string as YYYY-MM-DD
  const formatDateStr = (date, timeZone) => {
    try {
      const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).formatToParts(date);
      const y = parts.find((p) => p.type === "year")?.value;
      const m = parts.find((p) => p.type === "month")?.value;
      const d = parts.find((p) => p.type === "day")?.value;
      return `${y}-${m}-${d}`;
    } catch {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
  };

  // Check in Indian Standard Time (IST) as primary, and fallback to user local time
  const istDateStr = formatDateStr(targetDate, "Asia/Kolkata");
  const localDateStr = formatDateStr(targetDate, undefined);
  const currentYear = parseInt(istDateStr.split("-")[0], 10);

  const mainDates = DIWALI_MAIN_DATES[currentYear] || [];
  const activeDates = new Set();

  for (const dateStr of mainDates) {
    activeDates.add(dateStr); // The main day of Diwali

    // Calculate 1 day before Diwali
    const [y, m, d] = dateStr.split("-").map(Number);
    const dayBefore = new Date(Date.UTC(y, m - 1, d - 1));
    const dayBeforeStr = dayBefore.toISOString().slice(0, 10);
    activeDates.add(dayBeforeStr); // The day before Diwali
  }

  return activeDates.has(istDateStr) || activeDates.has(localDateStr);
};


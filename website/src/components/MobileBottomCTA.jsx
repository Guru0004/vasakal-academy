import React from "react";
import { Phone, ExternalLink } from "lucide-react";
import { ACADEMY_INFO, ENROLLMENT_FORM_URL } from "../data/academyData";

export const MobileBottomCTA = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-2.5 bg-white/95 dark:bg-[#071A3D]/95 backdrop-blur-lg border-t border-[#DCE3EC] dark:border-[#29446D] shadow-2xl flex items-center gap-2">
      <a
        href={`tel:${ACADEMY_INFO.contacts.phones[0]}`}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border border-[#071A3D] dark:border-white text-[#071A3D] dark:text-white active:scale-95 transition-transform"
      >
        <Phone className="w-3.5 h-3.5" />
        <span>Call Us</span>
      </a>

      <a
        href={ENROLLMENT_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-2 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#071A3D] text-white dark:bg-white dark:text-[#071A3D] shadow-md active:scale-95 transition-transform"
      >
        <span>Enroll Now</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};

import React from "react";
import { MapPin, Phone, Mail, ExternalLink, GraduationCap } from "lucide-react";
import { ACADEMY_INFO, NAV_LINKS, ENROLLMENT_FORM_URL } from "../data/academyData";

export const Footer = () => {
  return (
    <footer className="relative bg-[#040E22] text-white pt-16 pb-12 border-t border-navy-800 overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-2 shadow-lg flex items-center justify-center">
                <img src="/logo.png" alt="Vasakal Academy" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg tracking-wider text-white">
                  {ACADEMY_INFO.name}
                </h3>
                <p className="text-xs text-blue-300 font-medium">{ACADEMY_INFO.tagline}</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {ACADEMY_INFO.mission}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-950/90 border border-blue-700/60 text-xs text-blue-200 font-semibold">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>{ACADEMY_INFO.learningApproach}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-300 mb-4 font-heading">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 font-medium">
              {NAV_LINKS.slice(0, 5).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Tracks */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-300 mb-4 font-heading">
              Academic Wings
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 font-medium">
              {NAV_LINKS.slice(5).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Campus Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-300 mb-4 font-heading">
              Academy Campus
            </h4>
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-100 font-medium">
              <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <span>{ACADEMY_INFO.contacts.address}</span>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-100 font-medium">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <div className="flex flex-wrap gap-2">
                {ACADEMY_INFO.contacts.phones.map((phone, idx) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="hover:text-white hover:underline transition-colors"
                  >
                    {phone}{idx < ACADEMY_INFO.contacts.phones.length - 1 ? "," : ""}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-100 font-medium">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <a
                href={`mailto:${ACADEMY_INFO.contacts.email}`}
                className="hover:text-white hover:underline transition-colors"
              >
                {ACADEMY_INFO.contacts.email}
              </a>
            </div>

            <div className="pt-2">
              <a
                href={ENROLLMENT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-colors active:scale-95"
              >
                <span>Admissions & Enrollment</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-navy-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="grid grid-cols-1 gap-4">
            <p>© 2026 Vasakal Academy. All Rights Reserved.</p>
            <a href="https://guruveeraprasath.vercel.app/" target="_blank" rel="noopener noreferrer">Developed by GuruVeeraprasath M</a>
          </div>
          <p className="text-center sm:text-right text-slate-300">
            Shaping the Real Professionals • Thasildar Office Road, Bodinayakanur - 625513
          </p>
        </div>
      </div>
    </footer>
  );
};

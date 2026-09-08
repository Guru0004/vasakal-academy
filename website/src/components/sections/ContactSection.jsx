import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink, Send, CheckCircle2 } from "lucide-react";
import { ACADEMY_INFO, ENROLLMENT_FORM_URL } from "../../data/academyData";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    studentClass: "Class 6th",
    phone: "",
    query: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Open email client with pre-filled content
    const subject = encodeURIComponent(`Vasakal Academy Inquiry - ${formData.name} (${formData.studentClass})`);
    const body = encodeURIComponent(
      `Hello Vasakal Academy,

Name: ${formData.name}
Class: ${formData.studentClass}
Phone: ${formData.phone}

Query:
${formData.query}

Thank you.`
    );
    window.open(`mailto:${ACADEMY_INFO.contacts.email}?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 relative bg-[#F7F9FC] dark:bg-[#0B2552]/40 border-t border-[#DCE3EC] dark:border-[#29446D]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#12366B] dark:text-blue-300">
            Admissions & Inquiries
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#071A3D] dark:text-white mt-2 mb-3 sm:mb-4">
            Any Queries? We Are Here To Help
          </h2>
          <p className="text-sm sm:text-base text-[#475569] dark:text-slate-100 font-medium">
            Take the first step towards academic transformation. Connect directly with our administration or visit our Bodinayakanur campus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* Left Col: Contact Info & Action Cards */}
          <div className="space-y-6">
            {/* Campus Address Card */}
            <div className="glass-card p-5 sm:p-7 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-navy-800 text-[#12366B] dark:text-blue-200 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#071A3D] dark:text-white mb-1 font-heading">
                  Academy Campus Address
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-100 leading-relaxed mb-2">
                  {ACADEMY_INFO.contacts.address}
                </p>
                <span className="text-xs text-blue-600 dark:text-blue-300 font-bold">
                  Offline batches & weekday student support center
                </span>
              </div>
            </div>

            {/* Phone Support Card */}
            <div className="glass-card p-5 sm:p-7 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-navy-800 text-[#12366B] dark:text-blue-200 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-[#071A3D] dark:text-white mb-1 font-heading">
                  Direct Phone Support
                </h3>
                <p className="text-xs text-[#475569] dark:text-slate-100 mb-3">
                  Academic counseling & telephonic doubt clearance available during weekdays.
                </p>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {ACADEMY_INFO.contacts.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-500/30 text-xs sm:text-sm font-bold text-[#071A3D] dark:text-white hover:bg-[#071A3D] hover:text-white dark:hover:bg-white dark:hover:text-[#071A3D] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{phone}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Email Contact Card */}
            <div className="glass-card p-5 sm:p-7 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-navy-800 text-[#12366B] dark:text-blue-200 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#071A3D] dark:text-white mb-1 font-heading">
                  Official Email
                </h3>
                <p className="text-xs text-[#475569] dark:text-slate-100 mb-2">
                  Send detailed inquiries, school partnership proposals, or academic resumes.
                </p>
                <a
                  href={`mailto:${ACADEMY_INFO.contacts.email}`}
                  className="text-sm font-bold text-[#12366B] dark:text-blue-200 hover:underline"
                >
                  {ACADEMY_INFO.contacts.email}
                </a>
              </div>
            </div>

            {/* Direct Google Form CTA Card */}
            <div className="rounded-2xl bg-gradient-to-r from-[#071A3D] to-[#12366B] text-white p-5 sm:p-7 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-base sm:text-lg font-bold">Ready to Enroll?</h4>
                <p className="text-xs text-blue-100 mt-0.5">
                  Complete the official Vasakal Academy student enrollment form online.
                </p>
              </div>
              <a
                href={ENROLLMENT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-[#071A3D] hover:bg-blue-50 shadow-md shrink-0 transition-transform transform hover:scale-105 active:scale-95"
              >
                <span>Enroll Now</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Col: Interactive Map & Quick Helper Form */}
          <div className="flex flex-col gap-6">
            {/* Google Map Embed */}
            <div className="glass-card overflow-hidden h-64 sm:h-80 relative shadow-md border border-[#DCE3EC] dark:border-blue-500/30">
              <iframe
                title="Vasakal Academy Location - Bodinayakanur"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15715.111812165038!2d77.3400!3d10.0150!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b074092b7c4d877%3A0x2dbbe2d80d24e12e!2sBodinayakanur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[15%] contrast-110"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-[#071A3D]/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gray-200 dark:border-blue-500/40 text-xs font-bold text-[#071A3D] dark:text-white shadow-sm">
                📍 Thasildar Office Road, Bodinayakanur
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="glass-card p-5 sm:p-7">
              <h3 className="text-base font-bold text-[#071A3D] dark:text-white mb-1.5 font-heading">
                Quick Academic Inquiry
              </h3>
              <p className="text-xs text-[#475569] dark:text-slate-100 mb-4">
                Have a question regarding batches, schedules, or curriculum? Send us a quick note.
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>Thank you! Your mail client has been opened with your inquiry details.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-700 dark:text-slate-200 mb-1">
                        Student / Parent Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#071A3D] border border-[#DCE3EC] dark:border-blue-500/40 text-[#071A3D] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 dark:placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-700 dark:text-slate-200 mb-1">
                        Student Grade
                      </label>
                      <select
                        value={formData.studentClass}
                        onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#071A3D] border border-[#DCE3EC] dark:border-blue-500/40 text-[#071A3D] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Class 4th - 5th</option>
                        <option>Class 6th</option>
                        <option>Class 7th</option>
                        <option>Class 8th</option>
                        <option>Class 9th</option>
                        <option>Class 10th</option>
                        <option>Class 11th - 12th</option>
                        <option>Competitive Entrance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 dark:text-slate-200 mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#071A3D] border border-[#DCE3EC] dark:border-blue-500/40 text-[#071A3D] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 dark:placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 dark:text-slate-200 mb-1">
                      Message / Question
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tell us about the student's background and goals..."
                      value={formData.query}
                      onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#071A3D] border border-[#DCE3EC] dark:border-blue-500/40 text-[#071A3D] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 dark:placeholder:text-slate-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#071A3D] text-white hover:bg-[#12366B] dark:bg-white dark:text-[#071A3D] dark:hover:bg-blue-50 transition-colors shadow-sm active:scale-95"
                  >
                    <span>Send Message to Academy</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

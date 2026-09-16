import React from "react";
import { motion } from "framer-motion";
import { Home, Shield, Utensils, Wifi, BookOpen, Coffee } from "lucide-react";

const facilities = [
  { icon: Shield, label: "24/7 Security & Surveillance" },
  { icon: Utensils, label: "Nutritious & Hygienic Food" },
  { icon: Wifi, label: "High-Speed Internet" },
  { icon: BookOpen, label: "Dedicated Study Rooms" },
  { icon: Coffee, label: "Recreation Area" },
  { icon: Home, label: "Comfortable Accommodation" }
];

export const HostelSection = () => {
  return (
    <section id="hostel" className="py-20 bg-gray-50 dark:bg-[#041029] relative border-t border-gray-100 dark:border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-4"
          >
            <Home className="w-4 h-4" />
            <span>Campus Life</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-heading font-bold text-[#071A3D] dark:text-white mb-4"
          >
            Premium Hostel Facilities
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-slate-300 text-lg"
          >
            We provide separate, fully-equipped hostels for boys and girls, ensuring a safe, comfortable, and highly conducive environment for uninterrupted study and personal growth.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Boys Hostel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 relative overflow-hidden group border border-gray-200 dark:border-navy-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform">
              <Home className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold text-[#071A3D] dark:text-white mb-3">Boys Hostel</h3>
            <p className="text-gray-600 dark:text-slate-400 mb-6 leading-relaxed">
              A well-disciplined and secure living space tailored to foster focus and camaraderie among male students. Features spacious rooms and dedicated warden supervision.
            </p>
            
            <div className="h-1 w-20 bg-blue-500/50 rounded-full" />
          </motion.div>

          {/* Girls Hostel */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 relative overflow-hidden group border border-gray-200 dark:border-navy-700 hover:border-pink-400 dark:hover:border-pink-500 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform">
              <Home className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold text-[#071A3D] dark:text-white mb-3">Girls Hostel</h3>
            <p className="text-gray-600 dark:text-slate-400 mb-6 leading-relaxed">
              A highly secure, comfortable, and nurturing environment specifically designed for female students. Complete with 24/7 female security personnel and female wardens.
            </p>
            
            <div className="h-1 w-20 bg-pink-500/50 rounded-full" />
          </motion.div>
        </div>

        {/* Common Facilities */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-[#0B2552] rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-navy-700"
        >
          <h3 className="text-xl font-bold text-center text-[#071A3D] dark:text-white mb-10">Common Campus Facilities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {facilities.map((fac, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-[#112d63] flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-colors">
                  <fac.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">{fac.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

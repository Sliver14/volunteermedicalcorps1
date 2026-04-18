"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import { motion } from "framer-motion";

export default function GlobalPrayerPage() {
  const features = [
    {
      title: "Intercessory Prayer",
      description: "Intercede for the sick and infirm around the world.",
      icon: "🙏"
    },
    {
      title: "Healthcare Systems",
      description: "Pray for the strengthening of global healthcare infrastructure.",
      icon: "🌍"
    },
    {
      title: "Ministry of Hope",
      description: "Bring the comfort of the Gospel through spiritual support.",
      icon: "✨"
    }
  ];

  return (
    <div className="w-full bg-white">
      <PageBanner title="VMC PRAYING MEDICS" parent={{ label: "Campaigns", href: "#" }} />
      
      {/* Hero Section */}
      <section className="py-12 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#002866] opacity-95"></div>
        <div className="absolute inset-0">
          <Image 
            src="/pmr-bg-mission.jpg" 
            alt="Prayer Background" 
            fill 
            className="object-cover"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white text-center"
        >
          <h6 className="text-[#ff9f22] font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase mb-4 md:mb-6 text-sm md:text-base">Global Day of Prayer</h6>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-poppins font-black mb-6 md:mb-8 leading-tight">
            VMC Praying Medics
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Join our global network of medical professionals dedicated to the ministry of prayer, interceding for the sick and the healthcare systems of the world.
          </p>
          <div className="mt-8 md:mt-12">
            <button className="bg-[#ff9f22] text-[#002866] px-8 md:px-12 py-4 md:py-5 font-black uppercase tracking-widest text-sm md:text-base hover:bg-white transition-all shadow-2xl w-full sm:w-auto">
              Join the Prayer Network
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="text-center group p-6 md:p-8 hover:bg-gray-50 transition-colors rounded-sm border border-transparent hover:border-gray-100"
              >
                <div className="text-5xl md:text-6xl mb-4 md:mb-6 group-hover:scale-110 transition-transform block">{feature.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-[#002866] mb-3 md:mb-4 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 sm:p-12 lg:p-20 rounded-sm shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff9f22]/10 rounded-full translate-x-32 -translate-y-32"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#002866] mb-8 md:mb-12 uppercase tracking-wide">Prayer Hotlines & Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-4 md:space-y-6">
                  <h4 className="text-[#ff9f22] font-black uppercase tracking-widest text-xs md:text-sm">Call Us</h4>
                  <ul className="space-y-2 md:space-y-4 text-lg md:text-xl font-bold text-[#002866]">
                    <li>UK: +44 203 176 9724</li>
                    <li>SA: +27 79 967 5852</li>
                    <li>NG: +234 708 9267 186</li>
                  </ul>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <h4 className="text-[#ff9f22] font-black uppercase tracking-widest text-xs md:text-sm">Send Prayer Requests</h4>
                  <p className="text-lg md:text-2xl font-bold text-[#002866] break-all">
                    contact@volunteermedicalcorps.org
                  </p>
                  <button className="bg-[#002866] text-white px-6 md:px-8 py-3 md:py-4 font-bold uppercase tracking-widest text-sm md:text-base hover:bg-[#002866]/90 transition-all mt-2 md:mt-4 w-full sm:w-auto">
                    Send Request Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function GlobalPrayerPage() {
  const isMobile = useIsMobile();
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
    <div className="w-full bg-bg-base font-roboto transition-colors duration-300">
      <PageBanner title="VMC PRAYING MEDICS" parent={{ label: "Campaigns", href: "#" }} />
      
      {/* Hero Section */}
      <section className="py-12 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary opacity-95"></div>
        <div className="absolute inset-0">
          <Image 
            src="https://volunteermedicalcorps.org/admin/images/gallery/429831-3a.jpg" 
            alt="Prayer Background" 
            fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
            className="object-cover"
          unoptimized />
        </div>
        
        <motion.div 
          initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, scale: 1.05 }}
          whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: isMobile ? 0.35 : 0.6, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white text-center"
        >
          <h6 className="text-brand-secondary font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase mb-4 md:mb-6 text-xs md:text-sm">Global Day of Prayer</h6>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight uppercase tracking-tight">
            VMC Praying Medics
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium opacity-90">
            Join our global network of medical professionals dedicated to the ministry of prayer, interceding for the sick and the healthcare systems of the world.
          </p>
          <div className="mt-8 md:mt-12">
            <button className="group relative overflow-hidden bg-brand-secondary text-brand-primary px-10 md:px-12 py-4 md:py-5 font-bold uppercase tracking-widest text-xs md:text-sm shadow-2xl transition-all w-full sm:w-auto">
               <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
               <span className="relative z-10">Join the Prayer Network</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-bg-base transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center group p-8 md:p-10 bg-bg-surface border border-border-main hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl md:text-6xl mb-6 group-hover:scale-110 transition-transform block">{feature.icon}</div>
                <h3 className="text-lg font-bold text-brand-primary dark:text-brand-secondary mb-4 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-sm md:text-base text-text-muted leading-relaxed font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-bg-surface border-t border-border-main transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="bg-brand-primary p-8 sm:p-12 lg:p-20 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/10 rounded-full translate-x-32 -translate-y-32"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-secondary mb-10 md:mb-16 uppercase tracking-wide">Prayer Hotlines & Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                <div className="space-y-6 md:space-y-8">
                  <h4 className="text-brand-secondary font-bold uppercase tracking-widest text-[10px] md:text-xs">Call Us</h4>
                  <ul className="space-y-3 md:space-y-5 text-lg md:text-xl font-bold text-white">
                    <li className="flex items-center gap-3"><span className="text-brand-secondary">UK:</span> +44 203 176 9724</li>
                    <li className="flex items-center gap-3"><span className="text-brand-secondary">SA:</span> +27 79 967 5852</li>
                    <li className="flex items-center gap-3"><span className="text-brand-secondary">NG:</span> +234 708 9267 186</li>
                  </ul>
                </div>
                <div className="space-y-6 md:space-y-8">
                  <h4 className="text-brand-secondary font-bold uppercase tracking-widest text-[10px] md:text-xs">Send Prayer Requests</h4>
                  <p className="text-lg md:text-xl lg:text-2xl font-bold text-white break-all leading-tight">
                    contact@volunteermedicalcorps.org
                  </p>
                  <button className="group relative overflow-hidden bg-brand-secondary text-brand-primary px-8 md:px-10 py-4 md:py-5 font-bold uppercase tracking-widest text-xs md:text-sm transition-all mt-4 w-full sm:w-auto">
                     <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                     <span className="relative z-10">Send Request Now</span>
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

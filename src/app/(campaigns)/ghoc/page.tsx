"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function GHOCPage() {
  const isMobile = useIsMobile();
  const steps = [
    {
      title: "Sign up to participate",
      description: "Join the #GHOC movement and register your commitment.",
      icon: "📋"
    },
    {
      title: "Pre-register facilities",
      description: "Select the hospitals or health facilities you plan to visit.",
      icon: "🏥"
    },
    {
      title: "Get your Toolkit Ready",
      description: "Prepare your #GHOC Toolkit and Gift Packs for the outreach.",
      icon: "🎒"
    },
    {
      title: "Upload your Report",
      description: "Submit your outreach report and share your impact.",
      icon: "📤"
    }
  ];

  return (
    <div className="w-full bg-bg-base font-roboto transition-colors duration-300">
      <PageBanner title="GLOBAL HOSPITAL OUTREACH" parent={{ label: "Campaigns", href: "#" }} />
      
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-brand-primary text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6 md:space-y-8 relative z-10"
            >
              <div className="inline-block bg-brand-secondary text-brand-primary px-4 py-1.5 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                Active Campaign 2026
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight uppercase">
                Global Hospital Outreach Campaign (#GHOC)
              </h2>
              <p className="text-xl md:text-2xl text-brand-secondary font-medium italic opacity-90">
                Reaching 2 Million People in 196 Countries
              </p>
              <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-xl font-medium opacity-80">
                The Global Hospital Outreach Campaign is a strategic initiative to bring hope, healing, and the Gospel to patients and healthcare workers in hospitals worldwide.
              </p>
              <div className="pt-4 md:pt-6">
                <button className="group relative overflow-hidden bg-brand-secondary text-brand-primary px-10 md:px-12 py-4 md:py-5 font-bold uppercase tracking-[0.2em] text-xs md:text-sm shadow-2xl transition-all w-full sm:w-auto">
                   <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                   <span className="relative z-10">Join the Campaign</span>
                </button>
              </div>
            </motion.div>
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="relative h-[300px] sm:h-[400px] md:h-[500px] mt-8 lg:mt-0 overflow-hidden shadow-2xl border-b-8 border-r-8 border-brand-secondary"
            >
              <Image 
                src="https://volunteermedicalcorps.org/admin/images/gallery/429831-3a.jpg" 
                alt="GHOC Outreach" 
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                className="object-cover group-hover:scale-105 transition-transform duration-400"
              unoptimized />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-24 bg-bg-base transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16 md:mb-24"
          >
            <h6 className="text-brand-secondary font-bold tracking-widest uppercase mb-4 text-xs">How to Join</h6>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-brand-secondary uppercase">4 Steps to Participate</h2>
            <div className="w-24 h-1 bg-brand-secondary mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center text-center group bg-bg-surface p-8 border border-border-main shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 bg-bg-base border border-border-main flex items-center justify-center text-3xl md:text-4xl mb-8 group-hover:bg-brand-secondary group-hover:text-brand-primary group-hover:scale-110 transition-all duration-300 shadow-inner">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-primary dark:text-brand-secondary mb-4 uppercase tracking-tight">{step.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed font-medium">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 md:py-24 bg-bg-surface border-y border-border-main transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
              className="relative h-[250px] sm:h-[300px] md:h-[400px] border-[8px] border-bg-base shadow-2xl overflow-hidden"
            >
              <Image 
                src="https://volunteermedicalcorps.org/admin/images/media/2NpZxEGQD245813967.jpg" 
                alt="Resources" 
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                className="object-cover group-hover:scale-105 transition-transform duration-400"
              unoptimized />
            </motion.div>
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-brand-secondary uppercase">Campaign Resources</h2>
              <p className="text-text-muted text-base md:text-lg leading-relaxed font-medium">
                Download everything you need to execute a successful outreach, including T-shirt designs, logos, and presentation materials.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <button className="group relative overflow-hidden bg-bg-base border-2 border-brand-primary text-brand-primary p-4 font-bold flex items-center justify-center gap-3 transition-all text-xs md:text-sm uppercase tracking-widest">
                   <span className="absolute inset-0 bg-brand-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                   <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
                     <span>📥</span> T-shirt Design
                   </span>
                </button>
                <button className="group relative overflow-hidden bg-bg-base border-2 border-brand-primary text-brand-primary p-4 font-bold flex items-center justify-center gap-3 transition-all text-xs md:text-sm uppercase tracking-widest">
                   <span className="absolute inset-0 bg-brand-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                   <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
                     <span>📥</span> #GHOC Logo
                   </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

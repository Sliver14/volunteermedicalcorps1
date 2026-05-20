"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function OneMillionSmilesPage() {
  const isMobile = useIsMobile();
  const steps = [
    {
      title: "Sign up to participate",
      description: "Join the global movement and register your commitment.",
      icon: "📝"
    },
    {
      title: "Download the #WHD Toolkit",
      description: "Get all the resources you need to make an impact.",
      icon: "📥"
    },
    {
      title: "Upload your Report here",
      description: "Share your good deeds and inspire others.",
      icon: "📊"
    },
    {
      title: "Post and Tag #vmcorps #WHD",
      description: "Share your projects online and tag our community.",
      icon: "📱"
    }
  ];

  return (
    <div className="w-full bg-bg-base font-roboto transition-colors duration-300">
      <PageBanner title="1 MILLION SMILES" parent={{ label: "Campaigns", href: "#" }} />
      
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
              <h6 className="text-brand-secondary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs">World Humanitarian Day Campaign</h6>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight uppercase">
                Creating <span className="text-brand-secondary">1 Million</span> Smiles
              </h2>
              <p className="text-base md:text-lg text-gray-200 font-medium leading-relaxed max-w-xl opacity-90">
                Through 1 Million Good Deeds, we are making a global impact and bringing hope to those who need it most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="group relative overflow-hidden bg-brand-secondary text-brand-primary px-8 md:px-10 py-3 md:py-4 font-bold uppercase tracking-widest transition-all w-full sm:w-auto text-xs md:text-sm shadow-xl">
                   <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                   <span className="relative z-10">Sign Up Now</span>
                </button>
                <button className="group relative overflow-hidden border-2 border-white text-white px-8 md:px-10 py-3 md:py-4 font-bold uppercase tracking-widest transition-all w-full sm:w-auto text-xs md:text-sm">
                   <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                   <span className="relative z-10 group-hover:text-brand-primary transition-colors">Give Now</span>
                </button>
              </div>
            </motion.div>
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="relative h-[300px] sm:h-[400px] lg:h-[550px] w-full mt-8 lg:mt-0"
            >
              <Image 
                src="https://volunteermedicalcorps.org/admin/images/media/onrZbfR8N463291785.jpg" 
                alt="1 Million Smiles" 
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                className="object-cover hover:grayscale transition-all duration-400"
              unoptimized />
              <div className="absolute inset-0 border-[10px] md:border-[15px] border-brand-secondary/20 -m-3 md:-m-5 pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-24 bg-bg-base border-b border-border-main transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-brand-secondary uppercase mb-4">Steps to Participate</h2>
            <div className="w-24 h-1 bg-brand-secondary mx-auto"></div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: isMobile ? 30 : 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                className="bg-bg-surface p-10 shadow-lg hover:-translate-y-2 transition-all duration-300 relative group border border-border-main"
              >
                <div className="text-4xl md:text-5xl mb-6 group-hover:scale-110 transition-transform block">{step.icon}</div>
                <div className="absolute top-6 right-6 text-5xl md:text-6xl font-bold text-brand-primary/5 select-none group-hover:text-brand-secondary/10 transition-colors">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-bold text-brand-primary dark:text-brand-secondary mb-4 relative z-10 uppercase tracking-tight">{step.title}</h3>
                <p className="text-sm md:text-base text-text-muted relative z-10 leading-relaxed font-medium">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video/CTA Section */}
      <section className="py-20 md:py-32 bg-bg-surface transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="relative aspect-video bg-black overflow-hidden shadow-2xl mb-12 md:mb-20 group cursor-pointer border-[8px] border-bg-base"
          >
            <Image 
              src="https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg" 
              alt="Campaign Video" 
              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
              className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-400"
            unoptimized />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-secondary flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                <div className="w-0 h-0 border-t-[12px] md:border-t-[15px] border-t-transparent border-l-[20px] md:border-l-[25px] border-l-brand-primary border-b-[12px] md:border-b-[15px] border-b-transparent ml-2"></div>
              </div>
            </div>
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xl md:text-2xl font-bold text-brand-primary dark:text-brand-secondary mb-10 uppercase tracking-tight"
          >
            Watch how we are creating smiles across the world
          </motion.h3>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="group relative overflow-hidden bg-brand-primary text-white px-10 md:px-16 py-5 md:py-6 font-bold uppercase tracking-[0.2em] text-xs md:text-sm shadow-2xl transition-all w-full sm:w-auto"
          >
             <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
             <span className="relative z-10 group-hover:text-brand-primary transition-colors">Join the movement today</span>
          </motion.button>
        </div>
      </section>
    </div>
  );
}

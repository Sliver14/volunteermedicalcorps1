"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import { motion } from "framer-motion";

export default function OneMillionSmilesPage() {
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
    <div className="w-full bg-white">
      <PageBanner title="1 MILLION SMILES" parent={{ label: "Campaigns", href: "#" }} />
      
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-[#002866] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6 md:space-y-8 relative z-10"
            >
              <h6 className="text-[#ff9f22] font-bold tracking-[0.3em] uppercase text-xs md:text-sm">World Humanitarian Day Campaign</h6>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-poppins font-black leading-tight">
                Creating <span className="text-[#ff9f22]">1 Million</span> Smiles
              </h2>
              <p className="text-lg md:text-xl text-gray-300 font-roboto leading-relaxed max-w-xl">
                Through 1 Million Good Deeds, we are making a global impact and bringing hope to those who need it most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#ff9f22] text-[#002866] px-8 md:px-10 py-3 md:py-4 font-black uppercase tracking-widest hover:bg-white transition-colors w-full sm:w-auto text-sm md:text-base">
                  Sign Up Now
                </button>
                <button className="border-2 border-white text-white px-8 md:px-10 py-3 md:py-4 font-black uppercase tracking-widest hover:bg-white hover:text-[#002866] transition-all w-full sm:w-auto text-sm md:text-base">
                  Give Now
                </button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[300px] sm:h-[400px] lg:h-[600px] w-full mt-8 lg:mt-0"
            >
              <Image 
                src="https://volunteermedicalcorps.org/admin/images/media/onrZbfR8N463291785.jpg" 
                alt="1 Million Smiles" 
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                className="object-cover rounded-sm hover:grayscale transition-all duration-700"
              unoptimized />
              <div className="absolute inset-0 border-[10px] md:border-[20px] border-[#ff9f22]/20 -m-3 md:-m-6 pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#002866] uppercase mb-4">4 Steps to Participate in #WHD</h2>
            <div className="w-24 h-1 bg-[#ff9f22] mx-auto"></div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="bg-white p-8 md:p-10 rounded-sm shadow-lg hover:-translate-y-2 transition-transform duration-300 relative group"
              >
                <div className="text-4xl md:text-5xl mb-4 md:mb-6 group-hover:scale-110 transition-transform block">{step.icon}</div>
                <div className="absolute top-4 right-4 md:top-6 md:right-6 text-5xl md:text-6xl font-black text-gray-50 -z-0 select-none group-hover:text-[#ff9f22]/10 transition-colors">
                  0{index + 1}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#002866] mb-3 md:mb-4 relative z-10">{step.title}</h3>
                <p className="text-sm md:text-base text-gray-500 relative z-10">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video/CTA Section */}
      <section className="py-12 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video bg-gray-900 rounded-sm overflow-hidden shadow-2xl mb-8 md:mb-12 group cursor-pointer"
          >
            <Image 
              src="https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg" 
              alt="Campaign Video" 
              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            unoptimized />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-[#ff9f22] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[10px] md:border-t-[15px] border-t-transparent border-l-[15px] md:border-l-[25px] border-l-[#002866] border-b-[10px] md:border-b-[15px] border-b-transparent ml-2"></div>
              </div>
            </div>
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-poppins font-bold text-[#002866] mb-6 md:mb-8"
          >
            Watch how we are creating smiles across the world
          </motion.h3>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#ff9f22] text-[#002866] px-8 md:px-12 py-4 md:py-5 font-black uppercase tracking-[0.2em] text-xs md:text-sm shadow-xl hover:shadow-[#ff9f22]/20 transition-all w-full sm:w-auto"
          >
            Join the movement today
          </motion.button>
        </div>
      </section>
    </div>
  );
}

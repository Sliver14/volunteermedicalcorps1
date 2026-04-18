"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import { motion } from "framer-motion";

export default function GHOCPage() {
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
    <div className="w-full bg-white">
      <PageBanner title="GLOBAL HOSPITAL OUTREACH" parent={{ label: "Campaigns", href: "#" }} />
      
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-gradient-to-br from-[#002866] to-[#0040a6] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="inline-block bg-[#ff9f22] text-[#002866] px-4 py-1 font-bold uppercase tracking-widest text-xs md:text-sm">
                Active Campaign 2024
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-poppins font-bold leading-tight">
                Global Hospital Outreach Campaign (#GHOC)
              </h2>
              <p className="text-xl md:text-2xl text-[#ff9f22] font-roboto font-light italic">
                Reaching 2 Million People in 196 Countries
              </p>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-xl">
                The Global Hospital Outreach Campaign is a strategic initiative to bring hope, healing, and the Gospel to patients and healthcare workers in hospitals worldwide.
              </p>
              <div className="pt-2 md:pt-4">
                <button className="bg-[#ff9f22] text-[#002866] px-8 md:px-12 py-3 md:py-4 font-black uppercase tracking-[0.2em] text-sm md:text-base hover:bg-white transition-all shadow-2xl w-full sm:w-auto">
                  Join the Campaign
                </button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[300px] sm:h-[400px] md:h-[500px] mt-8 lg:mt-0 rounded-sm overflow-hidden shadow-2xl border-b-4 md:border-b-8 border-r-4 md:border-r-8 border-[#ff9f22]"
            >
              <Image 
                src="/sw-post-1-min-768x512.jpg" 
                alt="GHOC Outreach" 
                fill 
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-20"
          >
            <h6 className="text-[#ff9f22] font-bold tracking-widest uppercase mb-3 md:mb-4 text-sm">How to Join</h6>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#002866] uppercase">4 Steps to Participate</h2>
            <div className="w-24 h-1 bg-[#ff9f22] mx-auto mt-4 md:mt-6"></div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-full flex items-center justify-center text-3xl md:text-4xl mb-6 md:mb-8 group-hover:bg-[#ff9f22] group-hover:scale-110 transition-all duration-300 shadow-inner">
                  {step.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#002866] mb-3 md:mb-4 uppercase tracking-tight">{step.title}</h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed">{step.description}</p>
                {index < 3 && (
                  <div className="hidden lg:block absolute translate-x-44 translate-y-12 text-[#ff9f22] opacity-20 text-5xl">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-12 md:py-24 bg-[#ff9f22]/10 border-y border-[#ff9f22]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative h-[250px] sm:h-[300px] md:h-[400px]"
            >
              <Image 
                src="/pmr-bg-mission.jpg" 
                alt="Resources" 
                fill 
                className="object-cover rounded-sm shadow-xl"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 md:space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#002866]">Campaign Resources</h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Download everything you need to execute a successful outreach, including T-shirt designs, logos, and presentation materials.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <button className="bg-white border-2 border-[#002866] text-[#002866] p-3 md:p-4 font-bold flex items-center justify-center gap-2 hover:bg-[#002866] hover:text-white transition-all text-sm md:text-base">
                  <span>📥</span> Download T-shirt Design
                </button>
                <button className="bg-white border-2 border-[#002866] text-[#002866] p-3 md:p-4 font-bold flex items-center justify-center gap-2 hover:bg-[#002866] hover:text-white transition-all text-sm md:text-base">
                  <span>📥</span> Download #GHOC Logo
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

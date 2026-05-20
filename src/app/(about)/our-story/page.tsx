"use client";

import PageBanner from "@/components/PageBanner";
import Image from "next/image";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function OurStoryPage() {
  const isMobile = useIsMobile();
  const focusAreas = [
    "Health Care Services, Access And Education",
    "Humanitarian And Relief Missions",
    "Health Systems Strengthening And Capacity Building"
  ];

  return (
    <div className="w-full bg-bg-base font-roboto transition-colors duration-300">
      <PageBanner title="Our Story" parent={{ label: "About Us", href: "#" }} />
      
      {/* Who We Are Section */}
      <section className="py-16 md:py-24 bg-bg-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h6 className="text-brand-secondary font-bold tracking-[0.3em] uppercase mb-4 text-[10px] md:text-xs">Who We Are</h6>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-primary dark:text-text-main mb-8 md:mb-10 leading-tight uppercase tracking-tight">
                Global Christian <br className="hidden md:block" /> Medical Outreach
              </h2>
              <div className="space-y-6 text-text-muted text-base md:text-lg leading-relaxed font-medium opacity-90">
                <p>
                  The Volunteer Medical Corps was established as a network of Christian health workers, para-medics, humanitarian volunteers and students committed to providing medical care, relief assistance, and sustainable health care solutions in regions of crisis and to communities in dire need.
                </p>
                <div className="bg-brand-primary text-white p-8 md:p-10 border-l-8 border-brand-secondary italic shadow-xl text-sm md:text-base font-medium">
                  &quot;To provide the best and most suitable medical aid to communities and persons in need.&quot;
                </div>
                <p>
                  We are an ever-expanding global network committed to making a positive impact across communities, cultures, and countries, providing prompt medical services where they are needed most.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="relative h-[300px] sm:h-400px md:h-[600px] mt-8 lg:mt-0 overflow-hidden"
            >
              <Image 
                src="https://volunteermedicalcorps.org/admin/images/campaigns/VvjfzE9kJ596372148.jpg" 
                alt="VMC Mission" 
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                className="object-cover hover:scale-105 transition-transform duration-400"
                unoptimized
              />
              <div className="absolute bottom-0 left-0 bg-brand-secondary p-8 md:p-16 shadow-2xl">
                <div className="text-brand-primary font-bold text-5xl md:text-7xl leading-none">2M+</div>
                <div className="text-brand-primary font-bold uppercase tracking-widest text-[10px] md:text-xs mt-2 md:mt-4">Lives Impacted</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-16 md:py-24 bg-bg-surface border-y border-border-main transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-brand-secondary uppercase tracking-tight">Our Focus Areas</h2>
            <div className="w-24 h-1 bg-brand-secondary mx-auto mt-6"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {focusAreas.map((area, index) => (
              <motion.div 
                key={index} 
                initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-bg-base p-10 shadow-lg hover:-translate-y-2 transition-all border-b-4 border-transparent hover:border-brand-secondary group text-center border border-border-main"
              >
                <div className="w-16 h-16 bg-brand-primary text-brand-secondary flex items-center justify-center text-xl md:text-2xl font-bold mb-8 mx-auto group-hover:scale-110 transition-transform shadow-inner">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-bold text-brand-primary dark:text-text-main leading-tight uppercase tracking-tight">{area}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Values Section */}
      <section className="py-20 md:py-32 bg-brand-primary dark:bg-bg-surface text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6 md:space-y-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-brand-secondary">Our Vision</h2>
              <p className="text-xl md:text-3xl font-medium leading-relaxed text-gray-200 opacity-90">
                To have global medical outreaches geared towards the provision of prompt medical services in regions of crisis and/or dire need.
              </p>
            </motion.div>
            <div className="space-y-10 md:space-y-16">
              <motion.h2 
                initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-brand-secondary"
              >
                Core Values
              </motion.h2>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {}
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 md:gap-y-12"
              >
                {[
                  { label: "Faith", icon: "✨" },
                  { label: "Innovation", icon: "💡" },
                  { label: "Integrity", icon: "🤝" },
                  { label: "Effectiveness", icon: "⚡" },
                  { label: "Compassion", icon: "❤️" }
                ].map((val, i) => (
                  <motion.div 
                    key={i} 
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
                    }}
                    className="flex items-center gap-6 group"
                  >
                    <span className="text-3xl md:text-4xl group-hover:scale-125 transition-transform duration-300">{val.icon}</span>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-widest text-white group-hover:text-brand-secondary transition-colors">{val.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

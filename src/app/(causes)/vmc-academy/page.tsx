"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function VMCAcademyPage() {
  const isMobile = useIsMobile();
  const activities = [
    "VMC Learning Portal",
    "VMC Conference",
    "VMC Summit"
  ];

  const campaigns = [
    { title: "VMC Summit", image: "https://volunteermedicalcorps.org/admin/images/gallery/173895-bronx3.jpg" },
    { title: "VMC Conference", image: "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg" },
    { title: "VMC Learning Portal", image: "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg" }
  ];

  return (
    <div className="w-full bg-bg-base font-roboto transition-colors duration-300">
      <PageBanner title="VMC ACADEMY" parent={{ label: "What We Do", href: "#" }} />
      
      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-bg-base transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative h-[300px] md:h-[500px] overflow-hidden"
            >
              <Image 
                src="https://volunteermedicalcorps.org/admin/images/gallery/173895-bronx3.jpg" 
                alt="VMC Academy" 
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                className="object-cover hover:scale-105 transition-transform duration-400"
                unoptimized
              />
              <div className="absolute bottom-0 right-0 bg-brand-secondary p-8 md:p-12 shadow-2xl">
                <span className="text-brand-primary font-bold text-xl md:text-2xl uppercase tracking-tighter">#vmcacademy</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="space-y-6 md:space-y-8"
            >
              <div>
                <h6 className="text-brand-secondary font-bold tracking-widest uppercase mb-4 text-[10px] md:text-xs">Capacity Building</h6>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-primary dark:text-brand-secondary leading-tight uppercase tracking-tight">
                   Training & Equipping <br className="hidden md:block" /> the Next Generation
                </h2>
              </div>
              
              <div className="space-y-4 md:space-y-6 text-text-muted text-base md:text-lg leading-relaxed font-medium opacity-90">
                <p>
                  Volunteer Medical Corps Academy provides a robust platform for learning and professional development, ensuring our volunteers are equipped with the best skills for global impact.
                </p>
                <p>
                  Through our summits, conferences, and specialized online portal, we foster a culture of innovation, excellence, and continuous improvement.
                </p>
              </div>

              <div className="pt-4 border-t border-border-main">
                <h4 className="text-lg font-bold text-brand-primary dark:text-text-main mb-6 uppercase tracking-tight">Main Platforms:</h4>
                <ul className="space-y-4">
                  {activities.map((activity, index) => (
                    <li key={index} className="flex items-center text-text-muted font-bold text-sm tracking-wide">
                      <span className="w-2.5 h-2.5 bg-brand-secondary mr-4 shrink-0"></span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="py-16 md:py-24 bg-bg-surface border-y border-border-main transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16 md:mb-24"
          >
            <h6 className="text-brand-secondary font-bold tracking-widest uppercase mb-4 text-xs">Knowledge Hub</h6>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-brand-secondary uppercase">Academy Initiatives</h2>
            <div className="w-24 h-1 bg-brand-secondary mx-auto mt-6"></div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            {campaigns.map((campaign, index) => (
              <motion.div 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: isMobile ? 30 : 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                className="group bg-bg-base overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-border-main"
              >
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <Image 
                    src={campaign.image} 
                    alt={campaign.title} 
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                    className="object-cover group-hover:scale-110 transition-transform duration-400"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-brand-primary px-6 py-2.5 font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-xl transition-all">Enter Portal</button>
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mb-3 block">Academy Program</span>
                  <h3 className="text-lg font-bold text-brand-primary dark:text-text-main group-hover:text-brand-secondary transition-colors line-clamp-2 leading-tight uppercase tracking-tight">
                    {campaign.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

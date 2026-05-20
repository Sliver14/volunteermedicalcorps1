"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function HumanitarianProjectsPage() {
  const isMobile = useIsMobile();
  const activities = [
    "Clean up your community",
    "Global Voluntary Blood Donation Campaign",
    "Lighthouse Project"
  ];

  const campaigns = [
    {
      title: "Malaria Treatment and Eradication Campaign",
      image: "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg"
    },
    {
      title: "Lighthouse Project",
      image: "https://volunteermedicalcorps.org/admin/images/media/2NpZxEGQD245813967.jpg"
    },
    {
      title: "Community Volunteering Projects",
      image: "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg"
    },
    {
      title: "Global Voluntary Blood Donation Campaign",
      image: "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg"
    },
    {
      title: "Clean up your community",
      image: "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg"
    }
  ];

  return (
    <div className="w-full bg-bg-base font-roboto transition-colors duration-300">
      <PageBanner title="HUMANITARIAN PROJECTS" parent={{ label: "What We Do", href: "#" }} />
      
      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-bg-base transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative h-[300px] md:h-[500px] overflow-hidden"
            >
              <Image 
                src="https://volunteermedicalcorps.org/admin/images/media/2NpZxEGQD245813967.jpg" 
                alt="Humanitarian Projects" 
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                className="object-cover hover:scale-105 transition-transform duration-400"
              unoptimized />
              <div className="absolute bottom-0 right-0 bg-brand-secondary p-6 md:p-10 shadow-2xl">
                <span className="text-brand-primary font-bold text-xl md:text-2xl uppercase tracking-tighter">#vmchumanitarian</span>
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
                <h6 className="text-brand-secondary font-bold tracking-widest uppercase mb-4 text-[10px] md:text-xs">Global Initiatives</h6>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-primary dark:text-brand-secondary leading-tight uppercase tracking-tight">
                  Providing Relief and <br className="hidden md:block" /> Sustainable Support
                </h2>
              </div>
              
              <div className="space-y-4 md:space-y-6 text-text-muted text-base md:text-lg leading-relaxed font-medium opacity-90">
                <p>
                  Volunteer Medical Corps Projects provide a platform to meet the needs of those who require our aid and support in line with the Gospel of Jesus Christ.
                </p>
                <p>
                  Our humanitarian efforts extend to disaster relief, community rebuilding, and long-term developmental projects across global regions.
                </p>
              </div>

              <div className="pt-4 border-t border-border-main">
                <h4 className="text-lg font-bold text-brand-primary dark:text-text-main mb-6 uppercase tracking-tight">Focus Areas:</h4>
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
            <h6 className="text-brand-secondary font-bold tracking-widest uppercase mb-4 text-xs">Explore More</h6>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-brand-secondary uppercase">Humanitarian Projects</h2>
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
                    <button className="bg-white text-brand-primary px-6 py-2.5 font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-xl transition-all">View Project</button>
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mb-3 block">Humanitarian Project</span>
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

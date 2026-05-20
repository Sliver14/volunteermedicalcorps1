"use client";

import PageBanner from "@/components/PageBanner";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function AboutLandingPage() {
  const isMobile = useIsMobile();
  const sections = [
    {
      title: "Our Story",
      description: "Learn about the origins, mission, and vision of the Volunteer Medical Corps.",
      href: "/our-story",
      image: "https://volunteermedicalcorps.org/admin/images/gallery/798453-1.jpg"
    },
    {
      title: "Board of Trustees",
      description: "Meet the distinguished professionals guiding our global initiatives.",
      href: "/board-of-trustees",
      image: "https://volunteermedicalcorps.org/admin/images/gallery/591783-2.jpg"
    },
    {
      title: "Annual Reports",
      description: "Transparency and impact: review our yearly performance and outreach summaries.",
      href: "/annual-reports",
      image: "https://volunteermedicalcorps.org/admin/images/campaigns/e5cjrn3mD326785419.jpg"
    }
  ];

  return (
    <div className="w-full bg-bg-base transition-colors duration-300">
      <PageBanner title="About Us" />
      
      <section className="py-16 md:py-24 bg-bg-base transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-brand-secondary uppercase">Who We Are</h2>
            <div className="w-24 h-1 bg-brand-secondary mx-auto mt-4 md:mt-6 mb-6 md:mb-8"></div>
            <p className="text-base md:text-lg text-text-muted max-w-3xl mx-auto leading-relaxed font-medium">
              The Volunteer Medical Corps is a global network of Christian health workers, para-medics, and volunteers committed to providing medical care and sustainable health solutions in regions of crisis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {sections.map((section, index) => (
              <motion.div 
                key={section.title} 
                initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-bg-surface overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-border-main"
              >
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <Image 
                    src={section.image} 
                    alt={section.title} 
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                    className="object-cover group-hover:scale-105 transition-transform duration-400"
                    unoptimized
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-lg md:text-xl font-bold text-brand-primary dark:text-text-main mb-4 uppercase tracking-tight">{section.title}</h3>
                  <p className="text-sm text-text-muted mb-8 flex-grow leading-relaxed font-medium">{section.description}</p>
                  <Link 
                    href={section.href}
                    className="group relative overflow-hidden inline-block bg-brand-primary text-white px-8 py-4 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all text-center shadow-lg"
                  >
                     <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                     <span className="relative z-10 group-hover:text-brand-primary transition-colors">Learn More</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

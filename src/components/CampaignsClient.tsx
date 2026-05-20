"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Pagination from "@/components/Pagination";

import { useIsMobile } from "@/hooks/useIsMobile";

export default function CampaignsClient({ allCampaigns }: any) {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(allCampaigns.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCampaigns = allCampaigns.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 md:py-24 bg-bg-base transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-brand-secondary uppercase">Active Campaigns</h2>
          <div className="w-24 h-1 bg-brand-secondary mx-auto mt-4 md:mt-6 mb-6 md:mb-8"></div>
          <p className="text-base md:text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
            Join our global initiatives designed to bring hope, healing, and the Gospel to people and communities worldwide.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {}
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {currentCampaigns.map((item: any) => (
            <motion.div 
              key={item.id} 
              variants={{
                hidden: { opacity: 0, y: isMobile ? 30 : 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              className="group bg-bg-surface border border-border-main overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 md:h-72 overflow-hidden">
                <Image 
                  src={item.image || "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg"} 
                  alt={item.title} 
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                  className="object-cover group-hover:scale-110 transition-transform duration-400"
                  unoptimized
                />
                <div className="absolute top-4 left-4 bg-brand-secondary text-brand-primary px-3 md:px-4 py-1 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                  {item.category || "Campaign"}
                </div>
              </div>
              <div className="p-6 md:p-10 flex flex-col items-start flex-grow">
                <h3 className="text-lg md:text-xl font-bold text-brand-primary dark:text-text-main mb-3 md:mb-4 uppercase leading-tight">{item.title}</h3>
                <p className="text-sm md:text-base text-text-muted mb-6 md:mb-8 leading-relaxed line-clamp-3">{item.description}</p>
                <Link 
                  href={item.ctaLink || `/campaigns/${item.id}`}
                  className="group relative overflow-hidden inline-block bg-brand-primary text-white px-6 md:px-10 py-3 md:py-4 font-bold uppercase tracking-[0.2em] text-[11px] md:text-xs transition-all shadow-md mt-auto"
                >
                  <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                  <span className="relative z-10 group-hover:text-brand-primary transition-colors">{item.ctaText || "View Campaign"}</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
    </section>
  );
}


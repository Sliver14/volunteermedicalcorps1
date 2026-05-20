"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import { FaPlus } from 'react-icons/fa';
import Pagination from '@/components/Pagination';

import { useIsMobile } from "@/hooks/useIsMobile";

export default function GalleryClient({ allGalleryItems }: any) {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(allGalleryItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allGalleryItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 bg-bg-base transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {currentItems.map((item: any, index: number) => (
            <motion.div 
              key={item.id} 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: (index % 3) * 0.1 }}
              className="group relative overflow-hidden shadow-sm break-inside-avoid cursor-pointer bg-bg-surface border border-border-main"
            >
              <div className="relative w-full">
                <Image 
                  src={item.imageUrl || "https://volunteermedicalcorps.org/admin/images/gallery/429831-3a.jpg"} 
                  alt={item.title || "Gallery Image"} 
                  width={500} 
                  height={500} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-400"
                  unoptimized
                />
                
                <div className="absolute inset-0 bg-brand-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 bg-brand-secondary flex items-center justify-center text-brand-primary text-xl mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <FaPlus />
                  </div>
                  {item.title && (
                    <h3 className="text-white font-bold text-sm leading-snug transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {item.title}
                    </h3>
                  )}
                  {item.category && (
                    <span className="text-brand-secondary text-[10px] font-bold uppercase tracking-widest mt-2">
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />

      </div>
    </section>
  );
}


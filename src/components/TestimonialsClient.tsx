"use client";

import { useState, useMemo } from "react";
import PageBanner from "@/components/PageBanner";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaHeart } from "react-icons/fa";
import Pagination from "@/components/Pagination";

import { useIsMobile } from "@/hooks/useIsMobile";

interface Testimonial {
  id: string;
  name: string;
  content: string;
  image: string | null;
  location?: string | null;
  role?: string | null;
}

interface TestimonialsClientProps {
  allTestimonials: Testimonial[];
}

export default function TestimonialsClient({ allTestimonials }: TestimonialsClientProps) {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Deduplicate testimonials by content
  const uniqueTestimonials = useMemo(() => {
    const seen = new Set<string>();
    return allTestimonials.filter((t: Testimonial) => {
      const duplicate = seen.has(t.content);
      seen.add(t.content);
      return !duplicate;
    });
  }, [allTestimonials]);

  const totalPages = Math.ceil(uniqueTestimonials.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTestimonials = uniqueTestimonials.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stripHtml = (html: string | null) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, '');
  };

  const cleanLocation = (location: string | null) => {
    if (!location) return "";
    // Remove everything after the first pipe or &nbsp;
    return location.split('|')[0].split('&nbsp;')[0].trim();
  };

  return (
    <div className="w-full bg-bg-base font-roboto transition-colors duration-300">
      <PageBanner title="Testimonials" parent={{ label: "Media", href: "/news" }} />

      <section className="py-24 bg-bg-base relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-20"
          >
            <h3 className="text-brand-secondary font-bold text-[13px] uppercase tracking-[0.2em] mb-4 flex justify-center items-center gap-2">
              <FaHeart /> #volunteerdiaries
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-brand-secondary mb-8 leading-tight uppercase">
              Stories of Impact
            </h2>
            <div className="w-24 h-1.5 bg-brand-secondary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {currentTestimonials.map((testimonial: any, index: number) => (
              <motion.div 
                key={index}
                initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (index % 3) * 0.1 }}
                className="bg-bg-surface p-10 shadow-lg border border-border-main flex flex-col items-center text-center relative mt-12 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-bg-surface overflow-hidden shadow-lg group-hover:border-brand-secondary transition-colors duration-300">
                  <Image 
                    src={testimonial.image || "https://volunteermedicalcorps.org/images/testimonies/patricia.jpg"} 
                    alt={testimonial.name} 
                    fill 
                    className="object-cover hover:grayscale transition-all duration-300" 
                    unoptimized 
                  />
                </div>
                
                <div className="text-brand-secondary opacity-10 absolute top-12 left-8">
                  <FaQuoteLeft size={48} />
                </div>
                
                <div className="flex gap-1 text-brand-secondary mb-6 mt-12">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                
                <p className="text-text-muted italic mb-8 flex-grow leading-relaxed font-medium z-10 relative">
                  &quot;{stripHtml(testimonial.content)}&quot;
                </p>
                
                <div className="w-full pt-6 border-t border-border-main">
                  <h4 className="text-brand-primary dark:text-brand-secondary font-bold text-sm uppercase tracking-widest">{testimonial.name}</h4>
                  <p className="text-text-muted text-[10px] font-bold mt-1 uppercase tracking-wider">{cleanLocation(testimonial.location || testimonial.role)}</p>
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


      <section className="py-20 bg-brand-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold uppercase mb-6">Share Your Own VMC Story</h2>
          <p className="text-base md:text-lg text-white/80 mb-10 leading-relaxed">
            Has your life been touched by the Volunteer Medical Corps? We'd love to hear about your experiences as a volunteer or a beneficiary.
          </p>
          <button className="group relative overflow-hidden bg-brand-secondary text-brand-primary px-12 py-5 font-bold uppercase tracking-widest transition-all shadow-xl">
            <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10">Submit Your Testimony</span>
          </button>
        </div>
      </section>
    </div>
  );
}

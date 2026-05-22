"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaCalendarAlt } from 'react-icons/fa';
import PageBanner from '@/components/PageBanner';
import Pagination from '@/components/Pagination';

export default function EventsClient({ allEvents }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const stripHtml = (html: string | null) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, '');
  };

  const getExcerpt = (description: string | null) => {
    if (!description) return "";
    const plainText = stripHtml(description);
    return plainText.substring(0, 150) + (plainText.length > 150 ? "..." : "");
  };

  const totalPages = Math.ceil(allEvents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = allEvents.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isUpcoming = allEvents.some((e: any) => new Date(e.date) >= new Date());

  return (
    <div className="w-full bg-white font-roboto">
      <PageBanner 
        title={isUpcoming ? "UPCOMING EVENTS" : "PAST EVENTS"} 
        parent={{ label: "Media", href: "#" }} 
      />
      
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {!isUpcoming && allEvents.length > 0 && (
            <div className="mb-12 p-4 bg-blue-50 border-l-4 border-[#002866] text-[#002866] text-sm font-medium">
              Note: There are currently no upcoming events scheduled. Showing our most recent past events below.
            </div>
          )}
          
          <div className="space-y-16">
            {currentEvents.map((event: any, index: number) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                className="group bg-white rounded-sm overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Event Image */}
                <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden bg-gray-900">
                  <Image 
                    src={event.image || "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg"} 
                    alt={event.title} 
                    fill sizes="(max-width: 1200px) 100vw, 900px" 
                    className="object-cover md:object-contain group-hover:scale-105 transition-transform duration-400"
                    unoptimized
                  />
                  {/* Overlay Tag */}
                  <div className="absolute top-6 left-6 bg-brand-secondary text-brand-primary px-4 py-1 text-[10px] font-bold uppercase tracking-widest shadow-lg rounded-sm">
                    Event
                  </div>
                </div>

                {/* Event Details Content */}
                <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  <div className="flex-1">
                    <div className="flex items-center text-brand-secondary text-xs font-bold uppercase tracking-widest mb-3">
                      <FaCalendarAlt className="mr-2" /> {formatDate(event.date)}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-brand-primary leading-tight mb-3 group-hover:text-brand-secondary transition-colors">
                      <Link href={`/events/${event.id}`}>{event.title}</Link>
                    </h3>
                    
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                      {getExcerpt(event.description)}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="md:ml-6 shrink-0 mt-4 md:mt-0">
                    <Link href={`/events/${event.id}`} className="group relative overflow-hidden inline-flex items-center bg-brand-primary text-white px-8 py-3.5 font-bold uppercase tracking-widest text-xs transition-all shadow-md whitespace-nowrap">
                      <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                      <span className="relative z-10 group-hover:text-brand-primary transition-colors">View Event</span>
                    </Link>
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
    </div>
  );
}


"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaCalendarAlt } from 'react-icons/fa';
import PageBanner from '@/components/PageBanner';

export default function EventsClient({ allEvents }: any) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getExcerpt = (description: string | null) => {
    if (!description) return "";
    return description.substring(0, 150) + (description.length > 150 ? "..." : "");
  };

  return (
    <div className="w-full bg-white font-roboto">
      <PageBanner title="UPCOMING EVENTS" parent={{ label: "Media", href: "#" }} />
      
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-16">
            {allEvents.map((event: any, index: number) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group bg-white rounded-sm overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Event Image */}
                <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden bg-gray-900">
                  <Image 
                    src={event.image || "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg"} 
                    alt={event.title} 
                    fill sizes="(max-width: 1200px) 100vw, 900px" 
                    className="object-cover md:object-contain group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  {/* Overlay Tag */}
                  <div className="absolute top-6 left-6 bg-[#ff9f22] text-[#002866] px-4 py-1.5 text-xs font-black uppercase tracking-widest shadow-lg">
                    Event
                  </div>
                </div>

                {/* Event Details Content */}
                <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  <div className="flex-1">
                    <div className="flex items-center text-[#ff9f22] text-sm font-bold uppercase tracking-widest mb-3">
                      <FaCalendarAlt className="mr-2" /> {formatDate(event.date)}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-poppins font-bold text-[#002866] leading-tight uppercase mb-3 group-hover:text-[#ff9f22] transition-colors">
                      <Link href={`/media/events/${event.id}`}>{event.title}</Link>
                    </h3>
                    
                    <p className="text-gray-500 text-base leading-relaxed">
                      {getExcerpt(event.description)}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="md:ml-6 shrink-0 mt-4 md:mt-0">
                    <Link href={`/media/events/${event.id}`} className="inline-flex items-center bg-[#002866] text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all rounded-sm shadow-md whitespace-nowrap">
                      View Event
                    </Link>
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

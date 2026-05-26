"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaVideo, FaChevronLeft, FaInstagram, FaGlobe } from 'react-icons/fa';
import PageBanner from '@/components/PageBanner';

export default function EventDetailClient({ event, otherEvents, galleryImages }: any) {
  if (!event) return null;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full bg-bg-base font-roboto transition-colors duration-300">
      <PageBanner title={event.title} parent={{ label: "Events", href: "/events" }} />
      
      <section className="py-16 md:py-24 bg-bg-base">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Left Column: Event Detail Content */}
            <div className="lg:w-2/3">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-bg-surface rounded-sm shadow-sm overflow-hidden border border-border-main transition-colors duration-300"
              >
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] bg-bg-base">
                  <Image 
                    src={event.image || "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg"} 
                    alt={event.title} 
                    fill 
                    className="object-cover md:object-contain"
                    unoptimized
                  />
                  {event.isLive && (
                    <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg animate-pulse rounded-sm">
                      <span className="w-2 h-2 bg-white rounded-full"></span> Live Now
                    </div>
                  )}
                </div>
                
                <div className="p-6 md:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 pb-10 border-b border-border-main">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 shrink-0 bg-brand-primary/10 flex items-center justify-center text-brand-primary dark:text-brand-secondary rounded-sm transition-colors duration-300">
                        <FaCalendarAlt className="text-xl" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1 transition-colors duration-300">Date</h4>
                        <p className="font-bold text-brand-primary dark:text-text-main transition-colors duration-300">
                          {event.startDate && event.endDate ? `${event.startDate} - ${event.endDate}` : formatDate(event.date)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 shrink-0 bg-brand-primary/10 flex items-center justify-center text-brand-primary dark:text-brand-secondary rounded-sm transition-colors duration-300">
                        <FaClock className="text-xl" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1 transition-colors duration-300">Time</h4>
                        <p className="font-bold text-brand-primary dark:text-text-main transition-colors duration-300">
                          {event.startTime && event.endTime ? `${event.startTime} - ${event.endTime}` : (event.startTime || "TBA")}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 shrink-0 bg-brand-primary/10 flex items-center justify-center text-brand-primary dark:text-brand-secondary rounded-sm transition-colors duration-300">
                        <FaMapMarkerAlt className="text-xl" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1 transition-colors duration-300">Location</h4>
                        <p className="font-bold text-brand-primary dark:text-text-main transition-colors duration-300">{event.location || "Online / Global"}</p>
                      </div>
                    </div>

                    {event.streamUrl && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 shrink-0 bg-brand-primary/10 flex items-center justify-center text-brand-primary dark:text-brand-secondary rounded-sm transition-colors duration-300">
                          <FaVideo className="text-xl" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1 transition-colors duration-300">Stream</h4>
                          <a href={event.streamUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-secondary hover:underline transition-colors duration-300">
                            Watch Live Stream
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-2xl md:text-4xl font-bold text-brand-primary dark:text-brand-secondary mb-8 leading-tight transition-colors duration-300">
                    {event.title}
                  </h1>
                  
                  {event.brief && (
                    <p className="text-xl text-text-muted font-medium mb-8 leading-relaxed italic border-l-4 border-brand-secondary pl-6 transition-colors duration-300">
                      {event.brief}
                    </p>
                  )}
                  
                  <div 
                    className="prose prose-lg max-w-none text-text-muted leading-relaxed mb-10 dark:prose-invert transition-colors duration-300"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                  
                  <div className="flex flex-wrap gap-4 pt-10 border-t border-border-main transition-colors duration-300">
                    {event.streamUrl && (
                      <a href={event.streamUrl} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden bg-brand-primary text-white px-8 py-3.5 font-bold uppercase tracking-widest text-xs transition-all shadow-md rounded-sm">
                        <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                        <span className="relative z-10 group-hover:text-brand-primary transition-colors">Join Event</span>
                      </a>
                    )}
                    <Link href="/events" className="inline-flex items-center text-brand-primary dark:text-brand-secondary font-bold hover:text-brand-secondary transition-colors px-4 py-3.5">
                      <FaChevronLeft className="mr-2" /> All Events
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:w-1/3 space-y-10">
              
              {/* Other Events Widget */}
              <div className="bg-bg-surface p-8 border border-border-main shadow-sm rounded-sm transition-colors duration-300">
                <h3 className="text-xl font-poppins font-bold text-brand-primary dark:text-brand-secondary mb-6 pb-3 border-b-2 border-brand-secondary inline-block">More Events</h3>
                <ul className="space-y-6">
                  {otherEvents.map((item: any, index: number) => (
                    <li key={index} className="flex items-center gap-4 group cursor-pointer">
                      <div className="relative w-[70px] h-[70px] shrink-0 overflow-hidden rounded-sm bg-bg-base">
                        <Image src={item.image || "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg"} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" unoptimized />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-primary dark:text-text-main text-sm group-hover:text-brand-secondary transition-colors leading-tight mb-1">
                          <Link href={`/events/${item.id}`}>{item.title}</Link>
                        </h4>
                        <div className="flex items-center text-[10px] text-text-muted font-bold uppercase tracking-wider transition-colors duration-300">
                          <FaCalendarAlt className="mr-1 text-brand-secondary" /> {formatDate(item.date)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Photo Gallery Widget */}
              <div className="bg-bg-surface p-8 border border-border-main shadow-sm rounded-sm transition-colors duration-300">
                <h3 className="text-xl font-poppins font-bold text-brand-primary dark:text-brand-secondary mb-6 pb-3 border-b-2 border-brand-secondary inline-block">Photo Gallery</h3>
                <div className="grid grid-cols-3 gap-2">
                  {galleryImages.map((src: string, index: number) => (
                    <div key={index} className="relative aspect-square overflow-hidden group cursor-pointer rounded-sm bg-bg-base">
                      <Image src={src} alt="Gallery" fill className="object-cover" unoptimized />
                      <div className="absolute inset-0 bg-brand-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xl">
                        <FaInstagram />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Global Impact CTA */}
              <div className="relative bg-brand-secondary p-8 text-center text-brand-primary rounded-sm overflow-hidden shadow-xl">
                <div className="relative z-10">
                  <FaGlobe className="text-4xl mx-auto mb-4 opacity-50" />
                  <h5 className="font-black uppercase tracking-widest text-[10px] mb-2">Volunteer With Us</h5>
                  <h2 className="text-xl font-poppins font-bold mb-6 leading-tight">Join our global network of medical professionals.</h2>
                  <Link href="/volunteer" className="group relative overflow-hidden inline-flex items-center bg-brand-primary text-white px-6 py-3 font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg rounded-sm">
                    <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                    <span className="relative z-10 group-hover:text-brand-primary transition-colors">Register Now</span>
                  </Link>
                </div>
              </div>

            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}

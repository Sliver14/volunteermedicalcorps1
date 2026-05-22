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
    <div className="w-full bg-white font-roboto">
      <PageBanner title={event.title} parent={{ label: "Events", href: "/events" }} />
      
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Left Column: Event Detail Content */}
            <div className="lg:w-2/3">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-sm shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-900">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 pb-10 border-b border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 shrink-0 bg-blue-50 flex items-center justify-center text-brand-primary rounded-sm">
                        <FaCalendarAlt className="text-xl" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Date</h4>
                        <p className="font-bold text-brand-primary">
                          {event.startDate && event.endDate ? `${event.startDate} - ${event.endDate}` : formatDate(event.date)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 shrink-0 bg-blue-50 flex items-center justify-center text-brand-primary rounded-sm">
                        <FaClock className="text-xl" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Time</h4>
                        <p className="font-bold text-brand-primary">
                          {event.startTime && event.endTime ? `${event.startTime} - ${event.endTime}` : (event.startTime || "TBA")}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 shrink-0 bg-blue-50 flex items-center justify-center text-brand-primary rounded-sm">
                        <FaMapMarkerAlt className="text-xl" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Location</h4>
                        <p className="font-bold text-brand-primary">{event.location || "Online / Global"}</p>
                      </div>
                    </div>

                    {event.streamUrl && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 shrink-0 bg-blue-50 flex items-center justify-center text-brand-primary rounded-sm">
                          <FaVideo className="text-xl" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Stream</h4>
                          <a href={event.streamUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-secondary hover:underline">
                            Watch Live Stream
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-2xl md:text-4xl font-bold text-brand-primary mb-8 leading-tight">
                    {event.title}
                  </h1>
                  
                  {event.brief && (
                    <p className="text-xl text-gray-600 font-medium mb-8 leading-relaxed italic border-l-4 border-brand-secondary pl-6">
                      {event.brief}
                    </p>
                  )}
                  
                  <div 
                    className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-10"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                  
                  <div className="flex flex-wrap gap-4 pt-10 border-t border-gray-100">
                    {event.streamUrl && (
                      <a href={event.streamUrl} target="_blank" rel="noopener noreferrer" className="bg-brand-primary text-white px-8 py-3.5 font-bold uppercase tracking-widest text-xs transition-all shadow-md hover:bg-brand-secondary hover:text-brand-primary rounded-sm">
                        Join Event
                      </a>
                    )}
                    <Link href="/events" className="inline-flex items-center text-brand-primary font-bold hover:text-brand-secondary transition-colors px-4 py-3.5">
                      <FaChevronLeft className="mr-2" /> All Events
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:w-1/3 space-y-10">
              
              {/* Other Events Widget */}
              <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm">
                <h3 className="text-xl font-poppins font-bold text-[#002866] mb-6 pb-3 border-b-2 border-[#ff9f22] inline-block">More Events</h3>
                <ul className="space-y-6">
                  {otherEvents.map((item: any, index: number) => (
                    <li key={index} className="flex items-center gap-4 group cursor-pointer">
                      <div className="relative w-[70px] h-[70px] shrink-0 overflow-hidden rounded-sm bg-gray-100">
                        <Image src={item.image || "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg"} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" unoptimized />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#002866] text-sm group-hover:text-[#ff9f22] transition-colors leading-tight mb-1">
                          <Link href={`/events/${item.id}`}>{item.title}</Link>
                        </h4>
                        <div className="flex items-center text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                          <FaCalendarAlt className="mr-1 text-[#ff9f22]" /> {formatDate(item.date)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Photo Gallery Widget */}
              <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm">
                <h3 className="text-xl font-poppins font-bold text-[#002866] mb-6 pb-3 border-b-2 border-[#ff9f22] inline-block">Photo Gallery</h3>
                <div className="grid grid-cols-3 gap-2">
                  {galleryImages.map((src: string, index: number) => (
                    <div key={index} className="relative aspect-square overflow-hidden group cursor-pointer rounded-sm">
                      <Image src={src} alt="Gallery" fill className="object-cover" unoptimized />
                      <div className="absolute inset-0 bg-[#002866]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xl">
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
                  <Link href="/volunteer" className="inline-flex items-center bg-brand-primary text-white px-6 py-3 font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-brand-primary transition-all shadow-lg rounded-sm">
                    Register Now
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

"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaCalendarAlt, FaHeart } from 'react-icons/fa';

export default function EventsPage() {
  const events = [
    { title: "Global Day of Prayer", date: "March 27, 2026", excerpt: "March 27th - 28th March 2026...", image: "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg", link: "#" },
    { title: "GOOD DEEDS FIESTA", date: "August 01, 2025", excerpt: "#VMCGoodDeedsFiesta is here!!! 🎉🎉🎉💃...", image: "https://volunteermedicalcorps.org/admin/images/events/1755274146Ms1V7Yu5D.jpg", link: "#" },
    { title: "GLOBAL HOSPITAL OUTREACH CAMPAIGN", date: "June 23, 2025", excerpt: "Global Hospital outreach Campaign 2025...", image: "https://volunteermedicalcorps.org/admin/images/events/1750698188Quha4opTR.jpg", link: "#" },
    { title: "YOUNG MEDICS CONFERENCE CAPE TOWN", date: "May 17, 2025", excerpt: "...", image: "https://volunteermedicalcorps.org/admin/images/events/1749249547wheUCSbgX.jpg", link: "#" },
    { title: "G.E.M.S SUMMIT CANADA", date: "May 03, 2025", excerpt: "...", image: "https://volunteermedicalcorps.org/admin/images/events/17492488136xSM4cdgG.jpg", link: "#" },
    { title: "YOUNG MEDICS CONFERENCE SOUTH AFRICA", date: "May 03, 2025", excerpt: "...", image: "https://volunteermedicalcorps.org/admin/images/events/17492481551xNyWaoeQ.jpg", link: "#" },
    { title: "VMC COORDINATORS AND VOLUNTEERS SUMMIT", date: "January 31, 2025", excerpt: "31st January 2025...", image: "https://volunteermedicalcorps.org/admin/images/events/1736944563kmL3XhHsG.jpg", link: "#" },
    { title: "VMC CELEBRATES WORLD HUMANITARIAN DAY", date: "August 19, 2024", excerpt: "August 19th World Humanitarian Day 2024...", image: "https://volunteermedicalcorps.org/admin/images/events/1723455655DUjYkERc2.jpg", link: "#" },
    { title: "LIGHT OF HOPE CAMPAIGN 2024", date: "February 01, 2024", excerpt: "Bringing smiles to cancer patients ...", image: "https://volunteermedicalcorps.org/admin/images/events/1706695024gsBYNPX8H.jpg", link: "#" },
    { title: "Global Hospital Outreach Campaign 2023", date: "January 01, 2023", excerpt: "Reaching 2 million people in 196 countries...", image: "https://volunteermedicalcorps.org/admin/images/events/1695118806rE8HgQ1Wj.jpg", link: "#" },
    { title: "World Humanitarian Day 2023", date: "August 19, 2023", excerpt: "Join us to gift 1 Million Smiles this August...", image: "https://volunteermedicalcorps.org/admin/images/events/1691678226mgYXz9GoJ.jpg", link: "#" },
    { title: "Global Voluntary Blood Donation Campaign 2023", date: "June 01, 2023", excerpt: "Good Deeds Campaign...", image: "https://volunteermedicalcorps.org/admin/images/events/1687949554xgUj15HVF.jpg", link: "#" },
    { title: "Global Day of Prayer", date: "June 23, 2023", excerpt: "...", image: "https://volunteermedicalcorps.org/admin/images/events/1687518353E3VdGRAxS.jpg", link: "#" },
    { title: "International Nurses Week 2023", date: "May 07, 2023", excerpt: "Superheroes in scrubs....", image: "https://volunteermedicalcorps.org/admin/images/events/1683892574nXZrLJU2H.jpg", link: "#" },
    { title: "Diabetes Prevention and Control - A Webinar", date: "April 20, 2023", excerpt: "...", image: "https://volunteermedicalcorps.org/admin/images/events/1681540081HqXPV2eEd.jpg", link: "#" }
  ];

  return (
    <div className="w-full bg-white font-roboto">
      <PageBanner title="UPCOMING EVENTS" parent={{ label: "Media", href: "#" }} />
      
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-16">
            {events.map((event, index) => (
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
                    src={event.image} 
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
                      <FaCalendarAlt className="mr-2" /> {event.date}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-poppins font-bold text-[#002866] leading-tight uppercase mb-3 group-hover:text-[#ff9f22] transition-colors">
                      <Link href={event.link}>{event.title}</Link>
                    </h3>
                    
                    {event.excerpt && event.excerpt !== "..." && (
                      <p className="text-gray-500 text-base leading-relaxed">
                        {event.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="md:ml-6 shrink-0 mt-4 md:mt-0">
                    <Link href={event.link} className="inline-flex items-center bg-[#002866] text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all rounded-sm shadow-md whitespace-nowrap">
                      View Event
                    </Link>
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-20 flex justify-center">
            <button className="bg-white border-2 border-[#002866] text-[#002866] px-12 py-4 font-black uppercase tracking-widest text-sm hover:bg-[#002866] hover:text-white transition-all rounded-sm shadow-sm">
              Load More Events
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}

"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaPlus } from 'react-icons/fa';

export default function GalleryPage() {
  const images = [
    { title: "Community Health Outreach at Kakuri, Kaduna, Nigeria", src: "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg" },
    { title: "Community Health Outreach at Kakuri, Kaduna", src: "https://volunteermedicalcorps.org/admin/images/gallery/429831-3a.jpg" },
    { title: "Free medical outreach in Usi-Ekiti", src: "https://volunteermedicalcorps.org/admin/images/gallery/591783-2.jpg" },
    { title: "P.A.L.M.S program Ukz4", src: "https://volunteermedicalcorps.org/admin/images/gallery/798453-1.jpg" },
    { title: "VMC BRONX MEDICAL OUTREACH", src: "https://volunteermedicalcorps.org/admin/images/gallery/173895-bronx3.jpg" },
    { title: "VMC BRONX MEDICAL OUTREACH", src: "https://volunteermedicalcorps.org/admin/images/gallery/673195-bronx.jpg" },
    { title: "VMC Ministers to War-Displaced Children in Romania", src: "https://volunteermedicalcorps.org/admin/images/gallery/835192-program1c.jpg" },
    { title: "Providing Care and Support to the Community - Ottawa Canada", src: "https://volunteermedicalcorps.org/admin/images/gallery/673549-ot3.jpg" },
    { title: "Providing Care and Support to the Community - Ottawa Canada", src: "https://volunteermedicalcorps.org/admin/images/gallery/837296-ot2.jpg" },
    { title: "Providing Care and Support to the Community - Ottawa Canada", src: "https://volunteermedicalcorps.org/admin/images/gallery/681943-ot1.jpg" },
    { title: "MEDICAL OUTREACH TO OPOLO COMMUNITY, YENAGOA, BAYELSA STATE", src: "https://volunteermedicalcorps.org/admin/images/gallery/819253-3.jpg" },
    { title: "MEDICAL OUTREACH TO OPOLO COMMUNITY, YENAGOA, BAYELSA STATE", src: "https://volunteermedicalcorps.org/admin/images/gallery/651943-2.jpg" },
    { title: "MEDICAL OUTREACH TO OPOLO COMMUNITY, YENAGOA, BAYELSA STATE", src: "https://volunteermedicalcorps.org/admin/images/gallery/527143-1.jpg" },
    { title: "Medical Outreach at Ilaje Community, Ajah, Lagos State", src: "https://volunteermedicalcorps.org/admin/images/gallery/172358-4.jpg" },
    { title: "Medical Outreach at Ilaje Community, Ajah, Lagos State", src: "https://volunteermedicalcorps.org/admin/images/gallery/765184-3.jpg" }
  ];

  return (
    <div className="w-full bg-white font-roboto">
      <PageBanner title="PHOTO GALLERY" parent={{ label: "Media", href: "#" }} />
      
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-sm shadow-sm break-inside-avoid cursor-pointer bg-white"
              >
                <div className="relative w-full">
                  {/* We use next/image with unoptimized and object-cover to emulate the responsive masonry images */}
                  <Image 
                    src={item.src} 
                    alt={item.title} 
                    width={500} // Placeholder width to allow intrinsic aspect ratio behavior
                    height={500} // Placeholder height
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#002866]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-12 h-12 bg-[#ff9f22] rounded-full flex items-center justify-center text-[#002866] text-xl mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <FaPlus />
                    </div>
                    <h3 className="text-white font-bold text-sm leading-snug transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-20 flex justify-center">
            <nav>
              <ul className="flex items-center gap-2 flex-wrap justify-center">
                <li><span className="w-10 h-10 flex items-center justify-center bg-[#002866] text-white font-bold rounded-sm shadow-sm">1</span></li>
                <li><Link href="#" className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 border border-gray-200 hover:border-[#002866] hover:text-[#002866] font-bold rounded-sm transition-colors">2</Link></li>
                <li><Link href="#" className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 border border-gray-200 hover:border-[#002866] hover:text-[#002866] font-bold rounded-sm transition-colors">3</Link></li>
                <li><span className="w-10 h-10 flex items-center justify-center text-gray-400 font-bold">...</span></li>
                <li><Link href="#" className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 border border-gray-200 hover:border-[#002866] hover:text-[#002866] font-bold rounded-sm transition-colors">24</Link></li>
              </ul>
            </nav>
          </div>

        </div>
      </section>
    </div>
  );
}

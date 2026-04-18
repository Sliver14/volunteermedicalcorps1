"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import { motion } from "framer-motion";

export default function GalleryPage() {
  const albums = [
    { title: "Community Health Outreach at Kakuri, Kaduna", image: "/give-15-768x512.jpg" },
    { title: "Free medical outreach in Usi-Ekiti", image: "/give-17-300x200.jpg" },
    { title: "P.A.L.M.S program Ukz4", image: "/give-20-768x512.jpg" },
    { title: "VMC Bronx Medical Outreach", image: "/sw-post-1-min-768x512.jpg" },
    { title: "VMC Ministers to Children in Romania", image: "/sw-post-3-min-300x200.jpg" },
    { title: "Care and Support Outreach - Ottawa Canada", image: "/vcn-post-7-min-768x512.jpg" },
    { title: "Medical Outreach in Yenagoa, Bayelsa", image: "/give-15-768x512.jpg" },
    { title: "Medical Outreach at Ajah, Lagos State", image: "/give-17-300x200.jpg" }
  ];

  return (
    <div className="w-full bg-white">
      <PageBanner title="PHOTO GALLERY" parent={{ label: "Media", href: "#" }} />
      
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h6 className="text-[#ff9f22] font-bold tracking-widest uppercase mb-4">Our Memories</h6>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-[#002866] uppercase">Capturing the Impact</h2>
            <div className="w-24 h-1 bg-[#ff9f22] mx-auto mt-6"></div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {albums.map((album, index) => (
              <motion.div 
                key={index} 
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
                }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden rounded-sm mb-4 shadow-md">
                  <Image 
                    src={album.image} 
                    alt={album.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#002866]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-4xl">+</span>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-[#002866] uppercase tracking-wider text-center group-hover:text-[#ff9f22] transition-colors line-clamp-2">
                  {album.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 md:mt-20 text-center">
            <button className="w-full sm:w-auto border-2 border-[#002866] text-[#002866] px-12 py-4 font-black uppercase tracking-widest hover:bg-[#002866] hover:text-white transition-all">
              Load More Albums
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

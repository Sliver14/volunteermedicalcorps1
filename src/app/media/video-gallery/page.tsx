"use client";

import { useState } from 'react';
import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import { FaShareAlt, FaFacebookF, FaTwitter, FaWhatsapp, FaLink } from 'react-icons/fa';
import { motion } from "framer-motion";

export default function VideoGalleryPage() {
  const [activeShareMenu, setActiveShareMenu] = useState<number | null>(null);
  
  const videos = [
    { title: "Simple ways to prevent cardiac arrest", image: "/give-15-768x512.jpg" },
    { title: "LOVEWORLD MEDICAL MISSIONS TRIP TO EGYPT", image: "/give-17-300x200.jpg" },
    { title: "WE ARE LOVEWORLD VOLUNTEER MEDICAL CORPS", image: "/give-20-768x512.jpg" },
    { title: "THERE ARE GOOD DOCTORS", image: "/sw-post-1-min-768x512.jpg" },
    { title: "Simple ways to care for your teeth", image: "/sw-post-3-min-300x200.jpg" },
    { title: "FLOURIDE IN YOUR WATER AND MILK", image: "/vcn-post-7-min-768x512.jpg" },
    { title: "Global Hospital Outreach Campaign", image: "/give-15-768x512.jpg" },
    { title: "OUR TEAM IN PUNR INDIA", image: "/give-17-300x200.jpg" },
    { title: "HOW TO PLAN A MEDICAL OUTREACH", image: "/give-20-768x512.jpg" }
  ];

  const handleShare = (index: number) => {
    setActiveShareMenu(activeShareMenu === index ? null : index);
  };

  const copyToClipboard = (title: string) => {
    // In a real app, generate the actual video URL here
    navigator.clipboard.writeText(`Check out this video: ${title} - https://vmc.org/video`);
    setActiveShareMenu(null);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="w-full bg-white">
      <PageBanner title="VIDEO GALLERY" parent={{ label: "Media", href: "#" }} />
      
      {/* Featured Video */}
      <section className="py-16 md:py-24 bg-[#002866]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video bg-black rounded-sm overflow-hidden shadow-2xl group cursor-pointer"
            >
              <Image 
                src="/pmr-bg-slide.jpg" 
                alt="Featured Video" 
                fill 
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#ff9f22] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#002866] border-b-[12px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white space-y-6 relative"
            >
              <h6 className="text-[#ff9f22] font-bold tracking-widest uppercase">Featured Video</h6>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold leading-tight">WE ARE LOVEWORLD VOLUNTEER MEDICAL CORPS</h2>
              <p className="text-gray-300 text-lg">Learn more about our mission, our people, and the global impact we are making in regions of crisis and communities in need.</p>
              
              <div className="flex gap-4">
                <button className="bg-[#ff9f22] text-[#002866] px-10 py-4 font-black uppercase tracking-widest hover:bg-white transition-all">
                  Watch Full Story
                </button>
                <button 
                  onClick={() => handleShare(-1)}
                  className="bg-transparent border-2 border-white/20 hover:border-white text-white px-6 py-4 transition-all flex items-center gap-2"
                >
                  <FaShareAlt /> <span className="font-bold tracking-wider uppercase text-sm">Share</span>
                </button>
              </div>

              {/* Featured Video Share Menu */}
              {activeShareMenu === -1 && (
                <div className="absolute top-full left-0 mt-4 md:left-[200px] md:bottom-[-60px] md:top-auto z-50 bg-white shadow-xl rounded-sm p-2 flex gap-2 animate-fadeIn border border-gray-100">
                  <button onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=vmc.org`, '_blank')} className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"><FaFacebookF /></button>
                  <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=Watch this!`, '_blank')} className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"><FaTwitter /></button>
                  <button onClick={() => window.open(`https://api.whatsapp.com/send?text=Watch this!`, '_blank')} className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"><FaWhatsapp /></button>
                  <button onClick={() => copyToClipboard('WE ARE LOVEWORLD VOLUNTEER MEDICAL CORPS')} className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"><FaLink /></button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-poppins font-bold text-[#002866] uppercase">Latest Videos</h2>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {videos.map((video, index) => (
              <motion.div 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="group flex flex-col relative"
              >
                <div className="relative h-56 overflow-hidden rounded-sm mb-4 shadow-lg cursor-pointer">
                  <Image 
                    src={video.image} 
                    alt={video.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-[#ff9f22] group-hover:border-[#ff9f22] transition-all shadow-md">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white group-hover:border-l-[#002866] border-b-[6px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#002866] group-hover:text-[#ff9f22] transition-colors leading-snug cursor-pointer">
                      {video.title}
                    </h3>
                    <div className="mt-1 text-xs font-roboto text-gray-400 uppercase tracking-widest">VMC Media • 2024</div>
                  </div>
                  
                  <div className="relative">
                    <button 
                      onClick={() => handleShare(index)}
                      className="p-2 text-gray-400 hover:text-[#002866] transition-colors rounded-full hover:bg-gray-100"
                    >
                      <FaShareAlt />
                    </button>
                    
                    {/* Share Menu Dropdown */}
                    {activeShareMenu === index && (
                      <div className="absolute right-0 top-10 z-20 bg-white shadow-xl rounded-sm p-3 flex gap-2 animate-fadeIn border border-gray-100">
                        <button onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=vmc.org`, '_blank')} className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"><FaFacebookF size={12} /></button>
                        <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=Watch: ${video.title}`, '_blank')} className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"><FaTwitter size={12} /></button>
                        <button onClick={() => window.open(`https://api.whatsapp.com/send?text=Watch: ${video.title}`, '_blank')} className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"><FaWhatsapp size={12} /></button>
                        <button onClick={() => copyToClipboard(video.title)} className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"><FaLink size={12} /></button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 md:mt-20 text-center">
            <button className="w-full sm:w-auto border-2 border-[#002866] text-[#002866] px-12 py-4 font-black uppercase tracking-widest hover:bg-[#002866] hover:text-white transition-all">
              Browse More Videos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

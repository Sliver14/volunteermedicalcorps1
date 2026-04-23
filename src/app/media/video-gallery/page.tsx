"use client";

import { useState } from 'react';
import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import { FaShareAlt, FaFacebookF, FaTwitter, FaWhatsapp, FaLink, FaPlay, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";

export default function VideoGalleryPage() {
  const [activeShareMenu, setActiveShareMenu] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  
  const videos = [
    { title: "Simple ways to prevent cardiac arrest", image: "https://volunteermedicalcorps.org/admin/images/videos/513726-vlcsnap-2025-09-15-13h05m35s620.png", url: "https://cdnvideos.ceflix.org/processed/155112-1757938061446036692468.mp4" },
    { title: "LOVEWORLD MEDICAL MISSIONS TRIP TO EGYPT", image: "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg", url: "https://cdnvideos.ceflix.org/processed/155112-1757938061446036692468.mp4" },
    { title: "WE ARE LOVEWORLD VOLUNTEER MEDICAL CORPS", image: "https://volunteermedicalcorps.org/admin/images/gallery/429831-3a.jpg", url: "https://cdnvideos.ceflix.org/processed/155112-1757938061446036692468.mp4" },
    { title: "THERE ARE GOOD DOCTORS", image: "https://volunteermedicalcorps.org/admin/images/gallery/591783-2.jpg", url: "https://cdnvideos.ceflix.org/processed/155112-1757938061446036692468.mp4" },
    { title: "Simple ways to care for your teeth", image: "https://volunteermedicalcorps.org/admin/images/gallery/798453-1.jpg", url: "https://cdnvideos.ceflix.org/processed/155112-1757938061446036692468.mp4" },
    { title: "FLOURIDE IN YOUR WATER AND MILK", image: "https://volunteermedicalcorps.org/admin/images/gallery/173895-bronx3.jpg", url: "https://cdnvideos.ceflix.org/processed/155112-1757938061446036692468.mp4" },
    { title: "Global Hospital Outreach Campaign", image: "https://volunteermedicalcorps.org/admin/images/gallery/673195-bronx.jpg", url: "https://cdnvideos.ceflix.org/processed/155112-1757938061446036692468.mp4" },
    { title: "OUR TEAM IN PUNR INDIA", image: "https://volunteermedicalcorps.org/admin/images/gallery/835192-program1c.jpg", url: "https://cdnvideos.ceflix.org/processed/155112-1757938061446036692468.mp4" },
    { title: "HOW TO PLAN A MEDICAL OUTREACH", image: "https://volunteermedicalcorps.org/admin/images/gallery/673549-ot3.jpg", url: "https://cdnvideos.ceflix.org/processed/155112-1757938061446036692468.mp4" }
  ];

  const handleShare = (index: number) => setActiveShareMenu(activeShareMenu === index ? null : index);

  const copyToClipboard = (title: string) => {
    navigator.clipboard.writeText(`Check out this video: ${title} - https://vmc.org/video`);
    setActiveShareMenu(null);
    alert('Link copied to clipboard!');
  };

  const openVideoModal = (videoUrl: string) => {
    setCurrentVideo(videoUrl);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setCurrentVideo("");
  };

  return (
    <div className="w-full bg-white font-roboto">
      <PageBanner title="VIDEO GALLERY" parent={{ label: "Media", href: "#" }} />
      
      {/* Featured Video Section (Matched to HTML Template) */}
      <section className="bg-black pb-0 md:pb-12 lg:pb-0 overflow-hidden">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row items-stretch">
            
            {/* Left: Video Player Thumbnail */}
            <div className="lg:w-2/3 relative">
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-80"
                  style={{ backgroundImage: "url('https://volunteermedicalcorps.org/admin/images/videos/513726-vlcsnap-2025-09-15-13h05m35s620.png')" }}
                ></div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Play Button Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => openVideoModal("https://cdnvideos.ceflix.org/processed/155112-1757938061446036692468.mp4")}
                    className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm border-2 border-white rounded-full flex items-center justify-center text-white text-3xl hover:bg-[#ff9f22] hover:border-[#ff9f22] hover:text-[#002866] transition-all duration-300 transform hover:scale-110 shadow-2xl group"
                  >
                    <FaPlay className="ml-2 group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                {/* Bottom Details Box */}
                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full max-w-2xl">
                  <div className="bg-white rounded-sm shadow-xl p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Image 
                        src="https://volunteermedicalcorps.org/images/default-avatar.jpg" 
                        alt="Admin" 
                        width={45} height={45} 
                        className="rounded-full"
                        unoptimized
                      />
                      <h4 className="font-bold text-[#002866] text-sm md:text-base uppercase leading-snug pr-4 border-r border-gray-100">
                        Simple ways to prevent cardiac arrest
                      </h4>
                    </div>
                    <button 
                      onClick={() => openVideoModal("https://cdnvideos.ceflix.org/processed/155112-1757938061446036692468.mp4")}
                      className="shrink-0 bg-[#ff9f22] text-[#002866] px-8 py-3 font-black uppercase tracking-widest text-xs hover:bg-[#002866] hover:text-white transition-all shadow-md rounded-sm"
                    >
                      WATCH
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Title and Meta Panel */}
            <div className="lg:w-1/3 bg-[#002866] p-10 md:p-16 lg:p-20 flex flex-col justify-center relative">
              {/* Decorative Pattern overlay */}
              <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute -bottom-24 -right-24 w-96 h-96 border-[40px] border-white rounded-full"></div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10"
              >
                <h6 className="text-[#ff9f22] font-black uppercase tracking-widest text-xs mb-4">Featured Highlight</h6>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-white mb-10 leading-tight">
                  Simple ways to prevent cardiac arrest
                </h2>
                
                <div className="border-t border-white/20 pt-8 mt-4">
                  <h3 className="text-white text-xl font-bold mb-2">VMC Videos</h3>
                  <div className="flex items-center gap-4 mt-6">
                    <button 
                      onClick={() => openVideoModal("https://cdnvideos.ceflix.org/processed/155112-1757938061446036692468.mp4")}
                      className="bg-white text-[#002866] px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-[#ff9f22] transition-colors rounded-sm"
                    >
                      Play Video
                    </button>
                    <button 
                      onClick={() => handleShare(-1)}
                      className="text-white hover:text-[#ff9f22] transition-colors p-3 border border-white/20 hover:border-white/50 rounded-sm"
                    >
                      <FaShareAlt />
                    </button>
                  </div>

                  {/* Share Menu for Featured */}
                  {activeShareMenu === -1 && (
                    <div className="mt-4 bg-white shadow-xl rounded-sm p-2 flex gap-2 animate-fadeIn border border-gray-100 max-w-fit">
                      <button onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=vmc.org`, '_blank')} className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"><FaFacebookF /></button>
                      <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=Watch this!`, '_blank')} className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"><FaTwitter /></button>
                      <button onClick={() => window.open(`https://api.whatsapp.com/send?text=Watch this!`, '_blank')} className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"><FaWhatsapp /></button>
                      <button onClick={() => copyToClipboard('Simple ways to prevent cardiac arrest')} className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"><FaLink /></button>
                    </div>
                  )}

                </div>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
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
                className="group flex flex-col relative bg-white p-4 rounded-sm shadow-sm border border-gray-100"
              >
                <div 
                  onClick={() => openVideoModal(video.url)}
                  className="relative h-56 overflow-hidden rounded-sm mb-4 shadow-md cursor-pointer"
                >
                  <Image 
                    src={video.image} 
                    alt={video.title} 
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-[#002866]/20 group-hover:bg-[#002866]/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[#ff9f22] group-hover:text-[#002866] text-white transition-all shadow-lg transform group-hover:scale-110">
                      <FaPlay className="ml-1 text-xl" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-start gap-4 mt-2">
                  <div className="flex-1">
                    <h3 onClick={() => openVideoModal("https://cdnvideos.ceflix.org/processed/155112-1757938061446036692468.mp4")} className="text-sm font-bold text-[#002866] group-hover:text-[#ff9f22] transition-colors leading-snug cursor-pointer uppercase pr-4">
                      {video.title}
                    </h3>
                  </div>
                  
                  <div className="relative shrink-0">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleShare(index); }}
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

          <div className="mt-16 text-center">
            <nav>
              <ul className="flex items-center gap-2 flex-wrap justify-center">
                <li><span className="w-10 h-10 flex items-center justify-center bg-[#002866] text-white font-bold rounded-sm shadow-sm">1</span></li>
                <li><button className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 border border-gray-200 hover:border-[#002866] hover:text-[#002866] font-bold rounded-sm transition-colors">2</button></li>
                <li><button className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 border border-gray-200 hover:border-[#002866] hover:text-[#002866] font-bold rounded-sm transition-colors">3</button></li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          >
            <button 
              onClick={closeVideoModal}
              className="absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors"
            >
              <FaTimes size={32} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-6xl aspect-video bg-black shadow-2xl rounded-sm overflow-hidden"
            >
              <video 
                src={currentVideo} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

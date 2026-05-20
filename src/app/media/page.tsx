"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaChevronRight, FaPlay, FaCalendarAlt, FaPlus } from 'react-icons/fa';
import { useIsMobile } from "@/hooks/useIsMobile";

export default function MediaHubPage() {
  const isMobile = useIsMobile();
  
  const newsHighlight = {
    title: "Good Deeds, Real Impact",
    date: "Apr 09, 2026",
    image: "https://volunteermedicalcorps.org/admin/images/media/onrZbfR8N463291785.jpg",
    excerpt: "Savings lives every day through our dedicated volunteers across the globe...",
    link: "/news"
  };

  const blogPosts = [
    { title: "Just Move", date: "Mar 18, 2026", image: "https://volunteermedicalcorps.org/admin/images/media/en9p2Ej1Q341529768.jpg", link: "/blog" },
    { title: "Drink More Water", date: "Jan 30, 2026", image: "https://volunteermedicalcorps.org/admin/images/media/nLFm9kAhE159426873.jpg", link: "/blog" },
    { title: "Healthy Snacking", date: "Oct 03, 2025", image: "https://volunteermedicalcorps.org/admin/images/media/3UwoVDLzt269573418.jpg", link: "/blog" }
  ];

  const upcomingEvent = {
    title: "Global Day of Prayer",
    date: "March 27, 2026",
    image: "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg",
    link: "/events"
  };

  const galleryItems = [
    "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg",
    "https://volunteermedicalcorps.org/admin/images/gallery/591783-2.jpg",
    "https://volunteermedicalcorps.org/admin/images/gallery/673195-bronx.jpg",
    "https://volunteermedicalcorps.org/admin/images/gallery/835192-program1c.jpg"
  ];

  return (
    <div className="w-full bg-bg-base font-roboto transition-colors duration-300">
      <PageBanner title="MEDIA HUB" />

      {/* 1. Latest News Highlight */}
      <section className="py-16 md:py-24 bg-bg-base transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="lg:w-1/2"
            >
              <span className="text-brand-secondary font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4 block">Latest News</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-primary dark:text-brand-secondary mb-6 leading-tight uppercase tracking-tight">
                {newsHighlight.title}
              </h2>
              <p className="text-text-muted text-base md:text-lg mb-8 leading-relaxed font-medium opacity-90">
                {newsHighlight.excerpt}
              </p>
              <Link href={newsHighlight.link} className="group relative overflow-hidden inline-flex items-center bg-brand-primary text-white px-8 md:px-10 py-4 font-bold uppercase tracking-widest text-xs md:text-sm shadow-xl transition-all">
                 <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                 <span className="relative z-10 group-hover:text-brand-primary transition-colors flex items-center">
                    Read Full Story <FaChevronRight className="ml-3 text-[10px]" />
                 </span>
              </Link>
            </motion.div>
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="lg:w-1/2 relative"
            >
              <div className="relative h-[350px] md:h-[500px] w-full overflow-hidden shadow-2xl border-[10px] border-bg-surface">
                <Image src={newsHighlight.image} alt={newsHighlight.title} fill className="object-cover group-hover:scale-105 transition-transform duration-400" unoptimized />
              </div>
              {/* Decorative background element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-secondary/20 -z-10 hidden md:block"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Media Navigation Grid (Categories) */}
      <section className="py-16 md:py-24 bg-bg-surface border-y border-border-main transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "News & Press", href: "/news", icon: FaChevronRight, bg: "bg-brand-primary" },
              { label: "VMC Blog", href: "/blog", icon: FaChevronRight, bg: "bg-brand-secondary" },
              { label: "Global Events", href: "/events", icon: FaChevronRight, bg: "bg-cyan-600" },
              { label: "Video Gallery", href: "/video-gallery", icon: FaPlay, bg: "bg-red-600" }
            ].map((cat, i) => (
              <Link key={i} href={cat.href} className={`${cat.bg} p-10 text-white group transition-all duration-300 shadow-xl relative overflow-hidden flex flex-col justify-between h-48`}>
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-150 group-hover:opacity-20 transition-all duration-400">
                  <cat.icon size={120} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-widest relative z-10 leading-tight">{cat.label}</h3>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] relative z-10 flex items-center gap-2 opacity-80">
                  Explore <FaChevronRight size={8} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Upcoming Event & Blog Mix */}
      <section className="py-20 md:py-32 bg-bg-base transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 md:gap-24">
            
            {/* Featured Event */}
            <div className="lg:w-2/5">
              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-bold text-brand-primary dark:text-brand-secondary pb-4 border-b-2 border-brand-secondary inline-block uppercase tracking-tight">Next Event</h3>
              </div>
              <motion.div 
                initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="relative group overflow-hidden shadow-2xl bg-black aspect-[4/5]"
              >
                <Image src={upcomingEvent.image} alt={upcomingEvent.title} fill className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-400" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 md:p-10 text-white w-full">
                  <div className="flex items-center gap-2 text-brand-secondary text-[10px] font-bold uppercase tracking-widest mb-4">
                    <FaCalendarAlt /> {upcomingEvent.date}
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold uppercase mb-8 leading-tight tracking-tight">{upcomingEvent.title}</h4>
                  <Link href={upcomingEvent.link} className="group relative overflow-hidden inline-block bg-white text-brand-primary px-8 py-3.5 font-bold uppercase tracking-widest text-[10px] transition-all">
                     <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                     <span className="relative z-10">Register Now</span>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Blog Feed */}
            <div className="lg:w-3/5">
              <div className="flex items-center justify-between mb-10 border-b border-border-main pb-4">
                <h3 className="text-xl md:text-2xl font-bold text-brand-primary dark:text-text-main uppercase tracking-tight">VMC Insights</h3>
                <Link href="/blog" className="text-brand-secondary font-bold uppercase text-[10px] tracking-widest hover:underline transition-all">View All Posts</Link>
              </div>
              <div className="space-y-10 md:space-y-12">
                {blogPosts.map((post, i) => (
                  <motion.div 
                    key={i} 
                    initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex gap-6 md:gap-10 items-center group cursor-pointer"
                  >
                    <div className="relative w-28 h-28 md:w-48 md:h-36 shrink-0 overflow-hidden shadow-lg border border-border-main">
                      <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" unoptimized />
                    </div>
                    <div className="flex-1">
                      <span className="text-brand-secondary text-[10px] font-bold uppercase tracking-widest block mb-2">{post.date}</span>
                      <h4 className="text-lg md:text-xl font-bold text-brand-primary dark:text-text-main uppercase group-hover:text-brand-secondary transition-colors mb-3 leading-tight tracking-tight line-clamp-2">
                        <Link href={post.link}>{post.title}</Link>
                      </h4>
                      <p className="text-text-muted text-sm font-medium leading-relaxed hidden md:line-clamp-2 opacity-80">Providing health tips and humanitarian insights to save lives everyday across global communities.</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Gallery Snapshot */}
      <section className="py-20 md:py-32 bg-bg-surface border-y border-border-main transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-brand-secondary uppercase tracking-tight">Moments of Impact</h2>
          <div className="w-24 h-1 bg-brand-secondary mx-auto mt-6"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 border-y border-border-main">
          {galleryItems.map((img, i) => (
            <div key={i} className="relative aspect-square group overflow-hidden border-r last:border-r-0 border-border-main">
              <Image src={img} alt="Gallery item" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" unoptimized />
              <div className="absolute inset-0 bg-brand-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Link href="/gallery" className="w-12 h-12 bg-brand-secondary flex items-center justify-center text-brand-primary text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-2xl">
                  <FaPlus />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Video Call to Action */}
      <section className="relative py-24 md:py-40 bg-brand-primary overflow-hidden text-center text-white transition-colors duration-300">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <Image src="https://volunteermedicalcorps.org/admin/images/videos/513726-vlcsnap-2025-09-15-13h05m35s620.png" alt="Video Background" fill className="object-cover" unoptimized />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold uppercase mb-8 md:mb-12 leading-tight tracking-tight">
            See Our Impact in <span className="text-brand-secondary">Motion</span>
          </h2>
          <p className="text-base md:text-xl text-gray-200 mb-12 md:mb-16 leading-relaxed font-medium opacity-90 max-w-2xl mx-auto">
            Watch hundreds of videos documenting our global missions, medical outreaches, and humanitarian campaigns across all nations.
          </p>
          <Link href="/video-gallery" className="group relative overflow-hidden inline-flex items-center bg-brand-secondary text-brand-primary px-10 md:px-16 py-4 md:py-6 font-bold uppercase tracking-[0.2em] text-xs md:text-sm shadow-2xl transition-all">
             <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
             <span className="relative z-10 flex items-center gap-3">
                <FaPlay className="text-[10px] group-hover:scale-125 transition-transform" /> Enter Video Gallery
             </span>
          </Link>
        </div>
      </section>

    </div>
  );
}

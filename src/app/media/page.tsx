"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaChevronRight, FaPlay, FaCalendarAlt, FaHeart, FaPlus } from 'react-icons/fa';

export default function MediaHubPage() {
  
  const newsHighlight = {
    title: "Good Deeds, Real Impact",
    date: "Apr 09, 2026",
    image: "https://volunteermedicalcorps.org/admin/images/media/onrZbfR8N463291785.jpg",
    excerpt: "Savings lives every day through our dedicated volunteers across the globe...",
    link: "/media/news"
  };

  const blogPosts = [
    { title: "Just Move", date: "Mar 18, 2026", image: "https://volunteermedicalcorps.org/admin/images/media/en9p2Ej1Q341529768.jpg", link: "/media/blog" },
    { title: "Drink More Water", date: "Jan 30, 2026", image: "https://volunteermedicalcorps.org/admin/images/media/nLFm9kAhE159426873.jpg", link: "/media/blog" },
    { title: "Healthy Snacking", date: "Oct 03, 2025", image: "https://volunteermedicalcorps.org/admin/images/media/3UwoVDLzt269573418.jpg", link: "/media/blog" }
  ];

  const upcomingEvent = {
    title: "Global Day of Prayer",
    date: "March 27, 2026",
    image: "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg",
    link: "/media/events"
  };

  const galleryItems = [
    "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg",
    "https://volunteermedicalcorps.org/admin/images/gallery/591783-2.jpg",
    "https://volunteermedicalcorps.org/admin/images/gallery/673195-bronx.jpg",
    "https://volunteermedicalcorps.org/admin/images/gallery/835192-program1c.jpg"
  ];

  return (
    <div className="w-full bg-white font-roboto">
      <PageBanner title="MEDIA HUB" />

      {/* 1. Latest News Highlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <span className="text-[#ff9f22] font-black uppercase tracking-widest text-xs mb-4 block">Latest News</span>
              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-[#002866] mb-6 leading-tight uppercase">
                {newsHighlight.title}
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                {newsHighlight.excerpt}
              </p>
              <Link href={newsHighlight.link} className="inline-flex items-center bg-[#002866] text-white px-10 py-4 font-black uppercase tracking-widest text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all rounded-sm shadow-xl">
                Read Full Story <FaChevronRight className="ml-3 text-xs" />
              </Link>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative h-[350px] md:h-[450px] w-full rounded-sm overflow-hidden shadow-2xl">
                <Image src={newsHighlight.image} alt={newsHighlight.title} fill className="object-cover" unoptimized />
                <div className="absolute inset-0 border-[15px] border-white/10 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Media Navigation Grid (Categories) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "News & Press", href: "/media/news", icon: FaChevronRight, bg: "bg-[#002866]" },
              { label: "VMC Blog", href: "/media/blog", icon: FaChevronRight, bg: "bg-[#ff9f22]" },
              { label: "Global Events", href: "/media/events", icon: FaChevronRight, bg: "bg-cyan-600" },
              { label: "Video Gallery", href: "/media/video-gallery", icon: FaPlay, bg: "bg-red-600" }
            ].map((cat, i) => (
              <Link key={i} href={cat.href} className={`${cat.bg} p-8 rounded-sm text-white group hover:-translate-y-2 transition-all duration-300 shadow-lg relative overflow-hidden`}>
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                  <cat.icon size={100} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider mb-2 relative z-10">{cat.label}</h3>
                <span className="text-xs font-black uppercase tracking-[0.2em] opacity-70 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  Explore Now <FaChevronRight size={10} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Upcoming Event & Blog Mix */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Featured Event */}
            <div className="lg:w-1/3">
              <h3 className="text-2xl font-poppins font-bold text-[#002866] mb-8 pb-4 border-b-2 border-[#ff9f22] inline-block uppercase">Next Event</h3>
              <div className="relative group rounded-sm overflow-hidden shadow-xl bg-black">
                <Image src={upcomingEvent.image} alt={upcomingEvent.title} width={600} height={800} className="w-full opacity-80 group-hover:scale-105 transition-transform duration-700" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002866] to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <div className="flex items-center gap-2 text-[#ff9f22] text-xs font-bold uppercase tracking-widest mb-3">
                    <FaCalendarAlt /> {upcomingEvent.date}
                  </div>
                  <h4 className="text-2xl font-bold uppercase mb-6 leading-tight">{upcomingEvent.title}</h4>
                  <Link href={upcomingEvent.link} className="inline-block bg-white text-[#002866] px-6 py-3 font-black uppercase tracking-widest text-xs hover:bg-[#ff9f22] transition-colors rounded-sm">
                    Register Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Blog Feed */}
            <div className="lg:w-2/3">
              <div className="flex items-center justify-between mb-8 border-b-2 border-gray-100 pb-4">
                <h3 className="text-2xl font-poppins font-bold text-[#002866] uppercase">VMC Insights</h3>
                <Link href="/media/blog" className="text-[#ff9f22] font-black uppercase text-xs tracking-widest hover:underline">View All Posts</Link>
              </div>
              <div className="space-y-8">
                {blogPosts.map((post, i) => (
                  <div key={i} className="flex gap-6 items-center group cursor-pointer">
                    <div className="relative w-24 h-24 md:w-40 md:h-32 shrink-0 overflow-hidden rounded-sm shadow-md">
                      <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                    </div>
                    <div>
                      <span className="text-[#ff9f22] text-[10px] font-bold uppercase tracking-widest">{post.date}</span>
                      <h4 className="text-xl font-bold text-[#002866] uppercase group-hover:text-[#ff9f22] transition-colors mt-1 mb-2 line-clamp-2">
                        <Link href={post.link}>{post.title}</Link>
                      </h4>
                      <p className="text-gray-500 text-sm hidden md:line-clamp-1">Providing health tips and humanitarian insights to save lives everyday.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Gallery Snapshot */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-4xl font-poppins font-bold text-[#002866] uppercase">Moments of Impact</h2>
          <div className="w-20 h-1 bg-[#ff9f22] mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {galleryItems.map((img, i) => (
            <div key={i} className="relative aspect-square group overflow-hidden">
              <Image src={img} alt="Gallery item" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" unoptimized />
              <div className="absolute inset-0 bg-[#002866]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Link href="/media/gallery" className="w-12 h-12 bg-[#ff9f22] rounded-full flex items-center justify-center text-[#002866] text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <FaPlus />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Video Call to Action */}
      <section className="relative py-32 bg-[#002866] overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://volunteermedicalcorps.org/admin/images/videos/513726-vlcsnap-2025-09-15-13h05m35s620.png" alt="Video Background" fill className="object-cover" unoptimized />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-poppins font-black uppercase mb-8 leading-tight">
            See Our Impact in <span className="text-[#ff9f22]">Motion</span>
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Watch hundreds of videos documenting our global missions, medical outreaches, and humanitarian campaigns.
          </p>
          <Link href="/media/video-gallery" className="inline-flex items-center bg-[#ff9f22] text-[#002866] px-12 py-5 font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all rounded-sm shadow-2xl group">
            <FaPlay className="mr-3 group-hover:scale-125 transition-transform" /> Enter Video Gallery
          </Link>
        </div>
      </section>

    </div>
  );
}

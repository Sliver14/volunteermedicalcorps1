"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaCalendarAlt, FaChevronRight, FaClock, FaInstagram } from 'react-icons/fa';
import PageBanner from '@/components/PageBanner';
import Pagination from '@/components/Pagination';

export default function NewsClient({ allNews, recentBlogs, galleryImages }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const stripHtml = (html: string | null) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, '');
  };

  const getExcerpt = (content: string | null) => {
    if (!content) return "";
    const plainText = stripHtml(content);
    return plainText.substring(0, 150) + (plainText.length > 150 ? "..." : "");
  };

  const totalPages = Math.ceil(allNews.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = allNews.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white font-roboto">
      <PageBanner title="LATEST NEWS" parent={{ label: "Media", href: "#" }} />
      
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Left Column: Main Blog Content */}
            <div className="lg:w-2/3">
              <div className="space-y-12">
                {currentNews.map((post: any, index: number) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-sm shadow-sm overflow-hidden border border-gray-100 group"
                  >
                    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden">
                      <Image 
                        src={post.image || "https://volunteermedicalcorps.org/admin/images/media/onrZbfR8N463291785.jpg"} 
                        alt={post.title} 
                        fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw" 
                        className="object-cover group-hover:scale-105 transition-transform duration-400"
                        unoptimized
                      />
                    </div>
                    
                    <div className="p-6 md:p-8">
                      <span className="inline-block bg-blue-50 text-brand-primary text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4 border border-blue-100">
                        News
                      </span>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-brand-primary mb-4 leading-snug group-hover:text-brand-secondary transition-colors">
                        <Link href={`/news/${post.id}`}>{post.title}</Link>
                      </h3>
                      
                      <ul className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-100 text-sm font-bold text-gray-500">
                        <li className="flex items-center gap-3">
                          <Image 
                            src="https://volunteermedicalcorps.org/admin/images/users/default-avatar.jpg" 
                            alt="Admin" 
                            width={35} height={35} 
                            className="rounded-full"
                            unoptimized
                          />
                          <span className="text-brand-primary">{post.author || "Admin"}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCalendarAlt className="text-brand-secondary" /> {formatDate(post.date)}
                        </li>
                      </ul>
                      
                      <p className="text-gray-600 mb-8 leading-relaxed text-base md:text-lg">
                        {getExcerpt(post.content)}
                      </p>
                      
                      <Link href={`/news/${post.id}`} className="group relative overflow-hidden inline-flex items-center bg-brand-primary text-white px-8 py-3 font-bold uppercase tracking-widest text-xs transition-all shadow-md">
                        <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                        <span className="relative z-10 group-hover:text-brand-primary transition-colors">Read More</span>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:w-1/3 space-y-10">
              
              {/* Recent Blog Posts Widget */}
              <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm">
                <h3 className="text-xl font-poppins font-bold text-[#002866] mb-6 pb-3 border-b-2 border-[#ff9f22] inline-block">Recent Posts</h3>
                <ul className="space-y-6">
                  {recentBlogs.map((post: any, index: number) => (
                    <li key={index} className="flex items-center gap-4 group cursor-pointer">
                      <div className="relative w-[86px] h-[86px] shrink-0 overflow-hidden rounded-sm">
                        <Image src={post.image || "https://volunteermedicalcorps.org/admin/images/media/en9p2Ej1Q341529768.jpg"} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" unoptimized />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#002866] text-sm group-hover:text-[#ff9f22] transition-colors leading-tight mb-2">
                          <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </h4>
                        <div className="flex items-center text-xs text-gray-500 font-bold uppercase tracking-wider">
                          <FaClock className="mr-1.5 text-[#ff9f22]" /> {formatDate(post.date)}
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

              {/* Give Now CTA Widget */}
              <div className="relative bg-[#002866] p-8 text-center text-white rounded-sm overflow-hidden shadow-xl">
                <div className="absolute inset-0 opacity-20">
                  <Image src="https://volunteermedicalcorps.org/give/images/projects/gooddeeds.jpg" alt="Background" fill className="object-cover" unoptimized />
                </div>
                <div className="relative z-10">
                  <h5 className="text-[#ff9f22] font-black uppercase tracking-widest text-xs mb-3">Give Now</h5>
                  <h2 className="text-2xl font-poppins font-bold mb-6 leading-tight">Sponsor a Good Deeds Project Today!</h2>
                  <Link href="/give" className="inline-flex items-center bg-white text-[#002866] px-8 py-3.5 font-bold uppercase tracking-widest text-sm hover:bg-[#ff9f22] transition-all shadow-lg rounded-sm">
                    Give Now
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

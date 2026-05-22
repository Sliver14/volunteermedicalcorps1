"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaInstagram, FaChevronLeft, FaUser, FaTag } from 'react-icons/fa';
import PageBanner from '@/components/PageBanner';

export default function NewsDetailClient({ news, recentBlogs, galleryImages }: any) {
  if (!news) return null;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full bg-white font-roboto">
      <PageBanner title={news.title} parent={{ label: "News", href: "/news" }} />
      
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Left Column: News Detail Content */}
            <div className="lg:w-2/3">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-sm shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
                  <Image 
                    src={news.image || "https://volunteermedicalcorps.org/admin/images/media/onrZbfR8N463291785.jpg"} 
                    alt={news.title} 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
                </div>
                
                <div className="p-6 md:p-10">
                  <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-gray-100 text-sm font-bold text-gray-500">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-brand-secondary" /> {formatDate(news.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUser className="text-brand-secondary" /> {news.author || "Admin"}
                    </div>
                    {news.category && (
                      <div className="flex items-center gap-2">
                        <FaTag className="text-brand-secondary" /> {news.category}
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-2xl md:text-4xl font-bold text-brand-primary mb-8 leading-tight">
                    {news.title}
                  </h1>
                  
                  <div 
                    className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-10"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                  />
                  
                  <div className="pt-10 border-t border-gray-100">
                    <Link href="/news" className="inline-flex items-center text-brand-primary font-bold hover:text-brand-secondary transition-colors">
                      <FaChevronLeft className="mr-2" /> Back to News
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:w-1/3 space-y-10">
              
              {/* Recent Blog Posts Widget */}
              <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm">
                <h3 className="text-xl font-poppins font-bold text-[#002866] mb-6 pb-3 border-b-2 border-[#ff9f22] inline-block">Recent Blogs</h3>
                <ul className="space-y-6">
                  {recentBlogs.map((post: any, index: number) => (
                    <li key={index} className="flex items-center gap-4 group cursor-pointer">
                      <div className="relative w-[70px] h-[70px] shrink-0 overflow-hidden rounded-sm">
                        <Image src={post.image || "https://volunteermedicalcorps.org/admin/images/media/en9p2Ej1Q341529768.jpg"} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" unoptimized />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#002866] text-sm group-hover:text-[#ff9f22] transition-colors leading-tight mb-1">
                          <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </h4>
                        <div className="flex items-center text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                          <FaClock className="mr-1 text-[#ff9f22]" /> {formatDate(post.date)}
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

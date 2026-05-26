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
    <div className="w-full bg-bg-base font-roboto transition-colors duration-300">
      <PageBanner title={news.title} parent={{ label: "News", href: "/news" }} />
      
      <section className="py-16 md:py-24 bg-bg-base">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Left Column: News Detail Content */}
            <div className="lg:w-2/3">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-bg-surface rounded-sm shadow-sm overflow-hidden border border-border-main transition-colors duration-300"
              >
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] bg-bg-base">
                  <Image 
                    src={news.image || "https://volunteermedicalcorps.org/admin/images/media/onrZbfR8N463291785.jpg"} 
                    alt={news.title} 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
                </div>
                
                <div className="p-6 md:p-10">
                  <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-border-main text-sm font-bold text-text-muted transition-colors duration-300">
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
                  
                  <h1 className="text-2xl md:text-4xl font-bold text-brand-primary dark:text-brand-secondary mb-8 leading-tight transition-colors duration-300">
                    {news.title}
                  </h1>
                  
                  <div 
                    className="prose prose-lg max-w-none text-text-muted leading-relaxed mb-10 dark:prose-invert transition-colors duration-300"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                  />
                  
                  <div className="pt-10 border-t border-border-main">
                    <Link href="/news" className="inline-flex items-center text-brand-primary dark:text-brand-secondary font-bold hover:text-brand-secondary transition-colors">
                      <FaChevronLeft className="mr-2" /> Back to News
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:w-1/3 space-y-10">
              
              {/* Recent Blog Posts Widget */}
              <div className="bg-bg-surface p-8 border border-border-main shadow-sm rounded-sm transition-colors duration-300">
                <h3 className="text-xl font-poppins font-bold text-brand-primary dark:text-brand-secondary mb-6 pb-3 border-b-2 border-brand-secondary inline-block">Recent Blogs</h3>
                <ul className="space-y-6">
                  {recentBlogs.map((post: any, index: number) => (
                    <li key={index} className="flex items-center gap-4 group cursor-pointer">
                      <div className="relative w-[70px] h-[70px] shrink-0 overflow-hidden rounded-sm bg-bg-base">
                        <Image src={post.image || "https://volunteermedicalcorps.org/admin/images/media/en9p2Ej1Q341529768.jpg"} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" unoptimized />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-primary dark:text-text-main text-sm group-hover:text-brand-secondary transition-colors leading-tight mb-1">
                          <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </h4>
                        <div className="flex items-center text-[10px] text-text-muted font-bold uppercase tracking-wider transition-colors duration-300">
                          <FaClock className="mr-1 text-brand-secondary" /> {formatDate(post.date)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Photo Gallery Widget */}
              <div className="bg-bg-surface p-8 border border-border-main shadow-sm rounded-sm transition-colors duration-300">
                <h3 className="text-xl font-poppins font-bold text-brand-primary dark:text-brand-secondary mb-6 pb-3 border-b-2 border-brand-secondary inline-block">Photo Gallery</h3>
                <div className="grid grid-cols-3 gap-2">
                  {galleryImages.map((src: string, index: number) => (
                    <div key={index} className="relative aspect-square overflow-hidden group cursor-pointer rounded-sm bg-bg-base">
                      <Image src={src} alt="Gallery" fill className="object-cover" unoptimized />
                      <div className="absolute inset-0 bg-brand-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xl">
                        <FaInstagram />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Give Now CTA Widget */}
              <div className="relative bg-brand-primary p-8 text-center text-white rounded-sm overflow-hidden shadow-xl">
                <div className="absolute inset-0 opacity-20">
                  <Image src="https://volunteermedicalcorps.org/give/images/projects/gooddeeds.jpg" alt="Background" fill className="object-cover" unoptimized />
                </div>
                <div className="relative z-10">
                  <h5 className="text-brand-secondary font-black uppercase tracking-widest text-xs mb-3">Give Now</h5>
                  <h2 className="text-2xl font-poppins font-bold mb-6 leading-tight">Sponsor a Good Deeds Project Today!</h2>
                  <Link href="/give" className="group relative overflow-hidden inline-flex items-center bg-white text-brand-primary px-8 py-3.5 font-bold uppercase tracking-widest text-sm transition-all shadow-lg rounded-sm">
                    <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                    <span className="relative z-10 group-hover:text-brand-primary transition-colors">Give Now</span>
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

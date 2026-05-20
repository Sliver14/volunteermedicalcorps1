"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaCalendarAlt } from 'react-icons/fa';
import PageBanner from '@/components/PageBanner';
import Pagination from '@/components/Pagination';

export default function BlogClient({ allBlogs }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const totalPages = Math.ceil(allBlogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = allBlogs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white font-roboto">
      <PageBanner title="OUR BLOG" parent={{ label: "Media", href: "#" }} />
      
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {currentBlogs.map((post: any, index: number) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-sm overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full h-[275px] overflow-hidden">
                  <Image 
                    src={post.image || "https://volunteermedicalcorps.org/admin/images/media/en9p2Ej1Q341529768.jpg"} 
                    alt={post.title} 
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                    className="object-cover group-hover:scale-105 transition-transform duration-400"
                    unoptimized
                  />
                </div>
                <div className="p-8">
                  <span className="inline-block bg-blue-50 text-brand-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4 border border-blue-100">
                    Blog
                  </span>
                  
                  <h3 className="text-lg md:text-xl font-bold text-brand-primary group-hover:text-brand-secondary transition-colors mb-6 leading-snug">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>

                  <ul className="flex items-center gap-6 pt-6 border-t border-gray-100 text-xs font-bold text-gray-500">
                    <li className="flex items-center gap-3">
                      <Image 
                        src="https://volunteermedicalcorps.org/admin/images/users/default-avatar.jpg" 
                        alt="Admin" 
                        width={30} height={30} 
                        className="rounded-full"
                        unoptimized
                      />
                      <span className="text-brand-primary">{post.author || "Admin"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCalendarAlt className="text-brand-secondary" /> {formatDate(post.date)}
                    </li>
                  </ul>
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
      </section>
    </div>
  );
}


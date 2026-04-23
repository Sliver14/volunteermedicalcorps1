"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaCalendarAlt } from 'react-icons/fa';

export default function BlogPage() {
  const blogPosts = [
    { title: "Just Move", date: "Mar 18, 2026", image: "https://volunteermedicalcorps.org/admin/images/media/en9p2Ej1Q341529768.jpg", link: "#" },
    { title: "Drink More Water, Stay Hydrated", date: "Jan 30, 2026", image: "https://volunteermedicalcorps.org/admin/images/media/nLFm9kAhE159426873.jpg", link: "#" },
    { title: "Love Your Fruits And Vegetables", date: "Jan 30, 2026", image: "https://volunteermedicalcorps.org/admin/images/media/kj2dtoES6694283517.jpg", link: "#" },
    { title: "THE SLEEP SOLUTION", date: "Oct 14, 2025", image: "https://volunteermedicalcorps.org/admin/images/media/HR1k9W4dA952316487.jpg", link: "#" },
    { title: "HELPING OTHERS HELPS YOU", date: "Oct 10, 2025", image: "https://volunteermedicalcorps.org/admin/images/media/3p9mk7Nqn325174986.jpg", link: "#" },
    { title: "TAKE BREAKS", date: "Oct 07, 2025", image: "https://volunteermedicalcorps.org/admin/images/media/X4AH32MCu261985473.jpg", link: "#" },
    { title: "HEALTHY SNACKING", date: "Oct 03, 2025", image: "https://volunteermedicalcorps.org/admin/images/media/3UwoVDLzt269573418.jpg", link: "#" },
    { title: "SELF-CARE IS HEALTH CARE", date: "Sep 30, 2025", image: "https://volunteermedicalcorps.org/admin/images/media/jpYZnmEJk286534917.jpg", link: "#" },
    { title: "Why You Should Volunteer-And How It Benefits You", date: "Sep 12, 2025", image: "https://volunteermedicalcorps.org/admin/images/media/jhQ1ybf5e547286139.jpg", link: "#" },
    { title: "TAKE A COLD SHOWER", date: "Sep 10, 2025", image: "https://volunteermedicalcorps.org/admin/images/media/Mn3Y85fcV265418397.jpg", link: "#" },
    { title: "CHEW YOUR FOOD MORE", date: "Aug 01, 2025", image: "https://volunteermedicalcorps.org/admin/images/media/5GN2mMRoy497612853.jpg", link: "#" },
    { title: "LAUGH OFTEN", date: "May 05, 2025", image: "https://volunteermedicalcorps.org/admin/images/media/j8hYgXz2V751284963.jpg", link: "#" }
  ];

  return (
    <div className="w-full bg-white font-roboto">
      <PageBanner title="OUR BLOG" parent={{ label: "Media", href: "#" }} />
      
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {blogPosts.map((post, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-sm overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full h-[275px] overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                </div>
                <div className="p-8">
                  <span className="inline-block bg-blue-50 text-[#002866] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4 border border-blue-100">
                    Blog
                  </span>
                  
                  <h3 className="text-xl font-poppins font-bold text-[#002866] group-hover:text-[#ff9f22] transition-colors mb-6 leading-snug uppercase">
                    <Link href={post.link}>{post.title}</Link>
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
                      <span className="text-[#002866]">Admin</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCalendarAlt className="text-[#ff9f22]" /> {post.date}
                    </li>
                  </ul>
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
                <li><Link href="#" className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 border border-gray-200 hover:border-[#002866] hover:text-[#002866] font-bold rounded-sm transition-colors">4</Link></li>
                <li><Link href="#" className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 border border-gray-200 hover:border-[#002866] hover:text-[#002866] font-bold rounded-sm transition-colors">5</Link></li>
                <li><Link href="#" className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 border border-gray-200 hover:border-[#002866] hover:text-[#002866] font-bold rounded-sm transition-colors">6</Link></li>
                <li><span className="w-10 h-10 flex items-center justify-center text-gray-400 font-bold">...</span></li>
                <li><Link href="#" className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 border border-gray-200 hover:border-[#002866] hover:text-[#002866] font-bold rounded-sm transition-colors">15</Link></li>
              </ul>
            </nav>
          </div>

        </div>
      </section>
    </div>
  );
}

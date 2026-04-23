"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { FaCalendarAlt, FaHeart, FaChevronRight, FaClock, FaInstagram } from 'react-icons/fa';

export default function NewsPage() {
  const blogPosts = [
    {
      title: "Good Deeds, Real Impact",
      date: "Apr 09, 2026",
      image: "https://volunteermedicalcorps.org/admin/images/media/onrZbfR8N463291785.jpg",
      excerpt: "Savings lives every day ...",
      link: "#"
    },
    {
      title: "VMC Jamaica Reaching Out with Hope at Pisgah Community, St. Elizabeth, Jamaica",
      date: "Feb 27, 2026",
      image: "https://volunteermedicalcorps.org/admin/images/media/2NpZxEGQD245813967.jpg",
      excerpt: "The Volunteer Medical Corps remains committed to responding with compassion and practical action........",
      link: "#"
    },
    {
      title: "Free Medical Camp Bringing Hope and Healing to Refugee Communities in Asia",
      date: "Feb 24, 2026",
      image: "https://volunteermedicalcorps.org/admin/images/media/HxsDftbmp624153987.jpg",
      excerpt: "Saving lives every day ...",
      link: "#"
    },
    {
      title: "Empowering Young Lifesavers In Asia",
      date: "Jan 31, 2026",
      image: "https://volunteermedicalcorps.org/admin/images/media/CVy7BA6bz132654987.jpg",
      excerpt: "Saving lives everyday ...",
      link: "#"
    },
    {
      title: "VMC OTTAWA HEALTH AND WELLNESS OUTREACH",
      date: "Oct 14, 2025",
      image: "https://volunteermedicalcorps.org/admin/images/media/uBEYfrqxt421736958.jpg",
      excerpt: "Savingliveseveryday ...",
      link: "#"
    },
    {
      title: "MEDICAL OUTREACH IN ALAPERE, LAGOS, NIGERIA",
      date: "Oct 03, 2025",
      image: "https://volunteermedicalcorps.org/admin/images/media/LCEnzdZBq865174932.jpg",
      excerpt: "Saving lives everyday!...",
      link: "#"
    },
  ];

  const recentPosts = [
    { title: "Just Move...", date: "Mar 18, 2026", image: "https://volunteermedicalcorps.org/admin/images/media/en9p2Ej1Q341529768.jpg" },
    { title: "Drink More Water, Stay Hydrate...", date: "Jan 30, 2026", image: "https://volunteermedicalcorps.org/admin/images/media/nLFm9kAhE159426873.jpg" },
    { title: "Love Your Fruits And Vegetable...", date: "Jan 30, 2026", image: "https://volunteermedicalcorps.org/admin/images/media/kj2dtoES6694283517.jpg" },
    { title: "THE SLEEP SOLUTION ...", date: "Oct 14, 2025", image: "https://volunteermedicalcorps.org/admin/images/media/HR1k9W4dA952316487.jpg" },
    { title: "HELPING OTHERS HELPS YOU...", date: "Oct 10, 2025", image: "https://volunteermedicalcorps.org/admin/images/media/3p9mk7Nqn325174986.jpg" }
  ];

  const galleryImages = [
    "https://volunteermedicalcorps.org/admin/images/gallery/7094887-3.jpeg",
    "https://volunteermedicalcorps.org/admin/images/gallery/1789046-2.jpeg",
    "https://volunteermedicalcorps.org/admin/images/gallery/378654-4.jpeg",
    "https://volunteermedicalcorps.org/admin/images/gallery/672435-PHOTO-2022-05-29-06-09-40.jpg",
    "https://volunteermedicalcorps.org/admin/images/gallery/3736870-4.jpeg",
    "https://volunteermedicalcorps.org/admin/images/gallery/7260559-9.jpeg",
    "https://volunteermedicalcorps.org/admin/images/gallery/249856-ind2.jpg",
    "https://volunteermedicalcorps.org/admin/images/gallery/9217512-houstonedit.jpg"
  ];

  return (
    <div className="w-full bg-white font-roboto">
      <PageBanner title="LATEST NEWS" parent={{ label: "Media", href: "#" }} />
      
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Left Column: Main Blog Content */}
            <div className="lg:w-2/3">
              <div className="space-y-12">
                {blogPosts.map((post, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-sm shadow-sm overflow-hidden border border-gray-100 group"
                  >
                    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden">
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw" 
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        unoptimized // Using unoptimized for external URLs to bypass next/image domain config for this demo
                      />
                    </div>
                    
                    <div className="p-6 md:p-8">
                      <span className="inline-block bg-blue-50 text-[#002866] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4 border border-blue-100">
                        News
                      </span>
                      
                      <h3 className="text-2xl md:text-3xl font-poppins font-bold text-[#002866] uppercase mb-4 leading-snug group-hover:text-[#ff9f22] transition-colors">
                        <Link href={post.link}>{post.title}</Link>
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
                          <span className="text-[#002866]">Admin</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCalendarAlt className="text-[#ff9f22]" /> {post.date}
                        </li>
                      </ul>
                      
                      <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                        {post.excerpt}
                      </p>
                      
                      <Link href={post.link} className="inline-flex items-center bg-[#002866] text-white px-8 py-3.5 font-bold uppercase tracking-widest text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all rounded-sm shadow-md">
                        Read More
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <nav>
                  <ul className="flex items-center gap-2 flex-wrap justify-center">
                    <li><span className="w-10 h-10 flex items-center justify-center bg-[#002866] text-white font-bold rounded-sm shadow-sm">1</span></li>
                    <li><Link href="#" className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 border border-gray-200 hover:border-[#002866] hover:text-[#002866] font-bold rounded-sm transition-colors">2</Link></li>
                    <li><Link href="#" className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 border border-gray-200 hover:border-[#002866] hover:text-[#002866] font-bold rounded-sm transition-colors">3</Link></li>
                    <li><span className="w-10 h-10 flex items-center justify-center text-gray-400 font-bold">...</span></li>
                    <li><Link href="#" className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 border border-gray-200 hover:border-[#002866] hover:text-[#002866] font-bold rounded-sm transition-colors">18</Link></li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:w-1/3 space-y-10">
              
              {/* Campaign Projects Widget */}
              <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm">
                <h3 className="text-xl font-poppins font-bold text-[#002866] mb-6 pb-3 border-b-2 border-[#ff9f22] inline-block">Campaign Projects</h3>
                <ul className="space-y-4 font-bold text-gray-600">
                  <li><Link href="#" className="flex items-center justify-between group hover:text-[#002866] transition-colors border-b border-gray-50 pb-3">Good Deeds Campaigns <FaChevronRight className="text-gray-300 group-hover:text-[#ff9f22] transition-colors text-xs" /></Link></li>
                  <li><Link href="#" className="flex items-center justify-between group hover:text-[#002866] transition-colors border-b border-gray-50 pb-3">Medical Projects <FaChevronRight className="text-gray-300 group-hover:text-[#ff9f22] transition-colors text-xs" /></Link></li>
                  <li><Link href="#" className="flex items-center justify-between group hover:text-[#002866] transition-colors border-b border-gray-50 pb-3">Humanitarian Projects <FaChevronRight className="text-gray-300 group-hover:text-[#ff9f22] transition-colors text-xs" /></Link></li>
                  <li><Link href="#" className="flex items-center justify-between group hover:text-[#002866] transition-colors">VMC Academy <FaChevronRight className="text-gray-300 group-hover:text-[#ff9f22] transition-colors text-xs" /></Link></li>
                </ul>
              </div>

              {/* Fundraiser Widget */}
              <div className="bg-white border border-gray-100 shadow-sm rounded-sm overflow-hidden group">
                <div className="relative h-64 w-full">
                  <Image src="https://volunteermedicalcorps.org/give/images/projects/ajQwrT96F267394158.jpeg" alt="Sponsor Relief Missions" fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002866]/90 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="bg-[#ff9f22] text-[#002866] text-[10px] font-black px-2 py-1 rounded-sm mb-2 inline-block">#vmcaid</span>
                    <h3 className="text-xl font-bold font-poppins leading-tight">Sponsor Relief Missions</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between text-sm font-bold text-gray-500 mb-2">
                      <span>Raised <span className="text-[#002866]">$0</span></span>
                      <span className="text-[#ff9f22]">0%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#002866] h-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">Join us to provide relief materials, medical supplies and health...</p>
                  <Link href="#" className="block w-full text-center bg-[#002866] text-white py-3 font-bold uppercase tracking-widest text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-colors rounded-sm">Donate</Link>
                </div>
              </div>

              {/* Recent Blog Posts Widget */}
              <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm">
                <h3 className="text-xl font-poppins font-bold text-[#002866] mb-6 pb-3 border-b-2 border-[#ff9f22] inline-block">Recent Posts</h3>
                <ul className="space-y-6">
                  {recentPosts.map((post, index) => (
                    <li key={index} className="flex items-center gap-4 group cursor-pointer">
                      <div className="relative w-[86px] h-[86px] shrink-0 overflow-hidden rounded-sm">
                        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#002866] text-sm group-hover:text-[#ff9f22] transition-colors leading-tight mb-2">
                          <Link href="#">{post.title}</Link>
                        </h4>
                        <div className="flex items-center text-xs text-gray-500 font-bold uppercase tracking-wider">
                          <FaClock className="mr-1.5 text-[#ff9f22]" /> {post.date}
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
                  {galleryImages.map((src, index) => (
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
                  <Link href="#" className="inline-flex items-center bg-white text-[#002866] px-8 py-3.5 font-bold uppercase tracking-widest text-sm hover:bg-[#ff9f22] transition-all shadow-lg rounded-sm">
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

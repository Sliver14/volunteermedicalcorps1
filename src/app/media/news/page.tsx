"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import { motion } from "framer-motion";

export default function NewsPage() {
  const newsItems = [
    { 
      title: "Good Deeds, Real Impact", 
      date: "Apr 09, 2026", 
      image: "/give-15-768x512.jpg",
      excerpt: "Savings lives every day through our dedicated volunteers across the globe..."
    },
    { 
      title: "VMC Jamaica Reaching Out with Hope", 
      date: "Feb 27, 2026", 
      image: "/give-17-300x200.jpg",
      excerpt: "The Volunteer Medical Corps remains committed to responding with compassion at Pisgah Community..."
    },
    { 
      title: "Free Medical Camp in Refugee Communities", 
      date: "Feb 24, 2026", 
      image: "/give-20-768x512.jpg",
      excerpt: "Bringing hope and healing to refugee communities in Asia through free medical camps..."
    },
    { 
      title: "Empowering Young Lifesavers in Asia", 
      date: "Jan 31, 2026", 
      image: "/sw-post-1-min-768x512.jpg",
      excerpt: "Training the next generation of medical volunteers and first responders in Asia..."
    },
    { 
      title: "VMC Ottawa Health and Wellness Outreach", 
      date: "Oct 14, 2025", 
      image: "/sw-post-3-min-300x200.jpg",
      excerpt: "Impactful health and wellness outreach programs conducted by our Ottawa chapter..."
    },
    { 
      title: "Medical Outreach in Alapere, Lagos", 
      date: "Oct 03, 2025", 
      image: "/vcn-post-7-min-768x512.jpg",
      excerpt: "Saving lives everyday! Successful medical outreach at Alapere community, Lagos, Nigeria..."
    }
  ];

  return (
    <div className="w-full bg-white">
      <PageBanner title="LATEST NEWS" parent={{ label: "Media", href: "#" }} />
      
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Featured Post */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[400px] overflow-hidden rounded-sm mb-8 shadow-xl">
                <Image 
                  src="/pmr-bg-slide.jpg" 
                  alt="Featured News" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-[#ff9f22] text-[#002866] px-4 py-1 font-bold uppercase text-xs tracking-widest">
                  Featured
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-400 text-sm font-roboto uppercase tracking-widest">
                  <span>VMC Admin</span>
                  <span>•</span>
                  <span>April 17, 2026</span>
                </div>
                <h2 className="text-3xl font-poppins font-bold text-[#002866] group-hover:text-[#ff9f22] transition-colors leading-tight">
                  Volunteer Medical Corps Launches Global Relief Initiative for 2026
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  A comprehensive overview of our upcoming missions and campaigns aimed at providing medical care to over 100 communities in need.
                </p>
                <button className="text-[#002866] font-black uppercase tracking-widest border-b-2 border-[#ff9f22] pb-1 group-hover:border-[#002866] transition-colors">
                  Read Full Story
                </button>
              </div>
            </motion.div>

            {/* News List */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.2 } },
                hidden: {}
              }}
              className="space-y-12"
            >
              {newsItems.slice(0, 3).map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                  }}
                  className="flex gap-6 group cursor-pointer"
                >
                  <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-sm shadow-md">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-[#ff9f22] text-xs font-bold uppercase tracking-widest">{item.date}</div>
                    <h3 className="text-xl font-bold text-[#002866] group-hover:text-[#ff9f22] transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{item.excerpt}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {}
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {newsItems.slice(3).map((item, index) => (
              <motion.div 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden rounded-sm mb-6 shadow-lg">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-3">
                  <div className="text-[#ff9f22] text-xs font-bold uppercase tracking-widest">{item.date}</div>
                  <h3 className="text-xl font-bold text-[#002866] group-hover:text-[#ff9f22] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 line-clamp-3">{item.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-20 text-center">
            <button className="bg-[#002866] text-white px-12 py-4 font-black uppercase tracking-widest hover:bg-[#ff9f22] hover:text-[#002866] transition-all shadow-xl">
              Load More News
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

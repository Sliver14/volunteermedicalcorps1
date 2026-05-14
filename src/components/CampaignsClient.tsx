"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CampaignsClient({ allCampaigns }: any) {
  return (
    <section className="py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-[#002866] uppercase">Active Campaigns</h2>
          <div className="w-24 h-1 bg-[#ff9f22] mx-auto mt-4 md:mt-6 mb-6 md:mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our global initiatives designed to bring hope, healing, and the Gospel to people and communities worldwide.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {}
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {allCampaigns.map((item: any) => (
            <motion.div 
              key={item.id} 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="group bg-white border border-gray-100 rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 md:h-72 overflow-hidden">
                <Image 
                  src={item.image || "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg"} 
                  alt={item.title} 
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute top-4 left-4 bg-[#ff9f22] text-[#002866] px-3 md:px-4 py-1 font-black text-[10px] md:text-xs uppercase tracking-widest">
                  {item.category || "Campaign"}
                </div>
              </div>
              <div className="p-6 md:p-10 flex flex-col items-start flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-[#002866] mb-3 md:mb-4 uppercase leading-tight">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed line-clamp-3">{item.description}</p>
                <Link 
                  href={item.ctaLink || `/campaigns/${item.id}`}
                  className="inline-block bg-[#002866] text-white px-6 md:px-10 py-3 md:py-4 font-black uppercase tracking-[0.2em] text-[11px] md:text-[13px] hover:bg-[#ff9f22] hover:text-[#002866] transition-all shadow-md mt-auto"
                >
                  {item.ctaText || "View Campaign"}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

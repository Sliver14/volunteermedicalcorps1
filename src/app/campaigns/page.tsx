"use client";

import PageBanner from "@/components/PageBanner";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CampaignsLandingPage() {
  const campaigns = [
    {
      title: "1 Million Smiles",
      tag: "World Humanitarian Day",
      description: "Creating smiles through 1 million good deeds across the world.",
      href: "/campaigns/1-million-smiles",
      image: "/give-15-768x512.jpg"
    },
    {
      title: "Global Hospital Outreach",
      tag: "#GHOC",
      description: "Reaching patients and healthcare workers in hospitals across 196 countries.",
      href: "/campaigns/ghoc",
      image: "/sw-post-1-min-768x512.jpg"
    },
    {
      title: "Praying Medics",
      tag: "Global Network",
      description: "Join a global network of medical professionals dedicated to the ministry of prayer.",
      href: "/campaigns/global-prayer",
      image: "/pmr-bg-mission.jpg"
    }
  ];

  return (
    <div className="w-full bg-white">
      <PageBanner title="Our Campaigns" />
      
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
            {campaigns.map((item) => (
              <motion.div 
                key={item.title} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="group bg-white border border-gray-100 rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-56 md:h-72 overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#ff9f22] text-[#002866] px-3 md:px-4 py-1 font-black text-[10px] md:text-xs uppercase tracking-widest">
                    {item.tag}
                  </div>
                </div>
                <div className="p-6 md:p-10 flex flex-col items-start h-full">
                  <h3 className="text-xl md:text-2xl font-bold text-[#002866] mb-3 md:mb-4 uppercase leading-tight">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed flex-grow">{item.description}</p>
                  <Link 
                    href={item.href}
                    className="inline-block bg-[#002866] text-white px-6 md:px-10 py-3 md:py-4 font-black uppercase tracking-[0.2em] text-[11px] md:text-[13px] hover:bg-[#ff9f22] hover:text-[#002866] transition-all shadow-md mt-auto"
                  >
                    View Campaign
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

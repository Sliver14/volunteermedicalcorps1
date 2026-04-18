"use client";

import PageBanner from "@/components/PageBanner";
import Image from "next/image";
import { motion } from "framer-motion";

export default function OurStoryPage() {
  const focusAreas = [
    "Health Care Services, Access And Education",
    "Humanitarian And Relief Missions",
    "Health Systems Strengthening And Capacity Building"
  ];

  return (
    <div className="w-full bg-white">
      <PageBanner title="Our Story" parent={{ label: "About Us", href: "#" }} />
      
      {/* Who We Are Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <h6 className="text-[#ff9f22] font-bold tracking-[0.3em] uppercase mb-4">Who We Are</h6>
              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-[#002866] mb-8 leading-tight">
                The Fastest Growing Global Christian Medical Outreach
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-roboto">
                <p>
                  The Volunteer Medical Corps was established as a network of Christian health workers, para-medics, humanitarian volunteers and students committed to providing medical care, relief assistance, and sustainable health care solutions in regions of crisis and to communities in dire need.
                </p>
                <div className="bg-[#002866] text-white p-8 border-l-8 border-[#ff9f22] italic shadow-xl">
                  &quot;To provide the best and most suitable medical aid to communities and persons in need.&quot;
                </div>
                <p>
                  We are an ever-expanding global network committed to making a positive impact across communities, cultures, and countries, providing prompt medical services where they are needed most.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[600px]"
            >
              <Image 
                src="/pmr-bg-mission.jpg" 
                alt="VMC Mission" 
                fill 
                className="object-cover rounded-sm shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-[#ff9f22] p-12 hidden md:block shadow-xl">
                <div className="text-[#002866] font-black text-6xl">2M+</div>
                <div className="text-[#002866] font-bold uppercase tracking-widest text-sm mt-2">Lives Impacted</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-poppins font-bold text-[#002866] uppercase">Our Focus Areas</h2>
            <div className="w-24 h-1 bg-[#ff9f22] mx-auto mt-6"></div>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {focusAreas.map((area, index) => (
              <motion.div 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="bg-white p-10 rounded-sm shadow-md hover:shadow-xl transition-all border-b-4 border-transparent hover:border-[#ff9f22] group text-center"
              >
                <div className="w-16 h-16 bg-[#002866] text-[#ff9f22] rounded-full flex items-center justify-center text-2xl font-black mb-6 mx-auto group-hover:scale-110 transition-transform">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-bold text-[#002866] leading-snug">{area}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision & Values Section */}
      <section className="py-24 bg-[#002866] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-poppins font-bold uppercase tracking-tight text-[#ff9f22]">Our Vision</h2>
              <p className="text-2xl font-light leading-relaxed text-gray-200">
                To have global medical outreaches geared towards the provision of prompt medical services in regions of crisis and/or dire need.
              </p>
            </motion.div>
            <div className="space-y-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-poppins font-bold uppercase tracking-tight text-[#ff9f22]"
              >
                Core Values
              </motion.h2>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {}
                }}
                className="grid grid-cols-2 gap-x-8 gap-y-10"
              >
                {[
                  { label: "Faith", icon: "✨" },
                  { label: "Innovation", icon: "💡" },
                  { label: "Integrity", icon: "🤝" },
                  { label: "Effectiveness", icon: "⚡" },
                  { label: "Compassion", icon: "❤️" }
                ].map((val, i) => (
                  <motion.div 
                    key={i} 
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
                    }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-3xl">{val.icon}</span>
                    <span className="text-xl font-bold uppercase tracking-widest">{val.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

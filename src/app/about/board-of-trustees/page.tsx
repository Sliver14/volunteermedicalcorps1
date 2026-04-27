"use client";

import PageBanner from "@/components/PageBanner";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BoardOfTrustees() {
  const members = [
    { name: "Pastor Dr. Deola Phillips", role: "Chairperson Volunteer Medical Corps", image: "public/trustees/pst-d.jpeg" },
    { name: "Dr. Emeka Eze", role: "DIM; MBBS; FWCP; MNCP", image: "https://volunteermedicalcorps.org/admin/images/gallery/591783-2.jpg" },
    { name: "Pastor Ifeoma Chiemeka", role: "B.Sc PHARM, MBA", image: "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg" },
    { name: "Dr. Gbenga Olusanya", role: "Medical Director (FMCPATH, Ph.D.)", image: "https://volunteermedicalcorps.org/admin/images/gallery/173895-bronx3.jpg" },
  ];

  return (
    <div className="w-full bg-white">
      <PageBanner title="Board of Trustees" parent={{ label: "About Us", href: "#" }} />
      
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-20"
          >
            <h6 className="text-[#ff9f22] font-bold tracking-widest uppercase mb-4">Our Leadership</h6>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-[#002866] uppercase">Board of Trustees</h2>
            <div className="w-24 h-1 bg-[#ff9f22] mx-auto mt-4 md:mt-6"></div>
            <p className="mt-6 md:mt-8 text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-roboto">
              The Volunteer Medical Corps is guided by a distinguished board of professionals committed to our mission of global medical and humanitarian excellence.
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          >
            {members.map((member) => (
              <motion.div 
                key={member.name} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="group"
              >
                <div className="relative h-[300px] md:h-[350px] overflow-hidden rounded-sm mb-6 shadow-lg border-b-8 border-[#ff9f22]">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0"
                  />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-lg md:text-xl font-bold text-[#002866] group-hover:text-[#ff9f22] transition-colors leading-tight uppercase tracking-tighter">
                    {member.name}
                  </h3>
                  <p className="text-[10px] md:text-xs font-roboto text-gray-400 uppercase tracking-[0.2em] font-black">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Advisory Council or something extra to fill the page */}
      <section className="py-12 md:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-[#002866] p-8 md:p-20 text-white relative overflow-hidden"
          >
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff9f22]/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#ff9f22] uppercase">Governing Principles</h2>
                <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed">
                  Our board ensures that the Volunteer Medical Corps operates with the highest standards of integrity, transparency, and clinical excellence, ensuring that every resource is optimized for maximum impact in the communities we serve.
                </p>
              </div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {}
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
              >
                {[
                  "Ethical Leadership",
                  "Clinical Excellence",
                  "Global Accountability",
                  "Strategic Innovation"
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
                    }}
                    className="border border-white/20 p-4 md:p-6 flex items-center justify-center text-center"
                  >
                    <span className="text-xs md:text-sm font-bold uppercase tracking-widest">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

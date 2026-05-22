"use client";

import PageBanner from "@/components/PageBanner";
import Image from "next/image";
import { motion } from "framer-motion";

import { useIsMobile } from "@/hooks/useIsMobile";

export default function BoardOfTrustees() {
  const isMobile = useIsMobile();
  const members = [
    {
      name: "Pastor Dr. Deola Phillips",
      role: "Chairperson Volunteer Medical Corps",
      extra: "CEO, LoveWorld Incorporated.",
      image: "/trustees/pst-d.jpeg",
    },
    {
      name: "Dr. Emeka Eze",
      role: "DIM; MBBS; FWCP; MNCP",
      image: "/trustees/emeka_img.jpg",
    },
    {
      name: "Pastor Ifeoma Chiemeka",
      role: "B.Sc PHARM, MBA",
      image: "/trustees/pastor_ifeoma.jpg",
    },
    {
      name: "Dr. Gbenga Olusanya",
      role: "Medical Director",
      extra: "FMCPATH, Ph.D.",
      image: "/trustees/gbenga_img.jpg",
    },
    {
      name: "Pastor Modupe Adetoro Isesele",
      role: "B.Sc, MBA, FCLRM, FCPM, M.IOD",
      extra: "A seasoned management professional with over 20 years of experience.",
      image: "/trustees/WhatsApp Image 2026-05-21 at 11.07.18 AM.jpeg",
    },
    {
      name: "Barrister Bisi Sogunle",
      role: "The Principal Partner",
      extra: "A.A Sogunle and Associates",
      image: "/trustees/114433-bisi.jpg",
    },
  ];

  return (
    <div className="w-full bg-bg-base transition-colors duration-300">
      <PageBanner title="Board of Trustees" parent={{ label: "About Us", href: "#" }} />
      
      <section className="py-12 md:py-24 bg-bg-base">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div 
      initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4 }}
      className="text-center mb-12 md:mb-20"
    >
      <h6 className="text-brand-secondary font-bold tracking-widest uppercase mb-4 text-xs">
        Our Leadership
      </h6>

      <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-brand-secondary uppercase">
        Board of Trustees
      </h2>

      <div className="w-24 h-1 bg-brand-secondary mx-auto mt-4 md:mt-6"></div>

      <p className="mt-6 md:mt-8 text-text-muted max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-medium">
        The Volunteer Medical Corps is guided by a distinguished board of
        professionals committed to our mission of global medical and humanitarian
        excellence.
      </p>
    </motion.div>

    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
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
            hidden: { opacity: 0, y: isMobile ? 30 : 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
          }}
          className="group"
        >
          <div className="relative h-[300px] md:h-[350px] overflow-hidden mb-6 shadow-lg border-b-8 border-brand-secondary">
            <Image 
              src={member.image} 
              alt={member.name} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-400 hover:grayscale"
            />
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-brand-primary dark:text-brand-secondary group-hover:text-brand-secondary transition-colors leading-tight uppercase tracking-tight">
              {member.name}
            </h3>

            <p className="text-[10px] md:text-[11px] font-bold text-text-muted uppercase tracking-widest leading-relaxed">
              {member.role}
            </p>

            {member.extra && (
              <div className="pt-2 border-t border-brand-secondary/20 mt-2">
                <p className="text-xs md:text-sm text-brand-primary dark:text-gray-300 font-medium leading-relaxed italic">
                  {member.extra}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

      {/* Governing Principles */}
      <section className="py-12 md:py-24 bg-bg-surface border-t border-border-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="bg-brand-primary p-8 md:p-20 text-white relative overflow-hidden"
          >
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-secondary/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-brand-secondary uppercase">Governing Principles</h2>
                <p className="text-base md:text-lg text-gray-200 font-normal leading-relaxed opacity-90">
                  Our board ensures that the Volunteer Medical Corps operates with the highest standards of integrity, transparency, and clinical excellence, ensuring that every resource is optimized for maximum impact in the communities we serve.
                </p>
              </div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
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
                    className="border border-white/20 p-4 md:p-6 flex items-center justify-center text-center bg-white/5"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest">{item}</span>
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

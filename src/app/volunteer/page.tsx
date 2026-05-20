"use client";

import PageBanner from "@/components/PageBanner";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function VolunteerLandingPage() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full bg-bg-base transition-colors duration-300">
      <PageBanner title="Become A Volunteer" />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={isMobile ? { opacity: 0, y: 40 } : { opacity: 0, scale: 1.05 }}
              whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0.35 : 0.6, ease: "easeOut" }}
            >
              <h6 className="text-brand-secondary font-bold tracking-[0.3em] uppercase mb-4 text-center lg:text-left">Join the Corps</h6>
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-brand-primary dark:text-brand-secondary mb-8 leading-tight text-center lg:text-left">
                Your Skills Can Change Lives
              </h2>
              <div className="space-y-6 text-text-muted text-lg leading-relaxed font-roboto text-center lg:text-left">
                <p>
                  The Volunteer Medical Corps provides a unique platform for medical professionals and humanitarian volunteers to offer their services where they are needed most. 
                </p>
                <p>
                  Whether you are a Christian health care worker, para-medic, or student, you can contribute to providing medical care, relief assistance, and sustainable health care solutions to communities in dire need.
                </p>
                <div className="pt-8">
                  <Link 
                    href="/register" 
                    className="group relative overflow-hidden block sm:inline-block w-full sm:w-auto text-center bg-brand-secondary text-brand-primary px-12 py-5 font-bold uppercase tracking-[0.2em] text-xs shadow-xl transition-all"
                  >
                    <span className="absolute inset-0 bg-brand-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                    <span className="relative z-10 group-hover:text-white transition-colors">Register Now</span>
                  </Link>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 40 } : { opacity: 0, scale: 1.05 }}
              whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0.35 : 0.6, delay: 0.2, ease: "easeOut" }}
              className="relative h-[500px] rounded-sm overflow-hidden shadow-2xl"
            >
              <Image 
                src="https://volunteermedicalcorps.org/admin/images/gallery/798453-1.jpg" 
                alt="Volunteer with VMC" 
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                className="object-cover"
              unoptimized />
              <div className="absolute inset-0 bg-brand-primary/20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-16 md:py-24 bg-bg-surface transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="text-2xl md:text-3xl font-poppins font-bold text-brand-primary dark:text-brand-secondary mb-16 uppercase"
          >
            Why Volunteer with VMC?
          </motion.h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              className="bg-bg-base p-10 shadow-md rounded-sm border-t-4 border-brand-secondary border border-x-border-main border-b-border-main"
            >
              <div className="text-4xl mb-6">🌍</div>
              <h4 className="text-xl font-bold text-brand-primary dark:text-brand-secondary mb-4">Global Network</h4>
              <p className="text-text-muted">Connect with thousands of Christian health professionals and volunteers worldwide.</p>
            </motion.div>
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              className="bg-bg-base p-10 shadow-md rounded-sm border-t-4 border-brand-secondary border border-x-border-main border-b-border-main"
            >
              <div className="text-4xl mb-6">🏆</div>
              <h4 className="text-xl font-bold text-brand-primary dark:text-brand-secondary mb-4">Earn Rewards</h4>
              <p className="text-text-muted">Gain volunteer credits and earn verified hours and certificates for your participation.</p>
            </motion.div>
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
              }}
              className="bg-bg-base p-10 shadow-md rounded-sm border-t-4 border-brand-secondary border border-x-border-main border-b-border-main"
            >
              <div className="text-4xl mb-6">✨</div>
              <h4 className="text-xl font-bold text-brand-primary dark:text-brand-secondary mb-4">Spiritual Impact</h4>
              <p className="text-text-muted">Be part of a movement that combines medical excellence with the Gospel of Jesus Christ.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

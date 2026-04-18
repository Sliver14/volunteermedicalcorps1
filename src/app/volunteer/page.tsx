"use client";

import PageBanner from "@/components/PageBanner";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function VolunteerLandingPage() {
  return (
    <div className="w-full bg-white">
      <PageBanner title="Become A Volunteer" />
      
      {/* Hero Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <h6 className="text-[#ff9f22] font-bold tracking-[0.3em] uppercase mb-4 text-center lg:text-left">Join the Corps</h6>
              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-[#002866] mb-8 leading-tight text-center lg:text-left">
                Your Skills Can Change Lives
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-roboto text-center lg:text-left">
                <p>
                  The Volunteer Medical Corps provides a unique platform for medical professionals and humanitarian volunteers to offer their services where they are needed most. 
                </p>
                <p>
                  Whether you are a Christian health care worker, para-medic, or student, you can contribute to providing medical care, relief assistance, and sustainable health care solutions to communities in dire need.
                </p>
                <div className="pt-8">
                  <Link 
                    href="/register" 
                    className="inline-block bg-[#ff9f22] text-[#002866] px-12 py-5 font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#002866] hover:text-white transition-all"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[500px] rounded-sm overflow-hidden shadow-2xl"
            >
              <Image 
                src="/give-17-300x200.jpg" 
                alt="Volunteer with VMC" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#002866]/20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-poppins font-bold text-[#002866] mb-16 uppercase"
          >
            Why Volunteer with VMC?
          </motion.h2>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="bg-white p-10 shadow-md rounded-sm border-t-4 border-[#ff9f22]"
            >
              <div className="text-4xl mb-6">🌍</div>
              <h4 className="text-xl font-bold text-[#002866] mb-4">Global Network</h4>
              <p className="text-gray-500">Connect with thousands of Christian health professionals and volunteers worldwide.</p>
            </motion.div>
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="bg-white p-10 shadow-md rounded-sm border-t-4 border-[#ff9f22]"
            >
              <div className="text-4xl mb-6">🏆</div>
              <h4 className="text-xl font-bold text-[#002866] mb-4">Earn Rewards</h4>
              <p className="text-gray-500">Gain volunteer credits and earn verified hours and certificates for your participation.</p>
            </motion.div>
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="bg-white p-10 shadow-md rounded-sm border-t-4 border-[#ff9f22]"
            >
              <div className="text-4xl mb-6">✨</div>
              <h4 className="text-xl font-bold text-[#002866] mb-4">Spiritual Impact</h4>
              <p className="text-gray-500">Be part of a movement that combines medical excellence with the Gospel of Jesus Christ.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

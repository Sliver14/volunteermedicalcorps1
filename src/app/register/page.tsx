"use client";

import PageBanner from "@/components/PageBanner";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <div className="w-full bg-gray-50 font-roboto">
      <PageBanner title="Join Volunteer Medical Corps" />
      
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 text-center lg:text-left">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl font-poppins font-bold text-[#002866] mb-6 uppercase">Become a Volunteer</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Whether you are a Christian health care worker, para-medic, or student, your skills can change lives. Join us in providing medical care, relief assistance, and sustainable health care solutions to communities in dire need.
              </p>
              
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="bg-[#ff9f22] text-[#002866] p-3 rounded-full md:mr-4 mb-4 md:mb-0">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Make a Global Impact</h4>
                    <p className="text-gray-600 text-sm">Contribute to medical outreaches and humanitarian projects worldwide.</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="bg-[#ff9f22] text-[#002866] p-3 rounded-full md:mr-4 mb-4 md:mb-0">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Earn VMC Rewards</h4>
                    <p className="text-gray-600 text-sm">Gain volunteer credits and be recognized for your active participation.</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="bg-[#ff9f22] text-[#002866] p-3 rounded-full md:mr-4 mb-4 md:mb-0">✓</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Join a Network</h4>
                    <p className="text-gray-600 text-sm">Connect with thousands of Christian health professionals globally.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Registration Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 bg-white p-6 md:p-12 shadow-xl border-t-4 border-[#002866] rounded-sm text-left"
            >
              <h3 className="text-2xl font-poppins font-bold mb-8 uppercase text-[#002866] text-center md:text-left">Registration Form</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase mb-2">First Name *</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm focus:outline-none focus:border-[#002866] focus:ring-1 focus:ring-[#002866]" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Last Name *</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm focus:outline-none focus:border-[#002866] focus:ring-1 focus:ring-[#002866]" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Email Address *</label>
                    <input type="email" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm focus:outline-none focus:border-[#002866] focus:ring-1 focus:ring-[#002866]" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Phone Number</label>
                    <input type="tel" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm focus:outline-none focus:border-[#002866] focus:ring-1 focus:ring-[#002866]" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Volunteer Category *</label>
                  <select className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm focus:outline-none focus:border-[#002866] focus:ring-1 focus:ring-[#002866]" required>
                    <option value="">Select Category</option>
                    <option value="medical">Medical Professional (Doctor, Nurse, etc.)</option>
                    <option value="paramedic">Paramedic / EMT</option>
                    <option value="student">Medical/Nursing Student</option>
                    <option value="non-medical">Non-Medical / Humanitarian Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Country of Residence *</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm focus:outline-none focus:border-[#002866] focus:ring-1 focus:ring-[#002866]" required />
                </div>

                <div className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-3 h-4 w-4 text-[#002866] focus:ring-[#002866] border-gray-300 rounded" required />
                  <label className="text-sm text-gray-600">
                    I agree to the <Link href="/terms" className="text-[#002866] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#002866] hover:underline">Privacy Policy</Link>, and consent to the Volunteer Medical Corps processing my data.
                  </label>
                </div>

                <button type="button" className="w-full bg-[#002866] text-white py-5 font-bold uppercase tracking-widest hover:bg-[#ff9f22] hover:text-[#002866] transition-all rounded-sm">
                  Complete Registration
                </button>
              </form>
              
              <div className="mt-6 text-center text-sm text-gray-600">
                Already have an account? <Link href="/login" className="text-[#002866] font-bold hover:underline">Login here</Link>.
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}

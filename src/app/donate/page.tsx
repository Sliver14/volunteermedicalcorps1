"use client";

import PageBanner from "@/components/PageBanner";
import { useState } from "react";
import { motion } from "framer-motion";

export default function DonatePage() {
  const [selectedCause, setSelectedCause] = useState("");
  const [amount, setAmount] = useState("100");

  const causes = [
    "Sponsor VMC Free Surgeries",
    "Adopt a Hospital/Community Clinic",
    "Sponsor Relief Missions",
    "Adopt a Community Health Extension Worker",
    "Sponsor a Good Deeds Project Today!",
    "Medical Kits/Hygiene Packs/Medical outreaches",
    "Mother & Baby Care Kits",
    "Mosquito Nets & Repellants",
    "1 Million Smiles",
  ];

  const handleCauseSelect = (cause: string) => {
    setSelectedCause(cause);
    document.getElementById("donation-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full font-roboto">
      <PageBanner title="Donate / Partnership" />
      
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-center lg:text-left">
            
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-poppins font-bold text-[#002866] mb-6 uppercase">Partner with VMC</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Your partnership enables us to provide sustainable health care solutions in regions of crisis and to communities in dire need. Choose a cause below to make an impact today.
              </p>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {}
                }}
                className="grid grid-cols-1 gap-4"
              >
                {causes.map((cause) => (
                  <motion.div 
                    key={cause} 
                    onClick={() => handleCauseSelect(cause)}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
                    }}
                    className={`flex items-center justify-center lg:justify-start p-4 border-l-4 transition-all cursor-pointer group
                      ${selectedCause === cause 
                        ? 'bg-[#ff9f22] border-[#002866] translate-x-2' 
                        : 'bg-gray-50 border-[#ff9f22] hover:bg-gray-100'}`}
                  >
                    <span className={`font-semibold transition-transform ${selectedCause === cause ? 'text-[#002866]' : 'text-[#002866] group-hover:translate-x-2'}`}>
                      {cause}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Donation Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              id="donation-form" 
              className="bg-[#002866] p-10 text-white rounded-sm shadow-2xl h-fit sticky top-32 text-center md:text-left transition-all"
            >
              <h3 className="text-2xl font-poppins font-bold mb-8 uppercase text-[#ff9f22]">
                {selectedCause ? `Supporting: ${selectedCause}` : 'Make a Donation'}
              </h3>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Redirecting to secure payment gateway..."); }}>
                <div>
                  <label className="block text-sm font-bold uppercase mb-2">Full Name</label>
                  <input required type="text" className="w-full bg-white/10 border border-white/20 p-4 rounded-sm focus:outline-none focus:border-[#ff9f22] text-white" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase mb-2">Email Address</label>
                  <input required type="email" className="w-full bg-white/10 border border-white/20 p-4 rounded-sm focus:outline-none focus:border-[#ff9f22] text-white" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase mb-2">Donation Amount ($)</label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {['10', '50', '100'].map(val => (
                      <button 
                        type="button" 
                        key={val} 
                        onClick={() => setAmount(val)}
                        className={`py-3 border font-bold transition-all
                          ${amount === val 
                            ? 'bg-[#ff9f22] text-[#002866] border-[#ff9f22]' 
                            : 'border-white/20 hover:bg-[#ff9f22] hover:text-[#002866]'}`}
                      >
                        $ {val}
                      </button>
                    ))}
                  </div>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 p-4 rounded-sm focus:outline-none focus:border-[#ff9f22] text-white" 
                    placeholder="Other Amount" 
                  />
                </div>
                <button type="submit" className="w-full bg-[#ff9f22] text-[#002866] py-5 font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95">
                  Process Donation
                </button>
                <p className="text-center text-xs text-white/50 italic">All donations are secured and tax-deductible.</p>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}

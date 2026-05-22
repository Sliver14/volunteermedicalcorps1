"use client";

import { useState } from "react";
import PageBanner from "@/components/PageBanner";
import Image from "next/image";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { useIsMobile } from "@/hooks/useIsMobile";
import { motion } from "framer-motion";

const projects = [
  { id: "EUT-254138", title: "1 Million Smiles", image: "/give-images/projects/1msmiles.jpg", goal: 100000, description: "Join us to bring smiles to millions of people around the world through our humanitarian projects." },
  { id: "MIR-092003", title: "Mosquito Nets & Repellants", image: "/give-images/projects/mosquito.jpg", goal: 50000, description: "Protect families from malaria by providing treated mosquito nets and repellants." },
  { id: "MBB-475564", title: "Mother & Baby Care Kits", image: "/give-images/projects/mother-baby.jpg", goal: 75000, description: "Provide essential care kits for mothers and newborns in underserved communities." },
  { id: "MEO-192993", title: "Medical Kits/Hygiene Packs/Medical outreaches", image: "/give-images/projects/medical-outreaches.jpg", goal: 150000, description: "Support our medical outreaches with essential kits and hygiene packs." },
  { id: "RTS-837822", title: "Sponsor a Good Deeds Project Today!", image: "/give-images/projects/gooddeeds.jpg", goal: 100000, description: "Your support enables us to carry out good deeds that save lives." },
  { id: "PMJ-328791", title: "Adopt a Community Health Extension Worker", image: "/give-images/projects/qQpD1YCay974568123.jpg", goal: 120000, description: "Sponsor a health worker to provide continuous care in rural communities." },
  { id: "CXK-145723", title: "Sponsor Relief Missions", image: "/give-images/projects/ajQwrT96F267394158.jpg", goal: 100000, description: "Join us to provide relief materials, medical supplies and healthcare resources to victims of disasters." },
  { id: "CUR-139658", title: "Adopt a Hospital/Community Clinic", image: "/give-images/projects/WucF1X6hY.jpg", goal: 200000, description: "Adopt and equip a local clinic to provide sustainable healthcare." },
  { id: "EUB-254139", title: "Sponsor VMC Free Surgeries", image: "/give-images/projects/surgical-outreaches.jpg", goal: 250000, description: "Provide life-changing surgeries for those who cannot afford them." },
];

const presetAmounts = [10, 20, 50, 100, 200, 500, 1000];

export default function GivePage() {
  const isMobile = useIsMobile();
  const [selectedProj, setSelectedProj] = useState("CXK-145723");
  const [amount, setAmount] = useState<number | string>(10);
  const [frequency, setFrequency] = useState("once");
  const [paymentMode, setPaymentMode] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    country: "",
  });

  const activeProject = projects.find(p => p.id === selectedProj) || projects[6];
  const displayAmount = amount === "others" ? 0 : Number(amount);
  const espeesAmount = displayAmount; // 1 USD = 1 Espees

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMode) {
      alert("Please select a payment mode");
      return;
    }
    
    if (paymentMode === "BANK") {
      alert("Please use the bank details provided to make your transfer. Thank you!");
      return;
    }

    try {
      const response = await fetch('/api/donations/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          firstName: formData.fname,
          lastName: formData.lname,
          amount: displayAmount,
          method: paymentMode,
          campaignId: selectedProj,
          frequency,
        }),
      });

      const data = await response.json();
      if (data.success && data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        alert(data.error || "Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full bg-bg-base font-roboto transition-colors duration-300">
      <PageBanner title="Give" />

      <section className="py-16 md:py-24 bg-bg-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-brand-secondary mb-4 uppercase">Sponsor this Project Today!</h2>
            <p className="text-text-muted mb-10 font-medium">Join us to save more lives. Give Now!</p>
          </motion.div>

          <div className="mb-12">
            <select 
              value={selectedProj}
              onChange={(e) => setSelectedProj(e.target.value)}
              className="border border-border-main p-4 font-bold text-sm w-full max-w-md focus:outline-none focus:border-brand-secondary bg-bg-surface text-text-main"
            >
              <option value="">Choose Project...</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          <motion.div 
            initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-bg-surface border border-border-main overflow-hidden mb-16 shadow-lg"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative h-64 md:h-auto min-h-[350px]">
                <Image 
                  src={activeProject.image} 
                  alt={activeProject.title}
                  fill
                  className="object-cover transition-opacity duration-300"
                  unoptimized
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <h3 className="text-2xl font-bold text-brand-primary dark:text-brand-secondary mb-4 uppercase leading-tight">{activeProject.title}</h3>
                <div className="text-brand-primary dark:text-white font-bold text-xl mb-6">Goal: ${activeProject.goal.toLocaleString()}</div>
                <p className="text-text-muted mb-8 leading-relaxed font-medium">{activeProject.description}</p>
                <div className="flex items-center gap-4 pt-6 border-t border-border-main">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Share Project:</span>
                  <div className="flex gap-3">
                    <div className="w-9 h-9 bg-brand-primary border border-white/10 flex items-center justify-center text-white cursor-pointer hover:bg-brand-secondary hover:text-brand-primary transition-all">
                      <FaFacebookF size={14} />
                    </div>
                    <div className="w-9 h-9 bg-brand-primary border border-white/10 flex items-center justify-center text-white cursor-pointer hover:bg-brand-secondary hover:text-brand-primary transition-all">
                      <FaTwitter size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <form onSubmit={handleProceed} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Payment Section */}
            <div className="lg:col-span-7 bg-bg-surface border border-border-main p-8 md:p-12 shadow-sm">
              <h3 className="text-lg font-bold text-brand-primary dark:text-brand-secondary mb-8 uppercase tracking-widest border-b border-border-main pb-4">Partnership Amount</h3>
              
              <div className="flex flex-wrap gap-3 mb-10">
                {presetAmounts.map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`px-6 py-4 border-2 font-bold transition-all text-sm tracking-tighter min-w-[80px] ${amount === amt ? 'bg-brand-secondary border-brand-secondary text-brand-primary shadow-lg' : 'bg-bg-base border-border-main text-text-muted hover:border-brand-secondary'}`}
                  >
                    ${amt}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setAmount("others")}
                  className={`px-6 py-4 border-2 font-bold transition-all text-sm tracking-tighter ${amount === "others" ? 'bg-brand-secondary border-brand-secondary text-brand-primary shadow-lg' : 'bg-bg-base border-border-main text-text-muted hover:border-brand-secondary'}`}
                >
                  Others
                </button>
              </div>

              {amount === "others" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <input 
                    type="number" 
                    placeholder="Enter Custom Amount ($)"
                    className="w-full border-2 border-brand-secondary p-5 text-xl font-bold outline-none bg-bg-base text-text-main"
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </motion.div>
              )}

              <div className="mb-12">
                <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">Donation Frequency</label>
                <select 
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full max-w-xs border-2 border-border-main p-4 font-bold focus:outline-none focus:border-brand-secondary bg-bg-base text-text-main"
                >
                  <option value="once">One-Time Payment</option>
                  <option value="recurrent">Recurrent [ Monthly ]</option>
                </select>
              </div>

              <div className="border border-dashed border-border-main p-8 bg-bg-base/50">
                <h4 className="text-center font-bold text-brand-primary dark:text-brand-secondary mb-8 uppercase text-xs tracking-widest">Select Payment Option</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col items-center gap-2 cursor-pointer group">
                    <input type="radio" name="paymode" value="PAYSTACK" className="sr-only" onChange={(e) => setPaymentMode(e.target.value)} required />
                    <div className={`p-4 border-2 transition-all w-full flex flex-col items-center min-h-[140px] justify-center bg-bg-surface ${paymentMode === 'PAYSTACK' ? 'border-brand-secondary shadow-inner' : 'border-border-main group-hover:border-brand-secondary'}`}>
                      <div className="text-[10px] font-bold text-center mb-3 text-text-main uppercase tracking-widest">Paystack<br/><span className="text-brand-secondary">(Card / Transfer / USSD)</span></div>
                      <Image src="/give-images/paystack.png" alt="Paystack" width={80} height={30} className="object-contain" unoptimized />
                      {paymentMode === 'PAYSTACK' && <div className="text-[10px] text-brand-secondary font-bold mt-1">Total: ₦{(displayAmount * 1500).toLocaleString()}</div>}
                    </div>
                  </label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer group">
                    <input type="radio" name="paymode" value="ESPEES" className="sr-only" onChange={(e) => setPaymentMode(e.target.value)} />
                    <div className={`p-4 border-2 transition-all w-full flex flex-col items-center min-h-[140px] justify-center bg-bg-surface ${paymentMode === 'ESPEES' ? 'border-brand-secondary shadow-inner' : 'border-border-main group-hover:border-brand-secondary'}`}>
                      <div className="text-[10px] font-bold text-center mb-3 text-text-main uppercase tracking-widest">KingsPay / Espees<br/><span className="text-brand-secondary">(Code: VMC)</span></div>
                      <Image src="/give-images/espees.png" alt="Espees" width={80} height={30} className="object-contain dark:brightness-200" unoptimized />
                      {paymentMode === 'ESPEES' && <div className="text-[10px] text-brand-secondary font-bold mt-1">Total: {espeesAmount} ESP</div>}
                    </div>
                  </label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer group sm:col-span-2">
                    <input type="radio" name="paymode" value="BANK" className="sr-only" onChange={(e) => setPaymentMode(e.target.value)} />
                    <div className={`p-4 border-2 transition-all w-full flex flex-col items-center min-h-[100px] justify-center bg-bg-surface ${paymentMode === 'BANK' ? 'border-brand-secondary shadow-inner' : 'border-border-main group-hover:border-brand-secondary'}`}>
                      <div className="text-[10px] font-bold text-center mb-3 text-text-main uppercase tracking-widest">Direct Bank Transfer</div>
                      <Image src="/give-images/bank.png" alt="Bank" width={80} height={30} className="object-contain dark:brightness-200" unoptimized />
                    </div>
                  </label>
                </div>

                <div className="mt-8 pt-8 border-t border-border-main">
                  <h4 className="font-bold text-brand-primary dark:text-brand-secondary mb-4 uppercase text-[10px] tracking-widest">Payment Details</h4>
                  {paymentMode === "BANK" ? (
                    <div className="text-[10px] text-text-muted space-y-3">
                      <div className="bg-bg-surface p-4 border border-border-main">
                        <div className="font-bold text-brand-primary dark:text-brand-secondary text-center mb-2 uppercase tracking-widest border-b border-border-main pb-2">NAIRA ACCOUNT</div>
                        <div className="flex justify-between"><span>Bank:</span> <b className="text-text-main">Sterling Bank PLC</b></div>
                        <div className="flex justify-between"><span>Account:</span> <b className="text-text-main">0076248534 (₦)</b></div>
                      </div>
                      <div className="bg-bg-surface p-4 border border-border-main">
                        <div className="font-bold text-brand-primary dark:text-brand-secondary text-center mb-2 uppercase tracking-widest border-b border-border-main pb-2">DOLLAR ACCOUNT</div>
                        <div className="flex justify-between"><span>Bank:</span> <b className="text-text-main">Sterling Bank PLC</b></div>
                        <div className="flex justify-between"><span>Account:</span> <b className="text-text-main">0076248833 ($)</b></div>
                      </div>
                      <div className="bg-bg-surface p-4 border border-border-main">
                        <div className="font-bold text-brand-primary dark:text-brand-secondary text-center mb-2 uppercase tracking-widest border-b border-border-main pb-2">JP MORGAN CHASE (USD)</div>
                        <div className="flex justify-between"><span>Account:</span> <b className="text-text-main">662023830</b></div>
                        <div className="flex justify-between"><span>Branch:</span> <b className="text-text-main">Ramsey Branch - 948</b></div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-text-muted font-medium italic">To make your contribution to this project, select from the payment options shown above.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Billing Section */}
            <div className="lg:col-span-5 p-4 md:p-8 bg-bg-surface border border-border-main shadow-sm h-max sticky top-32">
              <h3 className="text-lg font-bold text-brand-primary dark:text-brand-secondary mb-10 uppercase tracking-widest border-b border-border-main pb-4">Billing Information</h3>
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">First Name *</label>
                    <input 
                      type="text" 
                      className="w-full border-b border-border-main p-2 focus:outline-none focus:border-brand-secondary bg-transparent text-text-main font-medium" 
                      placeholder="e.g. John" 
                      required
                      value={formData.fname}
                      onChange={(e) => setFormData({...formData, fname: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Last Name *</label>
                    <input 
                      type="text" 
                      className="w-full border-b border-border-main p-2 focus:outline-none focus:border-brand-secondary bg-transparent text-text-main font-medium" 
                      placeholder="e.g. Doe" 
                      required
                      value={formData.lname}
                      onChange={(e) => setFormData({...formData, lname: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Email Address *</label>
                  <input 
                    type="email" 
                    className="w-full border-b border-border-main p-2 focus:outline-none focus:border-brand-secondary bg-transparent text-text-main font-medium" 
                    placeholder="john.doe@example.com" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Phone Number *</label>
                  <input 
                    type="tel" 
                    className="w-full border-b border-border-main p-2 focus:outline-none focus:border-brand-secondary bg-transparent text-text-main font-medium" 
                    placeholder="+1 (234) 567-890" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Country *</label>
                  <select 
                    className="w-full border-b border-border-main p-2 focus:outline-none focus:border-brand-secondary bg-transparent text-text-main font-medium cursor-pointer"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  >
                    <option value="" className="bg-bg-surface">Select Country...</option>
                    <option value="Nigeria" className="bg-bg-surface">Nigeria</option>
                    <option value="USA" className="bg-bg-surface">USA</option>
                    <option value="UK" className="bg-bg-surface">UK</option>
                    <option value="Canada" className="bg-bg-surface">Canada</option>
                    <option value="South Africa" className="bg-bg-surface">South Africa</option>
                  </select>
                </div>
                
                <button type="submit" className="group relative overflow-hidden w-full bg-brand-primary text-white py-5 font-bold uppercase tracking-[0.2em] text-xs transition-all shadow-xl mt-8">
                  <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                  <span className="relative z-10 group-hover:text-brand-primary transition-colors">Proceed to Payment</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import PageBanner from "@/components/PageBanner";
import Image from "next/image";

const projects = [
  { id: "EUT-254138", title: "1 Million Smiles", href: "/give?proj=EUT-254138" },
  { id: "MIR-092003", title: "Mosquito Nets & Repellants", href: "/give?proj=MIR-092003" },
  { id: "MBB-475564", title: "Mother & Baby Care Kits", href: "/give?proj=MBB-475564" },
  { id: "MEO-192993", title: "Medical Kits/Hygiene Packs/Medical outreaches", href: "/give?proj=MEO-192993" },
  { id: "RTS-837822", title: "Sponsor a Good Deeds Project Today!", href: "/give?proj=RTS-837822" },
  { id: "PMJ-328791", title: "Adopt a Community Health Extension Worker", href: "/give?proj=PMJ-328791" },
  { id: "CXK-145723", title: "Sponsor Relief Missions", href: "/give?proj=CXK-145723", default: true },
  { id: "CUR-139658", title: "Adopt a Hospital/Community Clinic", href: "/give?proj=CUR-139658" },
  { id: "EUB-254139", title: "Sponsor VMC Free Surgeries", href: "/give?proj=EUB-254139" },
];

const presetAmounts = [10, 20, 50, 100, 200, 500, 1000];

export default function GivePage() {
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

  return (
    <div className="w-full bg-white">
      <PageBanner title="Give" />

      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#002866] mb-4">Sponsor this Project Today!</h2>
          <p className="text-gray-600 mb-8">Join us to save more lives. Give Now!</p>

          <div className="mb-10">
            <select 
              value={selectedProj}
              onChange={(e) => setSelectedProj(e.target.value)}
              className="border border-gray-200 p-4 font-bold text-sm w-full max-w-md focus:outline-none focus:border-[#ff9f22]"
            >
              <option value="">Choose Project...</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          <div className="bg-[#e1e1e1] rounded-sm overflow-hidden mb-12 shadow-sm">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image 
                  src="/give-images/projects/ajQwrT96F267394158.jpg" 
                  alt={activeProject.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-bold text-[#002866] mb-4">{activeProject.title}</h3>
                <div className="text-[#002866] font-black text-lg mb-4">Goal: $100,000</div>
                <p className="text-black mb-6">Join us to provide relief materials, medical supplies and healthcare resources to victims of disasters</p>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Share:</span>
                  {/* Icons placeholder */}
                  <div className="w-6 h-6 bg-[#002866] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <form className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Payment Section */}
            <div className="lg:col-span-7 bg-[#f1f1f1] border border-gray-200 p-8 rounded-sm">
              <h3 className="text-xl font-bold text-[#002866] mb-6 uppercase tracking-tight">Partnership Amount</h3>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {presetAmounts.map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`px-6 py-3 border-2 font-black transition-all ${amount === amt ? 'bg-[#ff9f22] border-[#ff9f22] text-[#002866]' : 'bg-white border-gray-200 text-gray-400 hover:border-[#ff9f22]'}`}
                  >
                    ${amt}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setAmount("others")}
                  className={`px-6 py-3 border-2 font-black transition-all ${amount === "others" ? 'bg-[#ff9f22] border-[#ff9f22] text-[#002866]' : 'bg-white border-gray-200 text-gray-400 hover:border-[#ff9f22]'}`}
                >
                  Others
                </button>
              </div>

              {amount === "others" && (
                <div className="mb-6 animate-in fade-in slide-in-from-top-2">
                  <input 
                    type="number" 
                    placeholder="Enter Amount ($)"
                    className="w-full border-2 border-[#ff9f22] p-4 text-lg font-bold outline-none"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              )}

              <div className="mb-10">
                <select 
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full max-w-xs border-2 border-[#ff9f22] p-4 font-bold rounded-sm focus:outline-none"
                >
                  <option value="once">One-Time Payment</option>
                  <option value="recurrent">Recurrent [ Monthly ]</option>
                </select>
              </div>

              <div className="border border-dashed border-gray-300 p-6 bg-white">
                <h4 className="text-center font-bold text-[#002866] mb-6 uppercase">Select Payment Option</h4>
                <div className="grid grid-cols-3 gap-4">
                  <label className="flex flex-col items-center gap-2 cursor-pointer group">
                    <input type="radio" name="paymode" value="KINGSPAY" className="sr-only" onChange={(e) => setPaymentMode(e.target.value)} />
                    <div className={`p-4 border-2 transition-all w-full flex flex-col items-center ${paymentMode === 'KINGSPAY' ? 'border-[#ff9f22] bg-orange-50' : 'border-gray-100 group-hover:border-[#ff9f22]'}`}>
                      <div className="text-[10px] font-black text-center mb-2">KINGSPAY<br/>(Code: BLVMC)</div>
                      <Image src="/give-images/kingspay.png" alt="Kingspay" width={60} height={20} className="object-contain" unoptimized />
                    </div>
                  </label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer group">
                    <input type="radio" name="paymode" value="ESPEES" className="sr-only" onChange={(e) => setPaymentMode(e.target.value)} />
                    <div className={`p-4 border-2 transition-all w-full flex flex-col items-center ${paymentMode === 'ESPEES' ? 'border-[#ff9f22] bg-orange-50' : 'border-gray-100 group-hover:border-[#ff9f22]'}`}>
                      <div className="text-[10px] font-black text-center mb-2">ESPEES<br/>(Code: VMC)</div>
                      <Image src="/give-img/espees.png" alt="Espees" width={60} height={20} className="object-contain" unoptimized />
                    </div>
                  </label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer group">
                    <input type="radio" name="paymode" value="BANK" className="sr-only" onChange={(e) => setPaymentMode(e.target.value)} />
                    <div className={`p-4 border-2 transition-all w-full flex flex-col items-center ${paymentMode === 'BANK' ? 'border-[#ff9f22] bg-orange-50' : 'border-gray-100 group-hover:border-[#ff9f22]'}`}>
                      <div className="text-[10px] font-black text-center mb-2">BANK<br/>PAYMENT</div>
                      <Image src="/give-images/bank.png" alt="Bank" width={60} height={20} className="object-contain" unoptimized />
                    </div>
                  </label>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h4 className="font-bold text-[#002866] mb-2 uppercase">Payment Details</h4>
                  <p className="text-xs text-gray-500">To make your contribution to this project, select from the payment options shown above</p>
                </div>
              </div>
            </div>

            {/* Billing Section */}
            <div className="lg:col-span-5 p-4">
              <h3 className="text-xl font-bold text-[#002866] mb-6 uppercase tracking-tight">Billing Information</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">First Name *</label>
                    <input type="text" className="w-full border-b border-gray-200 p-2 focus:outline-none focus:border-[#ff9f22]" placeholder="First Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Last Name *</label>
                    <input type="text" className="w-full border-b border-gray-200 p-2 focus:outline-none focus:border-[#ff9f22]" placeholder="Last Name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Email *</label>
                  <input type="email" className="w-full border-b border-gray-200 p-2 focus:outline-none focus:border-[#ff9f22]" placeholder="Email" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Phone *</label>
                  <input type="tel" className="w-full border-b border-gray-200 p-2 focus:outline-none focus:border-[#ff9f22]" placeholder="Phone" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Country *</label>
                  <select className="w-full border-b border-gray-200 p-2 focus:outline-none focus:border-[#ff9f22] bg-white">
                    <option value="">Select Country...</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                </div>
                
                <button className="w-full bg-[#002866] text-white py-5 font-black uppercase tracking-widest text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all shadow-xl mt-8">
                  Proceed to Payment
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

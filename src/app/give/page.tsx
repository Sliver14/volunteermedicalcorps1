"use client";

import { useState, useEffect } from "react";
import PageBanner from "@/components/PageBanner";
import Image from "next/image";

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

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMode) {
      alert("Please select a payment mode");
      return;
    }
    
    // Integration logic would go here
    console.log("Proceeding with:", { activeProject, amount, frequency, paymentMode, formData });
    
    if (paymentMode === "KINGSPAY") {
      window.open(`https://kingspay.online/pay?code=BLVMC&amount=${displayAmount}&currency=USD`, "_blank");
    } else if (paymentMode === "ESPEES") {
      window.open(`https://espees.org/pay?code=VMC&amount=${espeesAmount}`, "_blank");
    }
  };

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
              className="border border-gray-200 p-4 font-bold text-sm w-full max-w-md focus:outline-none focus:border-[#ff9f22] bg-white"
            >
              <option value="">Choose Project...</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          <div className="bg-[#e1e1e1] rounded-sm overflow-hidden mb-12 shadow-sm">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative h-64 md:h-auto min-h-[300px]">
                <Image 
                  src={activeProject.image} 
                  alt={activeProject.title}
                  fill
                  className="object-cover transition-opacity duration-500"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-bold text-[#002866] mb-4">{activeProject.title}</h3>
                <div className="text-[#002866] font-black text-lg mb-4">Goal: ${activeProject.goal.toLocaleString()}</div>
                <p className="text-black mb-6">{activeProject.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Share:</span>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-[#002866] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#ff9f22] transition-colors">
                      <i className="fab fa-facebook-f text-sm"></i>
                    </div>
                    <div className="w-8 h-8 bg-[#002866] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#ff9f22] transition-colors">
                      <i className="fab fa-twitter text-sm"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleProceed} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
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
                    required
                  />
                </div>
              )}

              <div className="mb-10">
                <select 
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full max-w-xs border-2 border-[#ff9f22] p-4 font-bold rounded-sm focus:outline-none bg-white"
                >
                  <option value="once">One-Time Payment</option>
                  <option value="recurrent">Recurrent [ Monthly ]</option>
                </select>
              </div>

              <div className="border border-dashed border-gray-300 p-6 bg-white">
                <h4 className="text-center font-bold text-[#002866] mb-6 uppercase">Select Payment Option</h4>
                <div className="grid grid-cols-3 gap-4">
                  <label className="flex flex-col items-center gap-2 cursor-pointer group">
                    <input type="radio" name="paymode" value="KINGSPAY" className="sr-only" onChange={(e) => setPaymentMode(e.target.value)} required />
                    <div className={`p-4 border-2 transition-all w-full flex flex-col items-center min-h-[140px] justify-center ${paymentMode === 'KINGSPAY' ? 'border-[#ff9f22] bg-orange-50' : 'border-gray-100 group-hover:border-[#ff9f22]'}`}>
                      <div className="text-[10px] font-black text-center mb-2">KINGSPAY<br/>(Code: BLVMC)</div>
                      <Image src="/give-images/kingspay.png" alt="Kingspay" width={80} height={30} className="object-contain" unoptimized />
                    </div>
                  </label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer group">
                    <input type="radio" name="paymode" value="ESPEES" className="sr-only" onChange={(e) => setPaymentMode(e.target.value)} />
                    <div className={`p-4 border-2 transition-all w-full flex flex-col items-center min-h-[140px] justify-center ${paymentMode === 'ESPEES' ? 'border-[#ff9f22] bg-orange-50' : 'border-gray-100 group-hover:border-[#ff9f22]'}`}>
                      <div className="text-[10px] font-black text-center mb-2">ESPEES<br/>(Code: VMC)</div>
                      <Image src="/give-images/espees.png" alt="Espees" width={80} height={30} className="object-contain" unoptimized />
                      {paymentMode === 'ESPEES' && <div className="text-[10px] text-orange-600 font-bold mt-1">Total: {espeesAmount} ESP</div>}
                    </div>
                  </label>
                  <label className="flex flex-col items-center gap-2 cursor-pointer group">
                    <input type="radio" name="paymode" value="BANK" className="sr-only" onChange={(e) => setPaymentMode(e.target.value)} />
                    <div className={`p-4 border-2 transition-all w-full flex flex-col items-center min-h-[140px] justify-center ${paymentMode === 'BANK' ? 'border-[#ff9f22] bg-orange-50' : 'border-gray-100 group-hover:border-[#ff9f22]'}`}>
                      <div className="text-[10px] font-black text-center mb-2">BANK<br/>PAYMENT</div>
                      <Image src="/give-images/bank.png" alt="Bank" width={80} height={30} className="object-contain" unoptimized />
                    </div>
                  </label>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h4 className="font-bold text-[#002866] mb-2 uppercase">Payment Details</h4>
                  {paymentMode === "BANK" ? (
                    <div className="text-[10px] text-gray-700 space-y-2">
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="font-bold text-[#002866] text-center mb-1">NAIRA ACCOUNT</div>
                        <div>Bank: <b>Sterling Bank PLC</b></div>
                        <div>Account: <b>0076248534 (₦)</b></div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="font-bold text-[#002866] text-center mb-1">DOLLAR ACCOUNT</div>
                        <div>Bank: <b>Sterling Bank PLC</b></div>
                        <div>Account: <b>0076248833 ($)</b></div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="font-bold text-[#002866] text-center mb-1">JP MORGAN CHASE (USD)</div>
                        <div>Account: <b>662023830</b></div>
                        <div>Branch: Ramsey Branch - 948</div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">To make your contribution to this project, select from the payment options shown above</p>
                  )}
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
                    <input 
                      type="text" 
                      className="w-full border-b border-gray-200 p-2 focus:outline-none focus:border-[#ff9f22]" 
                      placeholder="First Name" 
                      required
                      value={formData.fname}
                      onChange={(e) => setFormData({...formData, fname: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Last Name *</label>
                    <input 
                      type="text" 
                      className="w-full border-b border-gray-200 p-2 focus:outline-none focus:border-[#ff9f22]" 
                      placeholder="Last Name" 
                      required
                      value={formData.lname}
                      onChange={(e) => setFormData({...formData, lname: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Email *</label>
                  <input 
                    type="email" 
                    className="w-full border-b border-gray-200 p-2 focus:outline-none focus:border-[#ff9f22]" 
                    placeholder="Email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Phone *</label>
                  <input 
                    type="tel" 
                    className="w-full border-b border-gray-200 p-2 focus:outline-none focus:border-[#ff9f22]" 
                    placeholder="Phone" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Country *</label>
                  <select 
                    className="w-full border-b border-gray-200 p-2 focus:outline-none focus:border-[#ff9f22] bg-white"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  >
                    <option value="">Select Country...</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="South Africa">South Africa</option>
                  </select>
                </div>
                
                <button type="submit" className="w-full bg-[#002866] text-white py-5 font-black uppercase tracking-widest text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all shadow-xl mt-8">
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

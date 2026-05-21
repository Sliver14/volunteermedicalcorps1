"use client";

import { motion } from "framer-motion";
import { 
  FaHandsHelping, 
  FaHeart, 
  FaGlobe, 
  FaClock, 
  FaCheckCircle,
  FaArrowRight
} from "react-icons/fa";
import Image from "next/image";

export default function CampaignsPage() {
  const campaigns = [
    {
      id: "c1",
      title: "1 Million Smiles Campaign",
      tagline: "Spreading hope through pediatric care.",
      category: "Humanitarian",
      status: "Active",
      image: "https://volunteermedicalcorps.org/VMC%20LOGOS/1MILLION%20SMILE.png",
      progress: 65,
      goal: "1,000,000 Children",
      reached: "650,000"
    },
    {
      id: "c2",
      title: "Global Hospital Outreach Campaign",
      tagline: "Strengthening healthcare systems globally.",
      category: "Medical",
      status: "Upcoming",
      image: "https://volunteermedicalcorps.org/VMC%20LOGOS/global_hospital_outreach_campaign.png",
      progress: 0,
      goal: "500 Hospitals",
      reached: "0"
    },
    {
      id: "c3",
      title: "Good Deeds Fiesta",
      tagline: "Celebrating impactful volunteerism.",
      category: "Community",
      status: "Active",
      image: "https://volunteermedicalcorps.org/VMC%20LOGOS/good_deeds_fiesta.png",
      progress: 80,
      goal: "10,000 Acts",
      reached: "8,000"
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">Active Campaigns</h2>
          <p className="text-slate-500">Explore and support our ongoing global initiatives.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all group flex flex-col"
          >
            <div className="relative h-48 bg-slate-50 flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-100 opacity-50"></div>
              <Image 
                src={campaign.image} 
                alt={campaign.title} 
                width={160} 
                height={160} 
                className="object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute top-4 right-4">
                <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm
                  ${campaign.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                  {campaign.status}
                </span>
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-6">
                <span className="text-[10px] font-black text-[#ff9f22] uppercase tracking-[0.2em] mb-2 block">{campaign.category}</span>
                <h3 className="text-xl font-bold text-[#002866] leading-tight mb-2 group-hover:text-[#ff9f22] transition-colors">{campaign.title}</h3>
                <p className="text-sm text-slate-500">{campaign.tagline}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end text-sm">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Impact Progress</span>
                  <span className="text-[#002866] font-black">{campaign.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${campaign.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-[#002866] to-[#ff9f22]"
                  />
                </div>
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-400">Reached: <span className="text-slate-700">{campaign.reached}</span></span>
                  <span className="text-slate-400">Goal: <span className="text-slate-700">{campaign.goal}</span></span>
                </div>
              </div>

              <button className="mt-auto w-full py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[#002866] text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#002866] hover:text-white hover:border-[#002866] transition-all">
                Learn More <FaArrowRight />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { 
  FaSmile, 
  FaHandHoldingHeart, 
  FaUsers, 
  FaHeartbeat,
  FaArrowRight
} from "react-icons/fa";
import Image from "next/image";

export default function GoodDeedCampaignsPage() {
  const campaigns = [
    {
      id: "gdc1",
      title: "Good Deeds Fiesta",
      description: "A global celebration of kindness and impactful service to humanity.",
      status: "Active",
      image: "https://volunteermedicalcorps.org/VMC%20LOGOS/good_deeds_fiesta.png",
      tagline: "Spreading Smiles Globally"
    },
    {
      id: "gdc2",
      title: "Light of Hope",
      description: "Bringing illumination and joy to displaced and vulnerable populations.",
      status: "Active",
      image: "https://volunteermedicalcorps.org/VMC%20LOGOS/light_of_hope.png",
      tagline: "Be the Light"
    },
    {
      id: "gdc3",
      title: "1 Million Smiles",
      description: "A pediatric care initiative aimed at reaching 1 million children with essential care.",
      status: "Ongoing",
      image: "https://volunteermedicalcorps.org/VMC%20LOGOS/1MILLION%20SMILE.png",
      tagline: "Every Smile Counts"
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">Good Deed Campaigns</h2>
          <p className="text-slate-500">Global initiatives promoting kindness and selfless service.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all flex flex-col"
          >
            <div className="relative h-64 bg-slate-50 flex items-center justify-center p-12 overflow-hidden">
              <Image 
                src={campaign.image} 
                alt={campaign.title} 
                width={200} 
                height={200} 
                className="object-contain relative z-10 transition-transform duration-700 hover:scale-110"
                unoptimized
              />
              <div className="absolute top-6 right-6">
                <span className="bg-[#ff9f22] text-[#002866] text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                  {campaign.status}
                </span>
              </div>
            </div>

            <div className="p-10 flex-1 flex flex-col text-center items-center">
              <span className="text-[10px] font-black text-[#ff9f22] uppercase tracking-[0.3em] mb-4">{campaign.tagline}</span>
              <h3 className="text-2xl font-black text-[#002866] leading-tight mb-4">{campaign.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">{campaign.description}</p>
              
              <button className="mt-auto w-full py-4 bg-[#002866] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#ff9f22] hover:text-[#002866] transition-all">
                Participate Now <FaArrowRight />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

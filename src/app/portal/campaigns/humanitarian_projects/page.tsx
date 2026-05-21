"use client";

import { motion } from "framer-motion";
import { 
  FaGlobeAfrica, 
  FaHandHoldingHeart, 
  FaWater, 
  FaHome,
  FaArrowRight
} from "react-icons/fa";
import Image from "next/image";

export default function HumanitarianProjectsPage() {
  const projects = [
    {
      id: "hp1",
      title: "Clean Water Initiative",
      description: "Installation of solar-powered boreholes in water-scarce rural communities.",
      status: "Active",
      image: "https://volunteermedicalcorps.org/VMC%20LOGOS/Layer%203.png",
      impact: "12 Boreholes Planned",
      stats: "8 Completed"
    },
    {
      id: "hp2",
      title: "Relief Missions",
      description: "Emergency aid and relief materials for communities affected by natural disasters.",
      status: "Active",
      image: "https://volunteermedicalcorps.org/VMC%20LOGOS/relief%20mission%20copy%204.png",
      impact: "10,000 Families",
      stats: "4,200 Assisted"
    },
    {
      id: "hp3",
      title: "Education Support Program",
      description: "Providing school supplies and scholarships to indigent children.",
      status: "Upcoming",
      image: "https://volunteermedicalcorps.org/VMC%20LOGOS/1MILLION%20SMILE.png",
      impact: "5,000 Students",
      stats: "Phase 1 Starts Soon"
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">Humanitarian Projects</h2>
          <p className="text-slate-500">Relief missions and community development projects.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all p-8 flex flex-col sm:flex-row gap-8"
          >
            <div className="w-full sm:w-40 h-40 bg-slate-50 rounded-3xl flex items-center justify-center p-6 shrink-0 border border-slate-50">
              <Image 
                src={project.image} 
                alt={project.title} 
                width={120} 
                height={120} 
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="flex-1 flex flex-col">
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#002866] leading-tight">{project.title}</h3>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest
                    ${project.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{project.description}</p>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Summary</p>
                  <p className="text-sm font-bold text-[#ff9f22]">{project.stats}</p>
                </div>
                <button className="text-[#002866] hover:text-[#ff9f22] transition-colors">
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

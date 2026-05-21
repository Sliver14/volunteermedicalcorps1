"use client";

import { motion } from "framer-motion";
import { 
  FaStethoscope, 
  FaHospital, 
  FaUserMd, 
  FaPlusCircle,
  FaArrowRight
} from "react-icons/fa";
import Image from "next/image";

export default function MedicalProjectsPage() {
  const projects = [
    {
      id: "mp1",
      title: "Global Hospital Outreach Campaign (GHOC)",
      description: "Providing essential medical supplies and specialist care to hospitals in underserved regions.",
      status: "In Progress",
      image: "https://volunteermedicalcorps.org/VMC%20LOGOS/global_hospital_outreach_campaign.png",
      impact: "250 Hospitals Targeted",
      stats: "115 Reached"
    },
    {
      id: "mp2",
      title: "Free Surgical Outreach",
      description: "Corrective surgeries for children and adults with congenital or acquired conditions.",
      status: "Active",
      image: "https://volunteermedicalcorps.org/VMC%20LOGOS/free%20surgery%20copy.png",
      impact: "500 Surgeries Goal",
      stats: "320 Completed"
    },
    {
      id: "mp3",
      title: "Pediatric Care Program",
      description: "Specialized healthcare interventions for children under the age of 5.",
      status: "Active",
      image: "https://volunteermedicalcorps.org/VMC%20LOGOS/pediatric_care_program.png",
      impact: "50,000 Children",
      stats: "28,500 Reached"
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">Medical Projects</h2>
          <p className="text-slate-500">Specialized healthcare interventions and hospital support initiatives.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
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
                  <span className="bg-green-50 text-green-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{project.description}</p>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact Stats</p>
                  <p className="text-sm font-bold text-[#ff9f22]">{project.stats} <span className="text-slate-300">/</span> {project.impact}</p>
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

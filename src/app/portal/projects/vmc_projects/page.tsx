"use client";

import { motion } from "framer-motion";
import { 
  FaBuilding, 
  FaHospital, 
  FaTruck, 
  FaUsers,
  FaCheckCircle,
  FaArrowRight
} from "react-icons/fa";

export default function VmcProjectsPage() {
  const vmcProjects = [
    {
      id: "vp1",
      title: "Regional Trauma Center",
      location: "Abuja, Nigeria",
      category: "Infrastructure",
      status: "In Progress",
      progress: 65,
      description: "Construction of a specialized 50-bed trauma center for emergency medical response.",
      teamSize: 45
    },
    {
      id: "vp2",
      title: "Mobile Dental Clinics",
      location: "East Africa Region",
      category: "Equipment",
      status: "Operational",
      progress: 100,
      description: "Fleet of 5 customized vans providing dental care to remote villages.",
      teamSize: 12
    },
    {
      id: "vp3",
      title: "Telemedicine Network",
      location: "Global",
      category: "Technology",
      status: "Expansion",
      progress: 80,
      description: "Connecting local clinics with international medical specialists via high-speed satellite links.",
      teamSize: 28
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">VMC Projects</h2>
          <p className="text-slate-500">Infrastructure and large-scale development initiatives.</p>
        </div>
      </div>

      <div className="space-y-6">
        {vmcProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all p-8 flex flex-col md:flex-row gap-10 items-center"
          >
            <div className="w-24 h-24 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
              {project.category === "Infrastructure" && <FaBuilding size={32} className="text-[#002866]" />}
              {project.category === "Equipment" && <FaTruck size={32} className="text-[#ff9f22]" />}
              {project.category === "Technology" && <FaHospital size={32} className="text-blue-500" />}
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-[#002866]">{project.title}</h3>
                  <span className="bg-slate-50 text-slate-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-slate-100">
                    {project.location}
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">{project.description}</p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-8">
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Status</p>
                  <p className={`text-xs font-black uppercase ${project.status === 'Operational' ? 'text-green-500' : 'text-[#ff9f22]'}`}>
                    {project.status}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Team Size</p>
                  <p className="text-xs font-black text-[#002866] flex items-center gap-2">
                    <FaUsers /> {project.teamSize} Members
                  </p>
                </div>
                <div className="flex-1 max-w-[200px] min-w-[150px]">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-300 uppercase mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ff9f22]" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <button className="bg-slate-50 hover:bg-[#002866] text-[#002866] hover:text-white w-14 h-14 rounded-2xl flex items-center justify-center transition-all">
              <FaArrowRight />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { 
  FaBookOpen, 
  FaStethoscope, 
  FaHandHoldingHeart, 
  FaTools, 
  FaCheckCircle,
  FaExternalLinkAlt
} from "react-icons/fa";

export default function ProjectsPage() {
  const projects = [
    {
      id: "p1",
      title: "VMC Medical Center - Lagos",
      category: "Medical Facility",
      status: "In Progress",
      description: "A state-of-the-art facility providing free medical care to underserved communities in the Lagos metropolis.",
      icon: FaStethoscope,
      progress: 75
    },
    {
      id: "p2",
      title: "Humanitarian Aid: Rural Water Project",
      category: "Humanitarian",
      status: "Completed",
      description: "Successfully installed 12 solar-powered boreholes across rural settlements in Northern Nigeria.",
      icon: FaHandHoldingHeart,
      progress: 100
    },
    {
      id: "p3",
      title: "Disaster Response Mobile Units",
      category: "Logistics",
      status: "Active",
      description: "Deployment of specialized mobile clinics for rapid response in disaster-stricken regions.",
      icon: FaTools,
      progress: 90
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">VMC Projects</h2>
          <p className="text-slate-500">Track our ongoing infrastructure and humanitarian developments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all p-8 flex gap-8"
          >
            <div className={`w-24 h-24 rounded-3xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group`}>
              <project.icon size={32} className="text-[#ff9f22] group-hover:scale-110 transition-transform" />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{project.category}</span>
                  <h3 className="text-xl font-bold text-[#002866] leading-tight">{project.title}</h3>
                </div>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest
                  ${project.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  {project.status}
                </span>
              </div>

              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Development Progress</span>
                  <span className="text-[#002866]">{project.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-[#ff9f22]"
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/150?u=${project.id}${i}`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#002866] flex items-center justify-center text-[8px] text-white font-bold">
                    +12
                  </div>
                </div>
                <button className="text-[#ff9f22] hover:text-[#002866] transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                  Project Details <FaExternalLinkAlt size={10} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

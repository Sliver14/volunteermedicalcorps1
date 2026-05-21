"use client";

import { motion } from "framer-motion";
import { 
  FaUserFriends, 
  FaTasks, 
  FaClock, 
  FaAward,
  FaCheckCircle,
  FaArrowRight
} from "react-icons/fa";

export default function MyProjectsPage() {
  const myProjects = [
    {
      id: "mp1",
      title: "Lagos Community Outreach",
      role: "Lead Medical Coordinator",
      status: "Active",
      contribution: "24 Hours",
      milestones: "4/6 Completed",
      nextTask: "Final Report Submission"
    },
    {
      id: "mp2",
      title: "First Aid Training Series",
      role: "Facilitator",
      status: "Completed",
      contribution: "15 Hours",
      milestones: "All Completed",
      nextTask: "N/A"
    },
    {
      id: "mp3",
      title: "Disaster Response Simulation",
      role: "Medical Responder",
      status: "Scheduled",
      contribution: "0 Hours",
      milestones: "0/3 Completed",
      nextTask: "Briefing Session (Oct 30)"
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">My Projects</h2>
          <p className="text-slate-500">Your personal involvement and contribution history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {myProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all p-8 group flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-[#ff9f22] group-hover:text-white transition-colors">
                <FaTasks size={24} />
              </div>
              <span className={`text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest
                ${project.status === 'Completed' ? 'bg-green-50 text-green-600' : 
                  project.status === 'Active' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400'}`}>
                {project.status}
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#002866] leading-tight mb-2">{project.title}</h3>
              <p className="text-xs font-bold text-[#ff9f22] uppercase tracking-widest">{project.role}</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Time Contributed</span>
                <span className="text-xs font-black text-[#002866] flex items-center gap-2">
                  <FaClock /> {project.contribution}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Milestones</span>
                <span className="text-xs font-black text-[#002866] flex items-center gap-2">
                  <FaCheckCircle /> {project.milestones}
                </span>
              </div>
            </div>

            <div className="mt-auto bg-slate-50 rounded-2xl p-4">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Next Task</p>
              <p className="text-xs font-bold text-slate-700 truncate">{project.nextTask}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

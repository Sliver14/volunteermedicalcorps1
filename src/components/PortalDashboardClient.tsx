"use client";

import { motion } from "framer-motion";
import { 
  FaArrowRight, 
  FaGraduationCap, 
  FaHandsHelping, 
  FaUsers,
  FaDollarSign,
  FaTasks,
  FaCheckCircle,
  FaHome
} from "react-icons/fa";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function PortalDashboardClient({ session, stats }: any) {
  const isMobile = useIsMobile();
  
  // Stats matching the provided HTML's logic
  const dashboardStats = [
    { label: "My Campaigns", value: "0", icon: FaUsers, gradient: "from-[#ff5e62] to-[#ff9966]" }, // Cherry
    { label: "Donations", value: "$0", icon: FaDollarSign, gradient: "from-[#4facfe] to-[#00f2fe]" }, // Blue
    { label: "Tasks Undertaken", value: "0", icon: FaTasks, gradient: "from-[#ff5e62] to-[#ff9966]" }, // Cherry
    { label: "Tasks Completed", value: "0", icon: FaCheckCircle, gradient: "from-[#ff5e62] to-[#ff9966]" }, // Cherry
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Breadcrumb Header matching the HTML structure */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h4 className="text-2xl font-black text-[#002866] mb-4">Dashboard</h4>
          <nav className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <Link href="/portal" className="text-[#002866] hover:text-[#ff9f22] transition-colors flex items-center gap-2">
              <FaHome size={14} /> Home
            </Link>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <span className="text-[#ff9f22]">Dashboard</span>
          </nav>
        </div>
        
        <Link 
          href="/elearn/dashboard" 
          className="group relative overflow-hidden bg-[#ff9f22] text-[#002866] px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-2xl shadow-orange-950/10 transition-all hover:bg-black hover:text-[#ff9f22]"
        >
          <FaGraduationCap className="text-xl group-hover:rotate-12 transition-transform" />
          Go to VMC Academy
        </Link>
      </div>

      {/* Stats Grid - Matching "card-statistic-3" style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {dashboardStats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`relative overflow-hidden bg-gradient-to-br ${stat.gradient} p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] text-white group`}
          >
            {/* Large Background Icon */}
            <div className="absolute right-[-10%] bottom-[-10%] opacity-15 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
              <stat.icon size={150} />
            </div>
            
            <div className="relative z-10">
              <h5 className="text-white/80 text-[10px] font-black uppercase tracking-[0.3em] mb-6">{stat.label}</h5>
              <div className="flex items-end justify-between mb-8">
                <h2 className="text-5xl font-black tracking-tight">{stat.value}</h2>
              </div>
              
              {/* Progress Bar matching the design */}
              <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + index * 0.1 }}
                  className="h-full bg-cyan-300/60 shadow-[0_0_15px_rgba(103,232,249,0.5)]"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 gap-10">
        {/* Most Recent Donations */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
            <h3 className="font-black text-2xl text-[#002866] tracking-tight">Most Recent Donations</h3>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <th className="px-10 py-6 border-b border-slate-50">Donor</th>
                  <th className="px-10 py-6 border-b border-slate-50">Project</th>
                  <th className="px-10 py-6 border-b border-slate-50">Location</th>
                  <th className="px-10 py-6 border-b border-slate-50">Amount</th>
                  <th className="px-10 py-6 border-b border-slate-50">Date</th>
                  <th className="px-10 py-6 border-b border-slate-50">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="px-10 py-32 text-center">
                    <div className="max-w-md mx-auto">
                      <div className="w-24 h-24 bg-slate-50 text-slate-200 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <FaDollarSign size={40} />
                      </div>
                      <h4 className="text-2xl font-black text-[#002866] uppercase tracking-tight mb-4">No Donations Available Yet!</h4>
                      <p className="text-slate-400 font-medium text-lg leading-relaxed">The platform is currently void of donations. Start inviting people to this noble opportunity.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tasks Directory */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
            <h3 className="font-black text-2xl text-[#002866] tracking-tight">Tasks Undertaken Directory</h3>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <th className="px-10 py-6 border-b border-slate-50">ID</th>
                  <th className="px-10 py-6 border-b border-slate-50">Title</th>
                  <th className="px-10 py-6 border-b border-slate-50">Details</th>
                  <th className="px-10 py-6 border-b border-slate-50">Date Started</th>
                  <th className="px-10 py-6 border-b border-slate-50">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="px-10 py-24 text-center">
                    <div className="flex flex-col items-center gap-6 opacity-30">
                      <FaHandsHelping size={60} className="text-slate-300" />
                      <span className="text-sm font-black uppercase tracking-widest text-slate-400">No active tasks recorded in directory</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

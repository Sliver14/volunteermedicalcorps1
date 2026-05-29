"use client";

import { motion } from "framer-motion";
import { 
  FaArrowRight, 
  FaGraduationCap, 
  FaHandsHelping, 
  FaUsers,
  FaDollarSign,
  FaHome,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useRouter } from "next/navigation";

const IconMap: any = {
// ...
};

export default function PortalDashboardClient({ 
  stats = [], 
  recentEnrollments = [], 
  recentDonations = [] 
}: any) {
  
  const isMobile = useIsMobile();
  const router = useRouter();
  
  // Use the dynamic stats from props
  const dashboardStats = stats.map((stat: any, index: number) => {
    const gradients = [
      "from-[#ff5e62] to-[#ff9966]", // Cherry
      "from-[#4facfe] to-[#00f2fe]", // Blue
      "from-[#667eea] to-[#764ba2]", // Purple
      "from-[#2af598] to-[#009efd]", // Green-Blue
    ];
    return {
      ...stat,
      Icon: IconMap[stat.icon] || FaHome,
      gradient: gradients[index % gradients.length]
    };
  });

  const formatDate = (date: string | Date) => {
    try {
      return new Date(date).toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (e) {
      return "N/A";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Breadcrumb Header matching the HTML structure */}
      <div className="bg-bg-surface p-8 rounded-3xl border border-border-main shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h4 className="text-2xl font-black text-brand-primary dark:text-brand-secondary mb-4">Dashboard</h4>
          <nav className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-text-muted">
            <Link href="/portal" className="text-brand-primary dark:text-brand-secondary hover:text-brand-secondary transition-colors flex items-center gap-2">
              <FaHome size={14} /> Home
            </Link>
            <div className="w-1.5 h-1.5 rounded-full bg-border-main" />
            <span className="text-brand-secondary">Dashboard</span>
          </nav>
        </div>
        
        <Link 
          href="/elearn/dashboard" 
          className="group relative overflow-hidden bg-brand-secondary text-brand-primary px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-2xl shadow-orange-950/10 transition-all hover:bg-brand-primary hover:text-brand-secondary"
        >
          <FaGraduationCap className="text-xl group-hover:rotate-12 transition-transform" />
          Go to VMC Academy
        </Link>
      </div>

      {/* Stats Grid - Matching "card-statistic-3" style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {dashboardStats.map((stat: any, index: number) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`relative overflow-hidden bg-gradient-to-br ${stat.gradient} p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] text-white group`}
          >
            {/* Large Background Icon */}
            <div className="absolute right-[-10%] bottom-[-10%] opacity-15 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
              <stat.Icon size={150} />
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
        <div className="bg-bg-surface rounded-[3rem] border border-border-main shadow-sm overflow-hidden">
          <div className="p-10 border-b border-border-main flex justify-between items-center bg-bg-base/20">
            <h3 className="font-black text-2xl text-brand-primary dark:text-brand-secondary tracking-tight">Most Recent Donations</h3>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-base/50 text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">
                  <th className="px-10 py-6 border-b border-border-main">Campaign</th>
                  <th className="px-10 py-6 border-b border-border-main">Amount</th>
                  <th className="px-10 py-6 border-b border-border-main">Currency</th>
                  <th className="px-10 py-6 border-b border-border-main">Date</th>
                  <th className="px-10 py-6 border-b border-border-main">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations && recentDonations.length > 0 ? (
                  recentDonations.map((donation: any) => (
                    <tr key={donation.id} className="hover:bg-bg-base/50 transition-colors">
                      <td className="px-10 py-6 border-b border-border-main font-bold text-text-main">
                        {donation.campaign?.title || "General Donation"}
                      </td>
                      <td className="px-10 py-6 border-b border-border-main font-black text-brand-secondary">
                        {donation.amount?.toLocaleString() || "0"}
                      </td>
                      <td className="px-10 py-6 border-b border-border-main text-text-muted font-bold">
                        {donation.currency || "USD"}
                      </td>
                      <td className="px-10 py-6 border-b border-border-main text-text-muted/60 font-medium">
                        {formatDate(donation.createdAt)}
                      </td>
                      <td className="px-10 py-6 border-b border-border-main">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          donation.status === 'Completed' ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'
                        }`}>
                          {donation.status || "Completed"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-10 py-24 text-center">
                      <div className="max-w-md mx-auto">
                        <div className="w-20 h-20 bg-bg-base text-text-muted/20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                          <FaDollarSign size={30} />
                        </div>
                        <h4 className="text-xl font-black text-text-main uppercase tracking-tight mb-2">No Donations Yet</h4>
                        <p className="text-text-muted font-medium text-sm">You haven't made any donations yet. Start supporting our missions today!</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tasks Directory */}
        <div className="bg-bg-surface rounded-[3rem] border border-border-main shadow-sm overflow-hidden">
          <div className="p-10 border-b border-border-main flex justify-between items-center bg-bg-base/20">
            <h3 className="font-black text-2xl text-brand-primary dark:text-brand-secondary tracking-tight">Recent Learning & Missions</h3>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-base/50 text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">
                  <th className="px-10 py-6 border-b border-border-main">Course / Task</th>
                  <th className="px-10 py-6 border-b border-border-main">Category</th>
                  <th className="px-10 py-6 border-b border-border-main">Progress</th>
                  <th className="px-10 py-6 border-b border-border-main">Enrolled At</th>
                  <th className="px-10 py-6 border-b border-border-main">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentEnrollments && recentEnrollments.length > 0 ? (
                  recentEnrollments.map((enrollment: any) => (
                    <tr 
                      key={enrollment.id} 
                      onClick={() => router.push(`/elearn/learn/${enrollment.course?.id}`)}
                      className="hover:bg-bg-base/50 transition-colors cursor-pointer group"
                    >
                      <td className="px-10 py-6 border-b border-border-main font-bold text-text-main group-hover:text-brand-primary transition-colors">
                        {enrollment.course?.title || "Untitled Course"}
                      </td>
                      <td className="px-10 py-6 border-b border-border-main text-text-muted font-bold">
                        {enrollment.course?.category?.name || "General"}
                      </td>
                      <td className="px-10 py-6 border-b border-border-main">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-border-main rounded-full overflow-hidden min-w-[60px]">
                            <div 
                              className="h-full bg-brand-secondary" 
                              style={{ width: `${enrollment.progress || 65}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-black text-brand-secondary">
                            {Math.round(enrollment.progress || 65)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-6 border-b border-border-main text-text-muted/60 font-medium">
                        {formatDate(enrollment.enrolledAt)}
                      </td>
                      <td className="px-10 py-6 border-b border-border-main">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          enrollment.isCompleted ? 'bg-green-500/10 text-green-600' : 'bg-brand-primary/10 text-brand-primary dark:text-brand-secondary'
                        }`}>
                          {enrollment.isCompleted ? 'Completed' : 'In Progress'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-10 py-24 text-center">
                      <div className="flex flex-col items-center gap-6 opacity-30">
                        <FaHandsHelping size={60} className="text-text-muted" />
                        <span className="text-sm font-black uppercase tracking-widest text-text-muted">No active missions or courses recorded</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
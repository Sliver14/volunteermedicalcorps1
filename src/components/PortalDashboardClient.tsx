"use client";

import { motion } from "framer-motion";
import { 
  FaArrowRight, 
  FaGraduationCap, 
  FaHandsHelping, 
} from "react-icons/fa";
import Link from "next/link";

import { useIsMobile } from "@/hooks/useIsMobile";

export default function PortalDashboardClient({ session, stats }: any) {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-8 bg-bg-base transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-brand-primary dark:text-brand-secondary uppercase tracking-tight">Portal Dashboard</h2>
          <p className="text-text-muted text-sm font-medium">Manage your volunteer profile and medical missions.</p>
        </div>
        <Link 
          href="/elearn" 
          className="group relative overflow-hidden bg-brand-secondary text-brand-primary px-8 py-4 font-bold uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl transition-all"
        >
          <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
          <span className="relative z-10 flex items-center gap-3">
            <FaGraduationCap className="text-lg" />
            Go to VMC Academy
          </span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat: any, index: number) => (
          <motion.div 
            key={index}
            initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-bg-surface p-6 shadow-sm border border-border-main"
          >
            <div className={`w-12 h-12 ${stat.bg} flex items-center justify-center mb-4`}>
              <stat.icon className={`text-xl ${stat.color}`} />
            </div>
            <p className="text-text-muted text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-bold text-text-main mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Missions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-brand-primary dark:text-brand-secondary flex items-center">
              <FaHandsHelping className="mr-2 text-brand-secondary" />
              Active Missions
            </h3>
            <Link href="/portal/missions" className="text-sm font-bold text-brand-secondary hover:underline flex items-center transition-all">
              View All <FaArrowRight className="ml-1 text-xs" />
            </Link>
          </div>

          <div className="bg-bg-surface border border-border-main p-8 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-bg-base flex items-center justify-center mx-auto text-text-muted/30">
              <FaHandsHelping size={32} />
            </div>
            <h4 className="font-bold text-text-main">No active missions currently</h4>
            <p className="text-sm text-text-muted max-w-xs mx-auto">Explore upcoming campaigns and join a team to start making an impact.</p>
            <Link href="/campaigns" className="group relative overflow-hidden inline-block bg-brand-primary text-white px-8 py-3 font-bold text-sm uppercase tracking-wider transition-all shadow-md">
              <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              <span className="relative z-10 group-hover:text-brand-primary transition-colors">Explore Campaigns</span>
            </Link>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-8">
          {/* Credits Card */}
          <div className="bg-brand-primary p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 group-hover:scale-150 transition-transform duration-400"></div>
            <h3 className="text-lg font-bold mb-2">VMC Credits</h3>
            <p className="text-white/70 text-xs mb-6 leading-relaxed">
              Use your volunteer credits to unlock advanced medical certifications.
            </p>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-4xl font-bold">0</span>
              <span className="text-xs text-brand-secondary font-bold mb-1 uppercase tracking-widest">Available</span>
            </div>
            <button className="group relative overflow-hidden w-full bg-brand-secondary text-brand-primary py-3 font-bold text-sm uppercase tracking-widest transition-all">
              <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              <span className="relative z-10">Go to Store</span>
            </button>
          </div>

          {/* Upcoming Mission */}
          <div className="bg-bg-surface p-6 border border-border-main shadow-sm">
            <h3 className="text-text-main font-bold mb-4 uppercase text-xs tracking-widest opacity-70">Upcoming Mission</h3>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-900/10 flex flex-col items-center justify-center shrink-0 border border-red-100 dark:border-red-900/20">
                <span className="text-[10px] font-bold text-red-400 uppercase leading-none">JUN</span>
                <span className="text-lg font-bold text-red-600 leading-none">23</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-main leading-tight">Global Hospital Outreach</h4>
                <p className="text-xs text-text-muted mt-1">Lagos, Nigeria</p>
              </div>
            </div>
            <button className="group relative overflow-hidden w-full mt-6 border border-border-main text-text-muted py-2.5 text-xs font-bold uppercase tracking-widest transition-all">
              <span className="absolute inset-0 bg-brand-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              <span className="relative z-10 group-hover:text-white transition-colors">View Mission Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { 
  FaArrowRight, 
  FaGraduationCap, 
  FaHandsHelping, 
  FaCheckCircle,
  FaClock,
  FaPlayCircle
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function PortalDashboard() {
  const stats = [
    { label: "Missions Completed", value: "8", icon: FaCheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Hours Volunteered", value: "120", icon: FaClock, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending Missions", value: "2", icon: FaHandsHelping, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Credits Earned", value: "1,250", icon: FaCheckCircle, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">Portal Dashboard</h2>
          <p className="text-slate-500">Manage your volunteer profile and medical missions.</p>
        </div>
        <Link 
          href="/elearn" 
          className="bg-[#ff9f22] text-[#002866] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl shadow-orange-500/10 hover:scale-105 transition-all"
        >
          <FaGraduationCap className="text-lg" />
          Go to VMC Academy
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
          >
            <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`text-xl ${stat.color}`} />
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Missions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#002866] flex items-center">
              <FaHandsHelping className="mr-2 text-[#ff9f22]" />
              Active Missions
            </h3>
            <Link href="/portal/missions" className="text-sm font-bold text-[#ff9f22] hover:underline flex items-center">
              View All <FaArrowRight className="ml-1 text-xs" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <FaHandsHelping size={32} />
            </div>
            <h4 className="font-bold text-slate-800">No active missions currently</h4>
            <p className="text-sm text-slate-400 max-w-xs mx-auto">Explore upcoming campaigns and join a team to start making an impact.</p>
            <Link href="/campaigns" className="inline-block bg-[#002866] text-white px-8 py-3 rounded-xl font-bold text-sm">
              Explore Campaigns
            </Link>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-8">
          {/* Credits Card */}
          <div className="bg-gradient-to-br from-[#002866] to-[#001f52] rounded-2xl p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-lg font-bold mb-2">VMC Credits</h3>
            <p className="text-white/70 text-xs mb-6 leading-relaxed">
              Use your volunteer credits to unlock advanced medical certifications.
            </p>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-4xl font-black">1,250</span>
              <span className="text-xs text-amber-400 font-bold mb-1 uppercase tracking-widest">Available</span>
            </div>
            <button className="w-full bg-[#ff9f22] text-[#002866] py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-amber-500/20 transition-all">
              Go to Store
            </button>
          </div>

          {/* Upcoming Mission */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-slate-800 font-bold mb-4">Upcoming Mission</h3>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex flex-col items-center justify-center shrink-0 border border-red-100">
                <span className="text-[10px] font-bold text-red-400 uppercase leading-none">May</span>
                <span className="text-lg font-black text-red-600 leading-none">15</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 leading-tight">Global Hospital Outreach</h4>
                <p className="text-xs text-slate-400 mt-1">Lagos, Nigeria</p>
              </div>
            </div>
            <button className="w-full mt-6 border border-slate-200 text-slate-600 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all">
              View Mission Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

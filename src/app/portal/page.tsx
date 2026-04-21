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
    { label: "Courses Completed", value: "12", icon: FaGraduationCap, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Missions Joined", value: "8", icon: FaHandsHelping, color: "text-green-600", bg: "bg-green-50" },
    { label: "Pending Tasks", value: "3", icon: FaClock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Credits Earned", value: "1,250", icon: FaCheckCircle, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const ongoingCourses = [
    { title: "Introduction to Disaster Response", progress: 65, category: "Basic Training", image: "/give-15-768x512.jpg" },
    { title: "Advanced Medical Outreach Ethics", progress: 30, category: "Ethics", image: "/give-17-300x200.jpg" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">Overview</h2>
        <p className="text-slate-500">Track your progress and upcoming medical missions.</p>
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
        {/* Ongoing Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#002866] flex items-center">
              <FaPlayCircle className="mr-2 text-[#ff9f22]" />
              Continue Learning
            </h3>
            <Link href="/portal/my-learning" className="text-sm font-bold text-[#ff9f22] hover:underline flex items-center">
              View All <FaArrowRight className="ml-1 text-xs" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ongoingCourses.map((course, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group">
                <div className="relative h-32">
                  <Image src={course.image} alt={course.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                    {course.category}
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-slate-800 leading-snug mb-4 h-10 line-clamp-2">{course.title}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-400 uppercase">Progress</span>
                      <span className="text-[#002866]">{course.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#002866] to-[#ff9f22] rounded-full transition-all duration-500" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="w-full mt-6 bg-[#002866] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#ff9f22] hover:text-[#002866] transition-all">
                    Resume Lesson
                  </button>
                </div>
              </div>
            ))}
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

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FaSearch, 
  FaFilter, 
  FaClock, 
  FaStar, 
  FaLock, 
  FaUnlock,
  FaPlayCircle,
  FaGraduationCap
} from "react-icons/fa";
import Image from "next/image";

export default function AcademyCatalog() {
  const [activeTab, setActiveTab] = useState("all");

  const courses = [
    {
      id: 1,
      title: "VMC Induction Course",
      description: "A comprehensive introduction to the Volunteer Medical Corps mission and values.",
      thumbnail: "https://volunteermedicalcorps.org/admin/images/media/onrZbfR8N463291785.jpg",
      duration: "2h 30m",
      level: "Beginner",
      credits: 0,
      category: "Foundational",
      isLocked: false,
    },
    {
      id: 2,
      title: "Basic First Aid & Life Support",
      description: "Essential skills for emergency medical response in various humanitarian settings.",
      thumbnail: "https://volunteermedicalcorps.org/admin/images/gallery/798453-1.jpg",
      duration: "5h 45m",
      level: "Intermediate",
      credits: 0,
      category: "Medical",
      isLocked: false,
    },
    {
      id: 3,
      title: "Advanced Disaster Response Management",
      description: "Strategic planning and execution of medical aid during large-scale disasters.",
      thumbnail: "https://volunteermedicalcorps.org/admin/images/gallery/591783-2.jpg",
      duration: "12h 20m",
      level: "Advanced",
      credits: 500,
      category: "Specialized",
      isLocked: true,
    },
    {
      id: 4,
      title: "Humanitarian Ethics & Fieldwork",
      description: "Understanding the ethical frameworks and protocols for international relief work.",
      thumbnail: "https://volunteermedicalcorps.org/admin/images/gallery/173895-bronx3.jpg",
      duration: "4h 15m",
      level: "Intermediate",
      credits: 200,
      category: "Ethics",
      isLocked: true,
    }
  ];

  const filteredCourses = activeTab === "all" 
    ? courses 
    : courses.filter(c => c.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">VMC Academy</h2>
          <p className="text-slate-500">Master new skills and earn specialized certifications.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#002866]/10 focus:border-[#002866] w-full md:w-64 transition-all"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-[#002866] hover:bg-slate-50 transition-all">
            <FaFilter />
          </button>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-xl shadow-blue-900/10">
        <Image src="https://volunteermedicalcorps.org/admin/images/gallery/429831-3a.jpg" alt="Featured Course" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002866]/90 via-[#002866]/60 to-transparent flex items-center">
          <div className="px-8 md:px-12 max-w-lg">
            <span className="bg-[#ff9f22] text-[#002866] text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest mb-4 inline-block">Featured track</span>
            <h3 className="text-2xl md:text-4xl font-poppins font-bold text-white mb-4 leading-tight">Emergency Medical Response Certification</h3>
            <p className="text-white/80 text-sm md:text-base mb-6 line-clamp-2">Equip yourself with the global standards for rapid medical aid and disaster intervention.</p>
            <button className="bg-white text-[#002866] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#ff9f22] transition-all flex items-center">
              Explore Track <FaPlayCircle className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {["All", "Foundational", "Medical", "Specialized", "Ethics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all
              ${activeTab === tab.toLowerCase() 
                ? "bg-[#002866] text-white shadow-lg shadow-blue-900/20" 
                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col"
          >
            <div className="relative h-48">
              <Image src={course.thumbnail} alt={course.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/90 backdrop-blur text-[#002866] text-[10px] font-bold px-2 py-1 rounded uppercase">
                  {course.category}
                </span>
              </div>

              {course.isLocked && (
                <div className="absolute inset-0 backdrop-blur-[2px] bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white p-4 rounded-full shadow-2xl">
                    <FaLock className="text-[#ff9f22] text-xl" />
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-4 right-4">
                {course.credits > 0 ? (
                  <div className="bg-[#ff9f22] text-[#002866] px-3 py-1 rounded-full text-xs font-black shadow-lg flex items-center">
                    <FaUnlock className="mr-1.5 text-[10px]" /> {course.credits} Credits
                  </div>
                ) : (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg">
                    FREE
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                <span className="flex items-center"><FaClock className="mr-1" /> {course.duration}</span>
                <span className="flex items-center"><FaGraduationCap className="mr-1" /> {course.level}</span>
              </div>
              
              <h3 className="text-lg font-bold text-[#002866] mb-2 group-hover:text-[#ff9f22] transition-colors leading-snug">
                {course.title}
              </h3>
              
              <p className="text-slate-500 text-sm line-clamp-2 mb-6">
                {course.description}
              </p>

              <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400 overflow-hidden">
                      <FaStar size={10} />
                    </div>
                  ))}
                  <span className="pl-4 text-[10px] font-bold text-slate-400 uppercase">1.2k Students</span>
                </div>
                
                <Link 
                  href={course.id === 1 ? "/portal/academy/induction" : "#"}
                  className={`text-sm font-black uppercase tracking-wider flex items-center
                  ${course.isLocked ? "text-slate-400" : "text-[#002866] hover:text-[#ff9f22]"}`}>
                  {course.isLocked ? "Unlock Now" : "Start Learning"} <FaPlayCircle className="ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaPlayCircle, 
  FaCheckCircle, 
  FaAward, 
  FaClock, 
  FaBookOpen,
  FaDownload
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function MyLearningPage() {
  const [activeTab, setActiveTab] = useState("in-progress");

  const inProgressCourses = [
    {
      id: 1,
      title: "Introduction to Disaster Response",
      progress: 65,
      totalLessons: 12,
      completedLessons: 8,
      lastAccessed: "2 days ago",
      image: "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg",
      category: "Basic Training",
      nextLesson: "Module 9: Field Triage Protocols"
    },
    {
      id: 2,
      title: "Advanced Medical Outreach Ethics",
      progress: 30,
      totalLessons: 10,
      completedLessons: 3,
      lastAccessed: "1 week ago",
      image: "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg",
      category: "Ethics",
      nextLesson: "Module 4: Cultural Sensitivity"
    }
  ];

  const completedCourses = [
    {
      id: 3,
      title: "VMC Induction Course",
      completionDate: "Oct 24, 2026",
      score: "95%",
      image: "https://volunteermedicalcorps.org/admin/images/gallery/173895-bronx3.jpg",
      category: "Foundational"
    },
    {
      id: 4,
      title: "Basic First Aid & Life Support",
      completionDate: "Sep 12, 2026",
      score: "100%",
      image: "https://volunteermedicalcorps.org/admin/images/gallery/798453-1.jpg",
      category: "Medical"
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">My Learning</h2>
        <p className="text-slate-500">Track your active courses and download your earned certificates.</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <FaBookOpen size={20} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">In Progress</p>
            <h3 className="text-2xl font-black text-[#002866]">2</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
            <FaCheckCircle size={20} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Completed</p>
            <h3 className="text-2xl font-black text-[#002866]">12</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
            <FaAward size={20} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Certificates</p>
            <h3 className="text-2xl font-black text-[#002866]">12</h3>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveTab("in-progress")}
          className={`px-6 py-3 text-sm font-bold tracking-wide transition-all border-b-2
            ${activeTab === "in-progress" 
              ? "border-[#ff9f22] text-[#002866]" 
              : "border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300"
            }`}
        >
          In Progress ({inProgressCourses.length})
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-6 py-3 text-sm font-bold tracking-wide transition-all border-b-2
            ${activeTab === "completed" 
              ? "border-[#ff9f22] text-[#002866]" 
              : "border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300"
            }`}
        >
          Completed ({completedCourses.length})
        </button>
      </div>

      {/* Course List */}
      <div className="space-y-6">
        {activeTab === "in-progress" && inProgressCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row group hover:shadow-xl transition-shadow"
          >
            <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0">
              <Image src={course.image} alt={course.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#002866] text-[10px] font-bold px-2 py-1 rounded uppercase">
                {course.category}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#002866] mb-2">{course.title}</h3>
                <p className="text-sm text-slate-500 font-medium mb-4 flex items-center">
                  <FaClock className="mr-2 text-slate-400" /> Last accessed: {course.lastAccessed}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-500 uppercase tracking-wider">Overall Progress</span>
                    <span className="text-[#002866]">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#002866] to-[#ff9f22] rounded-full transition-all duration-1000 relative" 
                      style={{ width: `${course.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 text-right">
                    {course.completedLessons} of {course.totalLessons} lessons completed
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-slate-50 mt-4 gap-4">
                <div className="text-sm">
                  <span className="text-slate-400 block text-xs font-bold uppercase mb-0.5">Up Next</span>
                  <span className="font-medium text-slate-700">{course.nextLesson}</span>
                </div>
                <Link 
                  href="/portal/academy/induction" 
                  className="bg-[#002866] text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center hover:bg-[#ff9f22] hover:text-[#002866] transition-all whitespace-nowrap"
                >
                  Resume <FaPlayCircle className="ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}

        {activeTab === "completed" && completedCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row group hover:shadow-xl transition-shadow"
          >
             <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0">
              <Image src={course.image} alt={course.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:grayscale transition-all duration-500" />
              <div className="absolute inset-0 bg-[#002866]/10 mix-blend-multiply"></div>
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#002866] text-[10px] font-bold px-2 py-1 rounded uppercase">
                {course.category}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-2xl">
                  <FaCheckCircle className="text-green-500 text-2xl" />
                </div>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#002866] mb-4">{course.title}</h3>
                
                <div className="flex flex-wrap gap-6 mb-6">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Completed On</p>
                    <p className="font-bold text-slate-700">{course.completionDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Final Score</p>
                    <p className="font-bold text-green-600">{course.score}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-50 mt-4">
                <button className="flex-1 sm:flex-none bg-amber-50 text-amber-700 border border-amber-200 px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center hover:bg-amber-100 transition-colors">
                  <FaDownload className="mr-2" /> Download Certificate
                </button>
                <Link href="/portal/academy/induction" className="flex-1 sm:flex-none bg-white text-slate-600 border border-slate-200 px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center hover:bg-slate-50 transition-colors">
                  Review Material
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

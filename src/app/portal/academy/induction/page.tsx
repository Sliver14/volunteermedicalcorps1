"use client";

import { useState } from "react";
import { 
  FaPlay, 
  FaCheckCircle, 
  FaFilePdf, 
  FaChevronLeft, 
  FaShareAlt,
  FaAward,
  FaQuestionCircle
} from "react-icons/fa";
import Link from "next/link";

export default function CoursePlayerPage() {
  const [currentLesson, setCurrentLesson] = useState(0);

  const course = {
    title: "VMC Induction Course",
    instructor: "Dr. Olajumoke Akisanya",
    lessons: [
      { id: 1, title: "Welcome to VMC", duration: "10:24", isCompleted: true },
      { id: 2, title: "Our Core Values and Mission", duration: "15:45", isCompleted: false },
      { id: 3, title: "Volunteer Code of Conduct", duration: "12:10", isCompleted: false },
      { id: 4, title: "Reporting and Accountability", duration: "08:30", isCompleted: false },
      { id: 5, title: "Final Assessment", duration: "20:00", isCompleted: false },
    ],
    resources: [
      { name: "VMC Handbook 2024.pdf", size: "2.4 MB" },
      { name: "Code of Conduct.pdf", size: "1.1 MB" }
    ]
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Link href="/portal/academy" className="flex items-center text-sm font-bold text-[#002866] hover:text-[#ff9f22] transition-colors">
          <FaChevronLeft className="mr-2" /> Back to Academy
        </Link>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center hover:bg-slate-50">
            <FaShareAlt className="mr-2" /> Share
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center hover:bg-slate-50">
            <FaQuestionCircle className="mr-2" /> Support
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Player Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
            <video 
              src="/slider1.mp4" 
              className="w-full h-full object-cover"
              controls
              poster="/pmr-bg-slide.jpg"
            ></video>
            {/* Custom Overlay (Optional) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:bg-black/20 transition-all">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300">
                <FaPlay size={24} className="ml-1" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-[10px] font-black text-[#ff9f22] uppercase tracking-[0.2em] mb-2 block">Now Playing</span>
                <h1 className="text-2xl font-poppins font-bold text-[#002866]">{course.lessons[currentLesson].title}</h1>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Instructor</p>
                <p className="text-sm font-bold text-slate-700">{course.instructor}</p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed">
                In this module, we will explore the fundamental principles that guide the Volunteer Medical Corps. 
                Understanding our core values is essential for every member to ensure we provide consistent, 
                high-quality aid that aligns with our global mission.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-50">
              <h3 className="font-bold text-[#002866] mb-4 flex items-center">
                <FaFilePdf className="mr-2 text-red-500" /> Downloadable Resources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.resources.map((res, i) => (
                  <div key={i} className="p-4 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-[#002866] transition-colors mr-3">
                        <FaFilePdf size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">{res.name}</p>
                        <p className="text-[10px] text-slate-400">{res.size}</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-[#002866] hover:underline uppercase">Download</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course Playlist Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="font-bold text-[#002866]">Course Content</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">20% Completed</p>
              </div>
              <div className="w-10 h-10 rounded-full border-4 border-slate-100 border-t-[#ff9f22] flex items-center justify-center text-[10px] font-black text-[#002866]">
                1/5
              </div>
            </div>
            
            <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
              {course.lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => setCurrentLesson(index)}
                  className={`w-full flex items-center gap-4 p-5 text-left border-b border-slate-50 transition-all
                    ${currentLesson === index ? "bg-amber-50/50 border-l-4 border-l-[#ff9f22]" : "hover:bg-slate-50"}
                  `}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                    ${lesson.isCompleted ? "bg-green-50 text-green-500" : "bg-slate-100 text-slate-400"}
                  `}>
                    {lesson.isCompleted ? <FaCheckCircle size={14} /> : <span className="text-xs font-bold">{index + 1}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${currentLesson === index ? "text-[#002866]" : "text-slate-700"}`}>
                      {lesson.title}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">{lesson.duration}</p>
                  </div>
                  {currentLesson === index && (
                    <div className="w-2 h-2 rounded-full bg-[#ff9f22] animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="p-6">
              <button className="w-full bg-[#002866] text-white py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-3 hover:bg-[#ff9f22] hover:text-[#002866] transition-all shadow-xl shadow-blue-900/10">
                <FaAward /> Claim Certificate
              </button>
              <p className="text-[10px] text-center text-slate-400 font-bold uppercase mt-4 tracking-widest">Available after completion</p>
            </div>
          </div>

          {/* Instructor Card */}
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">About Instructor</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#002866] flex items-center justify-center text-white font-black text-xl shadow-lg">
                OA
              </div>
              <div>
                <p className="font-bold text-[#002866] leading-none">{course.instructor}</p>
                <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-wider">VMC Global Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

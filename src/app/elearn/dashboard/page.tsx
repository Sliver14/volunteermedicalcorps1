"use client";

import { motion } from "framer-motion";
import { 
  FaBook, 
  FaClock, 
  FaTrophy, 
  FaStar,
  FaPlay,
  FaSearch
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function ElearnDashboard() {
  const ongoingCourses = [
    { 
      title: "First Aid Basics", 
      progress: 85, 
      lessons: "12/14", 
      instructor: "Dr. Sarah Smith",
      image: "https://volunteermedicalcorps.org/admin/images/campaigns/Sn2yMRj85138725946.jpg" 
    },
    { 
      title: "Crisis Management", 
      progress: 40, 
      lessons: "4/10", 
      instructor: "John Doe",
      image: "https://volunteermedicalcorps.org/admin/images/campaigns/ajQwrT96F267394158.jpg" 
    },
  ];

  const recommendedCourses = [
    { title: "Ethics in Missions", level: "Beginner", rating: 4.8, students: "1.2k", price: "Free" },
    { title: "Trauma Care Level 1", level: "Intermediate", rating: 4.9, students: "800", price: "Free" },
    { title: "Community Health", level: "Beginner", rating: 4.7, students: "2.5k", price: "Free" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Search & Welcome */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-[#002866]">Welcome back, Volunteer!</h2>
          <p className="text-slate-500 font-medium">You have 2 courses in progress. Keep up the good work!</p>
        </div>
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for courses..." 
            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#ff9f22] outline-none shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Ongoing section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#002866] flex items-center gap-2">
                <FaClock className="text-[#ff9f22]" />
                Recently Accessed
              </h3>
              <Link href="/elearn/courses" className="text-sm font-bold text-[#002866] hover:underline">View My Courses</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ongoingCourses.map((course, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group"
                >
                  <div className="relative h-40">
                    <Image src={course.image} alt={course.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#002866]">
                        <FaPlay className="ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-slate-800 mb-1">{course.title}</h4>
                    <p className="text-xs text-slate-400 font-medium mb-4">{course.instructor}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-400">Progress: {course.lessons} Lessons</span>
                        <span className="text-[#002866]">{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#002866] rounded-full transition-all duration-1000" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Catalog Preview */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#002866] flex items-center gap-2">
                <FaBook className="text-[#ff9f22]" />
                Recommended for You
              </h3>
              <Link href="/elearn/courses" className="text-sm font-bold text-[#002866] hover:underline">Explore Catalog</Link>
            </div>
            
            <div className="space-y-4">
              {recommendedCourses.map((course, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#ff9f22] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-[#002866] rounded-xl flex items-center justify-center font-black">
                      {course.title[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{course.title}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{course.level}</span>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                          <FaStar /> {course.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold group-hover:bg-[#ff9f22] group-hover:text-[#002866] transition-all">
                    Enroll Now
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Stats Card */}
          <div className="bg-[#002866] rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <h3 className="text-lg font-bold mb-8 uppercase tracking-widest text-white/60 text-sm">Learning Stats</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#ff9f22]">
                  <FaTrophy />
                </div>
                <div>
                  <div className="text-2xl font-black">12</div>
                  <div className="text-xs font-bold text-white/50 uppercase">Certificates</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400">
                  <FaClock />
                </div>
                <div>
                  <div className="text-2xl font-black">45h</div>
                  <div className="text-xs font-bold text-white/50 uppercase">Learning Time</div>
                </div>
              </div>
            </div>

            <button className="w-full mt-10 bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl font-bold text-sm transition-all border border-white/10">
              Download Transcripts
            </button>
          </div>

          {/* Community Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h4 className="font-bold text-[#002866] mb-4">Instructor Support</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Have questions about your course? Our medical instructors are here to help you 24/7.
            </p>
            <button className="w-full bg-slate-50 text-[#002866] py-3 rounded-xl font-bold text-sm hover:bg-[#ff9f22] transition-all">
              Join Study Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

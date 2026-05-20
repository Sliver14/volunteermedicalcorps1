"use client";

import { motion } from "framer-motion";
import { 
  FaBook, 
  FaClock, 
  FaTrophy, 
  FaStar,
  FaPlay,
  FaSearch,
  FaUserCircle,
  FaHistory,
  FaQuestionCircle,
  FaSignOutAlt,
  FaLaptop,
  FaEllipsisV,
  FaCheckCircle,
  FaRegLightbulb
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function ElearnDashboardClient({ session, enrollments, recommendedCourses, stats }: any) {
  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1a1a1a] text-white hidden lg:flex flex-col">
        <div className="p-8">
            <Link href="/elearn" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-[#002866] rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:bg-[#ff9f22] transition-colors">V</div>
              <div>
                <h1 className="text-lg font-black text-white leading-none uppercase tracking-tighter">VMC Academy</h1>
              </div>
            </Link>
        </div>

        <nav className="flex-1 px-4 space-y-8">
          <div>
            <div className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Main Menu</div>
            <ul className="space-y-1">
              <li>
                <Link href="/elearn/dashboard" className="flex items-center gap-3 px-4 py-3 bg-[#002866] text-white rounded-xl font-bold text-sm transition-all">
                  <FaLaptop className="text-[#ff9f22]" /> Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">My Account</div>
            <ul className="space-y-1">
              <li>
                <Link href="/elearn/profile" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm transition-all">
                  <FaUserCircle /> Profile
                </Link>
              </li>
              <li>
                <Link href="/elearn/purchases" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm transition-all">
                  <FaHistory /> Order History
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">My Classes</div>
            <ul className="space-y-1">
              <li>
                <Link href="/elearn/courses" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm transition-all">
                  <FaBook /> All Courses
                </Link>
              </li>
              <li>
                <Link href="/elearn/my-courses" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm transition-all">
                  <FaBook /> My Courses
                </Link>
              </li>
              <li>
                <Link href="/elearn/discussions" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm transition-all">
                  <FaQuestionCircle /> Discussions
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="p-8 border-t border-white/5">
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 text-slate-400 hover:text-red-500 font-bold text-sm"
            >
                <FaSignOutAlt /> Logout
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Dashboard Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
            <div className="relative w-96 hidden md:block">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search courses..." 
                    className="w-full bg-slate-50 border-0 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#ff9f22] outline-none text-sm transition-all"
                />
            </div>
            
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 text-right">
                    <div className="hidden sm:block">
                        <p className="text-sm font-black text-[#002866] leading-none">{session.user.name}</p>
                        <p className="text-[10px] font-bold text-[#ff9f22] uppercase tracking-widest">Student</p>
                    </div>
                    <div className="w-10 h-10 bg-slate-100 rounded-full border-2 border-[#ff9f22] overflow-hidden">
                        <Image src={session.user.image || "https://volunteermedicalcorps.org/elearn/students/images/users/default-avatar.jpg"} alt="Avatar" width={40} height={40} className="object-cover" unoptimized />
                    </div>
                </div>
            </div>
        </div>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black text-[#002866]">Student Dashboard</h2>
                    <p className="text-slate-500 font-medium">Overview of your learning progress</p>
                </div>
                <div className="flex bg-white rounded-xl p-1 border border-slate-200">
                    <button className="px-6 py-2 bg-slate-100 text-[#002866] rounded-lg font-bold text-xs uppercase tracking-widest transition-all">Overview</button>
                    <button className="px-6 py-2 text-slate-400 hover:text-[#002866] font-bold text-xs uppercase tracking-widest transition-all">Activity</button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Total Courses</p>
                            <h3 className="text-3xl font-black text-[#002866]">{stats.totalCourses || 0}</h3>
                        </div>
                        <div className="w-12 h-12 bg-amber-50 text-[#ff9f22] rounded-2xl flex items-center justify-center text-xl">
                            <FaBook />
                        </div>
                    </div>
                    <div className="mt-6 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                        <div className="h-full bg-[#ff9f22] w-1/2 rounded-full"></div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">My Courses</p>
                            <h3 className="text-3xl font-black text-[#002866]">{enrollments.length}</h3>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 text-[#002866] rounded-2xl flex items-center justify-center text-xl">
                            <FaLaptop />
                        </div>
                    </div>
                    <div className="mt-6 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                        <div className="h-full bg-[#002866] w-1/3 rounded-full"></div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">My Quizzes</p>
                            <h3 className="text-3xl font-black text-[#002866]">0</h3>
                        </div>
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-xl">
                            <FaTrophy />
                        </div>
                    </div>
                    <div className="mt-6 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-1/4 rounded-full"></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* In Progress */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <div>
                            <h4 className="font-black text-[#002866]">In Progress</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your recent courses</p>
                        </div>
                        <Link href="/elearn/my-courses" className="bg-slate-50 text-[#002866] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#ff9f22] transition-all">
                            Browse All
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {enrollments.length > 0 ? enrollments.map((enr: any) => (
                            <div key={enr.id} className="p-6 flex items-center gap-4 group hover:bg-slate-50 transition-all">
                                <div className="w-16 h-16 rounded-xl overflow-hidden relative flex-shrink-0">
                                    <Image src={enr.course.image || "https://volunteermedicalcorps.org/elearn/instructors/images/courses/mXFMVbthS.jpg"} fill alt="Course" className="object-cover" unoptimized />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h5 className="font-bold text-slate-800 text-sm truncate">{enr.course.title}</h5>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#002866] rounded-full" style={{ width: `${enr.progress}%` }}></div>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase">{enr.progress}%</span>
                                    </div>
                                </div>
                                <Link href={`/elearn/courses/${enr.course.id}`} className="p-2 text-slate-300 hover:text-[#002866] transition-colors">
                                    <FaPlay size={14} />
                                </Link>
                            </div>
                        )) : (
                            <div className="p-12 text-center space-y-4">
                                <div className="w-16 h-16 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto text-3xl">
                                    <FaLaptop />
                                </div>
                                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">NO COURSE HAS BEEN UNDERTAKEN YET!</p>
                                <Link href="/elearn/courses" className="inline-block bg-[#002866] text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-[#ff9f22] transition-all">
                                    Start a Course
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* My Quizzes */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <div>
                            <h4 className="font-black text-[#002866]">My Quizzes</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Skill tests</p>
                        </div>
                        <Link href="/elearn/quizzes" className="bg-slate-50 text-[#002866] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#ff9f22] transition-all">
                            View All
                        </Link>
                    </div>
                    <div className="p-12 text-center space-y-4">
                        <div className="w-16 h-16 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto text-3xl">
                            <FaRegLightbulb />
                        </div>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">NO QUIZ HAS BEEN UNDERTAKEN YET!</p>
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">SKILLS ACQUISITION TESTS</p>
                    </div>
                </div>
            </div>

            {/* Recommended */}
            <section className="space-y-6">
                <h3 className="text-xl font-black text-[#002866] flex items-center gap-2">
                    <FaStar className="text-[#ff9f22]" /> Recommended for You
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recommendedCourses.map((course: any) => (
                        <div key={course.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-[#ff9f22] transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 text-[#002866] rounded-2xl flex items-center justify-center font-black">
                                    {course.title[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-800 text-sm truncate">{course.title}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{course.level || "Beginner"}</span>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                                            <FaStar /> 4.9
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link href={`/elearn/courses/${course.id}`} className="block text-center py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold group-hover:bg-[#ff9f22] group-hover:text-[#002866] transition-all">
                                Enroll Now
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}

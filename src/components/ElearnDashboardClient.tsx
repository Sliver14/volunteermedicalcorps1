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

import { useIsMobile } from "@/hooks/useIsMobile";

export default function ElearnDashboardClient({ session, enrollments, recommendedCourses, stats }: any) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-bg-base transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-72 bg-brand-primary text-white hidden lg:flex flex-col border-r border-white/5">
        <div className="p-8">
            <Link href="/elearn" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-brand-secondary flex items-center justify-center text-brand-primary font-bold text-xl group-hover:bg-white transition-colors">V</div>
              <div>
                <h1 className="text-lg font-bold text-white leading-none uppercase tracking-tighter">VMC Academy</h1>
              </div>
            </Link>
        </div>

        <nav className="flex-1 px-4 space-y-8">
          <div>
            <div className="px-4 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">Main Menu</div>
            <ul className="space-y-1">
              <li>
                <Link href="/elearn/dashboard" className="flex items-center gap-3 px-4 py-3 bg-brand-secondary text-brand-primary font-bold text-sm transition-all">
                  <FaLaptop /> Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="px-4 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">My Account</div>
            <ul className="space-y-1">
              <li>
                <Link href="/elearn/profile" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 font-bold text-sm transition-all">
                  <FaUserCircle /> Profile
                </Link>
              </li>
              <li>
                <Link href="/elearn/purchases" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 font-bold text-sm transition-all">
                  <FaHistory /> Order History
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="px-4 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">My Classes</div>
            <ul className="space-y-1">
              <li>
                <Link href="/elearn/courses" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 font-bold text-sm transition-all">
                  <FaBook /> All Courses
                </Link>
              </li>
              <li>
                <Link href="/elearn/my-courses" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 font-bold text-sm transition-all">
                  <FaBook /> My Courses
                </Link>
              </li>
              <li>
                <Link href="/elearn/discussions" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 font-bold text-sm transition-all">
                  <FaQuestionCircle /> Discussions
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="p-8 border-t border-white/5">
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 text-white/40 hover:text-brand-secondary font-bold text-sm transition-colors"
            >
                <FaSignOutAlt /> Logout
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Dashboard Header */}
        <div className="bg-bg-surface border-b border-border-main px-8 py-4 flex items-center justify-between sticky top-0 z-20 transition-colors">
            <div className="relative w-96 hidden md:block">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input 
                    type="text" 
                    placeholder="Search courses..." 
                    className="w-full bg-bg-base border border-border-main py-3 pl-12 pr-4 focus:ring-2 focus:ring-brand-secondary outline-none text-sm transition-all text-text-main"
                />
            </div>
            
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 text-right">
                    <div className="hidden sm:block">
                        <p className="text-sm font-bold text-brand-primary dark:text-brand-secondary leading-none">{session.user.name}</p>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Student</p>
                    </div>
                    <div className="w-10 h-10 bg-bg-base border-2 border-brand-secondary overflow-hidden">
                        <Image src={session.user.image || "https://volunteermedicalcorps.org/elearn/students/images/users/default-avatar.jpg"} alt="Avatar" width={40} height={40} className="object-cover" unoptimized />
                    </div>
                </div>
            </div>
        </div>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-brand-primary dark:text-text-main uppercase tracking-tight">Student Dashboard</h2>
                    <p className="text-text-muted font-medium text-sm">Overview of your learning progress</p>
                </div>
                <div className="flex bg-bg-surface p-1 border border-border-main">
                    <button className="px-6 py-2 bg-brand-primary text-white font-bold text-xs uppercase tracking-widest transition-all">Overview</button>
                    <button className="px-6 py-2 text-text-muted hover:text-brand-primary dark:hover:text-brand-secondary font-bold text-xs uppercase tracking-widest transition-all">Activity</button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-bg-surface p-8 border border-border-main shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest mb-2">Total Courses</p>
                            <h3 className="text-3xl font-bold text-text-main">{stats.totalCourses || 0}</h3>
                        </div>
                        <div className="w-12 h-12 bg-brand-secondary/10 text-brand-secondary flex items-center justify-center text-xl">
                            <FaBook />
                        </div>
                    </div>
                    <div className="mt-6 h-1 w-full bg-bg-base overflow-hidden">
                        <div className="h-full bg-brand-secondary w-1/2"></div>
                    </div>
                </div>

                <div className="bg-bg-surface p-8 border border-border-main shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest mb-2">My Courses</p>
                            <h3 className="text-3xl font-bold text-text-main">{enrollments.length}</h3>
                        </div>
                        <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary dark:text-brand-secondary flex items-center justify-center text-xl">
                            <FaLaptop />
                        </div>
                    </div>
                    <div className="mt-6 h-1 w-full bg-bg-base overflow-hidden">
                        <div className="h-full bg-brand-primary dark:bg-brand-secondary w-1/3"></div>
                    </div>
                </div>

                <div className="bg-bg-surface p-8 border border-border-main shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest mb-2">My Quizzes</p>
                            <h3 className="text-3xl font-bold text-text-main">0</h3>
                        </div>
                        <div className="w-12 h-12 bg-green-500/10 text-green-500 flex items-center justify-center text-xl">
                            <FaTrophy />
                        </div>
                    </div>
                    <div className="mt-6 h-1 w-full bg-bg-base overflow-hidden">
                        <div className="h-full bg-green-500 w-1/4"></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* In Progress */}
                <div className="bg-bg-surface border border-border-main shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border-main flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-brand-primary dark:text-brand-secondary uppercase text-sm">In Progress</h4>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Your recent courses</p>
                        </div>
                        <Link href="/elearn/my-courses" className="bg-bg-base text-brand-primary dark:text-brand-secondary px-4 py-2 text-xs font-bold hover:bg-brand-secondary hover:text-brand-primary transition-all uppercase tracking-widest">
                            Browse All
                        </Link>
                    </div>
                    <div className="divide-y divide-border-main">
                        {enrollments.length > 0 ? enrollments.map((enr: any) => (
                            <div key={enr.id} className="p-6 flex items-center gap-4 group hover:bg-bg-base transition-all">
                                <div className="w-16 h-16 overflow-hidden relative flex-shrink-0 border border-border-main">
                                    <Image src={enr.course.image || "https://volunteermedicalcorps.org/elearn/instructors/images/courses/mXFMVbthS.jpg"} fill alt="Course" className="object-cover" unoptimized />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h5 className="font-bold text-text-main text-sm truncate uppercase">{enr.course.title}</h5>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex-1 h-1.5 bg-bg-base overflow-hidden">
                                            <div className="h-full bg-brand-primary dark:bg-brand-secondary" style={{ width: `${enr.progress}%` }}></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-text-muted uppercase">{enr.progress}%</span>
                                    </div>
                                </div>
                                <Link href={`/elearn/courses/${enr.course.id}`} className="p-2 text-text-muted hover:text-brand-primary dark:hover:text-brand-secondary transition-colors">
                                    <FaPlay size={14} />
                                </Link>
                            </div>
                        )) : (
                            <div className="p-12 text-center space-y-4">
                                <div className="w-16 h-16 bg-bg-base text-text-muted/20 flex items-center justify-center mx-auto text-3xl">
                                    <FaLaptop />
                                </div>
                                <p className="text-text-muted text-xs font-bold uppercase tracking-widest">NO COURSE HAS BEEN UNDERTAKEN YET!</p>
                                <Link href="/elearn/courses" className="inline-block bg-brand-primary text-white px-6 py-2 font-bold text-xs uppercase tracking-widest hover:bg-brand-secondary transition-all">
                                    Start a Course
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* My Quizzes */}
                <div className="bg-bg-surface border border-border-main shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border-main flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-brand-primary dark:text-brand-secondary uppercase text-sm">My Quizzes</h4>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Skill tests</p>
                        </div>
                        <Link href="/elearn/quizzes" className="bg-bg-base text-brand-primary dark:text-brand-secondary px-4 py-2 text-xs font-bold hover:bg-brand-secondary hover:text-brand-primary transition-all uppercase tracking-widest">
                            View All
                        </Link>
                    </div>
                    <div className="p-12 text-center space-y-4">
                        <div className="w-16 h-16 bg-bg-base text-text-muted/20 flex items-center justify-center mx-auto text-3xl">
                            <FaRegLightbulb />
                        </div>
                        <p className="text-text-muted text-xs font-bold uppercase tracking-widest">NO QUIZ HAS BEEN UNDERTAKEN YET!</p>
                        <p className="text-[10px] font-bold text-text-muted/50 uppercase tracking-tight">SKILLS ACQUISITION TESTS</p>
                    </div>
                </div>
            </div>

            {/* Recommended */}
            <section className="space-y-6">
                <h3 className="text-lg font-bold text-brand-primary dark:text-brand-secondary flex items-center gap-2 uppercase tracking-tight">
                    <FaStar className="text-brand-secondary" /> Recommended for You
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recommendedCourses.map((course: any) => (
                        <div key={course.id} className="bg-bg-surface p-6 border border-border-main shadow-sm space-y-4 hover:border-brand-secondary transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-primary/5 text-brand-primary dark:text-brand-secondary flex items-center justify-center font-bold">
                                    {course.title[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-text-main text-sm truncate uppercase">{course.title}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{course.level || "Beginner"}</span>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                                            <FaStar /> 4.9
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link href={`/elearn/courses/${course.id}`} className="block text-center py-3 bg-bg-base text-text-muted font-bold text-xs uppercase tracking-widest group-hover:bg-brand-secondary group-hover:text-brand-primary transition-all">
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

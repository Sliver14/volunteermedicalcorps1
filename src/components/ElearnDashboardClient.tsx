"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  session: any;
  stats: { totalCourses: number; myCourses: number; myQuizzes: number };
  inProgress: any[];
  recommended: any[];
}

export default function ElearnDashboardClient({
  session,
  stats,
  inProgress,
  recommended,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      {/* Sidebar Overlay (Mobile only) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-50 transition-all duration-300 transform 
          ${sidebarOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0 w-0 lg:w-72"}
          bg-gray-900 text-white flex-shrink-0 border-r border-gray-800 overflow-y-auto`}
      >
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <Link href="/elearn" className="flex items-center gap-3">
            <Image
              src="https://volunteermedicalcorps.org/images/logo-wide.png"
              alt="VMC Logo"
              width={160}
              height={55}
              className="h-10 w-auto brightness-0 invert"
            />
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 px-4 py-4 bg-gray-800/50 border border-white/5 rounded-2xl">
            <div className="relative">
              <Image
                src={session.user.image}
                alt={session.user.name}
                width={48}
                height={48}
                className="rounded-full border-2 border-blue-500/30 p-0.5"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="font-bold truncate text-sm">{session.user.name}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Student</p>
            </div>
          </div>
        </div>

        <nav className="mt-4 px-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/elearn/students/dashboard"
                className="flex items-center gap-3 px-5 py-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-900/20 font-bold"
              >
                <span className="material-icons">dashboard</span>
                <span>Dashboard</span>
              </Link>
            </li>

            <li className="mt-10 px-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">
              My Account
            </li>
            {[
              { icon: "person", label: "Profile", href: "/elearn/students/profile" },
              { icon: "lock", label: "Change Password", href: "/elearn/students/change-password" },
              { icon: "history", label: "Order History", href: "/elearn/students/purchases" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-5 py-4 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
                >
                  <span className="material-icons text-gray-500 group-hover:text-blue-400 transition-colors">{item.icon}</span>
                  <span className="font-semibold text-sm">{item.label}</span>
                </Link>
              </li>
            ))}

            <li className="mt-10 px-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">
              My Classes
            </li>
            {[
              { icon: "menu_book", label: "All Courses", href: "/elearn/courses" },
              { icon: "school", label: "My Courses", href: "/elearn/students/my-courses" },
              { icon: "forum", label: "Discussions", href: "#" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-5 py-4 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
                >
                  <span className="material-icons text-gray-500 group-hover:text-blue-400 transition-colors">{item.icon}</span>
                  <span className="font-semibold text-sm">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto p-6 pt-10">
          <Link
            href="/account/logout"
            className="flex items-center gap-3 px-5 py-4 text-red-400 bg-red-400/5 hover:bg-red-400 hover:text-white rounded-2xl transition-all font-bold"
          >
            <span className="material-icons">logout</span>
            <span>Logout</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <nav className="bg-white border-b h-20 flex items-center px-4 sm:px-8 justify-between z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-12 h-12 flex items-center justify-center bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span className="material-icons">menu</span>
            </button>
            <h2 className="hidden sm:block text-xl font-black text-gray-900 tracking-tight">Dashboard</h2>
          </div>

          <div className="flex-1 max-w-md mx-4 sm:mx-8">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
              />
              <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">search</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <button className="relative w-12 h-12 flex items-center justify-center bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
              <span className="material-icons">notifications</span>
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>

            <div className="hidden sm:flex items-center gap-4 pl-6 border-l border-gray-100">
              <div className="text-right">
                <p className="text-sm font-black text-gray-900 leading-none">{session.user.name}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Student</p>
              </div>
              <Image
                src={session.user.image}
                alt={session.user.name}
                width={44}
                height={44}
                className="rounded-xl border-2 border-gray-50 shadow-sm"
              />
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Welcome back, {session.user.name.split(' ')[0]}! 👋</h1>
              <p className="text-gray-500 font-medium mt-1">Here&apos;s what&apos;s happening with your learning progress.</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 group hover:border-blue-100 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Total Courses</p>
                  <p className="text-5xl font-black mt-4 text-gray-900 group-hover:text-blue-600 transition-colors">{stats.totalCourses}</p>
                </div>
                <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
                  <span className="material-icons text-3xl">school</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 group hover:border-blue-100 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Enrolled</p>
                  <p className="text-5xl font-black mt-4 text-blue-600">{stats.myCourses}</p>
                </div>
                <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                  <span className="material-icons text-3xl">menu_book</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 group hover:border-blue-100 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Quizzes</p>
                  <p className="text-5xl font-black mt-4 text-purple-600">{stats.myQuizzes}</p>
                </div>
                <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center">
                  <span className="material-icons text-3xl">quiz</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* In Progress */}
            <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <div>
                  <h3 className="font-black text-xl text-gray-900 tracking-tight">In Progress</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Continue where you left off</p>
                </div>
                <Link href="/elearn/students/my-courses" className="text-blue-600 hover:text-blue-700 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl transition-all">
                  View All <span className="material-icons text-sm">arrow_forward</span>
                </Link>
              </div>

              <div className="flex-1 min-h-[400px]">
                {inProgress.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-24 h-24 bg-gray-50 text-gray-200 rounded-[2rem] flex items-center justify-center mb-6">
                      <span className="material-icons text-6xl">school</span>
                    </div>
                    <p className="text-xl font-bold text-gray-400">No active courses yet!</p>
                    <p className="text-gray-400 text-sm mt-2 max-w-xs">Start your learning journey by exploring our available courses.</p>
                    <Link
                      href="/elearn/courses"
                      className="mt-8 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-900/10"
                    >
                      Start a Course
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {/* Map inProgress items here */}
                  </div>
                )}
              </div>
            </div>

            {/* Recommended */}
            <div className="lg:col-span-4 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
              <div className="p-8 border-b border-gray-50 bg-gray-50/30">
                <h3 className="font-black text-xl text-gray-900 tracking-tight">Recommended</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Curated for you</p>
              </div>
              <div className="p-8 space-y-6">
                {recommended.map((course) => (
                  <Link
                    key={course.id}
                    href={`/elearn/view-course/${course.id}`}
                    className="flex gap-5 group"
                  >
                    <div className="w-24 h-20 relative rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                        {course.title}
                      </p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mt-2">{course.category}</p>
                    </div>
                  </Link>
                ))}
                
                <Link 
                  href="/elearn/courses"
                  className="mt-8 w-full py-4 border-2 border-dashed border-gray-100 rounded-[1.5rem] flex items-center justify-center text-gray-400 font-bold hover:bg-gray-50 hover:border-blue-100 hover:text-blue-600 transition-all text-sm group"
                >
                  View More <span className="material-icons ml-2 group-hover:translate-x-1 transition-transform">east</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
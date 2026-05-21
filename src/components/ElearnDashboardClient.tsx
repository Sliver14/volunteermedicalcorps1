"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaBars, FaTimes, FaBell, FaGraduationCap, FaDesktop, FaUser,
  FaBookOpen, FaHistory, FaLock, FaExpand, FaSearch, FaSignOutAlt,
  FaSchool, FaShieldAlt, FaBriefcase, FaHome
} from "react-icons/fa";

// Content Components
import ElearnProfileContent from "./ElearnProfileContent";
import ElearnCoursesContent from "./ElearnCoursesContent";
import ElearnMyCoursesContent from "./ElearnMyCoursesContent";
import ElearnOrderHistoryContent from "./ElearnOrderHistoryContent";

interface Props {
  session: any;
  stats: { totalCourses: number; myCourses: number; myQuizzes: number };
  inProgress: any[];
  recommended: any[];
}

type Tab = "overview" | "profile" | "all_courses" | "my_courses" | "order_history" | "security";

export default function ElearnDashboardClient({
  session,
  stats,
  inProgress,
  recommended,
}: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const navigation = [
    { name: "Dashboard", key: "overview" as Tab, icon: FaDesktop, section: "main" },
    { name: "All Courses", key: "all_courses" as Tab, icon: FaBookOpen, section: "learning" },
    { name: "My Courses", key: "my_courses" as Tab, icon: FaSchool, section: "learning" },
    { name: "Profile", key: "profile" as Tab, icon: FaUser, section: "account" },
    { name: "Order History", key: "order_history" as Tab, icon: FaHistory, section: "account" },
    { name: "Security", key: "security" as Tab, icon: FaLock, section: "account" },
  ];

  const handleNavClick = (key: Tab) => {
    setActiveTab(key);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden font-poppins text-slate-800">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" 
            onClick={() => setIsSidebarOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-white shadow-2xl lg:shadow-none transform transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

        {/* Logo Header - Centered & Compact */}
        <div className="flex items-center justify-center h-20 px-6 border-b border-slate-50 relative">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={130} height={40} className="object-contain" unoptimized />
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden absolute right-6 text-slate-400">
            <FaTimes size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-8 px-6 space-y-8 custom-scrollbar">
          {/* Dashboard Group */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 opacity-50 px-4">MAIN MENU</p>
            <ul className="space-y-1.5">
              {navigation.filter(n => n.section === 'main').map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => handleNavClick(item.key)}
                    className={`flex items-center w-full px-5 py-4 rounded-2xl transition-all group ${activeTab === item.key ? "bg-blue-600 text-white shadow-xl shadow-blue-900/20" : "text-slate-500 hover:bg-slate-50"}`}
                  >
                    <item.icon className={`mr-4 text-lg ${activeTab === item.key ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`} />
                    <span className="text-[14px] font-bold">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Group */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 opacity-50 px-4">VMC ACADEMY</p>
            <ul className="space-y-1.5">
              {navigation.filter(n => n.section === 'learning').map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => handleNavClick(item.key)}
                    className={`flex items-center w-full px-5 py-4 rounded-2xl transition-all group ${activeTab === item.key ? "bg-blue-600 text-white shadow-xl shadow-blue-900/20" : "text-slate-500 hover:bg-slate-50"}`}
                  >
                    <item.icon className={`mr-4 text-lg ${activeTab === item.key ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`} />
                    <span className="text-[14px] font-bold">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Group */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 opacity-50 px-4">MY ACCOUNT</p>
            <ul className="space-y-1.5">
              {navigation.filter(n => n.section === 'account').map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => handleNavClick(item.key)}
                    className={`flex items-center w-full px-5 py-4 rounded-2xl transition-all group ${activeTab === item.key ? "bg-blue-600 text-white shadow-xl shadow-blue-900/20" : "text-slate-500 hover:bg-slate-50"}`}
                  >
                    <item.icon className={`mr-4 text-lg ${activeTab === item.key ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`} />
                    <span className="text-[14px] font-bold">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-slate-50">
          <Link
            href="/portal"
            className="flex items-center justify-center w-full gap-3 px-4 py-5 bg-gray-900 text-white hover:bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-gray-900/10"
          >
            <FaHome className="text-lg" />
            BACK TO PORTAL
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-600">
              <FaBars size={22} />
            </button>
            <h1 className="text-lg font-black text-slate-900 tracking-tight">
              {activeTab === "overview" ? "Academy Dashboard" : activeTab.replace(/_/g, " ").toUpperCase()}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 group focus-within:border-blue-500 transition-all">
              <FaSearch className="text-slate-300 group-focus-within:text-blue-500 transition-colors" size={14} />
              <input type="text" placeholder="Search courses..." className="bg-transparent border-none outline-none px-3 text-xs font-medium w-48" />
            </div>
            
            <button className="relative text-slate-400 hover:text-blue-600 transition-colors">
              <FaBell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            </button>
            
            <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-[12px] font-black text-slate-900 leading-none">{session.user.name}</p>
                <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mt-1">Student</p>
              </div>
              <button 
                onClick={() => setActiveTab("profile")}
                className="w-10 h-10 rounded-xl overflow-hidden border-2 border-slate-50 shadow-sm"
              >
                <Image src={session.user.image} alt="User" width={40} height={40} className="object-cover" unoptimized />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-12">
          <div className="max-w-[1400px] mx-auto">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10"
                >
                  <div className="mb-12">
                    <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Welcome to VMC Academy, {session.user.name.split(' ')[0]}! 🎓</h2>
                    <p className="text-slate-500 font-medium mt-2">Advance your clinical and leadership skills with specialized training.</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 group hover:shadow-2xl transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Total Library</p>
                          <p className="text-5xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{stats.totalCourses}</p>
                        </div>
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shadow-inner">
                          <FaBookOpen size={28} />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 group hover:shadow-2xl transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">My Courses</p>
                          <p className="text-5xl font-black text-slate-900 group-hover:text-amber-500 transition-colors">{stats.myCourses || 2}</p>
                        </div>
                        <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center shadow-inner">
                          <FaSchool size={28} />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 group hover:shadow-2xl transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Certifications</p>
                          <p className="text-5xl font-black text-slate-900 group-hover:text-green-500 transition-colors">1</p>
                        </div>
                        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center shadow-inner">
                          <FaGraduationCap size={28} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Content */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    <div className="xl:col-span-8 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                      <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
                        <div>
                          <h3 className="font-black text-2xl text-slate-900 tracking-tight">Active Learning</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Pick up where you left off</p>
                        </div>
                        <button onClick={() => setActiveTab("my_courses")} className="text-blue-600 font-black uppercase tracking-widest text-[10px] flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-2xl hover:bg-blue-600 hover:text-white transition-all">
                          View Dashboard
                        </button>
                      </div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-8 text-slate-200 shadow-inner">
                          <FaSchool size={40} />
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase">Ready to learn?</h4>
                        <p className="text-slate-400 font-medium max-w-sm leading-relaxed mb-10 text-sm">
                          You have 2 courses currently in progress. Start your next lesson to advance your certification.
                        </p>
                        <button onClick={() => setActiveTab("my_courses")} className="bg-gray-900 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-600 transition-all shadow-2xl shadow-blue-900/10">
                          Resume Learning
                        </button>
                      </div>
                    </div>

                    <div className="xl:col-span-4 bg-white rounded-[3rem] border border-slate-100 shadow-sm flex flex-col">
                      <div className="p-10 border-b border-slate-50 bg-slate-50/20">
                        <h3 className="font-black text-2xl text-slate-900 tracking-tight">Recommended</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Curated for your profile</p>
                      </div>
                      <div className="p-10 space-y-8">
                        {recommended.map((course) => (
                          <div key={course.id} className="flex gap-6 group cursor-pointer">
                            <div className="w-24 h-20 relative rounded-2xl overflow-hidden shadow-sm shrink-0">
                              <Image src={course.image} alt={course.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight text-sm">{course.title}</p>
                              <p className="text-[9px] font-black uppercase tracking-widest text-blue-500 mt-2">{course.category}</p>
                            </div>
                          </div>
                        ))}
                        
                        <button onClick={() => setActiveTab("all_courses")} className="w-full py-5 border-2 border-dashed border-slate-100 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:bg-slate-50 hover:border-blue-200 hover:text-blue-600 transition-all">
                          Browse All Courses
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "profile" && (
                <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <ElearnProfileContent user={session.user} />
                </motion.div>
              )}

              {activeTab === "all_courses" && (
                <motion.div key="all_courses" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <ElearnCoursesContent courses={recommended} />
                </motion.div>
              )}

              {activeTab === "my_courses" && (
                <motion.div key="my_courses" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <ElearnMyCoursesContent />
                </motion.div>
              )}

              {activeTab === "order_history" && (
                <motion.div key="order_history" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <ElearnOrderHistoryContent />
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div key="security" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="min-h-[500px] flex items-center justify-center">
                   <div className="bg-white p-20 rounded-[4rem] text-center border border-slate-100 shadow-sm max-w-xl">
                      <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                        <FaShieldAlt size={40} />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">Security Settings</h3>
                      <p className="text-slate-400 font-medium leading-relaxed mb-12">
                        Manage your password, two-factor authentication, and account activity logs here.
                      </p>
                      <button className="bg-gray-900 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-600 transition-all">
                        Update Password
                      </button>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

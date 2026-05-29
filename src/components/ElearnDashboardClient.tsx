"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { 
  FaBars, FaTimes, FaBell, FaGraduationCap, FaDesktop, FaUser,
  FaBookOpen, FaHistory, FaLock, FaExpand, FaSearch, FaSignOutAlt,
  FaSchool, FaShieldAlt, FaBriefcase, FaHome, FaSpinner, FaKey,
  FaCheckCircle, FaExclamationTriangle
} from "react-icons/fa";

// Content Components
import ElearnProfileContent from "./ElearnProfileContent";
import ElearnCoursesContent from "./ElearnCoursesContent";
import ElearnMyCoursesContent from "./ElearnMyCoursesContent";
import ElearnOrderHistoryContent from "./ElearnOrderHistoryContent";

interface Props {
  stats: { totalCourses: number; myCourses: number; myQuizzes: number };
  inProgress: any[];
  recommended: any[];
}

type Tab = "overview" | "profile" | "all_courses" | "my_courses" | "order_history" | "security";

export default function ElearnDashboardClient({
  stats: initialStats,
  inProgress,
  recommended,
}: Props) {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  
  // Dynamic Data State
  const [stats, setStats] = useState(initialStats);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [dashboardRes, coursesRes] = await Promise.all([
          fetch("/api/elearn/dashboard"),
          fetch("/api/elearn/courses")
        ]);

        if (dashboardRes.ok) {
          const data = await dashboardRes.json();
          setEnrollments(data.enrollments || []);
          setDonations(data.donations || []);
          setStats({
            ...initialStats,
            myCourses: data.stats.totalEnrolled,
          });
        }

        if (coursesRes.ok) {
          const courses = await coursesRes.json();
          setAllCourses(courses);
        }
      } catch (error) {
        console.error("Failed to fetch academy data:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    if (session) {
      fetchDashboardData();
    }
  }, [session, initialStats]);
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleNavClick = (key: Tab) => {
    setActiveTab(key);
    setIsSidebarOpen(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Password changed successfully" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ type: "error", text: data.message || "Something went wrong" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to change password" });
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) return null;

  const navigation = [
    { name: "Dashboard", key: "overview" as Tab, icon: FaDesktop, section: "main" },
    { name: "All Courses", key: "all_courses" as Tab, icon: FaBookOpen, section: "learning" },
    { name: "My Courses", key: "my_courses" as Tab, icon: FaSchool, section: "learning" },
    { name: "Profile", key: "profile" as Tab, icon: FaUser, section: "account" },
    { name: "Order History", key: "order_history" as Tab, icon: FaHistory, section: "account" },
    { name: "Security", key: "security" as Tab, icon: FaLock, section: "account" },
  ];

  const completedCoursesCount = enrollments.filter(e => e.isCompleted).length;
  const inProgressCoursesCount = enrollments.filter(e => !e.isCompleted).length;

  return (
    <div className="flex h-screen bg-bg-base overflow-hidden font-poppins text-text-main">
      {/* ... (Mobile Overlay unchanged) */}
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
      <aside className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-bg-surface shadow-2xl lg:shadow-none transform transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

        {/* Logo Header - Centered & Compact */}
        <div className="flex items-center justify-center h-20 px-6 border-b border-border-main relative">
          <Link href="/elearn/dashboard" className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={130} height={40} className="object-contain dark:brightness-110" unoptimized />
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden absolute right-6 text-text-muted">
            <FaTimes size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-8 px-6 space-y-8 custom-scrollbar">
          {/* Dashboard Group */}
          <div>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4 opacity-50 px-4">MAIN MENU</p>
            <ul className="space-y-1.5">
              {navigation.filter(n => n.section === 'main').map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => handleNavClick(item.key)}
                    className={`flex items-center w-full px-5 py-4 rounded-2xl transition-all group ${activeTab === item.key ? "bg-brand-primary dark:bg-brand-secondary text-white dark:text-brand-primary shadow-xl shadow-brand-primary/20" : "text-text-muted hover:bg-bg-base"}`}
                  >
                    <item.icon className={`mr-4 text-lg ${activeTab === item.key ? "text-white dark:text-brand-primary" : "text-text-muted group-hover:text-brand-primary dark:group-hover:text-brand-secondary"}`} />
                    <span className="text-[14px] font-bold">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Group */}
          <div>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4 opacity-50 px-4">VMC ACADEMY</p>
            <ul className="space-y-1.5">
              {navigation.filter(n => n.section === 'learning').map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => handleNavClick(item.key)}
                    className={`flex items-center w-full px-5 py-4 rounded-2xl transition-all group ${activeTab === item.key ? "bg-brand-primary dark:bg-brand-secondary text-white dark:text-brand-primary shadow-xl shadow-brand-primary/20" : "text-text-muted hover:bg-bg-base"}`}
                  >
                    <item.icon className={`mr-4 text-lg ${activeTab === item.key ? "text-white dark:text-brand-primary" : "text-text-muted group-hover:text-brand-primary dark:group-hover:text-brand-secondary"}`} />
                    <span className="text-[14px] font-bold">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Group */}
          <div>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4 opacity-50 px-4">MY ACCOUNT</p>
            <ul className="space-y-1.5">
              {navigation.filter(n => n.section === 'account').map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => handleNavClick(item.key)}
                    className={`flex items-center w-full px-5 py-4 rounded-2xl transition-all group ${activeTab === item.key ? "bg-brand-primary dark:bg-brand-secondary text-white dark:text-brand-primary shadow-xl shadow-brand-primary/20" : "text-text-muted hover:bg-bg-base"}`}
                  >
                    <item.icon className={`mr-4 text-lg ${activeTab === item.key ? "text-white dark:text-brand-primary" : "text-text-muted group-hover:text-brand-primary dark:group-hover:text-brand-secondary"}`} />
                    <span className="text-[14px] font-bold">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Logout */}
          <div className="pt-4">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center w-full px-5 py-4 rounded-2xl transition-all group text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <FaSignOutAlt className="mr-4 text-lg" />
              <span className="text-[14px] font-bold uppercase tracking-widest">Logout</span>
            </button>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-border-main">
          <Link
            href="/portal"
            className="flex items-center justify-center w-full gap-3 px-4 py-5 bg-brand-primary dark:bg-brand-secondary text-white dark:text-brand-primary hover:opacity-90 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg"
          >
            <FaHome className="text-lg" />
            BACK TO PORTAL
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-bg-surface border-b border-border-main flex items-center justify-between px-6 lg:px-12 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-text-main">
              <FaBars size={22} />
            </button>
            <h1 className="text-lg font-black text-text-main tracking-tight">
              {activeTab === "overview" ? "Academy Dashboard" : activeTab.replace(/_/g, " ").toUpperCase()}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-bg-base border border-border-main rounded-xl px-4 py-2 group focus-within:border-brand-primary transition-all">
              <FaSearch className="text-text-muted group-focus-within:text-brand-primary transition-colors" size={14} />
              <input type="text" placeholder="Search courses..." className="bg-transparent border-none outline-none px-3 text-xs font-medium w-48 text-text-main" />
            </div>
            
            <button className="relative text-text-muted hover:text-brand-primary transition-colors">
              <FaBell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-bg-surface" />
            </button>
            
            <div className="flex items-center gap-4 pl-6 border-l border-border-main">
              <div className="text-right hidden sm:block">
                <p className="text-[12px] font-black text-text-main leading-none">{session.user?.name}</p>
                <p className="text-[9px] font-bold text-brand-secondary uppercase tracking-widest mt-1">{session.user?.role || 'Student'}</p>
              </div>
              <button 
                onClick={() => setActiveTab("profile")}
                className="w-10 h-10 rounded-xl overflow-hidden border-2 border-border-main shadow-sm bg-brand-primary/10 flex items-center justify-center text-brand-primary dark:text-brand-secondary font-bold"
              >
                {session.user?.image ? (
                  <Image src={session.user.image} alt="User" width={40} height={40} className="object-cover" unoptimized />
                ) : (
                  <span>{session.user?.name?.[0]?.toUpperCase()}</span>
                )}
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
                    <h2 className="text-3xl lg:text-4xl font-black text-text-main tracking-tight">Welcome to VMC Academy, {session.user?.name?.split(' ')[0]}! 🎓</h2>
                    <p className="text-text-muted font-medium mt-2">Advance your clinical and leadership skills with specialized training.</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-bg-surface rounded-[2.5rem] border border-border-main shadow-sm p-10 group hover:shadow-2xl transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em] mb-4">Total Library</p>
                          <p className="text-5xl font-black text-text-main group-hover:text-brand-primary transition-colors">{stats.totalCourses}</p>
                        </div>
                        <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary dark:text-brand-secondary rounded-3xl flex items-center justify-center shadow-inner">
                          <FaBookOpen size={28} />
                        </div>
                      </div>
                    </div>

                    <div className="bg-bg-surface rounded-[2.5rem] border border-border-main shadow-sm p-10 group hover:shadow-2xl transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em] mb-4">My Courses</p>
                          <p className="text-5xl font-black text-text-main group-hover:text-brand-secondary transition-colors">{stats.myCourses}</p>
                        </div>
                        <div className="w-16 h-16 bg-brand-secondary/10 text-brand-secondary rounded-3xl flex items-center justify-center shadow-inner">
                          <FaSchool size={28} />
                        </div>
                      </div>
                    </div>

                    <div className="bg-bg-surface rounded-[2.5rem] border border-border-main shadow-sm p-10 group hover:shadow-2xl transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em] mb-4">Certifications</p>
                          <p className="text-5xl font-black text-text-main group-hover:text-green-500 transition-colors">{completedCoursesCount}</p>
                        </div>
                        <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-3xl flex items-center justify-center shadow-inner">
                          <FaGraduationCap size={28} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Content */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    <div className="xl:col-span-8 bg-bg-surface rounded-[3rem] border border-border-main shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                      <div className="p-10 border-b border-border-main flex justify-between items-center bg-bg-base/20">
                        <div>
                          <h3 className="font-black text-2xl text-text-main tracking-tight">Active Learning</h3>
                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Pick up where you left off</p>
                        </div>
                        <button onClick={() => setActiveTab("my_courses")} className="text-brand-primary dark:text-brand-secondary font-black uppercase tracking-widest text-[10px] flex items-center gap-3 bg-brand-primary/10 px-6 py-3 rounded-2xl hover:bg-brand-primary hover:text-white transition-all">
                          View Dashboard
                        </button>
                      </div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                        <div className="w-24 h-24 bg-bg-base rounded-[2rem] flex items-center justify-center mb-8 text-text-muted/30 shadow-inner">
                          <FaSchool size={40} />
                        </div>
                        <h4 className="text-2xl font-black text-text-main mb-4 tracking-tight uppercase">Ready to learn?</h4>
                        <p className="text-text-muted font-medium max-w-sm leading-relaxed mb-10 text-sm">
                          {inProgressCoursesCount > 0 
                            ? `You have ${inProgressCoursesCount} course${inProgressCoursesCount > 1 ? 's' : ''} currently in progress. Start your next lesson to advance your certification.`
                            : "Explore our course library and start your learning journey today."}
                        </p>
                        <button onClick={() => setActiveTab(inProgressCoursesCount > 0 ? "my_courses" : "all_courses")} className="bg-brand-primary dark:bg-brand-secondary text-white dark:text-brand-primary px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:opacity-90 transition-all shadow-2xl">
                          {inProgressCoursesCount > 0 ? "Resume Learning" : "Explore Courses"}
                        </button>
                      </div>
                    </div>

                    <div className="xl:col-span-4 bg-bg-surface rounded-[3rem] border border-border-main shadow-sm flex flex-col">
                      <div className="p-10 border-b border-border-main bg-bg-base/20">
                        <h3 className="font-black text-2xl text-text-main tracking-tight">Recommended</h3>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Curated for your profile</p>
                      </div>
                      <div className="p-10 space-y-8">
                        {recommended.map((course: any) => (
                          <div key={course.id} className="flex gap-6 group cursor-pointer">
                            <div className="w-24 h-20 relative rounded-2xl overflow-hidden shadow-sm shrink-0">
                              <Image src={course.image} alt={course.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-text-main group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors line-clamp-2 leading-tight text-sm">{course.title}</p>
                              <p className="text-[9px] font-black uppercase tracking-widest text-brand-secondary mt-2">{course.category}</p>
                            </div>
                          </div>
                        ))}
                        
                        <button onClick={() => setActiveTab("all_courses")} className="w-full py-5 border-2 border-dashed border-border-main rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] text-text-muted hover:bg-bg-base hover:border-brand-secondary/30 hover:text-brand-secondary transition-all">
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
                  <ElearnCoursesContent courses={allCourses} />
                </motion.div>
              )}

              {activeTab === "my_courses" && (
                <motion.div key="my_courses" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <ElearnMyCoursesContent enrollments={enrollments} />
                </motion.div>
              )}

              {activeTab === "order_history" && (
                <motion.div key="order_history" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <ElearnOrderHistoryContent donations={donations} />
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div key="security" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="min-h-[500px] flex items-center justify-center">
                   <div className="bg-bg-surface p-10 md:p-20 rounded-[4rem] text-center border border-border-main shadow-sm max-w-xl w-full">
                      <div className="w-24 h-24 bg-brand-primary/10 text-brand-primary dark:text-brand-secondary rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                        <FaShieldAlt size={40} />
                      </div>
                      <h3 className="text-3xl font-black text-text-main mb-4 tracking-tight uppercase">Security Settings</h3>
                      <p className="text-text-muted font-medium leading-relaxed mb-12">
                        Manage your password and keep your account secure.
                      </p>
                      
                      <form onSubmit={handleChangePassword} className="space-y-6 max-w-md mx-auto">
                        <div className="space-y-2 text-left">
                          <label className="text-[10px] font-black text-text-muted uppercase tracking-widest px-4">Current Password</label>
                          <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-6 py-4 bg-bg-base border border-border-main rounded-2xl focus:outline-none focus:border-brand-primary transition-all font-bold text-text-main"
                            placeholder="Enter current password"
                            required
                          />
                        </div>

                        <div className="space-y-2 text-left">
                          <label className="text-[10px] font-black text-text-muted uppercase tracking-widest px-4">New Password</label>
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-6 py-4 bg-bg-base border border-border-main rounded-2xl focus:outline-none focus:border-brand-primary transition-all font-bold text-text-main"
                            placeholder="Enter new password"
                            required
                          />
                        </div>

                        <div className="space-y-2 text-left">
                          <label className="text-[10px] font-black text-text-muted uppercase tracking-widest px-4">Confirm New Password</label>
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-6 py-4 bg-bg-base border border-border-main rounded-2xl focus:outline-none focus:border-brand-primary transition-all font-bold text-text-main"
                            placeholder="Confirm new password"
                            required
                          />
                        </div>

                        {message.text && (
                          <div className={`p-4 rounded-xl flex items-center gap-3 ${
                            message.type === "success" ? "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20"
                          }`}>
                            {message.type === "success" ? <FaCheckCircle size={18} /> : <FaExclamationTriangle size={18} />}
                            <p className="text-sm font-bold uppercase tracking-tight">{message.text}</p>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-brand-primary dark:bg-brand-secondary text-white dark:text-brand-primary px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl"
                        >
                          {isLoading ? <FaSpinner className="animate-spin" /> : <FaKey />}
                          {isLoading ? "Updating..." : "Update Password"}
                        </button>
                      </form>
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

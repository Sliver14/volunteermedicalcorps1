"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { 
  FaBars,
  FaTimes,
  FaBell,
  FaGraduationCap,
  FaDesktop,
  FaUserCheck,
  FaCopy,
  FaDollarSign,
  FaBookOpen,
  FaArchive,
  FaLock,
  FaExpand,
  FaUser,
  FaSignOutAlt,
  FaChevronDown
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Mock user data matching the design
  const user = {
    name: "sylver oyinaga",
    role: "Volunteer",
    credits: 1250,
    avatar: "https://volunteermedicalcorps.org/images/volunteers/default-avatar.jpg"
  };

  const navigation = [
    { name: "Dashboard", href: "/portal", icon: FaDesktop },
    { name: "Profile", href: "/portal/profile", icon: FaUserCheck },
    { 
      name: "Campaigns", 
      icon: FaCopy,
      subItems: [
        { name: "Good Deeds Campaigns", href: "/portal/campaign/GDS102933" },
        { name: "Medical Projects", href: "/portal/campaign/MEP029344" },
        { name: "Humanitarian Projects", href: "/portal/campaign/HUP837742" },
        { name: "VMC Academy", href: "/elearn/dashboard" },
      ]
    },
    { name: "Donations", href: "/portal/donations", icon: FaDollarSign },
    { 
      name: "Projects", 
      icon: FaBookOpen,
      subItems: [
        { name: "VMC Projects", href: "/portal/projects" },
        { name: "My Projects", href: "/portal/my-projects" },
      ]
    },
    { 
      name: "Badges", 
      icon: FaArchive,
      subItems: [
        { name: "Badge Categories", href: "/portal/badges" },
        { name: "My VMC Badges", href: "/portal/awards" },
      ]
    },
  ];

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div 
      className="flex h-screen bg-[#f1f1f1] overflow-hidden font-poppins text-slate-800"
      style={{
        backgroundImage: "url('https://volunteermedicalcorps.org/pmr-bg-mission.jpg')", // Using a valid placeholder from public folder logic
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 400px" // Simulating the header effect
      }}
    >
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-white shadow-2xl lg:shadow-none transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-6 shrink-0 border-b border-slate-50">
          <Link href="/" className="flex items-center">
            <Image src="https://volunteermedicalcorps.org/images/logob.png" alt="Logo" width={140} height={45} className="object-contain" unoptimized />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400">
            <FaTimes size={20} />
          </button>
        </div>

        {/* User Profile in Sidebar */}
        <div className="px-6 py-8 flex flex-col items-center text-center">
          <div className="relative mb-4 group">
            <Image src={user.avatar} alt="User" width={80} height={80} className="rounded-full border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300" unoptimized />
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
          </div>
          <div className="overflow-hidden">
            <p className="font-black text-[15px] text-[#002866] truncate uppercase tracking-tight">{user.name}</p>
            <p className="text-[11px] font-bold text-[#ff9f22] uppercase tracking-widest mt-1">{user.role}</p>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1.5 custom-scrollbar">
          <div className="px-4 mb-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-50">Main Menu</p>
          </div>
          
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const hasSubItems = !!item.subItems;
            const isOpen = openDropdown === item.name;

            return (
              <div key={item.name}>
                {hasSubItems ? (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl transition-all duration-200 group
                      ${isOpen ? "text-[#002866] bg-slate-50" : "text-slate-500 hover:bg-slate-50 hover:text-[#002866]"}`}
                  >
                    <div className="flex items-center">
                      <item.icon className={`mr-4 text-lg ${isOpen ? "text-[#ff9f22]" : "text-slate-400 group-hover:text-[#002866]"}`} />
                      <span className="text-[14px] font-bold">{item.name}</span>
                    </div>
                    <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 group
                      ${isActive 
                        ? "bg-[#002866] text-white font-bold shadow-lg shadow-blue-900/20" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-[#002866]"
                      }`}
                  >
                    <item.icon className={`mr-4 text-lg ${isActive ? "text-[#ff9f22]" : "text-slate-400 group-hover:text-[#002866]"}`} />
                    <span className="text-[14px] font-bold">{item.name}</span>
                  </Link>
                )}

                {/* Submenu */}
                <AnimatePresence>
                  {hasSubItems && isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-slate-50/30 rounded-xl mt-1 ml-4"
                    >
                      {item.subItems?.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setSidebarOpen(false)}
                          className="flex items-center px-8 py-3 text-[13px] font-bold text-slate-500 hover:text-[#ff9f22] transition-colors"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-3"></div>
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <div className="px-4 mt-10 mb-4 border-t border-slate-50 pt-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-50">Settings</p>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center w-full px-4 py-3.5 text-slate-500 hover:text-red-600 transition-colors rounded-xl text-sm font-bold group"
          >
            <FaLock className="mr-4 text-lg text-slate-400 group-hover:text-red-600" />
            Logout
          </button>
        </nav>

        {/* Sidebar Footer - Academy Button */}
        <div className="p-4 bg-slate-50/50">
          <Link
            href="/elearn/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-center w-full gap-3 px-4 py-5 bg-[#ff9f22] text-[#002866] hover:bg-black hover:text-[#ff9f22] transition-all rounded-[2rem] text-xs font-black uppercase tracking-widest shadow-2xl shadow-orange-950/20 active:scale-95"
          >
            <FaGraduationCap className="text-xl" />
            VMC Academy
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-between px-6 lg:px-10 z-30 shrink-0 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#002866] p-2 hover:bg-slate-100 rounded-xl transition-all"
            >
              <FaBars size={22} />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-lg font-black text-[#002866] tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#ff9f22] rounded-full" />
                Portal Dashboard
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            {/* Fullscreen Button */}
            <button className="hidden md:flex items-center justify-center w-11 h-11 text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
              <FaExpand size={18} />
            </button>

            {/* Notifications */}
            <button className="relative w-11 h-11 flex items-center justify-center text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
              <FaBell size={20} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>

            {/* User Dropdown Profile */}
            <div className="flex items-center gap-4 pl-4 md:pl-8 border-l border-slate-100">
              <div className="hidden md:block text-right">
                <p className="text-[13px] font-black text-[#002866] leading-none uppercase tracking-tighter">Hello, {user.name.split(' ')[0]}</p>
              </div>
              <div className="relative group cursor-pointer">
                <Image 
                  src={user.avatar} 
                  alt="User" 
                  width={44} 
                  height={44} 
                  className="rounded-2xl border-2 border-white shadow-sm ring-1 ring-slate-100"
                  unoptimized
                />
                <div className="absolute top-full right-0 mt-4 w-60 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl border border-slate-100 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-50">
                  <div className="px-6 py-4 border-b border-slate-50 mb-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Overview</p>
                    <p className="text-[15px] font-bold text-[#002866] mt-1 truncate">{user.name}</p>
                  </div>
                  <Link href="/portal/profile" className="flex items-center gap-4 px-6 py-3.5 text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-[#002866] transition-all">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500"><FaUser size={14} /></div>
                    My Profile
                  </Link>
                  <div className="px-4 mt-2">
                    <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-4 px-4 py-4 text-sm font-bold text-red-500 bg-red-50/50 hover:bg-red-50 w-full text-left transition-all rounded-2xl">
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600"><FaSignOutAlt size={14} /></div>
                      Logout Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-12 custom-scrollbar">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>

          <footer className="mt-20 pb-10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400">
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
              <span>Copyright © 2026</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff9f22]" />
              <Link href="/" className="hover:text-[#002866] transition-colors">Volunteer Medical Corps</Link>
            </div>
            <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest">
              <Link href="/terms" className="hover:text-[#002866]">Terms</Link>
              <Link href="/privacy" className="hover:text-[#002866]">Privacy</Link>
            </div>
          </footer>
        </main>

      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  FaTachometerAlt, 
  FaGraduationCap, 
  FaBookOpen, 
  FaGlobeAmericas, 
  FaCoins, 
  FaUserCircle,
  FaSignOutAlt, 
  FaBars,
  FaTimes,
  FaBell
} from "react-icons/fa";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // Mock user data for the prototype
  const user = {
    name: "Dr. Sarah Johnson",
    role: "Medical Volunteer",
    credits: 1250,
    avatar: "S"
  };

  const navigation = [
    { name: "Dashboard", href: "/portal", icon: FaTachometerAlt },
    { name: "VMC Academy", href: "/portal/academy", icon: FaGraduationCap },
    { name: "My Learning", href: "/portal/my-learning", icon: FaBookOpen },
    { name: "Missions", href: "/portal/missions", icon: FaGlobeAmericas },
    { name: "Credit History", href: "/portal/credits", icon: FaCoins },
    { name: "My Profile", href: "/portal/profile", icon: FaUserCircle },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-roboto text-slate-800">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#002866]/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-100 shrink-0">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={120} height={35} className="object-contain" />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-[#002866]">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 custom-scrollbar">
          <div className="px-3 mb-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Main Menu</p>
          </div>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group
                  ${isActive 
                    ? "bg-[#002866] text-white font-semibold shadow-md shadow-blue-900/10" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-[#002866]"
                  }`}
              >
                <Icon className={`mr-3.5 text-lg ${isActive ? "text-[#ff9f22]" : "text-slate-400 group-hover:text-[#002866]"}`} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <button className="flex items-center w-full px-4 py-3 text-slate-500 hover:text-red-600 transition-colors rounded-lg text-sm font-medium">
            <FaSignOutAlt className="mr-3.5 text-lg" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-30 shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-500 hover:text-[#002866] p-2 mr-3"
            >
              <FaBars size={20} />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-lg font-poppins font-bold text-[#002866]">
                Welcome back, {user.name.split(' ')[1]}
              </h1>
              <p className="text-xs text-slate-500">You have earned {user.credits} credits this month</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            {/* Credits Display */}
            <div className="flex items-center bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full shadow-sm">
              <div className="w-6 h-6 rounded-full bg-[#ff9f22] flex items-center justify-center text-white mr-2 shadow-inner">
                <FaCoins size={12} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-amber-700 font-bold leading-none uppercase">Credits</span>
                <span className="text-sm font-black text-[#002866] leading-none mt-0.5">{user.credits.toLocaleString()}</span>
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-slate-400 hover:text-[#002866] transition-colors">
              <FaBell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-slate-100">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-slate-700 leading-none">{user.name}</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{user.role}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#002866] to-[#001f52] flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20 ring-2 ring-white">
                {user.avatar}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}

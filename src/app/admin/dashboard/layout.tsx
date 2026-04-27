"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  FaTachometerAlt, 
  FaNewspaper, 
  FaBlog, 
  FaComment,
  FaImages, 
  FaHandsHelping, 
  FaUsers, 
  FaSignOutAlt, 
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Overview", href: "/admin/dashboard", icon: FaTachometerAlt },
    { name: "News Management", href: "/admin/dashboard/news", icon: FaNewspaper },
    { name: "Blog Management", href: "/admin/dashboard/blog", icon: FaBlog },
    { name: "Comments", href: "/admin/dashboard/comments", icon: FaComment },
    { name: "Photo Gallery", href: "/admin/dashboard/gallery", icon: FaImages },
    { name: "Campaigns", href: "/admin/dashboard/campaigns", icon: FaHandsHelping },
    { name: "Volunteers", href: "/admin/dashboard/volunteers", icon: FaUsers },
  ];

  const handleLogout = () => {
    // Perform logout logic here
    router.push("/admin");
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-roboto text-gray-800">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#002866]/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-[#002866] text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col shadow-2xl 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-6 bg-[#001f52] border-b border-white/10 shrink-0">
          <Link href="/admin/dashboard" className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={140} height={40} className="object-contain filter brightness-0 invert" />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white p-2">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-3.5 rounded-sm transition-all duration-200 group
                  ${isActive 
                    ? "bg-[#ff9f22] text-[#002866] font-bold shadow-md" 
                    : "text-gray-300 hover:bg-white/10 hover:text-white font-medium"
                  }`}
              >
                <Icon className={`mr-4 text-lg ${isActive ? "text-[#002866]" : "text-[#ff9f22] group-hover:text-white"}`} />
                <span className="tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer (Logout) */}
        <div className="p-4 border-t border-white/10 bg-[#001f52] shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors rounded-sm font-bold tracking-wider uppercase text-xs"
          >
            <FaSignOutAlt className="mr-4 text-lg" />
            Secure Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#002866] hover:text-[#ff9f22] transition-colors p-2 mr-4"
            >
              <FaBars size={24} />
            </button>
            <h1 className="text-xl md:text-2xl font-poppins font-black text-[#002866] uppercase tracking-wide">
              Control Panel
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-[#002866] leading-none uppercase tracking-wider">Admin User</p>
              <p className="text-xs text-green-500 font-bold mt-1">● Online</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#002866] border-2 border-[#ff9f22] flex items-center justify-center text-white font-black shadow-md">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
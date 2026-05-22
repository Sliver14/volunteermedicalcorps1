"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Megaphone, 
  Heart, 
  Users, 
  User,
  LogOut, 
  MessageSquare, 
  FolderKanban, 
  Newspaper,
  Menu,
  X,
  Loader2
} from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

const sidebarLinks = [
  { href: "/envmc/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/envmc/dashboard/profile", label: "Profile", icon: User },
  { href: "/envmc/dashboard/hero", label: "Hero Slides", icon: ImageIcon },
  { href: "/envmc/dashboard/confessions", label: "Confessions", icon: MessageSquare },
  { href: "/envmc/dashboard/marquee", label: "Marquee", icon: Megaphone },
  { href: "/envmc/dashboard/campaigns", label: "Campaigns", icon: FolderKanban },
  { href: "/envmc/dashboard/volunteers", label: "Volunteers", icon: Users },
  { href: "/envmc/dashboard/news", label: "News", icon: Newspaper },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-[#002866]" />
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    router.push("/envmc");
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#002866]/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-[#002866] text-white flex flex-col fixed inset-y-0 shadow-2xl z-50 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center h-20">
          <Link href="/" className="flex flex-col">
            <span className="text-xl font-black tracking-tighter uppercase leading-none">VMC</span>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Admin Portal</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all font-bold text-sm uppercase tracking-wider ${
                  isActive 
                    ? "bg-[#ff9f22] text-[#002866] shadow-lg" 
                    : "hover:bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => signOut({ callbackUrl: "/envmc" })}
            className="flex items-center gap-3 w-full px-4 py-3 text-white/70 hover:text-red-400 hover:bg-red-400/10 rounded-sm transition-all font-bold text-sm uppercase tracking-wider"
          >
            <LogOut size={18} />
            Logout Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-64 p-4 md:p-8 min-w-0">
        <header className="flex justify-between items-center mb-10 bg-white p-6 rounded-sm shadow-sm border border-gray-100 h-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#002866] p-2 hover:bg-gray-50 rounded-sm"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-[#002866] uppercase tracking-tight line-clamp-1">
                {sidebarLinks.find(l => l.href === pathname)?.label || "Dashboard"}
              </h1>
              <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase mt-1">Welcome back, {session?.user?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#002866] leading-none">{session?.user?.name}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{session?.user?.role}</p>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-[#002866] font-black border-2 border-white shadow-sm shrink-0">
              {session?.user?.name?.[0]?.toUpperCase() || "A"}
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}


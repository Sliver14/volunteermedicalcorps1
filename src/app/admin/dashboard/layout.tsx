"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Megaphone, 
  Heart, 
  Users, 
  LogOut, 
  MessageSquare, 
  FolderKanban, 
  Newspaper 
} from "lucide-react";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/hero", label: "Hero Slides", icon: ImageIcon },
  { href: "/admin/dashboard/confessions", label: "Confessions", icon: MessageSquare },
  { href: "/admin/dashboard/marquee", label: "Marquee", icon: Megaphone },
  { href: "/admin/dashboard/campaigns", label: "Campaigns", icon: FolderKanban },
  { href: "/admin/dashboard/volunteers", label: "Volunteers", icon: Users },
  { href: "/admin/dashboard/news", label: "News", icon: Newspaper },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=" + encodeURIComponent(pathname));
    } else if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [status, session, router, pathname]);

  if (status === "loading" || !session || session.user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-[#002866] font-bold animate-pulse">Verifying Admin Session...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#002866] text-white flex flex-col fixed inset-y-0 shadow-2xl z-50">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex flex-col">
            <span className="text-xl font-black tracking-tighter uppercase leading-none">VMC</span>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Admin Portal</span>
          </Link>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
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
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 w-full px-4 py-3 text-white/70 hover:text-red-400 hover:bg-red-400/10 rounded-sm transition-all font-bold text-sm uppercase tracking-wider"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-8">
        <header className="flex justify-between items-center mb-10 bg-white p-6 rounded-sm shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-black text-[#002866] uppercase tracking-tight">
              {sidebarLinks.find(l => l.href === pathname)?.label || "Dashboard"}
            </h1>
            <p className="text-gray-400 text-xs font-bold uppercase mt-1">Welcome back, {session.user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#002866] leading-none">{session.user.name}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{session.user.role}</p>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-[#002866] font-black border-2 border-white shadow-sm">
              {session.user.name?.[0]?.toUpperCase() || "A"}
            </div>
          </div>
        </header>

        <div className="animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}

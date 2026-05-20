"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { FaUserCircle, FaSignOutAlt, FaBook } from "react-icons/fa";

export default function ElearnNav({ session }: { session: any }) {
  return (
    <>
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/elearn" className="text-sm font-bold text-text-muted hover:text-brand-primary dark:hover:text-brand-secondary transition-colors">Home</Link>
        <Link href="/elearn/courses" className="text-sm font-bold text-text-muted hover:text-brand-primary dark:hover:text-brand-secondary transition-colors">Courses</Link>
        <Link href="/portal" className="text-sm font-bold text-brand-secondary hover:underline transition-all">Back to Volunteer Portal</Link>
      </nav>

      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-4">
            <Link 
              href="/elearn/dashboard" 
              className="group relative overflow-hidden bg-brand-primary text-white px-6 py-2.5 font-bold text-sm transition-all flex items-center gap-2 shadow-lg"
            >
              <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              <span className="relative z-10 flex items-center gap-2 group-hover:text-brand-primary transition-colors">
                <FaBook />
                Dashboard
              </span>
            </Link>
            <div className="h-8 w-px bg-border-main hidden sm:block"></div>
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-text-muted hover:text-red-500 transition-colors p-2"
              title="Sign Out"
            >
              <FaSignOutAlt size={18} />
            </button>
          </div>
        ) : (
          <Link 
            href="/login" 
            className="group relative overflow-hidden bg-brand-primary text-white px-8 py-2.5 font-bold text-sm transition-all shadow-lg"
          >
            <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10 group-hover:text-brand-primary transition-colors">Sign In</span>
          </Link>
        )}
      </div>
    </>
  );
}

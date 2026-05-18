"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { FaUserCircle, FaSignOutAlt, FaBook } from "react-icons/fa";

export default function ElearnNav({ session }: { session: any }) {
  return (
    <>
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/elearn" className="text-sm font-bold text-slate-600 hover:text-[#002866]">Home</Link>
        <Link href="/elearn/courses" className="text-sm font-bold text-slate-600 hover:text-[#002866]">Courses</Link>
        <Link href="/portal" className="text-sm font-bold text-[#ff9f22] hover:underline">Back to Volunteer Portal</Link>
      </nav>

      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-4">
            <Link 
              href="/elearn/dashboard" 
              className="bg-[#002866] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#ff9f22] transition-all shadow-lg shadow-blue-900/10 flex items-center gap-2"
            >
              <FaBook />
              Dashboard
            </Link>
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-lg"
              title="Sign Out"
            >
              <FaSignOutAlt size={18} />
            </button>
          </div>
        ) : (
          <Link 
            href="/login" 
            className="bg-[#002866] text-white px-8 py-2.5 rounded-xl font-bold text-sm hover:bg-[#ff9f22] transition-all"
          >
            Sign In
          </Link>
        )}
      </div>
    </>
  );
}

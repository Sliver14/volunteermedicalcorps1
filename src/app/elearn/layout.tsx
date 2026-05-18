import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import ElearnNav from "@/components/ElearnNav";

export default async function ElearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-slate-50 font-poppins">
      {/* Simple E-learn Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/elearn" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-[#002866] rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:bg-[#ff9f22] transition-colors">V</div>
              <div>
                <h1 className="text-lg font-black text-[#002866] leading-none uppercase tracking-tighter">VMC Academy</h1>
                <p className="text-[10px] font-bold text-[#ff9f22] uppercase tracking-widest">E-Learning Portal</p>
              </div>
            </Link>
          </div>
          
          <ElearnNav session={session} />
        </div>
      </header>

      <main>{children}</main>

      {/* Simple E-learn Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm font-medium">© 2026 VMC Academy. Empowering Volunteers Worldwide.</p>
        </div>
      </footer>
    </div>
  );
}

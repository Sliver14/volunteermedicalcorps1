import React from "react";
import Link from "next/link";

export default async function ElearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 font-poppins">
      {/* Simple E-learn Header */}
      {/* <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
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
      </header> */}

      <main>{children}</main>
    </div>
  );
}

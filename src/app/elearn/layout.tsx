import React from "react";
import Link from "next/link";

export default async function ElearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-base font-poppins text-text-main">
      {/* Simple E-learn Header */}
      {/* <header className="bg-bg-surface border-b border-border-main sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/elearn" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:bg-brand-secondary transition-colors">V</div>
              <div>
                <h1 className="text-lg font-black text-brand-primary dark:text-brand-secondary leading-none uppercase tracking-tighter">VMC Academy</h1>
                <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest">E-Learning Portal</p>
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

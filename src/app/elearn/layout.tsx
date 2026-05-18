import React from "react";

export default function ElearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 font-poppins">
      {/* Simple E-learn Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#002866] rounded-xl flex items-center justify-center text-white font-black text-xl">V</div>
            <div>
              <h1 className="text-lg font-black text-[#002866] leading-none uppercase tracking-tighter">VMC Academy</h1>
              <p className="text-[10px] font-bold text-[#ff9f22] uppercase tracking-widest">E-Learning Portal</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="/elearn" className="text-sm font-bold text-slate-600 hover:text-[#002866]">Home</a>
            <a href="/elearn/courses" className="text-sm font-bold text-slate-600 hover:text-[#002866]">Courses</a>
            <a href="/portal" className="text-sm font-bold text-[#ff9f22] hover:underline">Back to Volunteer Portal</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="bg-[#002866] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#ff9f22] transition-all shadow-lg shadow-blue-900/10">
              My Learning
            </button>
          </div>
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

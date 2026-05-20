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

      {/* Detailed E-learn Footer */}
      <footer className="bg-[#1a1a1a] text-white pt-20 pb-10 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-xl font-black uppercase tracking-widest text-[#ff9f22]">Contact Us</h3>
              <ul className="space-y-4 text-slate-400 text-sm font-medium">
                <li className="flex items-start gap-3">
                  <span className="text-[#ff9f22] mt-1">📍</span>
                  29, Unity Road, Off Obafemi Awolowo Road, Ikeja, Lagos Nigeria
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#ff9f22]">📞</span>
                  +234 708 9267 186
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#ff9f22]">✉️</span>
                  learning@volunteermedicalcorps.org
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-black uppercase tracking-widest text-[#ff9f22]">Support</h3>
              <ul className="space-y-3 text-slate-400 text-sm font-medium">
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/faqs" className="hover:text-white transition-colors">FAQ's</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link href="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-black uppercase tracking-widest text-[#ff9f22]">Useful Link</h3>
              <ul className="space-y-3 text-slate-400 text-sm font-medium">
                <li><Link href="/elearn/students" className="hover:text-white transition-colors">Become a Student</Link></li>
                <li><Link href="/elearn/partners" className="hover:text-white transition-colors">Become a Partner</Link></li>
                <li><Link href="/elearn/instructors" className="hover:text-white transition-colors">Be an Instructor</Link></li>
                <li><Link href="/elearn/courses" className="hover:text-white transition-colors">Courses</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-black uppercase tracking-widest text-[#ff9f22]">Newsletter</h3>
              <p className="text-slate-400 text-sm">Subscribe to our newsletter for the latest updates.</p>
              <form className="space-y-4">
                <input type="email" placeholder="Enter your email" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-[#ff9f22] outline-none text-sm transition-all" />
                <button className="w-full bg-[#ff9f22] text-[#002866] py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#ff9f22] rounded-lg flex items-center justify-center text-[#002866] font-black">V</div>
              <span className="text-lg font-black tracking-tighter uppercase">VMC Academy</span>
            </div>
            <p className="text-slate-500 text-xs font-bold">© 2026 VMC Academy. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

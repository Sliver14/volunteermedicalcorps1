"use client";

import { motion } from "framer-motion";
import { FaUserGraduate, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

export default function ElearnLanding() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 min-h-[calc(100vh-80px)] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left Side: Info */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#002866] rounded-full text-sm font-black uppercase tracking-widest"
          >
            <FaUserGraduate className="text-blue-600" />
            Knowledge Saves Lives
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-[#002866] leading-tight"
          >
            Advance Your Skills with <span className="text-[#ff9f22]">VMC Academy</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-lg leading-relaxed"
          >
            Access specialized training for medical missions, disaster response, and humanitarian projects. Get certified and make a greater impact.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center font-bold">50+</div>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-tight">Specialized<br/>Courses</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">10k+</div>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-tight">Active<br/>Learners</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Auth Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-100"
        >
          <div className="flex gap-8 mb-10 border-b border-slate-100 pb-4">
            <button 
              onClick={() => setIsLogin(true)}
              className={`text-lg font-bold transition-all relative ${isLogin ? 'text-[#002866]' : 'text-slate-300'}`}
            >
              Login
              {isLogin && <motion.div layoutId="auth-tab" className="absolute -bottom-4 left-0 right-0 h-1 bg-[#ff9f22] rounded-full" />}
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`text-lg font-bold transition-all relative ${!isLogin ? 'text-[#002866]' : 'text-slate-300'}`}
            >
              Sign Up
              {!isLogin && <motion.div layoutId="auth-tab" className="absolute -bottom-4 left-0 right-0 h-1 bg-[#ff9f22] rounded-full" />}
            </button>
          </div>

          <form className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                <input type="text" className="w-full bg-slate-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-[#ff9f22] outline-none" placeholder="Enter your full name" />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
              <input type="email" className="w-full bg-slate-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-[#ff9f22] outline-none" placeholder="name@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Password</label>
              <input type="password" className="w-full bg-slate-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-[#ff9f22] outline-none" placeholder="••••••••" />
            </div>
            
            <Link href="/elearn/dashboard" className="w-full bg-[#002866] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all flex items-center justify-center gap-2 group">
              {isLogin ? 'Enter Academy' : 'Create Account'}
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="text-center pt-4">
              <a href="#" className="text-xs font-bold text-slate-400 hover:text-[#002866] transition-colors">Forgot your password?</a>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

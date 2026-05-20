"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaLock, FaEnvelope } from "react-icons/fa";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication for demonstration
    router.push("/envmc/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-primary p-4 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('/pmr-world-map.png')", backgroundSize: "cover", backgroundPosition: "center" }}></div>

      <div className="w-full max-w-md bg-bg-surface p-10 md:p-12 shadow-2xl relative z-10 border-t-8 border-brand-secondary">
        <div className="flex justify-center mb-10">
          <Image src="/logo.png" alt="VMC Logo" width={180} height={60} className="object-contain dark:brightness-110" />
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold text-center uppercase tracking-[0.2em] text-brand-primary dark:text-brand-secondary mb-3">Admin Portal</h2>
        <p className="text-center text-text-muted text-xs font-bold uppercase tracking-widest mb-10 opacity-70">Sign in to manage system</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted group-focus-within:text-brand-secondary transition-colors">
              <FaEnvelope />
            </div>
            <input 
              type="email" 
              required
              className="w-full pl-12 pr-4 py-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary transition-all text-sm font-medium text-text-main" 
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted group-focus-within:text-brand-secondary transition-colors">
              <FaLock />
            </div>
            <input 
              type="password" 
              required
              className="w-full pl-12 pr-4 py-4 bg-bg-base border border-border-main focus:outline-none focus:border-brand-secondary transition-all text-sm font-medium text-text-main" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="group relative overflow-hidden w-full bg-brand-secondary text-brand-primary font-bold uppercase tracking-[0.2em] py-5 transition-all shadow-xl text-xs md:text-sm"
          >
             <span className="absolute inset-0 bg-brand-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
             <span className="relative z-10 group-hover:text-white transition-colors">Access Dashboard</span>
          </button>
        </form>

        <div className="mt-10 text-center border-t border-border-main pt-8">
          <button 
            type="button" 
            onClick={() => router.push("/")}
            className="text-[10px] text-text-muted hover:text-brand-secondary uppercase tracking-[0.2em] font-bold transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            ← Return to Main Site
          </button>
        </div>
      </div>
    </div>
  );
}

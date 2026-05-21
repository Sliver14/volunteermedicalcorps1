"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaLock, FaEnvelope, FaSpinner } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid admin credentials");
        setLoading(false);
      } else {
        router.push("/envmc/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#002866] p-4 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('/pmr-world-map.png')", backgroundSize: "cover", backgroundPosition: "center" }}></div>

      <div className="w-full max-w-md bg-white p-10 md:p-12 shadow-2xl relative z-10 border-t-8 border-[#ff9f22]">
        <div className="flex justify-center mb-10">
          <Image src="/logo.png" alt="VMC Logo" width={180} height={60} className="object-contain" />
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold text-center uppercase tracking-[0.2em] text-[#002866] mb-3">Admin Portal</h2>
        <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest mb-10 opacity-70">Sign in to manage system</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#ff9f22] transition-colors">
              <FaEnvelope />
            </div>
            <input 
              type="email" 
              required
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 focus:outline-none focus:border-[#ff9f22] transition-all text-sm font-medium text-slate-900" 
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#ff9f22] transition-colors">
              <FaLock />
            </div>
            <input 
              type="password" 
              required
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 focus:outline-none focus:border-[#ff9f22] transition-all text-sm font-medium text-slate-900" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="group relative overflow-hidden w-full bg-[#ff9f22] text-[#002866] font-bold uppercase tracking-[0.2em] py-5 transition-all shadow-xl text-xs md:text-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
             <span className="absolute inset-0 bg-[#002866] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
             <span className="relative z-10 group-hover:text-white transition-colors flex items-center justify-center gap-3">
               {loading ? <FaSpinner className="animate-spin" /> : "Access Dashboard"}
             </span>
          </button>
        </form>

        <div className="mt-10 text-center border-t border-slate-100 pt-8">
          <button 
            type="button" 
            onClick={() => router.push("/")}
            className="text-[10px] text-slate-400 hover:text-[#ff9f22] uppercase tracking-[0.2em] font-bold transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            ← Return to Main Site
          </button>
        </div>
      </div>
    </div>
  );
}

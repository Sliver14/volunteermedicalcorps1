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
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#002866] p-4 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/pmr-world-map.png')", backgroundSize: "cover", backgroundPosition: "center" }}></div>

      <div className="w-full max-w-md bg-white p-10 rounded-md shadow-2xl relative z-10 border-t-4 border-[#ff9f22]">
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="VMC Logo" width={180} height={60} className="object-contain" />
        </div>
        
        <h2 className="text-2xl font-black text-center uppercase tracking-widest text-[#002866] mb-2">Admin Portal</h2>
        <p className="text-center text-gray-500 text-sm mb-8">Sign in to manage your dashboard</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <FaEnvelope />
            </div>
            <input 
              type="email" 
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-[#002866] focus:ring-1 focus:ring-[#002866] transition-colors" 
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <FaLock />
            </div>
            <input 
              type="password" 
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-[#002866] focus:ring-1 focus:ring-[#002866] transition-colors" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#ff9f22] text-[#002866] font-black uppercase tracking-widest py-4 rounded-sm hover:bg-[#002866] hover:text-white transition-colors"
          >
            Access Dashboard
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            type="button" 
            onClick={() => router.push("/")}
            className="text-xs text-gray-400 hover:text-[#002866] uppercase tracking-widest font-bold transition-colors"
          >
            ← Return to Main Site
          </button>
        </div>
      </div>
    </div>
  );
}
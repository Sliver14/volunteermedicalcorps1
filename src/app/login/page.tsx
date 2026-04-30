"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import PageBanner from "@/components/PageBanner";

import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="w-full bg-gray-50 font-roboto min-h-screen">
      <PageBanner title="Login to VMC" />
      
      <section className="py-16 md:py-24">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <Suspense fallback={
            <div className="bg-white p-6 md:p-12 shadow-xl border-t-4 border-[#002866] rounded-sm text-center">
              <p className="text-[#002866] font-bold animate-pulse">Loading login form...</p>
            </div>
          }>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/portal";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
        setLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="bg-white p-6 md:p-12 shadow-xl border-t-4 border-[#002866] rounded-sm"
    >
      <h3 className="text-2xl font-poppins font-bold mb-8 uppercase text-[#002866] text-center">Member Login</h3>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm focus:outline-none focus:border-[#002866] focus:ring-1 focus:ring-[#002866]" 
            placeholder="name@example.com"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 uppercase mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 p-4 rounded-sm focus:outline-none focus:border-[#002866] focus:ring-1 focus:ring-[#002866]" 
            placeholder="••••••••"
            required 
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-[#002866] focus:ring-[#002866] border-gray-300 rounded" />
            <label className="ml-2 text-sm text-gray-600">Remember me</label>
          </div>
          <Link href="#" className="text-sm text-[#002866] font-bold hover:underline">Forgot Password?</Link>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="block w-full bg-[#002866] text-white py-5 font-bold uppercase tracking-widest hover:bg-[#ff9f22] hover:text-[#002866] transition-all rounded-sm text-center disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login Now"}
        </button>
      </form>
      
      <div className="mt-8 text-center text-sm text-gray-600">
        Don&apos;t have an account yet? <Link href="/register" className="text-[#002866] font-bold hover:underline">Sign up for free</Link>.
      </div>
    </motion.div>
  );
}

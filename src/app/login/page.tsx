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
    <div className="w-full bg-bg-base font-roboto min-h-screen transition-colors duration-300">
      <PageBanner title="Login to VMC" />
      
      <section className="py-16 md:py-24">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <Suspense fallback={
            <div className="bg-bg-surface p-6 md:p-12 shadow-xl border-t-4 border-brand-primary rounded-sm text-center">
              <p className="text-brand-primary font-bold animate-pulse">Loading login form...</p>
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
      transition={{ duration: 0.4 }}
      className="bg-bg-surface p-6 md:p-12 shadow-xl border-t-4 border-brand-primary rounded-sm transition-colors duration-300"
    >
      <h3 className="text-2xl font-poppins font-bold mb-8 uppercase text-brand-primary dark:text-brand-secondary text-center transition-colors">Member Login</h3>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-text-main uppercase mb-2">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-bg-base border border-border-main p-4 rounded-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-text-main transition-colors duration-300" 
            placeholder="name@example.com"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-text-main uppercase mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-bg-base border border-border-main p-4 rounded-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-text-main transition-colors duration-300" 
            placeholder="••••••••"
            required 
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-border-main rounded bg-bg-base" />
            <label className="ml-2 text-sm text-text-muted">Remember me</label>
          </div>
          <Link href="#" className="text-sm text-brand-primary dark:text-brand-secondary font-bold hover:underline transition-colors">Forgot Password?</Link>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="block w-full bg-brand-primary text-white py-5 font-bold uppercase tracking-widest hover:bg-brand-secondary hover:text-brand-primary transition-all rounded-sm text-center disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login Now"}
        </button>
      </form>
      
      <div className="mt-8 text-center text-sm text-text-muted">
        Don&apos;t have an account yet? <Link href="/register" className="text-brand-primary dark:text-brand-secondary font-bold hover:underline transition-colors">Sign up for free</Link>.
      </div>
    </motion.div>
  );
}

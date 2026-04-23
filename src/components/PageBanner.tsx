"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface PageBannerProps {
  title: string;
  parent?: { label: string; href: string };
}

export default function PageBanner({ title, parent }: PageBannerProps) {
  return (
    <section className="relative bg-[#002866] py-4 md:py-5 text-white overflow-hidden border-b border-[#001f52]">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute -top-10 -right-10 w-32 h-32 border-[10px] border-white rounded-full"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 border-[15px] border-[#ff9f22] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between gap-4">
        <motion.h1 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-lg md:text-xl font-poppins font-black uppercase tracking-tight leading-none"
        >
          {title}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
          className="flex items-center space-x-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-300 whitespace-nowrap"
        >
          <Link href="/" className="hover:text-[#ff9f22] transition-colors">Home</Link>
          <span className="text-gray-600">/</span>
          {parent && (
            <>
              <Link href={parent.href} className="hover:text-[#ff9f22] transition-colors hidden sm:inline">{parent.label}</Link>
              <span className="text-gray-600 hidden sm:inline">/</span>
            </>
          )}
          <span className="text-[#ff9f22] truncate max-w-[150px] sm:max-w-none">{title}</span>
        </motion.div>
      </div>
    </section>
  );
}

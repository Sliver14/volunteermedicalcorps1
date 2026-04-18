"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface PageBannerProps {
  title: string;
  parent?: { label: string; href: string };
}

export default function PageBanner({ title, parent }: PageBannerProps) {
  return (
    <section className="relative bg-[#002866] py-20 text-white overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff9f22] rounded-full -ml-48 -mb-48"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-poppins font-bold uppercase mb-4 tracking-tight"
        >
          {title}
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex items-center space-x-2 text-sm font-medium"
        >
          <Link href="/" className="text-gray-300 hover:text-[#ff9f22] transition-colors">Home</Link>
          <span className="text-gray-500">/</span>
          {parent && (
            <>
              <Link href={parent.href} className="text-gray-300 hover:text-[#ff9f22] transition-colors">{parent.label}</Link>
              <span className="text-gray-500">/</span>
            </>
          )}
          <span className="text-[#ff9f22]">{title}</span>
        </motion.div>
      </div>
    </section>
  );
}

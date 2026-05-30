"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  parent?: { label: string; href: string };
}

export default function PageBanner({ title, subtitle, parent }: PageBannerProps) {
  const isMobile = useIsMobile();

  return (
    <section className="relative bg-brand-primary py-4 md:py-8 text-white overflow-hidden border-b border-border-main transition-colors duration-300">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute -top-10 -right-10 w-32 h-32 border-[10px] border-white"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 border-[15px] border-brand-secondary"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <motion.h1 
            initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: isMobile ? 0.35 : 0.6, ease: "easeOut" }}
            className="text-md md:text-xl font-bold uppercase tracking-tight leading-none"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="text-[10px] md:text-xs font-medium uppercase tracking-[0.15em]"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        
        <motion.div 
          initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: isMobile ? 0.35 : 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex items-center space-x-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-300 whitespace-nowrap"
        >
          <Link href="/" className="hover:text-brand-secondary transition-colors">Home</Link>
          <span className="text-gray-600">/</span>
          {parent && (
            <>
              <Link href={parent.href} className="hover:text-brand-secondary transition-colors hidden sm:inline">{parent.label}</Link>
              <span className="text-gray-600 hidden sm:inline">/</span>
            </>
          )}
          <span className="text-brand-secondary truncate max-w-[150px] sm:max-w-none">{title}</span>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const navigation = [
    { label: "Home", href: "/" },
    { 
      label: "About Us", 
      href: "/about",
      subItems: [
        { label: "Our Story", href: "/our-story" },
        { label: "Board of Trustees", href: "/board-of-trustees" },
        { label: "Annual Reports", href: "/annual-reports" },
      ]
    },
    { 
      label: "What We Do", 
      href: "/humanitarian-projects",
      subItems: [
        { label: "Good Deeds Campaigns", href: "/good-deeds-campaigns" },
        { label: "Medical Projects", href: "/medical-projects" },
        { label: "Humanitarian Projects", href: "/humanitarian-projects" },
        { label: "VMC Academy", href: "/elearn" },
      ]
    },
    { 
      label: "Campaigns", 
      href: "/campaigns",
      subItems: [
        { label: "1 Million Smiles", href: "/1-million-smiles" },
        { label: "Global Hospital Outreach", href: "/ghoc" },
        { label: "Praying Medics", href: "/global-prayer" },
      ]
    },
    { 
      label: "Media", 
      href: "/news",
      subItems: [
        { label: "News", href: "/news" },
        { label: "Blog", href: "/blog" },
        { label: "Events", href: "/events" },
        { label: "Gallery", href: "/gallery" },
        { label: "Video Gallery", href: "/video-gallery" },
        { label: "Testimonials", href: "/testimonials" },
      ]
    },
    { label: "Live stream", href: "/tv" },
  ];

  return (
    <>
      <header className="w-full bg-bg-surface border-b border-border-main sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-20 md:h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" onClick={() => setIsMobileOpen(false)}>
                <Image src="/logo.png" alt="Logo" width={180} height={60} className="object-contain w-32 md:w-[180px] dark:brightness-110 transition-all" priority />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center h-full">
              {navigation.map((item) => {
                const isActive = 
                  pathname === item.href || 
                  activeDropdown === item.label ||
                  (item.subItems && item.subItems.some(sub => pathname.startsWith(sub.href)));
                
                return (
                  <div 
                    key={item.label} 
                    className="relative flex items-center h-full"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link 
                      href={item.href} 
                      className={`flex items-center px-5 h-full text-text-main text-sm tracking-wide transition-all
                        ${isActive ? 'bg-brand-secondary text-brand-primary' : 'hover:bg-brand-secondary hover:text-brand-primary'}`}
                    >
                      {item.label}
                      {item.subItems && <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>}
                    </Link>

                    {item.subItems && (
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 w-64 bg-bg-surface shadow-2xl border-t-2 border-brand-secondary py-2"
                          >
                            {item.subItems.map((sub) => (
                              <Link key={sub.label} href={sub.href} className="block px-6 py-3 text-sm text-text-main hover:bg-brand-primary/5 hover:pl-8 transition-all">
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex h-18 items-center gap-4">
              <ThemeToggle />
              <Link href="/login" className="text-text-main text-[13px] uppercase tracking-wider hover:text-brand-secondary transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Member Portal
              </Link>
              <Link 
                href="/give" 
                className="group relative overflow-hidden bg-brand-primary dark:bg-brand-secondary 
                          text-white dark:text-brand-primary uppercase h-full px-8 py-3 
                          flex items-center justify-center font-bold text-[12px] tracking-widest 
                          transition-all duration-300"
              >
                {/* Sliding Background */}
                <span className="absolute inset-0 bg-brand-secondary dark:bg-brand-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                
                {/* Centered Text */}
                <span className="relative z-10 group-hover:text-brand-primary dark:group-hover:text-white transition-colors">
                  Give Now
                </span>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="lg:hidden flex items-center gap-3">
              <button 
                className="text-text-main p-2 focus:outline-none"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle Menu"
              >
                {isMobileOpen ? (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Improved Mobile Menu Drawer */}
        <div className={`lg:hidden fixed inset-0 top-20 bg-bg-surface z-40 transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col h-full overflow-y-auto pb-32">
            {navigation.map((item) => (
              <div key={item.label} className="border-b border-border-main">
                <div className="flex justify-between items-center pr-4">
                  <Link 
                    href={item.href} 
                    className="block flex-1 px-6 py-5 text-text-main font-semibold text-lg tracking-wide"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.subItems && (
                    <button 
                      onClick={() => setOpenSubMenu(openSubMenu === item.label ? null : item.label)}
                      className="p-4 text-brand-secondary"
                    >
                      <svg className={`w-5 h-5 transition-transform duration-200 ${openSubMenu === item.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Collapsible Sub-menu */}
                {item.subItems && (
                  <AnimatePresence>
                    {openSubMenu === item.label && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-bg-base overflow-hidden"
                      >
                        {item.subItems.map((sub) => (
                          <Link 
                            key={sub.label} 
                            href={sub.href}
                            className="block px-10 py-4 text-base font-semibold text-text-muted hover:text-brand-primary border-b border-border-main last:border-0"
                            onClick={() => setIsMobileOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            {/* Mobile Actions (Moved beneath navigation) */}
            <div className="p-6 flex flex-col gap-6">
              {/* Theme Toggle in Mobile Sidebar */}
              <div className="flex items-center justify-between px-2">
                <span className="text-text-main font-bold uppercase tracking-widest text-sm">Switch Theme</span>
                <ThemeToggle />
              </div>

              {/* Auth Links */}
              <div className="flex flex-col gap-3">
                <Link 
                  href="/login" 
                  className="group relative overflow-hidden w-full bg-brand-primary text-white py-4 font-bold uppercase tracking-widest text-center text-sm shadow-md"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                  <span className="relative z-10 group-hover:text-brand-primary transition-colors">Member Login</span>
                </Link>
                <Link 
                  href="/register" 
                  className="group relative overflow-hidden w-full bg-bg-surface border-2 border-brand-primary text-text-main py-4 font-bold uppercase tracking-widest text-center text-sm"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span className="absolute inset-0 bg-brand-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                  <span className="relative z-10 group-hover:text-white transition-colors">Become a Volunteer</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Sticky Footer (Synchronized with Drawer State) */}
      <div className={`lg:hidden fixed bottom-0 left-0 w-full h-[52px] bg-brand-primary flex items-center justify-between px-4 z-50 transition-transform duration-300 ${isMobileOpen ? 'translate-y-20' : 'translate-y-0'}`}>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white p-1.5 border-2 border-brand-primary -mt-6 shadow-lg active:scale-90 transition-transform"
        >
          {isMobileOpen ? (
             <svg className="w-7 h-7 text-brand-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
             </svg>
          ) : (
            <svg className="w-7 h-7 text-brand-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        <Link href="/give" className="text-white font-bold tracking-[0.2em] text-[13px] flex-1 text-center pr-6 uppercase" onClick={() => setIsMobileOpen(false)}>
            Give Now
        </Link>
      </div>
    </>
  );
}
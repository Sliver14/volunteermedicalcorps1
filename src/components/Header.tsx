"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

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
        { label: "Our Story", href: "/about/our-story" },
        { label: "Board of Trustees", href: "/about/board-of-trustees" },
        { label: "Annual Reports", href: "/about/annual-reports" },
      ]
    },
    { 
      label: "What We Do", 
      href: "/causes/humanitarian-projects",
      subItems: [
        { label: "Good Deeds Campaigns", href: "/causes/good-deeds-campaigns" },
        { label: "Medical Projects", href: "/causes/medical-projects" },
        { label: "Humanitarian Projects", href: "/causes/humanitarian-projects" },
        { label: "VMC Academy", href: "/causes/vmc-academy" },
      ]
    },
    { 
      label: "Campaigns", 
      href: "/campaigns",
      subItems: [
        { label: "1 Million Smiles", href: "/campaigns/1-million-smiles" },
        { label: "Global Hospital Outreach", href: "/campaigns/ghoc" },
        { label: "Praying Medics", href: "/campaigns/global-prayer" },
      ]
    },
    { 
      label: "Media", 
      href: "/media/news",
      subItems: [
        { label: "News", href: "/media/news" },
        { label: "Blog", href: "/media/blog" },
        { label: "Gallery", href: "/media/gallery" },
        { label: "Video Gallery", href: "/media/video-gallery" },
      ]
    },
    { label: "Live", href: "/live" },
  ];

  return (
    <>
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-20 md:h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" onClick={() => setIsMobileOpen(false)}>
                <Image src="/logo.png" alt="Logo" width={180} height={60} className="object-contain w-32 md:w-[180px]" priority />
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
                      className={`flex items-center px-5 h-full text-[#002866] font-semibold text-[15px] tracking-wider transition-all
                        ${isActive ? 'bg-[#FFEE00]' : 'hover:bg-[#FFEE00]'}`}
                    >
                      {item.label}
                      {item.subItems && <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>}
                    </Link>

                    {item.subItems && activeDropdown === item.label && (
                      <div className="absolute top-full left-0 w-64 bg-white shadow-2xl border-t-4 border-[#FFEE00] py-2">
                        {item.subItems.map((sub) => (
                          <Link key={sub.label} href={sub.href} className="block px-6 py-3 text-[14px] font-semibold text-[#002866] hover:bg-gray-50 hover:pl-8 transition-all">
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Donate Now Button (Desktop) */}
            <div className="hidden lg:block h-18">
              <Link href="/donate" className="bg-[#002866] text-white uppercase h-full px-10 flex items-center font-semibold text-[15px] tracking-widest hover:bg-[#FFEE00] hover:text-[#002866] transition-all">
                Donate Now
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="lg:hidden flex items-center">
              <button 
                className="text-[#002866] p-2 focus:outline-none"
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
        <div className={`lg:hidden fixed inset-0 top-20 bg-white z-40 transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col h-full overflow-y-auto pb-32">
            {navigation.map((item) => (
              <div key={item.label} className="border-b border-gray-100">
                <div className="flex justify-between items-center pr-4">
                  <Link 
                    href={item.href} 
                    className="block flex-1 px-6 py-5 text-[#002866] font-semibold text-lg tracking-wide"
                    onClick={() => !item.subItems && setIsMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.subItems && (
                    <button 
                      onClick={() => setOpenSubMenu(openSubMenu === item.label ? null : item.label)}
                      className="p-4 text-[#002866]"
                    >
                      <svg className={`w-5 h-5 transition-transform duration-200 ${openSubMenu === item.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Collapsible Sub-menu */}
                {item.subItems && (
                  <div className={`bg-gray-50 overflow-hidden transition-all duration-300 ${openSubMenu === item.label ? 'max-h-96' : 'max-h-0'}`}>
                    {item.subItems.map((sub) => (
                      <Link 
                        key={sub.label} 
                        href={sub.href}
                        className="block px-10 py-4 text-base font-semibold text-gray-600 hover:text-[#002866] border-b border-gray-200 last:border-0"
                        onClick={() => setIsMobileOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Sticky Footer (Synchronized with Drawer State) */}
      <div className={`lg:hidden fixed bottom-0 left-0 w-full h-[52px] bg-[#002866] flex items-center justify-between px-4 z-50 transition-transform duration-300 ${isMobileOpen ? 'translate-y-20' : 'translate-y-0'}`}>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white rounded-full p-1.5 border-2 border-[#002866] -mt-6 shadow-lg active:scale-90 transition-transform"
        >
          {isMobileOpen ? (
             <svg className="w-7 h-7 text-[#002866]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
             </svg>
          ) : (
            <svg className="w-7 h-7 text-[#002866]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        <Link href="/donate" className="text-white font-black tracking-[0.2em] text-[13px] flex-1 text-center pr-6">
            Donate Now
        </Link>
      </div>
    </>
  );
}
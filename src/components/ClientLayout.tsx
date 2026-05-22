"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Providers from "./Providers";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDashboard = pathname?.startsWith('/envmc') || 
                      pathname?.startsWith('/portal') || 
                      pathname?.startsWith('/elearn') ||
                      pathname?.startsWith('/sponsor');

  // Instant scroll to top on route change
  useEffect(() => {
    if (mounted) {
      window.scrollTo(0, 0);
    }
  }, [pathname, mounted]);

  // Prevent hydration mismatch flicker by ensuring consistent initial render
  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-bg-base">
        <div className="flex-grow" />
      </div>
    );
  }

  return (
    <Providers>
      <NextTopLoader 
        color="#ff9f22"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #ff9f22,0 0 5px #ff9f22"
      />
      {!isDashboard && <Header />}
      <main className="flex-grow bg-bg-base flex flex-col transition-colors duration-300">
        {children}
      </main>
      {!isDashboard && <Footer />}
    </Providers>
  );
}
"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Providers from "./Providers";
import NextTopLoader from "nextjs-toploader";
import { motion, AnimatePresence } from "framer-motion";

import { useEffect } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/envmc') || 
                      pathname?.startsWith('/portal') || 
                      pathname?.startsWith('/elearn') ||
                      pathname?.startsWith('/sponsor');

  // Instant scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-grow flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      {!isDashboard && <Footer />}
    </Providers>
  );
}
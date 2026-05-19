"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Providers from "./Providers";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/envmc') || pathname?.startsWith('/portal') || pathname?.startsWith('/elearn');

  return (
    <Providers>
      {!isDashboard && <Header />}
      <main className="flex-grow bg-bg-base flex flex-col transition-colors duration-300">
        {children}
      </main>
      {!isDashboard && <Footer />}
    </Providers>
  );
}
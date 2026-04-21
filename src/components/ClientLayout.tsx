"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/admin') || pathname?.startsWith('/portal');

  return (
    <>
      {!isDashboard && <Header />}
      <main className="flex-grow bg-gray-50 flex flex-col">
        {children}
      </main>
      {!isDashboard && <Footer />}
    </>
  );
}
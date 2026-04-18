import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"], 
  variable: '--font-poppins' 
});

const roboto = Roboto({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700"], 
  variable: '--font-roboto' 
});

export const metadata: Metadata = {
  title: "Volunteer Medical Corps",
  description: "To provide the best and most suitable medical aid to communities and persons in need.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.variable} font-sans antialiased min-h-screen flex flex-col text-gray-800`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

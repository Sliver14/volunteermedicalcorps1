"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import PageBanner from "@/components/PageBanner";
import { motion } from "framer-motion";

// Mock data generation for pagination demonstration
const allCampaigns = [
  // Nigeria (Lots of entries for pagination)
  { id: 1, title: "Lagos Medical Outreach", country: "Nigeria", date: "Oct 2023", image: "/sw-post-3-min-300x200.jpg", category: "Medical Projects" },
  { id: 5, title: "Abuja Disaster Relief", country: "Nigeria", date: "Feb 2024", image: "/vcn-post-7-min-768x512.jpg", category: "Relief Missions" },
  { id: 10, title: "Kano Vaccination Drive", country: "Nigeria", date: "Apr 2024", image: "/give-15-768x512.jpg", category: "Medical Projects" },
  { id: 11, title: "Port Harcourt Eye Clinic", country: "Nigeria", date: "May 2024", image: "/give-17-300x200.jpg", category: "Medical Projects" },
  { id: 12, title: "Ibadan Blood Donation", country: "Nigeria", date: "Jun 2024", image: "/sw-post-1-min-768x512.jpg", category: "Good Deeds" },
  { id: 13, title: "Enugu Hygiene Workshop", country: "Nigeria", date: "Jul 2024", image: "/give-20-768x512.jpg", category: "VMC Academy" },
  { id: 14, title: "Jos Emergency Response", country: "Nigeria", date: "Aug 2024", image: "/sw-post-3-min-300x200.jpg", category: "Relief Missions" },
  { id: 15, title: "Kaduna Maternal Health", country: "Nigeria", date: "Sep 2024", image: "/give-15-768x512.jpg", category: "Medical Projects" },
  { id: 16, title: "Benin Malaria Awareness", country: "Nigeria", date: "Oct 2024", image: "/vcn-post-7-min-768x512.jpg", category: "Good Deeds" },
  
  // Ghana
  { id: 2, title: "Accra Hygiene Drive", country: "Ghana", date: "Nov 2023", image: "/give-17-300x200.jpg", category: "Good Deeds" },
  { id: 17, title: "Kumasi Dental Care", country: "Ghana", date: "Dec 2023", image: "/sw-post-1-min-768x512.jpg", category: "Medical Projects" },
  
  // South Africa
  { id: 3, title: "Johannesburg Free Surgery", country: "South Africa", date: "Dec 2023", image: "/give-15-768x512.jpg", category: "Medical Projects" },
  { id: 18, title: "Cape Town Youth Wellness", country: "South Africa", date: "Jan 2024", image: "/give-20-768x512.jpg", category: "Good Deeds" },
  { id: 19, title: "Durban Health Screening", country: "South Africa", date: "Feb 2024", image: "/sw-post-3-min-300x200.jpg", category: "Medical Projects" },

  // Kenya
  { id: 4, title: "Nairobi Mother & Baby Kit", country: "Kenya", date: "Jan 2024", image: "/sw-post-1-min-768x512.jpg", category: "Relief Missions" },
  { id: 20, title: "Mombasa Clean Water Initiative", country: "Kenya", date: "Mar 2024", image: "/give-17-300x200.jpg", category: "Good Deeds" },

  // United Kingdom
  { id: 6, title: "London Fundraising Gala", country: "United Kingdom", date: "Mar 2024", image: "/give-20-768x512.jpg", category: "Global Prayer" },
];

const ITEMS_PER_PAGE = 6;

import { Suspense } from "react";

export default function CampaignSearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-[#002866] font-bold">Loading campaigns...</p>
      </div>
    }>
      <CampaignSearchContent />
    </Suspense>
  );
}

function CampaignSearchContent() {
  const searchParams = useSearchParams();
  const countryQuery = searchParams.get("country");
  
  const [currentPage, setCurrentPage] = useState(1);

  // Filter campaigns based on query
  const filteredCampaigns = useMemo(() => {
    if (!countryQuery) return [];
    return allCampaigns.filter(c => c.country.toLowerCase() === countryQuery.toLowerCase());
  }, [countryQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);
  const paginatedCampaigns = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCampaigns.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCampaigns, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageBanner title={`Campaigns in ${countryQuery || "..."}`} parent={{ label: "Campaigns", href: "/campaigns" }} />

      <main className="flex-grow py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="mb-12 flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-sm shadow-sm border border-gray-100"
          >
            <h2 className="text-[#002866] text-2xl font-black uppercase mb-4 md:mb-0">
              {countryQuery ? `Results for "${countryQuery}"` : "Please select a country"}
            </h2>
            <p className="text-gray-500 font-medium">
              Found {filteredCampaigns.length} campaigns
            </p>
          </motion.div>

          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-sm shadow-sm border border-gray-100">
              <p className="text-xl text-gray-500 mb-6">No campaigns found for this region.</p>
              <Link 
                href="/"
                className="inline-block bg-[#ff9f22] text-[#002866] px-8 py-3 font-bold uppercase tracking-widest hover:bg-[#002866] hover:text-white transition-all"
              >
                Go Back Home
              </Link>
            </div>
          ) : (
            <>
              {/* Campaign Grid */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {}
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
              >
                {paginatedCampaigns.map((camp) => (
                  <motion.div 
                    key={camp.id} 
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    className="bg-white rounded-sm overflow-hidden shadow-md group border border-gray-100 flex flex-col"
                  >
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image 
                        src={camp.image} 
                        alt={camp.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute top-4 left-4 bg-[#ff9f22] text-[#002866] text-[10px] font-black uppercase px-3 py-1 shadow-sm">
                        {camp.category}
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{camp.date}</p>
                      <h3 className="text-xl font-bold font-poppins text-[#002866] mb-4 hover:text-blue-900 transition-colors">
                        {camp.title}
                      </h3>
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <Link 
                          href="/donate" 
                          className="text-[#002866] text-[12px] font-black uppercase tracking-widest border-b-2 border-gray-200 pb-1 hover:border-[#002866] transition-all"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border-2 border-[#002866] text-[#002866] font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#002866] hover:text-white transition-colors"
                  >
                    PREV
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const page = idx + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 flex items-center justify-center font-bold border-2 transition-colors ${
                          currentPage === page 
                            ? 'bg-[#002866] text-white border-[#002866]' 
                            : 'text-[#002866] border-transparent hover:border-[#002866]'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border-2 border-[#002866] text-[#002866] font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#002866] hover:text-white transition-colors"
                  >
                    NEXT
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
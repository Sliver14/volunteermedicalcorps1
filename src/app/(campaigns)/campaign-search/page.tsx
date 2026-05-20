"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect, Suspense } from "react";
import PageBanner from "@/components/PageBanner";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

// Mock data generation
const allCampaigns = [
  // Nigeria
  { id: 1, title: "Lagos Medical Outreach", country: "Nigeria", region: "Nigeria", date: "Oct 2023", image: "https://volunteermedicalcorps.org/admin/images/campaigns/e5cjrn3mD326785419.jpg", category: "Medical Projects" },
  { id: 5, title: "Abuja Disaster Relief", country: "Nigeria", region: "Nigeria", date: "Feb 2024", image: "https://volunteermedicalcorps.org/admin/images/gallery/798453-1.jpg", category: "Relief Missions" },
  { id: 10, title: "Kano Vaccination Drive", country: "Nigeria", region: "Nigeria", date: "Apr 2024", image: "https://volunteermedicalcorps.org/admin/images/gallery/173895-bronx3.jpg", category: "Medical Projects" },
  { id: 11, title: "Port Harcourt Eye Clinic", country: "Nigeria", region: "Nigeria", date: "May 2024", image: "https://volunteermedicalcorps.org/admin/images/gallery/591783-2.jpg", category: "Medical Projects" },
  { id: 12, title: "Ibadan Blood Donation", country: "Nigeria", region: "Nigeria", date: "Jun 2024", image: "https://volunteermedicalcorps.org/admin/images/campaigns/VvjfzE9kJ596372148.jpg", category: "Good Deeds" },
  { id: 13, title: "Enugu Hygiene Workshop", country: "Nigeria", region: "Nigeria", date: "Jul 2024", image: "https://volunteermedicalcorps.org/admin/images/media/onrZbfR8N463291785.jpg", category: "VMC Academy" },
  { id: 14, title: "Jos Emergency Response", country: "Nigeria", region: "Nigeria", date: "Aug 2024", image: "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg", category: "Relief Missions" },
  { id: 15, title: "Kaduna Maternal Health", country: "Nigeria", region: "Nigeria", date: "Sep 2024", image: "https://volunteermedicalcorps.org/admin/images/campaigns/e5cjrn3mD326785419.jpg", category: "Medical Projects" },
  { id: 16, title: "Benin Malaria Awareness", country: "Nigeria", region: "Nigeria", date: "Oct 2024", image: "https://volunteermedicalcorps.org/admin/images/gallery/429831-3a.jpg", category: "Good Deeds" },
  
  // Ghana
  { id: 2, title: "Accra Hygiene Drive", country: "Ghana", region: "Africa", date: "Nov 2023", image: "https://volunteermedicalcorps.org/admin/images/campaigns/VvjfzE9kJ596372148.jpg", category: "Good Deeds" },
  { id: 17, title: "Kumasi Dental Care", country: "Ghana", region: "Africa", date: "Dec 2023", image: "https://volunteermedicalcorps.org/admin/images/campaigns/VvjfzE9kJ596372148.jpg", category: "Medical Projects" },
  
  // South Africa
  { id: 3, title: "Johannesburg Free Surgery", country: "South Africa", region: "Africa", date: "Dec 2023", image: "https://volunteermedicalcorps.org/admin/images/gallery/173895-bronx3.jpg", category: "Medical Projects" },
  { id: 18, title: "Cape Town Youth Wellness", country: "South Africa", region: "Africa", date: "Jan 2024", image: "https://volunteermedicalcorps.org/admin/images/campaigns/VvjfzE9kJ596372148.jpg", category: "Good Deeds" },
  { id: 19, title: "Durban Health Screening", country: "South Africa", region: "Africa", date: "Feb 2024", image: "https://volunteermedicalcorps.org/admin/images/gallery/591783-2.jpg", category: "Medical Projects" },

  // Kenya
  { id: 4, title: "Nairobi Mother & Baby Kit", country: "Kenya", region: "Africa", date: "Jan 2024", image: "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg", category: "Relief Missions" },
  { id: 20, title: "Mombasa Clean Water Initiative", country: "Kenya", region: "Africa", date: "Mar 2024", image: "https://volunteermedicalcorps.org/admin/images/gallery/798453-1.jpg", category: "Good Deeds" },

  // United Kingdom
  { id: 6, title: "London Fundraising Gala", country: "United Kingdom", region: "Europe", date: "Mar 2024", image: "https://volunteermedicalcorps.org/admin/images/campaigns/e5cjrn3mD326785419.jpg", category: "Global Prayer" },
];

const ITEMS_PER_PAGE = 6;

export default function CampaignSearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <p className="text-brand-primary dark:text-brand-secondary font-bold uppercase tracking-widest animate-pulse">Loading campaigns...</p>
      </div>
    }>
      <CampaignSearchContent />
    </Suspense>
  );
}

function CampaignSearchContent() {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const countryQuery = searchParams.get("country");
  const regionQuery = searchParams.get("region");
  const query = regionQuery || countryQuery;
  
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page on query change
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // Filter campaigns based on query
  const filteredCampaigns = useMemo(() => {
    if (!query) return [];
    return allCampaigns.filter(c => 
      c.region.toLowerCase() === query.toLowerCase() || 
      c.country.toLowerCase() === query.toLowerCase() ||
      (query.toLowerCase() === "africa" && c.region.toLowerCase() === "nigeria") 
    );
  }, [query]);

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
    <div className="min-h-screen bg-bg-base font-roboto flex flex-col transition-colors duration-300">
      <PageBanner title={`Campaigns in ${query || "..."}`} parent={{ label: "Campaigns", href: "/campaigns" }} />

      <main className="flex-grow py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="mb-12 flex flex-col md:flex-row justify-between items-center bg-bg-surface p-6 md:p-8 border border-border-main shadow-sm"
          >
            <h2 className="text-brand-primary dark:text-brand-secondary text-xl md:text-2xl font-bold uppercase tracking-tight mb-4 md:mb-0">
              {query ? `Results for "${query}"` : "Search Results"}
            </h2>
            <p className="text-text-muted font-bold text-xs uppercase tracking-widest opacity-70">
              Found {filteredCampaigns.length} campaigns
            </p>
          </motion.div>

          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-24 bg-bg-surface border border-border-main shadow-sm">
              <p className="text-lg text-text-muted mb-8 font-medium">No campaigns found for this region.</p>
              <Link 
                href="/campaigns"
                className="group relative overflow-hidden inline-block bg-brand-secondary text-brand-primary px-8 py-3 font-bold uppercase tracking-widest text-xs shadow-xl transition-all"
              >
                 <span className="absolute inset-0 bg-brand-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                 <span className="relative z-10 group-hover:text-white transition-colors">Go Back Home</span>
              </Link>
            </div>
          ) : (
            <>
              {/* Campaign Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {paginatedCampaigns.map((camp, index) => (
                  <motion.div 
                    key={camp.id} 
                    initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: (index % 3) * 0.1 }}
                    className="bg-bg-surface overflow-hidden shadow-md hover:shadow-2xl group border border-border-main flex flex-col transition-all duration-300"
                  >
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image 
                        src={camp.image} 
                        alt={camp.title} 
                        fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                        className="object-cover group-hover:scale-110 transition-transform duration-400" 
                        unoptimized
                      />
                      <div className="absolute top-4 left-4 bg-brand-secondary text-brand-primary text-[10px] font-bold uppercase px-3 py-1 shadow-md">
                        {camp.category}
                      </div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                      <p className="text-text-muted text-[10px] font-bold uppercase tracking-[0.2em] mb-3 opacity-60">{camp.date}</p>
                      <h3 className="text-lg md:text-xl font-bold text-brand-primary dark:text-text-main mb-6 uppercase tracking-tight group-hover:text-brand-secondary transition-colors leading-tight">
                        {camp.title}
                      </h3>
                      <div className="mt-auto pt-6 border-t border-border-main">
                        <Link 
                          href="/give" 
                          className="group relative overflow-hidden inline-block text-brand-primary dark:text-brand-secondary text-[11px] font-bold uppercase tracking-widest pb-1 border-b-2 border-border-main hover:border-brand-primary dark:hover:border-brand-secondary transition-all"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-12 h-12 flex items-center justify-center border border-border-main bg-bg-surface text-text-muted disabled:opacity-30 hover:bg-brand-primary hover:text-white transition-all"
                  >
                    ←
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const page = idx + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-12 h-12 flex items-center justify-center font-bold text-xs transition-all border ${
                          currentPage === page 
                            ? 'bg-brand-primary text-white border-brand-primary shadow-lg' 
                            : 'bg-bg-surface text-text-muted border-border-main hover:border-brand-primary hover:text-brand-primary'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-12 h-12 flex items-center justify-center border border-border-main bg-bg-surface text-text-muted disabled:opacity-30 hover:bg-brand-primary hover:text-white transition-all"
                  >
                    →
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

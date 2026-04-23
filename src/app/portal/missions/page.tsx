"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaUsers, 
  FaCoins, 
  FaStethoscope,
  FaSearch,
  FaFilter
} from "react-icons/fa";
import Image from "next/image";

export default function MissionsPage() {
  const [activeFilter, setActiveFilter] = useState("upcoming");

  const missions = [
    {
      id: 1,
      title: "Global Hospital Outreach Campaign",
      location: "Lagos, Nigeria (Multiple Locations)",
      date: "May 15 - May 20, 2026",
      image: "https://volunteermedicalcorps.org/admin/images/media/2NpZxEGQD245813967.jpg",
      status: "upcoming",
      rolesNeeded: ["Doctors", "Nurses", "Logistics"],
      creditsOffered: 500,
      description: "Join us as we provide free medical checkups, surgeries, and relief materials to underserved communities across Lagos state.",
      spotsLeft: 12
    },
    {
      id: 2,
      title: "1 Million Smiles Pediatric Care",
      location: "Nairobi, Kenya",
      date: "June 10 - June 14, 2026",
      image: "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg",
      status: "upcoming",
      rolesNeeded: ["Pediatricians", "Child Psychologists", "General Volunteers"],
      creditsOffered: 450,
      description: "A specialized mission focusing on child healthcare, immunizations, and nutritional support in rural settlements.",
      spotsLeft: 5
    },
    {
      id: 3,
      title: "Disaster Relief: Flood Victims Support",
      location: "Jakarta, Indonesia",
      date: "July 01 - July 15, 2026",
      image: "https://volunteermedicalcorps.org/admin/images/campaigns/VvjfzE9kJ596372148.jpg",
      status: "upcoming",
      rolesNeeded: ["Paramedics", "Emergency Response", "Trauma Surgeons"],
      creditsOffered: 800,
      description: "Emergency medical deployment to assist victims of the recent flash floods. Requires Advanced Disaster Response certification.",
      spotsLeft: 20,
      requiresCertification: true
    },
    {
      id: 4,
      title: "Good Deeds Fiesta",
      location: "London, UK",
      date: "March 05, 2026",
      image: "https://volunteermedicalcorps.org/admin/images/gallery/798453-1.jpg",
      status: "past",
      rolesNeeded: ["All Categories"],
      creditsOffered: 150,
      description: "Community health awareness walk, free blood pressure checks, and distribution of hygiene kits.",
      spotsLeft: 0
    }
  ];

  const filteredMissions = missions.filter(m => activeFilter === "all" || m.status === activeFilter);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">Mission Board</h2>
          <p className="text-slate-500">Find volunteer opportunities, make an impact, and earn credits.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input 
              type="text" 
              placeholder="Search missions..." 
              className="pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#002866]/10 focus:border-[#002866] w-full md:w-64 transition-all"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-[#002866] hover:bg-slate-50 transition-all">
            <FaFilter />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-px">
        {["Upcoming", "My Missions", "Past", "All"].map((tab) => {
          const value = tab.toLowerCase().replace(" ", "-");
          const isActive = activeFilter === value;
          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(value)}
              className={`px-6 py-3 text-sm font-bold tracking-wide transition-all border-b-2
                ${isActive 
                  ? "border-[#ff9f22] text-[#002866]" 
                  : "border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300"
                }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMissions.map((mission, index) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all group flex flex-col sm:flex-row"
          >
            {/* Image Section */}
            <div className="relative w-full sm:w-2/5 h-48 sm:h-auto shrink-0">
              <Image src={mission.image} alt={mission.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002866]/80 via-transparent to-transparent sm:bg-gradient-to-r"></div>
              
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span className={`text-[10px] font-black px-2.5 py-1 rounded shadow-lg uppercase tracking-widest
                  ${mission.status === "upcoming" ? "bg-[#ff9f22] text-[#002866]" : "bg-slate-200 text-slate-600"}`}>
                  {mission.status}
                </span>
                {mission.requiresCertification && (
                  <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-lg uppercase">
                    Cert Required
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-[#002866] text-xs font-black px-3 py-1.5 rounded-lg shadow-lg flex items-center">
                <FaCoins className="mr-1.5 text-[#ff9f22]" /> +{mission.creditsOffered} Credits
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#002866] leading-tight mb-3 group-hover:text-[#ff9f22] transition-colors">
                  {mission.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start text-sm text-slate-500">
                    <FaMapMarkerAlt className="mr-2 mt-0.5 text-slate-400 shrink-0" />
                    <span>{mission.location}</span>
                  </div>
                  <div className="flex items-start text-sm text-slate-500">
                    <FaCalendarAlt className="mr-2 mt-0.5 text-slate-400 shrink-0" />
                    <span>{mission.date}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                  {mission.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    <FaStethoscope className="mr-1.5" /> Roles Needed
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mission.rolesNeeded.map((role, i) => (
                      <span key={i} className="bg-blue-50 text-[#002866] text-[10px] font-bold px-2 py-1 rounded border border-blue-100">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <div className="flex items-center text-xs font-bold text-slate-500">
                  <FaUsers className="mr-1.5 text-slate-400" />
                  {mission.spotsLeft > 0 ? (
                    <span className="text-amber-600">{mission.spotsLeft} Spots Left</span>
                  ) : (
                    <span className="text-slate-400">Mission Full</span>
                  )}
                </div>
                
                <button 
                  disabled={mission.status === "past"}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-md
                    ${mission.status === "past" 
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none" 
                      : "bg-[#002866] text-white hover:bg-[#ff9f22] hover:text-[#002866] hover:shadow-lg hover:shadow-amber-500/20"
                    }`}
                >
                  {mission.status === "past" ? "Closed" : "Apply Now"}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

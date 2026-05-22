"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { 
  FaBars, FaTimes, FaBell, FaGraduationCap, FaDesktop, FaUserCheck,
  FaCopy, FaDollarSign, FaBookOpen, FaArchive, FaLock, FaExpand,
  FaUser, FaSignOutAlt, FaChevronDown, FaHandsHelping, FaCheckCircle,
  FaSpinner
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

// Safe Imports - Only import pages that exist
import ProfilePage from "./profile/page";
import MissionsPage from "./missions/page";
import CreditHistoryPage from "./credits/page";
import CampaignsPage from "./campaigns/page";
import DonationsPage from "./donations/page";
import ProjectsPage from "./projects/page";
import BadgesPage from "./badges/page";
import MedicalProjectsCampaignPage from "./campaigns/medical_projects/page";
import HumanitarianProjectsCampaignPage from "./campaigns/humanitarian_projects/page";
import GoodDeedCampaignsPage from "./campaigns/good_deed_campaigns/page";
import VmcProjectsPage from "./projects/vmc_projects/page";
import MyProjectsPage from "./projects/my_projects/page";
import BadgeCategoriesPage from "./badges/badge_categories/page";
import MyVmcBadgesPage from "./badges/my_vmc_badges/page";
import DashboardOverview from "@/components/PortalDashboardClient";

// Placeholder for pages that may not be created yet
const ComingSoonPage = ({ title }: { title: string }) => (
  <div className="bg-white rounded-3xl p-16 text-center min-h-[500px] flex flex-col items-center justify-center border border-slate-100">
    <div className="text-6xl mb-6 opacity-20">🚧</div>
    <h2 className="text-3xl font-black text-[#002866] mb-3">{title}</h2>
    <p className="text-slate-500 max-w-md">This section is currently under development. More features coming soon.</p>
  </div>
);

type Tab = "dashboard" | "profile" | "campaigns" | "donations" | "projects" | "badges" | "missions" | "credits" | 
           "campaigns_medical" | "campaigns_humanitarian" | "campaigns_good_deed" | 
           "projects_vmc" | "projects_my" | 
           "badges_categories" | "badges_my";

export default function PortalLayout() {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  if (status === "loading") {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <FaSpinner className="animate-spin text-[#002866] text-4xl" />
      </div>
    );
  }

  const user = {
    name: session?.user?.name || "User",
    role: session?.user?.role || "Volunteer",
    credits: 0,
    avatar: (session?.user as any)?.image || "https://volunteermedicalcorps.org/images/volunteers/default-avatar.jpg"
  };

  const navigation = [
    { name: "Dashboard", key: "dashboard" as Tab, icon: FaDesktop },
    { name: "Profile", key: "profile" as Tab, icon: FaUserCheck },
    { 
      name: "Campaigns", key: "campaigns" as Tab, icon: FaCopy, hasSub: true,
      subItems: [
        { name: "Overview", key: "campaigns" as Tab },
        { name: "Medical Projects", key: "campaigns_medical" as Tab },
        { name: "Humanitarian Projects", key: "campaigns_humanitarian" as Tab },
        { name: "Good Deed Campaigns", key: "campaigns_good_deed" as Tab },
      ]
    },
    { name: "Donations", key: "donations" as Tab, icon: FaDollarSign },
    { 
      name: "Projects", key: "projects" as Tab, icon: FaBookOpen, hasSub: true,
      subItems: [
        { name: "Overview", key: "projects" as Tab },
        { name: "VMC Projects", key: "projects_vmc" as Tab },
        { name: "My Projects", key: "projects_my" as Tab },
      ]
    },
    { 
      name: "Badges", key: "badges" as Tab, icon: FaArchive, hasSub: true,
      subItems: [
        { name: "Overview", key: "badges" as Tab },
        { name: "Categories", key: "badges_categories" as Tab },
        { name: "My Badges", key: "badges_my" as Tab },
      ]
    },
    { name: "Missions", key: "missions" as Tab, icon: FaDesktop },
    { name: "Credits", key: "credits" as Tab, icon: FaGraduationCap },
  ];

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleNavClick = (key: Tab) => {
    setActiveTab(key);
    setIsSidebarOpen(false);
  };

  return (
    <div 
      className="flex h-screen bg-[#f1f1f1] overflow-hidden font-poppins text-slate-800"
      style={{
        backgroundImage: "url('https://volunteermedicalcorps.org/pmr-bg-mission.jpg')",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 400px"
      }}
    >
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" 
             onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-white shadow-2xl lg:shadow-none transform transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

        {/* Logo Header - Centered */}
        <div className="flex items-center justify-center h-16 px-6 border-b border-slate-50 relative">
          <button onClick={() => setActiveTab("dashboard")} className="flex items-center">
            <Image src="logo.png" alt="Logo" width={120} height={40} className="object-contain" unoptimized />
          </button>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden absolute right-6 text-slate-400">
            <FaTimes size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1.5 custom-scrollbar">
          <div className="px-4 mb-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-50">MAIN MENU</p>
          </div>

          {navigation.map((item) => {
            const isActive = activeTab === item.key || (item.subItems?.some(sub => sub.key === activeTab));
            const isOpen = openDropdown === item.name;

            return (
              <div key={item.name}>
                {item.hasSub ? (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl transition-all group ${isOpen || isActive ? "bg-slate-50 text-[#002866]" : "text-slate-500 hover:bg-slate-50 hover:text-[#002866]"}`}
                  >
                    <div className="flex items-center">
                      <item.icon className={`mr-4 text-lg ${isOpen || isActive ? "text-[#ff9f22]" : "text-slate-400"}`} />
                      <span className="text-[14px] font-bold">{item.name}</span>
                    </div>
                    <FaChevronDown className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.key)}
                    className={`flex items-center w-full px-4 py-3.5 rounded-xl transition-all group ${isActive ? "bg-[#002866] text-white shadow-lg" : "text-slate-500 hover:bg-slate-50 hover:text-[#002866]"}`}
                  >
                    <item.icon className={`mr-4 text-lg ${isActive ? "text-[#ff9f22]" : "text-slate-400"}`} />
                    <span className="text-[14px] font-bold">{item.name}</span>
                  </button>
                )}

                <AnimatePresence>
                  {item.hasSub && isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-4 mt-1 bg-slate-50/70 rounded-xl overflow-hidden flex flex-col"
                    >
                      {item.subItems?.map((sub) => (
                        <button
                          key={sub.key}
                          onClick={() => handleNavClick(sub.key as Tab)}
                          className={`text-left px-10 py-3 text-[12px] font-bold transition-all ${activeTab === sub.key ? "text-[#ff9f22]" : "text-slate-500 hover:text-[#002866]"}`}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Academy Button */}
        <div className="p-4 bg-slate-50/50 border-t">
          <Link
            href="/elearn/dashboard"
            className="flex items-center justify-center w-full gap-3 px-4 py-5 bg-[#ff9f22] text-[#002866] hover:bg-black hover:text-[#ff9f22] rounded-[2rem] text-xs font-black uppercase tracking-widest shadow-xl transition-all"
          >
            <FaGraduationCap className="text-xl" />
            VMC ACADEMY
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-[#002866]">
              <FaBars size={22} />
            </button>
            <h1 className="text-lg font-black text-[#002866]">
              {activeTab === "dashboard" ? "Portal Overview" : activeTab.replace(/_/g, " ").toUpperCase()}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden md:block text-slate-400 hover:text-slate-600">
              <FaExpand size={18} />
            </button>
            <button className="relative text-slate-400 hover:text-slate-600">
              <FaBell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button 
              onClick={() => setActiveTab("profile")}
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#002866] hover:bg-[#ff9f22] hover:text-white transition-all shadow-inner overflow-hidden"
            >
              <Image src={user.avatar} alt="User" width={40} height={40} className="object-cover" unoptimized />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-12 bg-[#f8f9fa]">
          <div className="max-w-[1400px] mx-auto">
            <AnimatePresence mode="wait">
              {activeTab === "dashboard" && (
                <DashboardOverview 
                  key="dashboard"
                  stats={[
                    { label: "My Campaigns", value: "3", icon: FaDesktop, color: "text-green-600", bg: "bg-green-50" },
                    { label: "Donations", value: "$4,250", icon: FaDollarSign, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Tasks Undertaken", value: "27", icon: FaHandsHelping, color: "text-amber-600", bg: "bg-amber-50" },
                    { label: "Tasks Completed", value: "24", icon: FaCheckCircle, color: "text-purple-600", bg: "bg-purple-50" },
                  ]}
                  recentEnrollments={[
                    { id: 1, course: { title: "VMC Induction Course", category: { name: "Education" } }, progress: 100, enrolledAt: new Date(), isCompleted: true },
                    { id: 2, course: { title: "Basic First Aid", category: { name: "Medical" } }, progress: 45, enrolledAt: new Date(), isCompleted: false },
                  ]}
                  recentDonations={[
                    { id: "d1", campaign: { title: "1 Million Smiles" }, amount: 500, currency: "USD", createdAt: new Date(), status: "Completed" },
                    { id: "d2", campaign: { title: "Emergency Relief" }, amount: 250, currency: "USD", createdAt: new Date(), status: "Completed" },
                  ]}
                />
              )}
              {activeTab === "profile" && <ProfilePage key="profile" />}
              {activeTab === "missions" && <MissionsPage key="missions" />}
              {activeTab === "credits" && <CreditHistoryPage key="credits" />}
              {activeTab === "campaigns" && <CampaignsPage key="campaigns" />}
              {activeTab === "donations" && <DonationsPage key="donations" />}
              {activeTab === "projects" && <ProjectsPage key="projects" />}
              {activeTab === "badges" && <BadgesPage key="badges" />}
              
              {/* Campaigns Sub-pages */}
              {activeTab === "campaigns_medical" && <MedicalProjectsCampaignPage key="campaigns_medical" />}
              {activeTab === "campaigns_humanitarian" && <HumanitarianProjectsCampaignPage key="campaigns_humanitarian" />}
              {activeTab === "campaigns_good_deed" && <GoodDeedCampaignsPage key="campaigns_good_deed" />}
              
              {/* Projects Sub-pages */}
              {activeTab === "projects_vmc" && <VmcProjectsPage key="projects_vmc" />}
              {activeTab === "projects_my" && <MyProjectsPage key="projects_my" />}
              
              {/* Badges Sub-pages */}
              {activeTab === "badges_categories" && <BadgeCategoriesPage key="badges_categories" />}
              {activeTab === "badges_my" && <MyVmcBadgesPage key="badges_my" />}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
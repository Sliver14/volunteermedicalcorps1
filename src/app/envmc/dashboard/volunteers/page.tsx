"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  Mail,
  Calendar,
  Shield,
  Loader2,
  Search
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  profile?: {
    phone?: string;
    location?: string;
    country?: string;
  };
}

export default function AdminVolunteers() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const limit = 10;

  const fetchVolunteers = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/envmc/volunteers?page=${page}&limit=${limit}`);
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        setTotal(data.total);
        setPages(data.pages);
      }
    } catch (error) {
      console.error("Failed to fetch volunteers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers(currentPage);
  }, [currentPage]);

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      const res = await fetch("/api/envmc/volunteers?export=true", { method: "POST" });
      const data = await res.json();
      
      if (res.ok) {
        const headers = ["Name", "Email", "Role", "Phone", "Location", "Country", "Joined Date"];
        const csvContent = [
          headers.join(","),
          ...data.map((user: any) => [
            `"${user.name}"`,
            `"${user.email}"`,
            `"${user.role}"`,
            `"${user.profile?.phone || ""}"`,
            `"${user.profile?.location || ""}"`,
            `"${user.profile?.country || ""}"`,
            `"${new Date(user.createdAt).toLocaleDateString()}"`
          ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `volunteers_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (pages <= maxVisiblePages) {
      for (let i = 1; i <= pages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, '...', pages);
      } else if (currentPage >= pages - 2) {
        pageNumbers.push(1, '...', pages - 3, pages - 2, pages - 1, pages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pages);
      }
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1 || isLoading}
          className="p-2 border border-gray-100 rounded-sm hover:bg-gray-50 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span key={`dots-${index}`} className="px-3 py-2 text-gray-400 font-bold">...</span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => setCurrentPage(page as number)}
              disabled={isLoading}
              className={`min-w-[40px] h-10 px-3 rounded-sm font-bold text-xs uppercase tracking-wider transition-all border ${
                currentPage === page
                  ? "bg-[#002866] text-white border-[#002866] shadow-lg"
                  : "bg-white text-gray-400 border-gray-100 hover:border-[#ff9f22] hover:text-[#ff9f22]"
              }`}
            >
              {page}
            </button>
          )
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(pages, prev + 1))}
          disabled={currentPage === pages || isLoading}
          className="p-2 border border-gray-100 rounded-sm hover:bg-gray-50 disabled:opacity-30 transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-[#002866] uppercase tracking-tight flex items-center gap-3">
              <Users className="text-[#ff9f22]" size={24} />
              Volunteer Registry
            </h2>
            <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase mt-1">Total Volunteers: {total}</p>
          </div>
          <button 
            onClick={handleExportCSV}
            disabled={isExporting || users.length === 0}
            className="bg-[#002866] text-white px-6 py-3 font-black uppercase text-[10px] tracking-widest rounded-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all flex items-center gap-3 disabled:opacity-50 shadow-lg shadow-[#002866]/10"
          >
            {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {isExporting ? "Exporting..." : "Export CSV"}
          </button>
        </div>

        <div className="overflow-x-auto -mx-6 md:mx-0">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">User Details</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Role</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Joined Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Location</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={`skeleton-${i}`} className="animate-pulse">
                      <td colSpan={5} className="px-6 py-8">
                        <div className="h-4 bg-gray-100 rounded w-full"></div>
                      </td>
                    </tr>
                  ))
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      <p className="font-bold uppercase tracking-widest text-xs">No volunteers found</p>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#002866]/5 rounded-full flex items-center justify-center text-[#002866] font-black border border-[#002866]/10 shrink-0">
                            {user.name?.[0]?.toUpperCase() || "V"}
                          </div>
                          <div>
                            <p className="font-bold text-[#002866] text-sm leading-tight group-hover:text-[#ff9f22] transition-colors">{user.name}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight flex items-center gap-1 mt-1">
                              <Mail size={10} /> {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-[#002866] rounded-full text-[9px] font-black uppercase tracking-widest border border-gray-200">
                          <Shield size={10} className="text-[#ff9f22]" />
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                            <Calendar size={12} className="text-gray-400" />
                            {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">
                          {user.profile?.country || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="p-2 text-gray-400 hover:text-[#002866] transition-colors">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {!isLoading && pages > 1 && renderPagination()}
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { 
  FaDollarSign, 
  FaHistory, 
  FaCreditCard, 
  FaGlobe, 
  FaFileInvoiceDollar,
  FaArrowRight
} from "react-icons/fa";

export default function DonationsPage() {
  const donationStats = [
    { label: "Total Contributed", value: "$4,250", icon: FaDollarSign, color: "text-green-600", bg: "bg-green-50" },
    { label: "Active Pledges", value: "2", icon: FaCreditCard, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Tax Receipts", value: "12", icon: FaFileInvoiceDollar, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const donationHistory = [
    { id: "d1", campaign: "1 Million Smiles", amount: 500, date: "Oct 15, 2026", status: "Completed", method: "Visa **** 4242" },
    { id: "d2", campaign: "General Fund", amount: 100, date: "Sep 22, 2026", status: "Completed", method: "PayPal" },
    { id: "d3", campaign: "Emergency Relief", amount: 250, date: "Aug 10, 2026", status: "Completed", method: "Mastercard **** 8899" },
    { id: "d4", campaign: "Global Prayer Mission", amount: 50, date: "Jul 05, 2026", status: "Completed", method: "Visa **** 4242" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">Donations & Giving</h2>
          <p className="text-slate-500">Manage your contributions and support global missions.</p>
        </div>
        <button className="bg-[#ff9f22] text-[#002866] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl hover:bg-black hover:text-[#ff9f22] transition-all">
          <FaDollarSign /> Donate Now
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {donationStats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6"
          >
            <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0 shadow-inner`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-[#002866]">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
          <h3 className="font-black text-2xl text-[#002866] tracking-tight flex items-center gap-4">
            <FaHistory className="text-slate-300" /> Giving History
          </h3>
          <button className="text-xs font-black text-[#ff9f22] uppercase tracking-widest hover:text-[#002866] transition-colors">Download Annual Report</button>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                <th className="px-10 py-6 border-b border-slate-50">Campaign</th>
                <th className="px-10 py-6 border-b border-slate-50">Amount</th>
                <th className="px-10 py-6 border-b border-slate-50">Date</th>
                <th className="px-10 py-6 border-b border-slate-50">Method</th>
                <th className="px-10 py-6 border-b border-slate-50 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {donationHistory.map((donation) => (
                <tr key={donation.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-6 border-b border-slate-50 font-bold text-[#002866]">{donation.campaign}</td>
                  <td className="px-10 py-6 border-b border-slate-50 font-black text-[#ff9f22]">${donation.amount}</td>
                  <td className="px-10 py-6 border-b border-slate-50 text-slate-400 font-medium">{donation.date}</td>
                  <td className="px-10 py-6 border-b border-slate-50 text-slate-500 text-xs font-bold">{donation.method}</td>
                  <td className="px-10 py-6 border-b border-slate-50 text-right">
                    <span className="bg-green-50 text-green-600 text-[10px] font-black px-3 py-1 rounded-full border border-green-100">
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

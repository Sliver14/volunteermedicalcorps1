"use client";

import { motion } from "framer-motion";
import { 
  FaArrowUp, 
  FaArrowDown, 
  FaCoins, 
  FaGraduationCap, 
  FaHandsHelping, 
  FaGift 
} from "react-icons/fa";

export default function CreditHistoryPage() {
  const summary = {
    currentBalance: 1250,
    lifetimeEarned: 3450,
    lifetimeSpent: 2200,
  };

  const transactions = [
    {
      id: "tr_1",
      date: "Oct 24, 2026",
      title: "Completed: VMC Induction Course",
      category: "Education",
      type: "earned",
      amount: 150,
      icon: FaGraduationCap
    },
    {
      id: "tr_2",
      date: "Oct 18, 2026",
      title: "Unlocked: Advanced Disaster Response",
      category: "Education",
      type: "spent",
      amount: 500,
      icon: FaGraduationCap
    },
    {
      id: "tr_3",
      date: "Sep 05, 2026",
      title: "Attended: Lagos Hospital Outreach",
      category: "Mission",
      type: "earned",
      amount: 800,
      icon: FaHandsHelping
    },
    {
      id: "tr_4",
      date: "Aug 22, 2026",
      title: "Claimed: VMC Official Scrub Set",
      category: "Store",
      type: "spent",
      amount: 1200,
      icon: FaGift
    },
    {
      id: "tr_5",
      date: "Aug 01, 2026",
      title: "Joined: Volunteer Medical Corps",
      category: "Bonus",
      type: "earned",
      amount: 500,
      icon: FaCoins
    }
  ];

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">Credit History</h2>
        <p className="text-slate-500">Track your volunteer credits, earnings, and redemptions.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#002866] to-[#001f52] p-6 rounded-2xl shadow-xl shadow-blue-900/10 text-white relative overflow-hidden"
        >
          <FaCoins className="absolute -right-4 -bottom-4 text-white/5 text-8xl" />
          <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-1">Current Balance</p>
          <h3 className="text-4xl font-black text-[#ff9f22]">{summary.currentBalance.toLocaleString()}</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Lifetime Earned</p>
            <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-green-500">
              <FaArrowUp size={12} />
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-800">{summary.lifetimeEarned.toLocaleString()}</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Lifetime Spent</p>
            <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center text-red-500">
              <FaArrowDown size={12} />
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-800">{summary.lifetimeSpent.toLocaleString()}</h3>
        </motion.div>
      </div>

      {/* Transaction Ledger */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-[#002866]">Recent Transactions</h3>
          <button className="text-sm font-bold text-[#ff9f22] hover:text-[#002866] transition-colors">
            Download Statement
          </button>
        </div>
        
        <div className="divide-y divide-slate-100">
          {transactions.map((tr, index) => (
            <motion.div 
              key={tr.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 flex items-center hover:bg-slate-50 transition-colors group"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mr-4
                ${tr.type === 'earned' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}
              `}>
                <tr.icon size={20} />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 truncate group-hover:text-[#002866] transition-colors">
                  {tr.title}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-slate-500">{tr.date}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tr.category}</span>
                </div>
              </div>

              {/* Amount */}
              <div className="text-right ml-4">
                <p className={`text-lg font-black ${tr.type === 'earned' ? 'text-green-600' : 'text-slate-800'}`}>
                  {tr.type === 'earned' ? '+' : '-'}{tr.amount}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Credits</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 text-center">
          <button className="text-sm font-bold text-slate-500 hover:text-[#002866]">Load More History</button>
        </div>
      </div>
    </div>
  );
}

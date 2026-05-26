"use client";

import { motion } from "framer-motion";
import { 
  FaHistory, 
  FaFileInvoice, 
  FaDownload,
  FaCheckCircle,
  FaShoppingBag
} from "react-icons/fa";

export default function ElearnOrderHistoryContent() {
  const orders = [
    {
      id: "ORD-2026-9921",
      course: "Introduction to the Volunteer Medical Corps",
      date: "Oct 15, 2026",
      amount: "FREE",
      status: "Successful",
      method: "Grant Activation"
    },
    {
      id: "ORD-2026-8842",
      course: "Emergency First Aid & Trauma Care",
      date: "Sep 10, 2026",
      amount: "FREE",
      status: "Successful",
      method: "Scholarship"
    },
    {
      id: "ORD-2026-7715",
      course: "VMC Induction Certification",
      date: "Aug 01, 2026",
      amount: "$0.00",
      status: "Successful",
      method: "Admin Override"
    }
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-text-main tracking-tight">Enrollment History</h2>
          <p className="text-text-muted font-medium">Review your course activations and scholarships.</p>
        </div>
        <button className="bg-brand-primary dark:bg-brand-secondary text-white dark:text-brand-primary px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-brand-primary/10">
          <FaFileInvoice size={14} /> Download Summary
        </button>
      </div>

      <div className="bg-bg-surface rounded-[3rem] border border-border-main shadow-sm overflow-hidden transition-colors duration-300">
        <div className="p-10 border-b border-border-main flex justify-between items-center bg-bg-base/20">
          <h3 className="font-black text-xl text-text-main tracking-tight flex items-center gap-4">
            <FaShoppingBag className="text-text-muted" /> Recent Enrollments
          </h3>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-base text-[10px] font-black uppercase tracking-[0.2em] text-text-muted transition-colors duration-300">
                <th className="px-10 py-6 border-b border-border-main">Course Title</th>
                <th className="px-10 py-6 border-b border-border-main">Order ID</th>
                <th className="px-10 py-6 border-b border-border-main">Date</th>
                <th className="px-10 py-6 border-b border-border-main">Amount</th>
                <th className="px-10 py-6 border-b border-border-main text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <motion.tr 
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-bg-base transition-colors group"
                >
                  <td className="px-10 py-6 border-b border-border-main">
                    <p className="font-bold text-text-main line-clamp-1">{order.course}</p>
                    <p className="text-[9px] font-bold text-brand-tertiary uppercase mt-0.5">{order.method}</p>
                  </td>
                  <td className="px-10 py-6 border-b border-border-main text-[11px] font-black text-text-muted tracking-wider">
                    {order.id}
                  </td>
                  <td className="px-10 py-6 border-b border-border-main text-text-muted text-sm font-medium">
                    {order.date}
                  </td>
                  <td className="px-10 py-6 border-b border-border-main font-black text-text-main text-lg">
                    {order.amount}
                  </td>
                  <td className="px-10 py-6 border-b border-border-main text-right">
                    <div className="flex items-center justify-end gap-3">
                      <span className="bg-green-100/50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest border border-green-100 dark:border-green-800">
                        {order.status}
                      </span>
                      <button className="p-2 text-text-muted hover:text-brand-primary transition-colors">
                        <FaDownload size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

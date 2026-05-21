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
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Enrollment History</h2>
          <p className="text-gray-500 font-medium">Review your course activations and scholarships.</p>
        </div>
        <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-gray-900/10">
          <FaFileInvoice size={14} /> Download Summary
        </button>
      </div>

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/20">
          <h3 className="font-black text-xl text-gray-900 tracking-tight flex items-center gap-4">
            <FaShoppingBag className="text-gray-300" /> Recent Enrollments
          </h3>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                <th className="px-10 py-6 border-b border-gray-50">Course Title</th>
                <th className="px-10 py-6 border-b border-gray-50">Order ID</th>
                <th className="px-10 py-6 border-b border-gray-50">Date</th>
                <th className="px-10 py-6 border-b border-gray-50">Amount</th>
                <th className="px-10 py-6 border-b border-gray-50 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <motion.tr 
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-10 py-6 border-b border-gray-50">
                    <p className="font-bold text-gray-900 line-clamp-1">{order.course}</p>
                    <p className="text-[9px] font-bold text-blue-500 uppercase mt-0.5">{order.method}</p>
                  </td>
                  <td className="px-10 py-6 border-b border-gray-50 text-[11px] font-black text-gray-400 tracking-wider">
                    {order.id}
                  </td>
                  <td className="px-10 py-6 border-b border-gray-50 text-gray-500 text-sm font-medium">
                    {order.date}
                  </td>
                  <td className="px-10 py-6 border-b border-gray-50 font-black text-gray-900 text-lg">
                    {order.amount}
                  </td>
                  <td className="px-10 py-6 border-b border-gray-50 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <span className="bg-green-50 text-green-600 text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest border border-green-100">
                        {order.status}
                      </span>
                      <button className="p-2 text-gray-300 hover:text-blue-600 transition-colors">
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

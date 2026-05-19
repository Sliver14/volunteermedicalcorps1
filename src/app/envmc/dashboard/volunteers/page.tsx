"use client";

import { motion } from "framer-motion";

export default function AdminVolunteers() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 min-h-[500px]"
    >
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
        <h2 className="text-2xl font-poppins font-bold text-[#002866]">Manage Volunteers</h2>
        <button className="bg-gray-100 text-gray-600 px-6 py-3 font-bold uppercase text-[11px] tracking-widest rounded-sm hover:bg-gray-200 transition-colors">
          Export CSV
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-gray-50 border border-dashed border-gray-200 rounded-sm">
        <p className="mb-2 font-bold text-gray-500 uppercase tracking-widest text-sm">No volunteers listed yet.</p>
        <p className="text-sm">When users register, they will appear here.</p>
      </div>
    </motion.div>
  );
}
"use client";

import { motion } from "framer-motion";

export default function AdminNews() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 min-h-[500px]"
    >
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
        <h2 className="text-2xl font-poppins font-bold text-[#002866]">Manage News</h2>
        <button className="bg-[#002866] text-white px-6 py-3 font-bold uppercase text-[11px] tracking-widest rounded-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-colors">
          + Add New
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-gray-50 border border-dashed border-gray-200 rounded-sm">
        <p className="mb-2 font-bold text-gray-500 uppercase tracking-widest text-sm">No news records found.</p>
        <p className="text-sm">Click "Add New" to create your first entry.</p>
      </div>
    </motion.div>
  );
}
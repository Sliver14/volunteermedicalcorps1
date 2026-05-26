"use client";

import { motion } from "framer-motion";

export default function AdminGallery() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-bg-surface p-8 rounded-sm shadow-sm border border-border-main min-h-[500px]"
    >
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-border-main">
        <h2 className="text-2xl font-poppins font-bold text-text-main">Manage Photo Gallery</h2>
        <button className="bg-brand-primary text-white px-6 py-3 font-bold uppercase text-[11px] tracking-widest rounded-sm hover:bg-brand-secondary hover:text-brand-primary transition-colors">
          + Add New Photo
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center h-64 text-text-muted bg-bg-base border border-dashed border-border-main rounded-sm">
        <p className="mb-2 font-bold text-text-muted uppercase tracking-widest text-sm">No photos found.</p>
        <p className="text-sm">Click &quot;Add New Photo&quot; to upload your first image.</p>
      </div>
    </motion.div>
  );
}
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaCheck, FaReply, FaUserCircle, FaClock } from "react-icons/fa";

export default function AdminComments() {
  const [comments, setComments] = useState([
    { 
      id: 1, 
      user: "John Doe", 
      email: "john@example.com",
      text: "Great initiative! I'd love to join the next hospital outreach.", 
      date: "Oct 24, 2026",
      status: "pending",
      target: "Global Hospital Outreach"
    },
    { 
      id: 2, 
      user: "Dr. Sarah Johnson", 
      email: "sarah.j@example.com",
      text: "The medical academy courses are very informative. Highly recommended.", 
      date: "Oct 22, 2026",
      status: "approved",
      target: "VMC Induction Course"
    },
    { 
      id: 3, 
      user: "Michael Smith", 
      email: "m.smith@example.com",
      text: "How can I earn more volunteer credits for the advanced courses?", 
      date: "Oct 20, 2026",
      status: "pending",
      target: "VMC Academy"
    }
  ]);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      setComments(comments.filter(comment => comment.id !== id));
    }
  };

  const handleApprove = (id: number) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, status: "approved" } : comment
    ));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-bg-surface p-8 rounded-sm shadow-sm border border-border-main min-h-[600px]"
    >
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-border-main">
        <h2 className="text-2xl font-poppins font-bold text-text-main">Manage Comments</h2>
        <div className="flex gap-4">
          <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20">
            {comments.filter(c => c.status === "pending").length} Pending
          </span>
          <span className="bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
            {comments.filter(c => c.status === "approved").length} Approved
          </span>
        </div>
      </div>
      
      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-text-muted bg-bg-base border border-dashed border-border-main rounded-sm">
          <p className="mb-2 font-bold text-text-muted uppercase tracking-widest text-sm">No comments found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div 
              key={comment.id} 
              className={`p-6 rounded-sm border ${comment.status === 'pending' ? 'border-amber-500/30 bg-amber-500/5' : 'border-border-main bg-bg-surface'} transition-all hover:shadow-md`}
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <div className="shrink-0 text-3xl text-text-muted/30">
                    <FaUserCircle />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-brand-primary dark:text-brand-secondary">{comment.user}</h4>
                      <span className="text-text-muted text-xs">• {comment.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">
                      <FaClock className="text-brand-secondary" /> {comment.date}
                      <span className="mx-2">|</span>
                      <span>On: {comment.target}</span>
                    </div>
                    <p className="text-text-main leading-relaxed max-w-2xl italic">
                      &quot;{comment.text}&quot;
                    </p>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 shrink-0 justify-end">
                  {comment.status === "pending" && (
                    <button 
                      onClick={() => handleApprove(comment.id)}
                      className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-green-700 transition-all"
                    >
                      <FaCheck /> Approve
                    </button>
                  )}
                  <button 
                    className="flex items-center justify-center gap-2 bg-brand-primary text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-brand-secondary hover:text-brand-primary transition-all"
                  >
                    <FaReply /> Reply
                  </button>
                  <button 
                    onClick={() => handleDelete(comment.id)}
                    className="flex items-center justify-center gap-2 bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-red-600 hover:text-white transition-all border border-red-500/20"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

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
      className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 min-h-[600px]"
    >
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
        <h2 className="text-2xl font-poppins font-bold text-[#002866]">Manage Comments</h2>
        <div className="flex gap-4">
          <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-bold border border-amber-100">
            {comments.filter(c => c.status === "pending").length} Pending
          </span>
          <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold border border-green-100">
            {comments.filter(c => c.status === "approved").length} Approved
          </span>
        </div>
      </div>
      
      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-gray-50 border border-dashed border-gray-200 rounded-sm">
          <p className="mb-2 font-bold text-gray-500 uppercase tracking-widest text-sm">No comments found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div 
              key={comment.id} 
              className={`p-6 rounded-sm border ${comment.status === 'pending' ? 'border-amber-200 bg-amber-50/20' : 'border-gray-100 bg-white'} transition-all hover:shadow-md`}
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <div className="shrink-0 text-3xl text-gray-300">
                    <FaUserCircle />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-[#002866]">{comment.user}</h4>
                      <span className="text-gray-400 text-xs">• {comment.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                      <FaClock className="text-[#ff9f22]" /> {comment.date}
                      <span className="mx-2">|</span>
                      <span>On: {comment.target}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed max-w-2xl italic">
                      "{comment.text}"
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
                    className="flex items-center justify-center gap-2 bg-[#002866] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all"
                  >
                    <FaReply /> Reply
                  </button>
                  <button 
                    onClick={() => handleDelete(comment.id)}
                    className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-red-600 hover:text-white transition-all border border-red-100"
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

"use client";

import { motion } from "framer-motion";
import { 
  FaAward, 
  FaLock, 
  FaStar, 
  FaMedal, 
  FaCheckCircle,
  FaShieldAlt
} from "react-icons/fa";

export default function MyVmcBadgesPage() {
  const myBadges = [
    {
      id: "mb1",
      title: "First Responder",
      category: "Medical",
      unlocked: true,
      date: "Oct 12, 2026",
      icon: FaMedal,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      id: "mb2",
      title: "Impact Pioneer",
      category: "Humanitarian",
      unlocked: true,
      date: "Sep 05, 2026",
      icon: FaAward,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      id: "mb3",
      title: "Course Master",
      category: "Education",
      unlocked: true,
      date: "Aug 22, 2026",
      icon: FaStar,
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
    {
      id: "mb4",
      title: "Elite Commander",
      category: "Leadership",
      unlocked: false,
      requirement: "Lead 5 Global Missions",
      icon: FaShieldAlt,
      color: "text-slate-400",
      bg: "bg-slate-50"
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">My VMC Badges</h2>
          <p className="text-slate-500">Your collection of earned achievements and upcoming milestones.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {myBadges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden p-8 flex flex-col items-center text-center transition-all
              ${badge.unlocked ? 'hover:shadow-2xl hover:-translate-y-2' : 'opacity-60 grayscale'}`}
          >
            <div className={`w-24 h-24 rounded-[2.5rem] ${badge.bg} ${badge.color} flex items-center justify-center mb-6 shadow-inner relative`}>
              <badge.icon size={40} />
              {badge.unlocked && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                  <FaCheckCircle size={14} />
                </div>
              )}
            </div>

            <h3 className="text-lg font-black text-[#002866] mb-1">{badge.title}</h3>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">{badge.category}</p>

            {badge.unlocked ? (
              <div className="bg-green-50 px-4 py-2 rounded-xl">
                <p className="text-[9px] font-black text-green-600 uppercase tracking-widest">Unlocked {badge.date}</p>
              </div>
            ) : (
              <div className="bg-slate-50 px-4 py-3 rounded-xl w-full">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-2">
                  <FaLock size={8} /> Requirement
                </p>
                <p className="text-[10px] font-bold text-slate-600 leading-tight">{badge.requirement}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

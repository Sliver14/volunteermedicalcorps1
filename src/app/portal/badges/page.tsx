"use client";

import { motion } from "framer-motion";
import { 
  FaAward, 
  FaLock, 
  FaStar, 
  FaMedal, 
  FaShieldAlt,
  FaCheckCircle
} from "react-icons/fa";

export default function BadgesPage() {
  const badgeCategories = [
    {
      name: "Achievement Badges",
      description: "Earned by reaching specific milestones in your volunteer journey.",
      badges: [
        { id: "b1", title: "First Mission", icon: FaAward, unlocked: true, date: "Aug 15, 2026", color: "text-amber-500", bg: "bg-amber-50" },
        { id: "b2", title: "100 Impact Hours", icon: FaStar, unlocked: true, date: "Sep 20, 2026", color: "text-blue-500", bg: "bg-blue-50" },
        { id: "b3", title: "Elite Responder", icon: FaMedal, unlocked: false, requirement: "Complete 10 Disaster Missions", color: "text-purple-500", bg: "bg-purple-50" },
      ]
    },
    {
      name: "Specialty Certifications",
      description: "Professional badges for specialized medical and humanitarian skills.",
      badges: [
        { id: "b4", title: "Crisis Paramedic", icon: FaShieldAlt, unlocked: true, date: "Oct 01, 2026", color: "text-red-500", bg: "bg-red-50" },
        { id: "b5", title: "VMC Master Trainer", icon: FaAward, unlocked: false, requirement: "Certify 50 new volunteers", color: "text-green-500", bg: "bg-green-50" },
      ]
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      <div>
        <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">My VMC Badges</h2>
        <p className="text-slate-500">Showcasing your impact and professional achievements.</p>
      </div>

      {badgeCategories.map((category, idx) => (
        <div key={idx} className="space-y-8">
          <div className="border-l-4 border-[#ff9f22] pl-6">
            <h3 className="text-xl font-black text-[#002866]">{category.name}</h3>
            <p className="text-slate-400 text-sm font-medium">{category.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {category.badges.map((badge, bIdx) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (idx * 3 + bIdx) * 0.1 }}
                className={`relative bg-white rounded-[2.5rem] border border-slate-100 p-8 flex flex-col items-center text-center group transition-all
                  ${badge.unlocked ? 'shadow-lg shadow-blue-900/5' : 'opacity-60 grayscale'}`}
              >
                <div className={`w-20 h-20 ${badge.bg} ${badge.color} rounded-[2rem] flex items-center justify-center mb-6 shadow-inner relative`}>
                  <badge.icon size={32} className="group-hover:rotate-12 transition-transform duration-500" />
                  {badge.unlocked && (
                    <div className="absolute -top-1 -right-1 bg-green-500 text-white w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                      <FaCheckCircle size={12} />
                    </div>
                  )}
                </div>

                <h4 className="font-bold text-[#002866] mb-2">{badge.title}</h4>
                
                {badge.unlocked ? (
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unlocked {badge.date}</p>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                      <FaLock size={8} /> Locked
                    </p>
                    <p className="text-[10px] font-bold text-[#ff9f22] leading-tight px-4">{badge.requirement}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

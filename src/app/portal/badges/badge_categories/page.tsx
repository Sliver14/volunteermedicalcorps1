"use client";

import { motion } from "framer-motion";
import { 
  FaAward, 
  FaStethoscope, 
  FaHandsHelping, 
  FaUserGraduate,
  FaCheckCircle,
  FaArrowRight
} from "react-icons/fa";

export default function BadgeCategoriesPage() {
  const categories = [
    {
      id: "bc1",
      title: "Service Excellence",
      description: "Recognizing outstanding commitment and hours of service in various humanitarian missions.",
      icon: FaHandsHelping,
      badgeCount: 8,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      id: "bc2",
      title: "Clinical Proficiency",
      description: "Awarded for specialized medical skills and successful execution of clinical tasks.",
      icon: FaStethoscope,
      badgeCount: 12,
      color: "text-red-500",
      bg: "bg-red-50"
    },
    {
      id: "bc3",
      title: "Academic Achievement",
      description: "Earned by completing certified courses and training programs in the VMC Academy.",
      icon: FaUserGraduate,
      badgeCount: 15,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      id: "bc4",
      title: "Leadership & Impact",
      description: "Reserved for volunteers who lead teams and spearhead large-scale community projects.",
      icon: FaAward,
      badgeCount: 6,
      color: "text-purple-500",
      bg: "bg-purple-50"
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">Badge Categories</h2>
          <p className="text-slate-500">Explore the different achievement tiers and specialty badges.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all p-10 flex gap-8 items-start group"
          >
            <div className={`w-20 h-20 rounded-3xl ${category.bg} ${category.color} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
              <category.icon size={32} />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[#002866]">{category.title}</h3>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{category.badgeCount} Badges</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">{category.description}</p>
              <button className="text-[#002866] hover:text-[#ff9f22] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors">
                View All Badges <FaArrowRight />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

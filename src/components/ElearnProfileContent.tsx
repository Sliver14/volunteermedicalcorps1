"use client";

import { motion } from "framer-motion";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaGlobe, 
  FaUserGraduate, 
  FaEdit, 
  FaCamera,
  FaShieldAlt,
  FaAward
} from "react-icons/fa";
import Image from "next/image";

export default function ElearnProfileContent({ user }: { user: any }) {
  const profileDetails = [
    { label: "Full Name", value: user.name, icon: FaUser },
    { label: "Email Address", value: "sylver.oyinaga@example.com", icon: FaEnvelope },
    { label: "Phone Number", value: "+234 800 000 0000", icon: FaPhone },
    { label: "Location", value: "Lagos, Nigeria", icon: FaGlobe },
    { label: "Student ID", value: "VMC-STU-2026-042", icon: FaUserGraduate },
  ];

  const trainingHistory = [
    { title: "Basic Life Support (BLS)", date: "Aug 2026", status: "Certified" },
    { title: "Crisis Management", date: "Sep 2026", status: "In Progress" },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Profile Header */}
      <div className="bg-bg-surface rounded-[2.5rem] border border-border-main shadow-sm overflow-hidden transition-colors duration-300">
        <div className="h-40 bg-gradient-to-r from-brand-primary to-brand-tertiary relative">
          <button className="absolute bottom-6 right-8 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2">
            <FaEdit /> Edit Banner
          </button>
        </div>
        <div className="px-10 pb-10 relative">
          <div className="flex flex-col md:flex-row items-end gap-8 -mt-16 mb-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2.5rem] border-4 border-bg-surface shadow-2xl overflow-hidden bg-bg-base relative transition-colors duration-300">
                <Image 
                  src={user.image} 
                  alt={user.name} 
                  fill 
                  className="object-cover"
                  unoptimized
                />
              </div>
              <button className="absolute bottom-1 right-1 bg-brand-primary text-white w-10 h-10 rounded-2xl flex items-center justify-center border-4 border-bg-surface shadow-lg hover:scale-110 transition-transform">
                <FaCamera size={16} />
              </button>
            </div>
            <div className="flex-1 pb-2">
              <h2 className="text-3xl font-black text-text-main tracking-tight">{user.name}</h2>
              <p className="text-brand-tertiary font-bold uppercase text-[10px] tracking-[0.2em] mt-1">VMC Certified Student</p>
            </div>
            <div className="flex gap-3 pb-2">
              <button className="bg-brand-primary dark:bg-brand-secondary text-white dark:text-brand-primary px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-brand-primary/10">
                <FaEdit /> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Basic Info */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-bg-surface rounded-[2.5rem] border border-border-main shadow-sm p-10 transition-colors duration-300">
            <h3 className="text-xl font-black text-text-main mb-8 flex items-center gap-4">
              <span className="w-1.5 h-6 bg-brand-primary rounded-full"></span>
              Personal Information
            </h3>
            <div className="space-y-6">
              {profileDetails.map((detail, index) => (
                <div key={index} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-bg-base transition-colors group">
                  <div className="w-12 h-12 bg-bg-base text-text-muted rounded-xl flex items-center justify-center group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-all">
                    <detail.icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">{detail.label}</p>
                    <p className="font-bold text-text-main">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Stats */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-bg-surface rounded-[2.5rem] border border-border-main shadow-sm p-10 transition-colors duration-300">
            <h3 className="text-xl font-black text-text-main mb-8 flex items-center gap-4">
              <span className="w-1.5 h-6 bg-brand-secondary rounded-full"></span>
              Learning Achievements
            </h3>
            <div className="space-y-4">
              {trainingHistory.map((item, index) => (
                <div key={index} className="p-6 rounded-2xl bg-bg-base border border-border-main flex items-center justify-between transition-colors duration-300">
                  <div>
                    <h4 className="font-bold text-text-main text-sm">{item.title}</h4>
                    <p className="text-[10px] font-bold text-text-muted uppercase mt-1">{item.date}</p>
                  </div>
                  <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-sm
                    ${item.status === 'Certified' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-brand-primary/10 text-brand-primary dark:bg-brand-secondary/10 dark:text-brand-secondary'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-border-main">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Specialty Badges</span>
                <span className="text-[10px] font-black text-brand-tertiary uppercase tracking-widest">4 Earned</span>
              </div>
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shadow-inner">
                    <FaAward size={20} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-brand-primary dark:bg-bg-surface border border-transparent dark:border-border-main rounded-[2.5rem] p-10 text-white dark:text-text-main relative overflow-hidden group transition-colors duration-300">
            <FaShieldAlt className="absolute -right-8 -bottom-8 text-white/5 dark:text-brand-secondary/5 text-9xl group-hover:scale-110 transition-transform duration-700" />
            <p className="text-brand-secondary text-[10px] font-black uppercase tracking-[0.2em] mb-4">Account Security</p>
            <h4 className="text-2xl font-black mb-6">Protect your learning account.</h4>
            <button className="bg-white dark:bg-brand-secondary text-brand-primary dark:text-brand-primary px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-secondary hover:text-brand-primary dark:hover:bg-white transition-all">
              Update Security
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

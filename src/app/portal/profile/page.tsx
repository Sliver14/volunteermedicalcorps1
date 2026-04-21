"use client";

import { motion } from "framer-motion";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaGlobe, 
  FaStethoscope, 
  FaEdit, 
  FaCamera,
  FaShieldAlt,
  FaBell
} from "react-icons/fa";

export default function ProfilePage() {
  // Mock user data matching the persona in layout
  const user = {
    name: "Dr. Sarah Johnson",
    role: "Medical Volunteer",
    email: "s.johnson@example.com",
    phone: "+234 801 234 5678",
    country: "Nigeria",
    category: "Medical Professional (Doctor)",
    memberSince: "August 2024",
    avatar: "S"
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-poppins font-black text-[#002866] uppercase tracking-tight">My Profile</h2>
          <p className="text-slate-500">Manage your personal information and account preferences.</p>
        </div>
        <button className="bg-[#002866] text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center hover:bg-[#ff9f22] hover:text-[#002866] transition-all shadow-lg shadow-blue-900/10">
          <FaEdit className="mr-2" /> Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Impact Summary */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-[#002866] to-[#001f52]"></div>
            
            <div className="relative mt-4 mb-6 inline-block">
              <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-2xl">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-amber-400 to-[#ff9f22] flex items-center justify-center text-white text-4xl font-black shadow-inner">
                  {user.avatar}
                </div>
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full border border-slate-100 shadow-lg flex items-center justify-center text-[#002866] hover:text-[#ff9f22] transition-colors">
                <FaCamera size={16} />
              </button>
            </div>

            <h3 className="text-xl font-bold text-[#002866]">{user.name}</h3>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">{user.role}</p>
            
            <div className="mt-8 pt-8 border-t border-slate-50 grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Status</p>
                <span className="bg-green-50 text-green-600 text-[10px] font-black px-2 py-1 rounded-full border border-green-100">ACTIVE</span>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Joined</p>
                <p className="text-xs font-bold text-slate-700">Aug 2024</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h4 className="text-sm font-black text-[#002866] uppercase tracking-widest mb-6 flex items-center">
              <FaShieldAlt className="mr-2 text-amber-500" /> Account Security
            </h4>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors text-sm font-bold text-slate-600 flex items-center justify-between group">
                Change Password
                <span className="text-slate-300 group-hover:text-[#002866] transition-colors">→</span>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors text-sm font-bold text-slate-600 flex items-center justify-between group">
                Two-Factor Auth
                <span className="bg-slate-100 text-[10px] px-2 py-0.5 rounded text-slate-400">OFF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Information */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm"
          >
            <h4 className="text-lg font-bold text-[#002866] mb-8 pb-4 border-b border-slate-50">Personal Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <FaUser className="mr-2" /> Full Name
                </label>
                <p className="text-slate-700 font-bold">{user.name}</p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <FaEnvelope className="mr-2" /> Email Address
                </label>
                <p className="text-slate-700 font-bold">{user.email}</p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <FaPhone className="mr-2" /> Phone Number
                </label>
                <p className="text-slate-700 font-bold">{user.phone}</p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <FaGlobe className="mr-2" /> Country
                </label>
                <p className="text-slate-700 font-bold">{user.country}</p>
              </div>
            </div>
          </motion.div>

          {/* Volunteer Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm"
          >
            <h4 className="text-lg font-bold text-[#002866] mb-8 pb-4 border-b border-slate-50">Volunteer Details</h4>
            
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <FaStethoscope className="mr-2" /> Professional Category
                </label>
                <p className="text-slate-700 font-bold">{user.category}</p>
              </div>

              <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50">
                <h5 className="text-xs font-black text-[#002866] uppercase mb-4">Certifications Verified</h5>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white text-[#002866] text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm border border-blue-100 flex items-center">
                    ✓ Medical License (2026)
                  </span>
                  <span className="bg-white text-[#002866] text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm border border-blue-100 flex items-center">
                    ✓ Board Certified Surgeon
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm"
          >
            <h4 className="text-lg font-bold text-[#002866] mb-8 pb-4 border-b border-slate-50 flex items-center justify-between">
              Notification Preferences
              <FaBell className="text-slate-200" />
            </h4>
            
            <div className="space-y-4">
              {[
                { label: "Mission Opportunities", desc: "Get notified when new outreaches are available in your region.", active: true },
                { label: "Academy Updates", desc: "Alerts for new courses and certificate completions.", active: true },
                { label: "Newsletter", desc: "Monthly impact reports and VMC global news.", active: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-bold text-slate-700">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${item.active ? 'bg-[#002866]' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.active ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

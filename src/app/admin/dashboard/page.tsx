"use client";

import { motion } from "framer-motion";
import { FaUsers, FaHandsHelping, FaDonate, FaGlobe } from "react-icons/fa";

export default function DashboardOverview() {
  const stats = [
    { title: "Total Volunteers", value: "6,478", icon: FaUsers, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Active Campaigns", value: "24", icon: FaHandsHelping, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Total Donations", value: "$16M+", icon: FaDonate, color: "text-green-500", bg: "bg-green-50" },
    { title: "Countries Reached", value: "210+", icon: FaGlobe, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-poppins font-bold text-[#002866]">Dashboard Overview</h2>
        <p className="text-gray-500 mt-2">Welcome back, Admin. Here is what is happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex items-center"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mr-4 ${stat.bg}`}>
                <Icon className={`text-2xl ${stat.color}`} />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">{stat.title}</p>
                <p className="text-2xl font-black text-[#002866] leading-none">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mock Chart Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white p-8 rounded-sm shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-bold text-[#002866] mb-6 uppercase tracking-widest border-b border-gray-100 pb-4">Registration Analytics</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded-sm">
            <p className="text-gray-400 font-medium">[ User Registration Chart Placeholder ]</p>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-white p-8 rounded-sm shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-bold text-[#002866] mb-6 uppercase tracking-widest border-b border-gray-100 pb-4">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { text: "New volunteer registered from Nigeria", time: "10 mins ago" },
              { text: "New donation received for Global Hospital Outreach", time: "1 hour ago" },
              { text: "Blog post 'Healthy Snacking' was published", time: "3 hours ago" },
              { text: "Campaign '1 Million Smiles' goal updated", time: "5 hours ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-[#ff9f22] mt-1.5 mr-3"></div>
                <div>
                  <p className="text-gray-700 font-medium">{activity.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
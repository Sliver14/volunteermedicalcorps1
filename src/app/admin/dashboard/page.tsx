import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { 
  Users, 
  Image as ImageIcon, 
  MessageSquare, 
  Heart, 
  Megaphone, 
  CheckCircle2, 
  Clock 
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // Fetch some stats
  const [userCount, slideCount, confessionCount, campaignCount] = await Promise.all([
    prisma.user.count(),
    prisma.heroSlide.count(),
    prisma.dailyConfession.count(),
    prisma.campaign.count(),
  ]);

  const stats = [
    { label: "Total Users", value: userCount, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Hero Slides", value: slideCount, icon: ImageIcon, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Confessions", value: confessionCount, icon: MessageSquare, color: "text-green-600", bg: "bg-green-50" },
    { label: "Campaigns", value: campaignCount, icon: Heart, color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-[#002866]">{stat.value}</p>
            </div>
            <div className={`${stat.bg} ${stat.color} p-3 rounded-sm`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity Placeholder */}
        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
          <h3 className="text-lg font-black text-[#002866] uppercase tracking-tight mb-6 flex items-center gap-2">
            <Clock size={20} className="text-[#ff9f22]" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#002866]">New volunteer registration</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago • System Log</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health / Quick Links */}
        <div className="bg-[#002866] p-8 rounded-sm shadow-xl text-white">
          <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-2">
            <Megaphone size={20} className="text-[#ff9f22]" />
            Quick Management
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-white/10 hover:bg-white/20 p-6 rounded-sm text-left transition-all group">
              <p className="text-[#ff9f22] font-black text-xs uppercase mb-2">Slider</p>
              <p className="font-bold text-sm">Add New Slide</p>
            </button>
            <button className="bg-white/10 hover:bg-white/20 p-6 rounded-sm text-left transition-all group">
              <p className="text-[#ff9f22] font-black text-xs uppercase mb-2">Campaign</p>
              <p className="font-bold text-sm">Create Campaign</p>
            </button>
            <button className="bg-white/10 hover:bg-white/20 p-6 rounded-sm text-left transition-all group">
              <p className="text-[#ff9f22] font-black text-xs uppercase mb-2">Confession</p>
              <p className="font-bold text-sm">Daily Update</p>
            </button>
            <button className="bg-white/10 hover:bg-white/20 p-6 rounded-sm text-left transition-all group">
              <p className="text-[#ff9f22] font-black text-xs uppercase mb-2">Marquee</p>
              <p className="font-bold text-sm">Edit Marquee</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { 
  FaArrowRight, 
  FaGraduationCap, 
  FaHandsHelping, 
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import Link from "next/link";
import PortalDashboardClient from "@/components/PortalDashboardClient";

export default async function PortalDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session) return null;

  // Fetch real data from Prisma
  // We'll use profile stats if they exist, otherwise 0
  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id }
  });

  const stats = [
    { label: "Missions Completed", value: profile?.stats?.toString() || "0", icon: FaCheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Hours Volunteered", value: "0", icon: FaClock, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending Missions", value: "0", icon: FaHandsHelping, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Credits Earned", value: "0", icon: FaCheckCircle, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <PortalDashboardClient 
      session={session}
      stats={stats}
    />
  );
}

import PageBanner from "@/components/PageBanner";
import prisma from "@/lib/prisma";
import CampaignsClient from "@/components/CampaignsClient";

export default async function CampaignsLandingPage() {
  let allCampaigns: any[] = [];
  try {
    allCampaigns = await prisma.campaign.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Database fetch error in Campaigns:", error);
  }

  return (
    <div className="w-full bg-white">
      <PageBanner title="Our Campaigns" />
      <CampaignsClient allCampaigns={allCampaigns} />
    </div>
  );
}

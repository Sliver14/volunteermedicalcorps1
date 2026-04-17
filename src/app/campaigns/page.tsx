import PageBanner from "@/components/PageBanner";
import Link from "next/link";
import Image from "next/image";

export default function CampaignsLandingPage() {
  const campaigns = [
    {
      title: "1 Million Smiles",
      tag: "World Humanitarian Day",
      description: "Creating smiles through 1 million good deeds across the world.",
      href: "/campaigns/1-million-smiles",
      image: "/give-15-768x512.jpg"
    },
    {
      title: "Global Hospital Outreach",
      tag: "#GHOC",
      description: "Reaching patients and healthcare workers in hospitals across 196 countries.",
      href: "/campaigns/ghoc",
      image: "/sw-post-1-min-768x512.jpg"
    },
    {
      title: "Praying Medics",
      tag: "Global Network",
      description: "Join a global network of medical professionals dedicated to the ministry of prayer.",
      href: "/campaigns/global-prayer",
      image: "/pmr-bg-mission.jpg"
    }
  ];

  return (
    <div className="w-full bg-white">
      <PageBanner title="Our Campaigns" />
      
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-[#002866] uppercase">Active Campaigns</h2>
            <div className="w-24 h-1 bg-[#FFEE00] mx-auto mt-6 mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join our global initiatives designed to bring hope, healing, and the Gospel to people and communities worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {campaigns.map((item) => (
              <div key={item.title} className="group bg-white border border-gray-100 rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-72 overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#FFEE00] text-[#002866] px-4 py-1 font-black text-xs uppercase tracking-widest">
                    {item.tag}
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-bold text-[#002866] mb-4 uppercase leading-tight">{item.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">{item.description}</p>
                  <Link 
                    href={item.href}
                    className="inline-block bg-[#002866] text-white px-10 py-4 font-black uppercase tracking-[0.2em] text-[13px] hover:bg-[#FFEE00] hover:text-[#002866] transition-all shadow-md"
                  >
                    View Campaign
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

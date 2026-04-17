import PageBanner from '@/components/PageBanner';
import Image from 'next/image';

export default function VideoGalleryPage() {
  const videos = [
    { title: "Simple ways to prevent cardiac arrest", image: "/give-15-768x512.jpg" },
    { title: "LOVEWORLD MEDICAL MISSIONS TRIP TO EGYPT", image: "/give-17-300x200.jpg" },
    { title: "WE ARE LOVEWORLD VOLUNTEER MEDICAL CORPS", image: "/give-20-768x512.jpg" },
    { title: "THERE ARE GOOD DOCTORS", image: "/sw-post-1-min-768x512.jpg" },
    { title: "Simple ways to care for your teeth", image: "/sw-post-3-min-300x200.jpg" },
    { title: "FLOURIDE IN YOUR WATER AND MILK", image: "/vcn-post-7-min-768x512.jpg" },
    { title: "Global Hospital Outreach Campaign", image: "/give-15-768x512.jpg" },
    { title: "OUR TEAM IN PUNR INDIA", image: "/give-17-300x200.jpg" },
    { title: "HOW TO PLAN A MEDICAL OUTREACH", image: "/give-20-768x512.jpg" }
  ];

  return (
    <div className="w-full bg-white">
      <PageBanner title="VIDEO GALLERY" parent={{ label: "Media", href: "#" }} />
      
      {/* Featured Video */}
      <section className="py-24 bg-[#002866]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-video bg-black rounded-sm overflow-hidden shadow-2xl group cursor-pointer">
              <Image 
                src="/pmr-bg-slide.jpg" 
                alt="Featured Video" 
                fill 
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#FFEE00] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#002866] border-b-[12px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
            <div className="text-white space-y-6">
              <h6 className="text-[#FFEE00] font-bold tracking-widest uppercase">Featured Video</h6>
              <h2 className="text-4xl font-poppins font-bold leading-tight">WE ARE LOVEWORLD VOLUNTEER MEDICAL CORPS</h2>
              <p className="text-gray-300 text-lg">Learn more about our mission, our people, and the global impact we are making in regions of crisis and communities in need.</p>
              <button className="bg-[#FFEE00] text-[#002866] px-10 py-4 font-black uppercase tracking-widest hover:bg-white transition-all">
                Watch Full Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-[#002866] uppercase">Latest Videos</h2>
            <div className="w-24 h-1 bg-[#FFEE00] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {videos.map((video, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative h-56 overflow-hidden rounded-sm mb-6 shadow-lg">
                  <Image 
                    src={video.image} 
                    alt={video.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-[#FFEE00] group-hover:border-[#FFEE00] transition-all">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white group-hover:border-l-[#002866] border-b-[6px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#002866] group-hover:text-[#FFEE00] transition-colors leading-snug">
                  {video.title}
                </h3>
                <div className="mt-2 text-xs font-roboto text-gray-400 uppercase tracking-widest">VMC Media • 2024</div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button className="border-2 border-[#002866] text-[#002866] px-12 py-4 font-black uppercase tracking-widest hover:bg-[#002866] hover:text-white transition-all">
              Browse More Videos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

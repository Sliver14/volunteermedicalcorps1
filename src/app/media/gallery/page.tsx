import PageBanner from '@/components/PageBanner';
import Image from 'next/image';

export default function GalleryPage() {
  const albums = [
    { title: "Community Health Outreach at Kakuri, Kaduna", image: "/give-15-768x512.jpg" },
    { title: "Free medical outreach in Usi-Ekiti", image: "/give-17-300x200.jpg" },
    { title: "P.A.L.M.S program Ukz4", image: "/give-20-768x512.jpg" },
    { title: "VMC Bronx Medical Outreach", image: "/sw-post-1-min-768x512.jpg" },
    { title: "VMC Ministers to Children in Romania", image: "/sw-post-3-min-300x200.jpg" },
    { title: "Care and Support Outreach - Ottawa Canada", image: "/vcn-post-7-min-768x512.jpg" },
    { title: "Medical Outreach in Yenagoa, Bayelsa", image: "/give-15-768x512.jpg" },
    { title: "Medical Outreach at Ajah, Lagos State", image: "/give-17-300x200.jpg" }
  ];

  return (
    <div className="w-full bg-white">
      <PageBanner title="PHOTO GALLERY" parent={{ label: "Media", href: "#" }} />
      
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h6 className="text-[#FFEE00] font-bold tracking-widest uppercase mb-4">Our Memories</h6>
            <h2 className="text-4xl font-poppins font-bold text-[#002866] uppercase">Capturing the Impact</h2>
            <div className="w-24 h-1 bg-[#FFEE00] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {albums.map((album, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative h-64 overflow-hidden rounded-sm mb-4 shadow-md">
                  <Image 
                    src={album.image} 
                    alt={album.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#002866]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-4xl">+</span>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-[#002866] uppercase tracking-wider text-center group-hover:text-[#FFEE00] transition-colors line-clamp-2">
                  {album.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button className="border-2 border-[#002866] text-[#002866] px-12 py-4 font-black uppercase tracking-widest hover:bg-[#002866] hover:text-white transition-all">
              Load More Albums
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

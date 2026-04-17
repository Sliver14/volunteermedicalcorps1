import PageBanner from '@/components/PageBanner';
import Image from 'next/image';

export default function BlogPage() {
  const blogPosts = [
    { title: "Just Move", date: "Mar 18, 2026", image: "/give-15-768x512.jpg" },
    { title: "Drink More Water, Stay Hydrated", date: "Jan 30, 2026", image: "/give-17-300x200.jpg" },
    { title: "Love Your Fruits And Vegetables", date: "Jan 30, 2026", image: "/give-20-768x512.jpg" },
    { title: "THE SLEEP SOLUTION", date: "Oct 14, 2025", image: "/sw-post-1-min-768x512.jpg" },
    { title: "HELPING OTHERS HELPS YOU", date: "Oct 10, 2025", image: "/sw-post-3-min-300x200.jpg" },
    { title: "TAKE BREAKS", date: "Oct 07, 2025", image: "/vcn-post-7-min-768x512.jpg" },
    { title: "HEALTHY SNACKING", date: "Oct 03, 2025", image: "/give-15-768x512.jpg" },
    { title: "SELF-CARE IS HEALTH CARE", date: "Sep 30, 2025", image: "/give-17-300x200.jpg" },
    { title: "Why You Should Volunteer", date: "Sep 12, 2025", image: "/give-20-768x512.jpg" }
  ];

  return (
    <div className="w-full bg-white">
      <PageBanner title="OUR BLOG" parent={{ label: "Media", href: "#" }} />
      
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h6 className="text-[#FFEE00] font-bold tracking-widest uppercase mb-4">Insights & Wellness</h6>
            <h2 className="text-4xl font-poppins font-bold text-[#002866] uppercase">VMC Health Blog</h2>
            <div className="w-24 h-1 bg-[#FFEE00] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogPosts.map((post, index) => (
              <div key={index} className="group cursor-pointer bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#002866] text-[#FFEE00] px-3 py-1 text-xs font-bold uppercase tracking-tighter">
                    Wellness
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 text-gray-400 text-xs font-roboto uppercase tracking-widest mb-4">
                    <span>Admin</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#002866] group-hover:text-[#FFEE00] transition-colors leading-tight mb-4 uppercase">
                    {post.title}
                  </h3>
                  <button className="text-sm font-black uppercase tracking-widest text-[#002866] group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                    Read Post <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button className="bg-[#FFEE00] text-[#002866] px-12 py-5 font-black uppercase tracking-widest hover:bg-[#002866] hover:text-white transition-all shadow-lg">
              View All Blog Posts
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';

export default function OneMillionSmilesPage() {
  const steps = [
    {
      title: "Sign up to participate",
      description: "Join the global movement and register your commitment.",
      icon: "📝"
    },
    {
      title: "Download the #WHD Toolkit",
      description: "Get all the resources you need to make an impact.",
      icon: "📥"
    },
    {
      title: "Upload your Report here",
      description: "Share your good deeds and inspire others.",
      icon: "📊"
    },
    {
      title: "Post and Tag #vmcorps #WHD",
      description: "Share your projects online and tag our community.",
      icon: "📱"
    }
  ];

  return (
    <div className="w-full bg-white">
      <PageBanner title="1 MILLION SMILES" parent={{ label: "Campaigns", href: "#" }} />
      
      {/* Hero Section */}
      <section className="py-24 bg-[#002866] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <h6 className="text-[#ff9f22] font-bold tracking-[0.3em] uppercase">World Humanitarian Day Campaign</h6>
              <h2 className="text-5xl md:text-7xl font-poppins font-black leading-tight">
                Creating <span className="text-[#ff9f22]">1 Million</span> Smiles
              </h2>
              <p className="text-xl text-gray-300 font-roboto leading-relaxed max-w-xl">
                Through 1 Million Good Deeds, we are making a global impact and bringing hope to those who need it most.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#ff9f22] text-[#002866] px-10 py-4 font-black uppercase tracking-widest hover:bg-white transition-colors">
                  Sign Up Now
                </button>
                <button className="border-2 border-white text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-[#002866] transition-all">
                  Give Now
                </button>
              </div>
            </div>
            <div className="relative h-[500px] lg:h-[600px] w-full">
              <Image 
                src="/give-15-768x512.jpg" 
                alt="1 Million Smiles" 
                fill 
                className="object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 border-[20px] border-[#ff9f22]/20 -m-6 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-poppins font-bold text-[#002866] uppercase mb-4">4 Steps to Participate in #WHD</h2>
            <div className="w-24 h-1 bg-[#ff9f22] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-10 rounded-sm shadow-lg hover:-translate-y-2 transition-transform duration-300 relative group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform block">{step.icon}</div>
                <div className="absolute top-6 right-6 text-6xl font-black text-gray-50 -z-0 select-none group-hover:text-[#ff9f22]/10 transition-colors">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-bold text-[#002866] mb-4 relative z-10">{step.title}</h3>
                <p className="text-gray-500 relative z-10">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video/CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative aspect-video bg-gray-900 rounded-sm overflow-hidden shadow-2xl mb-12 group cursor-pointer">
            <Image 
              src="/pmr-bg-slide.jpg" 
              alt="Campaign Video" 
              fill 
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-[#ff9f22] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-[#002866] border-b-[15px] border-b-transparent ml-2"></div>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-poppins font-bold text-[#002866] mb-8">
            Watch how we are creating smiles across the world
          </h3>
          <button className="bg-[#ff9f22] text-[#002866] px-12 py-5 font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-[#ff9f22]/20 transition-all">
            Join the movement today
          </button>
        </div>
      </section>
    </div>
  );
}

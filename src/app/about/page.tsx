import PageBanner from "@/components/PageBanner";
import Link from "next/link";
import Image from "next/image";

export default function AboutLandingPage() {
  const sections = [
    {
      title: "Our Story",
      description: "Learn about the origins, mission, and vision of the Volunteer Medical Corps.",
      href: "/about/our-story",
      image: "/pmr-bg-mission.jpg"
    },
    {
      title: "Board of Trustees",
      description: "Meet the distinguished professionals guiding our global initiatives.",
      href: "/about/board-of-trustees",
      image: "/give-15-768x512.jpg"
    },
    {
      title: "Annual Reports",
      description: "Transparency and impact: review our yearly performance and outreach summaries.",
      href: "/about/annual-reports",
      image: "/give-20-768x512.jpg"
    }
  ];

  return (
    <div className="w-full bg-white">
      <PageBanner title="About Us" />
      
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-[#002866] uppercase">Who We Are</h2>
            <div className="w-24 h-1 bg-[#ff9f22] mx-auto mt-6 mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The Volunteer Medical Corps is a global network of Christian health workers, para-medics, and volunteers committed to providing medical care and sustainable health solutions in regions of crisis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {sections.map((section) => (
              <div key={section.title} className="group bg-gray-50 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={section.image} 
                    alt={section.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-[#002866] mb-4 uppercase">{section.title}</h3>
                  <p className="text-gray-600 mb-8 flex-grow">{section.description}</p>
                  <Link 
                    href={section.href}
                    className="inline-block bg-[#002866] text-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all text-center"
                  >
                    Learn More
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

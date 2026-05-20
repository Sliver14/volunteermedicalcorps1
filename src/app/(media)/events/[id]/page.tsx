import PageBanner from "@/components/PageBanner";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { notFound } from "next/navigation";

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const eventId = params.id;
  
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event || !event.isActive) {
    return notFound();
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full bg-white font-roboto">
      <PageBanner title={event.title} parent={{ label: "Events", href: "/events" }} />

      <section className="py-16 md:py-24">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          
          <div className="mb-10 rounded-sm overflow-hidden shadow-xl border border-gray-100">
            <Image 
              src={event.image || "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg"} 
              alt={event.title} 
              width={1000} 
              height={600} 
              className="w-full h-auto object-cover"
              unoptimized
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-100 text-sm font-bold text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#ff9f22]" /> {formatDate(event.date)}
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#ff9f22]" /> {event.location}
              </div>
            )}
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
            <div dangerouslySetInnerHTML={{ __html: event.description || "" }} />
          </div>

          <div className="bg-gray-50 p-8 md:p-12 rounded-sm border border-gray-100 text-center">
            <h3 className="text-2xl font-poppins font-bold text-[#002866] mb-6">Interested in this event?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join us as we make a difference around the world. For more information about this event or to register, please contact us.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="bg-[#002866] text-white px-10 py-4 font-black uppercase tracking-widest text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all shadow-md rounded-sm">
                Become a Volunteer
              </Link>
              <Link href="/contact" className="bg-white text-[#002866] border-2 border-[#002866] px-10 py-4 font-black uppercase tracking-widest text-sm hover:bg-[#002866] hover:text-white transition-all shadow-sm rounded-sm">
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

"use client";

import PageBanner from "@/components/PageBanner";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaHeart } from "react-icons/fa";

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Patricia Pokhabela",
      title: "Radiographer",
      location: "Pietermaritzburg, South Africa",
      image: "https://volunteermedicalcorps.org/images/testimonies/patricia.jpg",
      quote: "I joined the VMC in 2019. I've always had a heart for community service work but I didn't know how or where to start. VMC gave me the platform to make an impact in my community and beyond."
    },
    {
      name: "Jeanne Louise Ridge",
      title: "Volunteer",
      location: "Capetown, South Africa",
      image: "https://volunteermedicalcorps.org/images/testimonies/jeanne.jpg",
      quote: "I enjoy working with people and spreading the love of Jesus Christ, and this is one of the reasons why I chose to join the VMC."
    },
    {
      name: "Jerilee Pinheiro",
      title: "HR professional",
      location: "Bangalore India",
      image: "https://volunteermedicalcorps.org/images/testimonies/Jerilee.jpg",
      quote: "Our President Pastor Chris said we must find human needs and meet them. VMC is a platform where we can do just that. Whenever I go to an orphanage or an old age home, and then they see the love of Jesus in my eyes that experience is very rewarding and encouraging."
    },
    {
      name: "Dr. Oluwatobi Akebunmi",
      title: "Medical Doctor",
      location: "Lagos, Nigeria",
      image: "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg",
      quote: "Being part of VMC has redefined my medical career. It's not just about treating symptoms; it's about healing lives and sharing the hope of the Gospel. Every outreach is a miracle in itself."
    },
    {
      name: "Sarah Jenkins",
      title: "Student Volunteer",
      location: "London, UK",
      image: "https://volunteermedicalcorps.org/admin/images/gallery/798453-1.jpg",
      quote: "VMC provided me with the opportunity to use my skills in a meaningful way. The training and support from the community are incredible. I've grown so much personally and spiritually."
    },
    {
      name: "Jean-Pierre Kabore",
      title: "Public Health Specialist",
      location: "Abidjan, Ivory Coast",
      image: "https://volunteermedicalcorps.org/admin/images/gallery/173895-bronx3.jpg",
      quote: "The impact of VMC in crisis regions is unparalleled. We bring clinical expertise and spiritual compassion to places where both are desperately needed. It's an honor to serve with this global team."
    }
  ];

  return (
    <div className="w-full bg-white">
      <PageBanner title="Testimonials" parent={{ label: "Media", href: "/media/news" }} />

      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#ff9f22]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#002866]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h3 className="text-[#ff9f22] font-bold text-[13px] uppercase tracking-[0.2em] mb-4 flex justify-center items-center gap-2">
              <FaHeart /> #volunteerdiaries
            </h3>
            <h2 className="text-4xl md:text-5xl font-black text-[#002866] mb-8 leading-tight uppercase">
              Stories of Impact
            </h2>
            <div className="w-24 h-1.5 bg-[#ff9f22] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-10 shadow-lg border border-slate-100 rounded-sm flex flex-col items-center text-center relative mt-12 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg group-hover:border-[#ff9f22] transition-colors duration-300">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    fill 
                    className="object-cover hover:grayscale transition-all duration-500" 
                    unoptimized 
                  />
                </div>
                
                <div className="text-[#ff9f22] opacity-10 absolute top-12 left-8">
                  <FaQuoteLeft size={48} />
                </div>
                
                <div className="flex gap-1 text-[#ff9f22] mb-6 mt-12">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                
                <p className="text-gray-600 italic mb-8 flex-grow leading-relaxed font-medium z-10 relative">
                  "{testimonial.quote}"
                </p>
                
                <div className="w-full pt-6 border-t border-gray-100">
                  <h4 className="text-[#002866] font-black text-sm uppercase tracking-widest">{testimonial.name}</h4>
                  <p className="text-gray-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{testimonial.location}</p>
                  <p className="text-[#ff9f22] text-xs font-bold mt-2 uppercase tracking-wider">{testimonial.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="py-20 bg-[#002866] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-6">Share Your Own VMC Story</h2>
          <p className="text-lg text-white/80 mb-10 leading-relaxed">
            Has your life been touched by the Volunteer Medical Corps? We'd love to hear about your experiences as a volunteer or a beneficiary.
          </p>
          <button className="bg-[#ff9f22] text-[#002866] px-12 py-5 font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl">
            Submit Your Testimony
          </button>
        </div>
      </section>
    </div>
  );
}

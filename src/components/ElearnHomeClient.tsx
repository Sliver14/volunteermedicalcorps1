"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Course {
  id: string;
  title: string;
  image: string;
  price: number;
  category: { name: string };
  students?: number;
  lessons?: number;
  rating?: number;
  _count?: {
    lessons?: number;
  };
}

interface Category {
  id: string;
  name: string;
  count?: number;
  icon?: string;
  _count?: {
    courses?: number;
  };
}

export default function ElearnHomeClient({
  courses,
  categories,
}: {
  courses: Course[];
  categories: Category[];
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="elearn-wrapper font-poppins text-gray-900 bg-white overflow-x-hidden">
      {/* Top Header */}
      <div className="bg-[#002866] text-white py-3 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <span className="text-[#ff9f22]">Call:</span>
              <a href="tel:+2347089267186" className="hover:text-[#ff9f22] transition-colors">+234 708 9267 186</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/60">Follow us:</span>
              <div className="flex items-center gap-3">
                {[
                  { icon: "facebook", url: "http://facebook.com/vmcorps.intl" },
                  { icon: "twitter", url: "http://twitter.com/vmedcorps" },
                  { icon: "linkedin", url: "https://linkedin.com/in/volunteer-medical-corps-586542184/" },
                  { icon: "instagram", url: "http://instagram.com/vmcorps" },
                  { icon: "youtube", url: "https://youtube.com/channel/UCQsqixtIBuYnsAM48Kigb4w" },
                ].map((social) => (
                  <a key={social.icon} href={social.url} target="_blank" className="hover:text-[#ff9f22] transition-colors">
                    <i className={`bx bxl-${social.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="flex items-center gap-2 hover:text-[#ff9f22] transition-colors">
              <i className="bx bx-log-in text-lg"></i> Log In
            </Link>
            <Link href="/register" className="flex items-center gap-2 hover:text-[#ff9f22] transition-colors font-bold">
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Navbar Area */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-5 md:py-6">
            <Link href="/elearn" className="flex items-center">
              <Image
                src="https://volunteermedicalcorps.org/images/logo-wide.png"
                alt="VMC Logo"
                width={180}
                height={60}
                className="h-10 sm:h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              <Link href="/elearn" className="text-[15px] font-bold text-[#002866] hover:text-[#ff9f22] transition-colors">Home</Link>
              <Link href="/elearn/about" className="text-[15px] font-bold text-[#002866] hover:text-[#ff9f22] transition-colors">About</Link>
              <div className="group relative">
                <Link href="/elearn/courses" className="text-[15px] font-bold text-[#002866] hover:text-[#ff9f22] transition-colors flex items-center gap-1">
                  Courses <i className="bx bx-chevron-down text-lg transition-transform group-hover:rotate-180"></i>
                </Link>
                <div className="absolute top-full left-0 w-64 bg-white shadow-2xl border-t-2 border-[#ff9f22] py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {categories.map((cat) => (
                    <Link key={cat.id} href={`/elearn/categories/${cat.id}`} className="block px-6 py-3 text-sm font-bold text-[#002866] hover:bg-gray-50 hover:text-[#ff9f22] transition-all">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/elearn/instructors" className="text-[15px] font-bold text-[#002866] hover:text-[#ff9f22] transition-colors">Instructors</Link>
              <Link href="/elearn/students" className="text-[15px] font-bold text-[#002866] hover:text-[#ff9f22] transition-colors">Students</Link>
              <Link href="/elearn/contacts" className="text-[15px] font-bold text-[#002866] hover:text-[#ff9f22] transition-colors">Contacts</Link>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setIsSearchOpen(true)} className="w-11 h-11 flex items-center justify-center bg-[#f5f5f5] text-[#002866] rounded-xl hover:bg-[#ff9f22] hover:text-white transition-all">
                <i className="bx bx-search text-xl"></i>
              </button>
              <button onClick={() => setIsMenuOpen(true)} className="lg:hidden w-11 h-11 flex items-center justify-center bg-[#002866] text-white rounded-xl active:scale-95 transition-all">
                <i className="bx bx-menu text-2xl"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 lg:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsMenuOpen(false)}>
          <div className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`} onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b flex justify-between items-center bg-[#002866] text-white">
              <span className="font-black uppercase tracking-widest text-sm">Navigation Menu</span>
              <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                <i className="bx bx-x text-2xl"></i>
              </button>
            </div>
            <nav className="p-6 space-y-4 font-bold text-[#002866]">
              <Link href="/elearn" className="block py-2 border-b border-gray-50">Home</Link>
              <Link href="/elearn/about" className="block py-2 border-b border-gray-50">About</Link>
              <Link href="/elearn/courses" className="block py-2 border-b border-gray-50">Courses</Link>
              <Link href="/elearn/instructors" className="block py-2 border-b border-gray-50">Instructors</Link>
              <Link href="/elearn/students" className="block py-2 border-b border-gray-50">Students</Link>
              <Link href="/elearn/contacts" className="block py-2">Contacts</Link>
            </nav>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative bg-[#f8f9fa] py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block bg-[#ff9f22]/10 text-[#ff9f22] px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">ENJOY EASY LEARNING</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#002866] leading-[1.1] tracking-tight mb-8">
                Convenient Easy Way of <span className="text-[#ff9f22]">Learning</span> New Skills!
              </h1>
              <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
                Learn from Volunteer Medical Corps' online platform and gain the best skills for your career and volunteering projects.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link href="/elearn/courses" className="bg-[#002866] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#ff9f22] transition-all shadow-xl shadow-blue-900/20 text-center">
                  View Courses
                </Link>
                <Link href="/register" className="bg-white text-[#002866] border-2 border-[#002866]/10 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-[#ff9f22] hover:text-[#ff9f22] transition-all text-center">
                  Get Started Free
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-gradient-to-tr from-[#ff9f22]/20 to-transparent blur-3xl rounded-full animate-pulse" />
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="https://volunteermedicalcorps.org/elearn/assets/images/home-inner-banner.jpg"
                  alt="Hero"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Boxes */}
      <section className="relative -mt-16 z-20 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Learn The Latest Skills", desc: "Medical, business, professional skills and more...", color: "bg-[#002866]", icon: "bx-book-open" },
              { title: "Premium Online Courses", desc: "In high-demand fields like Medicine, IT and Management.", color: "bg-white", icon: "bx-video" },
              { title: "Earn a Certificate", desc: "From a leading university in medicine, business, non-profit management.", color: "bg-[#ff9f22]", icon: "bx-certification" },
              { title: "Upgrade Your Skills", desc: "With on-demand training and development programs.", color: "bg-white", icon: "bx-trending-up" },
            ].map((box, i) => (
              <div key={i} className={`p-10 rounded-[2.5rem] shadow-xl transition-all duration-300 group hover:-translate-y-2 border border-gray-100 ${box.color === "bg-white" ? "bg-white text-[#002866]" : box.color + " text-white"}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-8 transition-colors ${box.color === "bg-white" ? "bg-[#002866]/5 text-[#002866] group-hover:bg-[#ff9f22] group-hover:text-white" : "bg-white/10 group-hover:bg-white group-hover:text-[#ff9f22]"}`}>
                  <i className={`bx ${box.icon}`}></i>
                </div>
                <h3 className="text-2xl font-black leading-tight mb-4 tracking-tight">{box.title}</h3>
                <p className={`font-medium leading-relaxed mb-8 opacity-70 ${box.color === "bg-white" ? "text-gray-500" : "text-white/80"}`}>{box.desc}</p>
                <Link href="/elearn/courses" className={`inline-flex items-center gap-2 font-black uppercase tracking-widest text-[10px] transition-all group-hover:translate-x-2 ${box.color === "bg-white" ? "text-[#ff9f22]" : "text-white"}`}>
                  View Courses <i className="bx bx-right-arrow-alt text-lg"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Courses */}
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-16">
            <div className="text-center md:text-left">
              <span className="text-[#ff9f22] font-black uppercase tracking-[0.4em] text-xs">Discover Courses</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#002866] mt-4 tracking-tighter">Trending Online <span className="text-[#ff9f22]">Courses</span></h2>
            </div>
            <Link href="/elearn/courses" className="bg-[#002866] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#ff9f22] transition-all shadow-xl shadow-blue-900/10">
              Explore All Courses
            </Link>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="pb-20"
          >
            {courses.map((course) => (
              <SwiperSlide key={course.id}>
                <Link href={`/elearn/view-course/${course.id}`} className="block group h-full">
                  <div className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full group-hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm text-[10px] px-5 py-2.5 rounded-2xl font-black uppercase tracking-[0.2em] text-[#002866] shadow-sm">
                        {course.category.name}
                      </div>
                    </div>

                    <div className="p-10 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-6 opacity-60">
                        <Image src="https://volunteermedicalcorps.org/elearn/instructors/images/users/default-avatar.jpg" width={32} height={32} className="rounded-full" alt="Author" />
                        <span className="text-[11px] font-black uppercase tracking-widest">VMC Academy</span>
                      </div>
                      <h3 className="font-black text-2xl text-[#002866] leading-tight mb-8 group-hover:text-[#ff9f22] transition-colors line-clamp-2 min-h-[64px]">
                        {course.title}
                      </h3>

                      <div className="mt-auto flex justify-between items-center pt-8 border-t border-gray-50">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                          <span className="flex items-center gap-1"><i className="bx bx-user text-blue-500 text-lg"></i> {course.students}</span>
                          <span className="flex items-center gap-1"><i className="bx bx-book-open text-blue-500 text-lg"></i> {course.lessons}</span>
                        </div>
                        <div className="text-2xl font-black text-[#ff9f22]">
                          {course.price === 0 ? "FREE" : `₦${course.price.toLocaleString()}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Mission Area */}
      <section className="relative py-24 md:py-32 bg-[#002866] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://volunteermedicalcorps.org/elearn/assets/img/mission-bg.jpg')] bg-cover bg-center" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-[#ff9f22] font-black uppercase tracking-[0.4em] text-xs">Discover Purpose</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4 mb-10 tracking-tighter">Why choose to study <br /> with us</h2>
              
              <Swiper
                modules={[Pagination, Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 6000 }}
                pagination={{ clickable: true }}
                className="mission-swiper"
              >
                <SwiperSlide>
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-[#ff9f22]">Quality is better than quantity here</h3>
                    <p className="text-lg text-white/70 leading-relaxed font-medium">We are very selective about our instructors and also the quality of courses we produce for your learning experience so it might look at times that we do not have so many courses to offer.</p>
                    <p className="text-lg text-white/70 leading-relaxed font-medium">But what we lack in quantity, we compensate for greatly in the quality of our courses. Every course is properly vetted to ensure it complies with our standard for you.</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-[#ff9f22]">Learn without straining conditions</h3>
                    <p className="text-lg text-white/70 leading-relaxed font-medium">Learning a new course doesn't have to be tedious or cumbersome. We believe in simplicity of courses and training modules, and that is why we have made it simple.</p>
                    <p className="text-lg text-white/70 leading-relaxed font-medium">Learn at your pace, finish the course when it suits you. No pressure from anywhere and best of all, you still get the same quality experience the course has to offer.</p>
                  </div>
                </SwiperSlide>
              </Swiper>

              <div className="mt-12">
                <Link href="/elearn/about" className="bg-[#ff9f22] text-[#002866] px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl shadow-orange-950/20">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white/10">
                <Image src="https://volunteermedicalcorps.org/elearn/assets/images/home-inner-banner.jpg" width={800} height={600} className="w-full h-auto object-cover" alt="Mission" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 md:py-32 bg-[#f8f9fa] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-16 text-center md:text-left">
            <div>
              <span className="text-[#ff9f22] font-black uppercase tracking-[0.4em] text-xs">Knowledge Base</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#002866] mt-4 tracking-tighter">Browse Trending <span className="text-[#ff9f22]">Categories</span></h2>
            </div>
            <Link href="/elearn/courses" className="bg-white text-[#002866] border-2 border-[#002866]/5 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-[#ff9f22] hover:text-[#ff9f22] transition-all shadow-sm">
              View All Categories
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/elearn/categories/${cat.id}`}
                className="bg-white p-12 rounded-[3rem] border border-gray-100 hover:bg-[#002866] transition-all duration-500 group flex flex-col items-center text-center shadow-sm hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center text-5xl mb-8 group-hover:bg-[#ff9f22] group-hover:text-white transition-all duration-500">
                  <i className={`bx ${cat.icon}`}></i>
                </div>
                <h3 className="text-2xl font-black text-[#002866] mb-3 group-hover:text-white transition-colors">{cat.name}</h3>
                <p className="text-[#ff9f22] font-black uppercase tracking-[0.2em] text-[10px]">{cat.count} Courses Available</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Area */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#002866] tracking-tight">Our Global Partners</h2>
            <div className="w-20 h-1 bg-[#ff9f22] mx-auto mt-6 rounded-full" />
          </div>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
            autoplay={{ delay: 3000 }}
            className="partner-swiper"
          >
            {[
              "tcera.png", "healing_school.png", "premiercare.png", "lmms.png", "tcif.png", "vmc.png"
            ].map((logo, i) => (
              <SwiperSlide key={i}>
                <div className="h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
                  <Image src={`https://volunteermedicalcorps.org/elearn/assets/images/clients/${logo}`} width={160} height={80} className="max-w-full h-auto object-contain" alt="Partner" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* What We Offer Area */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gray-950">
        <div className="absolute inset-0">
          <Image src="https://volunteermedicalcorps.org/elearn/assets/img/offer-bg.jpg" fill className="object-cover opacity-20" alt="Offer BG" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-20 text-white">
            <span className="text-[#ff9f22] font-black uppercase tracking-[0.4em] text-xs">Make Connections</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 tracking-tighter">What We Offer</h2>
            <p className="text-lg text-white/60 font-medium leading-relaxed">
              Acquiring new skills and improving oneself in any chosen profession is key to career furtherance and development. We have created the right environment for you to achieve that.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "bx-book-reader", title: "Exclusive Advisor", desc: "Our Instructors are top professionals in their respective field of discipline. That's a fact." },
              { icon: "bx-target-lock", title: "Reach Your Goals", desc: "Set goals and reach them following our well structured learning process as a guide." },
              { icon: "bxs-thermometer", title: "Digital Library", desc: "We have an archive of digital assets for your convenience while studying. Learning with ease just got better." },
            ].map((offer, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-12 rounded-[3rem] text-center hover:bg-white group transition-all duration-500">
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-5xl text-[#ff9f22] mx-auto mb-8 group-hover:bg-[#ff9f22] group-hover:text-white transition-all duration-500">
                  <i className={`bx ${offer.icon}`}></i>
                </div>
                <h3 className="text-2xl font-black text-white group-hover:text-[#002866] mb-4 transition-colors">{offer.title}</h3>
                <p className="text-white/60 group-hover:text-gray-500 font-medium leading-relaxed transition-colors">{offer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become Instructor Area */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#ff9f22] rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 p-12 md:p-20 text-white">
              <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Become an Instructor</h2>
              <p className="text-lg md:text-xl font-medium leading-relaxed mb-10 text-white/90">
                Join a host of top professional instructors who are sharing their skills and knowledge to a yearning generation.
              </p>
              <Link href="/elearn/instructors" className="inline-block bg-[#002866] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-[#002866] transition-all">
                Apply Now <i className="bx bx-plus-circle ml-2"></i>
              </Link>
            </div>
            <div className="lg:w-1/2 relative h-[400px] lg:h-full min-h-[500px] w-full">
              <Image src="https://volunteermedicalcorps.org/elearn/assets/img/become-instructor.jpg" fill className="object-cover" alt="Instructor" />
            </div>
          </div>
        </div>
      </section>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-3xl rounded-[3rem] p-12 sm:p-20 relative shadow-2xl scale-in-95 animate-in zoom-in-95 duration-300">
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-10 right-10 text-4xl text-gray-400 hover:text-[#ff9f22] transition-colors">
              <i className="bx bx-x"></i>
            </button>
            <h3 className="text-4xl font-black text-[#002866] mb-10 tracking-tight">Search for Courses</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="What do you want to learn today?"
                className="w-full border-b-4 border-gray-100 py-6 text-2xl font-bold focus:outline-none focus:border-[#ff9f22] transition-all"
                autoFocus
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-[#ff9f22] text-white rounded-2xl flex items-center justify-center hover:bg-[#002866] transition-all shadow-xl shadow-orange-950/20">
                <i className="bx bx-search text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Area */}
      <footer className="bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-gray-200">
            <div className="space-y-8">
              <Image src="https://volunteermedicalcorps.org/images/logo-wide.png" width={200} height={60} alt="Logo" className="grayscale brightness-0" />
              <div className="space-y-4">
                <h4 className="text-sm font-black uppercase tracking-widest text-[#002866]">Contact Us</h4>
                <ul className="space-y-4 text-gray-500 text-sm font-medium">
                  <li className="flex items-start gap-3"><i className="bx bx-map text-[#ff9f22] text-xl"></i> 29, Unity Road, Off Obafemi Awolowo Road, Ikeja, Lagos Nigeria</li>
                  <li className="flex items-center gap-3"><i className="bx bx-phone-call text-[#ff9f22] text-xl"></i> +234 708 9267 186</li>
                  <li className="flex items-center gap-3"><i className="bx bx-envelope text-[#ff9f22] text-xl"></i> learning@volunteermedicalcorps.org</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-sm font-black uppercase tracking-widest text-[#002866]">Support</h4>
              <ul className="space-y-4 text-gray-500 text-sm font-medium">
                <li><Link href="/privacy-policy" className="hover:text-[#ff9f22] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/faqs" className="hover:text-[#ff9f22] transition-colors">FAQ's</Link></li>
                <li><Link href="/support" className="hover:text-[#ff9f22] transition-colors">Support</Link></li>
                <li><Link href="/terms-of-use" className="hover:text-[#ff9f22] transition-colors">Terms of Use</Link></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-sm font-black uppercase tracking-widest text-[#002866]">Useful Links</h4>
              <ul className="space-y-4 text-gray-500 text-sm font-medium">
                <li><Link href="/elearn/students" className="hover:text-[#ff9f22] transition-colors">Become a Student</Link></li>
                <li><Link href="/elearn/partners" className="hover:text-[#ff9f22] transition-colors">Become a Partner</Link></li>
                <li><Link href="/elearn/instructors" className="hover:text-[#ff9f22] transition-colors">Be an Instructor</Link></li>
                <li><Link href="/elearn/courses" className="hover:text-[#ff9f22] transition-colors">All Courses</Link></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-sm font-black uppercase tracking-widest text-[#002866]">Newsletter</h4>
              <p className="text-gray-500 text-sm font-medium">Subscribe for the latest updates and course releases.</p>
              <div className="relative">
                <input type="email" placeholder="Enter your email" className="w-full bg-white border border-gray-200 rounded-2xl py-5 px-6 text-sm focus:outline-none focus:border-[#ff9f22] transition-all shadow-sm" />
                <button className="absolute right-2 top-2 bottom-2 bg-[#002866] text-white px-6 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#ff9f22] transition-all">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">© 2026 VMC Learning Portal. All Rights Reserved.</p>
            <div className="flex gap-6">
              {["facebook", "twitter", "linkedin", "instagram", "youtube"].map(s => (
                <a key={s} href="#" className="text-gray-400 hover:text-[#002866] transition-colors text-xl">
                  <i className={`bx bxl-${s}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

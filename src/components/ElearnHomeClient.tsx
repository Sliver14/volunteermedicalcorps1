"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { 
  Phone, 
  Search, 
  Menu, 
  X, 
  GraduationCap, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Users, 
  Video, 
  ChevronDown,
  ArrowRight,
  Briefcase,
  Layers,
  Camera,
  MapPin,
  Mail,
  ChevronLeft
} from "lucide-react";

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
    <div className="elearn-wrapper font-sans text-text-main bg-bg-base overflow-x-hidden antialiased">
      {/* Top Header */}
      <div className="bg-[#001f4d] text-white/90 py-2.5 px-4 text-xs border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6 font-medium">
            <span className="text-white/60">Call: <a href="tel:+2347089267186" className="text-white hover:text-[#00a3e0] transition-colors font-semibold">+234 708 9267 186</a></span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline text-white/60">Follow Us</span>
          </div>
          <div className="flex items-center gap-4 font-semibold">
            <Link href="/login" className="hover:text-[#00a3e0] transition-colors">Login</Link>
            <span className="text-white/20">/</span>
            <Link href="/register" className="hover:text-[#00a3e0] transition-colors">Register</Link>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-bg-surface border-b border-border-main sticky top-0 z-50 backdrop-blur-md bg-bg-surface/95 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/elearn" className="flex-shrink-0">
            <Image
              src="https://volunteermedicalcorps.org/images/logo-wide.png"
              alt="VMC Logo"
              width={160}
              height={50}
              className="h-10 w-auto object-contain dark:brightness-125 transition-all"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/elearn" className="text-sm font-semibold text-brand-primary dark:text-brand-secondary hover:text-[#00a3e0] transition-colors">Home</Link>
            <Link href="/elearn/about" className="text-sm font-semibold text-text-muted hover:text-[#00a3e0] transition-colors">About</Link>
            <div className="group relative">
              <Link href="/elearn/courses" className="text-sm font-semibold text-text-muted hover:text-[#00a3e0] transition-colors flex items-center gap-1">
                Courses <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute top-full left-0 w-64 bg-bg-surface shadow-xl rounded-b-xl border-t-2 border-[#00a3e0] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/elearn/categories/${cat.id}`} className="block px-4 py-2 text-xs font-semibold text-text-main hover:bg-bg-base hover:text-[#00a3e0]">
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/elearn/instructors" className="text-sm font-semibold text-text-muted hover:text-[#00a3e0] transition-colors">Instructors</Link>
            <Link href="/elearn/students" className="text-sm font-semibold text-text-muted hover:text-[#00a3e0] transition-colors">Students</Link>
            <Link href="/elearn/contacts" className="text-sm font-semibold text-text-muted hover:text-[#00a3e0] transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsSearchOpen(true)} className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-[#00a3e0] hover:bg-bg-base rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-[#1e2530] text-white pt-16 pb-32 lg:pt-24 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 text-left space-y-6">
              <span className="inline-block bg-white/10 text-[#00a3e0] border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Enjoy Easy Learning
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
                Convenient Easy Way of Learning <span className="text-[#00a3e0]">New Skills!</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-medium leading-relaxed">
                Learn from Volunteer Medical Corps' online platform and gain the best skills for your career and volunteering projects.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/elearn/courses" className="bg-[#00a3e0] text-white px-8 py-3.5 rounded-lg font-bold text-sm hover:bg-[#0082b3] transition-colors shadow-lg shadow-[#00a3e0]/20">
                  View Courses
                </Link>
                <Link href="/register" className="bg-transparent text-white border border-white/20 px-8 py-3.5 rounded-lg font-bold text-sm hover:bg-white/5 transition-colors">
                  Get Started
                </Link>
              </div>
            </div>

            {/* Complex Image Mask Layout matching UI Image */}
            <div className="lg:col-span-6 relative flex justify-center items-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-[520px] aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/10">
                <Image
                  src="https://volunteermedicalcorps.org/elearn/assets/images/home-inner-banner.jpg"
                  alt="Background Workspace"
                  fill
                  className="object-cover"
                />
                {/* Secondary overlapping curved portrait layout */}
                <div className="absolute top-4 right-4 w-[45%] aspect-square rounded-[80px_30px_80px_80px] overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                  <Image 
                    src="https://volunteermedicalcorps.org/elearn/assets/images/home-inner-banner.jpg" 
                    alt="Group Collaboration"
                    fill
                    className="object-cover scale-125 object-right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Value Banner - Re-styled for Flush Alignment */}
      <section className="relative -mt-20 z-20 px-4">
        <div className="max-w-7xl mx-auto bg-bg-surface rounded-3xl shadow-xl border border-border-main overflow-hidden grid sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Learn The Latest Skills", desc: "Medical, business, professional skills and more...", bg: "bg-[#002866]", text: "text-white", icon: BookOpen, accent: "text-[#00a3e0]" },
            { title: "Premium Online Courses", desc: "In high-demand fields like Medicine, IT and Management.", bg: "bg-[#003d99]", text: "text-white", icon: Video, accent: "text-white/80" },
            { title: "Earn a Certificate", desc: "From leading certified instances and medical bodies.", bg: "bg-[#0052cc]", text: "text-white", icon: Award, accent: "text-white/80" },
            { title: "Upgrade Your Skills", desc: "With on-demand training and professional modules.", bg: "bg-[#0066ff]", text: "text-white", icon: TrendingUp, accent: "text-white/80" },
          ].map((box, i) => (
            <div key={i} className={`p-8 flex flex-col justify-between border-b sm:border-b-0 border-white/10 ${box.bg} ${box.text}`}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <box.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold tracking-tight leading-snug">{box.title}</h3>
                <p className="text-xs text-white/70 font-medium leading-relaxed">{box.desc}</p>
              </div>
              <Link href="/elearn/courses" className="inline-flex items-center gap-1 text-xs font-bold mt-6 hover:underline transition-all">
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Online Courses */}
      <section className="py-20 bg-bg-base transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <span className="text-[#00a3e0] text-xs font-bold uppercase tracking-wider">Course Catalogue</span>
              <h2 className="text-3xl font-extrabold text-brand-primary dark:text-brand-secondary mt-2 tracking-tight">Trending Online Courses</h2>
            </div>
            <Link href="/elearn/courses" className="bg-[#00a3e0] text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-[#0082b3] transition-colors shadow-md">
              View All Courses
            </Link>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            className="pb-16"
          >
            {courses.map((course) => (
              <SwiperSlide key={course.id}>
                <div className="bg-bg-surface rounded-2xl overflow-hidden border border-border-main shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
                  <Link href={`/elearn/courses/${course.id}`} className="relative aspect-video w-full bg-bg-base overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 bg-bg-surface/90 backdrop-blur-sm text-[10px] font-bold px-3 py-1 rounded-md text-brand-primary dark:text-brand-secondary shadow-xs">
                      {course.category.name}
                    </span>
                  </Link>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-bg-base overflow-hidden relative border border-border-main">
                        <Image src="https://volunteermedicalcorps.org/elearn/instructors/images/users/default-avatar.jpg" fill alt="Avatar" />
                      </div>
                      <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">VMC Academy</span>
                    </div>

                    <Link href={`/elearn/courses/${course.id}`}>
                      <h3 className="font-bold text-base text-brand-primary dark:text-text-main group-hover:text-[#00a3e0] transition-colors line-clamp-2 mb-4">
                        {course.title}
                      </h3>
                    </Link>

                    <div className="mt-auto pt-4 border-t border-border-main flex justify-between items-center">
                      <div className="flex items-center gap-3 text-xs font-medium text-text-muted">
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.students || 0}</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.lessons || 0}</span>
                      </div>
                      <div className="text-base font-bold text-[#00a3e0]">
                        {course.price === 0 ? "FREE" : `₦${course.price.toLocaleString()}`}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-bg-base transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[#00a3e0] text-xs font-bold uppercase tracking-wider">Discover Purpose</span>
                <h2 className="text-3xl font-extrabold text-brand-primary dark:text-brand-secondary mt-2 tracking-tight">Why choose to study with us</h2>
              </div>
              
              <div className="space-y-4 text-text-muted">
                <h3 className="text-xl font-bold text-text-main">Learn without straining conditions</h3>
                <p className="text-sm leading-relaxed">
                  Learning a new course doesn't have to be tedious or cumbersome. We believe in simplicity of courses and training modules, and that is why we have made it simple.
                </p>
                <p className="text-sm leading-relaxed">
                  Learn at your pace, finish the course when it suits you. No pressure from anywhere and best of all, you still get the same quality experience the course has to offer.
                </p>
              </div>

              <div className="pt-2">
                <Link href="/elearn/about" className="inline-flex items-center gap-2 bg-brand-primary dark:bg-brand-secondary text-white dark:text-brand-primary px-6 py-3 rounded-lg font-bold text-xs hover:bg-brand-primary/90 transition-colors shadow-sm">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 flex justify-end">
              <div className="relative w-full max-w-xl aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-border-main">
                <Image src="https://volunteermedicalcorps.org/elearn/assets/images/home-inner-banner.jpg" fill className="object-cover" alt="Mission workspace" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Trending Categories */}
      <section className="py-20 bg-bg-base border-t border-border-main transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <span className="text-[#00a3e0] text-xs font-bold uppercase tracking-wider">Knowledge Base</span>
              <h2 className="text-3xl font-extrabold text-brand-primary dark:text-brand-secondary mt-2 tracking-tight">Browse Trending Categories</h2>
            </div>
            <Link href="/elearn/courses" className="bg-bg-surface border border-border-main text-text-main px-4 py-2 rounded-lg text-xs font-bold hover:bg-bg-base transition-colors">
              View All Categories
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Leadership & Management", courses: "2 Courses", bg: "bg-[#10b981]", icon: Layers },
              { name: "Professional Skills", courses: "4 Courses", bg: "bg-[#f59e0b]", icon: Camera },
              { name: "Public Health", courses: "1 Courses", bg: "bg-[#14b8a6]", icon: Briefcase },
              { name: "Clinical Training", courses: "5 Courses", bg: "bg-[#3b82f6]", icon: GraduationCap },
            ].map((cat, idx) => (
              <div key={idx} className="bg-bg-surface p-8 rounded-2xl border border-border-main shadow-xs hover:shadow-md transition-all flex flex-col items-center text-center group">
                <div className={`w-16 h-16 ${cat.bg} text-white rounded-xl flex items-center justify-center text-2xl mb-6 shadow-sm`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-brand-primary dark:text-brand-secondary mb-2 group-hover:text-[#00a3e0] transition-colors">{cat.name}</h3>
                <span className="text-xs font-semibold text-text-muted">{cat.courses}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Partners */}
      <section className="py-12 bg-bg-base border-t border-b border-border-main">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-text-muted mb-8">Our Global Partners</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
            {["tcera.png", "healing_school.png", "premiercare.png", "lmms.png", "tcif.png", "vmc.png"].map((logo, idx) => (
              <div key={idx} className="h-12 w-full max-w-[120px] relative grayscale hover:grayscale-0 transition-all duration-300">
                <Image src={`https://volunteermedicalcorps.org/elearn/assets/images/clients/${logo}`} fill className="object-contain" alt="Partner Logo" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-[#0d131f] text-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4 px-4">
          <span className="text-[#00a3e0] text-xs font-bold uppercase tracking-wider">What We Offer</span>
          <h2 className="text-3xl font-extrabold tracking-tight">Acquire Skills & Scale Your Growth</h2>
          <p className="text-sm text-text-muted leading-relaxed font-medium">
            Acquiring new skills and improving oneself in any chosen profession is key to career furtherance and development. We have created the right environment for you to achieve that.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            { title: "Exclusive Advisor", desc: "Our Instructors are top professionals in their respective field of discipline. That's a fact.", icon: GraduationCap },
            { title: "Reach Your Goals", desc: "Set goals and reach them following our well structured learning process as a guide.", icon: TrendingUp },
            { title: "Digital Library", desc: "We have an archive of digital assets for your convenience while studying.", icon: BookOpen },
          ].map((offer, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl text-center hover:bg-white/[0.04] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#00a3e0]/10 flex items-center justify-center text-[#00a3e0] mx-auto mb-6">
                <offer.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold mb-3">{offer.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed font-medium">{offer.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Become Instructor */}
      <section className="py-16 bg-bg-base px-4">
        <div className="max-w-5xl mx-auto bg-slate-900 text-white rounded-3xl overflow-hidden grid md:grid-cols-12 items-center shadow-xl">
          <div className="p-8 md:p-12 md:col-span-7 space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight">Become an Instructor</h2>
            <p className="text-sm text-text-muted font-medium leading-relaxed">
              Join a host of top professional instructors who are sharing their skills and knowledge to a yearning generation.
            </p>
            <Link href="/elearn/instructors" className="inline-flex items-center gap-2 bg-[#00a3e0] text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-[#0082b3] transition-colors">
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="hidden md:block md:col-span-5 relative h-full min-h-[280px]">
            <Image src="https://volunteermedicalcorps.org/elearn/assets/img/become-instructor.jpg" fill className="object-cover" alt="Instructor visual" />
          </div>
        </div>
      </section>

      {/* Search Overlay Dynamic Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-bg-surface w-full max-w-xl rounded-2xl p-8 relative shadow-2xl transition-colors duration-300">
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-4 right-4 text-text-muted hover:text-text-main">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-brand-primary dark:text-brand-secondary mb-4">Search Platform</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="What do you want to learn today?"
                className="w-full bg-bg-base border border-border-main rounded-xl py-3 pl-4 pr-12 text-sm font-medium focus:outline-none focus:border-[#00a3e0] transition-colors text-text-main"
                autoFocus
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#00a3e0] text-white rounded-lg flex items-center justify-center hover:bg-[#0082b3] transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Area */}
      <footer className="bg-slate-950 text-slate-400 text-xs font-medium pt-16 pb-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          <div className="space-y-6">
            <Image src="https://volunteermedicalcorps.org/images/logo-wide.png" width={140} height={45} alt="Logo" className="brightness-0 invert opacity-80" />
            <ul className="space-y-3">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-[#00a3e0] shrink-0" /> 29, Unity Road, Off Obafemi Awolowo Road, Ikeja, Lagos Nigeria</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#00a3e0] shrink-0" /> +234 708 9267 186</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#00a3e0] shrink-0" /> learning@volunteermedicalcorps.org</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/faqs" className="hover:text-white transition-colors">FAQ's</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">Support Center</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm">Useful Links</h4>
            <ul className="space-y-2">
              <li><Link href="/elearn/students" className="hover:text-white transition-colors">Become a Student</Link></li>
              <li><Link href="/elearn/partners" className="hover:text-white transition-colors">Become a Partner</Link></li>
              <li><Link href="/elearn/instructors" className="hover:text-white transition-colors">Be an Instructor</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm">Newsletter</h4>
            <p className="text-slate-500 leading-relaxed">Subscribe for the latest updates and course releases.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#00a3e0] text-white text-xs" />
              <button className="bg-[#00a3e0] text-white px-4 rounded-lg font-bold hover:bg-[#0082b3] transition-colors">Join</button>
            </div>
          </div>
        </div>

        <div className="pt-6 text-center text-slate-600 text-[11px]">
          <p>© 2026 VMC Learning Portal. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
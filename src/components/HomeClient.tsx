"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, animate, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaUser, FaComment, FaQuoteLeft, FaStar, FaHeart, FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import { useIsMobile } from "@/hooks/useIsMobile";

function Counter({ value, suffix = "", prefix = "", decimal = false }: { value: number; suffix?: string, prefix?: string, decimal?: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated.current) {
          isAnimated.current = true;
          animate(0, value, {
            duration: 2,
            ease: "easeOut",
            onUpdate: (latest) => setDisplayValue(decimal ? Number(latest.toFixed(1)) : Math.floor(latest)),
          });
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, decimal]);

  return (
    <span ref={ref}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

interface Campaign {
  id: number;
  title: string;
  country: string;
  date: string;
  image: string;
  description: string;
}

interface NewsItem {
  id: string;
  title: string;
  image: string | null;
  date: Date | string;
  author: string | null;
}

interface EventItem {
  id: string;
  title: string;
  image: string | null;
  date: Date | string;
  location: string | null;
}

interface BlogItem {
  id: string;
  title: string;
  image: string | null;
  date: Date | string;
}

interface TestimonialItem {
  id: string;
  name: string;
  content: string;
  image: string | null;
  location?: string | null;
  role?: string | null;
}

interface HomeClientProps {
  initialNews: NewsItem[];
  initialEvents: EventItem[];
  initialBlogs: BlogItem[];
  initialTestimonials: TestimonialItem[];
  campaignData: Campaign[];
}

export default function HomeClient({ 
  initialNews, 
  initialEvents, 
  initialBlogs, 
  initialTestimonials,
  campaignData 
}: HomeClientProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCampaignId, setSelectedCampaignId] = useState(1);

  const selectedCampaign = useMemo(() => 
    campaignData.find((c: Campaign) => c.id === selectedCampaignId) || campaignData[0], 
  [selectedCampaignId, campaignData]);

  const regions = ["Africa", "Middle East/Asia", "America/Caribbean", "Nigeria", "Europe", "Australia"];

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedRegion(val);
    if (val) {
      router.push(`/campaign-search?region=${encodeURIComponent(val)}`);
    }
  };

  // Hero Slider Logic
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const heroSlides = useMemo(() => [
    { 
      bg: "https://volunteermedicalcorps.org/images/sliders/8ZQ9Vj6Az791283465.jpeg", 
      sub: "Multiply your global impact", 
      title: "Healing Everywhere Lead Partnership Extender", 
      btnText: "Get Started", 
      link: "https://healingstreams.tv/helper" 
    },
    { 
      bg: "https://volunteermedicalcorps.org/images/sliders/9q3WoyGbz829456713.jpg", 
      sub: "Saving Lives Through Good Deeds", 
      title: "Support the Cause - Sponsor a project today!", 
      btnText: "Give Now", 
      link: "/give" 
    },
    { 
      bg: "https://volunteermedicalcorps.org/images/sliders/yn4Y1uGUV794815623.jpg", 
      sub: "Start your volunteering journey", 
      title: "Become a Volunteer and provide medical care!", 
      btnText: "Join Us Today", 
      link: "/register" 
    }
  ], []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const formatDate = (date: string | Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full font-roboto text-text-main">
      
      {/* Hero Section - Optimized Responsive */}
      <section className="bg-bg-base py-4 md:py-8 md:my-12 overflow-hidden transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Left: Slider */}
            <div className="lg:col-span-7 relative">
              <div className="relative w-full h-65 sm:h-80 md:h-[400px] lg:h-[420px] xl:h-[460px] rounded-xs overflow-hidden group shadow-lg border border-border-main">
                
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentSlide}
                    initial={isMobile 
                      ? { opacity: 0, y: 40 } 
                      : { opacity: 0, x: direction > 0 ? 300 : -300 }
                    }
                    animate={isMobile 
                      ? { opacity: 1, y: 0 } 
                      : { opacity: 1, x: 0 }
                    }
                    exit={isMobile 
                      ? { opacity: 0, y: 40 } 
                      : { opacity: 0, x: direction > 0 ? -300 : 300 }
                    }
                    transition={{ 
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.4 },
                      duration: isMobile ? 0.35 : 0.6,
                      ease: "easeOut" 
                    }}
                    className="absolute inset-0"
                  >
                    <Link href={heroSlides[currentSlide].link} className="block h-full">
                      <div className="relative w-full h-full">
                        <Image 
                          src={heroSlides[currentSlide].bg} 
                          alt="Slide Background" 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" 
                          priority 
                          unoptimized
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent flex flex-col justify-end p-4 md:p-6 lg:p-8 text-white">
                          
                          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase mb-2 leading-tight">
                            {heroSlides[currentSlide].title}
                          </h2>

                          <p className="text-sm md:text-base mb-4 max-w-sm opacity-90 hidden sm:block">
                            {heroSlides[currentSlide].sub}
                          </p>

                          <div className="inline-block w-max bg-brand-primary dark:bg-brand-secondary text-white dark:text-brand-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all">
                            {heroSlides[currentSlide].btnText}
                          </div>

                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-black/40 hover:bg-brand-secondary text-white rounded-full flex items-center justify-center transition-all"
                >
                  <FaChevronLeft size={14} />
                </button>

                <button 
                  onClick={nextSlide}
                  className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-black/40 hover:bg-brand-secondary text-white rounded-full flex items-center justify-center transition-all"
                >
                  <FaChevronRight size={14} />
                </button>

              </div>
            </div>

            {/* Right: Events */}
            <div className="lg:col-span-5 flex flex-col lg:h-[420px] xl:h-[460px] min-h-0 overflow-hidden">
              
              <div className="flex justify-between items-center border-b border-border-main pb-3 mb-4">
                <h3 className="text-brand-primary dark:text-brand-secondary text-lg md:text-sm font-semibold uppercase">
                  Campaigns & Events
                </h3>
              </div>
              
              <div className="space-y-3 flex-1 min-h-0 overflow-y-auto pr-1 custom-scrollbar">
                {initialEvents.map((event: EventItem) => (
                  <Link key={event.id} href={`/events/${event.id}`} className="group block">
                    <div className="flex gap-3 p-3 rounded-lg border border-border-main bg-bg-surface hover:border-brand-secondary/30 hover:shadow-sm transition-all">
                      
                      <div className="relative w-16 h-16 md:w-18 md:h-18 shrink-0 overflow-hidden rounded-md border border-border-main">
                        <Image 
                          src={event.image || "https://volunteermedicalcorps.org/admin/images/events/1774261927HYQzF6kpX.jpg"} 
                          alt={event.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-300" 
                          unoptimized
                        />
                      </div>

                      <div className="flex flex-col justify-center min-w-0">
                        <p className="text-brand-secondary text-[9px] font-black uppercase mb-1">
                          {formatDate(event.date)}
                        </p>

                        <h4 className="text-brand-primary dark:text-text-main text-xs md:text-sm font-bold line-clamp-2 group-hover:text-brand-secondary transition-colors">
                          {event.title}
                        </h4>

                        <p className="text-text-muted text-[10px] md:text-xs flex items-center gap-1">
                          • {event.location || "Global"}
                        </p>
                      </div>

                    </div>
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-4 lg:mt-6">
                <Link 
                  href="/register" 
                  className="flex items-center justify-between bg-brand-primary dark:bg-brand-secondary text-white dark:text-brand-primary px-4 py-4 md:px-5 md:py-5 rounded-xs transition-all group shadow-lg"
                >
                  <div>
                    <p className="text-[10px] font-black uppercase opacity-70">Get Involved</p>
                    <p className="text-sm md:text-base font-black uppercase">Join as a Volunteer</p>
                  </div>
                  <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Intro & Counters Section */}
      <section className="relative py-24 bg-brand-primary text-white flex items-center bg-cover bg-center overflow-hidden min-h-[680px] transition-colors duration-300">
        
        {/* Background Image - Same approach as Mission Section */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://i.pinimg.com/736x/e9/46/e1/e946e115fb057e425c50ea78b7c06c17.jpg')`,
          }}
        />

        {/* Overlay - Exact replication from Mission Section */}
        <div className="absolute inset-0 bg-brand-primary/90 md:bg-gradient-to-r md:from-brand-primary/90 md:to-blue-900/10"></div>

        {/* Optional extra depth (recommended) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

        {/* Decorative Blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-3xl -mr-40 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl -ml-32 -mb-20"></div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-stretch">
            
            {/* Left: Counters */}
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="lg:col-span-3 flex flex-col justify-between gap-5"
            >
              <div className="text-center lg:text-right border-b border-white/20 pb-5">
                <div className="text-3xl md:text-4xl font-bold text-brand-secondary leading-none mb-1">
                  <Counter value={10} suffix="+" />
                </div>
                <p className="text-blue-100 text-[10px] font-medium uppercase tracking-[0.2em]">Years of Existence</p>
              </div>

              <div className="text-center lg:text-right border-b border-white/20 pb-5">
                <div className="text-3xl md:text-4xl font-bold text-brand-secondary leading-none mb-1">
                  <Counter value={210} suffix="+" />
                </div>
                <p className="text-blue-100 text-[10px] font-medium uppercase tracking-[0.2em]">Countries</p>
              </div>

              <div className="text-center lg:text-right border-b border-white/20 pb-5">
                <div className="text-3xl md:text-4xl font-bold text-brand-secondary leading-none mb-1">
                  <Counter value={6} suffix="M+" />
                </div>
                <p className="text-blue-100 text-[10px] font-medium uppercase tracking-[0.2em]">People Reached</p>
              </div>

              <div className="text-center lg:text-right">
                <div className="text-3xl md:text-4xl font-bold text-brand-secondary leading-none mb-1">
                  <Counter value={4.4} suffix="M+" decimal={true} />
                </div>
                <p className="text-blue-100 text-[10px] font-medium uppercase tracking-[0.2em]">Good Deeds</p>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="lg:col-span-9 flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-0.5 bg-brand-secondary"></span>
                <h3 className="text-brand-secondary font-bold text-xs uppercase tracking-[0.2em]">Why VMC</h3>
              </div>

              <h2 className="text-white text-3xl md:text-4xl font-bold uppercase leading-[1.1] mb-8">
                Join the Volunteer <br className="hidden md:block" />
                Medical Corps
              </h2>

              <p className="text-blue-50 text-base md:text-lg leading-relaxed mb-10 max-w-2xl opacity-90">
                We are an ever-expanding global network of Christian health care workers, 
                non-medical volunteers and students committed to providing medical care 
                through outreaches, humanitarian assistance and sustainable health care solutions 
                in regions of crisis and to communities in dire need.
              </p>

              <Link 
                href="/about" 
                className="group relative inline-block overflow-hidden bg-white text-brand-primary 
                          px-10 py-4 font-bold uppercase text-xs tracking-[0.2em] 
                          shadow-xl hover:shadow-2xl transition-all duration-300
                          hover:text-white"
              >
                {/* Sliding Fill - Clean & Full Coverage */}
                <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                
                {/* Button Text */}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  About Us
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sponsor / Map Section */}
      <section className="py-12 bg-bg-base transition-colors duration-300">
        <div className="max-w-6xl mx-auto md:px-4">
          {/* Main Yellow Container */}
          <div className="bg-brand-secondary relative rounded-sm overflow-hidden flex flex-col md:flex-row items-center min-h-[400px]">
            
            {/* Left: Content Block */}
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-20 w-full md:w-1/2 p-6 md:p-12 text-center md:text-left"
            >
              {/* Dark Blue Sub-heading Tag */}
              <div className="inline-block bg-brand-primary text-white px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest mb-4">
                Earn VMC Rewards
              </div>

              <h2 className="text-brand-primary text-2xl md:text-3xl font-bold uppercase leading-tight mb-4 w-full">
                Sponsor a Good Deeds <br className="hidden md:block" /> Project Today!
              </h2>

              <p className="text-brand-primary text-sm md:text-base font-medium mb-8 opacity-90 w-full max-w-none md:max-w-md mx-auto md:mx-0">
                Provide medical kits, hygiene packs, and mother & baby care kits to communities in dire need.
              </p>

              {/* Outlined CTA Button & Dropdown */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/give"
                  className="group relative overflow-hidden w-full sm:w-auto border-2 border-brand-primary text-brand-primary px-8 py-3 font-bold uppercase text-xs tracking-widest transition-all text-center"
                >
                  <span className="absolute inset-0 bg-brand-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                  <span className="relative z-10 group-hover:text-white transition-colors">Partner With Us</span>
                </Link>

                {/* Region Filter Dropdown */}
                <div className="relative w-full sm:w-auto min-w-[200px]">
                  <select 
                    value={selectedRegion}
                    onChange={handleRegionChange}
                    className="w-full bg-white border-2 border-brand-primary text-brand-primary px-4 py-3 font-bold uppercase text-xs tracking-widest focus:outline-none transition-all cursor-pointer appearance-none"
                  >
                    <option value="">Search by Region</option>
                    {regions.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-primary">
                    ▼
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Map Overlay */}
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full md:w-1/2 h-[250px] md:h-full min-h-[300px]"
            >
              <Image 
                src="/prm-world-map.png" 
                alt="World Map" 
                fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain p-4 md:p-8 opacity-80 mix-blend-multiply"
              />
              
              {/* Pulsing Hotspots */}
              <div className="absolute top-[51%] left-[45%] w-3 h-3 bg-red-700 shadow-lg animate-pulse"></div>
              <div className="absolute top-[28%] left-[75%] w-3 h-3 bg-red-700 shadow-lg animate-pulse"></div>
              <div className="absolute top-[40%] left-[20%] w-3 h-3 bg-red-700 shadow-lg animate-pulse"></div>
              <div className="absolute top-[75%] left-[30%] w-3 h-3 bg-red-700 shadow-lg animate-pulse"></div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Causes / Campaigns Section */}
      <section className="py-24 bg-bg-base overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-brand-secondary mb-4">Good Deeds Campaigns</h2>
            <p className="text-base md:text-lg text-text-muted font-medium max-w-3xl mx-auto opacity-80">Find volunteer opportunities that fit your time and skill, earn volunteer credits and make impact with us.</p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="bg-bg-surface shadow-lg overflow-hidden border border-border-main group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="https://volunteermedicalcorps.org/admin/images/gallery/173895-bronx3.jpg" 
                  alt="Eye Healthcare Campaign" 
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized />
                <div className="absolute top-4 left-4 bg-brand-secondary text-brand-primary text-xs font-bold uppercase px-3 py-1">
                  Healthcare
                </div>
              </div>
              <div className="p-8 text-center md:text-left">
                <h3 className="text-xl font-bold font-poppins text-text-main mb-4 hover:text-brand-primary transition-colors cursor-pointer">
                  Eye Healthcare Campaign
                </h3>
                <div className="mb-6">
                  <p className="text-text-muted text-sm font-roboto">Provide vision screenings and corrective treatments for communities lacking access to basic eye care.</p>
                </div>
                <Link href="/register" className="group relative overflow-hidden w-full bg-transparent border-2 border-brand-primary text-text-main py-3 font-semibold uppercase tracking-wider transition-colors flex items-center justify-center">
                  <span className="absolute inset-0 bg-brand-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                  <span className="relative z-10 group-hover:text-white transition-colors">Volunteer Now</span>
                </Link>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              className="bg-bg-surface shadow-lg overflow-hidden border border-border-main group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="https://volunteermedicalcorps.org/admin/images/campaigns/e5cjrn3mD326785419.jpg" 
                  alt="Praying for the Sick" 
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized />
                <div className="absolute top-4 left-4 bg-brand-secondary text-brand-primary text-xs font-bold uppercase px-3 py-1">
                  Spiritual Care
                </div>
              </div>
              <div className="p-8 text-center md:text-left">
                <h3 className="text-xl font-bold font-poppins text-text-main mb-4 hover:text-brand-primary transition-colors cursor-pointer">
                  Praying for the Sick
                </h3>
                <div className="mb-6">
                  <p className="text-text-muted text-sm font-roboto">Join our global network of Christian health workers offering spiritual support and prayers to patients.</p>
                </div>
                <Link href="/register" className="group relative overflow-hidden w-full bg-transparent border-2 border-brand-primary text-text-main py-3 font-semibold uppercase tracking-wider transition-colors flex items-center justify-center">
                  <span className="absolute inset-0 bg-brand-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                  <span className="relative z-10 group-hover:text-white transition-colors">Volunteer Now</span>
                </Link>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
              className="bg-bg-surface shadow-lg overflow-hidden border border-border-main group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="https://volunteermedicalcorps.org/admin/images/campaigns/VvjfzE9kJ596372148.jpg" 
                  alt="Fund Raise for VMC" 
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized />
                <div className="absolute top-4 left-4 bg-brand-secondary text-brand-primary text-xs font-bold uppercase px-3 py-1">
                  Fundraising
                </div>
              </div>
              <div className="p-8 text-center md:text-left">
                <h3 className="text-xl font-bold font-poppins text-text-main mb-4 hover:text-brand-primary transition-colors cursor-pointer">
                  Organize a VMC Fundraising Campaign
                </h3>
                <div className="mb-6">
                  <p className="text-text-muted text-sm font-roboto">Set up your own campaign to help sponsor free surgeries, relief missions, and community clinics.</p>
                </div>
                <Link href="/register" className="group relative overflow-hidden w-full bg-transparent border-2 border-brand-primary text-text-main py-3 font-semibold uppercase tracking-wider transition-colors flex items-center justify-center">
                  <span className="absolute inset-0 bg-brand-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                  <span className="relative z-10 group-hover:text-white transition-colors">Start Campaign</span>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 md:py-16 bg-brand-primary text-white flex items-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('https://i1-c.pinimg.com/736x/21/3a/aa/213aaa8d104c3dddeec2827de5186923.jpg')" }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-brand-primary/90 md:bg-gradient-to-r md:from-brand-primary/90 md:to-blue-900/10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center text-center md:text-left">
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h3 className="text-brand-secondary font-medium text-lg md:text-xl mb-3">
                Volunteer Medical Corps
              </h3>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                To provide the best and most suitable medical aid to communities in need.
              </h2>
              <p className="text-gray-200 text-sm md:text-base font-normal mx-auto md:mx-0 max-w-lg leading-relaxed">
                Our Core Values: Faith, Innovation, Integrity, Effectiveness, and Compassion.
              </p>
            </motion.div>
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex justify-center md:justify-end mt-4 md:mt-0"
            >
              <Link 
                href="/about" 
                className="group relative overflow-hidden inline-block bg-brand-secondary text-brand-primary px-8 py-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-all shadow-lg"
              >
                <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10">Learn Our Vision</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

{/* 1. TOP YELLOW SECTION */}
      <section className="pt-24 pb-48 bg-brand-secondary relative z-10 overflow-hidden transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Events Intro */}
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <h2 className="text-brand-primary text-4xl md:text-5xl font-black uppercase leading-[1.1] mb-8">
                Medical Projects & <br /> Relief Missions
              </h2>
              <p className="text-brand-primary text-lg font-medium mb-10 opacity-90 max-w-md">
                Volunteer Medical Corps Projects provide a platform to meet the needs of those who require our aid and support in line with the Gospel of Jesus Christ.
              </p>
              
              <Link
                href="/humanitarian-projects"
                className="group relative overflow-hidden inline-block bg-brand-primary text-brand-secondary px-12 py-5 font-black uppercase text-[13px] tracking-[0.2em] transition-all shadow-xl"
              >
                <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 group-hover:text-brand-primary transition-colors">View All Projects</span>
              </Link>
            </motion.div>

            {/* Right: Events List - Hardcoded for now as it maps to projects */}
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="lg:col-span-8 space-y-6"
            >
              {/* Card 1 */}
              <div className="flex flex-col md:flex-row items-center bg-bg-surface overflow-hidden shadow-sm group text-center md:text-left border border-border-main">
                <div className="relative w-full md:w-1/4 h-48 md:h-32 shrink-0">
                  <Image src="https://volunteermedicalcorps.org/admin/images/gallery/429831-3a.jpg" alt="Light of Hope" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" unoptimized />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-brand-primary dark:text-text-main text-xl font-bold font-poppins mb-2 group-hover:text-brand-secondary transition-colors">Light of Hope Cancer Prevention Campaign</h3>
                  <p className="text-text-muted text-sm font-bold uppercase tracking-wider">OCTOBER 27 – OCTOBER 28</p>
                </div>
                <div className="hidden md:flex border-l border-border-main p-8 w-1/3 flex-col justify-center">
                  <p className="text-text-muted text-[10px] font-bold uppercase mb-1 tracking-widest">Projects Location:</p>
                  <p className="text-brand-primary dark:text-brand-secondary text-sm font-bold">Global Initiative</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col md:flex-row items-center bg-bg-surface overflow-hidden shadow-sm group text-center md:text-left border border-border-main">
                <div className="relative w-full md:w-1/4 h-48 md:h-32 shrink-0">
                  <Image src="https://volunteermedicalcorps.org/admin/images/gallery/798453-1.jpg" alt="Hospital Outreach" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" unoptimized />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-brand-primary dark:text-text-main text-xl font-bold font-poppins mb-2 group-hover:text-brand-secondary transition-colors">Global Hospital Outreach Campaign</h3>
                  <p className="text-text-muted text-sm font-bold uppercase tracking-wider">MAY 2 @ 12:00 AM – MAY 15</p>
                </div>
                <div className="hidden md:flex border-l border-border-main p-8 w-1/3 flex-col justify-center">
                  <p className="text-text-muted text-[10px] font-bold uppercase mb-1 tracking-widest">Projects Location:</p>
                  <p className="text-brand-primary dark:text-brand-secondary text-sm font-bold">Various Communities</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. DONATION OVERLAP SECTION */}
      <section className="bg-bg-base relative z-20 transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div 
            id="donation-overlap"
            className="relative -top-32 lg:-top-40 mb-[-128px] lg:mb-[-160px] flex flex-col lg:flex-row bg-bg-surface overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-border-main"
          >
            
            {/* Left Column: Progress */}
            <div className="lg:w-2/5 bg-brand-primary p-10 md:p-16 text-white text-center lg:text-left flex flex-col">
              <h3 className="text-3xl md:text-5xl font-black uppercase leading-tight mb-4">
                Ongoing <br /> Donations
              </h3>

              <div className="space-y-6 flex-grow overflow-y-auto pr-2 custom-scrollbar max-h-[250px]">
                {campaignData.map((camp: any, idx: number) => {
                  const donationsCount = 350 - (idx * 45); 
                  const progressPercentage = Math.min(100, Math.max(10, Math.floor((donationsCount / 400) * 100)));

                  return (
                    <div 
                      key={camp.id} 
                      className={`w-full cursor-pointer p-2 transition-all ${selectedCampaignId === camp.id ? 'bg-white/10 ring-1 ring-white/20' : 'hover:bg-white/5'}`}
                      onClick={() => setSelectedCampaignId(camp.id)}
                    >
                      <div className="flex justify-between items-end mb-2">
                        <div className="flex-1 min-w-0 pr-4">
                          <p className="text-[11px] font-bold uppercase tracking-[0.1em] opacity-90 truncate">{camp.title}</p>
                        </div>
                        <div className="text-right whitespace-nowrap">
                          <p className="text-brand-secondary text-lg font-black">{donationsCount}</p>
                          <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-50">Donations</p>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white/10 overflow-hidden">
                        <div className="bg-white h-full transition-all duration-1000" style={{ width: `${progressPercentage}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Column: Campaign Preview */}
            <div className="lg:w-3/5 p-10 md:p-16 bg-bg-surface text-center lg:text-left flex flex-col md:flex-row gap-8 items-center">
              <div className="relative w-full md:w-1/2 h-64 md:h-full min-h-[250px] overflow-hidden shadow-inner bg-bg-base border border-border-main">
                <Image 
                  src={selectedCampaign.image} 
                  alt={selectedCampaign.title} 
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                  className="object-cover animate-fadeIn" 
                  key={selectedCampaign.id}
                  unoptimized
                />
              </div>
              
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <p className="text-brand-primary dark:text-brand-secondary text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Selected Campaign</p>
                <h2 className="text-text-main text-3xl font-black uppercase mb-4 leading-tight">
                  {selectedCampaign.title}
                </h2>
                <div className="flex items-center gap-2 mb-4 text-text-muted font-bold text-[10px] uppercase tracking-widest">
                  <span>{selectedCampaign.country}</span>
                  <span className="w-1 h-1 bg-brand-secondary rounded-full"></span>
                  <span>{selectedCampaign.date}</span>
                </div>
                <p className="text-text-muted text-sm mb-8 leading-relaxed italic">
                  &quot;{selectedCampaign.description}&quot;
                </p>

                <Link 
                  href="/give" 
                  className="group relative overflow-hidden bg-brand-primary text-white px-10 py-4 font-black uppercase text-[12px] tracking-[0.2em] transition-all shadow-md inline-block text-center"
                >
                   <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                   <span className="relative z-10 group-hover:text-brand-primary transition-colors">Sponsor Project</span>
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* About VMC Section */}
      <section className="pt-40 lg:pt-56 pb-24 bg-bg-base relative overflow-hidden transition-colors duration-300">
        {/* Decorative Background - Changed bg-bg-surface to bg-bg-base and removed border to prevent overlap artifacts */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-bg-base z-0 hidden lg:block"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-secondary/10 rounded-full blur-3xl z-0"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            
            {/* Left: Video */}
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="w-full relative order-2 lg:order-1 flex items-center"
            >
              <div className="w-full relative">
                <div className="relative overflow-hidden shadow-[0_20px_50px_rgba(0,40,102,0.2)] bg-black aspect-video border-[8px] border-bg-surface group z-10 transition-colors duration-300">
                  <video 
                    width="100%" 
                    height="100%" 
                    controls 
                    controlsList="nodownload"
                    poster="https://cdnvideos.ceflix.org/thumb/155112-1750685155579932439402.jpg"
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                  >
                    <source src="https://cdnvideos.ceflix.org/processed/155112-1750685155579932439402.mp4" type="video/mp4" />
                  </video>
                </div>
                
                {/* Decorative Frame */}
                <div className="absolute -z-0 -bottom-6 -right-6 w-full h-full border-2 border-brand-secondary/30 hidden lg:block"></div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col order-1 lg:order-2 justify-center py-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-[2px] bg-brand-secondary"></span>
                <h6 className="text-brand-secondary font-bold uppercase tracking-[0.3em] text-[10px]">Who We Are</h6>
              </div>
              
              <h2 className="text-brand-primary dark:text-text-main text-3xl lg:text-5xl font-poppins font-black leading-tight mb-6">
                About Volunteer <br className="hidden lg:block" />
                <span className="text-brand-secondary">Medical Corps</span>
              </h2>
              
              <div className="space-y-4 mb-10">
                <p className="text-text-main text-base lg:text-lg leading-relaxed font-semibold italic border-l-4 border-brand-secondary pl-5 py-1 bg-bg-base transition-colors duration-300">
                  &quot;Providing medical care through outreaches, humanitarian assistance and sustainable health care solutions.&quot;
                </p>
                <p className="text-text-muted text-base leading-relaxed">
                  We are an ever-expanding global network of Christian health care workers, non-medical volunteers and students committed to providing medical care in regions of crisis and to communities in dire need.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Link href="/about" className="group relative overflow-hidden inline-flex items-center justify-center bg-brand-primary text-white px-8 py-3.5 font-black uppercase tracking-widest text-[11px] transition-all shadow-xl w-full sm:w-auto">
                  <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                  <span className="relative z-10 group-hover:text-brand-primary transition-colors flex items-center">
                    Learn More 
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="/video-gallery" className="group relative overflow-hidden inline-flex items-center justify-center border-2 border-brand-primary dark:border-brand-secondary text-brand-primary dark:text-brand-secondary px-8 py-3.5 font-black uppercase tracking-widest text-[11px] transition-all w-full sm:w-auto">
                  <span className="absolute inset-0 bg-brand-primary dark:bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                  <span className="relative z-10 group-hover:text-white dark:group-hover:text-brand-primary transition-colors">Watch Gallery</span>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-brand-primary mt-12 lg:mt-24 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/pmr-world-map.png')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          
          <motion.div 
            initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h3 className="text-brand-secondary font-bold text-[11px] uppercase tracking-[0.2em] mb-4 flex justify-center items-center gap-2">
              <FaHeart /> #volunteerdiaries
            </h3>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight uppercase">
              Testimonials
            </h2>
            <p className="text-white/80 text-lg">Real life stories of impact and inspiration.</p>
            <div className="w-24 h-1.5 bg-brand-secondary mx-auto mt-6 mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {initialTestimonials.map((testimonial: TestimonialItem, index: number) => (
              <motion.div 
                key={index}
                initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.2, ease: "easeOut" }}
                className={`bg-bg-surface p-10 shadow-lg border border-border-main flex flex-col items-center text-center relative mt-12 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group ${index === 1 ? 'md:-translate-y-6 md:mt-0' : ''}`}
              >
                <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-bg-surface overflow-hidden shadow-lg group-hover:border-brand-secondary transition-colors duration-300">
                  <Image src={testimonial.image || "https://volunteermedicalcorps.org/images/testimonies/patricia.jpg"} alt={testimonial.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" unoptimized />
                </div>
                <div className="text-brand-secondary opacity-20 absolute top-12 left-8">
                  <FaQuoteLeft size={48} />
                </div>
                
                <div className="flex gap-1 text-brand-secondary mb-6 mt-12">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                
                <p className="text-text-muted italic mb-8 flex-grow leading-relaxed font-medium z-10 relative h-[140px] overflow-y-auto custom-scrollbar pr-2">
                  &quot;{testimonial.content}&quot;
                </p>
                
                <div className="w-full pt-6 border-t border-border-main">
                  <h4 className="text-brand-primary dark:text-brand-secondary font-black text-sm uppercase tracking-widest">{testimonial.name}</h4>
                  <p className="text-text-muted text-[10px] font-bold mt-1 uppercase tracking-wider">{testimonial.location || testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16 md:mt-20">
            <Link href="/testimonials" className="group relative overflow-hidden inline-flex items-center bg-brand-secondary text-brand-primary px-10 py-4 font-black uppercase tracking-widest text-sm transition-all shadow-xl">
              <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              <span className="relative z-10">View More</span>
            </Link>
          </div>
          
        </div>
      </section>

      {/* View Blog Posts Section */}
      <section className="py-24 bg-bg-base overflow-hidden transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          
          <motion.div 
            initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h6 className="text-brand-secondary text-[13px] font-black tracking-[0.2em] uppercase mb-3">
              What&apos;s New
            </h6>
            <h2 className="text-brand-primary dark:text-text-main text-4xl md:text-5xl font-black uppercase tracking-tight">
              View Blog Posts
            </h2>
            <div className="w-24 h-1.5 bg-brand-secondary mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialBlogs.map((post: BlogItem, index: number) => (
              <motion.div 
                key={index}
                initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
                className="bg-bg-surface overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-border-main group"
              >
                <div className="relative h-[245px] overflow-hidden">
                  <Image src={post.image || "https://volunteermedicalcorps.org/admin/images/media/en9p2Ej1Q341529768.jpg"} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-400" unoptimized />
                </div>
                <div className="p-8">
                  <span className="inline-block bg-brand-primary/5 text-brand-primary dark:text-brand-secondary text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-4 border border-brand-primary/10">
                    Blog
                  </span>
                  <h3 className="text-xl font-bold font-poppins text-text-main mb-4 leading-snug group-hover:text-brand-secondary transition-colors line-clamp-2">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <ul className="flex items-center gap-6 pt-4 border-t border-border-main text-xs font-bold text-text-muted">
                    <li className="flex items-center gap-3">
                      <Image src="https://volunteermedicalcorps.org/images/default-avatar.jpg" alt="Admin" width={30} height={30} className="rounded-full" unoptimized />
                      <span className="text-brand-primary dark:text-text-main">Admin</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCalendarAlt className="text-brand-secondary" /> {formatDate(post.date)}
                    </li>
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News & Updates Section */}
      <section className="py-24 bg-bg-base overflow-hidden transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4">
        
        <motion.div 
          initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-brand-secondary uppercase mb-2 leading-tight">
            Recent News & Updates
          </h2>
          <p className="text-text-muted text-base md:text-lg opacity-80">
            Latest news and updates from the Volunteer Medical Corps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialNews.map((post: any, idx: number) => (
            <motion.div 
              key={post.id} 
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.2, ease: "easeOut" }}
              className="flex flex-col bg-bg-surface shadow-lg overflow-hidden group text-center md:text-left border border-border-main transition-all duration-300"
            >              
              <div className="relative h-[250px] w-full overflow-hidden">
                <Image
                  src={post.image || "https://volunteermedicalcorps.org/admin/images/gallery/798453-1.jpg"}
                  alt={post.title}
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-400"
                  unoptimized
                />
              </div>

              <div className="p-8 pb-4 flex-grow border-x border-border-main">
                <div className="flex items-center justify-center md:justify-start text-brand-primary dark:text-brand-secondary text-[13px] font-bold uppercase mb-4 opacity-70">
                  <FaCalendarAlt className="mr-2" />
                  {formatDate(post.date)}
                </div>
                
                <h3 className="text-[22px] font-bold text-text-main leading-[1.3] mb-6 hover:text-brand-secondary transition-colors cursor-pointer line-clamp-2">
                  {post.title}
                </h3>
                
                <Link 
                  href={`/news/${post.id}`} 
                  className="text-brand-primary dark:text-brand-secondary text-sm font-bold uppercase tracking-widest border-b-2 border-border-main pb-1 hover:border-brand-primary transition-all"
                >
                  Read More
                </Link>
              </div>

              <div className="bg-brand-secondary py-4 px-8 flex items-center justify-between text-[11px] font-black text-brand-primary uppercase tracking-tighter">
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  BY {post.author || "ADMIN"}
                </div>
                <div className="flex items-center">
                  <FaComment className="mr-2" />
                  0 COMMENT
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mt-16"
        >
          <Link
            href="/news"
            className="group relative overflow-hidden inline-block bg-brand-primary text-brand-secondary px-12 py-5 text-[14px] font-black uppercase tracking-[0.2em] transition-all shadow-xl"
          >
             <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
             <span className="relative z-10 group-hover:text-brand-primary transition-colors">View All News</span>
          </Link>
        </motion.div>

      </div>
    </section>

      {/* Global Partnerships Section */}
      <section className="py-16 md:py-20 bg-bg-surface border-t border-border-main overflow-hidden transition-colors duration-300">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes slide {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .marquee-container {
            display: flex;
            width: max-content;
            animation: slide 40s linear infinite;
          }
          .marquee-wrapper:hover .marquee-container {
            animation-play-state: paused;
          }
        `}} />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-10 text-center">
          <h6 className="text-brand-secondary text-[13px] font-black tracking-[0.2em] uppercase mb-2">Our Network</h6>
          <h2 className="text-brand-primary dark:text-text-main text-3xl md:text-4xl font-black uppercase tracking-tight">Global Initiatives</h2>
        </div>

        <div className="relative flex overflow-x-hidden marquee-wrapper w-full">
          <div className="marquee-container">
            {[...Array(2)].map((_, arrayIndex) => (
              <div key={arrayIndex} className="flex items-center whitespace-nowrap">
                {[
                  "/VMC LOGOS/1MILLION SMILE.png",
                  "/VMC LOGOS/cvp copy.png",
                  "/VMC LOGOS/free surgery copy.png",
                  "/VMC LOGOS/geraitric_care_campaign.png",
                  "/VMC LOGOS/gift_a_chaplain.png",
                  "/VMC LOGOS/global_hospital_outreach_campaign.png",
                  "/VMC LOGOS/good_deeds_campaign.png",
                  "/VMC LOGOS/good_deeds_fiesta.png",
                  "/VMC LOGOS/Layer 3.png",
                  "/VMC LOGOS/light_of_hope.png",
                  "/VMC LOGOS/medical_outreach.png",
                  "/VMC LOGOS/pediatric_care_program.png",
                  "/VMC LOGOS/praying_medics.png",
                  "/VMC LOGOS/relief mission copy 4.png"
                ].map((logo, index) => (
                  <div key={`${arrayIndex}-${index}`} className="flex-shrink-0 mx-6 sm:mx-10 flex items-center justify-center h-24 w-[180px]">
                    <Image 
                      src={logo} 
                      alt="VMC Initiative Logo" 
                      width={180} 
                      height={90} 
                      className="object-contain h-16 sm:h-20 w-full hover:grayscale hover:scale-110 transition-all duration-300 dark:brightness-125" 
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


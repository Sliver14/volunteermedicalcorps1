"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, animate, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaUser, FaComment, FaQuoteLeft, FaStar, FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Ensure react-icons is installed

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

export default function Home() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCampaignId, setSelectedCampaignId] = useState(1);

  // Keep campaignData just to generate the list of available countries
  const campaignData = [
    { id: 1, title: "Lagos Medical Outreach", country: "Nigeria", date: "Oct 2023", image: "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg", description: "Providing essential medical screenings and treatments to underserved communities in Lagos." },
    { id: 2, title: "Accra Hygiene Drive", country: "Ghana", date: "Nov 2023", image: "https://volunteermedicalcorps.org/admin/images/media/2NpZxEGQD245813967.jpg", description: "Distributing hygiene kits and conducting health education workshops in Accra." },
    { id: 3, title: "Johannesburg Free Surgery", country: "South Africa", date: "Dec 2023", image: "https://volunteermedicalcorps.org/admin/images/media/2NpZxEGQD245813967.jpg", description: "Funding and performing life-changing surgeries for those in need in Johannesburg." },
    { id: 4, title: "Nairobi Mother & Baby Kit", country: "Kenya", date: "Jan 2024", image: "https://volunteermedicalcorps.org/admin/images/media/onrZbfR8N463291785.jpg", description: "Supporting maternal health by providing essential care kits for mothers and newborns." },
    { id: 5, title: "Abuja Disaster Relief", country: "Nigeria", date: "Feb 2024", image: "https://volunteermedicalcorps.org/admin/images/gallery/491276-2.jpg", description: "Delivering rapid emergency aid and relief supplies to disaster-affected areas." },
    { id: 6, title: "London Fundraising Gala", country: "United Kingdom", date: "Mar 2024", image: "https://volunteermedicalcorps.org/admin/images/media/2NpZxEGQD245813967.jpg", description: "A global gathering to raise funds and awareness for VMC's international projects." },
  ];

  const selectedCampaign = useMemo(() => 
    campaignData.find(c => c.id === selectedCampaignId) || campaignData[0], 
  [selectedCampaignId]);

  const countries = useMemo(() => Array.from(new Set(campaignData.map(c => c.country))).sort(), []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedCountry(val);
    if (val) {
      router.push(`/campaigns/search?country=${encodeURIComponent(val)}`);
    }
  };

  // Hero Slider Logic
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = useMemo(() => [
    { 
      bg: "https://volunteermedicalcorps.org/images/sliders/8ZQ9Vj6Az791283465.jpeg", 
      sub: "", 
      title: "Welcome to Volunteer Medical Corps", 
      btnText: "Visit Life Savers", 
      link: "https://loveworldlifesavers.org/" 
    },
    { 
      bg: "https://volunteermedicalcorps.org/images/sliders/9q3WoyGbz829456713.jpg", 
      sub: "", 
      title: "Saving Lives Through Good Deeds", 
      btnText: "Support the Cause", 
      link: "https://volunteermedicalcorps.org/causes/good-deeds-campaigns/GDS102933" 
    },
    { 
      bg: "https://volunteermedicalcorps.org/images/sliders/yn4Y1uGUV794815623.jpg", 
      sub: "Start your volunteering journey", 
      title: "Become a Volunteer and provide medical care for people in need!", 
      btnText: "Join Us Today", 
      link: "/register" 
    },
    { 
      bg: "https://volunteermedicalcorps.org/images/sliders/Kq7xQUD5R792516384.jpg", 
      sub: "Join the VMC", 
      title: "Become a Volunteer and provide medical care for people in need!", 
      btnText: "Sign Up Now", 
      link: "/register" 
    }
  ], []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const newsPosts = [
    {
      id: 1,
      date: "MAY 14, 2025",
      title: "Sees boom in younger volunteers following pandemic",
      image: "https://volunteermedicalcorps.org/admin/images/gallery/798453-1.jpg",
      author: "BEARSTHEMES",
      comments: "0 COMMENT",
    },
    {
      id: 2,
      date: "MAY 11, 2025",
      title: "Breaking Barriers: Empowering Women in Sports",
      image: "https://volunteermedicalcorps.org/admin/images/campaigns/e5cjrn3mD326785419.jpg",
      author: "BEARSTHEMES",
      comments: "0 COMMENT",
    },
    {
      id: 3,
      date: "MAY 3, 2025",
      title: "Summit to focus on responsible use of AI in fundraising",
      image: "https://volunteermedicalcorps.org/admin/images/media/2NpZxEGQD245813967.jpg",
      author: "BEARSTHEMES",
      comments: "0 COMMENT",
    },
  ];

  return (
    <div className="w-full font-roboto text-gray-700">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-end bg-black overflow-hidden group pb-16 md:pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <Image 
              src={heroSlides[currentSlide].bg} 
              alt="Slide Background" 
              fill 
              className="object-cover opacity-80 md:opacity-70" 
              unoptimized 
              priority 
            />
            {/* Reduced solid overlay on mobile and desktop to increase visibility */}
            <div className="absolute inset-0 bg-black/20 md:bg-black/10"></div>
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/60 md:via-black/30 to-transparent"></div>
          </motion.div>
        </AnimatePresence>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full mb-0 md:mb-16">
          <div className="max-w-[750px] text-left pt-8 md:pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {heroSlides[currentSlide].sub && (
                  <h2 className="text-[#ff9f22] text-[10px] md:text-sm font-black tracking-[0.3em] md:tracking-[0.4em] uppercase mb-4 md:mb-5">
                    {heroSlides[currentSlide].sub}
                  </h2>
                )}
                {heroSlides[currentSlide].title && (
                  <h1 className="text-white text-[28px] sm:text-[32px] md:text-5xl lg:text-[58px] font-black uppercase leading-[1.2] md:leading-[1.1] mb-8 md:mb-12">
                    {heroSlides[currentSlide].title}
                  </h1>
                )}
                <div className="flex flex-col sm:flex-row items-start gap-4 justify-start">
                  <Link 
                    href={heroSlides[currentSlide].link} 
                    className="w-full sm:w-auto bg-[#ff9f22] text-[#002866] px-8 md:px-12 py-4 md:py-5 font-black uppercase text-[12px] md:text-[13px] tracking-[0.15em] transition-all hover:bg-white shadow-[0_10px_30px_rgba(255,159,34,0.3)] text-center flex items-center justify-center gap-2"
                  >
                    {heroSlides[currentSlide].btnText}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slider Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 sm:px-6 pointer-events-none opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={prevSlide}
            className="pointer-events-auto w-10 h-10 sm:w-14 sm:h-14 bg-black/20 hover:bg-black/50 lg:bg-transparent border border-white/30 rounded-full flex items-center justify-center text-white hover:border-[#ff9f22] hover:text-[#ff9f22] transition-all"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-sm sm:text-base pr-0.5 sm:pr-1" />
          </button>
          <button 
            onClick={nextSlide}
            className="pointer-events-auto w-10 h-10 sm:w-14 sm:h-14 bg-black/20 hover:bg-black/50 lg:bg-transparent border border-white/30 rounded-full flex items-center justify-center text-white hover:border-[#ff9f22] hover:text-[#ff9f22] transition-all"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-sm sm:text-base pl-0.5 sm:pl-1" />
          </button>
        </div>

        {/* Slider Pagination Dots */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 hidden sm:flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-[#ff9f22] w-8" : "bg-white/50 hover:bg-white w-2.5"}`}
            />
          ))}
        </div>
      </section>

      {/* Decorative vertical text seen in Screenshot 024543 */}
      {/* <div className="hidden xl:flex absolute left-8 top-2/3 -rotate-90 origin-left items-center gap-4 z-20 whitespace-nowrap">
        <span className="w-12 h-[1px] bg-[#002866]/20"></span>
        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#002866]/40">
          Volunteer Medical Corps
        </span>
      </div> */}

      {/* Intro & Counters Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-stretch">
            
            {/* Left: Reduced size counters */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-3 flex flex-col justify-between gap-4"
            >
              
              {/* Item 1 */}
              <div className="text-center lg:text-right border-b border-gray-100 pb-4">
                <div className="text-[42px] lg:text-[32px] font-black text-[#002866] leading-none mb-1">
                  <Counter value={10} suffix="+" />
                </div>
                <p className="text-[#002866] text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Years of Existence</p>
              </div>

              {/* Item 2 */}
              <div className="text-center lg:text-right border-b border-gray-100 pb-4">
                <div className="text-[42px] lg:text-[32px] font-black text-[#002866] leading-none mb-1">
                  <Counter value={210} suffix="+" />
                </div>
                <p className="text-[#002866] text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Countries</p>
              </div>

              {/* Item 3 (Highlighted) */}
              <div className="text-center lg:text-right border-b border-gray-100 pb-4">
                <div className="text-[42px] lg:text-[32px] font-black text-[#002866] leading-none mb-1">
                  <Counter value={6} suffix="M+" />
                </div>
                <p className="text-[#002866] text-[10px] font-bold uppercase tracking-[0.2em]">Volunteers</p>
              </div>

              {/* Item 4 */}
              <div className="text-center lg:text-right pb-2">
                <div className="text-[42px] lg:text-[32px] font-black text-[#002866] leading-none mb-1">
                  <Counter value={4.4} suffix="M+" decimal={true} />
                </div>
                <p className="text-[#002866] text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Good deeds</p>
              </div>
            </motion.div>

            {/* Right: Info */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-9 flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
            >
              <h3 className="text-[#ff9f22] font-bold text-sm uppercase tracking-[0.2em] mb-4">Why VMC</h3>
              <h2 className="text-[#002866] text-3xl md:text-5xl font-black uppercase leading-[1.1] mb-8">
                Join the Volunteer <br className="hidden md:block" />
                Medical Corps
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-2xl">
                We are an ever-expanding global network of Christian health care workers, 
                non-medical volunteers and students committed to providing medical care 
                through outreaches, humanitarian assistance and sustainable health care solutions 
                in regions of crisis and to communities in dire need.
              </p>
              <Link 
                href="/about" 
                className="inline-block bg-[#ff9f22] text-[#002866] px-12 py-5 font-black uppercase text-[13px] tracking-[0.2em] transition-all hover:bg-[#002866] hover:text-white shadow-md"
              >
                About Us
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Sponsor / Map Section */}
      <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto md:px-4">
        {/* Main Yellow Container */}
        <div className="bg-[#ff9f22] relative rounded-sm overflow-hidden flex flex-col md:flex-row items-center min-h-[400px]">
          
          {/* Left: Content Block */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20 w-full md:w-1/2 p-6 md:p-12 text-center md:text-left"
          >
            {/* Dark Blue Sub-heading Tag */}
            <div className="inline-block bg-[#002866] text-white px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest mb-4 rounded-sm">
              Earn VMC Rewards
            </div>

            <h2 className="text-[#002866] text-2xl md:text-4xl font-black uppercase leading-tight mb-4 w-full">
              SPONSOR A GOOD DEEDS PROJECT TODAY!
            </h2>

            <p className="text-[#002866] text-base font-medium mb-6 opacity-90 w-full max-w-none md:max-w-md mx-auto md:mx-0">
              Provide medical kits, hygiene packs, and mother & baby care kits to communities in dire need.
            </p>

            {/* Outlined CTA Button & Dropdown */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/donate"
                className="w-full sm:w-auto border-2 border-[#002866] text-[#002866] px-8 py-3 font-bold uppercase text-[12px] tracking-widest hover:bg-[#002866] hover:text-white transition-all text-center"
              >
                Partner With Us
              </Link>

              {/* Country Filter Dropdown */}
              <div className="relative w-full sm:w-auto min-w-[200px]">
                <select 
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="w-full bg-white border-2 border-[#002866] text-[#002866] px-4 py-3 font-bold uppercase text-[12px] tracking-widest focus:outline-none transition-all cursor-pointer appearance-none rounded-none"
                >
                  <option value="">Search by Country</option>
                  {countries.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#002866]">
                  ▼
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Map Overlay */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full md:w-1/2 h-[250px] md:h-full min-h-[300px]"
          >
            <Image 
              src="/prm-world-map.png" 
              alt="World Map" 
              fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-4 md:p-8 opacity-80 mix-blend-multiply"
            />
            
            {/* Pulsing Hotspots */}
            <div className="absolute top-[51%] left-[45%] w-3 h-3 bg-red-700 rounded-full shadow-lg animate-pulse"></div>
            <div className="absolute top-[28%] left-[75%] w-3 h-3 bg-red-700 rounded-full shadow-lg animate-pulse"></div>
            <div className="absolute top-[40%] left-[20%] w-3 h-3 bg-red-700 rounded-full shadow-lg animate-pulse"></div>
            <div className="absolute top-[75%] left-[30%] w-3 h-3 bg-red-700 rounded-full shadow-lg animate-pulse"></div>
          </motion.div>
          
        </div>
      </div>
    </section>

      {/* Causes / Campaigns Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-poppins font-bold text-[#002866] mb-4">Good Deeds Campaigns</h2>
            <p className="text-xl text-gray-600 font-poppins max-w-3xl mx-auto">Find volunteer opportunities that fit your time and skill, earn volunteer credits and make impact with us.</p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="https://volunteermedicalcorps.org/admin/images/gallery/173895-bronx3.jpg" 
                  alt="Eye Healthcare Campaign" 
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized />
                <div className="absolute top-4 left-4 bg-[#ff9f22] text-[#002866] text-xs font-bold uppercase px-3 py-1 rounded-sm">
                  Healthcare
                </div>
              </div>
              <div className="p-8 text-center md:text-left">
                <h3 className="text-xl font-bold font-poppins text-gray-900 mb-4 hover:text-[#002866] transition-colors cursor-pointer">
                  Eye Healthcare Campaign
                </h3>
                <div className="mb-6">
                  <p className="text-gray-600 text-sm font-roboto">Provide vision screenings and corrective treatments for communities lacking access to basic eye care.</p>
                </div>
                <Link href="/register" className="w-full bg-transparent border-2 border-[#002866] text-[#002866] py-3 font-semibold uppercase tracking-wider hover:bg-[#002866] hover:text-white transition-colors rounded-sm flex items-center justify-center">
                  Volunteer Now
                </Link>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="https://volunteermedicalcorps.org/admin/images/campaigns/e5cjrn3mD326785419.jpg" 
                  alt="Praying for the Sick" 
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized />
                <div className="absolute top-4 left-4 bg-[#ff9f22] text-[#002866] text-xs font-bold uppercase px-3 py-1 rounded-sm">
                  Spiritual Care
                </div>
              </div>
              <div className="p-8 text-center md:text-left">
                <h3 className="text-xl font-bold font-poppins text-gray-900 mb-4 hover:text-[#002866] transition-colors cursor-pointer">
                  Praying for the Sick
                </h3>
                <div className="mb-6">
                  <p className="text-gray-600 text-sm font-roboto">Join our global network of Christian health workers offering spiritual support and prayers to patients.</p>
                </div>
                <Link href="/register" className="w-full bg-transparent border-2 border-[#002866] text-[#002866] py-3 font-semibold uppercase tracking-wider hover:bg-[#002866] hover:text-white transition-colors rounded-sm flex items-center justify-center">
                  Volunteer Now
                </Link>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="https://volunteermedicalcorps.org/admin/images/campaigns/VvjfzE9kJ596372148.jpg" 
                  alt="Fund Raise for VMC" 
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized />
                <div className="absolute top-4 left-4 bg-[#ff9f22] text-[#002866] text-xs font-bold uppercase px-3 py-1 rounded-sm">
                  Fundraising
                </div>
              </div>
              <div className="p-8 text-center md:text-left">
                <h3 className="text-xl font-bold font-poppins text-gray-900 mb-4 hover:text-[#002866] transition-colors cursor-pointer">
                  Organize a VMC Fundraising Campaign
                </h3>
                <div className="mb-6">
                  <p className="text-gray-600 text-sm font-roboto">Set up your own campaign to help sponsor free surgeries, relief missions, and community clinics.</p>
                </div>
                <Link href="/register" className="w-full bg-transparent border-2 border-[#002866] text-[#002866] py-3 font-semibold uppercase tracking-wider hover:bg-[#002866] hover:text-white transition-colors rounded-sm flex items-center justify-center">
                  Start Campaign
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 md:py-16 bg-[#002866] text-white flex items-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('https://volunteermedicalcorps.org/admin/images/campaigns/e5cjrn3mD326785419.jpg')" }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#002866]/90 md:bg-gradient-to-r md:from-[#002866]/90 md:to-blue-900/60"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h3 className="text-[#ff9f22] font-poppins font-medium text-lg md:text-xl mb-3">
                Volunteer Medical Corps
              </h3>
              <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-6 leading-tight">
                To provide the best and most suitable medical aid to communities in need.
              </h2>
              <p className="text-gray-200 text-base md:text-lg font-roboto mx-auto md:mx-0 max-w-lg leading-relaxed">
                Our Core Values: Faith, Innovation, Integrity, Effectiveness, and Compassion.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center md:justify-end mt-4 md:mt-0"
            >
              <Link 
                href="/about" 
                className="inline-block bg-[#ff9f22] text-[#002866] px-10 py-4 text-[13px] md:text-sm font-black uppercase tracking-wider hover:bg-white transition-colors rounded-sm"
              >
                Learn Our Vision
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

{/* 1. TOP YELLOW SECTION */}
      {/* Increased pb-48 to create enough space for the overlapping box */}
      <section className="pt-24 pb-48 bg-[#ff9f22] relative z-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Events Intro */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <h2 className="text-[#002866] text-4xl md:text-5xl font-black uppercase leading-[1.1] mb-8">
                Medical Projects & <br /> Relief Missions
              </h2>
              <p className="text-[#002866] text-lg font-medium mb-10 opacity-90 max-w-md">
                Volunteer Medical Corps Projects provide a platform to meet the needs of those who require our aid and support in line with the Gospel of Jesus Christ.
              </p>
              
              <Link
                href="/causes/humanitarian-projects"
                className="inline-block bg-[#002866] text-[#ff9f22] px-12 py-5 font-black uppercase text-[13px] tracking-[0.2em] transition-all hover:bg-white hover:text-[#002866] shadow-xl"
              >
                View All Projects
              </Link>
            </motion.div>

            {/* Right: Events List */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-8 space-y-6"
            >
              {/* Card 1 */}
              <div className="flex flex-col md:flex-row items-center bg-white rounded-sm overflow-hidden shadow-sm group text-center md:text-left">
                <div className="relative w-full md:w-1/4 h-48 md:h-32 shrink-0">
                  <Image src="https://volunteermedicalcorps.org/admin/images/gallery/429831-3a.jpg" alt="Light of Hope" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" unoptimized />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-[#002866] text-xl font-bold font-poppins mb-2">Light of Hope Cancer Prevention Campaign</h3>
                  <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">OCTOBER 27 – OCTOBER 28</p>
                </div>
                <div className="hidden md:flex border-l border-gray-100 p-8 w-1/3 flex-col justify-center">
                  <p className="text-gray-400 text-[10px] font-bold uppercase mb-1 tracking-widest">Projects Location:</p>
                  <p className="text-[#002866] text-sm font-bold">Global Initiative</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col md:flex-row items-center bg-white rounded-sm overflow-hidden shadow-sm group text-center md:text-left">
                <div className="relative w-full md:w-1/4 h-48 md:h-32 shrink-0">
                  <Image src="https://volunteermedicalcorps.org/admin/images/gallery/798453-1.jpg" alt="Hospital Outreach" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" unoptimized />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-[#002866] text-xl font-bold font-poppins mb-2">Global Hospital Outreach Campaign</h3>
                  <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">MAY 2 @ 12:00 AM – MAY 15</p>
                </div>
                <div className="hidden md:flex border-l border-gray-100 p-8 w-1/3 flex-col justify-center">
                  <p className="text-gray-400 text-[10px] font-bold uppercase mb-1 tracking-widest">Projects Location:</p>
                  <p className="text-[#002866] text-sm font-bold">Various Communities</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. DONATION OVERLAP SECTION */}
      {/* This section is white. The box inside it moves up into the yellow section above. */}
      <section className="bg-white relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          {/* THE OVERLAPPING BOX */}
          {/* -translate-y-1/2 centers the box exactly on the border between yellow and white */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative -top-32 lg:-top-40 mb-[-128px] lg:mb-[-160px] flex flex-col lg:flex-row bg-white rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
          >
            
            {/* Left Column: Progress */}
            <div className="lg:w-2/5 bg-[#002866] p-10 md:p-16 text-white text-center lg:text-left flex flex-col">
              <h3 className="text-3xl md:text-5xl font-black uppercase leading-tight mb-4">
                Ongoing <br /> Donations
              </h3>
              {/* <p className="text-sm opacity-70 mb-8 leading-relaxed max-w-xs mx-auto lg:mx-0">
                Count the number of donations for each campaign. Your contribution impacts lives directly.
              </p> */}

              <div className="space-y-6 flex-grow overflow-y-auto pr-2 custom-scrollbar max-h-[250px]">
                {campaignData.map((camp, idx) => {
                  // Hardcoded donation counts for demonstration
                  const donationsCount = 350 - (idx * 45); 
                  const progressPercentage = Math.min(100, Math.max(10, Math.floor((donationsCount / 400) * 100)));

                  return (
                    <div 
                      key={camp.id} 
                      className={`w-full cursor-pointer p-2 rounded-sm transition-all ${selectedCampaignId === camp.id ? 'bg-white/10 ring-1 ring-white/20' : 'hover:bg-white/5'}`}
                      onClick={() => setSelectedCampaignId(camp.id)}
                    >
                      <div className="flex justify-between items-end mb-2">
                        <div className="flex-1 min-w-0 pr-4">
                          <p className="text-[11px] font-bold uppercase tracking-[0.1em] opacity-90 truncate">{camp.title}</p>
                        </div>
                        <div className="text-right whitespace-nowrap">
                          <p className="text-[#ff9f22] text-lg font-black">{donationsCount}</p>
                          <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-50">Donations</p>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="bg-white h-full transition-all duration-1000" style={{ width: `${progressPercentage}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Column: Campaign Preview */}
            <div className="lg:w-3/5 p-10 md:p-16 bg-white text-center lg:text-left flex flex-col md:flex-row gap-8 items-center">
              <div className="relative w-full md:w-1/2 h-64 md:h-full min-h-[250px] overflow-hidden rounded-sm shadow-inner bg-gray-50">
                <Image 
                  src={selectedCampaign.image} 
                  alt={selectedCampaign.title} 
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                  className="object-cover animate-fadeIn" 
                  key={selectedCampaign.id}
                />
              </div>
              
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <p className="text-[#002866] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Selected Campaign</p>
                <h2 className="text-[#002866] text-3xl font-black uppercase mb-4 leading-tight">
                  {selectedCampaign.title}
                </h2>
                <div className="flex items-center gap-2 mb-4 text-[#002866]/60 font-bold text-[10px] uppercase tracking-widest">
                  <span>{selectedCampaign.country}</span>
                  <span className="w-1 h-1 bg-[#ff9f22] rounded-full"></span>
                  <span>{selectedCampaign.date}</span>
                </div>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed italic">
                  "{selectedCampaign.description}"
                </p>

                <Link 
                  href="/donate" 
                  className="bg-[#002866] text-white px-10 py-4 font-black uppercase text-[12px] tracking-[0.2em] hover:bg-[#ff9f22] hover:text-[#002866] transition-all shadow-md inline-block text-center"
                >
                  Sponsor Project
                </Link>
              </div>
            </div>
            
          </motion.div>
        </div>
      </section>

      {/* About VMC Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Image src="https://volunteermedicalcorps.org/assets/img/shape/01.png" alt="Shape" width={300} height={300} unoptimized />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left: Video */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 w-full"
            >
              <div className="relative rounded-sm overflow-hidden shadow-2xl bg-black aspect-video mb-6 border-4 border-white">
                <video 
                  width="100%" 
                  height="100%" 
                  controls 
                  poster="https://cdnvideos.ceflix.org/thumb/155112-1750685155579932439402.jpg"
                  className="w-full h-full object-cover"
                >
                  <source src="https://cdnvideos.ceflix.org/processed/155112-1750685155579932439402.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <Link href="/media/video-gallery" className="inline-flex items-center bg-[#002866] text-white px-8 py-3.5 font-bold uppercase tracking-widest text-xs hover:bg-[#ff9f22] hover:text-[#002866] transition-all rounded-sm shadow-md">
                Watch More Videos
              </Link>
            </motion.div>

            {/* Right: Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <h6 className="text-[#ff9f22] font-black uppercase tracking-widest text-sm mb-3">#VMCORPS</h6>
              <h2 className="text-[#002866] text-3xl md:text-[40px] font-poppins font-bold leading-tight mb-6">
                About Volunteer Medical Corps
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10 text-justify">
                We are an ever-expanding global network of Christian health care workers, non-medical volunteers and students committed to providing medical care through outreaches, humanitarian assistance and sustainable health care solutions in regions of crisis and to communities in dire need.
              </p>
              <Link href="/about" className="inline-flex items-center bg-[#002866] text-white px-10 py-4 font-black uppercase tracking-widest text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all rounded-sm shadow-xl">
                Learn More
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* VMC Campaigns CTA Banner */}
      <section className="py-16 bg-[#ff9f22] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="lg:w-3/4">
            <h3 className="text-white text-3xl md:text-[42px] font-poppins font-light leading-tight mb-2">
              Sign Up for these <Link href="/campaigns" className="font-bold border-b-2 border-white hover:text-[#002866] hover:border-[#002866] transition-colors">VMC Campaigns</Link> and Earn Verified Volunteer Hours (and a Signed Certificate!)
            </h3>
            <h3 className="text-[#002866] text-2xl md:text-3xl font-poppins font-light leading-tight mt-4">
              Over 60 million volunteering hours recorded and still counting
            </h3>
          </div>
          <div className="lg:w-1/4 shrink-0">
            <Link href="/register" className="inline-flex items-center justify-center w-full lg:w-auto bg-[#002866] text-white px-12 py-5 font-black uppercase tracking-widest text-sm hover:bg-white hover:text-[#002866] transition-all rounded-sm shadow-2xl">
              Start Today!
            </Link>
          </div>
        </div>
      </section>

      {/* Good Deeds Campaigns Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h6 className="text-[#ff9f22] text-[13px] font-black tracking-[0.2em] uppercase mb-3">
              Get Involved
            </h6>
            <h2 className="text-[#002866] text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
              VMC Good Deeds Campaigns
            </h2>
            <div className="w-24 h-1.5 bg-[#ff9f22] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Preach the Gospel", image: "https://volunteermedicalcorps.org/admin/images/campaigns/VvjfzE9kJ596372148.jpg" },
              { title: "Eye Healthcare Campaign", image: "https://volunteermedicalcorps.org/admin/images/campaigns/e5cjrn3mD326785419.jpg" },
              { title: "Recruiting New VMC Volunteers", image: "https://volunteermedicalcorps.org/admin/images/campaigns/5uPVm6dZM985341726.jpg" },
              { title: "Healthcare Support for Female Teenagers", image: "https://volunteermedicalcorps.org/admin/images/campaigns/51HBTXjzk641732598.jpg" },
              { title: "Praying for the Sick.", image: "https://volunteermedicalcorps.org/admin/images/campaigns/gjLyeXPCa163572948.jpg" },
              { title: "Provision of Support Kits", image: "https://volunteermedicalcorps.org/admin/images/campaigns/turGZomwp561743289.jpg" }
            ].map((campaign, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative h-72 rounded-sm overflow-hidden shadow-lg group cursor-pointer"
              >
                <Image src={campaign.image} alt={campaign.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002866]/90 via-[#002866]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex items-center text-[#ff9f22] text-[10px] font-black uppercase tracking-widest mb-3">
                    <FaCalendarAlt className="mr-2" /> GoodDeeds Campaigns
                  </div>
                  <h3 className="text-white text-xl font-bold font-poppins leading-snug mb-4 group-hover:text-[#ff9f22] transition-colors">
                    {campaign.title}
                  </h3>
                  <Link href="#" className="text-white text-xs font-black uppercase tracking-widest flex items-center group-hover:translate-x-2 transition-transform">
                    View Campaign <span className="ml-2">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#002866] mt-12 lg:mt-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/pmr-world-map.png')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        {/* Added Texture Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h3 className="text-[#ff9f22] font-bold text-[11px] uppercase tracking-[0.2em] mb-4 flex justify-center items-center gap-2">
              <FaHeart /> #volunteerdiaries
            </h3>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight uppercase">
              Testimonials
            </h2>
            <p className="text-white/80 text-lg">Real life stories of impact and inspiration.</p>
            <div className="w-24 h-1.5 bg-[#ff9f22] mx-auto mt-6 mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
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
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                className={`bg-white p-10 shadow-lg border border-transparent rounded-sm flex flex-col items-center text-center relative mt-12 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group ${index === 1 ? 'md:-translate-y-6 md:mt-0' : ''}`}
              >
                <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg group-hover:border-[#ff9f22] transition-colors duration-300">
                  <Image src={testimonial.image} alt={testimonial.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" unoptimized />
                </div>
                <div className="text-[#ff9f22] opacity-20 absolute top-12 left-8">
                  <FaQuoteLeft size={48} />
                </div>
                
                <div className="flex gap-1 text-[#ff9f22] mb-6 mt-12">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                
                <p className="text-gray-600 italic mb-8 flex-grow leading-relaxed font-medium z-10 relative h-[140px] overflow-y-auto custom-scrollbar pr-2">
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
          
          <div className="text-center mt-16 md:mt-20">
            <Link href="/media/testimonials" className="inline-flex items-center bg-[#ff9f22] text-[#002866] px-10 py-4 font-black uppercase tracking-widest text-sm hover:bg-white transition-all rounded-sm shadow-xl">
              View More
            </Link>
          </div>
          
        </div>
      </section>

      {/* Donation & Partnership Causes Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h6 className="text-[#ff9f22] text-[13px] font-black tracking-[0.2em] uppercase mb-3">
              Partner with Us
            </h6>
            <h2 className="text-[#002866] text-4xl md:text-5xl font-black uppercase tracking-tight">
              Champion our Causes
            </h2>
            <div className="w-24 h-1.5 bg-[#ff9f22] mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                tag: "#vmcorps",
                title: "Sponsor VMC Free Surgeries",
                image: "https://volunteermedicalcorps.org/give/images/projects/surgical-outreaches.jpg",
                desc: "Join us to provide free surgeries to the needy by adopting a bene..."
              },
              {
                tag: "",
                title: "1 Million Smiles",
                image: "https://volunteermedicalcorps.org/give/images/projects/1msmiles.jpg",
                desc: "Make 1 million smiles possible through your support of this campa..."
              },
              {
                tag: "#ghoc",
                title: "Adopt a Hospital/Community Clinic",
                image: "https://volunteermedicalcorps.org/give/images/projects/WucF1X6hY.jpeg",
                desc: "Sponsor the Global Hospital Outreach Campaign..."
              }
            ].map((cause, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 border border-gray-100 rounded-sm overflow-hidden group shadow-sm hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="relative h-[245px] overflow-hidden shrink-0">
                  <Image src={cause.image} alt={cause.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                  
                  {/* Floating Action Bar */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur shadow-lg flex items-center justify-between p-2 pl-4 rounded-sm">
                    <span className="text-[#002866] font-black text-[11px] uppercase tracking-wider">{cause.tag}</span>
                    <Link href="#" className="bg-[#002866] text-white px-5 py-2 text-[11px] font-black uppercase tracking-widest hover:bg-[#ff9f22] hover:text-[#002866] transition-colors rounded-sm">
                      Donate
                    </Link>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "25%" }} // Placeholder value as HTML had no actual width set
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="bg-[#002866] h-full"
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-poppins text-[#002866] mb-4 leading-snug group-hover:text-[#ff9f22] transition-colors">
                    {cause.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                    {cause.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* View Blog Posts Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h6 className="text-[#ff9f22] text-[13px] font-black tracking-[0.2em] uppercase mb-3">
              What's New
            </h6>
            <h2 className="text-[#002866] text-4xl md:text-5xl font-black uppercase tracking-tight">
              View Blog Posts
            </h2>
            <div className="w-24 h-1.5 bg-[#ff9f22] mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Just Move",
                date: "March 18, 2026",
                image: "https://volunteermedicalcorps.org/admin/images/media/en9p2Ej1Q341529768.jpg",
                link: "https://volunteermedicalcorps.org/view-media/just-move/UZRen9p2Ej1Q"
              },
              {
                title: "Drink More Water, Stay Hydrated",
                date: "January 30, 2026",
                image: "https://volunteermedicalcorps.org/admin/images/media/nLFm9kAhE159426873.jpg",
                link: "https://volunteermedicalcorps.org/view-media/drink-more-water-stay-hydrated/UAKnLFm9kAhE"
              },
              {
                title: "Love Your Fruits And Vegetables",
                date: "January 30, 2026",
                image: "https://volunteermedicalcorps.org/admin/images/media/kj2dtoES6694283517.jpg",
                link: "https://volunteermedicalcorps.org/view-media/love-your-fruits-and-vegetables/DSMkj2dtoES6"
              }
            ].map((post, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group"
              >
                <div className="relative h-[245px] overflow-hidden">
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                </div>
                <div className="p-8">
                  <span className="inline-block bg-blue-50 text-[#002866] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4 border border-blue-100">
                    Blog
                  </span>
                  <h3 className="text-xl font-bold font-poppins text-[#002866] mb-4 leading-snug group-hover:text-[#ff9f22] transition-colors line-clamp-2">
                    <Link href={post.link}>{post.title}</Link>
                  </h3>
                  <ul className="flex items-center gap-6 pt-4 border-t border-gray-100 text-xs font-bold text-gray-500">
                    <li className="flex items-center gap-3">
                      <Image src="https://volunteermedicalcorps.org/images/default-avatar.jpg" alt="Admin" width={30} height={30} className="rounded-full" unoptimized />
                      <span className="text-[#002866]">Admin</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCalendarAlt className="text-[#ff9f22]" /> {post.date}
                    </li>
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News & Updates Section */}
      <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-[42px] font-black text-[#002866] uppercase mb-2 leading-tight">
            Recent News & Updates
          </h2>
          <p className="text-[#002866] text-lg opacity-80">
            Protect and enhance poverty.
          </p>
        </motion.div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsPosts.map((post, idx) => (
            <motion.div 
              key={post.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2, ease: "easeOut" }}
              className="flex flex-col bg-white shadow-lg overflow-hidden group text-center md:text-left"
            >
              
              {/* Image Container */}
              <div className="relative h-[250px] w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content Container */}
              <div className="p-8 pb-4 flex-grow border-x border-gray-100">
                <div className="flex items-center justify-center md:justify-start text-[#002866] text-[13px] font-bold uppercase mb-4 opacity-70">
                  <FaCalendarAlt className="mr-2 text-[#002866]" />
                  {post.date}
                </div>
                
                <h3 className="text-[22px] font-bold text-[#002866] leading-[1.3] mb-6 hover:text-black transition-colors cursor-pointer">
                  {post.title}
                </h3>
                
                <Link 
                  href={`/media/news/${post.id}`} 
                  className="text-[#002866] text-sm font-bold uppercase tracking-widest border-b-2 border-gray-200 pb-1 hover:border-[#002866] transition-all"
                >
                  Read More
                </Link>
              </div>

              {/* Yellow Footer Metadata (Matches UI exactly) */}
              <div className="bg-[#ff9f22] py-4 px-8 flex items-center justify-between text-[11px] font-black text-[#002866] uppercase tracking-tighter">
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  BY {post.author}
                </div>
                <div className="flex items-center">
                  <FaComment className="mr-2" />
                  {post.comments}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mt-16"
        >
          <Link
            href="/media/news"
            className="inline-block bg-[#002866] text-[#ff9f22] px-12 py-5 text-[14px] font-black uppercase tracking-[0.2em] transition-all hover:bg-black hover:text-white"
          >
            View All News
          </Link>
        </motion.div>

      </div>
    </section>

      {/* Global Partnerships Section */}
      <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100 overflow-hidden">
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
          <h6 className="text-[#ff9f22] text-[13px] font-black tracking-[0.2em] uppercase mb-2">Our Network</h6>
          <h2 className="text-[#002866] text-3xl md:text-4xl font-black uppercase tracking-tight">Global Initiatives</h2>
        </div>

        {/* Infinite Scrolling Marquee */}
        <div className="relative flex overflow-x-hidden marquee-wrapper w-full">
          <div className="marquee-container">
            {/* Array is duplicated twice inside to ensure no visual break. 
                The animation moves -50% (exactly one full set) before resetting to 0% */}
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
                      className="object-contain h-16 sm:h-20 w-full hover:grayscale hover:scale-110 transition-all duration-300" 
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

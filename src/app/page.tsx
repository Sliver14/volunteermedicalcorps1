"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, animate } from "framer-motion";
import { FaCalendarAlt, FaUser, FaComment, FaQuoteLeft, FaStar } from "react-icons/fa"; // Ensure react-icons is installed

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
    { id: 1, title: "Lagos Medical Outreach", country: "Nigeria", date: "Oct 2023", image: "/sw-post-3-min-300x200.jpg", description: "Providing essential medical screenings and treatments to underserved communities in Lagos." },
    { id: 2, title: "Accra Hygiene Drive", country: "Ghana", date: "Nov 2023", image: "/give-17-300x200.jpg", description: "Distributing hygiene kits and conducting health education workshops in Accra." },
    { id: 3, title: "Johannesburg Free Surgery", country: "South Africa", date: "Dec 2023", image: "/give-15-768x512.jpg", description: "Funding and performing life-changing surgeries for those in need in Johannesburg." },
    { id: 4, title: "Nairobi Mother & Baby Kit", country: "Kenya", date: "Jan 2024", image: "/sw-post-1-min-768x512.jpg", description: "Supporting maternal health by providing essential care kits for mothers and newborns." },
    { id: 5, title: "Abuja Disaster Relief", country: "Nigeria", date: "Feb 2024", image: "/vcn-post-7-min-768x512.jpg", description: "Delivering rapid emergency aid and relief supplies to disaster-affected areas." },
    { id: 6, title: "London Fundraising Gala", country: "United Kingdom", date: "Mar 2024", image: "/give-20-768x512.jpg", description: "A global gathering to raise funds and awareness for VMC's international projects." },
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

  const newsPosts = [
    {
      id: 1,
      date: "MAY 14, 2025",
      title: "Sees boom in younger volunteers following pandemic",
      image: "/vcn-post-7-min-768x512.jpg",
      author: "BEARSTHEMES",
      comments: "0 COMMENT",
    },
    {
      id: 2,
      date: "MAY 11, 2025",
      title: "Breaking Barriers: Empowering Women in Sports",
      image: "/sw-post-1-min-768x512.jpg",
      author: "BEARSTHEMES",
      comments: "0 COMMENT",
    },
    {
      id: 3,
      date: "MAY 3, 2025",
      title: "Summit to focus on responsible use of AI in fundraising",
      image: "/give-20-768x512.jpg",
      author: "BEARSTHEMES",
      comments: "0 COMMENT",
    },
  ];

  return (
    <div className="w-full font-roboto text-gray-700">
      
      {/* Hero Section */}
      <section 
        className="relative min-h-[85vh] md:min-h-screen flex items-center bg-white overflow-hidden"
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 opacity-80"
          >
            <source src="/slider1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-white/90 md:bg-white/20 sm:bg-gradient-to-r sm:from-white/95 sm:via-white/70 sm:to-transparent"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[750px] text-center md:text-left pt-12 md:pt-0"
        >
          
          {/* Top Small Heading - Kept your text */}
          <h2 className="text-[#002866] text-[12px] md:text-sm font-black tracking-[0.4em] uppercase mb-5">
            Saving Lives Through Good Deeds
          </h2>
          
          {/* Main Large Heading - Kept your text, updated style */}
          <h1 className="text-[#002866] text-[42px] md:text-5xl lg:text-[58px] font-black uppercase leading-[0.95] mb-8">
            Start your <br className="hidden md:block" />
            volunteering <br className="md:hidden" /> journey
          </h1>
          
          {/* Description Text - Kept your text */}
          <p className="text-[#002866] text-base md:text-xl font-medium leading-relaxed mb-12 max-w-[550px] mx-auto md:mx-0 opacity-90">
            Become a Volunteer and provide medical care for people in need! 
            Join the VMC today to make a global impact.
          </p>
          
          {/* Call to Action Buttons - Matches UI Hierarchy */}
          <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start">
            <Link 
              href="/campaigns" 
              className="w-full sm:w-auto bg-[#ff9f22] text-[#002866] px-12 py-5 font-black uppercase text-[13px] tracking-[0.15em] transition-all hover:bg-black hover:text-white shadow-[0_10px_30px_rgba(255,238,0,0.3)] text-center"
            >
              Good Deeds Campaigns
            </Link>
            
            <Link 
              href="/register" 
              className="w-full sm:w-auto bg-white/80 backdrop-blur-sm sm:bg-transparent border-2 border-[#002866] text-[#002866] px-12 py-[18px] font-black uppercase text-[13px] tracking-[0.15em] transition-all hover:bg-[#002866] hover:text-white text-center"
            >
              Login / Register
            </Link>
          </div>

        </motion.div>
      </div>

      {/* Decorative vertical text seen in Screenshot 024543 */}
      <div className="hidden xl:flex absolute left-10 top-1/2 -translate-y-1/2 -rotate-90 origin-left items-center gap-4">
        <span className="w-12 h-[1px] bg-[#002866]/20"></span>
        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#002866]/30">
          Volunteer Medical Corps
        </span>
      </div>
    </section>


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
      <div className="max-w-6xl mx-auto px-4">
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
              fill
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
                  src="/give-15-768x512.jpg" 
                  alt="Eye Healthcare Campaign" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
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
                  src="/give-15-768x512.jpg" 
                  alt="Praying for the Sick" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
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
                  src="/give-15-768x512.jpg" 
                  alt="Fund Raise for VMC" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
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
      <section className="relative py-16 bg-[#002866] text-white flex items-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('/pmr-bg-mission.jpg')" }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002866]/80 to-blue-900/60"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h3 className="text-[#ff9f22] font-poppins font-medium text-xl mb-2">
                Volunteer Medical Corps
              </h3>
              <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6 leading-tight">
                To provide the best and most suitable medical aid to communities in need.
              </h2>
              <p className="text-gray-200 text-lg font-roboto mx-auto md:mx-0 max-w-lg">
                Our Core Values: Faith, Innovation, Integrity, Effectiveness, and Compassion.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center md:justify-end"
            >
              <Link 
                href="/about" 
                className="inline-block bg-[#ff9f22] text-[#002866] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-colors rounded-sm"
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
                  <Image src="/sw-post-3-min-300x200.jpg" alt="Light of Hope" fill className="object-cover" />
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
                  <Image src="/give-17-300x200.jpg" alt="Hospital Outreach" fill className="object-cover" />
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
                  fill 
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

      {/* Testimonials Section */}
      <section className="py-24 bg-[#002866] mt-12 lg:mt-24 relative overflow-hidden">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('/pmr-world-map.png')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h3 className="text-[#ff9f22] font-bold text-[11px] uppercase tracking-[0.2em] mb-4">
              Impact Stories
            </h3>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight uppercase">
              What Our Volunteers Say
            </h2>
            <div className="w-24 h-1.5 bg-[#ff9f22] mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Testimonial 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="bg-white p-10 shadow-lg border border-transparent rounded-sm flex flex-col items-center text-center relative mt-12 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg group-hover:border-[#ff9f22] transition-colors duration-300">
                <Image src="/sw-post-1-min-768x512.jpg" alt="Dr. Sarah Jenkins" fill className="object-cover" />
              </div>
              <div className="text-[#ff9f22] opacity-20 absolute top-12 left-8">
                <FaQuoteLeft size={48} />
              </div>
              
              <div className="flex gap-1 text-[#ff9f22] mb-6 mt-12">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              
              <p className="text-gray-600 italic mb-8 flex-grow leading-relaxed font-medium z-10 relative">
                "Volunteering with VMC in Nairobi changed my life. Seeing the direct impact our medical kits had on mothers and their newborns was incredibly fulfilling. The entire team is so dedicated to making a real difference."
              </p>
              
              <div className="w-full pt-6 border-t border-gray-100">
                <h4 className="text-[#002866] font-black text-sm uppercase tracking-widest">Dr. Sarah Jenkins</h4>
                <p className="text-[#ff9f22] text-xs font-bold mt-1 uppercase tracking-wider">Pediatrician, UK</p>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="bg-white p-10 shadow-lg border border-transparent rounded-sm flex flex-col items-center text-center relative mt-12 md:mt-0 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group transform md:-translate-y-6"
            >
              <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg group-hover:border-[#ff9f22] transition-colors duration-300">
                <Image src="/give-17-300x200.jpg" alt="Dr. Kwame Osei" fill className="object-cover" />
              </div>
              <div className="text-[#ff9f22] opacity-20 absolute top-12 left-8">
                <FaQuoteLeft size={48} />
              </div>
              
              <div className="flex gap-1 text-[#ff9f22] mb-6 mt-12">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              
              <p className="text-gray-600 italic mb-8 flex-grow leading-relaxed font-medium z-10 relative">
                "The Accra Hygiene Drive wasn't just about handing out supplies; it was about empowering the community with knowledge. The organization and support from VMC were phenomenal, providing a framework for sustainable health."
              </p>
              
              <div className="w-full pt-6 border-t border-gray-100">
                <h4 className="text-[#002866] font-black text-sm uppercase tracking-widest">Dr. Kwame Osei</h4>
                <p className="text-[#ff9f22] text-xs font-bold mt-1 uppercase tracking-wider">Public Health, Ghana</p>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="bg-white p-10 shadow-lg border border-transparent rounded-sm flex flex-col items-center text-center relative mt-12 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg group-hover:border-[#ff9f22] transition-colors duration-300">
                <Image src="/vcn-post-7-min-768x512.jpg" alt="Maria Silva" fill className="object-cover" />
              </div>
              <div className="text-[#ff9f22] opacity-20 absolute top-12 left-8">
                <FaQuoteLeft size={48} />
              </div>
              
              <div className="flex gap-1 text-[#ff9f22] mb-6 mt-12">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              
              <p className="text-gray-600 italic mb-8 flex-grow leading-relaxed font-medium z-10 relative">
                "As a non-medical volunteer, I wasn't sure how I could help. But coordinating the relief efforts during the Abuja disaster showed me that everyone has a role to play in saving lives. It's an honor to serve with VMC."
              </p>
              
              <div className="w-full pt-6 border-t border-gray-100">
                <h4 className="text-[#002866] font-black text-sm uppercase tracking-widest">Maria Silva</h4>
                <p className="text-[#ff9f22] text-xs font-bold mt-1 uppercase tracking-wider">Logistics, Brazil</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Donation & Partnership Causes Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#002866] mb-4 uppercase leading-tight">Donation & Partnership Causes</h2>
            <div className="w-24 h-1.5 bg-[#ff9f22] mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 font-medium">Adopt a clinic, sponsor free surgeries, or provide medical kits.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            
            {/* Cause 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-sm overflow-hidden group border-b-4 border-[#ff9f22] flex flex-col text-center md:text-left"
            >
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/give-15-768x512.jpg" 
                  alt="Free Surgeries" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-5 left-5 bg-[#ff9f22] text-[#002866] text-[10px] font-black uppercase px-4 py-1.5 tracking-[0.2em] shadow-md z-10">
                  Sponsorship
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold font-poppins text-[#002866] mb-6 leading-tight group-hover:text-blue-900 transition-colors">
                  Sponsor VMC Free Surgeries
                </h3>
                <div className="mt-auto">
                  <Link 
                    href="/donate" 
                    className="inline-block w-full text-center border-2 border-[#002866] text-[#002866] py-4 text-[12px] font-black uppercase tracking-[0.2em] hover:bg-[#002866] hover:text-white transition-all duration-300"
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Cause 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-sm overflow-hidden group border-b-4 border-[#ff9f22] flex flex-col text-center md:text-left"
            >
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/give-15-768x512.jpg" 
                  alt="Mother and Baby Kits" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-5 left-5 bg-[#ff9f22] text-[#002866] text-[10px] font-black uppercase px-4 py-1.5 tracking-[0.2em] shadow-md z-10">
                  Relief Supply
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold font-poppins text-[#002866] mb-6 leading-tight group-hover:text-blue-900 transition-colors">
                  Mother & Baby Care Kits
                </h3>
                <div className="mt-auto">
                  <Link 
                    href="/donate" 
                    className="inline-block w-full text-center border-2 border-[#002866] text-[#002866] py-4 text-[12px] font-black uppercase tracking-[0.2em] hover:bg-[#002866] hover:text-white transition-all duration-300"
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Cause 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-sm overflow-hidden group border-b-4 border-[#ff9f22] flex flex-col text-center md:text-left"
            >
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/give-15-768x512.jpg" 
                  alt="Clinic Adoption" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-5 left-5 bg-[#ff9f22] text-[#002866] text-[10px] font-black uppercase px-4 py-1.5 tracking-[0.2em] shadow-md z-10">
                  Capacity Building
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold font-poppins text-[#002866] mb-6 leading-tight group-hover:text-blue-900 transition-colors">
                  Adopt a Hospital or Community Clinic
                </h3>
                <div className="mt-auto">
                  <Link 
                    href="/donate" 
                    className="inline-block w-full text-center border-2 border-[#002866] text-[#002866] py-4 text-[12px] font-black uppercase tracking-[0.2em] hover:bg-[#002866] hover:text-white transition-all duration-300"
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
            </motion.div>

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
                  fill
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

      {/* Partner Logos Section */}
      <section className="py-16 border-t border-gray-200 bg-white overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-between items-center gap-8 opacity-70 hover:opacity-100 transition-opacity duration-300 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
            <div className="flex-shrink-0">
              <Image src="/pmr-logo-1.png" alt="Partner 1" width={150} height={60} className="object-contain grayscale hover:grayscale-0 transition-all cursor-pointer" />
            </div>
            <div className="flex-shrink-0">
              <Image src="/pmr-logo-2.png" alt="Partner 2" width={150} height={60} className="object-contain grayscale hover:grayscale-0 transition-all cursor-pointer" />
            </div>
            <div className="flex-shrink-0">
              <Image src="/pmr-logo-3.png" alt="Partner 3" width={150} height={60} className="object-contain grayscale hover:grayscale-0 transition-all cursor-pointer" />
            </div>
            <div className="flex-shrink-0">
              <Image src="/pmr-logo-4.png" alt="Partner 4" width={150} height={60} className="object-contain grayscale hover:grayscale-0 transition-all cursor-pointer" />
            </div>
            <div className="flex-shrink-0">
              <Image src="/pmr-logo-5.png" alt="Partner 5" width={150} height={60} className="object-contain grayscale hover:grayscale-0 transition-all cursor-pointer" />
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}

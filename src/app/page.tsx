import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaUser, FaComment } from "react-icons/fa"; // Ensure react-icons is installed

export default function Home() {

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
      {/* Background Image - Optimized for mobile face visibility */}
      <div 
        className="absolute inset-0 z-0 bg-no-repeat bg-[length:cover] bg-[75%_center] md:bg-right-top transition-all duration-700"
        style={{ 
          backgroundImage: "url('/pmr-bg-slide.jpg')",
        }}
      >
        {/* Mobile Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-white/70 sm:bg-gradient-to-r sm:from-white/95 sm:via-white/60 sm:to-transparent md:bg-transparent"></div>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full">
        <div className="max-w-[750px] text-center md:text-left pt-12 md:pt-0">
          
          {/* Top Small Heading - Kept your text */}
          <h2 className="text-[#002866] text-[12px] md:text-sm font-black tracking-[0.4em] uppercase mb-5">
            Saving Lives Through Good Deeds
          </h2>
          
          {/* Main Large Heading - Kept your text, updated style */}
          <h1 className="text-[#002866] text-[42px] md:text-7xl lg:text-[88px] font-black uppercase leading-[0.95] mb-8">
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
              className="w-full sm:w-auto bg-[#FFEE00] text-[#002866] px-12 py-5 font-black uppercase text-[13px] tracking-[0.15em] transition-all hover:bg-black hover:text-white shadow-[0_10px_30px_rgba(255,238,0,0.3)] text-center"
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

        </div>
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
      {/* Background Watermark Image (Seen in Screenshot 025712) */}
      <div className="absolute right-0 top-0 opacity-5 pointer-events-none select-none">
        <Image 
          src="/logo-icon.png" // Replace with your icon path
          width={600} 
          height={600} 
          alt="" 
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left: Counters (Matches Screenshot 030154/025712) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end space-y-8">
            {/* Item 1 */}
            <div className="text-center lg:text-right">
              <div className="text-[46px] font-black text-[#002866] leading-none mb-2">
                60M+
              </div>
              <p className="text-[#002866] text-sm font-bold uppercase tracking-widest opacity-80">
                Volunteering Hours Recorded
              </p>
            </div>

            {/* Divider Line */}
            <div className="w-24 lg:w-32 h-[1px] bg-gray-300"></div>

            {/* Item 2 */}
            <div className="text-center lg:text-right">
              <div className="text-[46px] font-black text-[#002866] leading-none mb-2">
                1M+
              </div>
              <p className="text-[#002866] text-sm font-bold uppercase tracking-widest opacity-80">
                Smiles Generated
              </p>
            </div>

            {/* Divider Line */}
            <div className="w-24 lg:w-32 h-[1px] bg-gray-300"></div>

            {/* Item 3 */}
            <div className="text-center lg:text-right">
              <div className="text-[46px] font-black text-[#002866] leading-none mb-2">
                5+
              </div>
              <p className="text-[#002866] text-sm font-bold uppercase tracking-widest opacity-80">
                Continents Reached
              </p>
            </div>
          </div>

          {/* Right: Info (Matches Screenshot 025712 text layout) */}
          <div className="lg:col-span-8 pt-4 text-center lg:text-left">
            <h3 className="text-[#002866] font-bold text-base md:text-lg mb-4 flex items-center justify-center lg:justify-start gap-2">
              Why VMC
            </h3>
            
            <h2 className="text-[#002866] text-3xl md:text-5xl font-black uppercase leading-[1.1] mb-8">
              Join the Volunteer <br className="hidden md:block" />
              Medical Corps
            </h2>
            
            <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
              We are an ever-expanding global network of Christian health care workers, 
              non-medical volunteers and students committed to providing medical care 
              through outreaches, humanitarian assistance and sustainable health care solutions 
              in regions of crisis and to communities in dire need.
            </p>
            
            {/* CTA Button - Matches "ORGANIZATION INFO" in screenshot */}
            <Link 
              href="/about" 
              className="inline-block bg-[#FFEE00] text-[#002866] px-12 py-5 font-black uppercase text-[13px] tracking-[0.2em] transition-all hover:bg-[#002866] hover:text-white shadow-md"
            >
              About Us
            </Link>
          </div>

        </div>
      </div>
    </section>

      {/* Sponsor / Map Section */}
      <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Main Yellow Container (Matches Screenshot 025725) */}
        <div className="bg-[#FFEE00] relative rounded-sm overflow-hidden flex flex-col md:flex-row items-center min-h-[500px]">
          
          {/* Left: Content Block */}
          <div className="relative z-20 w-full md:w-1/2 p-6 sm:p-10 md:p-20 text-center md:text-left">
            {/* Dark Blue Sub-heading Tag (Matches Screenshot 025725) */}
            <div className="inline-block bg-[#002866] text-white px-6 py-2 text-[12px] font-bold uppercase tracking-widest mb-8 rounded-sm">
              Earn VMC Rewards
            </div>

            <h2 className="text-[#002866] text-3xl md:text-5xl font-black uppercase leading-tight mb-6 w-full">
              SPONSOR A GOOD DEEDS PROJECT TODAY!
            </h2>

            <p className="text-[#002866] text-lg font-medium mb-10 opacity-90 w-full max-w-none md:max-w-md mx-auto md:mx-0">
              Provide medical kits, hygiene packs, and mother & baby care kits to communities in dire need.
            </p>

            {/* Outlined CTA Button (Matches "OUR CAMPAIGNS" style in Screenshot 025725) */}
            <Link
              href="/donate"
              className="block w-full md:inline-block md:w-auto border-2 border-[#002866] text-[#002866] px-10 py-4 font-bold uppercase text-[13px] tracking-widest hover:bg-[#002866] hover:text-white transition-all text-center"
            >
              Partner With Us
            </Link>          </div>

          {/* Right: Map Overlay (Matches Screenshot 030448) */}
          <div className="relative w-full md:w-1/2 h-[300px] md:h-full min-h-[400px]">
            <Image 
              src="/prm-world-map.png" 
              alt="World Map" 
              fill
              className="object-contain p-8 md:p-12 opacity-80 mix-blend-multiply"
            />
            
            {/* Pulsing Hotspots (Matches Screenshot 030448 pins) */}
            <div className="absolute top-[51%] left-[45%] w-4 h-4 bg-red-700 rounded-full shadow-lg animate-pulse"></div>
            <div className="absolute top-[28%] left-[75%] w-4 h-4 bg-red-700 rounded-full shadow-lg animate-pulse"></div>
            <div className="absolute top-[40%] left-[20%] w-4 h-4 bg-red-700 rounded-full shadow-lg animate-pulse"></div>
            <div className="absolute top-[75%] left-[30%] w-4 h-4 bg-red-700 rounded-full shadow-lg animate-pulse"></div>
          </div>
          
        </div>
      </div>
    </section>

      {/* Causes / Campaigns Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold text-[#002866] mb-4">Good Deeds Campaigns</h2>
            <p className="text-xl text-gray-600 font-poppins max-w-3xl mx-auto">Find volunteer opportunities that fit your time and skill, earn volunteer credits and make impact with us.</p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 group">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/give-15-768x512.jpg" 
                  alt="Eye Healthcare Campaign" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#FFEE00] text-[#002866] text-xs font-bold uppercase px-3 py-1 rounded-sm">
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
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 group">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/give-15-768x512.jpg" 
                  alt="Praying for the Sick" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#FFEE00] text-[#002866] text-xs font-bold uppercase px-3 py-1 rounded-sm">
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
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 group">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/give-15-768x512.jpg" 
                  alt="Fund Raise for VMC" 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#FFEE00] text-[#002866] text-xs font-bold uppercase px-3 py-1 rounded-sm">
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
            </div>

          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-16 bg-[#002866] text-white flex items-center bg-cover bg-center" style={{ backgroundImage: "url('/pmr-bg-mission.jpg')" }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002866]/80 to-blue-900/60"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-center md:text-left">
            <div>
              <h3 className="text-[#FFEE00] font-poppins font-medium text-xl mb-2">
                Volunteer Medical Corps
              </h3>
              <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6 leading-tight">
                To provide the best and most suitable medical aid to communities in need.
              </h2>
              <p className="text-gray-200 text-lg font-roboto mx-auto md:mx-0 max-w-lg">
                Our Core Values: Faith, Innovation, Integrity, Effectiveness, and Compassion.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Link 
                href="/about" 
                className="inline-block bg-[#FFEE00] text-[#002866] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-colors rounded-sm"
              >
                Learn Our Vision
              </Link>
            </div>
          </div>
        </div>
      </section>

{/* 1. TOP YELLOW SECTION */}
      {/* Increased pb-48 to create enough space for the overlapping box */}
      <section className="pt-24 pb-48 bg-[#FFEE00] relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Events Intro */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h2 className="text-[#002866] text-4xl md:text-5xl font-black uppercase leading-[1.1] mb-8">
                Medical Projects & <br /> Relief Missions
              </h2>
              <p className="text-[#002866] text-lg font-medium mb-10 opacity-90 max-w-md">
                Volunteer Medical Corps Projects provide a platform to meet the needs of those who require our aid and support in line with the Gospel of Jesus Christ.
              </p>
              
              <Link
                href="/causes/humanitarian-projects"
                className="inline-block bg-[#002866] text-[#FFEE00] px-12 py-5 font-black uppercase text-[13px] tracking-[0.2em] transition-all hover:bg-white hover:text-[#002866] shadow-xl"
              >
                View All Projects
              </Link>            </div>

            {/* Right: Events List */}
            <div className="lg:col-span-8 space-y-6">
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
            </div>
          </div>
        </div>
      </section>

      {/* 2. DONATION OVERLAP SECTION */}
      {/* This section is white. The box inside it moves up into the yellow section above. */}
      <section className="bg-white relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          {/* THE OVERLAPPING BOX */}
          {/* -translate-y-1/2 centers the box exactly on the border between yellow and white */}
          <div className="relative -top-32 lg:-top-40 mb-[-128px] lg:mb-[-160px] flex flex-col lg:flex-row bg-white rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
            
            {/* Left Column: Progress */}
            <div className="lg:w-2/5 bg-[#002866] p-10 md:p-16 text-white text-center lg:text-left">
              <h3 className="text-3xl md:text-5xl font-black uppercase leading-tight mb-6">
                We Need <br /> Donations
              </h3>
              <p className="text-sm opacity-70 mb-12 leading-relaxed max-w-xs mx-auto lg:mx-0">
                Together, we build a brighter future for everyone, everywhere. 
                Your contribution impacts lives directly.
              </p>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Raised so far</p>
                    <p className="text-[#FFEE00] text-4xl font-black">$1,200</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-2">Our Goal</p>
                    <p className="text-[#FFEE00] text-4xl font-black">$5,000</p>
                  </div>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-[24%]" />
                </div>
              </div>
            </div>

            {/* Right Column: Donation Form */}
            <div className="lg:w-3/5 p-10 md:p-16 bg-white text-center lg:text-left">
              <p className="text-[#002866] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">Please Select</p>
              <h2 className="text-[#002866] text-4xl font-black uppercase mb-2">Amount to Donate</h2>
              <p className="text-gray-400 text-sm mb-12 italic">All donations are tax deductable.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
                {['$10', '$25', '$50', '$100', '$250', 'Other'].map((amount) => (
                  <button 
                    key={amount} 
                    className={`py-5 text-[15px] font-bold border transition-all duration-300 ${
                      amount === '$100' 
                      ? 'bg-[#002866] text-white border-[#002866] shadow-lg' 
                      : 'text-[#002866] border-gray-100 hover:border-[#002866]'
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>

              <Link href="/donate" className="bg-[#002866] text-white px-14 py-5 font-black uppercase text-[13px] tracking-[0.2em] hover:bg-[#FFEE00] hover:text-[#002866] transition-all shadow-md flex items-center justify-center">
                Donate Now
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-24 bg-gray-50 text-center mt-12 lg:mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-[#002866] font-poppins font-medium text-xl mb-4">
            We’re a worldwide non-profit charity.
          </h3>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-8 leading-tight">
            Give A Helping Hand For Needy People
          </h2>
          <p className="text-gray-600 text-lg font-roboto mb-10 leading-relaxed">
            Whether you are a Christian health care worker, para-medic, or student, your skills can change lives. Join us in providing medical care, relief assistance, and sustainable health care solutions to communities in dire need.
          </p>
          <Link 
            href="/volunteer" 
            className="inline-block bg-[#002866] text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#FFEE00] hover:text-[#002866] transition-colors rounded-sm"
          >
            Become A Volunteer
          </Link>
        </div>
      </section>

      {/* Donation & Partnership Causes Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#002866] mb-4 uppercase leading-tight">Donation & Partnership Causes</h2>
            <div className="w-24 h-1.5 bg-[#FFEE00] mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 font-medium">Adopt a clinic, sponsor free surgeries, or provide medical kits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            
            {/* Cause 1 */}
            <div className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-sm overflow-hidden group border-b-4 border-[#FFEE00] flex flex-col text-center md:text-left">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/give-15-768x512.jpg" 
                  alt="Free Surgeries" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-5 left-5 bg-[#FFEE00] text-[#002866] text-[10px] font-black uppercase px-4 py-1.5 tracking-[0.2em] shadow-md z-10">
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
            </div>

            {/* Cause 2 */}
            <div className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-sm overflow-hidden group border-b-4 border-[#FFEE00] flex flex-col text-center md:text-left">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/give-15-768x512.jpg" 
                  alt="Mother and Baby Kits" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-5 left-5 bg-[#FFEE00] text-[#002866] text-[10px] font-black uppercase px-4 py-1.5 tracking-[0.2em] shadow-md z-10">
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
            </div>

            {/* Cause 3 */}
            <div className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-sm overflow-hidden group border-b-4 border-[#FFEE00] flex flex-col text-center md:text-left">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src="/give-15-768x512.jpg" 
                  alt="Clinic Adoption" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-5 left-5 bg-[#FFEE00] text-[#002866] text-[10px] font-black uppercase px-4 py-1.5 tracking-[0.2em] shadow-md z-10">
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
            </div>

          </div>
        </div>
      </section>

      {/* Recent News & Updates Section */}
      <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-[42px] font-black text-[#002866] uppercase mb-2 leading-tight">
            Recent News & Updates
          </h2>
          <p className="text-[#002866] text-lg opacity-80">
            Protect and enhance poverty.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsPosts.map((post) => (
            <div key={post.id} className="flex flex-col bg-white shadow-lg overflow-hidden group text-center md:text-left">
              
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
              <div className="bg-[#FFEE00] py-4 px-8 flex items-center justify-between text-[11px] font-black text-[#002866] uppercase tracking-tighter">
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  BY {post.author}
                </div>
                <div className="flex items-center">
                  <FaComment className="mr-2" />
                  {post.comments}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            href="/media/news"
            className="inline-block bg-[#002866] text-[#FFEE00] px-12 py-5 text-[14px] font-black uppercase tracking-[0.2em] transition-all hover:bg-black hover:text-white"
          >
            View All News
          </Link>
        </div>

      </div>
    </section>

      {/* Partner Logos Section */}
      <section className="py-16 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

    </div>
  );
}

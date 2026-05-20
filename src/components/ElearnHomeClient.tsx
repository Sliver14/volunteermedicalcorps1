"use client";

import { motion } from "framer-motion";
import { 
  FaUserGraduate, 
  FaArrowRight, 
  FaBookOpen, 
  FaPlus, 
  FaStar, 
  FaUser, 
  FaBook, 
  FaCamera, 
  FaCode, 
  FaLayerGroup, 
  FaFlagCheckered,
  FaBullseye,
  FaThermometerHalf,
  FaPlusCircle,
  FaCheckCircle
} from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ElearnHomeClient({ courses, categories }: { courses: any[], categories: any[] }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-white">
      {/* Hero Banner with Auth Form */}
      <div className="relative bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 min-h-[calc(100vh-80px)] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Side: Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#002866] rounded-full text-sm font-black uppercase tracking-widest"
              >
                <FaUserGraduate className="text-blue-600" />
                ENJOY EASY LEARNING
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-black text-[#002866] leading-tight"
              >
                Convenient Easy Way of <span className="text-[#ff9f22]">Learning New Skills!</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-500 max-w-lg leading-relaxed"
              >
                Learn from Volunteer Medical Corps' online platform and gain the best skills for your career and volunteering projects.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link href="#courses" className="bg-[#002866] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all flex items-center gap-2">
                    View Courses <FaArrowRight />
                </Link>
                <button onClick={() => setIsLogin(false)} className="bg-white text-[#002866] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm border-2 border-[#002866] hover:bg-[#002866] hover:text-white transition-all">
                    Get Started Free
                </button>
              </motion.div>
            </div>

            {/* Right Side: Auth Form */}
            <motion.div 
              id="auth"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-100"
            >
              <div className="flex gap-8 mb-10 border-b border-slate-100 pb-4">
                <button 
                  onClick={() => setIsLogin(true)}
                  className={`text-lg font-bold transition-all relative ${isLogin ? 'text-[#002866]' : 'text-slate-300'}`}
                >
                  Login
                  {isLogin && <motion.div layoutId="auth-tab" className="absolute -bottom-4 left-0 right-0 h-1 bg-[#ff9f22] rounded-full" />}
                </button>
                <button 
                  onClick={() => setIsLogin(false)}
                  className={`text-lg font-bold transition-all relative ${!isLogin ? 'text-[#002866]' : 'text-slate-300'}`}
                >
                  Sign Up
                  {!isLogin && <motion.div layoutId="auth-tab" className="absolute -bottom-4 left-0 right-0 h-1 bg-[#ff9f22] rounded-full" />}
                </button>
              </div>

              <form className="space-y-6">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" className="w-full bg-slate-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-[#ff9f22] outline-none" placeholder="Enter your full name" />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input type="email" className="w-full bg-slate-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-[#ff9f22] outline-none" placeholder="name@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Password</label>
                  <input type="password" className="w-full bg-slate-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-[#ff9f22] outline-none" placeholder="••••••••" />
                </div>
                
                <Link href="/elearn/dashboard" className="w-full bg-[#002866] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all flex items-center justify-center gap-2 group">
                  {isLogin ? 'Enter Academy' : 'Create Account'}
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="text-center pt-4">
                  <a href="#" className="text-xs font-bold text-slate-400 hover:text-[#002866] transition-colors">Forgot your password?</a>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Boxes Area */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#002866] p-10 rounded-3xl text-white space-y-4">
              <h3 className="text-2xl font-black">Learn The Latest Skills</h3>
              <p className="text-white/70">Like medical, business, professional skills and more...</p>
              <Link href="/elearn/courses" className="inline-flex items-center gap-2 font-bold hover:text-[#ff9f22] transition-colors">
                View Courses <FaPlus />
              </Link>
            </div>
            <div className="bg-slate-50 p-10 rounded-3xl space-y-4">
              <h3 className="text-2xl font-black text-[#002866]">Premium Online Courses</h3>
              <p className="text-slate-500">In high-demand fields like Medicine, IT and Management.</p>
              <Link href="/elearn/courses" className="inline-flex items-center gap-2 font-bold text-[#002866] hover:text-[#ff9f22] transition-colors">
                View More <FaPlus />
              </Link>
            </div>
            <div className="bg-[#ff9f22] p-10 rounded-3xl text-[#002866] space-y-4">
              <h3 className="text-2xl font-black">Earn a Certificate</h3>
              <p className="text-[#002866]/70">From a leading university in medicine, business, non-profit management and more.</p>
              <Link href="/elearn/courses" className="inline-flex items-center gap-2 font-bold hover:underline transition-colors">
                In-View <FaPlus />
              </Link>
            </div>
            <div className="bg-slate-50 p-10 rounded-3xl space-y-4">
              <h3 className="text-2xl font-black text-[#002866]">Upgrade Your Skills</h3>
              <p className="text-slate-500">With on-demand training and development programs.</p>
              <Link href="/elearn/courses" className="inline-flex items-center gap-2 font-bold text-[#002866] hover:text-[#ff9f22] transition-colors">
                View More <FaPlus />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Courses */}
      <section id="courses" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-[#ff9f22] font-black uppercase tracking-widest text-sm">Discover Courses</span>
              <h2 className="text-4xl font-black text-[#002866]">Trending Online Courses</h2>
            </div>
            <Link href="/elearn/courses" className="bg-[#002866] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all flex items-center gap-2">
                All Courses <FaBookOpen />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length > 0 ? courses.map((course) => (
              <div key={course.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={course.image || "https://volunteermedicalcorps.org/elearn/instructors/images/courses/mXFMVbthS.jpg"} 
                    alt={course.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4 bg-[#ff9f22] text-[#002866] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {course.category?.name || "General"}
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                        <FaUser className="text-slate-400 text-xs" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">VMC OFFICE</span>
                  </div>
                  <h3 className="text-xl font-black text-[#002866] line-clamp-2 min-h-[3.5rem]">
                    <Link href={`/elearn/courses/${course.id}`} className="hover:text-[#ff9f22] transition-colors">
                      {course.title}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                    <span className="text-slate-400 text-xs font-bold ml-2">5.0 (1 rating)</span>
                  </div>
                  <div className="pt-6 border-t border-slate-50 flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-2"><FaUser /> {Math.floor(Math.random() * 50)} Students</span>
                    <span className="flex items-center gap-2"><FaBookOpen /> {course._count?.lessons || 1} Lessons</span>
                    <span className="text-[#002866]">{course.price === 0 ? "FREE" : `$${course.price}`}</span>
                  </div>
                </div>
              </div>
            )) : (
                <div className="col-span-full text-center py-20">
                    <p className="text-slate-400 font-bold">No trending courses available at the moment.</p>
                </div>
            )}
          </div>
        </div>
      </section>

      {/* Mission Area */}
      <section className="relative py-32 bg-[#002866] overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10">
          <Image src="https://volunteermedicalcorps.org/public/pmr-bg-mission.jpg" alt="Background" fill className="object-cover" unoptimized />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[#ff9f22] font-black uppercase tracking-widest text-sm">Discover Purpose</span>
                <h2 className="text-4xl md:text-5xl font-black leading-tight">Why choose to study with us</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#ff9f22] rounded-2xl flex-shrink-0 flex items-center justify-center text-[#002866]">
                    <FaCheckCircle size={24} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black">Quality is better than quantity here</h4>
                    <p className="text-white/70 leading-relaxed">Every course is properly vetted to ensure it complies with our standard for you. What we lack in quantity, we compensate for in quality.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex-shrink-0 flex items-center justify-center text-[#ff9f22]">
                    <FaCheckCircle size={24} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black">Learn without straining conditions</h4>
                    <p className="text-white/70 leading-relaxed">Learn at your pace, finish the course when it suits you. No pressure, just quality experience.</p>
                  </div>
                </div>
              </div>

              <Link href="/about" className="inline-flex bg-white text-[#002866] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#ff9f22] transition-all gap-2">
                Learn More <FaArrowRight />
              </Link>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <Image src="https://volunteermedicalcorps.org/elearn/assets/images/home-inner-banner.jpg" alt="Mission" fill className="object-cover" unoptimized />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="space-y-2">
                <span className="text-[#ff9f22] font-black uppercase tracking-widest text-sm">Course Categories</span>
                <h2 className="text-4xl font-black text-[#002866]">Browse Trending Categories</h2>
                </div>
                <Link href="/elearn/courses" className="bg-[#002866] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#ff9f22] hover:text-[#002866] transition-all flex items-center gap-2">
                    View All <FaArrowRight />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat, idx) => (
                    <div key={cat.id} className="bg-slate-50 p-10 rounded-3xl hover:bg-[#002866] group transition-all duration-300">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl text-[#002866] mb-6 shadow-sm group-hover:bg-[#ff9f22]">
                            {idx % 4 === 0 && <FaCamera />}
                            {idx % 4 === 1 && <FaCode />}
                            {idx % 4 === 2 && <FaLayerGroup />}
                            {idx % 4 === 3 && <FaFlagCheckered />}
                        </div>
                        <h3 className="text-xl font-black text-[#002866] group-hover:text-white transition-colors mb-2">{cat.name}</h3>
                        <p className="text-slate-400 group-hover:text-white/60 font-bold text-sm uppercase tracking-widest">{cat._count?.courses || 0} Courses</p>
                        <Link href={`/elearn/categories/${cat.id}`} className="absolute inset-0 opacity-0 z-10" />
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
            <h2 className="text-2xl font-black text-[#002866]">Our Partners</h2>
            <div className="flex flex-wrap justify-center gap-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                <Image src="https://volunteermedicalcorps.org/elearn/assets/images/clients/tcera.png" width={120} height={60} alt="Partner" className="object-contain" unoptimized />
                <Image src="https://volunteermedicalcorps.org/elearn/assets/images/clients/healing_school.png" width={120} height={60} alt="Partner" className="object-contain" unoptimized />
                <Image src="https://volunteermedicalcorps.org/elearn/assets/images/clients/premiercare.png" width={120} height={60} alt="Partner" className="object-contain" unoptimized />
                <Image src="https://volunteermedicalcorps.org/elearn/assets/images/clients/lmms.png" width={120} height={60} alt="Partner" className="object-contain" unoptimized />
                <Image src="https://volunteermedicalcorps.org/elearn/assets/images/clients/tcif.png" width={120} height={60} alt="Partner" className="object-contain" unoptimized />
                <Image src="https://volunteermedicalcorps.org/elearn/assets/images/clients/vmc.png" width={120} height={60} alt="Partner" className="object-contain" unoptimized />
            </div>
        </div>
      </section>

      {/* Offer Area */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
                <span className="text-[#ff9f22] font-black uppercase tracking-widest text-sm">Make Connections</span>
                <h2 className="text-4xl font-black text-[#002866]">What We Offer</h2>
                <p className="text-slate-500 leading-relaxed">
                    Acquiring new skills and improving oneself in any chosen profession is key to career furtherance and development. We have created the right environment for you to achieve that.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="text-center space-y-6 p-8 rounded-3xl hover:bg-slate-50 transition-colors">
                    <div className="w-20 h-20 bg-blue-50 text-[#002866] rounded-3xl mx-auto flex items-center justify-center text-3xl">
                        <FaUserGraduate />
                    </div>
                    <h3 className="text-xl font-black text-[#002866]">Exclusive Advisor</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Our Instructors are top professionals in their respective field of discipline. That's a fact.</p>
                </div>
                <div className="text-center space-y-6 p-8 rounded-3xl hover:bg-slate-50 transition-colors">
                    <div className="w-20 h-20 bg-amber-50 text-[#ff9f22] rounded-3xl mx-auto flex items-center justify-center text-3xl">
                        <FaBullseye />
                    </div>
                    <h3 className="text-xl font-black text-[#002866]">Reach Your Goals</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Set goals and reach them following our well structured learning process as a guide.</p>
                </div>
                <div className="text-center space-y-6 p-8 rounded-3xl hover:bg-slate-50 transition-colors">
                    <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl mx-auto flex items-center justify-center text-3xl">
                        <FaThermometerHalf />
                    </div>
                    <h3 className="text-xl font-black text-[#002866]">Digital Library</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">We have an archive of digital assets for your convenience while studying. Learning with ease just got better.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Become Instructor */}
      <section className="bg-[#ff9f22] py-20">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 text-[#002866]">
                    <h2 className="text-4xl font-black">Become an Instructor</h2>
                    <p className="text-lg font-medium opacity-80">
                        Join a host of top professional instructors who are sharing their skills and knowledge to a yearning generation.
                    </p>
                    <Link href="/elearn/instructors" className="inline-flex bg-[#002866] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-[#002866] transition-all gap-2">
                        Apply Now <FaPlusCircle />
                    </Link>
                </div>
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                    <Image src="https://volunteermedicalcorps.org/elearn/assets/img/become-instructor.jpg" fill alt="Instructors" className="object-cover" unoptimized />
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

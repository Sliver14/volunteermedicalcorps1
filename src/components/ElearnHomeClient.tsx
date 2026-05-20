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
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ElearnHomeClient({ courses, categories }: { courses: any[], categories: any[] }) {
  const isMobile = useIsMobile();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-bg-base transition-colors duration-300">
      {/* Hero Banner with Auth Form */}
      <div className="relative bg-bg-base overflow-hidden border-b border-border-main">
        <div className="max-w-7xl mx-auto px-4 py-20 min-h-[calc(100vh-80px)] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Side: Info */}
            <div className="space-y-8">
              <motion.div
                initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/5 text-brand-primary dark:text-brand-secondary text-sm font-bold uppercase tracking-widest"
              >
                <FaUserGraduate className="text-brand-secondary" />
                ENJOY EASY LEARNING
              </motion.div>
              <motion.h2 
                initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-primary dark:text-brand-secondary leading-tight uppercase"
              >
                Convenient Way of <span className="text-brand-secondary dark:text-white">Learning Skills!</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base md:text-lg text-text-muted max-w-lg leading-relaxed font-medium"
              >
                Learn from Volunteer Medical Corps' online platform and gain the best skills for your career and volunteering projects.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link href="#courses" className="group relative overflow-hidden bg-brand-primary text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all flex items-center gap-2">
                    <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                    <span className="relative z-10 flex items-center gap-2">View Courses <FaArrowRight /></span>
                </Link>
                <button onClick={() => setIsLogin(false)} className="group relative overflow-hidden bg-transparent text-brand-primary dark:text-brand-secondary px-8 py-4 font-bold uppercase tracking-widest text-sm border-2 border-brand-primary dark:border-brand-secondary transition-all">
                    <span className="absolute inset-0 bg-brand-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                    <span className="relative z-10 group-hover:text-white transition-colors">Get Started Free</span>
                </button>
              </motion.div>
            </div>

            {/* Right Side: Auth Form */}
            <motion.div 
              id="auth"
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-bg-surface p-8 md:p-12 shadow-2xl border border-border-main"
            >
              <div className="flex gap-8 mb-10 border-b border-border-main pb-4">
                <button 
                  onClick={() => setIsLogin(true)}
                  className={`text-lg font-bold transition-all relative ${isLogin ? 'text-brand-primary dark:text-brand-secondary' : 'text-text-muted opacity-50'}`}
                >
                  Login
                  {isLogin && <motion.div layoutId="auth-tab" className="absolute -bottom-4 left-0 right-0 h-1 bg-brand-secondary" />}
                </button>
                <button 
                  onClick={() => setIsLogin(false)}
                  className={`text-lg font-bold transition-all relative ${!isLogin ? 'text-brand-primary dark:text-brand-secondary' : 'text-text-muted opacity-50'}`}
                >
                  Sign Up
                  {!isLogin && <motion.div layoutId="auth-tab" className="absolute -bottom-4 left-0 right-0 h-1 bg-brand-secondary" />}
                </button>
              </div>

              <form className="space-y-6">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Full Name</label>
                    <input type="text" className="w-full bg-bg-base border border-border-main p-4 focus:ring-2 focus:ring-brand-secondary outline-none text-text-main" placeholder="Enter your full name" />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Email Address</label>
                  <input type="email" className="w-full bg-bg-base border border-border-main p-4 focus:ring-2 focus:ring-brand-secondary outline-none text-text-main" placeholder="name@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Password</label>
                  <input type="password" className="w-full bg-bg-base border border-border-main p-4 focus:ring-2 focus:ring-brand-secondary outline-none text-text-main" placeholder="••••••••" />
                </div>
                
                <Link href="/elearn/dashboard" className="group relative overflow-hidden w-full bg-brand-primary text-white py-5 font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2">
                  <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                  <span className="relative z-10 group-hover:text-brand-primary transition-colors flex items-center gap-2">
                    {isLogin ? 'Enter Academy' : 'Create Account'}
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <div className="text-center pt-4">
                  <a href="#" className="text-xs font-bold text-text-muted hover:text-brand-secondary transition-colors">Forgot your password?</a>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Boxes Area (Intro) */}
      <section className="relative py-24 bg-bg-base overflow-hidden border-b border-border-main">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-brand-primary p-10 text-white shadow-xl space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-xl font-bold uppercase tracking-tight">Learn Latest Skills</h3>
              <p className="text-white/70 text-sm">Medical, business, professional skills and more...</p>
              <Link href="/elearn/courses" className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:text-brand-secondary transition-colors">
                View Courses <FaPlus />
              </Link>
            </div>
            <div className="bg-bg-surface p-10 shadow-xl border border-border-main space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-xl font-bold text-brand-primary dark:text-brand-secondary uppercase tracking-tight">Premium Courses</h3>
              <p className="text-text-muted text-sm">In high-demand fields like Medicine, IT and Management.</p>
              <Link href="/elearn/courses" className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-brand-primary dark:text-brand-secondary hover:underline transition-all">
                View More <FaPlus />
              </Link>
            </div>
            <div className="bg-brand-secondary p-10 text-brand-primary shadow-xl space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-xl font-bold uppercase tracking-tight">Earn Certificates</h3>
              <p className="text-brand-primary/70 text-sm">From leading institutions in medicine and management.</p>
              <Link href="/elearn/courses" className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:underline transition-all">
                In-View <FaPlus />
              </Link>
            </div>
            <div className="bg-bg-surface p-10 shadow-xl border border-border-main space-y-4 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-xl font-bold text-brand-primary dark:text-brand-secondary uppercase tracking-tight">Upgrade Skills</h3>
              <p className="text-text-muted text-sm">With on-demand training and development programs.</p>
              <Link href="/elearn/courses" className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-brand-primary dark:text-brand-secondary hover:underline transition-all">
                View More <FaPlus />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Courses */}
      <section id="courses" className="py-24 bg-bg-base">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-brand-secondary font-bold uppercase tracking-widest text-xs">Discover Courses</span>
              <h2 className="text-3xl font-bold text-brand-primary dark:text-text-main uppercase">Trending Online Courses</h2>
            </div>
            <Link href="/elearn/courses" className="group relative overflow-hidden bg-brand-primary text-white px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2">
                <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 flex items-center gap-2">All Courses <FaBookOpen /></span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length > 0 ? courses.map((course) => (
              <div key={course.id} className="bg-bg-surface overflow-hidden shadow-sm border border-border-main group">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={course.image || "https://volunteermedicalcorps.org/elearn/instructors/images/courses/mXFMVbthS.jpg"} 
                    alt={course.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4 bg-brand-secondary text-brand-primary px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                    {course.category?.name || "General"}
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-bg-base flex items-center justify-center">
                        <FaUser className="text-text-muted text-xs" />
                    </div>
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-tight">VMC OFFICE</span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-primary dark:text-text-main line-clamp-2 min-h-[3.5rem] uppercase">
                    <Link href={`/elearn/courses/${course.id}`} className="hover:text-brand-secondary transition-colors">
                      {course.title}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                    <span className="text-text-muted text-xs font-medium ml-2">5.0 (1 rating)</span>
                  </div>
                  <div className="pt-6 border-t border-border-main flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    <span className="flex items-center gap-2"><FaUser /> {Math.floor(Math.random() * 50)} Students</span>
                    <span className="flex items-center gap-2"><FaBookOpen /> {course._count?.lessons || 1} Lessons</span>
                    <span className="text-brand-primary dark:text-brand-secondary font-bold">{course.price === 0 ? "FREE" : `$${course.price}`}</span>
                  </div>
                </div>
              </div>
            )) : (
                <div className="col-span-full text-center py-20">
                    <p className="text-text-muted font-bold">No trending courses available at the moment.</p>
                </div>
            )}
          </div>
        </div>
      </section>

      {/* Mission Area */}
      <section className="relative py-32 bg-brand-primary overflow-hidden text-white transition-colors duration-300">
        <div className="absolute inset-0 opacity-10">
          <Image src="https://volunteermedicalcorps.org/pmr-bg-mission.jpg" alt="Background" fill className="object-cover" unoptimized />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-brand-secondary font-bold uppercase tracking-widest text-xs">Discover Purpose</span>
                <h2 className="text-3xl md:text-4xl font-bold uppercase leading-tight">Why choose to study with us</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-secondary flex-shrink-0 flex items-center justify-center text-brand-primary">
                    <FaCheckCircle size={24} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold uppercase tracking-tight">Quality is better than quantity</h4>
                    <p className="text-white/70 leading-relaxed text-sm font-medium">Every course is properly vetted to ensure it complies with our standard. What we lack in quantity, we compensate for in quality.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/10 flex-shrink-0 flex items-center justify-center text-brand-secondary">
                    <FaCheckCircle size={24} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold uppercase tracking-tight">Learn without straining</h4>
                    <p className="text-white/70 leading-relaxed text-sm font-medium">Learn at your pace, finish the course when it suits you. No pressure, just quality experience.</p>
                  </div>
                </div>
              </div>

              <Link href="/about" className="group relative overflow-hidden inline-flex bg-white text-brand-primary px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all gap-2 shadow-xl">
                <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 flex items-center gap-2">Learn More <FaArrowRight /></span>
              </Link>
            </div>
            <div className="relative aspect-video border-[8px] border-bg-surface overflow-hidden shadow-2xl">
                <Image src="https://volunteermedicalcorps.org/elearn/assets/images/home-inner-banner.jpg" alt="Mission" fill className="object-cover" unoptimized />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-bg-base border-b border-border-main transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="space-y-2">
                <span className="text-brand-secondary font-bold uppercase tracking-widest text-xs">Course Categories</span>
                <h2 className="text-3xl font-bold text-brand-primary dark:text-text-main uppercase">Browse Categories</h2>
                </div>
                <Link href="/elearn/courses" className="group relative overflow-hidden bg-brand-primary text-white px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2">
                    <span className="absolute inset-0 bg-brand-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                    <span className="relative z-10 flex items-center gap-2">View All <FaArrowRight /></span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat, idx) => (
                    <div key={cat.id} className="relative bg-bg-surface p-10 hover:bg-brand-primary group transition-all duration-300 border border-border-main overflow-hidden">
                        <div className="w-16 h-16 bg-bg-base flex items-center justify-center text-3xl text-brand-primary mb-6 shadow-sm group-hover:bg-brand-secondary">
                            {idx % 4 === 0 && <FaCamera />}
                            {idx % 4 === 1 && <FaCode />}
                            {idx % 4 === 2 && <FaLayerGroup />}
                            {idx % 4 === 3 && <FaFlagCheckered />}
                        </div>
                        <h3 className="text-lg font-bold text-brand-primary dark:text-text-main group-hover:text-white transition-colors mb-2 uppercase">{cat.name}</h3>
                        <p className="text-text-muted group-hover:text-white/60 font-bold text-[10px] uppercase tracking-widest">{cat._count?.courses || 0} Courses</p>
                        <Link href={`/elearn/categories/${cat.id}`} className="absolute inset-0 z-10" />
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Become Instructor */}
      <section className="bg-brand-secondary py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 text-brand-primary">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase">Become an Instructor</h2>
                    <p className="text-base md:text-lg font-medium opacity-80 leading-relaxed">
                        Join a host of top professional instructors who are sharing their skills and knowledge to a yearning generation.
                    </p>
                    <Link href="/elearn/instructors" className="group relative overflow-hidden inline-flex bg-brand-primary text-white px-10 py-4 font-bold uppercase tracking-widest text-xs transition-all gap-2">
                        <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                        <span className="relative z-10 group-hover:text-brand-primary transition-colors flex items-center gap-2">Apply Now <FaPlusCircle /></span>
                    </Link>
                </div>
                <div className="relative aspect-video border-[8px] border-white/50 overflow-hidden shadow-2xl">
                    <Image src="https://volunteermedicalcorps.org/elearn/assets/img/become-instructor.jpg" fill alt="Instructors" className="object-cover" unoptimized />
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

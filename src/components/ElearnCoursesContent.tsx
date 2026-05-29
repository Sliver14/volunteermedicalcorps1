"use client";

import { motion } from "framer-motion";
import { 
  FaSearch, 
  FaFilter, 
  FaStar, 
  FaClock, 
  FaUserMd,
  FaArrowRight
} from "react-icons/fa";
import Image from "next/image";

export default function ElearnCoursesContent({ courses }: { courses: any[] }) {
  const categories = ["All Courses", "Clinical Training", "Leadership & Management", "Disaster Response", "Public Health"];

  return (
    <div className="space-y-10 pb-20">
      {/* Search & Filter Header */}
      <div className="bg-bg-surface rounded-[2.5rem] border border-border-main shadow-sm p-10 flex flex-col lg:flex-row gap-8 items-center justify-between transition-colors duration-300">
        <div className="w-full lg:max-w-md relative group">
          <input 
            type="text" 
            placeholder="Search for courses, topics..." 
            className="w-full bg-bg-base border border-border-main rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-brand-primary focus:bg-bg-surface transition-all shadow-inner text-text-main"
          />
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-primary transition-colors" />
        </div>

        <div className="flex flex-wrap items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          {categories.map((cat, i) => (
            <button 
              key={cat} 
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all
                ${i === 0 ? 'bg-brand-primary dark:bg-brand-secondary text-white dark:text-brand-primary shadow-lg shadow-brand-primary/10' : 'bg-bg-base text-text-muted hover:bg-border-main'}`}
            >
              {cat}
            </button>
          ))}
          <button className="w-12 h-12 bg-brand-primary dark:bg-brand-secondary text-white dark:text-brand-primary rounded-xl flex items-center justify-center hover:opacity-90 transition-all">
            <FaFilter />
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-bg-surface rounded-[2.5rem] border border-border-main shadow-sm overflow-hidden hover:shadow-2xl transition-all group flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <Image 
                  src={course.image} 
                  alt={course.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-bg-surface/90 backdrop-blur-md text-brand-primary dark:text-brand-secondary text-[9px] font-black px-4 py-2 rounded-lg uppercase tracking-widest shadow-lg">
                    {course.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-brand-secondary">
                    {[1, 2, 3, 4, 5].map((s) => <FaStar key={s} size={10} />)}
                  </div>
                  <span className="text-[10px] font-bold text-text-muted">(4.8)</span>
                </div>

                <h3 className="text-xl font-black text-text-main leading-tight mb-4 group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors line-clamp-2 min-h-[3.5rem]">
                  {course.title}
                </h3>

                <div className="flex items-center gap-6 mb-8 mt-auto">
                  <div className="flex items-center gap-2 text-text-muted">
                    <FaClock size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{course.duration || 'Flexible'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted">
                    <FaUserMd size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{course.level || 'General'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-border-main">
                  <span className="text-2xl font-black text-text-main">
                    {course.price === 0 ? "FREE" : `$${course.price}`}
                  </span>
                  <button className="bg-brand-primary dark:bg-brand-secondary text-white dark:text-brand-primary px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-3">
                    Enroll Now <FaArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-bg-surface rounded-[2.5rem] border border-border-main">
             <p className="text-text-muted font-bold uppercase tracking-widest">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

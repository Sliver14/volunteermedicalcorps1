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
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 flex flex-col lg:flex-row gap-8 items-center justify-between">
        <div className="w-full lg:max-w-md relative group">
          <input 
            type="text" 
            placeholder="Search for courses, topics..." 
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
          />
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
        </div>

        <div className="flex flex-wrap items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          {categories.map((cat, i) => (
            <button 
              key={cat} 
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all
                ${i === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/10' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
            >
              {cat}
            </button>
          ))}
          <button className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all">
            <FaFilter />
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all group flex flex-col"
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
                <span className="bg-white/90 backdrop-blur-md text-blue-600 text-[9px] font-black px-4 py-2 rounded-lg uppercase tracking-widest shadow-lg">
                  {course.category}
                </span>
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => <FaStar key={s} size={10} />)}
                </div>
                <span className="text-[10px] font-bold text-gray-400">(4.8)</span>
              </div>

              <h3 className="text-xl font-black text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>

              <div className="flex items-center gap-6 mb-8 mt-auto">
                <div className="flex items-center gap-2 text-gray-400">
                  <FaClock size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">4.5 Hours</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaUserMd size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Advanced</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <span className="text-2xl font-black text-gray-900">FREE</span>
                <button className="bg-blue-600 text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center gap-3">
                  Enroll Now <FaArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

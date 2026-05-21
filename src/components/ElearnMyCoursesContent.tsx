"use client";

import { motion } from "framer-motion";
import { 
  FaPlayCircle, 
  FaCertificate, 
  FaBookOpen,
  FaCheckCircle
} from "react-icons/fa";
import Image from "next/image";

export default function ElearnMyCoursesContent() {
  const myCourses = [
    {
      id: "mc1",
      title: "Introduction to the Volunteer Medical Corps",
      image: "https://volunteermedicalcorps.org/elearn/instructors/images/courses/7vWQjZUTR.jpeg",
      progress: 65,
      lastAccessed: "Oct 24, 2026",
      category: "Leadership"
    },
    {
      id: "mc2",
      title: "Emergency First Aid & Trauma Care",
      image: "https://volunteermedicalcorps.org/elearn/instructors/images/courses/sb8UD1MCE.jpg",
      progress: 100,
      lastAccessed: "Sep 12, 2026",
      category: "Medical"
    }
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">My Courses</h2>
          <p className="text-gray-500 font-medium">Track your personal learning progress and certifications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {myCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-8 flex flex-col sm:flex-row gap-8 group"
          >
            <div className="w-full sm:w-48 h-36 relative rounded-2xl overflow-hidden shadow-sm shrink-0">
              <Image 
                src={course.image} 
                alt={course.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <FaPlayCircle size={40} className="text-white/80 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="mb-6">
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-2">{course.category}</span>
                <h3 className="text-lg font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
              </div>

              <div className="mt-auto space-y-4">
                <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span>Course Progress</span>
                  <span className="text-blue-600">{course.progress}%</span>
                </div>
                <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className={`h-full ${course.progress === 100 ? 'bg-green-500' : 'bg-blue-600'}`}
                  />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <p className="text-[9px] font-bold text-gray-300 italic uppercase">Last Accessed: {course.lastAccessed}</p>
                  {course.progress === 100 ? (
                    <button className="flex items-center gap-2 text-green-600 text-[10px] font-black uppercase tracking-widest hover:text-green-700 transition-colors">
                      <FaCertificate size={12} /> Download Cert
                    </button>
                  ) : (
                    <button className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:text-gray-900 transition-colors">
                      Resume Course
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

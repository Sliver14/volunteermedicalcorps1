"use client";

import { motion } from "framer-motion";
import { 
  FaPlayCircle, 
  FaCertificate, 
  FaBookOpen,
  FaCheckCircle
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface Props {
  enrollments?: any[];
}

export default function ElearnMyCoursesContent({ enrollments = [] }: Props) {
  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-text-main tracking-tight">My Courses</h2>
          <p className="text-text-muted font-medium">Track your personal learning progress and certifications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {enrollments.length > 0 ? (
          enrollments.map((enrollment, index) => (
            <motion.div
              key={enrollment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-bg-surface rounded-[2.5rem] border border-border-main shadow-sm overflow-hidden p-8 flex flex-col sm:flex-row gap-8 group transition-colors duration-300"
            >
              <Link 
                href={`/elearn/learn/${enrollment.course?.id}`}
                className="w-full sm:w-48 h-36 relative rounded-2xl overflow-hidden shadow-sm shrink-0"
              >
                <Image 
                  src={enrollment.course?.image || "/logo.png"} 
                  alt={enrollment.course?.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <FaPlayCircle size={40} className="text-white/80 group-hover:scale-110 transition-transform" />
                </div>
              </Link>

              <div className="flex-1 flex flex-col">
                <div className="mb-6">
                  <span className="text-[9px] font-black text-brand-tertiary uppercase tracking-widest block mb-2">{enrollment.course?.category?.name || "General"}</span>
                  <Link href={`/elearn/learn/${enrollment.course?.id}`}>
                    <h3 className="text-lg font-black text-text-main leading-tight group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors">
                      {enrollment.course?.title}
                    </h3>
                  </Link>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest text-text-muted">
                    <span>Course Progress</span>
                    <span className="text-brand-primary dark:text-brand-secondary">{Math.round(enrollment.progress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-bg-base rounded-full overflow-hidden transition-colors duration-300">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${enrollment.progress}%` }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className={`h-full ${enrollment.isCompleted ? 'bg-green-500' : 'bg-brand-primary dark:bg-brand-secondary'}`}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-[9px] font-bold text-text-muted italic uppercase">Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
                    {enrollment.isCompleted ? (
                      <button className="flex items-center gap-2 text-green-600 dark:text-green-400 text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-colors">
                        <FaCertificate size={12} /> Download Cert
                      </button>
                    ) : (
                      <Link 
                        href={`/elearn/learn/${enrollment.course?.id}`}
                        className="text-brand-primary dark:text-brand-secondary text-[10px] font-black uppercase tracking-widest hover:text-text-main transition-colors"
                      >
                        Resume Course
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-bg-surface rounded-[2.5rem] border border-border-main">
            <FaBookOpen size={40} className="mx-auto text-text-muted/30 mb-4" />
            <h3 className="text-xl font-black text-text-main uppercase">No enrollments found</h3>
            <p className="text-text-muted font-medium mt-2">Browse the academy to start learning.</p>
          </div>
        )}
      </div>
    </div>
  );
}

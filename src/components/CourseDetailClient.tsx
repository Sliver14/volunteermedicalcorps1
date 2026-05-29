"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPlayCircle, 
  FaClock, 
  FaUserMd, 
  FaCheckCircle, 
  FaArrowRight, 
  FaSpinner,
  FaBookOpen,
  FaAward,
  FaUsers,
  FaStar,
  FaChevronLeft
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CourseDetailClient({ course, isEnrolled: initialIsEnrolled }: { course: any, isEnrolled: boolean }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isEnrolled, setIsEnrolled] = useState(initialIsEnrolled);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  const handleEnroll = async () => {
    if (!session) {
      router.push("/login?callbackUrl=/elearn/courses/" + course.id);
      return;
    }

    if (isEnrolled) {
      router.push(`/elearn/learn/${course.id}`);
      return;
    }

    setIsEnrolling(true);
    try {
      const res = await fetch("/api/elearn/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course.id }),
      });

      if (res.ok) {
        setIsEnrolled(true);
        setMessage({ type: "success", text: "Successfully enrolled!" });
        setTimeout(() => {
          router.push(`/elearn/learn/${course.id}`);
        }, 1500);
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.message || "Enrollment failed" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong" });
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base font-poppins text-text-main pb-20">
      {/* Hero Banner Section */}
      <section className="relative h-[450px] lg:h-[550px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={course.image || "/logo.png"} 
            alt={course.title} 
            fill 
            className="object-cover brightness-[0.3]"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/20 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 h-full relative z-10 flex flex-col justify-center">
          <Link href="/elearn" className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors mb-10 text-[10px] font-black uppercase tracking-widest">
            <FaChevronLeft /> Back to Academy
          </Link>
          
          <div className="max-w-3xl space-y-8">
            <div className="flex items-center gap-4">
               <span className="bg-brand-primary text-white text-[9px] font-black px-4 py-2 rounded-lg uppercase tracking-widest shadow-xl">
                 {course.category?.name || "General"}
               </span>
               <div className="flex text-brand-secondary">
                 {[1, 2, 3, 4, 5].map((s) => <FaStar key={s} size={10} />)}
               </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              {course.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-white/80">
               <div className="flex items-center gap-2">
                 <FaClock className="text-brand-primary" />
                 <span className="text-sm font-bold uppercase tracking-widest">{course.duration || "Self-Paced"}</span>
               </div>
               <div className="flex items-center gap-2">
                 <FaUserMd className="text-brand-primary" />
                 <span className="text-sm font-bold uppercase tracking-widest">{course.level || "General"}</span>
               </div>
               <div className="flex items-center gap-2">
                 <FaUsers className="text-brand-primary" />
                 <span className="text-sm font-bold uppercase tracking-widest">1,200+ Students</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-bg-surface p-10 lg:p-16 rounded-[3rem] border border-border-main shadow-sm prose dark:prose-invert max-w-none">
              <h2 className="text-3xl font-black text-text-main mb-8 flex items-center gap-6">
                <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center">
                  <FaBookOpen />
                </div>
                Course Overview
              </h2>
              <div className="text-text-muted font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: course.description || course.brief || "No description provided." }} />
            </div>

            <div className="bg-bg-surface p-10 lg:p-16 rounded-[3rem] border border-border-main shadow-sm">
              <h2 className="text-3xl font-black text-text-main mb-8 flex items-center gap-6">
                <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center">
                  <FaPlayCircle />
                </div>
                Curriculum
              </h2>
              <div className="space-y-4">
                {course.lessons?.map((lesson: any, index: number) => (
                  <div key={lesson.id} className="flex items-center justify-between p-6 rounded-2xl bg-bg-base border border-border-main group hover:border-brand-primary transition-all">
                    <div className="flex items-center gap-6">
                      <span className="w-8 h-8 rounded-xl bg-bg-surface border border-border-main flex items-center justify-center text-[10px] font-black text-text-muted group-hover:bg-brand-primary group-hover:text-white transition-all">
                        {index + 1}
                      </span>
                      <p className="font-black text-sm text-text-main group-hover:text-brand-primary transition-colors">{lesson.title}</p>
                    </div>
                    <div className="flex items-center gap-3 text-text-muted text-[10px] font-bold uppercase tracking-widest">
                       <FaClock size={12} /> {lesson.duration || "5m"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Widget */}
          <div className="lg:col-span-4">
            <div className="bg-bg-surface p-8 lg:p-12 rounded-[3rem] border border-border-main shadow-2xl sticky top-28">
              <div className="text-center mb-10">
                <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4">Course Price</p>
                <h3 className="text-5xl font-black text-text-main">{course.price === 0 ? "FREE" : `$${course.price}`}</h3>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                  className="w-full bg-brand-primary dark:bg-brand-secondary text-white dark:text-brand-primary py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-4 hover:opacity-90 transition-all shadow-2xl shadow-brand-primary/20 disabled:opacity-50"
                >
                  {isEnrolling ? <FaSpinner className="animate-spin" /> : isEnrolled ? <FaPlayCircle /> : <FaArrowRight />}
                  {isEnrolling ? "Processing..." : isEnrolled ? "Resume Learning" : "Enroll Now"}
                </button>
                <p className="text-center text-[9px] font-bold text-text-muted uppercase tracking-widest pt-2">Life-time access to course materials</p>
              </div>

              <div className="mt-12 pt-10 border-t border-border-main space-y-6">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                   <span className="text-text-muted">Instructor</span>
                   <span className="text-text-main">{course.instructor ? `${course.instructor.firstName} ${course.instructor.lastName}` : "VMC Academy"}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                   <span className="text-text-muted">Total Lessons</span>
                   <span className="text-text-main">{course.lessons?.length || 0} Modules</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                   <span className="text-text-muted">Certificate</span>
                   <span className="text-brand-primary flex items-center gap-2"><FaAward /> Included</span>
                </div>
              </div>

              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`mt-8 p-4 rounded-xl text-center text-[10px] font-black uppercase tracking-widest ${
                      message.type === "success" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                    }`}
                  >
                    {message.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPlayCircle, 
  FaCheckCircle, 
  FaChevronLeft, 
  FaChevronRight, 
  FaBars, 
  FaTimes,
  FaBookOpen,
  FaVideo,
  FaClock,
  FaAward,
  FaSpinner
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface Lesson {
  id: string;
  title: string;
  videoUrl?: string;
  content?: string;
  duration?: string;
  order: number;
  isCompleted?: boolean;
}

interface Course {
  id: string;
  title: string;
  lessons: Lesson[];
  instructor?: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

export default function CoursePlayer({ course, initialProgress = [] }: { course: Course, initialProgress?: any[] }) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set(initialProgress.map(p => p.lessonId)));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);

  const currentLesson = course.lessons[currentLessonIndex];
  const progressPercentage = (completedLessons.size / course.lessons.length) * 100;

  const handleLessonComplete = async (lessonId: string) => {
    if (completedLessons.has(lessonId)) return;

    setIsUpdatingProgress(true);
    try {
      const res = await fetch("/api/elearn/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, status: 1 }),
      });

      if (res.ok) {
        setCompletedLessons(prev => new Set([...Array.from(prev), lessonId]));
      }
    } catch (error) {
      console.error("Failed to update progress:", error);
    } finally {
      setIsUpdatingProgress(false);
    }
  };

  const nextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
    }
  };

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
    }
  };

  return (
    <div className="flex h-screen bg-bg-base overflow-hidden font-poppins text-text-main">
      {/* Sidebar - Lesson List */}
      <aside className={`fixed inset-y-0 right-0 z-50 w-[350px] bg-bg-surface border-l border-border-main transform transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 border-b border-border-main">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-sm uppercase tracking-widest text-text-muted">Course Content</h3>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-text-muted">
              <FaTimes size={18} />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-text-muted">
              <span>Overall Progress</span>
              <span className="text-brand-primary">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-1.5 w-full bg-bg-base rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                className="h-full bg-brand-primary shadow-[0_0_10px_rgba(0,163,224,0.5)]"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
          {course.lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              onClick={() => setCurrentLessonIndex(index)}
              className={`w-full text-left p-4 rounded-2xl transition-all border flex gap-4 group ${
                currentLessonIndex === index 
                  ? "bg-brand-primary/5 border-brand-primary/20" 
                  : "bg-transparent border-transparent hover:bg-bg-base"
              }`}
            >
              <div className="shrink-0 mt-1">
                {completedLessons.has(lesson.id) ? (
                  <FaCheckCircle className="text-green-500" size={18} />
                ) : (
                  <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center text-[8px] font-black ${
                    currentLessonIndex === index ? "border-brand-primary text-brand-primary" : "border-text-muted/30 text-text-muted/30"
                  }`}>
                    {index + 1}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-black leading-tight mb-1 line-clamp-2 ${currentLessonIndex === index ? "text-brand-primary" : "text-text-main"}`}>
                  {lesson.title}
                </p>
                <div className="flex items-center gap-3 text-[9px] font-bold text-text-muted uppercase tracking-widest">
                  <span className="flex items-center gap-1"><FaVideo size={10} /> Video</span>
                  <span className="flex items-center gap-1"><FaClock size={10} /> {lesson.duration || "5m"}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-border-main bg-bg-base/20">
          <Link href="/elearn/dashboard" className="flex items-center justify-center gap-3 w-full py-4 rounded-xl border-2 border-dashed border-border-main text-[10px] font-black uppercase tracking-widest text-text-muted hover:border-brand-primary/30 hover:text-brand-primary transition-all">
            <FaChevronLeft size={10} /> Back to Dashboard
          </Link>
        </div>
      </aside>

      {/* Main Player Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 bg-bg-surface/80 backdrop-blur-md border-b border-border-main flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center gap-6">
            <Link href="/elearn/dashboard">
              <Image src="/logo.png" alt="Logo" width={100} height={30} className="object-contain" unoptimized />
            </Link>
            <div className="h-6 w-[1px] bg-border-main hidden sm:block" />
            <h1 className="text-sm font-black text-text-main line-clamp-1 hidden sm:block max-w-md">
              {course.title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-3 bg-bg-base rounded-xl text-text-main">
                <FaBars size={18} />
             </button>
             <div className="hidden sm:flex items-center gap-3 pl-6 border-l border-border-main">
                <div className="text-right">
                  <p className="text-[10px] font-black text-text-main leading-none">Lesson {currentLessonIndex + 1} of {course.lessons.length}</p>
                  <p className="text-[8px] font-bold text-brand-primary uppercase tracking-widest mt-1">In Progress</p>
                </div>
             </div>
          </div>
        </header>

        {/* Player Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-5xl mx-auto p-6 lg:p-10 space-y-10">
            
            {/* Video Section */}
            <div className="aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative group border-4 border-bg-surface">
              {currentLesson.videoUrl ? (
                <iframe
                  src={currentLesson.videoUrl.includes('youtube.com') 
                    ? currentLesson.videoUrl.replace('watch?v=', 'embed/') 
                    : currentLesson.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                  onLoad={() => {
                    // Auto mark as complete after delay or when video ends (if we had control)
                    // For now, let user mark it.
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-text-muted/20">
                  <FaVideo size={80} />
                  <p className="text-sm font-black uppercase mt-4 tracking-[0.2em]">No Video Content</p>
                </div>
              )}
            </div>

            {/* Lesson Title & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-bg-surface p-8 lg:p-12 rounded-[3rem] border border-border-main shadow-sm">
              <div className="space-y-3">
                <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">Module {currentLessonIndex + 1}</span>
                <h2 className="text-2xl lg:text-3xl font-black text-text-main tracking-tight leading-tight">
                  {currentLesson.title}
                </h2>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleLessonComplete(currentLesson.id)}
                  disabled={completedLessons.has(currentLesson.id) || isUpdatingProgress}
                  className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all shadow-xl ${
                    completedLessons.has(currentLesson.id)
                      ? "bg-green-500 text-white shadow-green-500/20"
                      : "bg-brand-primary text-white shadow-brand-primary/20 hover:opacity-90"
                  }`}
                >
                  {isUpdatingProgress ? <FaSpinner className="animate-spin" /> : completedLessons.has(currentLesson.id) ? <FaCheckCircle size={14} /> : <FaPlayCircle size={14} />}
                  {completedLessons.has(currentLesson.id) ? "Completed" : "Mark as Complete"}
                </button>
              </div>
            </div>

            {/* Lesson Content / Text */}
            <div className="bg-bg-surface p-8 lg:p-16 rounded-[3rem] border border-border-main shadow-sm prose dark:prose-invert max-w-none">
               <h4 className="text-xl font-black text-text-main mb-8 flex items-center gap-4">
                 <FaBookOpen className="text-brand-primary" /> Lesson Description
               </h4>
               <div className="text-text-muted font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: currentLesson.content || "No detailed description provided for this lesson." }} />
            </div>

            {/* Navigation Footer */}
            <div className="flex justify-between items-center pt-10 pb-20">
              <button 
                onClick={prevLesson}
                disabled={currentLessonIndex === 0}
                className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted hover:text-brand-primary transition-all disabled:opacity-20"
              >
                <div className="w-12 h-12 rounded-2xl bg-bg-surface border border-border-main flex items-center justify-center">
                  <FaChevronLeft />
                </div>
                <span>Previous Lesson</span>
              </button>

              <div className="flex items-center gap-2">
                {course.lessons.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${currentLessonIndex === i ? "w-8 bg-brand-primary" : "w-1.5 bg-border-main"}`} />
                ))}
              </div>

              <button 
                onClick={nextLesson}
                disabled={currentLessonIndex === course.lessons.length - 1}
                className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted hover:text-brand-primary transition-all disabled:opacity-20"
              >
                <span>Next Lesson</span>
                <div className="w-12 h-12 rounded-2xl bg-bg-surface border border-border-main flex items-center justify-center">
                  <FaChevronRight />
                </div>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

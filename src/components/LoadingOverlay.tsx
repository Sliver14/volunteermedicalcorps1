"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export default function LoadingOverlay({ isVisible, message }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-primary/95 backdrop-blur-md text-white"
        >
          {/* Pulsing Medical/VMC Themed Background Element */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute w-[500px] h-[500px] rounded-full bg-brand-secondary/20 blur-3xl"
          />

          {/* Logo Container */}
          <div className="relative mb-8">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="relative z-10"
            >
              <Image 
                src="/pmr-logo.png" 
                alt="VMC Logo" 
                width={150} 
                height={150} 
                className="object-contain"
                priority
              />
            </motion.div>
            
            {/* Pulsing Ring */}
            <motion.div
              animate={{ 
                scale: [1, 1.5],
                opacity: [1, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeOut" 
              }}
              className="absolute inset-0 border-2 border-brand-secondary rounded-full"
            />
          </div>

          {/* Loading Text */}
          <div className="relative z-10 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-black uppercase tracking-[0.3em] mb-4 text-brand-secondary"
            >
              {message || "Loading"}
            </motion.h2>
            
            {/* Progress Bar (Indeterminate) */}
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
              <motion.div
                animate={{ 
                  x: ["-100%", "100%"] 
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="w-1/2 h-full bg-brand-secondary shadow-[0_0_10px_rgba(255,159,34,0.8)]"
              />
            </div>
            
            {/* Heartbeat Line (Stylized SVG) */}
            <div className="mt-8 flex justify-center">
              <svg width="100" height="40" viewBox="0 0 100 40" className="text-brand-secondary opacity-50">
                <motion.path
                  d="M0 20 L20 20 L25 10 L30 30 L35 20 L100 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

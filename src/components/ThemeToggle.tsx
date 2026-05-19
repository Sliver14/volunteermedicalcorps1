"use client";

import { useTheme } from "./ThemeProvider";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary border border-border-main hover:border-brand-secondary/50 shadow-inner ${
        theme === 'light' ? 'bg-white' : 'bg-[#121212]'
      }`}
      aria-label="Toggle Dark Mode"
    >
      <div className="flex justify-between items-center px-1 w-full h-full text-[10px]">
        <FaSun className={`${theme === 'light' ? 'text-brand-secondary scale-110' : 'text-gray-400 opacity-50'} z-10 transition-all duration-300`} />
        <FaMoon className={`${theme === 'dark' ? 'text-brand-secondary scale-110' : 'text-gray-400 opacity-50'} z-10 transition-all duration-300`} />
      </div>
      
      <motion.div
        className={`absolute top-1 left-1 w-5 h-5 rounded-full shadow-md border border-white/10 ${
          theme === 'light' ? 'bg-brand-primary' : 'bg-brand-secondary'
        }`}
        animate={{ x: theme === 'dark' ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </button>
  );
}

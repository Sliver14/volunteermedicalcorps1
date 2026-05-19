"use client";

import { useTheme } from "./ThemeProvider";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-[#002866] dark:text-[#ff9f22] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff9f22] border border-transparent hover:border-[#ff9f22]/30"
      aria-label="Toggle Dark Mode"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
      </motion.div>
    </button>
  );
}

"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 rounded-sm border border-gray-200 text-gray-500 hover:bg-[#002866] hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-500 transition-all"
      >
        <FaChevronLeft size={14} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-12 h-12 flex items-center justify-center rounded-sm font-bold text-sm transition-all border ${
            currentPage === page
              ? "bg-[#002866] text-white border-[#002866]"
              : "bg-white text-gray-600 border-gray-200 hover:border-[#002866] hover:text-[#002866]"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 rounded-sm border border-gray-200 text-gray-500 hover:bg-[#002866] hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-500 transition-all"
      >
        <FaChevronRight size={14} />
      </button>
    </div>
  );
}

"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages.map((page, index) => (
      page === "..." ? (
        <span key={`dots-${index}`} className="px-4 text-text-muted font-bold">...</span>
      ) : (
        <button
          key={page}
          onClick={() => onPageChange(page as number)}
          className={`w-12 h-12 flex items-center justify-center font-bold text-sm transition-all border ${
            currentPage === page
              ? "bg-brand-primary text-white border-brand-primary shadow-lg"
              : "bg-bg-surface text-text-muted border-border-main hover:border-brand-primary hover:text-brand-primary"
          }`}
        >
          {page}
        </button>
      )
    ));
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 border border-border-main text-text-muted hover:bg-brand-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text-muted transition-all bg-bg-surface"
      >
        <FaChevronLeft size={14} />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 border border-border-main text-text-muted hover:bg-brand-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text-muted transition-all bg-bg-surface"
      >
        <FaChevronRight size={14} />
      </button>
    </div>
  );
}

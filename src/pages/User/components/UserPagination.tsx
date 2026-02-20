import { ChevronLeft, ChevronRight } from "lucide-react";

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const UserPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: UserPaginationProps) => {
  if (totalPages <= 1) return null;

  const generatePages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + maxVisible - 1, totalPages);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex justify-center items-center gap-2 mt-12 mb-16">
      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1 px-3 py-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition disabled:opacity-30"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Pages */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(Number(page))}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              currentPage === page
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1 px-3 py-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition disabled:opacity-30"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
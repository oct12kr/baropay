import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

function pageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-14 flex items-center justify-center gap-1.5" aria-label="페이지 이동">
      {currentPage > 1 ? (
        <Link
          href={pageHref(basePath, currentPage - 1)}
          className="flex h-10 items-center gap-1 rounded-full px-3 text-sm font-semibold text-text/70 transition-colors hover:bg-section-1 hover:text-primary-blue"
        >
          <ChevronLeft className="h-4 w-4" />
          이전
        </Link>
      ) : (
        <span className="flex h-10 items-center gap-1 rounded-full px-3 text-sm font-semibold text-border">
          <ChevronLeft className="h-4 w-4" />
          이전
        </span>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={pageHref(basePath, page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
            page === currentPage
              ? "bg-primary-blue text-white"
              : "text-text/70 hover:bg-section-1 hover:text-primary-blue"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={pageHref(basePath, currentPage + 1)}
          className="flex h-10 items-center gap-1 rounded-full px-3 text-sm font-semibold text-text/70 transition-colors hover:bg-section-1 hover:text-primary-blue"
        >
          다음
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex h-10 items-center gap-1 rounded-full px-3 text-sm font-semibold text-border">
          다음
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}

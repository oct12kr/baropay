import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { absoluteUrl } from "@/lib/seo";

export interface BreadcrumbItem {
  /** Visible label. */
  label: string;
  /** Site-relative path (e.g. "/blog"). Omit for the current page (last item). */
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/** Visible breadcrumb nav plus matching BreadcrumbList JSON-LD, so the same
 * hierarchy that helps users navigate also helps search engines understand
 * page depth and show breadcrumb rich results. */
export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="이동 경로" className={`flex flex-wrap items-center gap-1.5 text-sm ${className}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={item.label} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-text/50" aria-hidden="true" />
              ) : null}
              {item.href && !isLast ? (
                <Link href={item.href} className="text-gray-text transition-colors hover:text-primary-blue">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "font-medium text-text/80" : "text-gray-text"}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}

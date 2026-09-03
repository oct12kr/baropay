import Link from "next/link";
import { BLOG_PLACEHOLDER_IMAGE } from "@/lib/wordpress";
import type { BlogPost } from "@/types/wordpress";

interface BlogCardProps {
  post: BlogPost;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-[20px] border border-border bg-white transition-all duration-250 hover:-translate-y-[3px] hover:shadow-[0_20px_40px_-16px_rgba(7,30,61,0.18)]"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-light-blue">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.featuredImage ?? BLOG_PLACEHOLDER_IMAGE}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-250 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="line-clamp-2 text-base font-bold text-text">{post.title}</h3>
        {post.excerpt ? (
          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-gray-text">
            {post.excerpt}
          </p>
        ) : null}
        <p className="text-xs text-gray-text">{formatDate(post.date)}</p>
      </div>
    </Link>
  );
}

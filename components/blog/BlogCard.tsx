import Link from "next/link";
import type { BlogPost } from "@/lib/wordpress";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-[20px] border border-card-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(7,30,61,0.18)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-light-blue">
        {post.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.featuredImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-primary-blue/40">
            바로페이 블로그
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        {post.category ? (
          <span className="text-xs font-bold text-primary-blue">{post.category}</span>
        ) : null}
        <h3 className="line-clamp-2 text-base font-bold text-text">{post.title}</h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-gray-text">
          {post.excerpt}
        </p>
        <p className="text-xs text-gray-text">{post.date}</p>
      </div>
    </Link>
  );
}

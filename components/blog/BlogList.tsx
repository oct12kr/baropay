import BlogCard from "@/components/blog/BlogCard";
import type { BlogPost } from "@/types/wordpress";

interface BlogListProps {
  posts: BlogPost[];
  columns?: 3 | 4;
  badge?: string;
  emptyMessage?: string;
}

export default function BlogList({
  posts,
  columns = 4,
  badge,
  emptyMessage = "등록된 블로그 글이 없습니다.",
}: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-[20px] border border-dashed border-border py-24 text-center">
        <p className="text-base font-bold text-text">{emptyMessage}</p>
        <p className="text-sm text-gray-text">빠른 시일 내에 유용한 정보로 찾아뵙겠습니다.</p>
      </div>
    );
  }

  const gridCols = columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${gridCols}`}>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} badge={badge} />
      ))}
    </div>
  );
}

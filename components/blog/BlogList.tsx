import BlogCard from "@/components/blog/BlogCard";
import type { BlogPost } from "@/lib/wordpress";

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-[20px] border border-dashed border-border py-24 text-center">
        <p className="text-base font-bold text-text">등록된 블로그 글이 없습니다.</p>
        <p className="text-sm text-gray-text">빠른 시일 내에 유용한 정보로 찾아뵙겠습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}

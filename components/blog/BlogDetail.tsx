import KakaoButton from "@/components/common/KakaoButton";
import BlogCard from "@/components/blog/BlogCard";
import { BLOG_PLACEHOLDER_IMAGE } from "@/lib/wordpress";
import type { BlogPost } from "@/types/wordpress";

interface BlogDetailProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  });
}

export default function BlogDetail({ post, relatedPosts }: BlogDetailProps) {
  return (
    <article className="mx-auto flex w-full max-w-[820px] flex-col gap-8 py-16 md:py-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-[28px] font-extrabold leading-tight text-text md:text-[36px]">
          {post.title}
        </h1>
        <p className="text-sm text-gray-text">{formatDate(post.date)}</p>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.featuredImage ?? BLOG_PLACEHOLDER_IMAGE}
        alt={post.featuredImageAlt ?? post.title}
        className="w-full rounded-[20px] object-cover"
      />

      <div
        className="flex flex-col gap-4 text-[16px] leading-[1.9] text-text/85
          [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-text
          [&_h3]:mt-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-text
          [&_p]:leading-[1.9]
          [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:leading-[1.8]
          [&_blockquote]:border-l-4 [&_blockquote]:border-primary-blue/30 [&_blockquote]:bg-section-1 [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:text-text/70
          [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
          [&_th]:border [&_th]:border-border [&_th]:bg-section-1 [&_th]:p-2 [&_th]:text-left
          [&_td]:border [&_td]:border-border [&_td]:p-2
          [&_a]:text-primary-blue [&_a]:underline [&_a]:underline-offset-2
          [&_img]:max-w-full [&_img]:rounded-2xl"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="flex flex-col items-center gap-4 rounded-[20px] bg-section-1 p-8 text-center">
        <div>
          <p className="text-base font-bold text-text">궁금한 점이 있으신가요?</p>
          <p className="mt-1 text-sm text-gray-text">
            바로페이 상담을 통해 빠르게 확인하세요.
          </p>
        </div>
        <KakaoButton />
      </div>

      {relatedPosts.length > 0 ? (
        <div className="flex flex-col gap-6 border-t border-border pt-10">
          <h2 className="text-lg font-bold text-text">함께 읽어보세요</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <BlogCard key={related.id} post={related} />
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}

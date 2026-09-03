import KakaoButton from "@/components/common/KakaoButton";
import type { BlogPost } from "@/lib/wordpress";

interface BlogDetailProps {
  post: BlogPost;
  prevPost?: Pick<BlogPost, "slug" | "title"> | null;
  nextPost?: Pick<BlogPost, "slug" | "title"> | null;
}

export default function BlogDetail({ post, prevPost, nextPost }: BlogDetailProps) {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 py-16 md:py-20">
      <div className="flex flex-col gap-3">
        {post.category ? (
          <span className="text-sm font-bold text-primary-blue">{post.category}</span>
        ) : null}
        <h1 className="text-[28px] font-extrabold leading-tight text-text md:text-[36px]">
          {post.title}
        </h1>
        <p className="text-sm text-gray-text">{post.date}</p>
      </div>

      {post.featuredImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full rounded-[20px] object-cover"
        />
      ) : null}

      <div
        className="flex flex-col gap-4 text-[15px] leading-relaxed text-text/85 [&_a]:text-primary-blue [&_a]:underline [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-text [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-text [&_img]:rounded-2xl"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {prevPost || nextPost ? (
        <div className="grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
          {prevPost ? (
            <a
              href={`/blog/${prevPost.slug}`}
              className="flex flex-col gap-1 rounded-2xl border border-card-border bg-card p-4"
            >
              <span className="text-xs font-semibold text-gray-text">이전글</span>
              <span className="line-clamp-1 text-sm font-bold text-text">{prevPost.title}</span>
            </a>
          ) : null}
          {nextPost ? (
            <a
              href={`/blog/${nextPost.slug}`}
              className="flex flex-col gap-1 rounded-2xl border border-card-border bg-card p-4 sm:text-right"
            >
              <span className="text-xs font-semibold text-gray-text">다음글</span>
              <span className="line-clamp-1 text-sm font-bold text-text">{nextPost.title}</span>
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-col items-center gap-4 rounded-[20px] bg-section-1 p-8 text-center">
        <p className="text-base font-bold text-text">
          소액결제 · 정보이용료가 궁금하신가요?
        </p>
        <KakaoButton />
      </div>
    </article>
  );
}

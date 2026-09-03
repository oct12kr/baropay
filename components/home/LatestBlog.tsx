import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";
import BlogList from "@/components/blog/BlogList";
import { getLatestPosts } from "@/lib/wordpress";
import { mockBlogPosts } from "@/data/mockBlogPosts";

const MAIN_BLOG_COUNT = 16;

export default async function LatestBlog() {
  const realPosts = await getLatestPosts(MAIN_BLOG_COUNT);
  // WordPress currently has far fewer than 16 published posts, so fall back
  // to mock cards for the design preview until real content catches up.
  const usingMock = realPosts.length < MAIN_BLOG_COUNT;
  const posts = usingMock ? mockBlogPosts.slice(0, MAIN_BLOG_COUNT) : realPosts;

  return (
    <section id="blog" className="bg-white py-20 md:py-28">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-primary-blue">BAROPAY BLOG</span>
            <h2 className="text-[28px] font-extrabold leading-tight text-text md:text-[38px]">
              바로페이 최신 소식
            </h2>
            <p className="text-base text-gray-text md:text-lg">
              바로페이의 다양한 정보와 최신 소식을 확인하세요.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-primary-blue transition-colors hover:text-primary-blue-dark"
          >
            전체보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <BlogList posts={posts} columns={4} linkOverride={usingMock ? "/blog" : undefined} />
      </Container>
    </section>
  );
}

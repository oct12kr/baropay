import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";
import BlogList from "@/components/blog/BlogList";
import { getLatestPosts } from "@/lib/wordpress";

export default async function LatestBlog() {
  const posts = await getLatestPosts(16);

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

        <BlogList posts={posts} columns={4} />
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";
import BlogList from "@/components/blog/BlogList";
import Pagination from "@/components/blog/Pagination";
import { getPosts } from "@/lib/wordpress";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `블로그 | ${siteConfig.name}`,
  description: "바로페이의 다양한 정보와 최신 소식을 확인하세요.",
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

const PAGE_SIZE = 16;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const { posts, totalPages } = await getPosts(page, PAGE_SIZE);

  return (
    <>
      <Header />
      <main>
        <section className="bg-section-1 py-16 md:py-20">
          <Container className="flex flex-col items-center gap-4 text-center">
            <span className="text-sm font-bold text-primary-blue">BAROPAY BLOG</span>
            <h1 className="text-[32px] font-extrabold text-text md:text-[44px]">
              바로페이 블로그
            </h1>
            <p className="max-w-xl text-base text-gray-text md:text-lg">
              다양한 정보와 최신 소식을 확인하세요.
            </p>
          </Container>
        </section>

        <section className="bg-white py-16 md:py-24">
          <Container>
            <BlogList posts={posts} columns={4} />
            <Pagination currentPage={page} totalPages={totalPages} basePath="/blog" />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

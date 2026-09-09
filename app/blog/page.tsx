import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";
import BlogList from "@/components/blog/BlogList";
import Pagination from "@/components/blog/Pagination";
import { getPosts } from "@/lib/wordpress";
import { mockBlogPosts } from "@/data/mockBlogPosts";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `블로그 | ${siteConfig.name}`,
  description: "바로페이의 소액결제, 정보이용료 관련 안내와 이용후기를 확인하세요.",
  path: "/blog",
});

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

const PAGE_SIZE = 16;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const { posts: realPosts, totalPages: realTotalPages } = await getPosts(page, PAGE_SIZE);

  // Same design-preview fallback as the homepage: only kicks in on page 1,
  // since the mock set is a single full page of 16.
  const usingMock = realPosts.length < PAGE_SIZE && page === 1;
  const posts = usingMock ? mockBlogPosts : realPosts;
  const totalPages = usingMock ? 1 : realTotalPages;

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
            <BlogList posts={posts} columns={4} linkOverride={usingMock ? "#" : undefined} />
            <Pagination currentPage={page} totalPages={totalPages} basePath="/blog" />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

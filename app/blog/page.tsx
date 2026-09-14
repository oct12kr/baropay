import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";
import Breadcrumb from "@/components/common/Breadcrumb";
import BlogList from "@/components/blog/BlogList";
import Pagination from "@/components/blog/Pagination";
import { getPosts } from "@/lib/wordpress";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

const PAGE_SIZE = 16;

/**
 * Each paginated /blog?page=N is a distinct listing of different posts, so it
 * gets its own self-referencing canonical and a page-numbered title/description
 * instead of collapsing onto page 1 — otherwise Google would treat pages 2+ as
 * duplicates of page 1 and might not discover posts that only appear there.
 */
export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const path = page > 1 ? `/blog?page=${page}` : "/blog";
  const baseDescription = "바로페이의 소액결제, 정보이용료 관련 안내와 이용후기를 확인하세요.";

  return buildMetadata({
    title: page > 1 ? `블로그 ${page}페이지 | ${siteConfig.name}` : `블로그 | ${siteConfig.name}`,
    description: page > 1 ? `${baseDescription} (${page}페이지)` : baseDescription,
    path,
  });
}

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
            <Breadcrumb items={[{ label: "홈", href: "/" }, { label: "블로그" }]} />
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
            <BlogList posts={posts} columns={4} emptyMessage="등록된 게시글이 없습니다." />
            <Pagination currentPage={page} totalPages={totalPages} basePath="/blog" />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

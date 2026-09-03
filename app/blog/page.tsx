import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";
import BlogList from "@/components/blog/BlogList";
import { fetchCategories, fetchPosts } from "@/lib/wordpress";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `블로그 | ${siteConfig.name}`,
  description: "소액결제와 이용 관련 다양한 정보를 확인하세요.",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([fetchPosts(), fetchCategories()]);

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
              소액결제와 이용 관련 다양한 정보를 확인하세요.
            </p>
          </Container>
        </section>

        {categories.length > 0 ? (
          <section className="border-b border-border bg-white py-6">
            <Container className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category.id}
                  className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-text/80"
                >
                  {category.name}
                </span>
              ))}
            </Container>
          </section>
        ) : null}

        <section className="bg-white py-16 md:py-24">
          <Container>
            <BlogList posts={posts} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";
import BlogDetail from "@/components/blog/BlogDetail";
import { fetchPostBySlug } from "@/lib/wordpress";
import { siteConfig } from "@/config/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return { title: `블로그 | ${siteConfig.name}` };
  }

  return {
    title: `${post.title} | ${siteConfig.name} 블로그`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <Container>
          <BlogDetail post={post} />
        </Container>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";
import BlogDetail from "@/components/blog/BlogDetail";
import { getPostBySlug, getRelatedPosts } from "@/lib/wordpress";
import { siteConfig } from "@/config/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: `블로그 | ${siteConfig.name}` };
  }

  const title = `${post.title} | ${siteConfig.name}`;

  return {
    title,
    description: post.excerpt || siteConfig.description,
    openGraph: {
      title,
      description: post.excerpt || siteConfig.description,
      images: post.featuredImage ? [post.featuredImage] : undefined,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.id, 3);

  return (
    <>
      <Header />
      <main>
        <Container>
          <BlogDetail post={post} relatedPosts={relatedPosts} />
        </Container>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";
import BlogDetail from "@/components/blog/BlogDetail";
import { getPostBySlug, getRelatedPosts } from "@/lib/wordpress";
import { siteConfig } from "@/config/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: `블로그 | ${siteConfig.name}`,
      description: siteConfig.description,
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata({
    title: `${post.title} | ${siteConfig.name}`,
    description: post.excerpt || siteConfig.description,
    path: `/blog/${post.slug}`,
    images: post.featuredImage ? [post.featuredImage] : undefined,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.modified,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.id, 3);
  const postUrl = absoluteUrl(`/blog/${post.slug}`);

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || siteConfig.description,
    datePublished: post.date,
    dateModified: post.modified,
    image: post.featuredImage ?? absoluteUrl("/apple-touch-icon.png"),
    mainEntityOfPage: postUrl,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: absoluteUrl("/apple-touch-icon.png"),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
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

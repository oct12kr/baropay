import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";
import BlogDetail from "@/components/blog/BlogDetail";
import { getAllPosts, getPostBySlug, getRecentPosts } from "@/lib/wordpress";
import { siteConfig } from "@/config/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-renders every known post at build/deploy time so it's served as a
 * cached static page (revalidated every 300s, same as the WordPress fetch)
 * instead of running a full server render on every visit. `dynamicParams`
 * stays at its default `true`, so a post published on WordPress after the
 * last deploy still resolves — Next.js renders it on demand on first visit
 * and caches that output going forward, preserving auto-publish without a
 * redeploy.
 */
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
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

  // Fetched in parallel: the related-posts query doesn't depend on the
  // current post's id (filtering happens locally below), so there's no need
  // to wait for `getPostBySlug` before starting it — this halves the
  // WordPress round-trip latency on a cold cache.
  const [post, recentPosts] = await Promise.all([getPostBySlug(slug), getRecentPosts(4)]);

  if (!post) {
    notFound();
  }

  const relatedPosts = recentPosts.filter((p) => p.id !== post.id).slice(0, 3);
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
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
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

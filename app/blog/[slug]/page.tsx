import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";
import BlogDetail from "@/components/blog/BlogDetail";
import { getPostBySlug, getRecentPosts } from "@/lib/wordpress";
import { siteConfig } from "@/config/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Deliberately no generateStaticParams here: WordPress post slugs for this
// site are non-ASCII (Korean) and WordPress's sanitize_title() stores them as
// literal percent-encoded ASCII text (e.g. slug === "%ec%86%8c..."), not the
// raw characters. Baking that exact byte sequence into the build's static
// params/prerender manifest ties every request's success to matching that
// literal encoding, and ties page availability to WordPress being reachable
// from Vercel's *build* environment. Neither risk is worth it on a site whose
// core requirement is that a WordPress-published post is reachable without a
// redeploy: this route renders fully on demand per request, relying solely on
// the `revalidate: 300` fetch cache in lib/wordpress.ts for speed.

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

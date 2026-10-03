import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";
import BlogDetail from "@/components/blog/BlogDetail";
import BlogCard from "@/components/blog/BlogCard";
import { getPostBySlug, getRecentPosts } from "@/lib/wordpress";
import { siteConfig } from "@/config/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import type { BlogPost } from "@/types/wordpress";

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
  // A WordPress outage is reported by the page itself (see error.tsx); here it
  // just falls back to generic metadata rather than failing the render twice.
  const post = await getPostBySlug(slug).catch(() => null);

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

/** Streams in behind its own Suspense boundary so the article never waits on
 * (or fails with) this secondary WordPress request. */
async function RelatedPosts({
  posts,
  currentId,
}: {
  posts: Promise<BlogPost[]>;
  currentId: number;
}) {
  const relatedPosts = (await posts).filter((p) => p.id !== currentId).slice(0, 3);
  if (relatedPosts.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 border-t border-border pt-10">
      <h2 className="text-lg font-bold text-text">함께 읽어보세요</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((related) => (
          <BlogCard key={related.id} post={related} />
        ))}
      </div>
    </div>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // Started before awaiting the post so both WordPress requests run in
  // parallel; it's only awaited inside <RelatedPosts>, and any failure
  // degrades to "no related posts" instead of rejecting the page.
  const recentPosts = getRecentPosts(4).catch((): BlogPost[] => []);
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

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
          <BlogDetail
            post={post}
            related={
              <Suspense fallback={null}>
                <RelatedPosts posts={recentPosts} currentId={post.id} />
              </Suspense>
            }
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";

/**
 * Shown instantly on navigation to /blog/[slug] while the post (and its
 * WordPress fetch) resolves, so clicking a card feels immediate instead of
 * frozen. Mirrors BlogDetail's layout/spacing to avoid a layout jump once the
 * real content streams in.
 */
export default function BlogPostLoading() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="mx-auto flex w-full max-w-[820px] flex-col gap-8 py-16 md:py-20">
            <div className="h-4 w-48 animate-pulse rounded bg-section-1" />

            <div className="flex flex-col gap-3">
              <div className="h-8 w-full animate-pulse rounded bg-section-1" />
              <div className="h-8 w-2/3 animate-pulse rounded bg-section-1" />
              <div className="h-4 w-24 animate-pulse rounded bg-section-1" />
            </div>

            <div className="aspect-video w-full animate-pulse rounded-[20px] bg-section-1" />

            <div className="flex flex-col gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 w-full animate-pulse rounded bg-section-1" />
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

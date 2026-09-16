import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";

function CardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] border border-border bg-white">
      <div className="aspect-video w-full animate-pulse bg-section-1" />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="h-4 w-5/6 animate-pulse rounded bg-section-1" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-section-1" />
        <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-section-1" />
      </div>
    </div>
  );
}

/**
 * Shown instantly on navigation to /blog while the WordPress-backed post list
 * resolves, so a click never appears to do nothing while the server renders.
 * Mirrors BlogList/BlogCard's layout to avoid a jarring swap once real data
 * streams in.
 */
export default function BlogLoading() {
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

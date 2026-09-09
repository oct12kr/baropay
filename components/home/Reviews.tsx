import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import BlogList from "@/components/blog/BlogList";
import { getLatestPosts } from "@/lib/wordpress";

const MAIN_REVIEW_COUNT = 16;

export default async function Reviews() {
  const posts = await getLatestPosts(MAIN_REVIEW_COUNT);

  return (
    <section id="reviews" className="bg-white py-20 md:py-28">
      <Container className="flex flex-col items-center gap-14">
        <SectionTitle
          eyebrow="이용후기"
          title="실제 고객님들의 후기"
          description="바로페이를 이용하신 고객님들의 실제 후기를 확인해보세요."
        />

        <div className="flex w-full flex-col items-center gap-8">
          <BlogList
            posts={posts}
            columns={4}
            badge="이용후기"
            emptyMessage="등록된 후기가 없습니다."
          />

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-blue transition-colors hover:text-primary-blue-dark"
          >
            전체 후기 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

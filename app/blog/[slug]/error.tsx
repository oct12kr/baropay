"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Container from "@/components/common/Container";

/**
 * Shown when the post can't be loaded (typically WordPress being temporarily
 * unreachable or slow) so the visitor gets an explanation and a retry instead
 * of a page stuck on the loading skeleton.
 */
export default function BlogPostError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="mx-auto flex w-full max-w-[820px] flex-col items-center gap-6 py-24 text-center md:py-32">
            <h1 className="text-[24px] font-extrabold text-text md:text-[28px]">
              게시글을 불러오지 못했습니다
            </h1>
            <p className="text-base text-gray-text">
              일시적인 문제로 글을 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => retry()}
                className="rounded-full bg-primary-blue px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-blue-dark"
              >
                다시 시도
              </button>
              <Link
                href="/blog"
                className="rounded-full border border-border px-6 py-3 text-sm font-bold text-text transition-colors hover:bg-section-1"
              >
                블로그 목록으로
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

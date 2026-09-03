"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function FloatingKakao() {
  const isPlaceholder = siteConfig.kakaoUrl === "#";

  return (
    <div className="fixed right-[max(16px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] z-[100] flex animate-fade-up items-center gap-3 md:right-[max(24px,env(safe-area-inset-right))] md:bottom-[max(24px,env(safe-area-inset-bottom))]">
      <span className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-text shadow-[0_8px_20px_-6px_rgba(7,30,61,0.25)] md:block">
        카카오톡 상담
      </span>

      <a
        href={siteConfig.kakaoUrl}
        target={isPlaceholder ? undefined : "_blank"}
        rel={isPlaceholder ? undefined : "noopener noreferrer"}
        aria-label="카카오톡 상담하기"
        className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-kakao text-kakao-text shadow-[0_10px_24px_-8px_rgba(7,30,61,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_16px_30px_-8px_rgba(7,30,61,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue md:h-16 md:w-16 md:rounded-[20px]"
      >
        <MessageCircle className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2.2} />
      </a>
    </div>
  );
}

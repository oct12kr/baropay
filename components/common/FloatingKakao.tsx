"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function FloatingKakao() {
  const isPlaceholder = siteConfig.kakaoUrl === "#";

  return (
    <a
      href={siteConfig.kakaoUrl}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noopener noreferrer"}
      aria-label="카카오톡 상담하기"
      className="fixed right-[max(16px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] z-[100] flex h-[78px] w-[236px] animate-fade-up items-center gap-3 rounded-[20px] bg-kakao p-4 text-kakao-text shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(0,0,0,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue md:right-[max(24px,env(safe-area-inset-right))] md:bottom-[max(24px,env(safe-area-inset-bottom))] md:h-[88px] md:w-[280px] md:gap-4 md:rounded-[22px] md:p-5"
    >
      <MessageCircle
        className="h-12 w-12 shrink-0 md:h-14 md:w-14"
        strokeWidth={2}
        fill="currentColor"
        fillOpacity={0.08}
      />

      <span className="flex flex-col leading-tight">
        <span className="text-[16px] font-bold md:text-[17px]">가장빠른 카카오톡 상담</span>
        <span className="mt-0.5 text-[13px] font-medium text-kakao-text/70 md:text-[13.5px]">
          1초만에 답해드려요
        </span>
      </span>
    </a>
  );
}

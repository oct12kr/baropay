import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

interface KakaoButtonProps {
  className?: string;
  full?: boolean;
}

export default function KakaoButton({ className = "", full = false }: KakaoButtonProps) {
  return (
    <a
      href={siteConfig.kakaoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-kakao px-6 py-3.5 text-[15px] font-bold text-kakao-text transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
        full ? "w-full" : ""
      } ${className}`}
    >
      <MessageCircle className="h-5 w-5" strokeWidth={2.4} />
      카카오톡 상담하기
    </a>
  );
}

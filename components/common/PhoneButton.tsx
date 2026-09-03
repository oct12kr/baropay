import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

interface PhoneButtonProps {
  className?: string;
  full?: boolean;
  variant?: "outline" | "solid";
}

export default function PhoneButton({
  className = "",
  full = false,
  variant = "outline",
}: PhoneButtonProps) {
  const variantClass =
    variant === "outline"
      ? "border border-border bg-white text-text hover:border-primary-blue hover:text-primary-blue"
      : "bg-navy text-white hover:bg-deep-navy";

  return (
    <a
      href={siteConfig.phone ? `tel:${siteConfig.phone}` : "#"}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${variantClass} ${
        full ? "w-full" : ""
      } ${className}`}
    >
      <Phone className="h-5 w-5" strokeWidth={2.4} />
      전화 상담하기
    </a>
  );
}

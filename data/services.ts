import type { LucideIcon } from "lucide-react";
import { CreditCard, FileText, Smartphone } from "lucide-react";

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
  accent: "blue" | "violet" | "mint";
}

export const services: ServiceItem[] = [
  {
    icon: Smartphone,
    title: "소액결제 상담",
    description: "휴대폰 소액결제 관련 상담을 빠르게 안내합니다.",
    badge: "상담 가능",
    accent: "blue",
  },
  {
    icon: FileText,
    title: "정보이용료 상담",
    description: "콘텐츠 이용 및 정보이용료 관련 상담을 진행합니다.",
    badge: "상담 가능",
    accent: "violet",
  },
  {
    icon: CreditCard,
    title: "맞춤 상담",
    description: "고객 상황에 맞는 이용 가능 여부를 상담합니다.",
    badge: "상담 가능",
    accent: "mint",
  },
];

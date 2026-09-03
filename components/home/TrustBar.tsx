import { Clock, Lock, Zap, ShieldCheck } from "lucide-react";
import Container from "@/components/common/Container";

const items = [
  {
    icon: Clock,
    title: "24시간 연중무휴 상담",
    description: "언제든 편하게 문의하세요.",
  },
  {
    icon: Zap,
    title: "빠른 응답 & 처리",
    description: "신속한 상담 진행을 약속합니다.",
  },
  {
    icon: ShieldCheck,
    title: "수수료 투명 안내",
    description: "숨김 없는 안내를 제공합니다.",
  },
  {
    icon: Lock,
    title: "고객 정보 보호",
    description: "안전하게 정보를 관리합니다.",
  },
];

export default function TrustBar() {
  return (
    <section className="border-y border-border bg-white py-12 md:py-14">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-3 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue text-primary-blue">
                <item.icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <div>
                <p className="text-[15px] font-bold text-text">{item.title}</p>
                <p className="mt-1 text-[13px] text-gray-text">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

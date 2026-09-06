import { Clock, Lock, Zap, ShieldCheck } from "lucide-react";
import Container from "@/components/common/Container";

const items = [
  {
    icon: Clock,
    title: "24시간 연중무휴 상담",
    description: "언제든 편하게 문의하세요.",
    card: "bg-[#EEF6FF] border-[#DCEBFF]",
    iconWrap: "bg-[#DCEBFF] text-[#2878F0]",
  },
  {
    icon: Zap,
    title: "빠른 응답 & 처리",
    description: "신속한 상담 진행을 약속합니다.",
    card: "bg-[#FFF8E6] border-[#FBEDC2]",
    iconWrap: "bg-[#FBEDC2] text-[#D18C1D]",
  },
  {
    icon: ShieldCheck,
    title: "수수료 투명 안내",
    description: "숨김 없는 안내를 제공합니다.",
    card: "bg-[#ECFAF4] border-[#CFEFE1]",
    iconWrap: "bg-[#CFEFE1] text-[#1E9E6C]",
  },
  {
    icon: Lock,
    title: "고객 정보 보호",
    description: "안전하게 정보를 관리합니다.",
    card: "bg-[#F4F0FF] border-[#E1D8FB]",
    iconWrap: "bg-[#E1D8FB] text-[#7857D6]",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-[#FAFCFF] py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {items.map((item) => (
            <div
              key={item.title}
              className={`flex h-full flex-col items-center rounded-[24px] border px-7 py-9 text-center shadow-[0_4px_16px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(15,23,42,0.09)] md:px-8 ${item.card}`}
            >
              <span
                className={`flex h-[72px] w-[72px] items-center justify-center rounded-2xl ${item.iconWrap}`}
              >
                <item.icon className="h-9 w-9" strokeWidth={2.2} />
              </span>
              <p className="mt-5 text-[18px] font-extrabold text-text md:text-[19px]">
                {item.title}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-text md:text-[15px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

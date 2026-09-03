import { Award, Clock, ShieldCheck, Zap } from "lucide-react";

const reasons = [
  { icon: Award, title: "높은 만족도", description: "많은 고객님들이 만족한 상담 서비스." },
  { icon: Zap, title: "빠른 상담 시스템", description: "지체 없이 빠르게 안내해 드립니다." },
  { icon: Clock, title: "24시간 상담", description: "언제든 편하게 문의할 수 있습니다." },
  {
    icon: ShieldCheck,
    title: "안전한 개인정보 관리",
    description: "고객 정보를 안전하게 보호합니다.",
  },
];

export default function WhyBaropay() {
  return (
    <section className="bg-white px-5 py-20 md:px-6 md:py-28 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 rounded-[24px] bg-navy-2 p-8 text-white md:p-14 lg:flex-row lg:items-center lg:gap-6">
        <div className="lg:w-[220px] lg:shrink-0">
          <p className="text-sm font-bold text-white/60">WHY BAROPAY</p>
          <h2 className="mt-3 text-[28px] font-extrabold leading-tight md:text-[34px]">
            바로페이가
            <br />
            선택받는 이유
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:flex-1 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex flex-col gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white">
                <reason.icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-base font-bold">{reason.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

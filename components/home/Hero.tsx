import { CheckCircle2 } from "lucide-react";
import Container from "@/components/common/Container";
import KakaoButton from "@/components/common/KakaoButton";
import PhoneButton from "@/components/common/PhoneButton";
import Logo from "@/components/common/Logo";

const highlights = [
  "언제 어디서나 상담 가능",
  "몇 단계만으로 간편한 진행",
  "진행 과정 친절하게 안내",
  "빠르고 정확한 상담 서비스",
];

const rates = [
  { label: "소액결제", value: "95%" },
  { label: "정보이용료", value: "90%" },
  { label: "신용카드", value: "85%" },
];

const limits = [
  {
    label: "휴대폰 소액결제 현금화",
    desc: "SKT / KT / LG / 알뜰폰",
    amount: "1,000,000원",
  },
  {
    label: "정보·콘텐츠이용료 현금화",
    desc: "구글 아이폰 / 게임·앱내결제",
    amount: "1,000,000원",
  },
  {
    label: "신용카드 현금화",
    desc: "전 카드사 가능",
    amount: "한도 무제한",
  },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-white py-16 md:py-20 lg:flex lg:min-h-[680px] lg:items-center lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-section-1 to-white" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col items-start gap-6 animate-fade-up">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-light-blue px-4 py-2 text-[13px] font-bold text-primary-blue">
            24시간 빠르고 안전한 비상금 해결
          </span>

          <h1 className="text-[38px] font-extrabold leading-[1.2] tracking-tight text-text md:text-[54px] lg:text-[64px] lg:leading-[1.15]">
            3분이면 입금완료,
            <br />
            <span className="text-primary-blue">바로페이</span>
          </h1>

          <div className="flex flex-col gap-3 pt-1">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary-blue" strokeWidth={2.4} />
                <span className="text-[15px] font-semibold text-text/85 md:text-base">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col gap-3 pt-3 sm:w-auto sm:flex-row">
            <KakaoButton />
            <PhoneButton />
          </div>
        </div>

        <div className="relative mx-auto flex justify-center pt-4 lg:pt-0">
          <div className="relative h-[560px] w-[224px] shrink-0 rounded-[42px] border-[8px] border-[#1c1c1e] bg-[#1c1c1e] shadow-[0_30px_60px_-15px_rgba(7,30,61,0.35)] sm:h-[620px] sm:w-[252px] md:h-[660px] md:w-[272px]">
            <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#1c1c1e]" />

            <div className="flex h-full w-full flex-col overflow-hidden rounded-[34px] bg-white">
              <div className="flex flex-col items-center gap-1 pb-3 pt-8">
                <Logo className="scale-90" />
              </div>

              <div className="flex flex-col gap-2 px-4">
                {limits.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-2 rounded-xl border border-card-border bg-card px-3 py-2.5"
                  >
                    <div className="min-w-0 text-left">
                      <p className="text-[9.5px] leading-tight text-gray-text">{item.label}</p>
                      <p className="mt-1 truncate text-[11.5px] font-bold leading-tight text-text">
                        {item.desc}
                      </p>
                    </div>
                    <p className="shrink-0 pl-1 text-[11.5px] font-extrabold leading-tight text-primary-blue">
                      {item.amount}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 pb-6 pt-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-light-blue text-primary-blue">
                  <CheckCircle2 className="h-8 w-8" strokeWidth={2} />
                </span>
                <p className="text-[15px] font-bold text-text">3분 입금 완료!</p>

                <div className="w-full rounded-2xl border border-border bg-section-1 p-4 text-center">
                  <p className="text-xs font-medium text-gray-text">입금완료</p>
                  <p className="mt-1 text-2xl font-extrabold text-navy">300,000원</p>
                  <p className="mt-1 text-[11px] text-gray-text">2026.09.03 14:22</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[-2.5rem] left-1/2 w-[240px] -translate-x-1/2 rounded-[24px] bg-navy p-5 text-white shadow-[0_20px_45px_-12px_rgba(7,30,61,0.5)] sm:left-[-1rem] sm:translate-x-0 sm:w-[260px] md:bottom-[-2.75rem] md:left-[-2.5rem] md:w-[280px]">
            <p className="text-xs font-semibold text-white/70">최대 지급률</p>
            <div className="mt-3 flex items-stretch justify-between">
              {rates.map((rate, index) => (
                <div key={rate.label} className="flex items-stretch">
                  <div className="flex flex-col items-center gap-1 px-2 text-center">
                    <span className="text-[11px] text-white/60">{rate.label}</span>
                    <span className="text-lg font-extrabold">{rate.value}</span>
                  </div>
                  {index < rates.length - 1 ? (
                    <span className="mx-1 w-px bg-white/15" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

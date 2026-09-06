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
      className="relative overflow-hidden bg-[linear-gradient(120deg,#FCFDFF_0%,#EFF7FF_45%,#F5F1FF_100%)] py-14 md:py-16 lg:flex lg:min-h-[620px] lg:items-center lg:py-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute right-[-80px] top-[2%] h-[260px] w-[260px] rounded-full bg-[#CDEBFF] opacity-20 blur-3xl sm:h-[340px] sm:w-[340px] md:right-[4%] md:h-[420px] md:w-[420px] md:opacity-30 lg:right-[8%] lg:top-[-4%] lg:h-[480px] lg:w-[480px] lg:opacity-35" />
        <div className="absolute bottom-[-60px] right-[-40px] h-[220px] w-[220px] rounded-full bg-[#E9E4FF] opacity-20 blur-3xl sm:h-[280px] sm:w-[280px] md:bottom-[-70px] md:right-[6%] md:h-[340px] md:w-[340px] md:opacity-25 lg:right-[10%] lg:h-[400px] lg:w-[400px] lg:opacity-30" />
        <div className="absolute bottom-[-40px] left-[-70px] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(220,235,255,0.45),transparent_70%)] md:h-[300px] md:w-[300px]" />
        <div
          className="absolute bottom-0 right-0 hidden h-[240px] w-[300px] md:block"
          style={{
            backgroundImage: "radial-gradient(rgba(40,120,240,0.08) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
      </div>

      <Container className="relative z-10 grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
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
          <div className="relative h-[460px] w-[224px] shrink-0 rounded-[42px] border-[8px] border-[#1c1c1e] bg-[#1c1c1e] shadow-[0_30px_60px_-15px_rgba(7,30,61,0.35)] sm:h-[485px] sm:w-[248px] md:h-[500px] md:w-[264px]">
            <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#1c1c1e]" />

            <div className="flex h-full w-full flex-col overflow-hidden rounded-[34px] bg-white">
              <div className="flex flex-col items-center pb-[15px] pt-[18px]">
                <Logo className="scale-90" />
              </div>

              <div className="flex flex-col gap-[7px] px-4">
                {limits.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-2 rounded-xl border border-card-border bg-card px-3 py-2"
                  >
                    <div className="min-w-0 text-left">
                      <p className="truncate text-[9.5px] leading-tight text-gray-text">{item.label}</p>
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

              <div className="flex flex-col items-center px-6 pb-5 pt-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-light-blue text-primary-blue">
                  <CheckCircle2 className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <p className="mt-2 text-[15px] font-bold text-text">3분 입금 완료!</p>

                <div className="mt-[13px] w-full rounded-2xl border border-border bg-section-1 p-3.5 text-center">
                  <p className="text-xs font-medium text-gray-text">입금완료</p>
                  <p className="mt-1 text-xl font-extrabold text-navy">300,000원</p>
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

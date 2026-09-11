import { CheckCircle2, Crown } from "lucide-react";
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
      className="relative overflow-hidden py-14 md:py-16 lg:flex lg:min-h-[620px] lg:items-center lg:py-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* base tint layer: linear gradient + soft radial color washes */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(135deg, #FFFFFF 0%, #F3F9FF 35%, #EEF7FF 60%, #F7F2FF 100%),
              radial-gradient(circle at 75% 30%, rgba(170,220,255,0.35), transparent 34%),
              radial-gradient(circle at 88% 65%, rgba(198,190,255,0.32), transparent 32%),
              radial-gradient(circle at 15% 85%, rgba(255,210,238,0.20), transparent 35%)
            `,
          }}
        />

        {/* anchored to the same max-width as the content container so circles stay aligned with the phone on ultra-wide screens */}
        <div className="relative mx-auto h-full w-full max-w-[1280px]">
          {/* right-side pastel circle 1: blue */}
          <div className="absolute right-[10px] top-[30px] h-[220px] w-[220px] rounded-full bg-[rgba(160,215,255,0.32)] blur-md sm:right-[60px] sm:h-[300px] sm:w-[300px] md:right-[70px] md:top-[60px] md:h-[400px] md:w-[400px] lg:right-[40px] lg:top-[80px] lg:h-[480px] lg:w-[480px]" />

          {/* right-side pastel circle 2: lavender, overlapping circle 1 */}
          <div className="absolute bottom-[10px] right-[-30px] h-[200px] w-[200px] rounded-full bg-[rgba(190,175,255,0.28)] blur-md sm:right-[10px] sm:h-[280px] sm:w-[280px] md:bottom-[35px] md:right-[-30px] md:h-[380px] md:w-[380px] lg:right-[-40px] lg:h-[480px] lg:w-[480px]" />

          {/* bottom soft wave layers */}
          <div className="absolute bottom-[-130px] left-[10%] hidden h-[220px] w-[750px] -rotate-[10deg] rounded-full bg-[linear-gradient(90deg,rgba(160,220,255,0.16),rgba(190,180,255,0.14))] sm:block sm:h-[260px] sm:w-[850px] md:left-[15%] md:h-[300px] md:w-[950px] lg:left-[10%] lg:h-[360px] lg:w-[1100px] lg:-rotate-12" />
          <div className="absolute bottom-[-160px] left-[5%] hidden h-[200px] w-[700px] rotate-[8deg] rounded-full bg-[linear-gradient(90deg,rgba(198,190,255,0.14),rgba(255,210,238,0.12))] md:block md:h-[260px] md:w-[900px] lg:left-[2%] lg:h-[300px] lg:w-[1000px] lg:rotate-[9deg]" />

          {/* left-bottom pink/lavender glow */}
          <div className="absolute bottom-[-100px] left-[-100px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(255,205,235,0.22),transparent_70%)] md:bottom-[-120px] md:left-[-80px] md:h-[420px] md:w-[420px] lg:left-[-60px] lg:h-[500px] lg:w-[500px]" />

          {/* fine dot pattern accent */}
          <div
            className="absolute bottom-[80px] right-[40px] hidden h-[160px] w-[220px] opacity-60 md:block lg:bottom-[120px] lg:right-[10px]"
            style={{
              backgroundImage: "radial-gradient(rgba(40,120,240,0.12) 1.5px, transparent 1.5px)",
              backgroundSize: "22px 22px",
            }}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
      </div>

      <Container className="relative z-10 grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col items-start gap-6 animate-fade-up">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-light-blue px-4 py-2 text-[13px] font-bold text-primary-blue">
            24시간 빠르고 안전한 비상금 해결
          </span>

          <h1 className="text-[32px] font-extrabold leading-[1.15] tracking-tight md:text-[46px] md:leading-[1.18] lg:text-[56px] lg:leading-[1.2]">
            <span className="block font-black text-deep-navy">3분이면 입금완료</span>

            <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 md:mt-3">
              <span className="relative isolate inline-block">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-[-6%] bottom-[-0.03em] -z-10 h-[0.26em] rounded-[999px]"
                  style={{
                    background: "rgba(254,229,0,0.82)",
                    transform: "rotate(-2deg)",
                  }}
                />
                <span
                  className="relative bg-clip-text font-black text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #2477F3, #3989FF)" }}
                >
                  소액결제
                </span>
              </span>

              <span className="font-extrabold text-deep-navy">현금화</span>

              <span className="relative isolate inline-flex">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 -top-2.5 flex gap-[3px] md:-right-1.5 md:-top-3"
                >
                  <span className="h-[9px] w-[2.5px] rotate-[18deg] rounded-full bg-[#FEE500] md:h-3" />
                  <span className="h-[6px] w-[2.5px] rotate-[18deg] rounded-full bg-[#FEE500] md:h-[9px]" />
                </span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-[14px] bg-kakao px-3.5 py-2 text-[16px] font-black leading-none text-deep-navy shadow-[0_6px_16px_rgba(7,30,61,0.15)] md:px-4 md:py-2.5 md:text-[22px] lg:px-4 lg:py-2.5 lg:text-[26px]"
                  style={{ transform: "rotate(-2deg)" }}
                >
                  <Crown className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.5} />
                  업계1위
                </span>
              </span>
            </span>

            <span className="mt-2 block md:mt-3">
              <span className="relative isolate inline-block">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-[-4%] bottom-[0.04em] -z-10 h-[0.3em] rounded-[999px]"
                  style={{
                    background: "rgba(40,120,240,0.15)",
                    transform: "rotate(-1deg)",
                  }}
                />
                <span
                  className="relative bg-clip-text font-black text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #2475ED, #4B8FFF)" }}
                >
                  바로페이
                </span>
              </span>
            </span>
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

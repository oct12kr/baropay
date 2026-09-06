import {
  ArrowRight,
  BarChart3,
  Check,
  CreditCard,
  CheckCircle2,
  Crown,
  Gamepad2,
  Play,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import Container from "@/components/common/Container";
import { siteConfig } from "@/config/site";

interface ChecklistItem {
  text: string;
}

interface InfoBoxProps {
  limitValue: string;
  items: ChecklistItem[];
  boxClassName: string;
  dividerClassName: string;
  checkClassName: string;
}

function InfoBox({ limitValue, items, boxClassName, dividerClassName, checkClassName }: InfoBoxProps) {
  return (
    <div className={`w-full rounded-2xl border p-5 text-left ${boxClassName}`}>
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-gray-text">최대 한도</span>
        <span className="text-[15px] font-extrabold text-text">{limitValue}</span>
      </div>
      <div className={`my-3 h-px w-full ${dividerClassName}`} />
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.text} className="flex items-start gap-2.5">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white ${checkClassName}`}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="text-[14px] leading-relaxed text-text/80 md:text-[15px]">
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const contentItems = [
  { text: "구글·애플·원스토어 OK" },
  { text: "게임·앱 결제 모두 가능" },
  { text: "타사 대비 평균 5~15% 높은 지급률" },
];

const phoneItems = [
  { text: "SKT / KT / LG / 알뜰폰 모두 가능" },
  { text: "미납 있어도, 정책 걸려도 OK" },
  { text: "타사 대비 평균 5~13% 높은 지급률" },
];

const cardItems = [
  { text: "모든 카드사, 할부결제 가능" },
  { text: "복잡한 서류 없이 간편하게" },
  { text: "타사 대비 평균 7% 높은 지급률" },
];

const cardBase =
  "relative flex h-full flex-col items-center rounded-[30px] border bg-white/[0.82] px-7 py-8 text-center shadow-[0_18px_50px_rgba(20,60,120,0.08)] backdrop-blur-md transition-all duration-[250ms] hover:-translate-y-[5px] hover:shadow-[0_24px_60px_rgba(20,60,120,0.12)] md:px-8 md:py-9";

export default function PayoutComparison() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#FCFDFF_0%,#F3F8FF_45%,#F7F4FF_100%)] py-16 md:py-20 lg:py-[100px] lg:pb-[110px]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-[300px] w-[300px] rounded-full bg-[#E9E4FF] opacity-20 blur-3xl md:h-[380px] md:w-[380px]" />
        <div className="absolute left-[6%] top-[42%] h-[260px] w-[260px] rounded-full bg-[#CDEBFF] opacity-20 blur-3xl md:h-[340px] md:w-[340px]" />
        <div className="absolute -right-20 top-[6%] h-[280px] w-[280px] rounded-full bg-[#E9E4FF] opacity-20 blur-3xl md:h-[360px] md:w-[360px]" />
        <div className="absolute -right-10 bottom-[-60px] h-[280px] w-[280px] rounded-full bg-[#D8F3E9] opacity-20 blur-3xl md:h-[360px] md:w-[360px]" />
      </div>

      <Container className="relative z-10 flex flex-col items-center">
        <div aria-hidden="true" className="pointer-events-none absolute right-[6%] top-0 hidden -rotate-6 text-right lg:block">
          <p className="text-[20px] font-semibold italic leading-snug text-primary-blue/30">
            더 높은
            <br />
            지급률로!
          </p>
          <svg width="90" height="20" viewBox="0 0 90 20" fill="none" className="ml-auto mt-1">
            <path
              d="M2 14 Q45 -6 88 10"
              stroke="#2878F0"
              strokeOpacity="0.25"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5FF] px-5 py-2.5 text-[13px] font-bold text-primary-blue">
          <BarChart3 className="h-4 w-4" strokeWidth={2.4} />
          지급률 비교
        </span>

        <h2 className="mt-5 text-center text-[32px] font-extrabold leading-[1.15] tracking-tight text-[#0B1F3A] sm:text-[40px] lg:text-[52px]">
          한눈에 보는 타사와의 차이
          <br />
          <span className="text-primary-blue">지급률이 다릅니다</span>
        </h2>

        <p className="mt-5 max-w-xl text-center text-[17px] leading-relaxed text-gray-text md:text-[18px]">
          비교해보면 바로 알 수 있어요. 더 높은 지급률로 보답합니다.
        </p>

        <div className="mt-12 grid w-full grid-cols-1 gap-6 md:mt-14 lg:grid-cols-[1fr_1.05fr_1fr] lg:gap-7">
          {/* 정보/콘텐츠 이용료 - Lavender */}
          <div className={`order-2 border-[#E9E4FF]/70 lg:order-1 ${cardBase}`}>
            <div className="relative flex h-[140px] w-[140px] items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#E4D9FF] opacity-60 blur-2xl" />
              <div className="absolute -left-2 top-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#7857D6] shadow-sm ring-1 ring-[#E1D8FB]">
                <Play className="h-4 w-4" fill="currentColor" />
              </div>
              <div className="absolute -right-1 bottom-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#7857D6] shadow-sm ring-1 ring-[#E1D8FB]">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-3xl bg-white text-[#5B3FD6] shadow-md ring-1 ring-[#E1D8FB]">
                <Gamepad2 className="h-9 w-9" strokeWidth={2} />
              </div>
            </div>

            <p className="mt-6 text-[22px] font-extrabold text-text md:text-[24px]">
              정보/콘텐츠 이용료
            </p>
            <p className="mt-2 text-[40px] font-black leading-none text-[#5B3FD6] md:text-[46px]">
              60~85%
            </p>

            <div className="mt-7 w-full">
              <InfoBox
                limitValue="100만 원"
                items={contentItems}
                boxClassName="bg-[#F4F0FF] border-[#E1D8FB]"
                dividerClassName="bg-[#E1D8FB]"
                checkClassName="bg-[#5B3FD6]"
              />
            </div>
          </div>

          {/* 휴대폰 소액결제 - Best Choice */}
          <div
            className={`order-1 border-primary-blue/40 shadow-[0_24px_60px_rgba(40,120,240,0.18)] lg:order-2 lg:-translate-y-3 lg:hover:-translate-y-4 ${cardBase}`}
          >
            <div className="absolute -top-[18px] left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[linear-gradient(135deg,#2878F0_0%,#0877FF_100%)] px-[22px] py-[10px] text-[13px] font-extrabold text-white shadow-[0_10px_24px_-6px_rgba(40,120,240,0.5)]">
              <Crown className="h-4 w-4 text-[#FFD84D]" fill="#FFD84D" />
              BEST CHOICE
            </div>

            <div className="relative mt-3 flex h-[150px] w-[190px] items-center justify-center">
              <div className="absolute inset-0 m-auto h-[130px] w-[130px] rounded-full bg-[#CFE5FF] opacity-60 blur-2xl" />
              <span className="absolute left-0 top-1 rounded-full bg-[#FFE4EC] px-2.5 py-1 text-[11px] font-bold text-[#D6447E] shadow-sm">
                SKT
              </span>
              <span className="absolute right-0 top-1 rounded-full bg-[#E7EEFC] px-2.5 py-1 text-[11px] font-bold text-[#4A5C8C] shadow-sm">
                KT
              </span>
              <span className="absolute bottom-0 left-1 rounded-full bg-[#FFE4EC] px-2.5 py-1 text-[11px] font-bold text-[#D6447E] shadow-sm">
                LG
              </span>
              <span className="absolute bottom-0 right-1 rounded-full bg-[#DFF6EC] px-2.5 py-1 text-[11px] font-bold text-[#1E9E6C] shadow-sm">
                알뜰폰
              </span>
              <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-3xl bg-white text-primary-blue shadow-md ring-1 ring-[#CFE5FF]">
                <Smartphone className="h-9 w-9" strokeWidth={2} />
              </div>
            </div>

            <p className="mt-4 text-[22px] font-extrabold text-text md:text-[24px]">
              휴대폰 소액결제
            </p>
            <p className="mt-2 text-[42px] font-black leading-none text-primary-blue md:text-[48px]">
              60~85%
            </p>

            <div className="mt-7 w-full">
              <InfoBox
                limitValue="100만 원"
                items={phoneItems}
                boxClassName="bg-[#EDF5FF] border-[#CFE5FF]"
                dividerClassName="bg-[#CFE5FF]"
                checkClassName="bg-primary-blue"
              />
            </div>

            <a
              href={siteConfig.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 flex h-14 w-full items-center justify-center gap-1.5 rounded-2xl bg-[linear-gradient(135deg,#2878F0_0%,#0877FF_100%)] text-[17px] font-bold text-white shadow-[0_14px_30px_-8px_rgba(40,120,240,0.45)] transition-all duration-200 hover:brightness-95 hover:shadow-[0_18px_36px_-8px_rgba(40,120,240,0.55)] md:h-[58px] md:text-[19px]"
            >
              가장 많은 분들이 선택해요!
              <ArrowRight className="h-5 w-5" strokeWidth={2.4} />
            </a>
          </div>

          {/* 신용카드 현금화 - Mint */}
          <div className={`order-3 border-[#CFEFE1]/70 lg:order-3 ${cardBase}`}>
            <div className="relative flex h-[140px] w-[140px] items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#CFEFE1] opacity-60 blur-2xl" />
              <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-3xl bg-white text-[#0E9F78] shadow-md ring-1 ring-[#CFEFE1]">
                <CreditCard className="h-9 w-9" strokeWidth={2} />
              </div>
              <div className="absolute bottom-1 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#0E9F78] text-white shadow-md ring-2 ring-white">
                <CheckCircle2 className="h-4 w-4" strokeWidth={2.6} />
              </div>
            </div>

            <p className="mt-6 text-[22px] font-extrabold text-text md:text-[24px]">
              신용카드 현금화
            </p>
            <p className="mt-2 text-[40px] font-black leading-none text-[#0E9F78] md:text-[46px]">
              88%
            </p>

            <div className="mt-7 w-full">
              <InfoBox
                limitValue="무제한"
                items={cardItems}
                boxClassName="bg-[#ECFAF4] border-[#CFEFE1]"
                dividerClassName="bg-[#CFEFE1]"
                checkClassName="bg-[#0E9F78]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

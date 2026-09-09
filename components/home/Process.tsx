import { BarChart3, Check, ChevronRight, MessageCircle, Search, Zap } from "lucide-react";

interface StepTheme {
  cardBorder: string;
  cardGlow: string;
  numberGradient: string;
  highlightBg: string;
  highlightText: string;
  infoBg: string;
  infoIconBg: string;
  infoIconText: string;
}

const themes: Record<"blue" | "purple" | "yellow", StepTheme> = {
  blue: {
    cardBorder: "border-[#65B5FF]/70",
    cardGlow: "shadow-[0_22px_55px_rgba(40,120,240,0.10)]",
    numberGradient: "bg-[linear-gradient(135deg,#4FA8FF_0%,#2878F0_100%)]",
    highlightBg: "bg-[#E4F3FF]",
    highlightText: "text-[#1681ED]",
    infoBg: "bg-[#EAF4FF]",
    infoIconBg: "bg-white",
    infoIconText: "text-primary-blue",
  },
  purple: {
    cardBorder: "border-[#B68CFF]/70",
    cardGlow: "shadow-[0_22px_55px_rgba(117,57,232,0.10)]",
    numberGradient: "bg-[linear-gradient(135deg,#B48CFF_0%,#7539E8_100%)]",
    highlightBg: "bg-[#F0E7FF]",
    highlightText: "text-[#7539E8]",
    infoBg: "bg-[#F4F0FF]",
    infoIconBg: "bg-white",
    infoIconText: "text-[#7539E8]",
  },
  yellow: {
    cardBorder: "border-[#FFC400]/70",
    cardGlow: "shadow-[0_22px_55px_rgba(255,196,0,0.12)]",
    numberGradient: "bg-[linear-gradient(135deg,#FFD35C_0%,#FF9F1C_100%)]",
    highlightBg: "bg-[#FFF3C6]",
    highlightText: "text-[#5A3C00]",
    infoBg: "bg-[#FFF8E6]",
    infoIconBg: "bg-white",
    infoIconText: "text-[#B4740A]",
  },
};

function InfoBox({ theme, icon, children }: { theme: StepTheme; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className={`mt-auto flex items-center gap-4 rounded-[18px] p-5 ${theme.infoBg}`}>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm ${theme.infoIconBg} ${theme.infoIconText}`}
      >
        {icon}
      </span>
      <p className="text-[13px] leading-relaxed text-text/80 md:text-[14px]">{children}</p>
    </div>
  );
}

function StepNumber({ theme, number }: { theme: StepTheme; number: number }) {
  return (
    <div
      className={`absolute left-1/2 top-0 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[32px] font-extrabold text-white shadow-[0_10px_24px_rgba(0,0,0,0.15)] ring-4 ring-white ${theme.numberGradient}`}
    >
      {number}
    </div>
  );
}

function ArrowConnector({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center py-1 lg:h-full lg:py-0">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(20,60,120,0.12)]">
        <ChevronRight className={`h-6 w-6 rotate-90 lg:rotate-0 ${color}`} strokeWidth={2.4} />
      </span>
    </div>
  );
}

export default function Process() {
  const blue = themes.blue;
  const purple = themes.purple;
  const yellow = themes.yellow;

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#FCFEFF_0%,#F2F9FF_45%,#F7F3FF_100%)] py-24 md:py-28 lg:py-[100px]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-140px] top-[40px] h-[240px] w-[240px] rounded-full bg-[rgba(180,225,255,0.16)] blur-md sm:h-[340px] sm:w-[340px] md:left-[-170px] md:h-[440px] md:w-[440px] md:bg-[rgba(180,225,255,0.2)] lg:left-[-200px] lg:top-[80px] lg:h-[520px] lg:w-[520px] lg:bg-[rgba(180,225,255,0.22)]" />
        <div className="absolute right-[-160px] top-[-100px] h-[260px] w-[260px] rounded-full bg-[rgba(205,220,255,0.16)] blur-md sm:h-[380px] sm:w-[380px] md:right-[-180px] md:h-[480px] md:w-[480px] md:bg-[rgba(205,215,255,0.19)] lg:top-[-180px] lg:h-[600px] lg:w-[600px] lg:bg-[rgba(205,210,255,0.2)]" />

        <div className="absolute bottom-[-220px] left-1/2 hidden h-[360px] w-[1300px] -translate-x-1/2 rounded-[50%] bg-[linear-gradient(90deg,rgba(175,220,255,0.16),rgba(205,190,255,0.14))] sm:block lg:h-[420px] lg:w-[1600px] lg:bottom-[-260px]" />
        <div className="absolute bottom-[-260px] left-1/2 hidden h-[320px] w-[1150px] -translate-x-1/2 rounded-[50%] bg-[linear-gradient(90deg,rgba(205,190,255,0.13),rgba(175,220,255,0.12))] md:block lg:h-[380px] lg:w-[1400px] lg:bottom-[-300px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center px-6 md:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(225,243,255,0.9)] px-5 py-2.5 text-[15px] font-extrabold text-[#1677EA] md:text-[17px]">
          <Zap className="h-4 w-4 text-primary-blue md:h-5 md:w-5" strokeWidth={2.4} fill="currentColor" />
          시간 끌 필요 있나요?
        </span>

        <h2 className="mt-6 flex flex-col items-center gap-1 text-center leading-[1.1] tracking-tighter sm:gap-2">
          <span className="break-keep text-[30px] font-extrabold text-[#0B1F3A] sm:text-[40px] lg:text-[48px]">
            문의는 10초면 됩니다.
          </span>
          <span className="break-keep text-[36px] font-black text-primary-blue sm:text-[48px] lg:text-[58px]">
            나머지는 안내해드립니다.
          </span>
        </h2>

        <p className="mt-5 text-center text-[16px] leading-relaxed text-[#526079] md:text-[18px]">
          휴대폰으로 간편하게 시작하세요.
        </p>

        <div className="mt-14 grid w-full grid-cols-1 gap-y-8 lg:grid-cols-[1fr_60px_1fr_60px_1fr] lg:items-stretch lg:gap-y-0">
          {/* Step 1: 채팅 문의 */}
          <div
            className={`relative flex flex-col rounded-[30px] border-2 bg-white/[0.82] px-7 pb-6 pt-[74px] backdrop-blur-md transition-all duration-250 hover:-translate-y-[5px] lg:min-h-[500px] ${blue.cardBorder} ${blue.cardGlow}`}
          >
            <StepNumber theme={blue} number={1} />

            <div className="relative mx-auto flex h-[130px] w-[130px] items-center justify-center">
              <div className="absolute inset-0 m-auto h-[160px] w-[160px] rounded-full bg-[#CFE5FF] opacity-60 blur-2xl" />
              <div className="absolute -left-2 top-1 h-16 w-16 -rotate-[10deg] rounded-2xl bg-white shadow-md ring-1 ring-[#CFE5FF]" />
              <span className="absolute -right-1 top-3 h-3 w-3 rounded-full bg-primary-blue/30" />
              <span className="absolute -right-4 top-0 h-6 w-6 rounded-full border-2 border-primary-blue/20" />
              <div className="relative flex h-24 w-24 items-center justify-center gap-1.5 rounded-[28px] bg-[linear-gradient(135deg,#4FA8FF_0%,#2878F0_100%)] shadow-lg">
                <span className="h-2.5 w-2.5 rounded-full bg-white" />
                <span className="h-2.5 w-2.5 rounded-full bg-white" />
                <span className="h-2.5 w-2.5 rounded-full bg-white" />
              </div>
            </div>

            <h3 className="mt-6 text-center text-[24px] font-extrabold text-[#0B1F3A] md:text-[26px]">
              채팅 문의
            </h3>
            <p className="mt-2 text-center text-[15px] leading-[1.65] text-[#526079] md:text-base">
              &ldquo;저도 될까요?&rdquo;
              <br />
              <span
                className={`mt-1 inline-block rounded-[5px] px-1.5 py-0.5 font-extrabold ${blue.highlightBg} ${blue.highlightText}`}
              >
                한 마디면
              </span>{" "}
              충분해요.
            </p>

            <InfoBox theme={blue} icon={<MessageCircle className="h-4 w-4" strokeWidth={2.4} />}>
              카카오톡으로 편하게
              <br />
              문의해 주세요.
            </InfoBox>
          </div>

          <ArrowConnector color="text-primary-blue" />

          {/* Step 2: 한도 조회 */}
          <div
            className={`relative flex flex-col rounded-[30px] border-2 bg-white/[0.82] px-7 pb-6 pt-[74px] backdrop-blur-md transition-all duration-250 hover:-translate-y-[5px] lg:min-h-[500px] ${purple.cardBorder} ${purple.cardGlow}`}
          >
            <StepNumber theme={purple} number={2} />

            <div className="relative mx-auto flex h-[130px] w-[130px] items-center justify-center">
              <div className="absolute inset-0 m-auto h-[160px] w-[160px] rounded-full bg-[#E4D9FF] opacity-60 blur-2xl" />
              <div className="absolute -left-3 top-2 flex h-20 w-16 -rotate-[8deg] flex-col justify-center gap-1.5 rounded-xl bg-white p-3 shadow-md ring-1 ring-[#E4D9FF]">
                <span className="h-1.5 w-full rounded bg-[#E1D8FB]" />
                <span className="h-1.5 w-3/4 rounded bg-[#E1D8FB]" />
                <span className="h-1.5 w-full rounded bg-[#E1D8FB]" />
              </div>
              <div className="absolute -bottom-1 -right-2 flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#B48CFF_0%,#7539E8_100%)] shadow-lg">
                <Search className="h-7 w-7 text-white" strokeWidth={2.4} />
              </div>
            </div>

            <h3 className="mt-6 text-center text-[24px] font-extrabold text-[#0B1F3A] md:text-[26px]">
              한도 조회
            </h3>
            <p className="mt-2 text-center text-[15px] leading-[1.65] text-[#526079] md:text-base">
              상담사가 조회한
              <br />
              <span
                className={`mt-1 inline-block rounded-[5px] px-1.5 py-0.5 font-extrabold ${purple.highlightBg} ${purple.highlightText}`}
              >
                나만의 최적 한도
              </span>{" "}
              확인
            </p>

            <InfoBox theme={purple} icon={<BarChart3 className="h-4 w-4" strokeWidth={2.4} />}>
              개인별 상황에 맞는
              <br />
              정확한 한도를 바로 확인해요.
            </InfoBox>
          </div>

          <ArrowConnector color="text-[#7539E8]" />

          {/* Step 3: 즉시 입금 */}
          <div
            className={`relative flex flex-col rounded-[30px] border-2 bg-white/[0.82] px-7 pb-6 pt-[74px] backdrop-blur-md transition-all duration-250 hover:-translate-y-[5px] lg:min-h-[500px] ${yellow.cardBorder} ${yellow.cardGlow}`}
          >
            <StepNumber theme={yellow} number={3} />

            <div className="relative mx-auto flex h-[130px] w-[145px] items-center justify-center">
              <div className="absolute inset-0 m-auto h-[160px] w-[160px] rounded-full bg-[#FFF0C2] opacity-60 blur-2xl" />
              <div className="absolute -left-1 top-2 flex h-10 w-10 -rotate-[12deg] items-center justify-center rounded-full bg-[linear-gradient(135deg,#FFE29A_0%,#FFC400_100%)] shadow-md ring-1 ring-white">
                <span className="text-[13px] font-extrabold text-white">₩</span>
              </div>
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[linear-gradient(135deg,#FFD35C_0%,#FF9F1C_100%)] shadow-lg ring-4 ring-white/60">
                <span className="text-[34px] font-black text-white">₩</span>
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#16A34A] text-white shadow-md ring-2 ring-white">
                <Check className="h-5 w-5" strokeWidth={3} />
              </div>
            </div>

            <h3 className="mt-6 text-center text-[24px] font-extrabold text-[#0B1F3A] md:text-[26px]">
              즉시 입금
            </h3>
            <p className="mt-2 text-center text-[15px] leading-[1.65] text-[#526079] md:text-base">
              계좌 알려주시면
              <br />
              <span
                className={`mt-1 inline-block rounded-[5px] px-1.5 py-0.5 font-extrabold ${yellow.highlightBg} ${yellow.highlightText}`}
              >
                3분 안에 &ldquo;똑똑&rdquo; 입금돼요.
              </span>
            </p>

            <InfoBox theme={yellow} icon={<Zap className="h-4 w-4" strokeWidth={2.4} />}>
              확인 후 바로 입금까지
              <br />
              빠르게 진행해요.
            </InfoBox>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-2 md:mt-16">
          <p
            className="-rotate-3 text-[26px] italic text-[#5CA0FF] md:text-[32px]"
            style={{ fontWeight: 500 }}
          >
            지금, 간편하게 시작하세요!
          </p>
          <svg
            aria-hidden="true"
            width="220"
            height="18"
            viewBox="0 0 220 18"
            fill="none"
            className="-mt-1"
          >
            <path
              d="M4 12 Q60 -4 110 8 T216 6"
              stroke="#5CA0FF"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

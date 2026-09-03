import { ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

const steps = [
  {
    number: "1",
    title: "상담 신청",
    description: "카카오톡 또는 전화로 상담을 신청합니다.",
  },
  {
    number: "2",
    title: "조건 확인",
    description: "이용 가능 조건을 확인하고 안내합니다.",
  },
  {
    number: "3",
    title: "상담 완료",
    description: "안내된 절차에 따라 상담을 완료합니다.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-section-1 py-20 md:py-28">
      <Container className="flex flex-col items-center gap-14">
        <SectionTitle eyebrow="이용방법" title="간단한 3단계로 빠른 상담" />

        <div className="flex w-full flex-col items-center gap-4 md:flex-row md:items-stretch md:gap-5">
          {steps.map((step, index) => (
            <div key={step.number} className="flex w-full items-stretch gap-4 md:contents">
              <div className="relative flex w-full flex-1 flex-col gap-4 rounded-[22px] border border-card-border bg-white p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-blue text-base font-extrabold text-white">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-text">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-gray-text">
                    {step.description}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 ? (
                <div className="hidden shrink-0 items-center justify-center text-border md:flex">
                  <ArrowRight className="h-6 w-6" strokeWidth={2.2} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

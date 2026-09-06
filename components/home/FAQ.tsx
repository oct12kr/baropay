"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import KakaoButton from "@/components/common/KakaoButton";
import { faqs } from "@/data/faq";

interface FaqCardProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqCard({ question, answer, isOpen, onToggle }: FaqCardProps) {
  return (
    <div
      className={`rounded-[18px] border bg-white shadow-[0_2px_10px_rgba(16,24,40,0.04)] transition-colors duration-250 ${
        isOpen ? "border-primary-blue/50 bg-section-1" : "border-border"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 px-6 py-5 text-left"
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[15px] font-extrabold transition-colors duration-250 ${
            isOpen ? "bg-primary-blue text-white" : "bg-[#EAF4FF] text-primary-blue"
          }`}
        >
          Q
        </span>
        <span
          className={`flex-1 text-[16px] font-bold leading-snug md:text-[17px] ${
            isOpen ? "text-primary-blue" : "text-text"
          }`}
        >
          {question}
        </span>
        <Plus
          className={`h-5 w-5 shrink-0 text-gray-text transition-transform duration-250 ${
            isOpen ? "rotate-45 text-primary-blue" : ""
          }`}
          strokeWidth={2.4}
        />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-6 border-t border-primary-blue/15 pt-4" />
          <p className="px-6 pb-6 text-[14px] leading-[1.75] text-gray-text md:text-[15px]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]));

  const toggle = (index: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const indexed = faqs.map((faq, index) => ({ faq, index }));
  const leftColumn = indexed.filter((_, i) => i % 2 === 0);
  const rightColumn = indexed.filter((_, i) => i % 2 === 1);

  return (
    <section
      id="faq"
      className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F6FAFF_100%)] py-20 md:py-28"
    >
      <Container className="flex flex-col items-center gap-14">
        <SectionTitle
          eyebrow="자주 묻는 질문"
          title="궁금한 점을 확인하세요"
          description="바로페이 이용 전 궁금한 내용을 빠르게 확인해보세요."
        />

        {/* Mobile: single column, sequential order 1-20 */}
        <div className="flex w-full flex-col gap-4 lg:hidden">
          {indexed.map(({ faq, index }) => (
            <FaqCard
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openSet.has(index)}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>

        {/* Desktop: two independent columns so an open card never stretches its row partner */}
        <div className="hidden w-full lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-5">
          <div className="flex flex-col gap-4">
            {leftColumn.map(({ faq, index }) => (
              <FaqCard
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openSet.has(index)}
                onToggle={() => toggle(index)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {rightColumn.map(({ faq, index }) => (
              <FaqCard
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openSet.has(index)}
                onToggle={() => toggle(index)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 pt-2 text-center">
          <p className="text-lg font-extrabold text-text md:text-xl">
            찾으시는 답변이 없으신가요?
          </p>
          <p className="text-sm text-gray-text md:text-base">
            궁금한 내용은 바로페이 상담을 통해 확인해보세요.
          </p>
          <KakaoButton />
        </div>
      </Container>
    </section>
  );
}

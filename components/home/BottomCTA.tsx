import { MessageCircle } from "lucide-react";
import Container from "@/components/common/Container";
import KakaoButton from "@/components/common/KakaoButton";
import PhoneButton from "@/components/common/PhoneButton";

export default function BottomCTA() {
  return (
    <section className="bg-white px-5 py-16 md:px-6 lg:px-8">
      <Container>
        <div className="flex flex-col items-center gap-8 rounded-[24px] bg-gradient-to-r from-light-blue to-section-1 p-10 text-center md:flex-row md:justify-between md:p-14 md:text-left">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-primary-blue shadow-sm">
              <MessageCircle className="h-7 w-7" strokeWidth={2} />
            </span>
            <p className="text-2xl font-extrabold leading-snug text-text md:text-[28px]">
              지금 바로 상담받고
              <br />
              빠르게 안내받으세요!
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <KakaoButton />
            <PhoneButton />
          </div>
        </div>
      </Container>
    </section>
  );
}

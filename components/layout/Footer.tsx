import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import { siteConfig } from "@/config/site";

const serviceLinks = [
  { label: "소액결제 상담", href: "#services" },
  { label: "정보이용료 상담", href: "#services" },
  { label: "이용방법", href: "#process" },
];

const supportLinks = [
  { label: "자주묻는질문", href: "#faq" },
  { label: "이용후기", href: "#reviews" },
  { label: "고객센터", href: "#footer" },
  { label: "공지사항", href: "#" },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#061b36] text-white/70">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8">
        <div className="flex flex-col gap-4">
          <Logo variant="light" />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            24시간 빠르고 안전한 상담 서비스
            <br />
            바로페이가 함께합니다.
          </p>
          <div className="mt-2 flex gap-3 text-xs text-white/50">
            <a href="#" className="hover:text-white">
              이용약관
            </a>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-white">
              개인정보처리방침
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">서비스 안내</h3>
          <ul className="flex flex-col gap-3 text-sm text-white/60">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <h3 className="mb-4 mt-8 text-sm font-bold text-white">고객지원</h3>
          <ul className="flex flex-col gap-3 text-sm text-white/60">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">상담 문의</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-white/60">
            <li>카카오톡: {siteConfig.name}</li>
            <li>전화: {siteConfig.phoneDisplay}</li>
            <li>24시간 상담 가능</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container>
          <p className="text-xs text-white/40">
            © 2026 {siteConfig.nameEn}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}

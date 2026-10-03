"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import KakaoButton from "@/components/common/KakaoButton";
import PhoneButton from "@/components/common/PhoneButton";
import { siteConfig } from "@/config/site";
import { navigation } from "@/data/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 shadow-[0_2px_16px_rgba(7,30,61,0.08)] backdrop-blur-md"
          : "bg-white"
      }`}
    >
      <Container className="flex h-[68px] items-center justify-between md:h-[76px]">
        <Link href="/#top" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="whitespace-nowrap text-[15px] font-medium text-text/80 transition-colors hover:text-primary-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-stretch overflow-hidden whitespace-nowrap rounded-xl bg-kakao text-sm font-bold text-kakao-text transition-transform duration-200 hover:-translate-y-0.5 lg:flex">
          <a
            href={siteConfig.kakaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2.5 pl-4 pr-3 hover:bg-black/5 xl:pl-5 xl:pr-4"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={2.4} />
            카카오톡 상담하기
          </a>
          <span aria-hidden="true" className="my-2 w-px bg-kakao-text/20" />
          <a
            href={siteConfig.phoneHref}
            aria-label={`전화 상담 ${siteConfig.phoneDisplay}`}
            className="inline-flex items-center gap-1.5 py-2.5 pl-3 pr-4 tracking-tight xl:pl-4 xl:pr-5 hover:bg-black/5"
          >
            <Phone className="h-4 w-4" strokeWidth={2.4} />
            {siteConfig.phoneDisplay}
          </a>
        </div>

        <button
          type="button"
          aria-label="메뉴 열기"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {menuOpen ? (
        <div className="border-t border-border bg-white px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-[15px] font-medium text-text/85 transition-colors hover:bg-section-1 hover:text-primary-blue"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <KakaoButton full className="mt-4" />
          <PhoneButton full className="mt-2" />
        </div>
      ) : null}
    </header>
  );
}

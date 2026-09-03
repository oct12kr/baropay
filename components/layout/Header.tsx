"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import KakaoButton from "@/components/common/KakaoButton";
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
        <a href="#top" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[15px] font-medium text-text/80 transition-colors hover:text-primary-blue"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <KakaoButton className="px-5 py-2.5 text-sm" />
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
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-[15px] font-medium text-text/85 transition-colors hover:bg-section-1 hover:text-primary-blue"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <KakaoButton full className="mt-4" />
        </div>
      ) : null}
    </header>
  );
}

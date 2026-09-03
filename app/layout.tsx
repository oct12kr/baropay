import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import FloatingKakao from "@/components/common/FloatingKakao";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} | 빠른 상담 서비스`,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: `${siteConfig.name} | 빠른 상담 서비스`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-text">
        {children}
        <FloatingKakao />
      </body>
    </html>
  );
}

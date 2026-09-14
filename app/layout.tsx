import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import FloatingKakao from "@/components/common/FloatingKakao";

// Sitewide defaults only. Each route (home, /blog, /blog/[slug]) defines its
// own full title/description/canonical/Open Graph via lib/seo.ts, since
// Next.js does not deep-merge nested metadata fields across segments.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} | 빠른 상담 서비스`,
  description: siteConfig.description,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        {/* Font CSS lives behind a cross-origin request, so preconnect early;
            a <link rel="stylesheet"> (vs. the CSS @import this replaces) is
            discovered by the browser's preload scanner immediately instead of
            only after the bundled stylesheet itself has been fetched and parsed. */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body className="flex min-h-full flex-col bg-white text-text">
        {children}
        <FloatingKakao />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import PayoutComparison from "@/components/home/PayoutComparison";
import Process from "@/components/home/Process";
import Reviews from "@/components/home/Reviews";
import WhyBaropay from "@/components/home/WhyBaropay";
import FAQ from "@/components/home/FAQ";
import BottomCTA from "@/components/home/BottomCTA";
import { siteConfig } from "@/config/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const HOME_TITLE = "소액결제 한도 및 이용방법 안내 | 바로페이";

export const metadata: Metadata = buildMetadata({
  title: HOME_TITLE,
  description: siteConfig.description,
  path: "/",
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl("/apple-touch-icon.png"),
  telephone: siteConfig.phoneDisplay,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <PayoutComparison />
        <Process />
        <Reviews />
        <WhyBaropay />
        <FAQ />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}

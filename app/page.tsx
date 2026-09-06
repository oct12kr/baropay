import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import PayoutComparison from "@/components/home/PayoutComparison";
import Process from "@/components/home/Process";
import Reviews from "@/components/home/Reviews";
import WhyBaropay from "@/components/home/WhyBaropay";
import FAQ from "@/components/home/FAQ";
import LatestBlog from "@/components/home/LatestBlog";
import BottomCTA from "@/components/home/BottomCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <PayoutComparison />
        <Process />
        <Reviews />
        <WhyBaropay />
        <FAQ />
        <LatestBlog />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}

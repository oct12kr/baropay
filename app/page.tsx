import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import Reviews from "@/components/home/Reviews";
import WhyBaropay from "@/components/home/WhyBaropay";
import FAQ from "@/components/home/FAQ";
import BottomCTA from "@/components/home/BottomCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
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

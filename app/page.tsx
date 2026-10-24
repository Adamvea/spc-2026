import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HowItWorks from "@/components/sections/HowItWorks";
import Judges from "@/components/sections/Judges";
import Awards from "@/components/sections/Awards";
import Club from "@/components/sections/Club";
import Founder from "@/components/sections/Founder";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Judges />
        <Awards />
        <Club />
        <Founder />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

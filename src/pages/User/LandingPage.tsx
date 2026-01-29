import Footer from "./components/Footer";
import { Header } from "./components/Header";
import HeroSection from "./components/HomeComponents/HeroSection";
import TravelerPartnerHero from "./components/HomeComponents/TravelerPartnerHero";

export default function LandingPage() {
  return (
    <>
      <Header isLoggedIn={false} />

      {/* Core user value */}
      <HeroSection />

      {/* Divider */}
      {/* <section className="bg-gray-50 py-6 text-center text-sm text-gray-500">
        Trusted by logistics partners across India
      </section> */}

      {/* Agency / Partner onboarding */}
      <TravelerPartnerHero />

      <Footer />
    </>
  );
}

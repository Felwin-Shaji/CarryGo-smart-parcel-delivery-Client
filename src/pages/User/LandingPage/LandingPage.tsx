import Footer from "../components/Footer";
import { Header } from "../components/Header";
import AccessPortalPage from "./components/AccessPortalPage";
import FeaturesSection from "./components/FeaturesSection";
import HeroSection from "./components/HeroSection";

export default function LandingPage() {
  return (
    <>
      <Header isLoggedIn={false} />

      <HeroSection />

      <FeaturesSection />

      <AccessPortalPage />

      <Footer />
    </>
  );
}

import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import CTASection from "./Components/CTA/CTASection";
import HeroSection from "./Components/Hero/HeroSection";
import HowItWorksSection from "./Components/HowItWorks/HowItWorksSection";
import ServicesSection from "./Components/Services/ServicesSection";


export default function Home() {

  const user = useSelector((state: RootState) => state.userState.user);
  const isLoggedIn = !!user;

  return (
    <div >

      <Header isLoggedIn={isLoggedIn} />

      <HeroSection isLoggedIn={isLoggedIn} />
      <ServicesSection isLoggedIn={isLoggedIn} />
      <HowItWorksSection />
      <CTASection isLoggedIn={isLoggedIn} />

      <Footer />
    </div>
  );
}




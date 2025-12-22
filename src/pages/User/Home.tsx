import Footer from "./components/Footer";
import { Header } from "./components/Header";
import HeroSection from "./components/HomeComponents/HeroSection";
import TravelerPartnerHero from "./components/HomeComponents/TravelerPartnerHero";


export default function Home() {

  return (
    <div >

      <Header isLoggedIn={true} />
      <HeroSection isLoggedIn={true} />
      <TravelerPartnerHero isLoggedIn={true}/>
      <Footer />
    </div>
  );
}




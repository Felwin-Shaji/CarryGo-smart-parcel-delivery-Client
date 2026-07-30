import { Header } from '../components/Header'
import Footer from '../components/Footer'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import WhyChooseUsSection from './components/WhyChooseUsSection'

const Services = () => {
    return (
        <>
            <Header isLoggedIn={true} />
            
            <HeroSection/>
            <ServicesSection />
            <WhyChooseUsSection />

            <Footer />
        </>
    )
}

export default Services
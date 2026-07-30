import { Header } from '../components/Header'
import Footer from '../components/Footer'
import HeroSection from './components/HeroSection'
import ContactSection from './components/ContactSection'

const Contact = () => {
    return (
        <>
            <Header isLoggedIn={true} />
            <HeroSection />
            <ContactSection />
            <Footer />
        </>
    )
}

export default Contact
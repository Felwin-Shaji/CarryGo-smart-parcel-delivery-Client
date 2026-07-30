import Footer from '../components/Footer'
import { Header } from '../components/Header'
import CTASection from './components/CTASection'
import FeaturesSection from './components/FeaturesSection'
import HeroSection from './components/HeroSection'
import OverviewSection from './components/OverviewSection'
import TechStackSection from './components/TechStackSection'
import WhyCarryGoSection from './components/WhyCarryGoSection'
import WorkflowSection from './components/WorkflowSection'

export const About = () => {
    return (
        <>
            <Header isLoggedIn={true} />

            <HeroSection />
            <OverviewSection />
            <FeaturesSection />
            <TechStackSection />
            <WorkflowSection />
            <WhyCarryGoSection />
            <CTASection />
            <Footer />
        </>
    )
}

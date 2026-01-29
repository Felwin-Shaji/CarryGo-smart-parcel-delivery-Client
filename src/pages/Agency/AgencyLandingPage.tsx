import AgencyBenefits from "./components/AgencyLandingComponents/AgencyBenefits"
import AgencyCTA from "./components/AgencyLandingComponents/AgencyCTA"
import AgencyFooter from "./components/AgencyLandingComponents/AgencyFooter"
import AgencyHeader from "./components/AgencyLandingComponents/AgencyHeader"
import AgencyHero from "./components/AgencyLandingComponents/AgencyHero"

const AgencyLandingPage = () => {
    return (
        <>
            <AgencyHeader />
            <AgencyHero />
            <AgencyBenefits />
            <AgencyCTA/>
            <AgencyFooter/>
        </>
    )
}

export default AgencyLandingPage
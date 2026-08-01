import AgencyAccessPortals from "./Components/AgencyAccessPortals"
import AgencyBenefits from "./Components/AgencyBenefits"
import AgencyCTA from "./Components/AgencyCTA"
import AgencyFAQ from "./Components/AgencyFAQ"
import AgencyFooter from "./Components/AgencyFooter"
import AgencyHeader from "./Components/AgencyHeader"
import AgencyHero from "./Components/AgencyHero"
import AgencyHowItWorks from "./Components/AgencyHowItWorks"
import AgencyOverview from "./Components/AgencyOverview"

const AgencyLandingPage = () => {
    return (
        <>
            <AgencyHeader />

            <main>

                <AgencyHero />
                <AgencyOverview />
                <AgencyBenefits />
                <AgencyHowItWorks />

                <AgencyFAQ />
                <AgencyAccessPortals />
                <AgencyCTA />
            </main>
                <AgencyFooter />
        </>
    )
}

export default AgencyLandingPage
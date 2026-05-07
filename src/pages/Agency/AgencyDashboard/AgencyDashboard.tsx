import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { DashboardProvider } from "../../../context/DashboardProvider";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import KYCRegistrationForm from "../components/KYCRegistrationForm";
import KYCWaiting from "../components/KYCWaiting";
import KYCRejected from "../components/KYCRejected";
import { KYCSTATUS, ROLES } from "../../../shared/constants_Types/types/roles";
import AgencyDashboardPage from "./Components/AgencyDashboardPage";



const AgencyDashboard = () => {
    const { agency } = useSelector((state: RootState) => state.agencyState);
    console.log(agency?.kycStatus);

    const renderContent = () => {
        switch (agency?.kycStatus) {
            case KYCSTATUS.PENDING:
                return <KYCRegistrationForm />;

            case KYCSTATUS.REGISTERED:
                return <KYCWaiting />;

            case KYCSTATUS.RESUBMITTED:
                return <KYCWaiting />;

            case KYCSTATUS.REJECTED:
                return <KYCRejected />;

            case KYCSTATUS.APPROVED:
                return <AgencyDashboardPage />;
        }
    };

    return (
        <DashboardProvider role={ROLES.AGENCY}>
            <DashboardLayout>
                {renderContent()}
            </DashboardLayout>
        </DashboardProvider>
    );

};

export default AgencyDashboard;

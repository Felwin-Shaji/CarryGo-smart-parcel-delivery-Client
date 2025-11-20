import { DashboardLayout } from "../../layouts/DashboardLayout";
import { DashboardProvider } from "../../context/DashboardProvider";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import KYCRegistrationForm from "./components/KYCRegistrationForm";
import KYCWaiting from "./components/KYCWaiting";
import KYCRejected from "./components/KYCRejected";
import DashboardContents from "./components/DashboardContents";
import { KYCSTATUS, ROLES } from "../../constants/types/roles";


const AgencyDashboard = () => {
    const { agency } = useSelector((state: RootState) => state.agencyState);
    console.log(agency?.kycStatus);

    const renderContent = () => {
        switch (agency?.kycStatus) {
            case KYCSTATUS.PENDING:
                return <KYCRegistrationForm />;

            case KYCSTATUS.REGISTERED:
                return <KYCWaiting />;

            case KYCSTATUS.REJECTED:
                return <KYCRejected />;

            case KYCSTATUS.APPROVED:
                return <DashboardContents/>;
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

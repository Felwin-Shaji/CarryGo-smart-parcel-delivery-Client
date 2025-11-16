import { DashboardLayout } from "../../layouts/DashboardLayout";
import { DashboardProvider } from "../../context/DashboardProvider";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { KYCSTATUS } from "../../types/roles";
import KYCRegistrationForm from "./components/KYCRegistrationForm";
import KYCWaiting from "./components/KYCWaiting";
import KYCRejected from "./components/KYCRejected";


const AgencyDashboard = () => {
    const { agency } = useSelector((state: RootState) => state.agencyState);
    console.log(agency?.kycStatus);


    return (
        <DashboardProvider role="agency">

            {agency?.kycStatus === KYCSTATUS.PENDING && (
                <DashboardLayout>
                    <KYCRegistrationForm />
                </DashboardLayout>
            )}

            {agency?.kycStatus === KYCSTATUS.REGISTERED && (
                <DashboardLayout>
                    <KYCWaiting />
                </DashboardLayout>
            )}

            {agency?.kycStatus === KYCSTATUS.REJECTED && (
                <DashboardLayout>
                    <KYCRejected />
                </DashboardLayout>

            )}

            {agency?.kycStatus === KYCSTATUS.APPROVED && (
                <DashboardLayout>
                    <h1>This is agency dashboard</h1>
                </DashboardLayout>
            )}
        </DashboardProvider>
    );
};

export default AgencyDashboard;

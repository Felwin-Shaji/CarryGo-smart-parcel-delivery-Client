import { useSelector } from "react-redux";
import { KYCSTATUS, ROLES } from "../../shared/constants_Types/types/roles"
import { DashboardProvider } from "../../context/DashboardProvider"
import { DashboardLayout } from "../../layouts/DashboardLayout"
import type { RootState } from "../../store/store";
import HubKYCWaiting from "./components/HubDashboard/KYCWaiting";
import HubKYCRejected from "./components/HubDashboard/HubKYCRejected";
import HubDashboardContents from "./components/HubDashboard/HubDashboardView";

const HubDashboard = () => {
  const { hub } = useSelector((state: RootState) => state.hubState);

  const renderContent = () => {
    switch (hub?.kycStatus) {
      case KYCSTATUS.PENDING:
        return <HubKYCWaiting />
      case KYCSTATUS.REGISTERED:
        return <HubKYCWaiting />;

      case KYCSTATUS.RESUBMITTED:
        return <HubKYCWaiting />;

      case KYCSTATUS.REJECTED:
        return <HubKYCRejected />;

      case KYCSTATUS.APPROVED:
        return <HubDashboardContents role={ROLES.HUB} />;
    }
  }


  return (
    <>
      <DashboardProvider role={ROLES.HUB}>
        <DashboardLayout>
          {/* <h1>Hub Dashboard</h1> */}
          {renderContent()}
        </DashboardLayout>
      </DashboardProvider>
    </>
  )
}

export default HubDashboard
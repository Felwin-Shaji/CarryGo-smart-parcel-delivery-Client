import { ROLES } from "../../constants_Types/types/roles"
import { DashboardProvider } from "../../context/DashboardProvider"
import { DashboardLayout } from "../../layouts/DashboardLayout"

const AgencyHubsList = () => {
  return (
    <>
    <DashboardProvider role={ROLES.AGENCY}>
      <DashboardLayout>
        <h1>
          Hub List page
        </h1>
      </DashboardLayout>
      </DashboardProvider></>
  )
}

export default AgencyHubsList
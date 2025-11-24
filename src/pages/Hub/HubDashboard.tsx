import { ROLES } from "../../constants_Types/types/roles"
import { DashboardProvider } from "../../context/DashboardProvider"
import { DashboardLayout } from "../../layouts/DashboardLayout"

const HubDashboard = () => {
  return (
    <>
        <DashboardProvider role={ROLES.HUB}>
            <DashboardLayout>
                <h1>Hub Dashboard</h1>
            </DashboardLayout>
        </DashboardProvider>
    </>
  )
}

export default HubDashboard
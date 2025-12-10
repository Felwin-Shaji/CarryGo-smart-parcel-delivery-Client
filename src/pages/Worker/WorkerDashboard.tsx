import { ROLES } from "../../constants_Types/types/roles"
import { DashboardProvider } from "../../context/DashboardProvider"
import { DashboardLayout } from "../../layouts/DashboardLayout"

const WorkerDashboard = () => {
    return (
        <DashboardProvider role={ROLES.WORKER}>
            <DashboardLayout>
                <h1>Worker Dashboard</h1>
            </DashboardLayout>
        </DashboardProvider>
    )
}

export default WorkerDashboard 
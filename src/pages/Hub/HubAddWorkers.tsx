import { ROLES } from "../../constants_Types/types/roles"
import { DashboardProvider } from "../../context/DashboardProvider"
import { DashboardLayout } from "../../layouts/DashboardLayout"

const HubAddWorkers = () => {
    return (
        <>
            <DashboardProvider role={ROLES.HUB}>
                <DashboardLayout>
                        <h1>addworkers</h1>
                </DashboardLayout>
            </DashboardProvider>

        </>
    )
}

export default HubAddWorkers
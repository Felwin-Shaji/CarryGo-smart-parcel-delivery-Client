import { Route, Routes } from "react-router-dom"
import HubLogin from "../pages/Hub/HubLogin"
import PublicRoute from "./PublicRoute"
import ProtectedRoute from "./ProtectedRoute"
import { ROLES } from "../shared/constants_Types/types/roles"
import HubDashboard from "../pages/Hub/HubDashboard"
import HubForgotPassword from "../pages/Hub/HubForgotPassword"
import PageNotFound from "../pages/PageNotFound"
import HubResetPassword from "../pages/Hub/HubResetPassword"
import HubAddWorker from "../pages/Hub/HubAddWorkers"
import HubWallet from "../pages/Hub/HubWallet"
import HubWorkersListPage from "../pages/Hub/HubWorkersListPage"
import HubWorkerDetailsPage from "../pages/Hub/HubWorkerDetailsPage"
import WorkerKycResubmit from "../components/Workers/components/WorkerKycResubmit"
import { ShipmentManagementPage } from "../pages/Hub/ShipmentManagement/ShipmentManagementPage"
import ShipmentDetailsPage from "../pages/Hub/ShipmentDetails/ShipmentDetailsPage"
import HubProfilePage from "../pages/Hub/Profile/HubProfilePage"

const HubRoutes = () => {
    return (
        <>
            <title>CarryGo Hub</title>
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path="login" element={<HubLogin />} />
                    <Route path="forgot-password" element={<HubForgotPassword />} />
                    <Route path="reset-password/:token" element={<HubResetPassword />} />
        
                </Route>

                <Route path="dashboard" element={<ProtectedRoute requiredRole={ROLES.HUB}><HubDashboard /></ProtectedRoute>} />
                <Route path="workers/add" element={<ProtectedRoute requiredRole={ROLES.HUB}><HubAddWorker /></ProtectedRoute>} />
                <Route path="wallet" element={<ProtectedRoute requiredRole={ROLES.HUB}><HubWallet /></ProtectedRoute>} />
                <Route path="workers" element={<ProtectedRoute requiredRole={ROLES.HUB}><HubWorkersListPage /></ProtectedRoute>} />
                <Route path="workers/:id" element={<ProtectedRoute requiredRole={ROLES.HUB}><HubWorkerDetailsPage /></ProtectedRoute>} />
                <Route path="workers/kyc/resubmit/:id" element={<ProtectedRoute requiredRole={ROLES.HUB}><WorkerKycResubmit /></ProtectedRoute>} />
                <Route path="profile" element={<ProtectedRoute requiredRole={ROLES.HUB}><HubProfilePage /></ProtectedRoute>} />
                
                <Route path="shipments" element={<ProtectedRoute requiredRole={ROLES.HUB}><ShipmentManagementPage /></ProtectedRoute>} />
                <Route path="shipments/:shipmentId" element={<ProtectedRoute requiredRole={ROLES.HUB}><ShipmentDetailsPage /></ProtectedRoute>} />


                <Route path="*" element={<PageNotFound />} />
            </Routes>

        </>
    )
}

export default HubRoutes
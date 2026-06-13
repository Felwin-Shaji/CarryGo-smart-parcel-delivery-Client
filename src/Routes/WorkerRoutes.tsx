import { Route, Routes } from "react-router-dom";
import { ROLES } from "../shared/constants_Types/types/roles";
import PublicRoute from "./PublicRoute";
import WorkerLogin from "../pages/Worker/WorkerLogin";
import PageNotFound from "../pages/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";
import WorkerDashboard from "../pages/Worker/WorkerDashboard";
import WorkerForgotPassword from "../pages/Worker/WorkerForgotPassword";
import WrokerResetPassword from "../pages/Worker/WrokerResetPassword";
import WorkerWallet from "../pages/Worker/WorkerWallet";
import WorkerShipmentPage from "../pages/Worker/WorkerShipment/WorkerShipmentPagee";
import WorkerShipmentDetailsPage from "../pages/Worker/WorkerShipmentDetails/WorkerShipmentDetailsPage";
import WorkerProfilePage from "../pages/Worker/WorkerProfilePage";
// import { WorkerShipmentDetailsPage } from "../pages/Worker/WorkerShipmentDetails/WorkerShipmentDetailsPage";



const WorkerRoutes = () => {
    return (
        <>
            <title>Worker</title>
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path="login" element={<WorkerLogin />} />
                    <Route path="forgot-password" element={<WorkerForgotPassword />} />
                    <Route path="reset-password/:token" element={<WrokerResetPassword />} />

                </Route>

                <Route path="dashboard" element={<ProtectedRoute requiredRole={ROLES.WORKER}><WorkerDashboard /></ProtectedRoute>} />
                <Route path="wallet" element={<ProtectedRoute requiredRole={ROLES.WORKER}><WorkerWallet /></ProtectedRoute>} />
                <Route path="shipments" element={<ProtectedRoute requiredRole={ROLES.WORKER}><WorkerShipmentPage /></ProtectedRoute>} />
                <Route path="shipments/:id" element={<ProtectedRoute requiredRole={ROLES.WORKER}><WorkerShipmentDetailsPage /></ProtectedRoute>} />
                <Route path="profile" element={<ProtectedRoute requiredRole={ROLES.WORKER}><WorkerProfilePage /></ProtectedRoute>} />

                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </>
    )
}

export default WorkerRoutes
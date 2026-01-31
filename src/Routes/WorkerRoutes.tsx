import { Route, Routes } from "react-router-dom";
import { ROLES } from "../constants_Types/types/roles";
import { useAuthRehydration } from "../hooks/useAuthRehydration";
import PublicRoute from "./PublicRoute";
import WorkerLogin from "../pages/Worker/WorkerLogin";
import ProtectedRoute from "./ProtectedRoute";
import WorkerDashboard from "../pages/Worker/WorkerDashboard";
import WorkerForgotPassword from "../pages/Worker/WorkerForgotPassword";
import WrokerResetPassword from "../pages/Worker/WrokerResetPassword";



const WorkerRoutes = () => {
      useAuthRehydration(ROLES.AGENCY);
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

            </Routes>
        </>
    )
}

export default WorkerRoutes
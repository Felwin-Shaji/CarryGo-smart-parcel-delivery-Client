import { Route, Routes } from "react-router-dom"
import HubLogin from "../pages/Hub/HubLogin"
import PublicRoute from "./PublicRoute"
import ProtectedRoute from "./ProtectedRoute"
import { ROLES } from "../constants_Types/types/roles"
import { useAuthRehydration } from "../hooks/useAuthRehydration "
import LoadingScreen from "../components/loading/CarryGoLoadingScreen"
import HubDashboard from "../pages/Hub/HubDashboard"
import HubForgotPassword from "../pages/Hub/HubForgotPassword"
import PageNotFound from "../pages/PageNotFound"
import HubResetPassword from "../pages/Hub/HubResetPassword"
import HubAddWorker from "../pages/Hub/HubAddWorkers"


const HubRoutes = () => {
    const loading = useAuthRehydration(ROLES.HUB);
    if (loading) {
        return <LoadingScreen />;
    }
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

                <Route path="*" element={<PageNotFound />} />
            </Routes>

        </>
    )
}

export default HubRoutes
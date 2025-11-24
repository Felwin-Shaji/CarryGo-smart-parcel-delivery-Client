import { Route, Routes } from "react-router-dom"
import HubLogin from "../pages/Hub/HubLogin"
import PublicRoute from "./PublicRoute"
import ProtectedRoute from "./ProtectedRoute"
import { ROLES } from "../constants_Types/types/roles"
import { useAuthRehydration } from "../hooks/useAuthRehydration "
import LoadingScreen from "../components/loading/CarryGoLoadingScreen"
import HubDashboard from "../pages/Hub/HubDashboard"


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
                </Route>
            </Routes>

            <Routes>
                <Route path="dashboard" element={<ProtectedRoute requiredRole={ROLES.HUB}><HubDashboard /></ProtectedRoute>} />
            </Routes>
        </>
    )
}

export default HubRoutes
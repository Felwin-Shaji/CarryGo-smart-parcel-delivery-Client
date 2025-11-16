import { Route, Routes } from "react-router-dom";
import LoadingScreen from "../components/loading/CarryGoLoadingScreen";
import { useAuthRehydration } from "../hooks/useAuthRehydration ";
import { ROLES } from "../types/roles";
import PublicRoute from "./PublicRoute";
import AgencyRegistration from "../pages/Agency/AgencyRegistration";
import ProtectedRoute from "./ProtectedRoute";
import AgencyDashboard from "../pages/Agency/AgencyDashboard";

const AgencyRoutes = ()=>{
      const loading = useAuthRehydration(ROLES.AGENCY);
      if (loading) {
        return <LoadingScreen />;
      }

      return (
        <Routes>
            <Route element={<PublicRoute/>}>
                <Route path="registration" element={<AgencyRegistration />} />
            </Route>

            <Route path="dashboard" element={<ProtectedRoute requiredRole={ROLES.AGENCY}><AgencyDashboard /></ProtectedRoute>} />

        </Routes>
      )
};

export default AgencyRoutes
import { Route, Routes } from "react-router-dom";
import LoadingScreen from "../components/loading/CarryGoLoadingScreen";
import { useAuthRehydration } from "../hooks/useAuthRehydration ";
import PublicRoute from "./PublicRoute";
import AgencyRegistration from "../pages/Agency/AgencyRegistration";
import ProtectedRoute from "./ProtectedRoute";
import AgencyDashboard from "../pages/Agency/AgencyDashboard";
import AgencyLogin from "../pages/Agency/AgencyLogin";
import AgencyAddHubs from "../pages/Agency/AgencyAddHubs";
import { ROLES } from "../constants_Types/types/roles";
import AgencyHubsList from "../pages/Agency/AgencyHubsList";

const AgencyRoutes = () => {
  const loading = useAuthRehydration(ROLES.AGENCY);
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <title>CarryGo-Agency</title>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="registration" element={<AgencyRegistration />} />
          <Route path="login" element={<AgencyLogin />} />
        </Route>

        <Route path="dashboard" element={<ProtectedRoute requiredRole={ROLES.AGENCY}><AgencyDashboard /></ProtectedRoute>} />
        <Route path="hubs" element={<ProtectedRoute requiredRole={ROLES.AGENCY}><AgencyHubsList /></ProtectedRoute>} />
        <Route path="hubs/add" element={<ProtectedRoute requiredRole={ROLES.AGENCY}><AgencyAddHubs /></ProtectedRoute>} />

      </Routes>
    </>
  )
};

export default AgencyRoutes
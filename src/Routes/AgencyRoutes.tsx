import { Route, Routes } from "react-router-dom";
import LoadingScreen from "../components/loading/CarryGoLoadingScreen";
import { useAuthRehydration } from "../hooks/useAuthRehydration";
import PublicRoute from "./PublicRoute";
import AgencyRegistration from "../pages/Agency/AgencyRegistration";
import ProtectedRoute from "./ProtectedRoute";
import AgencyDashboard from "../pages/Agency/AgencyDashboard";
import AgencyOtpVarification from "../pages/Agency/AgencyOtpVarification";
import AgencyLogin from "../pages/Agency/AgencyLogin";
import AgencyAddHubs from "../pages/Agency/AgencyAddHubs";
import { ROLES } from "../constants_Types/types/roles";
import AgencyHubsList from "../pages/Agency/AgencyHubsList";
import PageNotFound from "../pages/PageNotFound";
import AgencyForgotPassword from "../pages/Agency/AgencyForgotPassword";
import AgencyResetPassword from "../pages/Agency/AgencyResetPassword";
import AgencyPricingPage from "../pages/Admin/AgencyPricingPage";
import AgencyProfilePage from "../pages/Agency/AgencyProfilePage";
import AgencyHubDetailsPage from "../pages/Agency/AgencyHubDetailsPage";
import AgencyLandingPage from "../pages/Agency/AgencyLandingPage";

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
          <Route path="" element={<AgencyLandingPage />} />

          <Route path="registration" element={<AgencyRegistration />} />
          <Route path="verify-otp" element={<AgencyOtpVarification />} />

          <Route path="login" element={<AgencyLogin />} />
          <Route path="forgot-password" element={<AgencyForgotPassword />} />
          <Route path="reset-password/:token" element={<AgencyResetPassword />} />
        </Route>

        <Route path="dashboard" element={<ProtectedRoute requiredRole={ROLES.AGENCY}><AgencyDashboard /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute requiredRole={ROLES.AGENCY}><AgencyProfilePage /></ProtectedRoute>} />
    

        <Route path="hubs" element={<ProtectedRoute requiredRole={ROLES.AGENCY}><AgencyHubsList /></ProtectedRoute>} />
        <Route path="hub/:id" element={<ProtectedRoute requiredRole={ROLES.AGENCY}><AgencyHubDetailsPage /></ProtectedRoute>} />
        <Route path="hubs/add" element={<ProtectedRoute requiredRole={ROLES.AGENCY}><AgencyAddHubs /></ProtectedRoute>} />

        <Route path="agency-pricing-policy" element={<ProtectedRoute requiredRole={ROLES.AGENCY}><AgencyPricingPage /></ProtectedRoute>} />

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  )
};

export default AgencyRoutes
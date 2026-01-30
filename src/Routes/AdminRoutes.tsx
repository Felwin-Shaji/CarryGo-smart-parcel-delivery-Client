import { Route, Routes } from "react-router-dom"
import PublicRoute from "./PublicRoute"
import AdminLoginPage from "../pages/Admin/AdminLoginPage"
import ProtectedRoute from "./ProtectedRoute"
import AdminDashboard from "../pages/Admin/AdminDashboard"
import LoadingScreen from "../components/loading/CarryGoLoadingScreen"
import { useAuthRehydration } from "../hooks/useAuthRehydration"
import AdminAgencyList from "../pages/Admin/AdminAgencyList"
import AdminUserList from "../pages/Admin/AdminUserList"
import AdminAgencyDetailsPage from "../pages/Admin/AdminAgencyDetailsPage"
import { ROLES } from "../constants_Types/types/roles"
import PageNotFound from "../pages/PageNotFound"
import AdminForgotPassword from "../pages/Admin/AdminForgotPassword"
import AdminResetPassword from "../pages/Admin/AdminResetPassword"
import AdminPricingPolicy from "../pages/Admin/AdminPricingPolicyPage"
import AdminProfilePage from "../pages/Admin/AdminProfilePage"
import AdminHubDetailsPage from "../pages/Admin/AdminHubDetailsPage"


const AdminRoutes = () => {
  const loading = useAuthRehydration(ROLES.ADMIN);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <title>CarryGo-Admin</title>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="login" element={<AdminLoginPage />} />
          <Route path="forgot-password" element={<AdminForgotPassword />} />
          <Route path="reset-password/:token" element={<AdminResetPassword />} />
        </Route>

        <Route path="dashboard" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminDashboard /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminProfilePage /></ProtectedRoute>} />

        <Route path="agency" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminAgencyList /></ProtectedRoute>} />
        <Route path="agency/:id" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminAgencyDetailsPage /></ProtectedRoute>} />
        <Route path="agency/:agencyId/hubs/:hubId" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminHubDetailsPage /></ProtectedRoute>} />

        <Route path="users" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminUserList /></ProtectedRoute>} />
        <Route path="pricing-policy" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminPricingPolicy /></ProtectedRoute>} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default AdminRoutes
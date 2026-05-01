import { Navigate, Route, Routes } from "react-router-dom"
import PublicRoute from "./PublicRoute"
import AdminLoginPage from "../pages/Admin/AdminLoginPage"
import ProtectedRoute from "./ProtectedRoute"
import AdminDashboard from "../pages/Admin/AdminDashboard"
import AdminAgencyList from "../pages/Admin/AdminAgencyList"
import AdminUserList from "../pages/Admin/AdminUserList"
import AdminAgencyDetailsPage from "../pages/Admin/AdminAgencyDetailsPage"
import { ROLES } from "../shared/constants_Types/types/roles"
import PageNotFound from "../pages/PageNotFound"
import AdminForgotPassword from "../pages/Admin/AdminForgotPassword"
import AdminResetPassword from "../pages/Admin/AdminResetPassword"
import AdminProfilePage from "../pages/Admin/AdminProfilePage"
import AdminHubDetailsPage from "../pages/Admin/AdminHubDetailsPage"
import AdminWallet from "../pages/Admin/AdminWallet"
import AdminUserDetailsPage from "../pages/Admin/AdminUserDetailsPage"
import AdminTravelerPricing from "../pages/Admin/Components/AdminPricing/TravelerPricingForm"
import AdminPricingLayout from "../pages/Admin/AdminPricingLayout"
import AdminAgencyPricing from "../pages/Admin/Components/AdminPricing/AdminPricingPolicyPage"
import AdminHubWorkerDetails from "../pages/Admin/Components/AdminHubDetails/AdminHubWorker/AdminHubWorkerDetails"


const AdminRoutes = () => {

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
        <Route path="agency/hub/worker/:id" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminHubWorkerDetails /></ProtectedRoute>} />           

        <Route path="users" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminUserList /></ProtectedRoute>} />
        <Route path="users/:id" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminUserDetailsPage /></ProtectedRoute>} />

        <Route
          path="pricing-policy"
          element={
            <ProtectedRoute requiredRole={ROLES.ADMIN}>
              <AdminPricingLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="agency" replace />} />
          <Route path="agency" element={<AdminAgencyPricing />} />
          <Route path="traveler" element={<AdminTravelerPricing />} />
        </Route>

        <Route path="wallet" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminWallet /></ProtectedRoute>} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default AdminRoutes
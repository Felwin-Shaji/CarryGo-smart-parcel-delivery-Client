import { Route, Routes } from "react-router-dom"
import PublicRoute from "./PublicRoute"
import AdminLoginPage from "../pages/Admin/AdminLoginPage"
import ProtectedRoute from "./ProtectedRoute"
import AdminDashboard from "../pages/Admin/AdminDashboard"
import { ROLES } from "../types/roles"
import LoadingScreen from "../components/loading/CarryGoLoadingScreen"
import { useAuthRehydration } from "../hooks/useAuthRehydration "
import AdminAgencyList from "../pages/Admin/AdminAgencyList"
import AdminUserList from "../pages/Admin/AdminUserList"
import AdminAgencyDetailsPage from "../pages/Admin/AdminAgencyDetailsPage"

const AdminRoutes = () => {
  const loading = useAuthRehydration(ROLES.ADMIN);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="login" element={<AdminLoginPage />} />
      </Route>

      <Route path="dashboard" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminDashboard /></ProtectedRoute>} />
      <Route path="agency" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminAgencyList /></ProtectedRoute>} />
      <Route path="agency/:id" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminAgencyDetailsPage /></ProtectedRoute>} />

      
      <Route path="users" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminUserList /></ProtectedRoute>} />

    </Routes>
  )
}

export default AdminRoutes
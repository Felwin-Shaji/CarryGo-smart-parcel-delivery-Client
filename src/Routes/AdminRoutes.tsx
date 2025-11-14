import { Route, Routes } from "react-router-dom"
import PublicRoute from "./PublicRoute"
import AdminLoginPage from "../pages/Admin/AdminLoginPage"
import ProtectedRoute from "./ProtectedRoute"
import AdminDashboard from "../pages/Admin/AdminDashboard"
import { ROLES } from "../types/roles"
import LoadingScreen from "../components/loading/CarryGoLoadingScreen"
import { useAuthRehydration } from "../hooks/useAuthRehydration "

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

    </Routes>
  )
}

export default AdminRoutes
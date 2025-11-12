import { Route, Routes } from "react-router-dom"
import PublicRoute from "./PublicRoute"
import AdminLoginPage from "../pages/Admin/AdminLoginPage"
import ProtectedRoute from "./ProtectedRoute"
import AdminDashboard from "../pages/Admin/AdminDashboard"
import { ROLES } from "../types/roles"

const AdminRoutes = () => {
  return (
    <Routes>
        <Route element={<PublicRoute/>}>
            <Route path="login" element={<AdminLoginPage />} />
        </Route>

        <Route path="dashboard" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminDashboard/></ProtectedRoute>} />

    </Routes>
  )
}

export default AdminRoutes
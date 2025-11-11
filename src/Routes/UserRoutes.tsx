import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/User/LoginPage"
import RegistrationPage from "../pages/User/RegistrationPage"
import OtpVarificationpage from "../pages/User/OtpVarificationpage"
import Home from "../pages/User/Home"
import ProtectedRoute from "./ProtectedRoute"
import { ROLES } from "../types/roles"
import PublicRoute from "./PublicRoute"


const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="verify-otp" element={<OtpVarificationpage />} />
      </Route>

      <Route path="" element={<ProtectedRoute requiredRole={ROLES.USER}><Home /></ProtectedRoute>} />
    </Routes>
  )
}

export default UserRoutes
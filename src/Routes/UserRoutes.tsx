import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/User/LoginPage"
import RegistrationPage from "../pages/User/RegistrationPage"
import OtpVarificationpage from "../pages/Auth/OtpVarificationpage"

const UserRoutes = () => {
  return (
    <Routes>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="registration" element={<RegistrationPage/>}/>
        <Route path="varify-otp" element={<OtpVarificationpage/>}/>
    </Routes>
  )
}

export default UserRoutes
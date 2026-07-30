import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/User/LoginPage"
import RegistrationPage from "../pages/User/RegistrationPage"
import OtpVarificationpage from "../pages/User/OtpVarificationpage"
import Home from "../pages/User/Home/Home"
import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute"
import LandingPage from "../pages/User/LandingPage/LandingPage"
import { ROLES } from "../shared/constants_Types/types/roles"
import PageNotFound from "../pages/PageNotFound"
import ForgotPassword from "../pages/User/ForgotPassword"
import ResetPassword from "../pages/User/ResetPassword"
import UserProfile from "../pages/User/UserProfile"
import UserCreateBooking from "../pages/User/Booking"
import AddAddressForm from "../pages/User/AddAddressForm"
import AddressListPage from "../pages/User/AddressListPage"
import BookingPaymentPage from "../pages/User/BookingPaymentPage"
import UserWallet from "../pages/User/UserWallet"
import { UserBookingList } from "../pages/User/UserBookingList"
import { BookingDetailsPage } from "../pages/User/PackageDetailsCard"
import TravelerKyc from "../pages/User/Traveler/TravelerKyc"
import TravelerBookingList from "../pages/User/Traveler/TravelerBookingList"
import CreateTravelRequest from "../pages/User/Traveler/CreateTravelRequest"
import { TravelerTripDetails } from "../pages/User/Traveler/TravelerTripDetails/TravelerTripDetailsPage"
import BookingPaymentSuccessPage from "../pages/User/Booking/BookingPaymentSuccessPage"
import BookingPaymentFailedPage from "../pages/User/Booking/BookingPaymentFailedPage"
import UserTrackingPage from "../pages/User/Tracking/UserTrackingPage"
import TravelerBookingDetails from "../pages/User/Traveler/BookingDetails/TravelerBookingDetails"
import { About } from "../pages/User/About/AboutPage"
import Services from "../pages/User/Service/Services"
import Contact from "../pages/User/Contact/Contact"
import BlogPage from "../pages/User/Blog/BlogPage"



const UserRoutes = () => {

  return (
    <>
      <title>CarryGo</title>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="verify-otp" element={<OtpVarificationpage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />

        </Route>
        <Route path="landing" element={<LandingPage />} />
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="services" element={<Services />} />

        <Route path="profile" element={<ProtectedRoute requiredRole={ROLES.USER}><UserProfile /></ProtectedRoute>} />
        <Route path="/booking" element={<ProtectedRoute requiredRole={ROLES.USER}><UserCreateBooking /></ProtectedRoute>} />
        <Route path="/booking/:bookingId/pay" element={<ProtectedRoute requiredRole={ROLES.USER}><BookingPaymentPage /></ProtectedRoute>} />
        <Route path="/booking/:bookingId/success" element={<ProtectedRoute requiredRole={ROLES.USER}><BookingPaymentSuccessPage /></ProtectedRoute>} />
        <Route path="/booking/:bookingId/failed" element={<ProtectedRoute requiredRole={ROLES.USER}><BookingPaymentFailedPage /></ProtectedRoute>} />
        <Route path="bookings" element={<ProtectedRoute requiredRole={ROLES.USER}><UserBookingList /></ProtectedRoute>} />
        <Route path="/bookings/:bookingId" element={<ProtectedRoute requiredRole={ROLES.USER}><BookingDetailsPage /></ProtectedRoute>} />

        <Route path="/tracking/:bookingId" element={<ProtectedRoute requiredRole={ROLES.USER}><UserTrackingPage /></ProtectedRoute>} />
        <Route path="/tracking" element={<ProtectedRoute requiredRole={ROLES.USER}><UserTrackingPage /></ProtectedRoute>} />

        <Route path="add-address" element={<ProtectedRoute requiredRole={ROLES.USER}><AddAddressForm /></ProtectedRoute>} />
        <Route path="addresses" element={<ProtectedRoute requiredRole={ROLES.USER}><AddressListPage /></ProtectedRoute>} />

        <Route path="wallet" element={<ProtectedRoute requiredRole={ROLES.USER}><UserWallet /></ProtectedRoute>} />


        <Route path="/traveler/kyc" element={<ProtectedRoute requiredRole={ROLES.USER}><TravelerKyc /></ProtectedRoute>} />
        <Route path="/traveler" element={<ProtectedRoute requiredRole={ROLES.USER}><TravelerBookingList /></ProtectedRoute>} />
        <Route path="/traveler/request" element={<ProtectedRoute requiredRole={ROLES.USER}><CreateTravelRequest /></ProtectedRoute>} />
        <Route path="/traveler/trip/:id" element={<ProtectedRoute requiredRole={ROLES.USER}><TravelerTripDetails /></ProtectedRoute>} />
        <Route path="/traveler/trip/:id/bookings/:bookingId" element={<ProtectedRoute requiredRole={ROLES.USER}><TravelerBookingDetails /></ProtectedRoute>} />



        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  )
}

export default UserRoutes
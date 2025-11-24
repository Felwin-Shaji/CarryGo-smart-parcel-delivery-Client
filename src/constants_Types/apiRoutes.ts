
export const API_AUTH = {
  SEND_OTP: "/api/auth/send-otp",
  VERIFY_OTP: "/api/auth/verify-otp",
  REFRESH_TOKEN: "/api/auth/refresh",
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
};


export const API_AGENCY = {
  KYC_CARIFICATION: "/api/agency/kyc-varification",

  HUB_TEMP_REGISTER: "/api/agency/hub/temp-register",
  HUB_VERIFY_OTP: "/api/agency/hub/verify-otp",
  HUB_RESEND_OTP: "/api/agency/hub/resend-otp",
  ADD_NEW_HUB: "/api/agency/add-newHub",
  HUB_TEMP_STATUS: "/api/agency/hub/temp-status",
}


export const API_ADMIN = {
  GET_AGENCIES: "/api/admin/agency",
  GET_USERS:"/api/admin/users"
}

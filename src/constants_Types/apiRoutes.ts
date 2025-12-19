
export const API_AUTH = {
  SEND_OTP: "/api/auth/send-otp",
  VERIFY_OTP: "/api/auth/verify-otp",

  REFRESH_TOKEN: "/api/auth/refresh",

  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",

  FORGOT_PASSWORD: "/api/auth/forgot-password",
  RESET_PASSWORD: "/api/auth/reset-password",
};


export const API_AGENCY = {
  KYC_VARIFICATION: "/api/agency/kyc-varification",

  HUB_TEMP_REGISTER: "/api/agency/hub/temp-register",
  HUB_VERIFY_OTP: "/api/agency/hub/verify-otp",
  HUB_RESEND_OTP: "/api/agency/hub/resend-otp",
  ADD_NEW_HUB: "/api/agency/add-newHub",
  HUB_TEMP_STATUS: "/api/agency/hub/temp-status",
  GET_HUBS:"/api/agency/hubs",

  RESUBMIT_AGENCY_KYC: "/api/agency/dashboard/resubmit-kyc",
}


export const API_ADMIN = {
  GET_AGENCIES: "/api/admin/agency",
  GET_USERS: "/api/admin/users"
}

export const API_HUB = {
    TEMP_WORKER_REGISTER: "/api/hub/worker/temp-register",
    WORKER_VERIFY_OTP: "/api/hub/worker/verify-otp",
    WORKER_RESEND_OTP: "/api/hub/worker/resend-otp",
    WORKER_KYC_UPLOAD: "/api/hub/worker/kyc-upload",
    CHECK_TEMP_WORKER_STATUS: "/api/hub/worker/check-status",
};


export const API_USER = {
  GET_PROFILE:"/api/user/profile"
}



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

  GET_PRICING:"/api/agency/agency-pricing-policy",
  UPDATE_PRICING:"/api/agency/agency-pricing-policy",

  GET_PROFILE:"/api/agency/profile",
  UPDATE_PROFILE:"/api/agency/edit-profile",
  RESET_PASSWORD:"/api/agency/reset-password",
}


export const API_ADMIN = {
  GET_AGENCIES: "/api/admin/agency",
  GET_USERS: "/api/admin/users",

  GET_ADMIN_PRICING: "/api/admin/admin-pricing",
  CREATE_ADMIN_PRICING:"/api/admin/admin-pricing",

  RESET_PASSWORD:"/api/admin/reset-password",
  UPDATE_PROFILE:"/api/admin/edit-profile",
  GET_PROFILE:"/api/admin/profile",

  GET_AGENCY_HUB:"api/admin/agency/hub"
}

export const API_HUB = {
    TEMP_WORKER_REGISTER: "/api/hub/worker/temp-register",
    WORKER_VERIFY_OTP: "/api/hub/worker/verify-otp",
    WORKER_RESEND_OTP: "/api/hub/worker/resend-otp",
    WORKER_KYC_UPLOAD: "/api/hub/worker/kyc-upload",
    CHECK_TEMP_WORKER_STATUS: "/api/hub/worker/check-status",
};


export const API_USER = {
  GET_PROFILE:"/api/user/profile",
  UPDATE_PROFILE:"/api/user/edit-profile",
  RESET_PASSWORD:"/api/user/reset-password",

  ADD_ADDRESS:"/api/user/address",
  GET_ADDRESSES:"/api/user/addresses",
  DELETE_ADDRESS:"/api/user/address",
  SET_DEFAULT_ADDRESS:"/api/user/address/default",

  GET_WALLET:"/api/user/wallet",
  CREATE_ORDER_WALLET:"/api/user/wallet/create-order",
  
  BOOKING_PINCODE_VALIDATE:"/api/user/booking/pincode/validate",
  SERVICEABLE_AGENCIES:"/api/user/booking/serviceable-agencies",
  USER_ADDRESSES:"/api/user/booking/serviceable-addresses",
  BOOKING_PRICING:"/api/user/booking/calculate_price",
  BOOKING:"/api/user/booking",

  REVERSE_GEOCODE:"/api/user/geocode/reverse"
}




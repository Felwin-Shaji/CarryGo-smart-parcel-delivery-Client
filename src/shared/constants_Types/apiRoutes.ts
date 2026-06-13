import type { Roles } from "./types/roles";

export const API_AUTH = {
  SEND_OTP: "/api/auth/send-otp",
  VERIFY_OTP: "/api/auth/verify-otp",

  REFRESH_TOKEN: "/api/auth/refresh",

  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",

  FORGOT_PASSWORD: "/api/auth/forgot-password",
  RESET_PASSWORD: "/api/auth/reset-password",

  GOOGLE_AUTH: "/api/auth/google",
};


export const API_AGENCY = {
  KYC_VARIFICATION: "/api/agency/kyc-varification",

  HUB_TEMP_REGISTER: "/api/agency/hub/temp-register",
  HUB_VERIFY_OTP: "/api/agency/hub/verify-otp",
  HUB_RESEND_OTP: "/api/agency/hub/resend-otp",
  ADD_NEW_HUB: "/api/agency/add-newHub",
  HUB_TEMP_STATUS: "/api/agency/hub/temp-status",
  GET_HUBS: "/api/agency/hubs",
  GET_HUBS_BY_ID: "/api/agency",
  GET_HUBS_WORKER: "/api/agency/hubs/worker",
  UPDATE_WORKER_KYC_STATUS: "",

  ROUTE_GROUPS: "/api/agency/route-groups",
  ROUTE_SEGMENTS: (routeGroupId: string) => `/api/agency/route-groups/${routeGroupId}/segments`,
  ROUTE_SEGMENTS_REORDER: (routeGroupId: string) => `/api/agency/route-groups/${routeGroupId}/segments/reorder`,

  RESUBMIT_AGENCY_KYC: "/api/agency/dashboard/resubmit-kyc",

  GET_PRICING: "/api/agency/agency-pricing-policy",
  UPDATE_PRICING: "/api/agency/agency-pricing-policy",

  GET_PROFILE: "/api/agency/profile",
  UPDATE_PROFILE: "/api/agency/edit-profile",
  RESET_PASSWORD: "/api/agency/reset-password",

  GET_WALLET: "/api/agency/wallet",
  CREATE_ORDER_WALLET: "/api/agency/wallet/create-order",
  WITHDRAW_WALLET: "/api/agency/wallet/withdraw",

  GET_DASHBOARD: "/api/agency/dashboard",
  GET_SALES_CHART: "/api/agency/dashboard/sales-chart",
  GET_DELIVERIES_CHART: "/api/agency/dashboard/deliveries-chart",
  GET_SALES_REPORT: "/api/agency/dashboard/sales-report",
  GET_SALES_REPORT_EXPORT: "/api/agency/dashboard/sales-report/export",

  GET_ALL: "/api/agency/notifications",
  MARK_AS_READ: "/api/agency/notifications/read",
  MARK_ALL_AS_READ: "/api/agency/notifications/read-all",
  UNREAD_COUNT: "/api/agency/notifications/unread-count",
}


export const API_ADMIN = {
  GET_AGENCIES: "/api/admin/agency",

  GET_USERS: "/api/admin/users",

  ADMIN_AGENCY_PRICING: "/api/admin/admin-pricing/agency",
  ADMIN_TRAVELER_PRICING: "/api/admin/admin-pricing/traveler",

  RESET_PASSWORD: "/api/admin/reset-password",
  UPDATE_PROFILE: "/api/admin/edit-profile",
  GET_PROFILE: "/api/admin/profile",

  GET_AGENCY_HUB: "api/admin/agency/hub",
  AGENCY_HUB_WORKER: "api/admin/agency/hub/worker",

  GET_WALLET: "/api/admin/wallet",
  CREATE_ORDER_WALLET: "/api/admin/wallet/create-order",
  WITHDRAW_WALLET: "/api/admin/wallet/withdraw",

  GET_ALL: "/api/admin/notifications",
  MARK_AS_READ: "/api/admin/notifications/read",
  MARK_ALL_AS_READ: "/api/admin/notifications/read-all",
  UNREAD_COUNT: "/api/admin/notifications/unread-count",

  GET_DASHBOARD: "/api/admin/dashboard",
  GET_REVENUE_CHART: "/api/admin/revenue-chart",
  GET_BOOKINGS_CHART: "/api/admin/bookings-chart",
  GET_BOOKINGS_REPORT: "/api/admin/bookings-report",
  GET_BOOKINGS_REPORT_EXPORT: "/api/admin/bookings-report/export",
}

export const API_HUB = {
  HUB: "/api/hub",
  WORKER: "/api/hub/workers",
  TEMP_WORKER_REGISTER: "/api/hub/worker/temp-register",
  WORKER_VERIFY_OTP: "/api/hub/worker/verify-otp",
  WORKER_RESEND_OTP: "/api/hub/worker/resend-otp",
  WORKER_KYC_UPLOAD: "/api/hub/worker/kyc-upload",
  CHECK_TEMP_WORKER_STATUS: "/api/hub/worker/check-status",

  GET_WALLET: "/api/hub/wallet",
  CREATE_ORDER_WALLET: "/api/hub/wallet/create-order",
  WITHDRAW_WALLET: "/api/hub/wallet/withdraw",

  FIELD_TASKS: "/api/hub/field-task",
  ASSIGN_PICKUPS: "/api/hub/pickups/assign",

  GET_PROFILE: "/api/hub/profile",
  UPDATE_PROFILE: "/api/hub/edit-profile",
  RESET_PASSWORD: "/api/hub/reset-password",

  SHIPMENT: "/api/hub/shipments",

  GET_DASHBOARD_SUMMARY: "/api/hub/dashboard/summary",
  GET_DASHBOARD_TREND: "/api/hub/dashboard/trend",
  GET_DASHBOARD_TYPES: "/api/hub/dashboard/types",
  GET_DASHBOARD_SHIPMENTS_PREVIEW: "/api/hub/dashboard/shipments-preview",

  GET_ALL: "/api/hub/notifications",
  MARK_AS_READ: "/api/hub/notifications/read",
  MARK_ALL_AS_READ: "/api/hub/notifications/read-all",
  UNREAD_COUNT: "/api/hub/notifications/unread-count",
};


export const API_USER = {
  GET_PROFILE: "/api/user/profile",
  UPDATE_PROFILE: "/api/user/edit-profile",
  RESET_PASSWORD: "/api/user/reset-password",

  ADD_ADDRESS: "/api/user/address",
  GET_ADDRESSES: "/api/user/addresses",
  DELETE_ADDRESS: "/api/user/address",
  SET_DEFAULT_ADDRESS: "/api/user/address/default",

  GET_WALLET: "/api/user/wallet",
  CREATE_ORDER_WALLET: "/api/user/wallet/create-order",
  WITHDRAW_WALLET: "/api/user/wallet/withdraw",

  SERVICEABLE_AGENCIES: "/api/user/booking/serviceable-agencies",
  SERVICEABLE_TRAVELERS: "/api/user/booking/serviceable-travelers",

  USER_ADDRESSES: "/api/user/addresses",
  BOOKING_PRICING: "/api/user/booking/calculate_price",
  BOOKING: "/api/user/booking",
  TRACKING: "/api/user/tracking",

  REVERSE_GEOCODE: "/api/user/geocode/reverse",

  SUBMIT_KYC: "/api/user/traveler/kyc",
  GET_KYC: "/api/user/traveler/kyc",
  RESUBMIT_KYC: "/api/user/traveler/kyc",

  TRAVELER_REQUEST: "/api/user/traveler/travel-requests",

  GET_ALL: "/api/user/notifications",
  MARK_AS_READ: "/api/user/notifications/read",
  MARK_ALL_AS_READ: "/api/user/notifications/read-all",
  UNREAD_COUNT: "/api/user/notifications/unread-count",
}

export const API_WORKER = {
  GET_WALLET: "/api/worker/wallet",
  CREATE_ORDER_WALLET: "/api/worker/wallet/create-order",
  WITHDRAW_WALLET: "/api/worker/wallet/withdraw",

  WORKER_PICKUPS: "/api/worker/field-task",

  SHIPMENTS: "/api/worker/shipments",

  GET_DASHBOARD: "/api/worker/dashboard",
  GET_ANALYTICS_GRAPH: "/api/worker/analytics/graph",
  GET_PARCELS: "/api/worker/parcels",
  EXPORT_PARCELS: "/api/worker/parcels/export",

  GET_ALL: "/api/worker/notifications",
  MARK_AS_READ: "/api/worker/notifications/read",
  MARK_ALL_AS_READ: "/api/worker/notifications/read-all",
  UNREAD_COUNT: "/api/worker/notifications/unread-count",

  GET_PROFILE: "/api/worker/profile",
  UPDATE_PROFILE: "/api/worker/edit-profile",
  RESET_PASSWORD: "/api/worker/reset-password",
}

export const API_CHAT = {
  GET_OR_CREATE_CHAT: "/api/chat/get-or-create",
  MESSAGES: "/api/chat/messages",
};


export const getNotificationApi = (role: Roles) => ({
  GET_ALL: `/api/${role}/notifications`,
  MARK_AS_READ: `/api/${role}/notifications/read`,
  MARK_ALL_AS_READ: `/api/${role}/notifications/read-all`,
  UNREAD_COUNT: `/api/${role}/notifications/unread-count`,
});
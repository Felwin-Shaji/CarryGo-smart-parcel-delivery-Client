import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { KYCStatus } from "../../constants/types/roles";


interface Agency {
  id: string;
  name: string;
  email: string;
  role: string;
  kycStatus: KYCStatus;
}

export interface AgencyState {
  agency: Agency | null;
  accessToken: string | null;
  initialHydrationComplete: boolean;
}

const agencyInitialState: AgencyState = {
  agency: null,
  accessToken: null,
  initialHydrationComplete: false,
};

const agencySlice = createSlice({
  name: "agencyReducer",
  initialState: agencyInitialState,
  reducers: {
    agencyLogin(
      state,
      action: PayloadAction<{ agency: Agency; accessToken: string }>
    ) {
      state.agency = action.payload.agency;
      state.accessToken = action.payload.accessToken;
      state.initialHydrationComplete = true;
    },

    agencyLogout(state) {
      state.agency = null;
      state.accessToken = null;
      state.initialHydrationComplete = true;
    },

    updateAgencyKycStatus(state, action: PayloadAction<KYCStatus>) {
      if (state.agency) {
        state.agency.kycStatus = action.payload;
      }
    },

    AgencyCompleteInitialHydration(state) {
      state.initialHydrationComplete = true;
    },
  },
});

export const {
  agencyLogin,
  agencyLogout,
  AgencyCompleteInitialHydration,
  updateAgencyKycStatus
} = agencySlice.actions;

export default agencySlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminState {
  admin: Admin | null;
  accessToken: string | null;
  initialHydrationComplete: boolean;
}

const initialState: AdminState = {
  admin: null,
  accessToken: null,
  initialHydrationComplete: false,
};

const adminSlice = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    adminLogin(state, action: PayloadAction<{ admin: Admin; accessToken: string }>) {
      state.admin = action.payload.admin;
      state.accessToken = action.payload.accessToken;
      state.initialHydrationComplete = true;
    },
    adminLogout(state) {
      state.admin = null;
      state.accessToken = null;
      state.initialHydrationComplete = true;
    },
    adminCompleteInitialHydration(state) {
      state.initialHydrationComplete = true;
    },
  },
});

export const { adminLogin, adminLogout, adminCompleteInitialHydration } = adminSlice.actions;
export default adminSlice.reducer;

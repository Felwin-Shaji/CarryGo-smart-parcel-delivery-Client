import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { KYCStatus } from "../../constants_Types/types/roles";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  kycStatus: KYCStatus;
}

export interface UserState {
  user: User | null;
  accessToken: string | null;
  initialHydrationComplete: boolean;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  initialHydrationComplete: false,
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userLogin(state, action: PayloadAction<{ user: User; accessToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.initialHydrationComplete = true;
    },

    userLogout(state) {
      state.user = null;
      state.accessToken = null;
      state.initialHydrationComplete = true;
    },

    UserCompleteInitialHydration(state) {
      state.initialHydrationComplete = true;
    },
  },
});

export const { userLogin, userLogout, UserCompleteInitialHydration } = userSlice.actions;

export default userSlice.reducer;

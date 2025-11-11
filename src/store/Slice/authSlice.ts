import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  initialHydrationComplete: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  initialHydrationComplete: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; accessToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.initialHydrationComplete = true;
    },

    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.initialHydrationComplete = true;
    },

    completeInitialHydration(state) {
      state.initialHydrationComplete = true;
    },
  },
});

export const { login, logout, completeInitialHydration } = authSlice.actions;

export default authSlice.reducer;

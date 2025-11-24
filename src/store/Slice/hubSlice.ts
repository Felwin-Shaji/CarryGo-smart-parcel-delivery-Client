import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Hub {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UserState {
  hub: Hub | null;
  accessToken: string | null;
  initialHydrationComplete: boolean;
}

const initialState: UserState = {
  hub: null,
  accessToken: null,
  initialHydrationComplete: false,
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    hubLogin(state, action: PayloadAction<{ hub: Hub  ; accessToken: string }>) {
      state.hub = action.payload.hub;
      state.accessToken = action.payload.accessToken;
      state.initialHydrationComplete = true;
    },

    hubLogout(state) {
      state.hub = null;
      state.accessToken = null;
      state.initialHydrationComplete = true;
    },

    hubCompleteInitialHydration(state) {
      state.initialHydrationComplete = true;
    },
  },
});

export const { hubLogin, hubLogout, hubCompleteInitialHydration } = userSlice.actions;

export default userSlice.reducer;

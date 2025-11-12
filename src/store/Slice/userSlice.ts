import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
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
    login(state, action: PayloadAction<{ user: User; accessToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.initialHydrationComplete = true;
    },

    userlogout(state) {
      state.user = null;
      state.accessToken = null;
      state.initialHydrationComplete = true;
    },

    completeInitialHydration(state) {
      state.initialHydrationComplete = true;
    },
  },
});

export const { login, userlogout, completeInitialHydration } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

interface AuthMetaState {
  isRefreshing: boolean;
  isRehydrated: boolean;
}

const initialState: AuthMetaState = {
  isRefreshing: false,
  isRehydrated: false,
};

const authMetaSlice = createSlice({
  name: "authMeta",
  initialState,
  reducers: {
    refreshStart(state) {
      state.isRefreshing = true;
    },
    refreshEnd(state) {
      state.isRefreshing = false;
      state.isRehydrated = true;
    },
  },
});

export const { refreshStart, refreshEnd } = authMetaSlice.actions;
export default authMetaSlice.reducer;

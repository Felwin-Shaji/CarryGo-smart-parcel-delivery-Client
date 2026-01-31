import { createSlice } from "@reduxjs/toolkit";

interface AuthMetaState {
  isRefreshing: boolean;
}

const initialState: AuthMetaState = {
  isRefreshing: false,
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
    },
  },
});

export const { refreshStart, refreshEnd } = authMetaSlice.actions;
export default authMetaSlice.reducer;

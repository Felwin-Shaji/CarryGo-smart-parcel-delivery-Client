import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice"
import adminReducer from "./Slice/adminSlice"
import agencyReducer from "./Slice/agencySlice"
import hubReducer from "./Slice/hubSlice"
import workerReducer from "./Slice/workerSlice"

export const store = configureStore({
    reducer:{
        userState:userReducer,
        adminState: adminReducer,
        agencyState:agencyReducer,
        hubState:hubReducer,
        workerState:workerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
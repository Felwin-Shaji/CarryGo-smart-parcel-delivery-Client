import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice"
import adminReducer from "./Slice/adminSlice"

export const store = configureStore({
    reducer:{
        userState:userReducer,
        adminState: adminReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Worker {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface WorkerState {
    worker: Worker | null;
    accessToken: string | null;
    initialHydrationComplete: boolean;
}

const initialState: WorkerState = {
    worker: null,
    accessToken: null,
    initialHydrationComplete: false,
};

const workerSlice = createSlice({
    name: "workerReducer",
    initialState,
    reducers: {
        workerLogin(state, action: PayloadAction<{ worker: Worker; accessToken: string }>) {
            state.worker = action.payload.worker;
            state.accessToken = action.payload.accessToken;
            state.initialHydrationComplete = true;
        },
        workerLogout(state) {
            state.worker = null;
            state.accessToken = null;
            state.initialHydrationComplete = true;
        },
        workerCompleteInitialHydration(state) {
            state.initialHydrationComplete = true;
        },
    }
})

export const { workerLogin, workerLogout,workerCompleteInitialHydration } = workerSlice.actions
export default workerSlice.reducer
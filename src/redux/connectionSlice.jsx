import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: 'connection',
    initialState: {
        discover: [],
        received: [],
        pending: [],
        connected: [],
        blocked: []
    },
    reducers: {
        fillDiscover: (state, action) => {
            state.discover = [...state.discover, ...action.payload]
        },
        fillReceived: (state, action) => {
            state.received = [...state.received, ...action.payload]
        },
        fillPending: (state, action) => {
            state.pending = [...state.pending, ...action.payload]
        },
        fillConnected: (state, action) => {
            state.connected = [...state.connected, ...action.payload]
        },
        fillBlocked: (state, action) => {
            state.blocked = [...state.blocked, ...action.payload]
        },
        updateDiscover: (state, action) => {
            state.discover = action.payload
        },
        updateReceived: (state, action) => {
            state.received = action.payload
        },
        updatePending: (state, action) => {
            state.pending = action.payload
        },
        updateConnected: (state, action) => {
            state.connected = action.payload
        },
        updateBlocked: (state, action) => {
            state.blocked = action.payload
        }
    }
})

export const {
    fillDiscover, fillReceived, fillPending, fillConnected, fillBlocked,
    updateDiscover, updateReceived, updatePending, updateConnected, updateBlocked
} = connectionSlice.actions
export default connectionSlice.reducer
import { createSlice } from "@reduxjs/toolkit"

const presenceSlice = createSlice({
    name: 'presence',
    initialState: {}, //{[uid]:{isOnline,lastSeen}}
    reducers: {
        setPresence: (state, action) => {
            const { uid, isOnline, lastSeen } = action.payload
            if (!uid) return
            state[uid] = { isOnline, lastSeen: lastSeen ?? state[uid]?.lastSeen ?? null }
        },
        clearPresence: () => {
            return {}
        }
    }
})

export const { setPresence, clearPresence } = presenceSlice.actions
export default presenceSlice.reducer
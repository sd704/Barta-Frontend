import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: 'connection',
    initialState: {
        discover: {},
        received: {},
        pending: {},
        connected: {},
        blocked: {}
    },
    reducers: {
        fillConnections: (state, action) => {
            const { filter, listData } = action.payload

            if (!state[filter] || !Array.isArray(listData)) return

            listData.forEach((item) => {
                state[filter][item._id] = item
            })
        },
        removeConnection: (state, action) => {
            const { filter, id } = action.payload

            if (!state[filter] || !id) return

            delete state[filter][id]
        }
    }
})

export const { fillConnections, removeConnection } = connectionSlice.actions
export default connectionSlice.reducer
import { createSlice } from "@reduxjs/toolkit"
import baseApi from "./api/baseApi"

const ALLOWED_UPDATES = ["firstName", "lastName", "about", "description", "age", "gender", "pfp"]

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload
        },
        updateUser: (state, action) => {
            // if initialState is null, so if updateUser runs before addUser, it will crash.
            if (!state) return

            const data = action.payload
            Object.keys(data).forEach((key) => {
                if (ALLOWED_UPDATES.includes(key)) {
                    state[key] = data[key]
                }
            })
        },
        updateNetwork: (state, action) => {
            if (!state) return

            state["isOnline"] = action.payload
        },
        removeUser: (state, action) => {
            return null
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            baseApi.endpoints.getLoggedInUser.matchFulfilled,
            (state, action) => action.payload
            // This will sync the query result with the userSlice state, 
            // so that we can use the userSlice state in other components
        )
    }
})

export const { addUser, updateUser, updateNetwork, removeUser } = userSlice.actions
export default userSlice.reducer
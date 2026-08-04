import { createSlice } from "@reduxjs/toolkit"
import baseApi from "./api/baseApi"

const peopleSlice = createSlice({
    name: 'people',
    initialState: {},
    reducers: {
        addPeople: (state, action) => {
            const usersList = action.payload
            usersList.forEach((user) => {
                state[user._id] = user
                state[user._id]["name"] = user.firstName + " " + user.lastName
                state[user._id]["isOnline"] = false
            })
        },
        addPerson: (state, action) => {
            const personData = action.payload
            if (!personData?._id) return
            if (state[personData._id]) return
            state[personData._id] = personData
            state[personData._id]["name"] = personData.firstName + " " + personData.lastName
            state[personData._id]["isOnline"] = false
        },
        updatePerson: (state, action) => {
            const personData = action.payload
            if (!personData?._id || !state[personData?._id]) return
            state[personData._id] = personData
        },
        updateIsOnline: (state, action) => {
            const { uid, status, lastSeen } = action.payload
            if (!uid || !state[uid]) return
            state[uid].isOnline = status
            state[uid].lastSeen = lastSeen
        },
        removePerson: (state, action) => {
            const id = action.payload
            delete state[id]
        },
        clearPeople: () => {
            return {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                baseApi.endpoints.getUserById.matchFulfilled,
                (state, action) => {
                    if (!action.payload?._id) return // Return if payload is null or undefined

                    const existingUserData = state[action.payload._id]
                    state[action.payload._id] = {
                        ...action.payload,

                        // Preserve existing data if available
                        ...(existingUserData && {
                            isOnline: existingUserData.isOnline,
                            lastSeen: existingUserData.lastSeen,
                        }),
                    }
                }
            )
    }
})

export const { addPeople, addPerson, updatePerson, updateIsOnline, removePerson, clearPeople } = peopleSlice.actions
export default peopleSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

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
            const { uid, status } = action.payload
            if (!uid || !state[uid]) return
            state[uid].isOnline = status
        },
        removePerson: (state, action) => {
            const id = action.payload
            delete state[id]
        },
        clearPeople: () => {
            return {}
        }
    }
})

export const { addPeople, addPerson, updatePerson, updateIsOnline, removePerson, clearPeople } = peopleSlice.actions
export default peopleSlice.reducer
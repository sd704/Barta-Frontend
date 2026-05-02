import { createSlice } from "@reduxjs/toolkit";

const peopleSlice = createSlice({
    name: 'people',
    initialState: {},
    reducers: {
        addPeople: (state, action) => {
            const { filter, usersList, loggedInUserId } = action.payload
            if (!filter || !Array.isArray(usersList) || !loggedInUserId) return
            usersList.forEach((user) => {
                state[user._id] = user
                state[user._id]["name"] = user.firstName + " " + user.lastName
                state[user._id]["isOnline"] = false

                let connectionData = {}
                switch (filter) {
                    case "discover":
                        connectionData = { status: '', isBlocked: false }
                        break
                    case "received":
                        connectionData = { senderId: user._id, status: 'interested', isBlocked: false }
                        break
                    case "pending":
                        connectionData = { senderId: loggedInUserId, status: 'interested', isBlocked: false }
                        break
                    case "connected":
                        connectionData = { status: 'accepted', isBlocked: false }
                        break
                    case "blocked":
                        connectionData = { status: '', isBlocked: true }
                        break
                    default:
                        console.log('Wrong Filter!')
                        return
                }

                state[user._id]["connectionData"] = connectionData
            })
        },
        addPerson: (state, action) => {
            const personData = action.payload
            if (!personData?._id) return
            state[personData._id] = personData
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
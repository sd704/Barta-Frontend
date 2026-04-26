import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'messages',
    initialState: {},
    reducers: {
        fillMsgs: (state, action) => {
            const allMessages = action.payload // [{},{},{}]
            allMessages.forEach(msg => {
                if (msg.userData._id && !state[msg.userData._id]) {
                    state[msg.userData._id] = msg // {}
                }
            })
        },
        fillConvo: (state, action) => {
            const chatObj = action.payload
            if (!chatObj.userData._id) return
            if (!state[chatObj.userData._id]) {
                state[chatObj.userData._id] = chatObj
            } else {
                state[chatObj.userData._id].messages = [...chatObj.messages]
            }
        },
        addMsg: (state, action) => {
            const { chatId, lastMessage, receiver } = action.payload
            if (!receiver._id) return

            if (!state[receiver._id]) {
                state[receiver._id] = {
                    chatId,
                    isOnline: true,
                    unread: 3,
                    isGroup: false,
                    isArchive: false,
                    userData: {
                        ...receiver,
                        name: receiver.firstName + " " + receiver.lastName,
                    },
                    messages: []
                }
            }
            state[receiver._id].messages.push(lastMessage)
        },
        updateIsOnline: (state, action) => {
            const { uid, status } = action.payload
            if (!uid || !state[uid]) return
            console.log(`${uid} online status: ${status}`)
            state[uid].userData.isOnline = status
        },
        removeMsg: (state, action) => {
            const id = action.payload
            delete state[id]
        },
        clearMsgs: () => {
            return {}
        }
    }
})

export const { addMsg, fillMsgs, fillConvo, updateIsOnline, removeMsg, clearMsgs } = messageSlice.actions
export default messageSlice.reducer
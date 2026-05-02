import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'messages',
    initialState: {},
    reducers: {
        fillMsgs: (state, action) => {
            const chats = action.payload // [{ _id, userData, lastMessage, unreadCount }, {...}, {...}]

            chats.forEach(item => {
                if (item.userData._id && !state[item.userData._id]) {
                    state[item.userData._id] = {
                        chatId: item._id,
                        uid: item.userData._id,
                        unread: item.unreadCount,
                        isGroup: false,
                        isArchive: false,
                        messages: [item.lastMessage]
                    }
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
            const { chatId, lastMessage, receiver, loggedInUserId } = action.payload
            if (!receiver._id) return

            // "receiver" is not technically receiver of "lastMessage" message
            // Its just the other person in this convo beside the loggedInUser
            if (!state[receiver._id]) {
                state[receiver._id] = {
                    chatId,
                    isOnline: true,
                    unread: (lastMessage.senderId != loggedInUserId) ? 1 : 0,
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
            state[receiver._id].unread += (lastMessage.senderId != loggedInUserId) ? 1 : 0
        },
        markAsSeen: (state, action) => {
            const { receiverId, msgReceiverId, stringChatId, stringMessageIds, loggedInUserId } = action.payload
            if (!receiverId || !stringChatId) return

            // "receiver" is not technically receiver of "stringMessageIds"
            // Its just the other person in this convo beside the loggedInUser
            if (state[receiverId]?.chatId === stringChatId) {
                let isReadCount = 0
                state[receiverId].messages.forEach(msg => {
                    if (stringMessageIds.includes(msg._id) && !msg.isRead) {
                        msg.isRead = true
                        // Not all "stringMessageIds" will be marked as inRead=true [possibility]
                        // so "isReadCount" is inside this condition
                        if (msgReceiverId === loggedInUserId) { isReadCount += 1 }
                    }
                })
                state[receiverId].unread -= isReadCount
            }
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

export const { addMsg, fillMsgs, fillConvo, markAsSeen, removeMsg, clearMsgs } = messageSlice.actions
export default messageSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'messages',
    initialState: {},
    reducers: {
        fillMsgs: (state, action) => {
            const chats = action.payload // [{ _id, userData, lastMessage, unreadCount }, {...}, {...}]

            chats.forEach(item => {
                if (item.peerId && !state[item.peerId]) {
                    state[item.peerId] = {
                        chatId: item.chatId,
                        uid: item.peerId,
                        unread: item.unread,
                        isGroup: item.isGroup,
                        isArchive: item.isArchive,
                        messages: item.messages
                    }
                }
            })
        },
        fillConvo: (state, action) => {
            const chatObj = action.payload
            if (!chatObj.chatId && !chatObj.userData._id) return
            if (!state[chatObj.userData._id]) {
                state[chatObj.userData._id] = {
                    chatId: chatObj.chatId,
                    uid: chatObj.userData._id,
                    unread: 0,
                    isGroup: false,
                    isArchive: false,
                    messages: [...chatObj.messages]
                }
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
                    uid: receiver._id,
                    unread: 0,
                    isGroup: false,
                    isArchive: false,
                    messages: []
                }
            }
            state[receiver._id].messages.push(lastMessage)
            state[receiver._id].unread += (lastMessage.senderId != loggedInUserId) ? 1 : 0
        },
        markAsSeen: (state, action) => {
            const { receiverId, msgReceiverId, chatId, msgIds, loggedInUserId } = action.payload
            if (!receiverId || !chatId) return

            // "receiver" is not technically receiver of "stringMessageIds"
            // Its just the other person in this convo beside the loggedInUser
            if (state[receiverId]?.chatId === chatId) {
                let isReadCount = 0
                state[receiverId].messages.forEach(msg => {
                    if (msgIds.includes(msg._id) && !msg.isRead) {
                        msg.isRead = true
                        // Not all "stringMessageIds" will be marked as isRead=true [possibility]
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
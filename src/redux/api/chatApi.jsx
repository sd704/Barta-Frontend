import baseApi from "./baseApi"
import { GET_CHATS, GET_ALL_CHATS } from "../../utils/ApiRoutes"

// _meta is the metadata of the request -> request URL, method, status, etc
const transformChatResData = (res, _meta, targetUserId) => {
    const chat = res?.data // chat -> { _id, participants:[u1,u2], messages}
    if (!chat?._id) return null
    return {
        chatId: chat._id,
        peerId: targetUserId,
        messages: chat.messages ?? [],
        unread: 0
    }
}

const transformMultiChatResData = (res) => {
    const chats = res?.data ?? []
    return chats.map(c => ({
        chatId: c._id,
        peerId: c.userData._id,
        unread: c.unreadCount ?? 0,
        isGroup: false,
        isArchive: false,
        messages: c.lastMessage ? [c.lastMessage] : [],
        peer: {
            ...c.userData,
            name: `${c.userData.firstName} ${c.userData.lastName}`,
            connectionData: c.connectionData
        }
    }))
}

const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Get chats from single user using targetUserId
        getChats: builder.query({
            query: (targetUserId) => GET_CHATS(targetUserId),
            transformResponse: transformChatResData,
            providesTags: (result, error, targetUserId) => [{ type: 'Chats', id: targetUserId }]
        }),

        // Get all users and last message in conversation
        getAllChats: builder.query({
            query: () => GET_ALL_CHATS(),
            transformResponse: transformMultiChatResData,
            providesTags: [{ type: 'Chats', id: 'LIST' }]
        })
    })
})

export const { useGetChatsQuery, useGetAllChatsQuery } = chatApi
export default chatApi
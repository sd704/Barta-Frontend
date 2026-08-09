import baseApi from "./baseApi"
import { fillConvo, fillMsgs } from "../messageSlice"
import { addPeople } from "../peopleSlice"

// _meta is the metadata of the request -> request URL, method, status, etc
const transformChatResData = (res, _meta, targetUserId) => {
    const chat = res?.data // chat -> { _id, participants:[u1,u2], messages}
    if (!chat?._id) return null
    return {
        chatId: chat._id,
        peerId: targetUserId,
        userData: { _id: targetUserId }, // Needed for fillConvo, fillMsgs -> remove userData after complete migration
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
            query: (targetUserId) => ({ url: `/chats/${targetUserId}`, method: 'GET' }),
            transformResponse: transformChatResData,
            providesTags: (result, error, targetUserId) => [{ type: 'Chats', id: targetUserId }],

            // onQueryStarted will receive transformed response data, not the raw response data
            async onQueryStarted(targetUserId, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled // { chatId, userData, messages }
                    if (!data) return
                    dispatch(fillConvo(data))
                } catch (err) { }
            }
        }),

        // Get all users and last message in conversation
        getAllChats: builder.query({
            query: () => ({ url: '/chats', method: 'GET' }),
            transformResponse: transformMultiChatResData,
            providesTags: [{ type: 'Chats', id: 'LIST' }],
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: chats } = await queryFulfilled
                    if (!chats?.length) return
                    dispatch(addPeople(chats.map(c => ({ ...c.peer }))))
                    dispatch(fillMsgs(chats))
                } catch (err) { }
            }
        })
    })
})

export const { useGetChatsQuery, useGetAllChatsQuery } = chatApi
export default chatApi


// getAllChats -> onQueryStarted -> chats structure
// {
//     "chatId","peerId","unread","isGroup","isArchive",
//     "messages": [
//         { "senderId","text","isRead","_id","createdAt","updatedAt" }
//     ],
//     "peer": {
//         "_id","firstName","lastName","email","about","description","age","gender","pfp","name",
//         "connectionData": { "status","senderId","blockedByMe","blockedMe" }
//     }
// }
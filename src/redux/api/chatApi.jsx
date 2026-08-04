import baseApi from "./baseApi"
import { fillConvo } from "../messageSlice"

const transformChatResData = (res, _meta, targetUserId) => {
    const chat = res?.data // chat -> { _id, participants:[u1,u2], messages}
    if (!chat?._id) return null
    return {
        chatId: chat._id,
        // Need to remove userData after complete migration to RTK Query
        userData: { _id: targetUserId },
        messages: chat.messages ?? []
    }
}

const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (targetUserId) => ({ url: `/chats/${targetUserId}`, method: 'GET' }),

            // _meta is the metadata of the request -> request URL, method, status, etc
            transformResponse: transformChatResData,
            providesTags: (result, error, targetUserId) => [{ type: 'Messages', id: targetUserId }],

            // onQueryStarted will receive transformed response data, not the raw response data
            async onQueryStarted(targetUserId, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled // { chatId, userData, messages }
                    if (data) dispatch(fillConvo(data))
                } catch (err) { }
            }
        })
    })
})

export const { useGetMessagesQuery } = chatApi
export default chatApi
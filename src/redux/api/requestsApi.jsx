import baseApi from "./baseApi"

const transformRequestRes = (res) => res?.data ?? {}

const CONNECTION_LIST_TABS = [
    { type: 'Connections', id: 'DISCOVER' },
    { type: 'Connections', id: 'RECEIVED' },
    { type: 'Connections', id: 'PENDING' },
    { type: 'Connections', id: 'CONNECTED' },
    { type: 'Connections', id: 'BLOCKED' }
]

const requestsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        connect: builder.mutation({
            query: (uid) => ({ url: `/requests/${uid}/interested`, method: 'POST' }),
            transformResponse: transformRequestRes,
            invalidatesTags: CONNECTION_LIST_TABS
        }),
        ignore: builder.mutation({
            query: (uid) => ({ url: `/requests/${uid}/ignored`, method: 'POST' }),
            transformResponse: transformRequestRes,
            invalidatesTags: CONNECTION_LIST_TABS
        }),
        accept: builder.mutation({
            query: (uid) => ({ url: `/requests/${uid}/accepted`, method: 'PATCH' }),
            transformResponse: transformRequestRes,
            invalidatesTags: CONNECTION_LIST_TABS
        }),
        reject: builder.mutation({
            query: (uid) => ({ url: `/requests/${uid}/rejected`, method: 'PATCH' }),
            transformResponse: transformRequestRes,
            invalidatesTags: CONNECTION_LIST_TABS
        }),
        withdraw: builder.mutation({
            query: (uid) => ({ url: `/requests/${uid}/withdraw`, method: 'DELETE' }),
            transformResponse: transformRequestRes,
            invalidatesTags: CONNECTION_LIST_TABS
        }),
        remove: builder.mutation({
            query: (uid) => ({ url: `/requests/${uid}/remove`, method: 'DELETE' }),
            transformResponse: transformRequestRes,
            invalidatesTags: CONNECTION_LIST_TABS
        }),
        block: builder.mutation({
            query: (uid) => ({ url: `/blocks/${uid}`, method: 'POST' }),
            transformResponse: transformRequestRes,
            invalidatesTags: CONNECTION_LIST_TABS
        }),
        unblock: builder.mutation({
            query: (uid) => ({ url: `/blocks/${uid}`, method: 'DELETE' }),
            transformResponse: transformRequestRes,
            invalidatesTags: CONNECTION_LIST_TABS
        })
    })
})

export const {
    useConnectMutation,
    useIgnoreMutation,
    useAcceptMutation,
    useRejectMutation,
    useWithdrawMutation,
    useRemoveMutation,
    useBlockMutation,
    useUnblockMutation
} = requestsApi
export default requestsApi
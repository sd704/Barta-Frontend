import baseApi from "./baseApi"
import { CONNECT, IGNORE, ACCEPT, REJECT, WITHDRAW, REMOVE, BLOCK, UNBLOCK } from "../../utils/ApiRoutes"

const transformRequestRes = (res) => res?.data ?? {}

const CONNECTION_LIST_TABS = [
    { type: 'Connections', id: 'DISCOVER' },
    { type: 'Connections', id: 'RECEIVED' },
    { type: 'Connections', id: 'PENDING' },
    { type: 'Connections', id: 'CONNECTED' },
    { type: 'Connections', id: 'BLOCKED' }
]

const filterTabs = (...ids) => CONNECTION_LIST_TABS.filter(t => ids.includes(t.id))

const requestsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        connect: builder.mutation({
            query: (uid) => CONNECT(uid),
            transformResponse: transformRequestRes,
            invalidatesTags: (result, error, uid) => [...filterTabs('DISCOVER', 'PENDING'), { type: 'User', id: uid }]
        }),
        ignore: builder.mutation({
            query: (uid) => IGNORE(uid),
            transformResponse: transformRequestRes,
            invalidatesTags: (result, error, uid) => [...filterTabs('DISCOVER'), { type: 'User', id: uid }]
        }),
        accept: builder.mutation({
            query: (uid) => ACCEPT(uid),
            transformResponse: transformRequestRes,
            invalidatesTags: (result, error, uid) => [...filterTabs('RECEIVED', 'CONNECTED'), { type: 'User', id: uid }]
        }),
        reject: builder.mutation({
            query: (uid) => REJECT(uid),
            transformResponse: transformRequestRes,
            invalidatesTags: (result, error, uid) => [...filterTabs('RECEIVED', 'DISCOVER'), { type: 'User', id: uid }]
        }),
        withdraw: builder.mutation({
            query: (uid) => WITHDRAW(uid),
            transformResponse: transformRequestRes,
            invalidatesTags: (result, error, uid) => [...filterTabs('PENDING', 'DISCOVER'), { type: 'User', id: uid }]
        }),
        remove: builder.mutation({
            query: (uid) => REMOVE(uid),
            transformResponse: transformRequestRes,
            invalidatesTags: (result, error, uid) => [...filterTabs('CONNECTED', 'DISCOVER'), { type: 'User', id: uid }]
        }),
        block: builder.mutation({
            query: (uid) => BLOCK(uid),
            transformResponse: transformRequestRes,
            invalidatesTags: (result, error, uid) => [...CONNECTION_LIST_TABS, { type: 'User', id: uid }]
            // We don't know where user will block from
        }),
        unblock: builder.mutation({
            query: (uid) => UNBLOCK(uid),
            transformResponse: transformRequestRes,
            invalidatesTags: (result, error, uid) => [...CONNECTION_LIST_TABS, { type: 'User', id: uid }]
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
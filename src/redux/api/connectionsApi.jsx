import baseApi from "./baseApi"
import { DISCOVER, RECEIVED, PENDING, CONNECTED, BLOCKED } from "../../utils/ApiRoutes"
import { CONNECTION_TABS } from "../../utils/connectionConfig"

// Just calculating and adding connectionData
const transformTabResponse = (res, tab, loggedInUserId) => {
    const users = res?.data ?? []
    return users.map(user => ({
        ...user,
        name: `${user.firstName} ${user.lastName}`,
        connectionData: CONNECTION_TABS[tab].connectionData(user, loggedInUserId)
    }))
}

const connectionsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDiscover: builder.query({
            query: () => DISCOVER(),
            transformResponse: (res, _meta, { loggedInUserId }) => transformTabResponse(res, 'discover', loggedInUserId),
            providesTags: [{ type: 'Connections', id: 'DISCOVER' }]
        }),
        getReceived: builder.query({
            query: () => RECEIVED(),
            transformResponse: (res, _meta, { loggedInUserId }) => transformTabResponse(res, 'received', loggedInUserId),
            providesTags: [{ type: 'Connections', id: 'RECEIVED' }]
        }),
        getPending: builder.query({
            query: () => PENDING(),
            transformResponse: (res, _meta, { loggedInUserId }) => transformTabResponse(res, 'pending', loggedInUserId),
            providesTags: [{ type: 'Connections', id: 'PENDING' }]
        }),
        getConnected: builder.query({
            query: () => CONNECTED(),
            transformResponse: (res, _meta, { loggedInUserId }) => transformTabResponse(res, 'connected', loggedInUserId),
            providesTags: [{ type: 'Connections', id: 'CONNECTED' }]
        }),
        getBlocked: builder.query({
            query: () => BLOCKED(),
            transformResponse: (res, _meta, { loggedInUserId }) => transformTabResponse(res, 'blocked', loggedInUserId),
            providesTags: [{ type: 'Connections', id: 'BLOCKED' }]
        })
    })
})

export const {
    useGetDiscoverQuery,
    useGetReceivedQuery,
    useGetPendingQuery,
    useGetConnectedQuery,
    useGetBlockedQuery
} = connectionsApi
export default connectionsApi
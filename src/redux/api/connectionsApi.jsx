import baseApi from "./baseApi"
import { addPeople } from "../peopleSlice"
import { CONNECTION_TABS } from "../../utils/connectionConfig"

// Just calculating and adding connectionData
const transformTabResponse = (res, tab, loggedInUserId) => {
    const users = res?.data ?? []
    return users.map(user => ({
        ...user,
        name: `${user.firstName} ${user.lastName}`,
        isOnline: false,
        connectionData: CONNECTION_TABS[tab].connectionData(user, loggedInUserId)
    }))
}

const syncPeople = async (dispatch, queryFulfilled) => {
    try {
        const { data } = await queryFulfilled
        if (!data?.length) return
        dispatch(addPeople(data))
    } catch (err) { }
}

const connectionsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDiscover: builder.query({
            query: () => ({ url: '/connections/feed', method: 'GET' }),
            transformResponse: (res, _meta, { loggedInUserId }) => transformTabResponse(res, 'discover', loggedInUserId),
            providesTags: [{ type: 'Connections', id: 'DISCOVER' }],
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                await syncPeople(dispatch, queryFulfilled)
            }
        }),
        getReceived: builder.query({
            query: () => ({ url: '/connections/received', method: 'GET' }),
            transformResponse: (res, _meta, { loggedInUserId }) => transformTabResponse(res, 'received', loggedInUserId),
            providesTags: [{ type: 'Connections', id: 'RECEIVED' }],
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                await syncPeople(dispatch, queryFulfilled)
            }
        }),
        getPending: builder.query({
            query: () => ({ url: '/connections/sent', method: 'GET' }),
            transformResponse: (res, _meta, { loggedInUserId }) => transformTabResponse(res, 'pending', loggedInUserId),
            providesTags: [{ type: 'Connections', id: 'PENDING' }],
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                await syncPeople(dispatch, queryFulfilled)
            }
        }),
        getConnected: builder.query({
            query: () => ({ url: '/connections/accepted', method: 'GET' }),
            transformResponse: (res, _meta, { loggedInUserId }) => transformTabResponse(res, 'connected', loggedInUserId),
            providesTags: [{ type: 'Connections', id: 'CONNECTED' }],
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                await syncPeople(dispatch, queryFulfilled)
            }
        }),
        getBlocked: builder.query({
            query: () => ({ url: '/connections/blocked', method: 'GET' }),
            transformResponse: (res, _meta, { loggedInUserId }) => transformTabResponse(res, 'blocked', loggedInUserId),
            providesTags: [{ type: 'Connections', id: 'BLOCKED' }],
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                await syncPeople(dispatch, queryFulfilled)
            }
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
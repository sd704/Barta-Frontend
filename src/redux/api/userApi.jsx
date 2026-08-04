import baseApi from "./baseApi"

const transformResData = (res) => {
    const user = res?.data
    if (!user) return null
    return { ...user, name: `${user.firstName} ${user.lastName}`, isOnline: false }
}
const syncLoggedInUser = async (dispatch, queryFulfilled) => {
    try {
        const { data: user } = await queryFulfilled
        dispatch(baseApi.util.upsertQueryData('getLoggedInUser', undefined, user))
    } catch (err) { }
}

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLoggedInUser: builder.query({
            query: () => ({ url: '/users', method: 'GET' }),
            transformResponse: transformResData,
            providesTags: ['User']
        }),
        login: builder.mutation({
            query: (body) => ({ url: '/auth/login', method: 'POST', body }),
            transformResponse: transformResData,
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                await syncLoggedInUser(dispatch, queryFulfilled)
            }
        }),
        signup: builder.mutation({
            query: (body) => ({ url: '/users', method: 'POST', body }),
            transformResponse: transformResData,
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                await syncLoggedInUser(dispatch, queryFulfilled)
            }
        }),
        getUserById: builder.query({
            query: (uid) => ({ url: `/search/id?id=${uid}`, method: 'GET' }),
            transformResponse: transformResData,
            providesTags: (result, error, uid) => [{ type: 'User', id: uid }]
        })
    })
})

export const { useGetLoggedInUserQuery, useLoginMutation, useSignupMutation, useGetUserByIdQuery } = userApi
export default userApi


// onQueryStarted is a lifecycle hook that runs when mutation is initiated. It allows us to perform side effects, such as updating the cache or dispatching actions.
// thats why we "await queryFulfilled" to ensure that the mutation has completed before we update the cache
// We did not use invalidateTags because if we invalidated the cache, it would trigger a refetch of the user data, which is unnecessary

// upsertQueryData is used to replace cache
// updateQueryData is used to update cache
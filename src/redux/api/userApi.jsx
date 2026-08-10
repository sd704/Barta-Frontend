import baseApi from "./baseApi"
import { GET_USER, LOGIN, SIGNUP, GET_USER_BY_ID, UPDATE_USER, LOGOUT } from "../../utils/ApiRoutes"
import { clearPresence } from "../presenceSlice"

const transformResData = (res) => {
    const user = res?.data
    if (!user) return null
    return { ...user, name: `${user.firstName} ${user.lastName}` }
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
            query: () => GET_USER(),
            transformResponse: transformResData,
            providesTags: ['User']
        }),
        login: builder.mutation({
            query: (body) => ({ ...LOGIN(), body }),
            transformResponse: transformResData,
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                await syncLoggedInUser(dispatch, queryFulfilled)
            }
        }),
        signup: builder.mutation({
            query: (body) => ({ ...SIGNUP(), body }),
            transformResponse: transformResData,
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                await syncLoggedInUser(dispatch, queryFulfilled)
            }
        }),
        getUserById: builder.query({
            query: (uid) => GET_USER_BY_ID(uid),
            transformResponse: transformResData,
            providesTags: (result, error, uid) => [{ type: 'User', id: uid }]
        }),
        updateUser: builder.mutation({
            query: (body) => ({ ...UPDATE_USER(), body }),
            transformResponse: (res) => res?.updatedFields,
            // invalidatesTags: ['User'],
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedFields } = await queryFulfilled
                    if (!updatedFields) return

                    // We could use invalidatesTags, that will refetch
                    // But we have the changes, so better merge and avoid api call

                    dispatch(baseApi.util.updateQueryData('getLoggedInUser', undefined, (draft) => {
                        Object.assign(draft, updatedFields)
                        if (updatedFields.firstName || updatedFields.lastName) {
                            draft.name = `${draft.firstName} ${draft.lastName}` // Update 'name'
                        }
                    }))
                } catch (err) { }
            }
        }),
        logout: builder.mutation({
            query: () => LOGOUT(),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(baseApi.util.resetApiState()) // clears all RTK cache
                    dispatch(clearPresence())
                } catch (err) { }
            }
        })
    })
})

export const {
    useGetLoggedInUserQuery,
    useLoginMutation,
    useSignupMutation,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useLogoutMutation
} = userApi
export default userApi


// onQueryStarted is a lifecycle hook that runs when mutation is initiated. It allows us to perform side effects, such as updating the cache or dispatching actions.
// thats why we "await queryFulfilled" to ensure that the mutation has completed before we update the cache
// We did not use invalidateTags because if we invalidated the cache, it would trigger a refetch of the user data, which is unnecessary

// upsertQueryData is used to replace cache
// updateQueryData is used to update cache
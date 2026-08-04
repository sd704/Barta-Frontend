import baseApi from "./baseApi"

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLoggedInUser: builder.query({
            query: () => ({ url: '/users', method: 'GET' }),
            transformResponse: (res) => ({ ...res.data, isOnline: false }),
            providesTags: ['User']
        })
    })
})

export const { useGetLoggedInUserQuery } = userApi
export default userApi
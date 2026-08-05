import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/ApiRoutes'

const baseApi = createApi({
    reducerPath: 'apiData',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include'
    }),
    tagTypes: ['User', 'Chats'], // tagTypes are used to declare the label types we can use in our API
    endpoints: () => ({}) // We will add endpoints via injectEndpoints in other files
})

export default baseApi
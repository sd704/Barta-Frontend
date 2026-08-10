import { configureStore } from "@reduxjs/toolkit"
import baseApi from "./api/baseApi"
import userApi from "./api/userApi" // Intentional side-effect import to register the endpoints with baseApi
import chatApi from "./api/chatApi" // Intentional side-effect import
import connectionsApi from "./api/connectionsApi" // Intentional side-effect import
import requestsApi from "./api/requestsApi" // Intentional side-effect import
import presenceReducer from "./presenceSlice"

const appStore = configureStore({
    reducer: {
        presence: presenceReducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
})

export default appStore
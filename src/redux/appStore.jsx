import { configureStore } from "@reduxjs/toolkit"
import baseApi from "./api/baseApi"
import userApi from "./api/userApi" // Intentional side-effect import to register the endpoints with baseApi
import chatApi from "./api/chatApi" // Intentional side-effect import
import connectionsApi from "./api/connectionsApi" // Intentional side-effect import
import requestsApi from "./api/requestsApi" // Intentional side-effect import
import userReducer from "./userSlice"
import peopleSlice from "./peopleSlice"
import messageSlice from "./messageSlice"
import presenceReducer from "./presenceSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        people: peopleSlice,
        messages: messageSlice,
        presence: presenceReducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
})

export default appStore
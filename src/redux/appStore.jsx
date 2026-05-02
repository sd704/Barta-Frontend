import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import peopleSlice from "./peopleSlice"
import messageSlice from "./messageSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        people: peopleSlice,
        messages: messageSlice
    }
})

export default appStore
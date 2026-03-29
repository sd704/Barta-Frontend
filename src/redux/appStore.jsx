import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import connectionReducer from "./connectionSlice"
import peopleSlice from "./peopleSlice"
import messageSlice from "./messageSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        connection: connectionReducer,
        people: peopleSlice,
        messages: messageSlice
    }
})

export default appStore
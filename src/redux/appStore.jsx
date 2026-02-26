import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import connectionReducer from "./connectionSlice"
import peopleSlice from "./peopleSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        connection: connectionReducer,
        people: peopleSlice
    }
})

export default appStore
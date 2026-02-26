import { createSlice } from "@reduxjs/toolkit";

const peopleSlice = createSlice({
    name: 'people',
    initialState: {},
    reducers: {
        addPerson: (state, action) => {
            const personData = action.payload
            if (!personData?._id) return
            state[personData._id] = personData
        },
        removePerson: (state, action) => {
            const id = action.payload
            delete state[id]
        },
        clearPeople: () => {
            return {}
        }
    }
})

export const { addPerson, removePerson, clearPeople } = peopleSlice.actions
export default peopleSlice.reducer
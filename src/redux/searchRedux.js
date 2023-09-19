import {
    createSlice
} from "@reduxjs/toolkit"

const searchSlice = createSlice({
    name: "search",
    initialState: {
        value: null
    },
    reducers: {
        update: (state, action) => {
            state.value = action.payload
        }
    }
})


export const {
    update
} = searchSlice.actions;
export default searchSlice.reducer;
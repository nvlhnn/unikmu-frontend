/* eslint-disable no-dupe-keys */
import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit"
import {
    publicRequest,
    userRequest
} from "../requestMethod"


export const getCart = createAsyncThunk("carts/get", async (token) => {
    const res = await userRequest(token).get('/carts')
    // await console.log(res.data.json())
    return await res.data
})


export const addCart = createAsyncThunk("carts/add", async (data) => {

    const res = await userRequest(data.token).post('/carts', data.body, {
        header: {
            "Authorization": data.token
        }
    })
    return res.data
})

export const deleteCart = createAsyncThunk("carts/delete", async (data) => {

    const res = await userRequest(data.token).delete(`/carts/${data.params.productId}/${data.params.code}/${data.params.size}`, {
        header: {
            "Authorization": data.token
        }
    })
    return res.data
})

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        data: null,
        totalQty: 0,
        pending: false,
        error: false
    },

    extraReducers: {
        [getCart.pending]: (state) => {
            state.pending = true;
            state.error = false;
        },
        [getCart.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.totalQty = action.payload ? action.payload.totalQty : 0
            state.pending = false;
        },
        [getCart.rejected]: (state) => {
            state.pending = false;
            state.error = true;
        },
        [addCart.pending]: (state) => {
            state.pending = true;
            state.error = false;
        },
        [addCart.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.totalQty = action.payload.totalQty
            state.pending = false;
        },
        [addCart.rejected]: (state) => {
            state.pending = false;
            state.error = true;
        },
        [deleteCart.fulfilled]: (state, action) => {
            state.pending = false;
            state.error = false;
        },
    },
})


export const {
    reset
} = cartSlice.actions;
export default cartSlice.reducer;
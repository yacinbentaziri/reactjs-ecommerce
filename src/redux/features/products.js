import { createSlice } from "@reduxjs/toolkit"


export const productsSlice = createSlice({
    name: "products",
    initialState: { value: JSON.parse(localStorage.getItem('products')) || [] },
    reducers: {
        addItem: (state, action) => {
            state.value.push(action.payload)
            localStorage.setItem("products", JSON.stringify(state.value));
        },
        removeItem: (state, action) => {
            state.value = state.value.filter(item => item._id !== action.payload._id);
            localStorage.setItem("products", JSON.stringify(state.value));
        },
        removeAllItem: (state) => {
            state.value = []
            localStorage.setItem("products", JSON.stringify([]));

        }
    }
})
export const { addItem, removeItem, removeAllItem } = productsSlice.actions
export default productsSlice.reducer

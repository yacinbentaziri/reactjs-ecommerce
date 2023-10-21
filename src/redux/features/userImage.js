import { createSlice } from "@reduxjs/toolkit"

const userLocalStorage = localStorage.getItem('user');
const user = userLocalStorage && JSON.parse(userLocalStorage);

export const userImageSlice = createSlice({
    name: "userImage",
    initialState: { value: user && user.data.image ? user.data.image : '' },
    reducers: {
        setUserImage: (state, action) => {
            state.value = action.payload
        },
    }
})
export const { setUserImage } = userImageSlice.actions
export default userImageSlice.reducer

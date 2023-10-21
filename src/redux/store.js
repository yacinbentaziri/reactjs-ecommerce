import { configureStore } from "@reduxjs/toolkit"
import productsReducer from "./features/products"

import userImageReducer from "./features/userImage"

export const store = configureStore({
    reducer: {
        products: productsReducer,
        userImage: userImageReducer
    }
})

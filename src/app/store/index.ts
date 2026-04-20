import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../../features/product/slices/productSlice.ts"
import cartReducer from "../../features/cart/slices/cartSlices.ts"

export const store = configureStore({
    reducer: {
        product: productReducer,
        cart : cartReducer
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
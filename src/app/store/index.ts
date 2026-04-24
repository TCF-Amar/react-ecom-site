import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../../features/product/productSlice.ts"
import cartReducer from "../../features/cart/cartSlices.ts"
import adminReducer from "../../features/admin/adminSlice.ts"

export const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        admin: adminReducer
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../../features/product/slices/productSlice.ts"
import cartReducer from "../../features/cart/slices/cartSlices.ts"
import adminReducer from "../../features/admin/slices/index.ts"

export const store = configureStore({
    reducer: {
        product: productReducer,
        cart : cartReducer,
        admin: adminReducer
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
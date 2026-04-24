import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AddToCartData, CartData, CartState } from "./cartTypes";
import { addProductInCart, getCartProducts } from "./firebaseCartServices";
import { Timestamp } from "firebase/firestore";


export const fetchCartData = createAsyncThunk<
    CartData[],
    string,
    { rejectValue: string }
>(
    "cart/fetchCart",
    async (uid, { rejectWithValue }) => {
        try {
            return await getCartProducts(uid);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to fetch cart";
            return rejectWithValue(message);
        }
    }
);



export const addToCart = createAsyncThunk<
    CartData,
    AddToCartData,
    { rejectValue: string }
>(
    "cart/addToCart",
    async ({ uid, product, quantity, sizes }, { rejectWithValue }) => {
        try {

            const cartData: CartData = { product, quantity, sizes, createdAt: Timestamp.now() };
            await addProductInCart(uid, product.slug, cartData);

            return cartData;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to add to cart";
            return rejectWithValue(message);
        }
    }
);

const initialState: CartState = {
    items: [],
    loading: false,
    error: null
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        incrementCartItem(state, action: PayloadAction<{ slug: string; sizes: string }>) {
            const item = state.items.find(
                (i) => i.product.slug === action.payload.slug && i.sizes === action.payload.sizes
            );
            if (item) item.quantity += 1;
        },

        decrementCartItem(state, action: PayloadAction<{ slug: string; sizes: string }>) {

            const index = state.items.findIndex(
                (i) =>
                    i.product.slug === action.payload.slug &&
                    i.sizes === action.payload.sizes
            );
            if (index === -1) return;
            const item = state.items[index];

            if (item.quantity > 1) {
                item.quantity -= 1;
            }

        },

        removeItemFromCart(state, action: PayloadAction<{ slug: string; sizes: string }>) {

            const index = state.items.findIndex(
                (i) =>
                    i.product.slug === action.payload.slug &&
                    i.sizes === action.payload.sizes
            );
            if (index === -1) return;
            state.items.splice(index, 1);
        },
        clearCart(state) {
            state.items = []

        }


    }, extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                const { product, sizes, quantity } = action.payload;
                const exist = state.items.findIndex((item) => item.product.slug === product.slug && item.sizes === sizes);
                if (exist !== -1) {
                    state.items[exist].quantity += quantity;

                } else {
                    state.items.push(action.payload)
                }

            })
            .addCase(addToCart.rejected, (state,) => {
                state.loading = false;
                state.error = "Something went wrong"
            })
            .addCase(fetchCartData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartData.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCartData.rejected, (state) => {
                state.loading = false;
                state.error = "Something went Wrong"
            })
        // .addCase(updateCartItemQty.pending, (state) => {
        //     // state.loading = true;
        //     state.error = null;
        // })
        // .addCase(updateCartItemQty.fulfilled, (state) => {
        //     state.loading = false;
        //     // state.error = null;
        // })
        // .addCase(updateCartItemQty.rejected, (state) => {
        //     state.loading = false;
        //     state.error = "Something went wrong";
        // })

    }

});

export const { incrementCartItem, decrementCartItem, removeItemFromCart, clearCart } =
    cartSlice.actions;


export default cartSlice.reducer
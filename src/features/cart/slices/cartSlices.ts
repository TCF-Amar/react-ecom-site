import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartData } from "../types";
import { addProductInCart, getCartProducts } from "../services/firebaseCartServices";
import type { Product } from "../../product/types";


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

export interface AddToCartData {
    uid: string;
    product: Product;
    quantity: number;
    sizes?: string;
}

export const addToCart = createAsyncThunk<
    CartData,
    AddToCartData,
    { rejectValue: string }
>(
    "cart/addToCart",
    async ({ uid, product, quantity, sizes = "M" }, { rejectWithValue }) => {
        try {
            const cartData: CartData = { product, quantity, sizes };
            await addProductInCart(uid, product.slug, cartData);

            return cartData;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to add to cart";
            return rejectWithValue(message);
        }
    }
);



interface CartState {
    items: CartData[];
    loading: boolean;
    error: string | null;
}


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
            else {

                state.items.splice(index, 1);
            }
        },


    }, extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
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

                console.log("data add huaa");


            })
            .addCase(addToCart.rejected, (state,) => {
                state.loading = false;
                state.error = "Something went wrong"
            }).addCase(fetchCartData.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).addCase(fetchCartData.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            }).addCase(fetchCartData.rejected, (state) => {
                state.loading = false;
                state.error = "Something went Wrong"
            })
    }

});

export const { incrementCartItem, decrementCartItem } =
    cartSlice.actions;


export default cartSlice.reducer
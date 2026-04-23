import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { getMyProducts, addProduct as addProductAPI, updateProduct as updateProductAPI, deleteProduct as deleteProductAPI } from "../services/adminApiServices";
import type { AddProductData, FireStoreProductModel } from "../types";
import toast from "react-hot-toast";

export const fetchMyProducts = createAsyncThunk(
    'admin/fetchMyProducts',
    async (uid: string) => getMyProducts(uid)
);

export const addProduct = createAsyncThunk(
    'admin/addProduct',
    async ({ product, uid }: { product: AddProductData; uid: string }) => {
        const res = await addProductAPI(product, uid);
        return res.firestoreProduct;
    }
);

export const updateProduct = createAsyncThunk(
    'admin/updateProduct',
    async ({ product, productId, uid }: { product: Partial<AddProductData>; productId: number; uid: string }) => {
        const res = await updateProductAPI(product, productId, uid);
        return res.firestoreProduct;
    }
);

export const deleteProduct = createAsyncThunk(
    'admin/deleteProduct',
    async ({ productId, uid }: { productId: number; uid: string }) => {
        await deleteProductAPI(productId, uid);
        return productId;
    }
);

interface AdminState {
    myProducts: FireStoreProductModel[];
    loading: boolean;
    adding: boolean;
    updating: boolean;
    deleting: boolean;
    error: string | null;
}


const initialState: AdminState = {
    myProducts: [],
    loading: false,
    adding: false,
    updating: false,
    deleting: false,
    error: null,
};
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyProducts.pending, (state) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(fetchMyProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.myProducts = action.payload;
            })
            .addCase(fetchMyProducts.rejected, (s, a: PayloadAction<unknown>) => {
                s.error = String(a.payload);
                s.loading = false;
            })
            .addCase(addProduct.pending, (state) => {
                state.adding = true;
                state.error = null;

            })
            .addCase(addProduct.fulfilled, (state, action: PayloadAction<any>) => {
                state.adding = false;
                state.myProducts.push(action.payload);
            })
            .addCase(addProduct.rejected, (s, a: PayloadAction<unknown>) => {
                s.error = String(a.payload);
                toast.error("Kuchh toh gadbad  hai  ")
                s.adding = false;
            })
            .addCase(updateProduct.pending, (state) => {
                state.updating = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.updating = false;
                const index = state.myProducts.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.myProducts[index] = action.payload;
                }
                toast.success("Product updated kar diya ");
            })
            .addCase(updateProduct.rejected, (s, a) => {
                s.error = String(a.payload);
                toast.error("Field ho gaya ");
                s.updating = false;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.deleting = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
                state.deleting = false;

                state.myProducts = state.myProducts.filter(
                    (item) => item.id !== action.payload
                );

                toast.success("Product deleted kar diya ");
            })
            .addCase(deleteProduct.rejected, (s, a: PayloadAction<unknown>) => {
                s.error = String(a.payload);
                toast.error(" product delete nahi huaa");
                s.deleting = false;
            })

    }
})

export default adminSlice.reducer;
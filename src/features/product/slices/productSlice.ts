import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Category, Product, ProductState } from "../types"
import axiosInstance from "../../../utils/axiosInstance";



export const fetchCategories = createAsyncThunk("product/fetchCategories", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get("categories");
        return res.data;
    } catch (e: any) {
        return rejectWithValue(e.message);
    }
})

interface ProductFetchPara {
    offset: number;
    limit: number;
    query?: string;
    categoryId?: number;
}

export const fetchProducts = createAsyncThunk<Product[], ProductFetchPara, { rejectValue: string }>(
    "product/fetchProducts",
    async (p, { rejectWithValue }) => {

        const params = new URLSearchParams({
            offset: String(p.offset),
            limit: String(p.limit),
            ...(p.query?.trim() && { title: p.query.trim() }),
            ...(p.categoryId?.toString().trim() &&
                { categoryId: p.categoryId.toString().trim() }),

        })

        try {
            const res = await axiosInstance.get(
                `products?${params}`
            );

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to fetch products");
        }
    }
);

const initialState: ProductState = {
    allProducts: [],
    categories: [],
    loading: false,
    error: null,
    hasMore: true
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        resetProduct: (state) => {
            state.allProducts = [];
            state.hasMore = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error
            })
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;

                if (action.payload.length === 0) {
                    state.hasMore = false;
                    return;
                }

                const existingIds = new Set(state.allProducts.map(p => p.id));
                const newProducts = action.payload.filter(p => !existingIds.has(p.id));

                state.allProducts = [...state.allProducts, ...newProducts];
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error
            })
    }
})
export const { resetProduct } = productSlice.actions;
export default productSlice.reducer
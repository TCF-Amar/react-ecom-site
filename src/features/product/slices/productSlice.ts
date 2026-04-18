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
    limit: number
}

export const fetchProducts = createAsyncThunk<Product[], ProductFetchPara, { rejectValue: string }>(
    "product/fetchProducts",
    async (p, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(
                `products?offset=${p.offset}&limit=${p.limit}`
            );

            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to fetch products");
        }
    }
);

const initialState: ProductState = {
    products: [],
    allProducts:[],
    categories: [],
    loading: false,
    error: null,
    hasMore: true
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
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
            .addCase(fetchProducts.fulfilled, (state,action) => {
                state.loading = false;
                
                state.products = action.payload;
                state.allProducts = [...state.allProducts, ...action.payload];

                if (action.payload.length === 0) {
                    state.hasMore = false;
                }
             })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error
            })
    }
})

export default productSlice.reducer
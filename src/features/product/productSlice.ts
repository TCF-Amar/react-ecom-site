import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Category, Product, ProductState } from "./productTypes"
import { fetchCategoriesFromFirestore } from "./productFirebaseServices";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";


export const fetchCategories = createAsyncThunk("product/fetchCategories", async (_, { rejectWithValue }) => {
    try {
        const categories = await fetchCategoriesFromFirestore();
        return categories;
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : "Something went wrong"
        );
    }
})

const initialState: ProductState = {
    products: [],
    categories: [],
    loading: false,
    error: null,
    hasMore: true,
    searchQuery: "",
    categoryId: [],
    priceRange: [0, 500000],
    sortBy: "createdAt",
    sortOrder: "desc",

}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        resetProduct: (state) => {
            state.products = [];
            state.hasMore = true;
            state.error = null;
            state.loading = false;

        },

        addProducts: (
            state,
            action: PayloadAction<{
                products: Product[];
                hasMore: boolean;
            }>
        ) => {
            const existingIds = new Set(state.products.map(p => p.id));

            const newProducts = action.payload.products.filter(
                p => !existingIds.has(p.id)
            );

            state.products.push(...newProducts);
            state.hasMore = action.payload.hasMore;

        },

        setProductsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        setProductsError: (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        },

        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },

        setCategoryId: (state, action: PayloadAction<number[] | null>) => {
            state.categoryId = action.payload;
        },

        setPriceRange: (state, action: PayloadAction<[number, number] | null>) => {
            state.priceRange = action.payload;
        },
        setSortBy: (state, action: PayloadAction<"title" | "price" | "rating" | "createdAt">) => {
            state.sortBy = action.payload;
        },
        setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
            state.sortOrder = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload || "Failed to load categories";
            })
    }
})

export const {
    resetProduct,
    addProducts,
    setProductsLoading,
    setProductsError,
    setSearchQuery,
    setCategoryId,
    setPriceRange,
    setSortBy,
    setSortOrder,
} = productSlice.actions;

// re-export DocumentData type so hook imports stay clean
export type { DocumentData, QueryDocumentSnapshot };

export default productSlice.reducer
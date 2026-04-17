import { createSlice } from "@reduxjs/toolkit"


interface ProductState { 
    products: any[],
    categories: any[],
    loading: boolean,
    error: any
}

const initState: ProductState = {
    products: [],
    categories: [],
    loading: false,
    error: null
}

export const productSlice = createSlice({
    name: "product",
    initialState: initState,
    reducers: {},
    // extraReducers: ((builder) => {
        
    // })
})

export default productSlice.reducer
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createProduct, fetchProducts } from "../thunks/productsThunk";


const productsSlice = createSlice({
    name: 'product',
    initialState: {
        data: [] as any,
        isLoading: false,
        error: undefined as any
    },
    reducers: {},
    extraReducers(builder) {

        // Get Products
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        // Create Product
        builder.addCase(createProduct.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

    },
});

export const productsReducer = productsSlice.reducer;

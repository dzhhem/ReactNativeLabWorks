import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockProducts } from '../utils/data';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(mockProducts);
                }, 800);
            });
        } catch (error) {
            return rejectWithValue('Помилка при завантаженні товарів: ' + error.message);
        }
    }
);

const initialState = {
    items: [],
    status: 'idle',
    error: null
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectProductById = (state, productId) => state.products.items.find(product => product.id === productId);

export default productsSlice.reducer;
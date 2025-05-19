import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    status: 'idle',
    error: null
};

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const newOrder = {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                ...orderData
            };

            return newOrder;
        } catch (error) {
            return rejectWithValue('Помилка при створенні замовлення: ' + error.message);
        }
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders.push(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const selectAllOrders = (state) => state.orders.orders;
export const selectOrdersStatus = (state) => state.orders.status;
export const selectOrdersError = (state) => state.orders.error;

export default ordersSlice.reducer;
import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalAmount: 0
};

const recalculateTotalAmount = (items) =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, name, price, imageUrl } = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
            } else {
                state.items.push({
                    id,
                    name,
                    price,
                    imageUrl,
                    quantity: 1,
                    totalPrice: price
                });
            }

            state.totalAmount = recalculateTotalAmount(state.items);
        },

        increaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.items.find(item => item.id === id);

            if (item) {
                item.quantity += 1;
                item.totalPrice = item.price * item.quantity;
                state.totalAmount = recalculateTotalAmount(state.items);
            }
        },

        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.items.find(item => item.id === id);

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    item.totalPrice = item.price * item.quantity;
                } else {
                    state.items = state.items.filter(item => item.id !== id);
                }

                state.totalAmount = recalculateTotalAmount(state.items);
            }
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
            state.totalAmount = recalculateTotalAmount(state.items);
        },

        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
        }
    }
});

export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (items) => items.reduce((count, item) => count + item.quantity, 0)
);

export default cartSlice.reducer;
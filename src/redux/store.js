import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import ordersReducer from './ordersSlice';

const cartPersistConfig = {
    key: 'cart',
    storage: AsyncStorage,
    whitelist: ['items', 'totalAmount']
};

const ordersPersistConfig = {
    key: 'orders',
    storage: AsyncStorage,
    whitelist: ['orders']
};

const userPersistConfig = {
    key: 'user',
    storage: AsyncStorage,
    whitelist: ['name', 'email']
};

const rootReducer = combineReducers({
    products: productsReducer,
    cart: persistReducer(cartPersistConfig, cartReducer),
    user: persistReducer(userPersistConfig, userReducer),
    orders: persistReducer(ordersPersistConfig, ordersReducer)
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
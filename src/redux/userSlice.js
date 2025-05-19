import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            const { name, email } = action.payload;
            state.name = name;
            state.email = email;
        },
        clearUserData: (state) => {
            state.name = '';
            state.email = '';
        }
    }
});

export const { setUserData, clearUserData } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;

const selectUser = (state) => state.user;

export const selectUserData = createSelector(
    [selectUser],
    (user) => ({
        name: user.name,
        email: user.email
    })
);

export default userSlice.reducer;
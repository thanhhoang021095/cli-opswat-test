import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogged: false,
    loadingApp: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state) => {
            state.isLogged = true;
            return state;
        },
        loginFail: (state) => {
            state.isLogged = false;
            return state;
        },
        reloadApp: (state, action) => {
            state.loadingApp = action.payload;
            return state;
        }
    },
});

export const { loginSuccess } = userSlice.actions;

export default userSlice.reducer;

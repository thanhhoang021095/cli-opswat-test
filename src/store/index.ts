import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './userSlice';

const rootReducer = combineReducers({
    user: userSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
export default store;
import { configureStore } from '@reduxjs/toolkit';
import headerSlice from '../features/header/headerSlice';
import userSlice from '../features/users/userSlice';

export const store = configureStore({
    reducer: {
        button_menu: headerSlice,
        user: userSlice
    },
});
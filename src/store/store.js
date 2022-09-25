import { configureStore } from '@reduxjs/toolkit';

import headerSlice from '../features/header/headerSlice';
import aboutProductSlice from '../features/modal/about-productSlice';
import addProductSlice from '../features/modal/add-productSlice';
import userSlice from '../features/users/userSlice';

export const store = configureStore({
    reducer: {
        button_menu: headerSlice,
        user: userSlice,
        modal_add_product: addProductSlice,
        modal_about_product: aboutProductSlice,
    },
});
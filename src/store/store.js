import { configureStore } from '@reduxjs/toolkit';


import headerSlice from '../features/header/headerSlice';
import aboutProductSlice from '../features/modal/about-productSlice';
import addProductSlice from '../features/modal/add-productSlice';
import receiptProductSlice from '../features/modal/receipt-productSlice';
import transferProductSlice from '../features/modal/transfer-productSlice';
import userSlice from '../features/users/userSlice';
import appSlice from '../features/app/appSlice';



export const store = configureStore({
    reducer: {
        appStatus: appSlice,
        button_menu: headerSlice,
        user: userSlice,
        modal_add_product: addProductSlice,
        modal_about_product: aboutProductSlice,
        modal_receipt_product: receiptProductSlice,
        modal_transfer_product: transferProductSlice,
    },
});
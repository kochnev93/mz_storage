import { configureStore } from '@reduxjs/toolkit';


import headerSlice from '../features/header/headerSlice';
import aboutProductSlice from '../features/modal/about-productSlice';
import addProductSlice from '../features/modal/add-productSlice';
import receiptProductSlice from '../features/modal/receipt-productSlice';
import transferProductSlice from '../features/modal/transfer-productSlice';
import rateProductSlice from '../features/modal/rate-productSlice';
import userSlice from '../features/users/userSlice';
import appSlice from '../features/app/appSlice';
import dashboard  from '../features/dashboard/dashboardSlice';
import addWarehouseSlice from '../features/modal/add-warehouseSlice';
import transferSomeProductSlice from '../features/modal/transfer-someProductsSlice';
import aboutReceiptSlice from '../features/modal/about-receiptSlice';
import adminUsersSlice from '../features/admin/adminUsersSlice';
import addUserSlice  from '../features/modal/add-userSlice';
import aboutUserSlice from '../features/modal/about-userSlice';
import dialog  from '../features/dialog/dialogSlice';
import transferPageSlice  from '../features/transfers/transfers-pageSlice';


export const store = configureStore({
    reducer: {
        app_state: appSlice,
        button_menu: headerSlice,
        user: userSlice,
        modal_add_product: addProductSlice,
        modal_about_product: aboutProductSlice,
        modal_receipt_product: receiptProductSlice,
        modal_transfer_product: transferProductSlice,
        modal_rate_product: rateProductSlice,
        dashboard: dashboard,
        modal_add_warehouse: addWarehouseSlice,
        modal_transfer_someProducts: transferSomeProductSlice,
        modal_about_receipt: aboutReceiptSlice,
        usersList: adminUsersSlice,
        modal_add_user: addUserSlice,
        modal_about_user: aboutUserSlice,
        dialog: dialog,
        transferPage: transferPageSlice,
    },
});
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    active: false,
    product: null,
    acitve_product: null,
    errors: false,
    message: '',
    reset: false,
    isLoading: false,
}

export const transferProductSlice = createSlice({
    name: 'modal_transfer_product',
    initialState,
    reducers: {
        setActiveTransfer: (state, action) => {
            state.active = action.payload.active
            state.product = action.payload.product
            state.acitve_product = action.payload.acitve_product
        },
        setErrorsTransfer: (state, action) => {
            state.errors = action.payload.errors
        },
        setMessageTransfer: (state, action) => {
            state.message = action.payload.message
            state.errors = action.payload.errors
        },
        setResetTransfer: (state, action) => {
            state.reset = action.payload.reset
        },
        setIsLoadingTransfer: (state, action) => {
            state.isLoading = action.payload.isLoading
        },
        editProductTransfer: (state, action) => {
            const new_warehouse_id = action.payload.new_warehouse[0].id;
            const new_warehouse_title = action.payload.new_warehouse[0].title;
            state.product.warehouse_id = new_warehouse_id;
            state.product.warehouse_title = new_warehouse_title;
        },
        setDefaultTransfer: (state, action) => {
            state.errors = false,
            state.message = '',
            state.reset = false,
            state.isLoading = false
        },
    }
});

export const {setActiveTransfer, setErrorsTransfer, setMessageTransfer, setResetTransfer, setIsLoadingTransfer, editProductTransfer, setDefaultTransfer} = transferProductSlice.actions
export default transferProductSlice.reducer
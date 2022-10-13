import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    active: false,
    errors: false,
    message: '',
    reset: false,
    isLoading: false,
}

export const receiptProductSlice = createSlice({
    name: 'modal_receipt_product',
    initialState,
    reducers: {
        setActiveReceipt: (state, action) => {
            state.active = action.payload.active
        },
        setErrorsReceipt: (state, action) => {
            state.errors = action.payload.errors
        },
        setMessageReceipt: (state, action) => {
            state.message = action.payload.message
            state.errors = action.payload.errors
        },
        setResetReceipt: (state, action) => {
            state.reset = action.payload.reset
        },
        setIsLoadingReceipt: (state, action) => {
            state.isLoading = action.payload.isLoading
        },
        setDefaultReceipt: (state, action) => {
            state.errors = false,
            state.message = '',
            state.reset = false,
            state.isLoading = false
        },
    }
});

export const {setActiveReceipt, setErrorsReceipt, setMessageReceipt, setResetReceipt, setIsLoadingReceipt, setDefaultReceipt} = receiptProductSlice.actions
export default receiptProductSlice.reducer
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    active: false,
    product: null,
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
        setDefaultTransfer: (state, action) => {
            state.errors = false,
            state.message = '',
            state.reset = false,
            state.isLoading = false
        },
    }
});

export const {setActiveTransfer, setErrorsTransfer, setMessageTransfer, setResetTransfer, setIsLoadingTransfer, setDefaultTransfer} = transferProductSlice.actions
export default transferProductSlice.reducer
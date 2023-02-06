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

export const rateProductSlice = createSlice({
    name: 'modal_rate_product',
    initialState,
    reducers: {
        setActiveRate: (state, action) => {
            state.active = action.payload.active
            state.product = action.payload.product
        },
        setErrorsRate: (state, action) => {
            state.errors = action.payload.errors
        },
        setMessageRate: (state, action) => {
            state.message = action.payload.message
            state.errors = action.payload.errors
        },
        setResetRate: (state, action) => {
            state.reset = action.payload.reset
        },
        setIsLoadingRate: (state, action) => {
            state.isLoading = action.payload.isLoading
        },
        setDefaultRate: (state, action) => {
            state.errors = false,
            state.message = '',
            state.reset = false,
            state.isLoading = false
        },
        editRateProduct: (state, action) => {
            state.product.count -= action.payload.rateCount;
        }
    }
});

export const {setActiveRate, setErrorsRate, setMessageRate, setResetRate, setIsLoadingRate, setDefaultRate, editRateProduct} = rateProductSlice.actions
export default rateProductSlice.reducer
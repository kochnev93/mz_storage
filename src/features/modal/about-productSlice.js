import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    active: false,
    product_id: null,
    errors: false,
    message: '',
    reset: false,
    isLoading: false,
}

export const aboutProductSlice = createSlice({
    name: 'modal_about_product',
    initialState,
    reducers: {
        setActive: (state, action) => {
            state.active = action.payload.active
            state.product_id = action.payload.product_id || state.product_id
        },
        setErrors: (state, action) => {
            state.errors = action.payload.errors
        },
        setMessage: (state, action) => {
            state.message = action.payload.message
        },
        setReset: (state, action) => {
            state.reset = action.payload.reset
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload.isLoading
        },
        setDefault: (state, action) => {
            state.errors = false,
            state.message = '',
            state.reset = false,
            state.isLoading = false
        },
    }
});

export const {setActive, setErrors, setMessage, setReset, setIsLoading, setDefault} = aboutProductSlice.actions
export default aboutProductSlice.reducer
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    active: false,
    errors: false,
    message: '',
    reset: false,
    isLoading: false,
}

export const addProductSlice = createSlice({
    name: 'modal_add_product',
    initialState,
    reducers: {
        setActive: (state, action) => {
            state.active = action.payload.active
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

export const {setActive, setErrors, setMessage, setReset, setIsLoading, setDefault} = addProductSlice.actions
export default addProductSlice.reducer
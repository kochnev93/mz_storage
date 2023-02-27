import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    active: false,
    errors: false,
    message: '',
    reset: false,
    isLoading: false
}

export const addWarehouseSlice = createSlice({
    name: 'modal_add_warehouse',
    initialState,
    reducers: {
        setActiveWarehouse: (state, action) => {
            state.active = action.payload.active
        },
        setErrorsWarehouse: (state, action) => {
            state.errors = action.payload.errors
        },
        setMessageWarehouse: (state, action) => {
            state.message = action.payload.message
        },
        setResetWarehouse: (state, action) => {
            state.reset = action.payload.reset
        },
        setIsLoadingWarehouse: (state, action) => {
            state.isLoading = action.payload.isLoading
        },
        setDefaultWarehouse: (state, action) => {
            state.errors = false,
            state.message = '',
            state.reset = false,
            state.isLoading = false
        },
    }
});

export const {setActiveWarehouse, setErrorsWarehouse, setMessageWarehouse, setResetWarehouse, setIsLoadingWarehouse, setDefaultWarehouse} = addWarehouseSlice.actions
export default addWarehouseSlice.reducer
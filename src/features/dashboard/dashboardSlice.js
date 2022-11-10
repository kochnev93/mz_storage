import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    products: [],
}

export const dashboard = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        addProducts: (state, action) => {
            state.products = action.payload.products
        },
    }
});

export const {addProducts} = dashboard.actions
export default dashboard.reducer
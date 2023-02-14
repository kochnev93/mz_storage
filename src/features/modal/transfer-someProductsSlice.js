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

export const transferSomeProductSlice = createSlice({
    name: 'modal_transfer_someProducts',
    initialState,
    reducers: {
        setActiveSomeTransfer: (state, action) => {
            state.active = action.payload.active
        }
    }
});

export const {setActiveSomeTransfer} = transferSomeProductSlice.actions
export default transferSomeProductSlice.reducer
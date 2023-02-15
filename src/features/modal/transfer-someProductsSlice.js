import {createSlice} from '@reduxjs/toolkit';

const initialValidation = {
    warehouseFrom: {
        status: true,
        message: null,
    },
    warehouseTo: {
        status: true,
        message: null,
    },
    products: {
        status: true,
        message: null,
    }
}

const initialState = {
    active: false,
    errors: false,
    message: '',
    reset: false,
    isLoading: false,
    //
    products: [],
    warehouseFrom: [],
    warehouseTo: [],
    //
    validation: initialValidation
}

export const transferSomeProductSlice = createSlice({
    name: 'modal_transfer_someProducts',
    initialState,
    reducers: {
        setActiveSomeTransfer: (state, action) => {
            state.active = action.payload.active
        },

        setResetSomeTransfer: (state, action) => {
            state.reset = action.payload.reset;
        },

        setProductSomeTransfer: (state, action) => {
            if (action.payload.length == 0) {
              state.products = [];
            } else {
              state.products = [{ ...action.payload[0] }];
            }
          },

          setWarehouseFromSomeTransfer: (state, action) => {
            if (action.payload.length == 0) {
              state.warehouseFrom = [];
            } else {
              state.warehouseFrom = [{ ...action.payload[0] }];
            }
          },

          setWarehouseToSomeTransfer: (state, action) => {
            if (action.payload.length == 0) {
              state.warehouseTo = [];
            } else {
              state.warehouseTo = [{ ...action.payload[0] }];
            }
          },
    }
});

export const {
    setActiveSomeTransfer,
    setProductSomeTransfer,
    setResetSomeTransfer,
    setWarehouseFromSomeTransfer,
    setWarehouseToSomeTransfer,
} = transferSomeProductSlice.actions
export default transferSomeProductSlice.reducer
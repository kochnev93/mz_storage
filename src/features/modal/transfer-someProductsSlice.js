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
    products: [
      {
        id: 1,
        name: 'Монитор 1',
        sn: 'ert45e',
        count: 1,
        countTransfer: 0,
        validationCountTransfer: true,
        accounting_sn: true
      },
      {
        id: 2,
        name: 'Кабель hdmi',
        sn: null,
        count: 12,
        countTransfer: 0,
        validationCountTransfer: true,
        accounting_sn: false
      },
      {
        id: 3,
        name: 'Монитор 3',
        sn: 'ert45ggge',
        count: 1,
        countTransfer: 0,
        validationCountTransfer: true,
        accounting_sn: true
      },

    ],
    warehouseFrom: [{}],
    warehouseTo: [{}],
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

        setDefaultSomeTransfer: (state, action) => {
          state.warehouseFrom= [],
          state.warehouseTo = [],
          state.products = []
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

          setCountSomeTransfer: (state, action) => {
            const id = action.payload.id_product;
            const index = state.products.findIndex(product => product.id === id)
            state.products[index].countTransfer = action.payload.countTransfer
          }
    }
});

export const {
    setActiveSomeTransfer,
    setProductSomeTransfer,
    setResetSomeTransfer,
    setDefaultSomeTransfer,
    setWarehouseFromSomeTransfer,
    setWarehouseToSomeTransfer,
    setCountSomeTransfer,
} = transferSomeProductSlice.actions
export default transferSomeProductSlice.reducer
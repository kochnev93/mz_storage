import { createSlice } from '@reduxjs/toolkit';

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
  },
};

const initialState = {
  active: false,
  errors: false,
  message: '',
  reset: false,
  isLoading: false,
  //
  products: [],
  validationProducts: true,
  warehouseFrom: [],
  validationWarehouseFrom: true,
  warehouseTo: [],
  validationWarehouseTo: true,
  urlProducts: null,
  //
  validation: initialValidation,
};

export const transferSomeProductSlice = createSlice({
  name: 'modal_transfer_someProducts',
  initialState,
  reducers: {
    setActiveSomeTransfer: (state, action) => {
      state.active = action.payload.active;
    },

    setResetSomeTransfer: (state, action) => {
      state.reset = action.payload.reset;
    },

    setDefaultSomeTransfer: (state, action) => {
      (state.warehouseFrom = []),
        (state.warehouseTo = []),
        (state.products = []);
    },

    setIsLoadingsomeTransfer: (state, action) => {
      state.isLoading = action.payload.isLoading
    },

    setErrorsSomeTransfer: (state, action) => {
      console.log(action.payload);
      state.errors = action.payload.errors;
      state.message = action.payload.message;
      state.validationProducts =
        action.payload.validationProducts || state.validationProducts;
      state.validationWarehouseFrom =
        action.payload.validationWarehouseFrom;
      state.validationWarehouseTo =
        action.payload.validationWarehouseTo;
    },

    setProductSomeTransfer: (state, action) => {
      if (action.payload.length == 0) {
        state.products = [];
      } else {
        console.log('PAYLOAD', action.payload);
        state.products = action.payload.map((item) => {
          return {
            ...item,
            countTransfer: 0,
            validationCountTransfer: true,
            validationMessage: '',
          };
        });
      }
    },

    setWarehouseFromSomeTransfer: (state, action) => {
      if (action.payload.length == 0) {
        state.warehouseFrom = [];
        state.warehouseTo = [];
        state.products = [];
      } else {
        state.warehouseFrom = [{ ...action.payload[0] }];
        state.products = [];
        state.urlProducts = `warehouse/${action.payload[0].id}/get_products`;
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
      const index = state.products.findIndex((product) => product.id === id);
      state.products[index].countTransfer = action.payload.countTransfer;
    },

    setValidationSomeTransfer: (state, action) => {
      const id = action.payload.id_product;
      const index = state.products.findIndex((product) => product.id === id);
      state.products[index].validationCountTransfer =
        action.payload.validationCountTransfer;
      state.products[index].validationMessage =
        action.payload.validationMessage;
    },

    setDefaultValidationSomeTransfer: (state) => {
      state.products.forEach((item) => {
        item.validationCountTransfer = true;
        item.validationMessage = '';
      });
      state.errors = false;
      state.message = '';
      state.validationProducts = true;
      state.validationWarehouseFrom = true;
      state.validationWarehouseTo = true;
    },
  },
});

export const {
  setActiveSomeTransfer,
  setProductSomeTransfer,
  setResetSomeTransfer,
  setDefaultSomeTransfer,
  setIsLoadingsomeTransfer,
  setErrorsSomeTransfer,
  setWarehouseFromSomeTransfer,
  setWarehouseToSomeTransfer,
  setCountSomeTransfer,
  setValidationSomeTransfer,
  setDefaultValidationSomeTransfer,
} = transferSomeProductSlice.actions;
export default transferSomeProductSlice.reducer;

// {
//   id: 1,
//   name: 'Монитор 1',
//   sn: 'ert45e',
//   count: 1,
//   countTransfer: 0,
//   validationCountTransfer: true,
//   accounting_sn: true
// },
// {
//   id: 2,
//   name: 'Кабель hdmi',
//   sn: null,
//   count: 12,
//   countTransfer: 0,
//   validationCountTransfer: true,
//   accounting_sn: false
// },
// {
//   id: 3,
//   name: 'Монитор 3',
//   sn: 'ert45ggge',
//   count: 1,
//   countTransfer: 0,
//   validationCountTransfer: true,
//   accounting_sn: true
// },

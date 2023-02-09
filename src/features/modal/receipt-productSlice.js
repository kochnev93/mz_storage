import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: false,
  errors: false,
  message: '',
  reset: false,
  isLoading: false,
  category: [],
  warehouse: [],
  product: [],
  urlProduct: 'get_receipt_products/0',
  count: null,
  sn: [],
  inputSN: null,
  guarantee: null,
  guaranteeCheckbox: false,
  contract: null,
  contractCheckbox: false,
  contragent: [],
  contragentCheckbox: false,
  newContragentName: null,
  newContragentINN: null,
  url: null,
  validation: {
    warehouse: true,
    product: true,
    contract: true,
    contragent: true,
    newContragentName: true,
    newContragentINN: true,
    URL: true,
    guarantee: true,
    count: true,
    sn: {
      status: true,
      message: null,
    },
  },
};

export const receiptProductSlice = createSlice({
  name: 'modal_receipt_product',
  initialState,
  reducers: {
    setActiveReceipt: (state, action) => {
      state.active = action.payload.active;
    },
    setErrorsReceipt: (state, action) => {
      state.errors = action.payload.errors;
    },
    setMessageReceipt: (state, action) => {
      state.message = action.payload.message;
      state.errors = action.payload.errors;
    },
    setResetReceipt: (state, action) => {
      state.reset = action.payload.reset;
    },
    setIsLoadingReceipt: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
    setDefaultReceipt: (state, action) => {
      (state.errors = false),
        (state.message = ''),
        (state.reset = false),
        (state.isLoading = false);
    },

    //Receipt Form
    setProduct: (state, action) => {
      //state.product = action.payload.product;
      state.product = [{...action.payload[0]}]
    },

    setProductUrl: (state, action) => {
      state.urlProduct = action.payload.urlProduct;
    },

    setInputSN: (state, action) => {
      state.inputSN = action.payload.inputSN;
    },

    setSN: (state, action) => {
      state.sn = action.payload.sn;
    },

    setCount: (state, action) => {
      state.count = action.payload.count;
    },

    setValidation: (state, action) => {
      state.validation = action.payload.validation;
    },

    setCategory: (state, action) => {
    //   console.log(action.payload);
    //   console.log([{...action.payload[0]}]);

    //   state.category = [
    //     {
    //       id: action.payload[0].id,
    //       title: action.payload[0].title,
    //       isCheked: action.payload[0].isCheked,
    //     },
    //   ];

    state.category = [{...action.payload[0]}]

    },

    setWarehouse: (state, action) => {
      //state.warehouse = action.payload.warehouse;
      state.warehouse = [{...action.payload[0]}]
    },

    setContract: (state, action) => {
      state.contract = action.payload.contract;
    },

    setContractCheckbox: (state, action) => {
      (state.contractCheckbox = !state.contractCheckbox),
        (state.contract = null);
    },

    setContragent: (state, action) => {
      //state.contragent = action.payload.contragent;
      state.contragent = [{...action.payload[0]}]
    },

    setContragentCheckbox: (state, action) => {
      (state.contragentCheckbox = !state.contragentCheckbox),
        (state.contragent = []);
    },

    setNewContragentName: (state, action) => {
      state.newContragentName = action.payload.name;
    },

    setNewContragentINN: (state, action) => {
      state.newContragentINN = action.payload.inn;
    },

    setURL: (state, action) => {
      state.url = action.payload.url;
    },

    setGuarantee: (state, action) => {
      state.guarantee = action.payload.guarantee;
    },

    setGuaranteeCheckbox: (state, action) => {
      state.guaranteeCheckbox = !state.guaranteeCheckbox;
      state.guarantee = null;
    },
  },
});

export const {
  setActiveReceipt,
  setErrorsReceipt,
  setMessageReceipt,
  setResetReceipt,
  setIsLoadingReceipt,
  setDefaultReceipt,
  setProduct,
  setProductUrl,
  setInputSN,
  setCount,
  setValidation,
  setSN,
  setCategory,
  setWarehouse,
  setContract,
  setContractCheckbox,
  setContragent,
  setContragentCheckbox,
  setNewContragentName,
  setNewContragentINN,
  setURL,
  setGuarantee,
  setGuaranteeCheckbox,
} = receiptProductSlice.actions;
export default receiptProductSlice.reducer;

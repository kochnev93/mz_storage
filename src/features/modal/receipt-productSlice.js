import { createSlice } from '@reduxjs/toolkit';

const initialValidation = {
  warehouse: {
    status: true,
    message: null,
  },
  product: {
    status: true,
    message: null,
  },
  contract: {
    status: true,
    message: null,
  },
  contragent: {
    status: true,
    message: null,
  },
  newContragentName: {
    status: true,
    message: null,
  },
  newContragentINN: {
    status: true,
    message: null,
  },
  url: {
    status: true,
    message: null,
  },
  guarantee: {
    status: true,
    message: null,
  },
  count: {
    status: true,
    message: null,
  },
   min_count: {
    status: true,
    message: null,
  },
  sn: {
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
  category: [],
  warehouse: [],
  product: [],
  urlProduct: 'get_receipt_products/0',
  count: null,
  min_count: null,
  sn: [],
  inputSN: '',
  guarantee: null,
  guaranteeCheckbox: false,
  contract: '',
  contractCheckbox: false,
  contragent: [],
  contragentCheckbox: false,
  newContragentName: '',
  newContragentINN: '',
  url: null,
  validation: initialValidation
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
      state.errors = false,
        state.message = '',
        state.reset = false,
        state.isLoading = false;
      state.validation = initialValidation
    },

    setDefaultValue: (state, action) => {
        state.validation = initialValidation
        state.category = [],
        state.warehouse = [],
        state.product = [],
        state.urlProduct =  'get_receipt_products/0',
        state.count = null,
        state.min_count = null,
        state.sn = [],
        state.inputSN = '',
        state.guarantee = null,
        state.guaranteeCheckbox = false,
        state.contract = '',
        state.contractCheckbox = false,
        state.contragent = [],
        state.contragentCheckbox = false,
        state.newContragentName = '',
        state.newContragentINN = '',
        state.url = ''
      },

    //Receipt Form
    setProduct: (state, action) => {
      if (action.payload.length == 0) {
        state.product = [];
      } else {
        state.product = [{ ...action.payload[0] }];
      }
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

    setMinCount: (state, action) => {
      state.min_count = action.payload.min_count;
    },

    setValidation: (state, action) => {
      state.validation = action.payload;
    },

    setCategory: (state, action) => {
      state.category = [{ ...action.payload[0] }];
    },

    setWarehouse: (state, action) => {
      state.warehouse = [{ ...action.payload[0] }];
    },

    setContract: (state, action) => {
      state.contract = action.payload.contract;
    },

    setContractCheckbox: (state, action) => {
      (state.contractCheckbox = !state.contractCheckbox), (state.contract = '');
    },

    setContragent: (state, action) => {
      state.contragent = [{ ...action.payload[0] }];
    },

    setContragentCheckbox: (state, action) => {
      (state.contragentCheckbox = !state.contragentCheckbox),
        (state.contragent = []);
      state.newContragentName = '';
      state.newContragentINN = '';
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
      state.guarantee = '';
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
  setDefaultValue,
  setProduct,
  setProductUrl,
  setInputSN,
  setCount,
  setMinCount,
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

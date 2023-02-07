import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: false,
  product: null,
  product_id: null,
  warehouse_id: null,
  errors: false,
  message: '',
  reset: false,
  isLoading: true,
};

export const aboutProductSlice = createSlice({
  name: 'modal_about_product',
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload.active;
      state.product_id = action.payload.product_id || state.product_id;
      state.product = action.payload.product || state.product;
      state.warehouse_id = action.payload.warehouse_id || state.warehouse_id;
    },
    setErrors: (state, action) => {
      state.errors = action.payload.errors;
    },
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.errors = action.payload.errors;
    },
    setReset: (state, action) => {
      state.reset = action.payload.reset;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
    setDefault: (state, action) => {
      (state.errors = false),
        (state.message = ''),
        (state.reset = false),
        (state.isLoading = false);
    },
    removeProductAbout: (state, action) => {
      state.product_id = null;
    },
  },
});

export const {
  setActive,
  setErrors,
  setMessage,
  setReset,
  setIsLoading,
  setDefault,
  removeProductAbout,
} = aboutProductSlice.actions;
export default aboutProductSlice.reducer;

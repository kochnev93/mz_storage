import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import regeneratorRuntime from "regenerator-runtime"

const initialState = {
  active: false,
  id_receipt: null,
  receipt: {},
  errors: false,
  message: '',
  reset: false,
  isLoading: true,
};

export const fetchReceiptProducts = createAsyncThunk(
  'modal_about_receipt/fetchReceiptProducts',
  async function (id) {
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/get_receipt_info/${id}`
    );
    const data = await response.json();
    return data.data;
  }
);

export const aboutReceiptSlice = createSlice({
  name: 'modal_about_receipt',
  initialState,
  reducers: {
    setActiveAboutReceipt: (state, action) => {
      state.active = action.payload.active;
      state.id_receipt = action.payload.id_receipt || state.id_receipt;
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
  },
  extraReducers: {
    [fetchReceiptProducts.pending]: (state, action) => {
      state.message = 'Идет загрузка данных...';
      state.isLoading = true;
    },
    [fetchReceiptProducts.fulfilled]: (state, action) => {
      state.message = '';
      state.isLoading = false;
      state.receipt = action.payload;
    },
    [fetchReceiptProducts.rejected]: (state, action) => {
      state.message = 'Ошибка при загрузке данных';
      state.errors = false;
      state.isLoading = true;
    },
  },
});

export const {
  setActiveAboutReceipt,
  setErrors,
  setMessage,
  setReset,
  setIsLoading,
} = aboutReceiptSlice.actions;

export default aboutReceiptSlice.reducer;

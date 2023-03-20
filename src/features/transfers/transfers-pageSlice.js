import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import regeneratorRuntime from 'regenerator-runtime';

export const fetchTransfers = createAsyncThunk(
  'transferPage/fetchTransfers',
  async function (filter) {

    let myHeaders = new Headers();
    myHeaders.append('content-type', 'application/json');

    let requestOptions = {
      headers: myHeaders,
      method: 'POST',
      body: filter,
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/get_transfers`,
      requestOptions
    );

    const data = await response.json();

    let result;

    if (data.data) {
      result = { data: data.data, ...data };
    } else {
      result = { data: null, ...data };
    }

    return result;
  }
);

const initialState = {
  transfers: [],
  errors: false,
  message: '',
  isLoading: false,
  reset: false,
  warehouseTo: [],
  warehouseFrom: [],
  dateBegin: '',
  dateEnd: '',
  search: '',
};

export const transferPageSlice = createSlice({
  name: 'transferPage',
  initialState,
  reducers: {
    setDefaultPageTransfer: (state, action) => {
      state.reset = true;
      state.warehouseFrom = [];
      state.warehouseTo = [];
      state.dateBegin ='';
      state.dateEnd = '';
      state.search = '';
      state.message = '';
    },

    setResetPageTransfer: (state, action) => {
      state.reset = action.payload.reset;
    },

    setWarehouseFrom: (state, action) => {
      if (action.payload.length == 0) {
        state.warehouseFrom = [];
      } else {
        state.warehouseFrom = action.payload.map((item) => {
          return { ...item };
        });
      }
    },

    setWarehouseTo: (state, action) => {
      if (action.payload.length == 0) {
        state.warehouseTo = [];
      } else {
        state.warehouseTo = action.payload.map((item) => {
          return { ...item };
        });
      }
    },

    setSearch: (state, action) => {
      state.search = action.payload.search
    },

    setDateBegin: (state, action) => {
      state.dateBegin = action.payload.dateBegin
    },

    setDateEnd: (state, action) => {
      state.dateEnd = action.payload.dateEnd
    }
  },

  extraReducers: {
    [fetchTransfers.pending]: (state, action) => {
      state.message = 'Идет загрузка данных...';
      state.isLoading = true;
      state.errors = true;
    },
    [fetchTransfers.fulfilled]: (state, action) => {
      state.message = action.payload.errorMessage
        ? action.payload.errorMessage
        : '';
      state.isLoading = false;
      state.transfers = action.payload.data;
    },
    [fetchTransfers.rejected]: (state, action) => {
      state.message = 'Ошибка при загрузке информации';
      state.errors = true;
      state.isLoading = false;
      state.transfers = [];
    },
  },
});

export const { setDefaultPageTransfer, setResetPageTransfer, setWarehouseFrom, setWarehouseTo, setSearch, setDateBegin, setDateEnd  } = transferPageSlice.actions;

export default transferPageSlice.reducer;

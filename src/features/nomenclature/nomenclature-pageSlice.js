import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import regeneratorRuntime from 'regenerator-runtime';

export const fetchTransfers = createAsyncThunk(
  'nomenclaturePage/fetchNomenclature',
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
  nomenclature: [],
  errors: false,
  message: '',
  isLoading: false,
  reset: false,
  category_filter: [],
  search: '',
};

export const nomenclaturePageSlice = createSlice({
  name: 'nomenclaturePage',
  initialState,
  reducers: {
    setDefaultPageNomenclature: (state, action) => {
      state.reset = true;
      state.category_filter = [];
      state.search = '';
      state.message = '';
    },

    setResetPageNomenclature: (state, action) => {
      state.reset = action.payload.reset;
    },

    setCategory: (state, action) => {
      if (action.payload.length == 0) {
        state.category_filter = [];
      } else {
        state.category_filter = action.payload.map((item) => {
          return { ...item };
        });
      }
    },

    setSearch: (state, action) => {
      state.search = action.payload.search
    },

  },

  extraReducers: {
    [fetchTransfers.pending]: (state, action) => {
      state.message = 'Идет загрузка данных...';
      state.isLoading = true;
      state.errors = false;
    },
    [fetchTransfers.fulfilled]: (state, action) => {
      state.message = action.payload.errorMessage
        ? action.payload.errorMessage
        : '';
      state.isLoading = false;
      state.transfers = action.payload.data;
      state.errors = action.payload.errorMessage ? true : false;
    },
    [fetchTransfers.rejected]: (state, action) => {
      state.message = 'Ошибка при загрузке информации';
      state.errors = true;
      state.isLoading = false;
      state.transfers = [];
    },
  },
});

export const { setDefaultPageNomenclature, setResetPageNomenclature, setCategory, setSearch } = nomenclaturePageSlice.actions;

export default nomenclaturePageSlice.reducer;
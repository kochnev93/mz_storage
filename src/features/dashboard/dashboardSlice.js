import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  warehouseFilter: [],
  categoryFilter: [],
  inputSearch: '',
  reset: false,
  errors: false,
  message: '',
  isLoading: false,
};

export const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload.products;
    },

    setWarehouseDashboard: (state, action) => {
      if (action.payload.length == 0) {
        state.warehouseFilter = [];
      } else {
        state.warehouseFilter = action.payload.map((item) => {
          return { ...item };
        });
      }
    },

    setCategoryDashboard: (state, action) => {
      if (action.payload.length == 0) {
        state.categoryFilter = [];
      } else {
        state.categoryFilter = action.payload.map((item) => {
          return { ...item };
        });
      }
    },

    setSearchDashboard: (state, action) => {
      state.inputSearch = action.payload;
    },

    setResetDashboard: (state, action) => {
      state.reset = action.payload.reset;
    },

    setIsLoadingDashboard: (state, action) => {
      state.isLoading = action.payload;
    },

    setErrorsDashboard: (state, action) => {
        state.errors = action.payload.errors;
        state.message = action.payload.message;
    },

    editProduct: (state, action) => {
      const id = action.payload.unit.id;
      const sn = action.payload.unit.sn;
      const accounting_sn = Boolean(action.payload.unit.accounting_sn);

      const new_warehouse_id = action.payload.new_warehouse[0].id;
      const new_warehouse_title = action.payload.new_warehouse[0].title;

      if (accounting_sn) {
        let index = state.products.findIndex((el) => el.sn === sn);

        if (index !== -1) {
          state.products[index].id_warehouse = new_warehouse_id;
          state.products[index].warehouse_title = new_warehouse_title;
        }
      }
    },
  },
});

export const {
  setWarehouseDashboard,
  setCategoryDashboard,
  setResetDashboard,
  addProducts,
  editProduct,
  setSearchDashboard,
  setIsLoadingDashboard,
  setErrorsDashboard
} = dashboard.actions;
export default dashboard.reducer;

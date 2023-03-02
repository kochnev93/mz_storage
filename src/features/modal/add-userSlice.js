import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: false,
  errors: false,
  message: '',
  reset: false,
  isLoading: false,
};

export const addUserSlice = createSlice({
  name: 'modal_add_user',
  initialState,
  reducers: {
    setActiveAddUser: (state, action) => {
      state.active = action.payload.active;
    },
    setErrorsAddUser: (state, action) => {
      state.errors = action.payload.errors;
    },
    setMessageAddUser: (state, action) => {
      state.message = action.payload.message;
    },
    setResetAddUser: (state, action) => {
      state.reset = action.payload.reset;
    },
    setIsLoadingAddUser: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
    setDefaultAddUser: (state, action) => {
      (state.errors = false),
        (state.message = ''),
        (state.reset = false),
        (state.isLoading = false);
    },
  },
});

export const {
  setActiveAddUser,
  setErrorsAddUser,
  setMessageAddUser,
  setResetAddUser,
  setIsLoadingAddUser,
  setDefaultAddUser,
} = addUserSlice.actions;
export default addUserSlice.reducer;

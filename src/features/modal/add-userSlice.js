import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: false,
  errors: false,
  message: '',
  reset: false,
  isLoading: false,
  user: {
    name: '',
    surname: '',
    email: '',
    phone: '',
    role: [],
    pass: '',
    repeat_pass: '',
  }
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

    //Add User Form
    setUser_AddUser: (state, action) => {
      state.user.name = action.payload.name || state.user.name;
      state.user.surname = action.payload.surname || state.user.surname;
      state.user.email = action.payload.email || state.user.email;
      state.user.phone = action.payload.phone || state.user.phone;
      state.user.role = action.payload.role || state.user.role;
      state.user.pass = action.payload.pass || state.user.pass;
      state.user.repeat_pass = action.payload.repeat_pass || state.user.repeat_pass;
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
  setUser_AddUser,
} = addUserSlice.actions;
export default addUserSlice.reducer;

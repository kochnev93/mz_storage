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
    login: '',
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
      state.errors = false;
        state.message = '';
        state.reset = false;
        state.isLoading = false;
        state.user = {
          name: '',
          surname: '',
          email: '',
          login: '',
          phone: '',
          role: [],
          pass: '',
          repeat_pass: '',
        }

    },

    //Add User Form
    setUser_AddUser: (state, action) => {
      state.user.name = action.payload.hasOwnProperty('name') ? action.payload.name : state.user.name;
      state.user.surname = action.payload.hasOwnProperty('surname') ? action.payload.surname : state.user.surname;
      state.user.email = action.payload.hasOwnProperty('email') ? action.payload.email : state.user.email;
      state.user.phone = action.payload.hasOwnProperty('phone') ? action.payload.phone : state.user.phone;
      state.user.login = action.payload.hasOwnProperty('login') ? action.payload.login : state.user.login;
      state.user.role = action.payload.hasOwnProperty('role') ? action.payload.role : state.user.role;
      state.user.pass = action.payload.hasOwnProperty('pass') ? action.payload.pass : state.user.pass;
      state.user.repeat_pass = action.payload.hasOwnProperty('repeat_pass') ? action.payload.repeat_pass : state.user.repeat_pass;
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

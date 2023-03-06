import { createSlice } from '@reduxjs/toolkit';

const initValidation = {
  name: {
    status: true,
    message: '',
  },
  surname: {
    status: true,
    message: '',
  },
  email: {
    status: true,
    message: '',
  },
  login: {
    status: true,
    message: '',
  },
  phone: {
    status: true,
    message: '',
  },
  role: {
    status: true,
    message: '',
  },
  pass: {
    status: true,
    message: '',
  },
  repeat_pass: {
    status: true,
    message: '',
  },
  position: {
    status: true,
    message: '',
  }
};

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
    position: '',
    pass: '',
    repeat_pass: '',
  },
  validation: initValidation,
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
      state.errors = action.payload.errors;
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
      state.reset = true;
      state.isLoading = false;
      state.user = {
        name: '',
        surname: '',
        email: '',
        login: '',
        phone: '',
        role: [],
        position: '',
        pass: '',
        repeat_pass: '',
      };
      state.validation = initValidation;
    },

    //Add User Form
    setUser_AddUser: (state, action) => {
      state.user.name = action.payload.hasOwnProperty('name')
        ? action.payload.name
        : state.user.name;
      state.user.surname = action.payload.hasOwnProperty('surname')
        ? action.payload.surname
        : state.user.surname;
      state.user.email = action.payload.hasOwnProperty('email')
        ? action.payload.email
        : state.user.email;
      state.user.phone = action.payload.hasOwnProperty('phone')
        ? action.payload.phone
        : state.user.phone;
      state.user.login = action.payload.hasOwnProperty('login')
        ? action.payload.login
        : state.user.login;
      state.user.role = action.payload.hasOwnProperty('role')
        ? action.payload.role
        : state.user.role;
      state.user.pass = action.payload.hasOwnProperty('pass')
        ? action.payload.pass
        : state.user.pass;
      state.user.repeat_pass = action.payload.hasOwnProperty('repeat_pass')
        ? action.payload.repeat_pass
        : state.user.repeat_pass;
      state.user.position = action.payload.hasOwnProperty('position')
        ? action.payload.position
        : state.user.position;
    },

    setRoleAddUser: (state, action) => {
      state.user.role = [{ ...action.payload[0] }];
    },

    setValidationAddUser: (state, action) => {
      state.validation = action.payload;
    },

    setDefaultValidationAddUser: (state, action) => {
      (state.errors = false),
        (state.message = ''),
        (state.reset = false),
        (state.isLoading = false);
      state.validation = initValidation;
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
  setRoleAddUser,
  setValidationAddUser,
  setDefaultValidationAddUser,
} = addUserSlice.actions;
export default addUserSlice.reducer;

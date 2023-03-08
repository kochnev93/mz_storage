import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import regeneratorRuntime from 'regenerator-runtime';

const checkEdits = (state) => {
  return JSON.stringify(state.user) === JSON.stringify(state.editUser) ? false : true;
};

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
  position: {
    status: true,
    message: '',
  }
};

const initialState = {
  active: false,
  user: {},
  editUser: {},
  validation: initValidation,
  errors: false,
  isEdit: false,
  message: '',
  reset: false,
  isLoading: false,
};

export const fetchUser = createAsyncThunk(
  'modal_about_user/fetchUser',
  async function (id) {
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/user/${id}`
    );
    const data = await response.json();
    return data.data;
  }
);

// export const fetchBlockUser = createAsyncThunk(
//   'modal_about_user/fetchBlockUser',
//   async function () {
//     const response = await fetch(
//       `${process.env.REACT_APP_API_SERVER}/getUsers1`
//     );
//     const data = await response.json();
//     return data.data;
//   }
// );

export const aboutUserSlice = createSlice({
  name: 'modal_about_user',
  initialState,
  reducers: {
    setActiveAboutUser: (state, action) => {
      state.active = action.payload.active;
      state.user = action.payload.user;
      state.editUser = action.payload.user;
    },

    setDefaultAboutUser: (state, action) => {
      state.user = {};
      state.editUser = {};
      state.errors = false;
      state.isEdit = false;
      state.message = '';
      state.reset = false;
      state.isLoading = false;
    },

    setErrorsAboutUser: (state, action) => {
      state.errors = action.payload.errors;
    },

    setMessageAboutUser: (state, action) => {
      state.message = action.payload.message;
      state.errors = action.payload.errors;
    },

    setResetAboutUser: (state, action) => {
      state.reset = action.payload.reset;
    },

    setIsLoadingAboutUser: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },

    cancelChangesAboutUser: (state) => {
      state.editUser = state.user;
      state.isEdit = false;
      state.validation = initValidation;
      state.errors = false;
      state.message = '';
    },

    setEditAboutUser: (state, action) => {
      if (action.payload.hasOwnProperty('name')) {
        state.editUser.name = action.payload.name;
        state.isEdit = checkEdits(state)
      }

      if (action.payload.hasOwnProperty('surname')) {
        state.editUser.surname = action.payload.surname;
        state.isEdit = checkEdits(state)
      }

      if (action.payload.hasOwnProperty('login')) {
        state.editUser.login = action.payload.login;
        state.isEdit = checkEdits(state)
      }

      if (action.payload.hasOwnProperty('phone')) {
        state.editUser.phone = action.payload.phone;
        state.isEdit = checkEdits(state)
      }

      if (action.payload.hasOwnProperty('email')) {
        state.editUser.email = action.payload.email;
        state.isEdit = checkEdits(state)
      }

      if (action.payload.hasOwnProperty('position')) {
        state.editUser.position = action.payload.position;
        state.isEdit = checkEdits(state)
      }

    },

    setValidationAboutUser: (state, action) => {
      state.validation = action.payload;
    },
  },
  //   extraReducers: {
  //     [fetchUsers.pending]: (state, action) => {
  //       state.message = 'Идет загрузка данных...';
  //       state.isLoading = true;
  //     },
  //     [fetchUsers.fulfilled]: (state, action) => {
  //       state.message = '';
  //       state.isLoading = false;
  //       state.users = action.payload;
  //     },
  //     [fetchUsers.rejected]: (state, action) => {
  //       state.message = 'Ошибка при загрузке информации о пользователях';
  //       state.errors = true;
  //       state.isLoading = true;
  //     },

  //   },
});

export const {
  setActiveAboutUser,
  setDefaultAboutUser,
  setErrorsAboutUser,
  setMessageAboutUser,
  setResetAboutUser,
  setIsLoadingAboutUser,
  setEditAboutUser,
  cancelChangesAboutUser,
  setValidationAboutUser,
} = aboutUserSlice.actions;

export default aboutUserSlice.reducer;

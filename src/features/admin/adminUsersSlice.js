import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import regeneratorRuntime from 'regenerator-runtime';

const initialState = {
  active: false,
  id_user: null,
  users: [],
  errors: false,
  message: '',
  reset: false,
  isLoading: true,
};

export const fetchUsers = createAsyncThunk(
  'modal_about_user/fetchUsers',
  async function () {
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/getUsers`
    );
    const data = await response.json();
    return data.data;
  }
);

export const adminUsersSlice = createSlice({
  name: 'modal_about_user',
  initialState,
  reducers: {
    setActiveAboutUser: (state, action) => {
      state.active = action.payload.active;
      state.id_user = action.payload.id_user;
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
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.message = 'Идет загрузка данных...';
      state.isLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.message = '';
      state.isLoading = false;
      state.users = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.message = 'Ошибка при загрузке информации о пользователях';
      state.errors = true;
      state.isLoading = true;
    },
  },
});

export const {
  setActiveAboutUser,
  setErrorsAboutUser,
  setMessageAboutUser,
  setResetAboutUser,
  setIsLoadingAboutUser,
} = adminUsersSlice.actions;

export default adminUsersSlice.reducer;

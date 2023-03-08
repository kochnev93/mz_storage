import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import regeneratorRuntime from 'regenerator-runtime';

export const fetchUsers = createAsyncThunk(
  'usersList/fetchUsers',
  async function () {
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/getUsers`
    );
    const data = await response.json();
    return data.data;
  }
);

const initialState = {
  users: [
  //   {
  //   id: 999,
  //   isBlocked: true,
  //   mz_user_login: 'testik',
  //   mz_user_role: 'admin'
  // },

  // {
  //   id: 777,
  //   isBlocked: false,
  //   mz_user_login: 'testik777',
  //   mz_user_role: 'user'
  // }

],
  errors: false,
  message: '',
  isLoading: true,
};

export const adminUsersSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {
    addNewUser: (state, action) => {
      state.users = [...state.users, action.payload]
    }
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

  }

});

export const {
  addNewUser
} = adminUsersSlice.actions;

export default adminUsersSlice.reducer;

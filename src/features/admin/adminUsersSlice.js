import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import regeneratorRuntime from 'regenerator-runtime';

const initialState = {
  active: false,
  id_user: null,
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


export const fetchBlockUser = createAsyncThunk(
  'modal_about_user/fetchBlockUser',
  async function () {
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/getUsers1`
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

    unBlockUser: (state, action) => {
      let index = state.users.findIndex(item => item.id === action.payload.id)

      if(index !== -1){
        state.users[index].isBlocked = false;
      }

    },

    blockUser: (state, action) => {
      let index = state.users.findIndex(item => item.id === action.payload.id)

      if(index !== -1){
        state.users[index].isBlocked = true;
      }
    },

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

    
    [fetchBlockUser.pending]: (state, action) => {
      state.message = 'Обновляю...';
      state.isLoading = true;
    },
    [fetchBlockUser.fulfilled]: (state, action) => {
      state.message = '';
      state.isLoading = false;
      state.users = action.payload;
    },
    [fetchBlockUser.rejected]: (state, action) => {
      state.message = 'Ошибка при блокировке пользователя';
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
  unBlockUser,
  blockUser,
  addNewUser,
} = adminUsersSlice.actions;

export default adminUsersSlice.reducer;

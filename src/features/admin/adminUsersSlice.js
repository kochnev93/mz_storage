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
     {
    id: 1,
    name: 'Тест',
    surname: "Тестов",
    phone: "89995552244",
    email: "test@mail.ru",
    login: "test777",
    position: "Инженер ит тест",
    role: "admin",
    img: null,
    accessToken: "1234",
    isBlocked: 0
   },


   {
    id: 2,
    name: 'Тестик',
    surname: "Тестовый",
    phone: "89995552266",
    email: "test666@mail.ru",
    login: "test666",
    position: "Инженер",
    role: "user",
    img: null,
    accessToken: "1234",
    isBlocked: 1
   },

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

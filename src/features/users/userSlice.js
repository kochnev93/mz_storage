import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('mz_storage_user'));

const initialState = {
  id: user?.id ?? null,
  name: user?.name ?? null,
  surname: user?.surname ?? null,
  phone: user?.phone ?? null,
  email: user?.email ?? null,
  login: user?.login ?? null,
  position: user?.position ?? null,
  role: user?.role ?? null,
  img: user?.img ?? null,
  accessToken: user?.accessToken ?? null,
};

// const initialState = {
    // id: 1,
    // name: 'Тест',
    // surname: "Тестов",
    // phone: "89995552244",
    // email: "test@mail.ru",
    // login: "test777",
    // position: "Инженер ИТ (тест)",
    // role: "admin",
    // img: null,
    // accessToken: "1234",
// }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
      state.login = action.payload.login;
      state.position = action.payload.position;
      state.role = action.payload.role;
      state.img = action.payload.img;
      state.accessToken = action.payload.accessToken;

      localStorage.setItem(
        'mz_storage_user',
        JSON.stringify({
          id: action.payload.id,
          name: action.payload.name,
          surname: action.payload.surname,
          phone: action.payload.phone,
          email: action.payload.email,
          login: action.payload.login,
          position: action.payload.position,
          role: action.payload.role,
          img: action.payload.img,
          accessToken: action.payload.accessToken,
        })
      );
    },

    removeUser: (state) => {
      state.id = null;
      state.name = null;
      state.surname = null;
      state.phone = null;
      state.email = null;
      state.login = null;
      state.position = null;
      state.role = null;
      state.img = null;
      state.accessToken = null;

      localStorage.removeItem('mz_storage_user');
    },

    refreshImgUser: (state, action) => {
      state.img = action.payload.filename;

      localStorage.setItem(
        'mz_storage_user',
        JSON.stringify({
          id: state.id,
          name: state.name,
          surname: state.surname,
          phone: state.phone,
          email: state.email,
          login: state.login,
          position: state.position,
          role: state.role,
          img: action.payload.filename,
          accessToken: state.accessToken,
        })
      );
    },
  },
});

export const { setUser, removeUser, refreshImgUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import regeneratorRuntime from 'regenerator-runtime';

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

const checkEdits = (state) => {
  return JSON.stringify(state.user) === JSON.stringify(state.editUser) ? false : true;
};

const checkValidation = (state) => {
  return JSON.stringify(state.validation) === JSON.stringify(initValidation) ? true : false;
}


export const fetchSaveUser = createAsyncThunk(
  'modal_about_user/fetchSaveUser',
  async function (id) {


      //     let requestOptions = {
      //   method: 'POST',
      //   body: data,
      // };

      // const result = await fetchNow(
      //   `${process.env.REACT_APP_API_SERVER}/transfer_product`,
      //   requestOptions
      // );



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
      state.validation = initValidation;
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
      state.editUser = {...state.user};
      state.isEdit = false;
      state.validation = initValidation;
      state.errors = false;
      state.message = '';
    },

    setEditAboutUser: (state, action) => {
      if (action.payload.hasOwnProperty('name')) {
        state.editUser.name = action.payload.name;
      }

      if (action.payload.hasOwnProperty('surname')) {
        state.editUser.surname = action.payload.surname;
      }

      if (action.payload.hasOwnProperty('login')) {
        state.editUser.login = action.payload.login;
      }

      if (action.payload.hasOwnProperty('phone')) {
        state.editUser.phone = action.payload.phone;
      }

      if (action.payload.hasOwnProperty('email')) {
        state.editUser.email = action.payload.email;
      }

      if (action.payload.hasOwnProperty('position')) {
        state.editUser.position = action.payload.position;
      }

      if (action.payload.hasOwnProperty('role')) {
        console.log(action.payload)

        state.editUser.role = action.payload.role.length === 0 ? '' : action.payload.role[0].title;
      }


      state.isEdit = checkEdits(state)

    },

    setValidationAboutUser: (state, action) => {
      state.validation = action.payload;

      if(checkValidation(state)){
        state.errors = false;
        state.message = '';
      } else{
        state.errors = true;
        state.message = 'В документе присутствуют ошибки'
      }
    },

    saveUser: (state) => {
      state.user = {...state.editUser}
    }
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
  saveUser,
} = aboutUserSlice.actions;

export default aboutUserSlice.reducer;

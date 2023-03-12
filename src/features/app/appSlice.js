import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import regeneratorRuntime from 'regenerator-runtime';

export const fetchData = createAsyncThunk(
  'app_state/fetchData',
  async function () {
    const urls = [
      `${process.env.REACT_APP_API_SERVER}/get_warehouse`,
      `${process.env.REACT_APP_API_SERVER}/get_category`,
      `${process.env.REACT_APP_API_SERVER}/get_roles`,
    ];

    const response = await Promise.all(urls.map(url => fetch(url)))
      .then(async (res) => {
        return Promise.all(
          res.map(async (data) => await data.json())
        )
      })

    return response;
  }
);

const getTheme = () => {
  const theme = localStorage.getItem('mz_theme')
  if ([ 'light', 'dark' ].includes(theme)) return theme

  const userMedia = window.matchMedia('(prefers-color-scheme: light)')
  if (userMedia.matches) return 'light'

  return 'dark'
}

const initialState = {
  status: true,
  error: null,
  theme: getTheme(),
  roles: [],
  warehouses: [
    // {
    //   isCheked: false,
    //   title: "Долгоозёрная",
    //   id: 5,
    // },

    // {
    //   isCheked: false,
    //   title: "Кирова",
    //   id: 50,
    // },

    // {
    //   isCheked: false,
    //   title: "Яхтенная",
    //   id: 115,
    // },
  ],
  category: [
    // {
    //   isCheked: false,
    //   title: "АДМ",
    //   id: 5,
    // },

    // {
    //   isCheked: false,
    //   title: "Принтер",
    //   id: 54,
    // },

    // {
    //   isCheked: false,
    //   title: "Монитор",
    //   id: 52,
    // },
  ],
  description: '',
};

export const appSlice = createSlice({
  name: 'app_state',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      (state.status = action.payload.status),
        (state.error = action.payload.error),
        (state.description = action.payload.description || state.description);
    },

    setTheme: (state, action) => {
      state.theme = action.payload
    }
  },

  extraReducers: {
    [fetchData.pending]: (state, action) => {},
    [fetchData.fulfilled]: (state, action) => {
      state.warehouses = action.payload[0].data;
      state.category = action.payload[1].data;
      state.roles = action.payload[2].data;
    },
    [fetchData.rejected]: (state, action) => {
      state.description = 'Ошибка при загрузке данных о складах и категорий';
      state.warehouses = [];
      state.category = [];
      state.roles = [];
    },
  },
});

export const { setStatus, setTheme } = appSlice.actions;
export default appSlice.reducer;

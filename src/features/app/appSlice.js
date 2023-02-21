import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import regeneratorRuntime from "regenerator-runtime"

export const fetchData = createAsyncThunk(
    'app_state/fetchData',
    async function () {

    const response = await Promise.all([
        fetch(`${process.env.REACT_APP_API_SERVER}/get_warehouse`),
        fetch(`${process.env.REACT_APP_API_SERVER}/get_category`),
    ])
      const data = await response.json();
      console.log('app_state/fetchData', data);

      return data.data;
    }
  );
  

const initialState = {
    status: true,
    error: null,
    warehouses: [],
    category: [],
    description: '',
}

export const appSlice = createSlice({
    name: 'app_state',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload.status,
            state.error = action.payload.error,
            state.description = action.payload.description || state.description
        }
    },

    extraReducers: {
        [fetchData.pending]: (state, action) => {

        },
        [fetchData.fulfilled]: (state, action) => {
        console.log(action.payload)

          state.warehouses = action.payload;
          state.category = action.payload;
        },
        [fetchData.rejected]: (state, action) => {
          state.description = 'Ошибка при загрузке данных о складах и категорий';
          state.warehouses = [];
          state.category = [];
        },
      },
});

export const {setStatus} = appSlice.actions
export default appSlice.reducer
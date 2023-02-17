import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status: true,
    error: null,
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
    }
});

export const {setStatus} = appSlice.actions
export default appSlice.reducer
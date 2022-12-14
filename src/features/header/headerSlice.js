import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    ButtonMenuOpen: false,
}

export const headerSlice = createSlice({
    name: 'button_menu',
    initialState,
    reducers: {
        setHeader: (state, action) => {
            state.ButtonMenuOpen = !state.ButtonMenuOpen
        }
    }
});

export const {setHeader} = headerSlice.actions
export default headerSlice.reducer
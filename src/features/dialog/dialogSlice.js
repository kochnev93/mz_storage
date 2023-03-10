import { createSlice } from '@reduxjs/toolkit';

const initialState = {
visible: false,
  errors: false,
  message: '',
  isLoading: true,
};

export const dialog = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setVisibleDialog: (state, action) => {
      state.visible = action.payload.visible
    }
  },



});

export const {
    setVisibleDialog
} = dialog.actions;

export default dialog.reducer;

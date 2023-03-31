import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: false,
  product: null,
  errors: false,
  message: '',
  reset: false,
  isLoading: true,
  inputComment: '',
  comments: [],
  indexActiveTab: 0,
  loadingNewComent: false,
  ErrorLoadingNewComment: false,
  RepeatLoadingNewComment: null,
};

export const aboutProductSlice = createSlice({
  name: 'modal_about_product',
  initialState,
  reducers: {

    setActive: (state, action) => {
      state.active = action.payload.active;
      state.product = action.payload.product || state.product;
    },

    setErrors: (state, action) => {
      state.errors = action.payload.errors;
    },

    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.errors = action.payload.errors;
    },

    setReset: (state, action) => {
      state.reset = action.payload.reset;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },

    setDefault: (state, action) => {
      state.errors = false,
      state.message = '',
      state.isLoading = false,
      state.indexActiveTab = 0,
      state.inputComment = '',
      state.product = null,
      state.ErrorLoadingNewComment = false;
      state.RepeatLoadingNewComment = null;
      state.loadingNewComent = false;

    },

    removeProductAbout: (state, action) => {
      state.product = null;
    },

    setInputComment: (state, action) => {
      state.inputComment = action.payload.inputComment
    },

    setComments: (state, action) => {
      state.comments = action.payload.comments;
    },

    addNewComment: (state, action) => {
      state.comments = [...state.comments, action.payload.comment]
      state.loadingNewComent = false
    },

    setLoadingNewComment: (state, action) => {
      state.loadingNewComent = action.payload.loading
    },

    setActiveTab: (state, action) => {
      state.indexActiveTab = action.payload.activeTab
    },

    serErrorLoadingNewComment: (state, action) => {
      state.ErrorLoadingNewComment = action.payload.error;
      state.RepeatLoadingNewComment = action.payload.repeat;
    },

    cancelLoadingComment: (state, action) => {
      state.ErrorLoadingNewComment = false;
      state.RepeatLoadingNewComment = null;
      state.loadingNewComent = false;
      state.inputComment = '';
    }
  },
});

export const {
  setActive,
  setErrors,
  setMessage,
  setReset,
  setIsLoading,
  setDefault,
  removeProductAbout,
  setInputComment,
  setActiveTab,
  setComments,
  addNewComment,
  setLoadingNewComment,
  serErrorLoadingNewComment,
  cancelLoadingComment
} = aboutProductSlice.actions;

export default aboutProductSlice.reducer;

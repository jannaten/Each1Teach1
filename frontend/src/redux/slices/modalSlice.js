import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    loading: false,
    errors: null,
    content: null,
    callback: null,
    options: {}
  },
  reducers: {
    openModal: (state, action) => {
      state.content = action.payload.content;
      if (action.payload.callback) state.callback = action.payload.callback;
      if (action.payload.options) state.options = action.payload.options;

      state.loading = false;
    },
    closeModal: (state) => {
      state.content = null;
      state.callback = null;
      state.options = {};
      state.loading = false;
    }
  }
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

export const composeMailSlice = createSlice({
  name: "composeModal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openComposeModal: (state, action) => {
      state.isOpen = true;
    },

    closeComposeModal: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { openComposeModal, closeComposeModal } = composeMailSlice.actions;

export default composeMailSlice.reducer;

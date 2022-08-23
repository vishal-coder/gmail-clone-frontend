import { createSlice } from "@reduxjs/toolkit";

export const composeMailSlice = createSlice({
  name: "composeModal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openComposeModal: (state, action) => {
      console.log("called set  openComposeModal", action);
      state.isOpen = true;
    },

    closeComposeModal: (state, action) => {
      console.log("called set  closeComposeModal", action);
      state.isOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openComposeModal, closeComposeModal } = composeMailSlice.actions;

export default composeMailSlice.reducer;

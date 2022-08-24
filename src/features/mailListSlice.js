import { createSlice } from "@reduxjs/toolkit";

export const mailListSlice = createSlice({
  name: "mails",
  initialState: {
    mailList: [], // for user object
    mailCategory: "INBOX", // for storing the JWT
    mailListLoading: true,
  },
  reducers: {
    setMailList: (state, action) => {
      console.log("called set user setMailList", action);
      state.mailList = action.payload;
    },

    setMailCategory: (state, action) => {
      console.log("called set setMailCategory", action);
      state.mailCategory = action.payload;
    },
    setMailListLoading: (state, action) => {
      console.log("called set setMailListLoading", action);
      state.mailListLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMailList, setMailCategory, setMailListLoading } =
  mailListSlice.actions;

export default mailListSlice.reducer;

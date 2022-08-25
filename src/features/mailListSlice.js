import { createSlice } from "@reduxjs/toolkit";

export const mailListSlice = createSlice({
  name: "mails",
  initialState: {
    mailList: [], // for user object
    mailCategory: "INBOX", // for storing the JWT
    mailListLoading: true,
    viewMail: false,
    loadInbox: true,
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
    setViewMail: (state, action) => {
      console.log("called set setViewMail", action);
      state.viewMail = action.payload;
    },
    setLoadInbox: (state, action) => {
      console.log("called set loadInbox", action);
      state.loadInbox = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMailList,
  setMailCategory,
  setMailListLoading,
  setViewMail,
  setLoadInbox,
} = mailListSlice.actions;

export default mailListSlice.reducer;

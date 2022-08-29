import { createSlice } from "@reduxjs/toolkit";

export const mailListSlice = createSlice({
  name: "mails",
  initialState: {
    mailList: [],
    mailCategory: "INBOX",
    mailListLoading: true,
    viewMail: false,
    loadInbox: true,
    pageToken: null,
    resultSizeEstimate: null,
  },
  reducers: {
    setMailList: (state, action) => {
      state.mailList = action.payload;
    },

    setMailCategory: (state, action) => {
      state.mailCategory = action.payload;
    },
    setMailListLoading: (state, action) => {
      state.mailListLoading = action.payload;
    },
    setViewMail: (state, action) => {
      state.viewMail = action.payload;
    },
    setLoadInbox: (state, action) => {
      state.loadInbox = action.payload;
    },
    setPageToken: (state, action) => {
      state.pageToken = action.payload;
    },
    setResultSizeEstimate: (state, action) => {
      state.resultSizeEstimate = action.payload;
    },
  },
});

export const {
  setMailList,
  setMailCategory,
  setMailListLoading,
  setViewMail,
  setLoadInbox,
  setPageToken,
  setResultSizeEstimate,
} = mailListSlice.actions;

export default mailListSlice.reducer;

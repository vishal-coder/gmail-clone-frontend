import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {}, // for user object
    userToken: null, // for storing the JWT
    isLoggedIn: false,
    error: null,
    success: false, // for monitoring the registration process.
  },
  reducers: {
    setUserProfile: (state, action) => {
      // console.log("called set user profile", action);
      state.userInfo = action.payload;
    },

    setIsLoggedIn: (state, action) => {
      // console.log("called set setIsLoggedIn", action);
      state.isLoggedIn = action.payload;
    },

    setUserToken: (state, action) => {
      // console.log("called set setUserToken", action);
      state.userToken = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserProfile, setIsLoggedIn, setUserToken } =
  userSlice.actions;

export default userSlice.reducer;

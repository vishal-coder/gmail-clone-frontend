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

    LOG_OUT: (state) => {
      console.log("called set LOG_OUT", state);
      state = undefined;
      console.log("called set LOG_OUT", state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserProfile, setIsLoggedIn, setUserToken, LOG_OUT } =
  userSlice.actions;

export default userSlice.reducer;

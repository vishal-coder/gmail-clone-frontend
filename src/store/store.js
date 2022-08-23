import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice.js";
import composeModalReduce from "../features/composeMailSlice.js";

export default configureStore({
  reducer: {
    user: userReducer,
    composeModal: composeModalReduce,
  },
});

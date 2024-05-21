import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "../features/userinfo/userInfoSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
  }
});
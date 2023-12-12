import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../users/userReducer";


const store = configureStore({
  reducer: {
    userReducer,
  }
});


export default store;
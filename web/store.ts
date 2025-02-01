import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./src/reducers/userReducer";

const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });
  
  export default store;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
      setUser(state, action) {
        return action.payload;
      },
      clearUser(state, action) {
        return null;
      },
    },
  });

export default userSlice.reducer;
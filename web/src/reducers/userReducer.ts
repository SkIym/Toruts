/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { SignupInfo } from "../types";
import accountService from "../services/account";

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

export const loginUser = (creds: SignupInfo) => {
    return async (dispatch: Dispatch) => {
        try {
            const user = await accountService.signup(creds);
            window.localStorage.setItem("loggedInUser", JSON.stringify(user));
            accountService.setToken(user.token);
            dispatch(setUser(user));
        } catch (err) {
            dispatch(showNotification("error", err, 4));
            return Promise.reject();
        }
    };
};

export default userSlice.reducer;
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, Dispatch, Action } from "@reduxjs/toolkit";
import { SignupInfo, LoginInfo } from "../types";
import accountService from "../services/account";
import { ThunkAction } from "@reduxjs/toolkit";

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

export const { setUser, clearUser } = userSlice.actions

export const signupUser = (creds: SignupInfo) => {
    console.log("signup reached")
    return async (dispatch: Dispatch) => {
        try {
            const user = await accountService.signup(creds);
            accountService.setToken(user.token);
            dispatch(setUser(user));
        } catch (err) {
            // dispatch(showNotification("error", err, 4));
            return Promise.reject();
        }
    };
};

export const getLoggedInUser = () => {
    return async (dispatch: Dispatch) => {
      const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
      if (loggedInUserJSON) {
        const user = JSON.parse(loggedInUserJSON);
        dispatch(setUser(user));
      }
    };
};

export const loginUser = (creds: LoginInfo) => {

}

export default userSlice.reducer

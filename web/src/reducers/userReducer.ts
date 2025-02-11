/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, Dispatch, Action } from "@reduxjs/toolkit";
import { SignupInfo, LoginInfo } from "../types";
import accountService from "../services/account";
import axios from "axios";
import { useNotification } from "../hooks";
import { toast } from "react-toastify";

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
        } catch (e) {
            useNotification(e)
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
    console.log("login reducer reached")
    return async (dispatch: Dispatch) => {
        try {
            const user = await accountService.login(creds);
            accountService.setToken(user.token);
            window.localStorage.setItem("loggedInUser", JSON.stringify(user));
            dispatch(setUser(user));
        } catch (e) {
            useNotification(e)
            return Promise.reject();
        }
    };
}

export default userSlice.reducer

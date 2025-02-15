import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { SignupInfo, LoginInfo, UserInfo, UserToken } from "../types";
import accountService from "../services/account";
import { useErrorNotification, useSuccessNotification } from "../hooks";



const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser(_state, action) {
            return action.payload;
        },
        clearUser() {
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
            window.localStorage.setItem("loggedInUser", JSON.stringify(user));
            dispatch(setUser(user));
            useSuccessNotification("Signup succesful!")
        } catch (e) {
            useErrorNotification(e)
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
            useSuccessNotification("Login succesful!")
        } catch (e) {
            useErrorNotification(e)
            return Promise.reject();
        }
    };
}

export const addUserInfo = (info: UserInfo) => {
    console.log("user info reducer reached")
    return async () => {
        try {
            if (info.token == null) {
                return Promise.reject()
            }
            accountService.setUserInfo(info)
            useSuccessNotification(`Hello ${info.firstName}!`)
        } catch (err) {
            useErrorNotification(err)
            return Promise.reject()
        }
    }

}
export const logoutUser = () => {
    return async (dispatch: Dispatch) => {
        window.localStorage.removeItem("loggedInUser");
        dispatch(clearUser());
        useSuccessNotification("Logged out.")
    };
};

export const deleteUser = (token: UserToken) => {
    return async (dispatch: Dispatch) => {
        try {
            window.localStorage.removeItem("loggedInUser");
            accountService.deleteUser(token.userName)
            dispatch(clearUser());
            useSuccessNotification("Deleted user.")
        } catch (e) {
            useErrorNotification(e)
            return Promise.reject()
        }
        
    }
}

export default userSlice.reducer

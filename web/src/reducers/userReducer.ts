import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { SignupInfo, LoginInfo, UserInfo, UserData, TutorInfo, TutorInfoWithoutId, StudentInfoWithoutId, StudentInfo } from "../types";
import accountService from "../services/account";
import tutorService from "../services/tutor";
import studentService from "../services/student"
import { useErrorNotification, useSuccessNotification } from "../hooks";


const userSlice = createSlice({
    name: "user",
    initialState: null as UserData | null,
    reducers: {
        setUser(_state, action) {
            return action.payload;
        },
        clearUser() {
            return null;
        },
        setType(state, action) {
            const type = action.payload;
            if (state)
                state.userType = type
            return state
        },
        setRoleInfo(state, action) {
            const info = action.payload;
            if (state)
                state.roleInfo = info
            return state
        },
        setPrimaryInfo(state, action) {
            const info = action.payload;
            if (state)
                state.primaryInfo = info
            return state
        }
    },
});

export const { setUser, clearUser, setType, setRoleInfo, setPrimaryInfo } = userSlice.actions

export const signupUser = (creds: SignupInfo) => {
    console.log("signup reached")
    return async (dispatch: Dispatch) => {
        try {
            const user = await accountService.signup(creds);
            user.type = null;
            user.roleInfo = null;
            user.primaryInfo = null;
            // accountService.setToken(user.token);
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
            // accountService.setToken(user.token);
            window.localStorage.setItem("loggedInUser", JSON.stringify(user));
            dispatch(setUser(user));
            console.log(user)
            useSuccessNotification("Login succesful!")
        } catch (e) {
            useErrorNotification(e)
            return Promise.reject();
        }
    };
}

export const addUserInfo = (username: string, info: UserInfo) => {
    console.log("user info reducer reached")
    return async (dispatch: Dispatch) => {
        try {
            const primaryInfo = await accountService.setUserInfo(username, info)
            dispatch(setPrimaryInfo(primaryInfo))
            useSuccessNotification(`User information saved.`)
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

export const deleteUser = (user: UserData) => {
    return async (dispatch: Dispatch) => {
        try {
            window.localStorage.removeItem("loggedInUser");
            accountService.deleteUser(user.userName)
            dispatch(clearUser());
            useSuccessNotification("Deleted user.")
        } catch (e) {
            useErrorNotification(e)
            return Promise.reject()
        }

    }
}

export const signAsTutor = (username: string, creds: TutorInfoWithoutId) => {
    return async (dispatch: Dispatch) => {
        try {
            const tutorData = await tutorService.create(username, creds);
            dispatch(setType('TUTOR'))
            dispatch(setRoleInfo(tutorData))
            useSuccessNotification(`You have signed up as a tutor!`)
        } catch (e) {
            useErrorNotification(e);
            return Promise.reject();
        }
    }
}

export const signAsStudent = (username: string, info: StudentInfoWithoutId) => {
    return async (dispatch: Dispatch) => {
        try {
            const exists = await studentService.find(username)
            // If exists, modify instead of creating
            if (exists) {
                const studentData = await studentService.update(username, info)
                dispatch(setType("STUDENT"))
                dispatch(setRoleInfo(studentData))
                useSuccessNotification(`Updated your student record`)
                return
            }
            const studentData = await studentService.create(username, info)

            dispatch(setType("STUDENT"))
            dispatch(setRoleInfo(studentData))
            useSuccessNotification(`You have signed up as a student!`)
        } catch (e) {
            useErrorNotification(e)
            return Promise.reject()
        }
    }
}

export const updateStudent = (username: string, info: StudentInfoWithoutId) => {
    return async (dispatch: Dispatch) => {
        try {
            const studentData = await studentService.update(username, info)
            dispatch(setRoleInfo(studentData))
            useSuccessNotification(`Updated student data`)
        } catch (e) {
            useErrorNotification(e)
            return Promise.reject()
        }
    }

}

export default userSlice.reducer

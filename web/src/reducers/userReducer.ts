import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { SignupInfo, LoginInfo, UserInfo, UserData, TutorInfoWithoutId, StudentInfoWithoutId, TutorResult, TutorSearch, UserType } from "../types";
import accountService from "../services/account";
import tutorService from "../services/tutor";
import studentService from "../services/student"
import { useErrorNotification, useSuccessNotification } from "../hooks";


const LOCAL_STORAGE_KEY = "loggedInUser";
const updateLocalUser = (user: UserData | null) => {
  if (user) {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
};

const getLocalUser = (): UserData | null => {
    const loggedInUserJSON = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return loggedInUserJSON ? JSON.parse(loggedInUserJSON) : null;
  };

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
            if (state)
                state.userType = action.payload
            return state
        },
        setRoleInfo(state, action) {
            if (state)
                state.roleInfo = action.payload
                console.log(state?.roleInfo)
            return state
        },
        setPrimaryInfo(state, action) {
            if (state)
                state.primaryInfo = action.payload
            return state
        }
    },
});

export const { setUser, clearUser, setType, setRoleInfo, setPrimaryInfo } = userSlice.actions

// Signup
export const signupUser = (creds: SignupInfo) => {
    console.log("signup reached")
    return async (dispatch: Dispatch) => {
        try {
            const user = await accountService.signup(creds);
            user.userType = null;
            user.roleInfo = null;
            user.dual = false;
            updateLocalUser(user);
            dispatch(setUser(user));
            useSuccessNotification("Signup succesful!")
        } catch (e) {
            useErrorNotification(e)
            return Promise.reject();
        }
    };
};

// Get user from local storage
export const getLoggedInUser = () => {
    return async (dispatch: Dispatch) => {
        const user = getLocalUser();
        if (user) {
            dispatch(setUser(user));
        }
    };
};

// Login

export const loginUser = (creds: LoginInfo) => {
    console.log("login reducer reached")
    return async (dispatch: Dispatch) => {
        try {
            const user = await accountService.login(creds);
            // accountService.setToken(user.token);
            updateLocalUser(user);
            dispatch(setUser(user));
            console.log(user)
            useSuccessNotification("Login succesful!")
        } catch (e) {
            useErrorNotification(e)
            return Promise.reject();
        }
    };
}

// Add or update user's primary information

export const addUserInfo = (username: string, info: UserInfo) => {
    console.log("user info reducer reached")
    return async (dispatch: Dispatch) => {
        try {
            const primaryInfo = await accountService.setUserInfo(username, info)
            dispatch(setPrimaryInfo(primaryInfo))
            const user = getLocalUser();
            if (user) {
                user.primaryInfo = primaryInfo;
                updateLocalUser(user);
                dispatch(setUser(user));
            }
            useSuccessNotification(`User information saved.`)
        } catch (err) {
            useErrorNotification(err)
            return Promise.reject()
        }
    }

}

// Logout   
export const logoutUser = () => {
    return async (dispatch: Dispatch) => {
        updateLocalUser(null);
        dispatch(clearUser());
        useSuccessNotification("Logged out.")
    };
};

// Delete account
export const deleteUser = (user: UserData) => {
    return async (dispatch: Dispatch) => {
        try {
            updateLocalUser(null);
            await accountService.deleteUser(user.userName)
            dispatch(clearUser());
            useSuccessNotification("Deleted user.")
        } catch (e) {
            useErrorNotification(e)
            return Promise.reject()
        }

    }
}

const hasOtherAccount = (user: UserData): boolean => {
    if ( user && user.userType !== null) {
        return true
    }
    return false
}

// Sign up as a tutor
export const signAsTutor = (username: string, creds: TutorInfoWithoutId) => {
    return async (dispatch: Dispatch) => {
        try {
            const tutorData = await tutorService.create(username, creds);
            const user = getLocalUser();
            if (user) {
                user.roleInfo = tutorData
                if (hasOtherAccount(user)) user.dual = true
                user.userType = UserType.TUTOR
                updateLocalUser(user);
                dispatch(setUser(user));
            }
            useSuccessNotification(`You have signed up as a tutor!`)
        } catch (e) {
            useErrorNotification(e);
            return Promise.reject();
        }
    }
}

// Update user's tutor information

export const updateAsTutor = (username: string, creds: TutorInfoWithoutId) => {
    return async (dispatch: Dispatch) => {
        try {
            const tutorData = await tutorService.update(username, creds);
            const user = getLocalUser();
            if (user) {
              user.roleInfo = tutorData;
              if (hasOtherAccount(user)) user.dual = true
              user.userType = UserType.TUTOR;
              updateLocalUser(user);
              dispatch(setUser(user));
            }
            useSuccessNotification(`Updated your tutor record`)
        } catch (e) {
            useErrorNotification(e);
            return Promise.reject();
        }
    }
}

// Signup as a student
export const signAsStudent = (username: string, info: StudentInfoWithoutId) => {
    return async (dispatch: Dispatch) => {
        try {
            const studentData = await studentService.create(username, info)
            const user = getLocalUser();
            if (user) {
                if (hasOtherAccount(user)) user.dual = true
                user.userType = UserType.STUDENT;
                user.roleInfo = studentData;
                updateLocalUser(user);
                dispatch(setUser(user));
            }
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
            const user = getLocalUser();
            if (user) {
                user.roleInfo = studentData;
                if (hasOtherAccount(user)) user.dual = true
                user.userType = UserType.STUDENT;
                updateLocalUser(user);
                dispatch(setUser(user));
            }
            useSuccessNotification(`Updated student data`)
        } catch (e) {
            useErrorNotification(e)
            return Promise.reject()
        }
    }
}

export const getTutors = (query: TutorSearch, callback: (t: TutorResult[]) => void) => {
    return async (_: Dispatch) => {
        console.log(query)
        try {
            const tutors = await tutorService.search(query)
            callback(tutors)
            console.log(tutors)
        } catch (e) {
            useErrorNotification(e)
            return Promise.reject()
        }
    }

}

export const switchMode = (toUserType: UserType, username: string) => {
    return async (dispatch: Dispatch) => {
        try {
            let roleInfo = null
            if (toUserType == UserType.STUDENT) {
                roleInfo = await studentService.get(username)
            } else {
                roleInfo = await tutorService.get(username)
            }
            const user = getLocalUser();
            if (user) {
                user.roleInfo = roleInfo;
                user.userType = toUserType;
                updateLocalUser(user);
                dispatch(setUser(user));
            }
            useSuccessNotification(`You have switched to your ${UserType[toUserType]} account!`)   
        } catch (e) {
            useErrorNotification(e)
            return Promise.reject()
        }
    }
}

export default userSlice.reducer

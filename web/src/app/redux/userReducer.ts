import { createSlice, Dispatch } from "@reduxjs/toolkit";
import {
	SignupInfo,
	LoginInfo,
	UserInfo,
	UserData,
	TutorInfoWithoutId,
	StudentInfoWithoutId,
	TutorResult,
	TutorSearch,
	UserType,
	isTutorInfo,
	CreateMatchInfo,
	CreateComment,
} from "../../types/types";
import accountService from "../../services/account";
import tutorService from "../../services/tutor";
import studentService from "../../services/student";
import matchService from "../../services/match";
import commentService from "@/services/comments"
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
			if (state) state.userType = action.payload;
			return state;
		},
		setRoleInfo(state, action) {
			if (state) state.roleInfo = action.payload;
			console.log(state?.roleInfo);
			return state;
		},
		setPrimaryInfo(state, action) {
			if (state) state.primaryInfo = action.payload;
			return state;
		},
	},
});

export const { setUser, clearUser, setType, setRoleInfo, setPrimaryInfo } =
	userSlice.actions;

const showSuccess = useSuccessNotification();
const showError = useErrorNotification();

// Signup
export const signupUser = (creds: SignupInfo) => {
	console.log("signup reached");
	return async (dispatch: Dispatch) => {
		try {
			const user = await accountService.signup(creds);
			user.userType = null;
			user.roleInfo = null;
			user.dual = false;
			updateLocalUser(user);
			dispatch(setUser(user));
			showSuccess("Signup succesful!");
		} catch (e) {
			showError(e);
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
	console.log("login reducer reached");
	return async (dispatch: Dispatch) => {
		try {
			const user = await accountService.login(creds);
			updateLocalUser(user);
			dispatch(setUser(user));
			console.log(user);
			showSuccess("Login succesful!");
		} catch (e) {
			showError(e);
			return Promise.reject();
		}
	};
};

// Add or update user's primary information

export const addUserInfo = (info: UserInfo) => {
	console.log("user info reducer reached");
	return async (dispatch: Dispatch) => {
		try {
			const primaryInfo = await accountService.setUserInfo(info);
			dispatch(setPrimaryInfo(primaryInfo));
			const user = getLocalUser();
			if (user) {
				user.primaryInfo = primaryInfo;
				updateLocalUser(user);
				dispatch(setUser(user));
			}
			showSuccess(`User information saved.`);
		} catch (e) {
			showError(e);
			return Promise.reject();
		}
	};
};

// Logout
export const logoutUser = () => {
	return async (dispatch: Dispatch) => {
		updateLocalUser(null);
		await accountService.logout();
		dispatch(clearUser());
		showSuccess("Logged out.");
	};
};

// Delete account
export const deleteUser = () => {
	return async (dispatch: Dispatch) => {
		try {
			updateLocalUser(null);
			await accountService.deleteUser();
			dispatch(clearUser());
			showSuccess("Deleted user.");
		} catch (e) {
			showError(e);
			return Promise.reject();
		}
	};
};

const hasOtherAccount = (user: UserData): boolean => {
	if (user && user.userType !== null) {
		return true;
	}
	return false;
};

export const uploadPicture = (file: File) => {
	return async (dispatch: Dispatch) => {
		try {
			const user = getLocalUser();
			if (user && user.roleInfo && isTutorInfo(user.roleInfo)) {
				const url = await tutorService.upload(file);
				user.roleInfo.portraitUrl = url;
				console.log({ pic: url });
				updateLocalUser(user);
				dispatch(setUser(user));
			}
			showSuccess(`You have uploaded your picture!`);
		} catch (e) {
			showError(e);
			return Promise.reject();
		}
	};
};

// Sign up as a tutor
export const signAsTutor = (creds: TutorInfoWithoutId) => {
	return async (dispatch: Dispatch) => {
		try {
			const tutorData = await tutorService.create(creds);
			const user = getLocalUser();
			if (user) {
				user.roleInfo = tutorData;
				if (hasOtherAccount(user)) user.dual = true;
				user.userType = UserType.TUTOR;
				updateLocalUser(user);
				dispatch(setUser(user));
			}
			showSuccess(`You have signed up as a tutor!`);
		} catch (e) {
			showError(e);
			return Promise.reject();
		}
	};
};

// Update user's tutor information

export const updateAsTutor = (creds: TutorInfoWithoutId) => {
	return async (dispatch: Dispatch) => {
		try {
			const tutorData = await tutorService.update(creds);
			const user = getLocalUser();
			if (user) {
				user.roleInfo = tutorData;
				if (hasOtherAccount(user)) user.dual = true;
				user.userType = UserType.TUTOR;
				updateLocalUser(user);
				dispatch(setUser(user));
			}
			showSuccess(`Updated your tutor record`);
		} catch (e) {
			showError(e);
			return Promise.reject();
		}
	};
};

export const uploadComment = (commentData: CreateComment) => {
	return async () => {
		try {
			console.log("bruh")
			await commentService.post(commentData);
			showSuccess("uploaded comment")
		} catch (e) {
			showError(e)
			return Promise.reject()
		}
	}
}

// Signup as a student
export const signAsStudent = (info: StudentInfoWithoutId) => {
	return async (dispatch: Dispatch) => {
		try {
			const studentData = await studentService.create(info);
			const user = getLocalUser();
			if (user) {
				if (hasOtherAccount(user)) user.dual = true;
				user.userType = UserType.STUDENT;
				user.roleInfo = studentData;
				updateLocalUser(user);
				dispatch(setUser(user));
			}
			showSuccess(`You have signed up as a student!`);
		} catch (e) {
			showError(e);
			return Promise.reject();
		}
	};
};

export const updateStudent = (info: StudentInfoWithoutId) => {
	return async (dispatch: Dispatch) => {
		try {
			const studentData = await studentService.update(info);
			const user = getLocalUser();
			if (user) {
				user.roleInfo = studentData;
				if (hasOtherAccount(user)) user.dual = true;
				user.userType = UserType.STUDENT;
				updateLocalUser(user);
				dispatch(setUser(user));
			}
			showSuccess(`Updated student data`);
		} catch (e) {
			showError(e);
			return Promise.reject();
		}
	};
};

export const getTutors = (
	query: TutorSearch,
	callback: (t: TutorResult[]) => void,
) => {
	return async () => {
		console.log(query);
		try {
			const tutors = await tutorService.search(query);
			callback(tutors);
			console.log(tutors);
		} catch (e) {
			showError(e);
			return Promise.reject();
		}
	};
};

export const switchMode = (toUserType: UserType) => {
	return async (dispatch: Dispatch) => {
		try {
			let roleInfo = null;
			if (toUserType == UserType.STUDENT) {
				roleInfo = await studentService.get();
			} else {
				roleInfo = await tutorService.get();
			}
			const user = getLocalUser();
			if (user) {
				user.roleInfo = roleInfo;
				user.userType = toUserType;
				updateLocalUser(user);
				dispatch(setUser(user));
			}
			showSuccess(
				`You have switched to your ${UserType[toUserType]} account!`,
			);
		} catch (e) {
			console.log(e);
			showError(e);
			return Promise.reject();
		}
	};
};

export const matchWithTutor = (creds: CreateMatchInfo) => {
	return async (dispatch: Dispatch) => {
		try {
			const studentData = await matchService.create(creds);
			const user = getLocalUser();
			if (user) {
				user.roleInfo = studentData;
				updateLocalUser(user);
				dispatch(setUser(user));
			}
			showSuccess(`Storing`);
		} catch (e) {
			showError(e);
			return Promise.reject();
		}
	};
};

export default userSlice.reducer;

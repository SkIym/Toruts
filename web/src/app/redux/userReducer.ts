import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, UserType, TutorInfo, StudentInfo, UserInfo } from '../../types/types';
import { useSuccessNotification } from '../hooks';
import { AppDispatch } from '../store';

const LOCAL_STORAGE_KEY = 'loggedInUser';

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

interface UserState extends Omit<UserData, 'roleInfo'> {
  roleInfo: TutorInfo | StudentInfo | null;
}

const initialState: UserState | null = null;

const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserState | null,
  reducers: {
    setUser(_state, action: PayloadAction<UserState>) {
      updateLocalUser(action.payload);
      return action.payload;
    },
    clearUser() {
      updateLocalUser(null);
      return null;
    },
    setType(state, action: PayloadAction<UserType | null>) {
      if (state) {
        state.userType = action.payload;
        updateLocalUser(state);
      }
      return state;
    },
    setRoleInfo(state, action: PayloadAction<TutorInfo | StudentInfo | null>) {
      if (state) {
        state.roleInfo = action.payload;
        updateLocalUser(state);
      }
      return state;
    },
    setPrimaryInfo(state, action: PayloadAction<UserInfo>) {
      if (state) {
        state.primaryInfo = action.payload;
        updateLocalUser(state);
      }
      return state;
    },
    setDualInfo(state, action: PayloadAction<boolean>) {
      if (state) {
          state.dual = action.payload;
          updateLocalUser(state);
      }
    }
  },
});

export const { setUser, clearUser, setType, setRoleInfo, setPrimaryInfo } = userSlice.actions;

export const getLoggedInUser = () => (dispatch: AppDispatch) => {
  const user = getLocalUser();
  if (user) {
    dispatch(setUser(user));
  }
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(clearUser());
  const showSuccess = useSuccessNotification();
  showSuccess('Logged out.');
};

export const hasOtherAccount = (user: UserData): boolean => {
  return user && user.userType !== null;
};

export default userSlice.reducer;
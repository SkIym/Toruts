import { Dispatch } from 'redux';
export interface SignupInfo {
    username: string;
    email: string;
    password: string;
}
export interface LoginInfo {
    username: string;
    password: string;
}

export type UserToken = {
    userName: string;
    email: string;
    token: string;
}

//   For dispatch types
interface SignUpUserAction {
    type: 'SIGN UP';
    payload: SignupInfo
}

type AppAction = SignUpUserAction
export type AppDispatch = Dispatch<AppAction>
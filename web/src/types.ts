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

export type UserInfo = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    token: UserToken | null;
}

export interface ToggleObject {
    toggleVisibility: () => void 
    setInvisible: () => void
}
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

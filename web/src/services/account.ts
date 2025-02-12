import axios from "axios";
import { accountApiBaseUrl } from "../constants";
import { LoginInfo, SignupInfo, UserInfo, UserToken } from "../types";

import { serverURL } from "../constants";

let token: string = '';

const setToken = async (newToken: string) => {
    token = `Bearer ${newToken}`;
};

const signup = async (creds: SignupInfo) => {
    console.log("Requesting singup...")
    const { data } = await axios.post<UserToken>(`${serverURL}account/signup`, creds)
    console.log("Sign up request received", data)
    return data;
}

const login = async (creds: LoginInfo) => {
    console.log("Requesting login...")
    const { data } = await axios.post<UserToken>(`${serverURL}account/login`, creds)
    console.log("Login request received", data)
    return data
}

const setUserInfo = async (info: UserInfo) => {
    console.log("info reached")
    const { data } = await axios.put<UserToken>(`${serverURL}record/update/${info.token?.userName}`, info)
    return data
}

const deleteUser = async (username: string) => {
    console.log("delete user reached")
    const { data } = await axios.delete(`${serverURL}record/delete/${username}`)
    return data
}

export default {
    signup, setToken, login, setUserInfo, deleteUser
}

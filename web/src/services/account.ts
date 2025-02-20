import axios from "axios";
import { LoginInfo, SignupInfo, UserInfo, UserData } from "../types";

import { serverURL } from "../constants";


// let token: string = '';

// const setToken = async (newToken: string) => {
//     token = `Bearer ${newToken}`;
// };

const signup = async (creds: SignupInfo) => {
    console.log("Requesting singup...")
    const { data } = await axios.post<UserData>(`${serverURL}account/signup`, creds)
    console.log("Sign up request received", data)
    return data;
}

const login = async (creds: LoginInfo) => {
    console.log("Requesting login...")
    const { data } = await axios.post<UserData>(`${serverURL}account/login`, creds)
    console.log("Login request received", data)
    return data
}

const setUserInfo = async (username: string, info: UserInfo) => {
    console.log("info reached") 
    const { data } = await axios.put<UserData>(`${serverURL}record/update/${username}`, info)
    return data
}

const deleteUser = async (username: string) => {
    console.log("delete user reached")
    const { data } = await axios.delete(`${serverURL}record/delete/${username}`)
    return data
}

export default {
    signup, login, setUserInfo, deleteUser
}

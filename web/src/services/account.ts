import axios from "axios";
import { accountApiBaseUrl } from "../constants";
import { SignupInfo, UserToken } from "../types";

import { serverURL } from "../constants";

let token: string = '';

const setToken = async (newToken: string) => {
    token = `Bearer ${newToken}`;
};

const signup = async (creds: SignupInfo) => {
    console.log("Requesting...")
    const { data } = await axios.post<UserToken>(`${serverURL}account/signup`, creds)
    console.log("Sign up succesful")
    return data;
}

export default {
    signup, setToken
}
